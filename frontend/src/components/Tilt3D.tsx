import { useRef } from "react";
import gsap from "gsap";

type Props = {
  children: React.ReactNode;
  className?: string;
  max?: number;      // max tilt in degrees
  lift?: boolean;    // translateZ pop on hover
};

export default function Tilt3D({ children, className = "", max = 8, lift = true }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || window.matchMedia("(max-width: 768px)").matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(el, {
      rotateY: x * max,
      rotateX: -y * max,
      z: lift ? 24 : 0,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 1000,
    });
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, { rotateY: 0, rotateX: 0, z: 0, duration: 0.7, ease: "power2.out" });
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{ transformStyle: "preserve-3d", willChange: "transform" }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  );
}
