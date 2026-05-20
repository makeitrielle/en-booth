"use client";

import { useState, useMemo } from "react";
import { Photobooth, ENHYPEN_ERAS, type Era } from "@/components/photobooth";

function FloatingElements({ era }: { era: Era }) {
  const elements = useMemo(() => {
    const count = 15;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4,
      size: 2 + Math.random() * 4,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {elements.map((el) => (
        <div
          key={el.id}
          className="absolute rounded-full animate-float"
          style={{
            left: `${el.left}%`,
            top: `${el.top}%`,
            width: `${el.size}px`,
            height: `${el.size}px`,
            backgroundColor: era.colors.accent,
            opacity: 0.4,
            animationDelay: `${el.delay}s`,
            animationDuration: `${el.duration}s`,
            boxShadow: `0 0 ${el.size * 3}px ${era.colors.glow}`,
          }}
        />
      ))}
    </div>
  );
}

export default function Home() {
  const [currentEra, setCurrentEra] = useState<Era>(ENHYPEN_ERAS[0]);

  return (
    <div 
      className="min-h-screen relative transition-all duration-700"
      style={{ 
        backgroundColor: currentEra.colors.primary,
      }}
    >
      {/* Concept Photo Background */}
      <div 
        className="fixed inset-0 z-0 transition-opacity duration-1000"
        style={{
          backgroundImage: `url(${currentEra.bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Dark overlay for readability */}
        <div 
          className="absolute inset-0 transition-all duration-700"
          style={{
            background: currentEra.id === 'romance-untold-daydream' 
              ? `linear-gradient(180deg, ${currentEra.colors.primary}e0 0%, ${currentEra.colors.primary}90 50%, ${currentEra.colors.primary}e0 100%)`
              : `linear-gradient(180deg, ${currentEra.colors.primary}f0 0%, ${currentEra.colors.primary}80 50%, ${currentEra.colors.primary}f0 100%)`,
          }}
        />
      </div>

      {/* Floating Elements */}
      <FloatingElements era={currentEra} />

      {/* Content */}
      <main className="relative z-20 min-h-screen py-6 px-4">
        {/* Header */}
        <header className="text-center mb-6">
          <div 
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-3 transition-all duration-500"
            style={{ 
              backgroundColor: currentEra.colors.accent + "20",
              borderColor: currentEra.colors.accent + "50",
            }}
          >
            <span 
              className="text-[10px] font-medium tracking-widest uppercase transition-colors duration-500"
              style={{ color: currentEra.colors.accent }}
            >
              Since 2020
            </span>
          </div>
          <h1 
            className={`text-3xl font-bold mb-2 transition-all duration-500 ${currentEra.fontClass} ${currentEra.fontStyle}`}
          >
            <span 
              className="transition-colors duration-500"
              style={{ color: currentEra.colors.accent }}
            >
              ENHYPEN
            </span>
          </h1>
          <p 
            className={`text-lg transition-all duration-500 ${currentEra.fontClass}`}
            style={{ color: currentEra.colors.text }}
          >
            Photobooth
          </p>
          <p 
            className="text-xs max-w-xs mx-auto mt-2 transition-colors duration-500 font-sans"
            style={{ color: currentEra.colors.text, opacity: 0.6 }}
          >
            Capture your moments with frames inspired by every era
          </p>
        </header>

        {/* Photobooth */}
        <Photobooth onEraChange={setCurrentEra} />

        {/* Footer */}
        <footer className="mt-10 text-center">
          <p 
            className="text-[10px] mb-1 transition-colors duration-500 font-sans"
            style={{ color: currentEra.colors.text, opacity: 0.4 }}
          >
            Fan-made project. Not affiliated with ENHYPEN or BELIFT LAB.
          </p>
          <p 
            className="text-[10px] flex items-center justify-center gap-1 transition-colors duration-500 font-sans"
            style={{ color: currentEra.colors.text, opacity: 0.5 }}
          >
            Made with <span style={{ color: currentEra.colors.accent }}>&#9829;</span> for ENGENE
          </p>
        </footer>
      </main>

      {/* CSS for floating animation */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) scale(1);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) scale(1.1);
            opacity: 0.6;
          }
        }
        .animate-float {
          animation: float ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
