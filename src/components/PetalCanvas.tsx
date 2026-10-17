import React, { useEffect, useRef } from 'react';

interface PetalCanvasProps {
  enabled: boolean;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  type: 'petal' | 'sparkle';
  color: string;
  opacity: number;
}

export const PetalCanvas: React.FC<PetalCanvasProps> = ({ enabled }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const petalColors = ['#f59e0b', '#ea580c', '#fbbf24', '#d97706', '#fef08a'];
    const particlesCount = Math.min(38, Math.floor(width / 35));

    const particles: Particle[] = Array.from({ length: particlesCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 8 + 6,
      speedX: (Math.random() - 0.5) * 0.8 + 0.4,
      speedY: Math.random() * 1.2 + 0.6,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 2,
      type: Math.random() > 0.35 ? 'petal' : 'sparkle',
      color: petalColors[Math.floor(Math.random() * petalColors.length)],
      opacity: Math.random() * 0.6 + 0.3,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;

        if (p.type === 'petal') {
          // Sayapatri Marigold petal teardrop/oval shape
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();

          // Petal vein
          ctx.beginPath();
          ctx.moveTo(-p.size * 0.8, 0);
          ctx.lineTo(p.size * 0.8, 0);
          ctx.strokeStyle = '#b45309';
          ctx.lineWidth = 0.6;
          ctx.stroke();
        } else {
          // Glowing festive firefly / diya sparkle
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.35, 0, Math.PI * 2);
          ctx.fillStyle = '#fef08a';
          ctx.shadowColor = '#f59e0b';
          ctx.shadowBlur = 8;
          ctx.fill();
        }

        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-20 h-full w-full"
      aria-hidden="true"
    />
  );
};
