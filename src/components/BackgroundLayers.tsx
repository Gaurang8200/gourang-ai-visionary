import { useMousePosition, useScrollProgress } from "@/hooks/useMouseParallax";

export const BackgroundLayers = () => {
  const { progress } = useScrollProgress();

  return (
    <>
      <div
        className="fixed inset-0 -z-50"
        style={{
          background: `linear-gradient(135deg, hsl(199, 89%, 48%, 0.05), hsl(280, 89%, 48%, 0.05))`,
          backgroundSize: "200% 200%",
          animation: "gradientShift 20s ease infinite",
        }}
      />

      <div className="fixed inset-0 -z-40 pointer-events-none" style={{
        background: "radial-gradient(ellipse at center, transparent 0%, hsl(222.2, 84%, 4.9%, 0.5) 100%)",
      }} />
    </>
  );
};