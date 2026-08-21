import React, { useEffect, useRef } from 'react';

export const MathCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Mathematical symbols and equations to float gracefully
    const formulas = [
      'e^{i\\pi} + 1 = 0',
      '\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}',
      '\\nabla \\times \\mathbf{B} = \\mu_0 \\mathbf{J}',
      '\\zeta(s) = \\sum_{n=1}^\\infty \\frac{1}{n^s}',
      '\\oint_{\\gamma} f(z) dz = 0',
      'a^2 + b^2 = c^2',
      '\\frac{\\partial u}{\\partial t} = \\alpha \\nabla^2 u',
      '\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1',
      '\\sum_{k=0}^n \\binom{n}{k} = 2^n',
      'd(x,y) \\le d(x,z) + d(z,y)',
      '\\dim(V) = \\text{rank}(T) + \\text{null}(T)',
      '\\phi = \\frac{1 + \\sqrt{5}}{2} \\approx 1.618',
      'F(s) = \\int_0^\\infty f(t) e^{-st} dt',
      'H(X) = -\\sum p(x) \\log_2 p(x)'
    ];

    interface Particle {
      x: number;
      y: number;
      text: string;
      speedX: number;
      speedY: number;
      opacity: number;
      size: number;
    }

    const particles: Particle[] = formulas.map((text) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      text,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.35 + 0.15,
      size: Math.floor(Math.random() * 4) + 12
    }));

    let time = 0;

    const render = () => {
      time += 0.008;
      ctx.clearRect(0, 0, width, height);

      // Draw subtle harmonic sine waves
      ctx.lineWidth = 1;
      for (let j = 0; j < 3; j++) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(30, 64, 175, ${0.04 + j * 0.02})`;
        for (let x = 0; x < width; x += 10) {
          const y =
            height / 2 +
            Math.sin(x * 0.003 + time + j * 1.5) * 60 +
            Math.cos(x * 0.001 - time * 0.5) * 30;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Draw parametric Lissajous / Golden Spiral element on the right
      ctx.save();
      ctx.translate(width > 768 ? width * 0.82 : width * 0.5, height * 0.5);
      ctx.strokeStyle = 'rgba(30, 58, 138, 0.07)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      for (let theta = 0; theta < Math.PI * 8; theta += 0.05) {
        const r = 4 * Math.pow(1.15, theta * 0.3) * (0.8 + 0.2 * Math.sin(time));
        const x = r * Math.cos(theta + time * 0.2);
        const y = r * Math.sin(theta + time * 0.2);
        if (theta === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.restore();

      // Floating Mathematical Formulas
      ctx.font = '500 13px "Newsreader", "JetBrains Mono", serif';
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < -100) p.x = width + 50;
        if (p.x > width + 100) p.x = -50;
        if (p.y < -50) p.y = height + 50;
        if (p.y > height + 50) p.y = -50;

        ctx.fillStyle = `rgba(30, 58, 138, ${p.opacity * 0.7})`;
        ctx.font = `italic ${p.size}px "Newsreader", Georgia, serif`;
        ctx.fillText(p.text, p.x, p.y);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none w-full h-full"
      style={{ opacity: 0.85 }}
    />
  );
};
