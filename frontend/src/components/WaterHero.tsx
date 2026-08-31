import { useEffect, useRef } from "react";

/* Interactive water surface over a photo. A CPU height-field wave sim
   (classic two-buffer ripple) uploads to a texture each frame; the
   fragment shader refracts the photo along the height gradient and adds
   a specular glint, so the cursor drags ripples like fingers on water.
   Falls back to a plain <img> when WebGL is unavailable. */

const SIM_W = 320;

const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

const FRAG = `
precision mediump float;
varying vec2 vUv;
uniform sampler2D uImage;
uniform sampler2D uHeight;
uniform vec2 uTexel;
uniform vec2 uCoverScale;
uniform vec2 uCoverOffset;
void main() {
  float hl = texture2D(uHeight, vUv - vec2(uTexel.x, 0.0)).r;
  float hr = texture2D(uHeight, vUv + vec2(uTexel.x, 0.0)).r;
  float ht = texture2D(uHeight, vUv - vec2(0.0, uTexel.y)).r;
  float hb = texture2D(uHeight, vUv + vec2(0.0, uTexel.y)).r;
  vec2 grad = vec2(hr - hl, hb - ht);
  vec2 uv = (vUv + grad * 0.25) * uCoverScale + uCoverOffset;
  vec3 col = texture2D(uImage, uv).rgb;
  col += (grad.x + grad.y) * 1.1;
  gl_FragColor = vec4(col, 1.0);
}`;

export default function WaterHero({ src, className = "", imgStyle }: { src: string; className?: string; imgStyle?: React.CSSProperties }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const gl = canvas.getContext("webgl", { antialias: false });
    if (!gl) return; // fallback <img> stays visible

    let raf = 0;
    let dead = false;

    const compile = (type: number, srcCode: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, srcCode);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const quad = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quad);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uImage = gl.getUniformLocation(prog, "uImage");
    const uHeight = gl.getUniformLocation(prog, "uHeight");
    const uTexel = gl.getUniformLocation(prog, "uTexel");
    const uCoverScale = gl.getUniformLocation(prog, "uCoverScale");
    const uCoverOffset = gl.getUniformLocation(prog, "uCoverOffset");

    // sim grid sized after first layout
    let simH = 180;
    let prev = new Float32Array(SIM_W * simH);
    let curr = new Float32Array(SIM_W * simH);
    let pixels = new Uint8Array(SIM_W * simH);

    const heightTex = gl.createTexture();
    const setupHeightTex = () => {
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, heightTex);
      gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, SIM_W, simH, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, null);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    };

    const imgTex = gl.createTexture();
    const img = new Image();
    let imgW = 1, imgH = 1, ready = false;
    img.onload = () => {
      if (dead) return;
      imgW = img.naturalWidth; imgH = img.naturalHeight;
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, imgTex);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      ready = true;
      resize();
    };
    img.src = src;

    const resize = () => {
      const r = wrap.getBoundingClientRect();
      // before first layout the wrapper can measure 0; bail (and retry next
      // frame) so we never divide by zero and hand Float32Array an Infinite
      // length, which throws and takes the whole app down on first paint
      if (r.width < 1 || r.height < 1) {
        if (!dead) requestAnimationFrame(resize);
        return;
      }
      canvas.width = Math.round(r.width);
      canvas.height = Math.round(r.height);
      gl.viewport(0, 0, canvas.width, canvas.height);
      simH = Math.max(90, Math.round((SIM_W * r.height) / r.width));
      prev = new Float32Array(SIM_W * simH);
      curr = new Float32Array(SIM_W * simH);
      pixels = new Uint8Array(SIM_W * simH);
      setupHeightTex();
      if (!ready) return;
      // object-fit: cover mapping
      const canvasAspect = canvas.width / canvas.height;
      const imgAspect = imgW / imgH;
      let sx = 1, sy = 1;
      if (imgAspect > canvasAspect) sx = canvasAspect / imgAspect;
      else sy = imgAspect / canvasAspect;
      gl.uniform2f(uCoverScale, sx, sy);
      gl.uniform2f(uCoverOffset, (1 - sx) / 2, (1 - sy) / 2);
      gl.uniform2f(uTexel, 1 / SIM_W, 1 / simH);
    };
    resize();
    window.addEventListener("resize", resize);

    const splash = (nx: number, ny: number, strength: number) => {
      // height texture is uploaded un-flipped while the image uses FLIP_Y,
      // so the ripple row must follow ny directly to sit under the cursor
      const cx = Math.round(nx * SIM_W);
      const cy = Math.round(ny * simH);
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const x = cx + dx, y = cy + dy;
          if (x < 1 || x >= SIM_W - 1 || y < 1 || y >= simH - 1) continue;
          const d = Math.hypot(dx, dy);
          if (d <= 1.5) curr[y * SIM_W + x] += strength * (1 - d / 1.8);
        }
      }
    };

    let lastX = -1, lastY = -1;
    const onMove = (e: MouseEvent) => {
      const r = wrap.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width;
      const ny = (e.clientY - r.top) / r.height;
      if (nx < 0 || nx > 1 || ny < 0 || ny > 1) return;
      // interpolate along fast mouse moves so the trail is continuous
      if (lastX >= 0) {
        const steps = Math.max(1, Math.ceil(Math.hypot(nx - lastX, ny - lastY) * 60));
        for (let i = 1; i <= steps; i++) {
          splash(lastX + ((nx - lastX) * i) / steps, lastY + ((ny - lastY) * i) / steps, 0.45);
        }
      } else {
        splash(nx, ny, 0.6);
      }
      lastX = nx; lastY = ny;
    };
    const onLeave = () => { lastX = -1; lastY = -1; };
    wrap.addEventListener("mousemove", onMove);
    wrap.addEventListener("mouseleave", onLeave);

    const step = () => {
      for (let y = 1; y < simH - 1; y++) {
        const row = y * SIM_W;
        for (let x = 1; x < SIM_W - 1; x++) {
          const i = row + x;
          prev[i] = ((curr[i - 1] + curr[i + 1] + curr[i - SIM_W] + curr[i + SIM_W]) / 2 - prev[i]) * 0.94;
        }
      }
      const tmp = prev; prev = curr; curr = tmp;
    };

    const tick = () => {
      if (dead) return;
      raf = requestAnimationFrame(tick);
      // two sim steps per frame: waves spread instantly and die out fast
      step();
      step();

      for (let i = 0; i < curr.length; i++) {
        let v = curr[i] * 0.5 + 0.5;
        if (v < 0) v = 0; else if (v > 1) v = 1;
        pixels[i] = (v * 255) | 0;
      }
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, heightTex);
      gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, SIM_W, simH, gl.LUMINANCE, gl.UNSIGNED_BYTE, pixels);

      if (ready) {
        gl.uniform1i(uImage, 0);
        gl.uniform1i(uHeight, 1);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      }
    };
    tick();

    return () => {
      dead = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      wrap.removeEventListener("mousemove", onMove);
      wrap.removeEventListener("mouseleave", onLeave);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [src]);

  return (
    <div ref={wrapRef} className={`absolute inset-0 ${className}`}>
      <img src={src} alt="Gourangkumar Monashara" className="absolute inset-0 w-full h-full object-cover" style={imgStyle} />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
