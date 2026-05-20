"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Camera, Upload, Download, RefreshCw, X, ImageIcon, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface Era {
  id: string;
  name: string;
  album: string;
  year: string;
  theme: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    glow: string;
  };
  frameStyle: string;
  overlayElements: string[];
  bgPattern: "supernatural" | "carnival" | "cosmic" | "mystical" | "rebellious" | "vampire" | "citrus" | "romantic" | "dreamy" | "desire" | "vanish";
  bgImage: string;
  fontClass: string;
  fontStyle: string;
}

export const ENHYPEN_ERAS: Era[] = [
  {
    id: "border-day-one",
    name: "Border: Day One",
    album: "1st Mini Album",
    year: "2020",
    theme: "Supernatural awakening, crossing borders between worlds",
    colors: {
      primary: "#1a1a2e",
      secondary: "#16213e",
      accent: "#e94560",
      text: "#eaeaea",
      glow: "rgba(233,69,96,0.4)",
    },
    frameStyle: "border-4 border-[#e94560] shadow-[0_0_30px_rgba(233,69,96,0.5)]",
    overlayElements: ["moon", "stars", "lightning"],
    bgPattern: "supernatural",
    bgImage: "/backgrounds/border-day-one.jpg",
    fontClass: "font-[family-name:var(--font-creepster)]",
    fontStyle: "tracking-wider",
  },
  {
    id: "border-carnival",
    name: "Border: Carnival",
    album: "2nd Mini Album",
    year: "2021",
    theme: "Colorful carnival chaos, youthful energy",
    colors: {
      primary: "#1a1520",
      secondary: "#2d1f35",
      accent: "#feca57",
      text: "#ffffff",
      glow: "rgba(254,202,87,0.4)",
    },
    frameStyle: "border-4 border-[#feca57] shadow-[0_0_30px_rgba(254,202,87,0.5)]",
    overlayElements: ["tent", "mask", "sparkle"],
    bgPattern: "carnival",
    bgImage: "/backgrounds/border-carnival.jpg",
    fontClass: "font-[family-name:var(--font-righteous)]",
    fontStyle: "tracking-wide",
  },
  {
    id: "dimension-dilemma",
    name: "Dimension: Dilemma",
    album: "1st Full Album",
    year: "2021",
    theme: "Futuristic dimension travel, cosmic exploration",
    colors: {
      primary: "#0c0c1e",
      secondary: "#1a1a3e",
      accent: "#00d4ff",
      text: "#ffffff",
      glow: "rgba(0,212,255,0.4)",
    },
    frameStyle: "border-4 border-[#00d4ff] shadow-[0_0_30px_rgba(0,212,255,0.5)]",
    overlayElements: ["galaxy", "star", "orb"],
    bgPattern: "cosmic",
    bgImage: "/backgrounds/dimension-dilemma.jpg",
    fontClass: "font-[family-name:var(--font-orbitron)]",
    fontStyle: "tracking-widest uppercase",
  },
  {
    id: "dimension-answer",
    name: "Dimension: Answer",
    album: "1st Repackage",
    year: "2022",
    theme: "Finding answers in the dimension, hopeful resolution",
    colors: {
      primary: "#1a3a4a",
      secondary: "#2a5040",
      accent: "#5ba3c0",
      text: "#e8f4f8",
      glow: "rgba(91,163,192,0.4)",
    },
    frameStyle: "border-4 border-[#5ba3c0] shadow-[0_0_30px_rgba(91,163,192,0.5)]",
    overlayElements: ["cloud", "grass", "horizon"],
    bgPattern: "mystical",
    bgImage: "/backgrounds/dimension-answer.jpg",
    fontClass: "font-[family-name:var(--font-cinzel)]",
    fontStyle: "tracking-wide",
  },
  {
    id: "manifesto-day1",
    name: "Manifesto: Day 1",
    album: "3rd Mini Album",
    year: "2022",
    theme: "Rebellious youth, breaking free from rules",
    colors: {
      primary: "#1a1a1a",
      secondary: "#2d2d2d",
      accent: "#ff4757",
      text: "#ffffff",
      glow: "rgba(255,71,87,0.4)",
    },
    frameStyle: "border-4 border-[#ff4757] shadow-[0_0_30px_rgba(255,71,87,0.5)]",
    overlayElements: ["flame", "bolt", "burst"],
    bgPattern: "rebellious",
    bgImage: "/backgrounds/manifesto-day1.jpg",
    fontClass: "font-[family-name:var(--font-rock-salt)]",
    fontStyle: "tracking-normal",
  },
  {
    id: "dark-blood",
    name: "Dark Blood",
    album: "4th Mini Album",
    year: "2023",
    theme: "Dark vampire romance, eternal bond",
    colors: {
      primary: "#0d0d0d",
      secondary: "#1a0a0a",
      accent: "#8b0000",
      text: "#c9c9c9",
      glow: "rgba(139,0,0,0.5)",
    },
    frameStyle: "border-4 border-[#8b0000] shadow-[0_0_30px_rgba(139,0,0,0.5)]",
    overlayElements: ["drop", "heart", "bat"],
    bgPattern: "vampire",
    bgImage: "/backgrounds/dark-blood.jpg",
    fontClass: "font-[family-name:var(--font-nosifer)]",
    fontStyle: "tracking-widest",
  },
  {
    id: "orange-blood",
    name: "Orange Blood",
    album: "5th Mini Album",
    year: "2023",
    theme: "Bright citrus energy, summer vibes",
    colors: {
      primary: "#1a1208",
      secondary: "#2d2010",
      accent: "#ff8c00",
      text: "#fff5e6",
      glow: "rgba(255,140,0,0.4)",
    },
    frameStyle: "border-4 border-[#ff8c00] shadow-[0_0_30px_rgba(255,140,0,0.5)]",
    overlayElements: ["sun", "citrus", "rays"],
    bgPattern: "citrus",
    bgImage: "/backgrounds/orange-blood.jpg",
    fontClass: "font-[family-name:var(--font-pacifico)]",
    fontStyle: "tracking-normal",
  },
  {
    id: "romance-untold",
    name: "Romance: Untold",
    album: "2nd Full Album",
    year: "2024",
    theme: "Unspoken romance, emotional depth",
    colors: {
      primary: "#1a1520",
      secondary: "#2d2035",
      accent: "#ff69b4",
      text: "#ffd1dc",
      glow: "rgba(255,105,180,0.4)",
    },
    frameStyle: "border-4 border-[#ff69b4] shadow-[0_0_30px_rgba(255,105,180,0.5)]",
    overlayElements: ["heart", "rose", "letter"],
    bgPattern: "romantic",
    bgImage: "/backgrounds/romance-untold.jpg",
    fontClass: "font-[family-name:var(--font-cormorant)]",
    fontStyle: "italic tracking-wide",
  },
  {
    id: "romance-untold-daydream",
    name: "Romance: Untold -Daydream-",
    album: "2nd Full Repackage",
    year: "2024",
    theme: "Ethereal daydream, soft fantasy escape",
    colors: {
      primary: "#e8e4f0",
      secondary: "#f5f2fa",
      accent: "#9b7ec9",
      text: "#3d3252",
      glow: "rgba(155,126,201,0.3)",
    },
    frameStyle: "border-4 border-[#9b7ec9] shadow-[0_0_30px_rgba(155,126,201,0.5)]",
    overlayElements: ["cloud", "butterfly", "bubble"],
    bgPattern: "dreamy",
    bgImage: "/backgrounds/romance-untold-daydream.jpg",
    fontClass: "font-[family-name:var(--font-quicksand)]",
    fontStyle: "tracking-wide font-light",
  },
  {
    id: "desire-unleash",
    name: "Desire: Unleash",
    album: "6th Mini Album",
    year: "2025",
    theme: "Raw desire unleashed, intense passion",
    colors: {
      primary: "#0a0a12",
      secondary: "#15152a",
      accent: "#6a0dad",
      text: "#e6d5ff",
      glow: "rgba(106,13,173,0.5)",
    },
    frameStyle: "border-4 border-[#6a0dad] shadow-[0_0_30px_rgba(106,13,173,0.5)]",
    overlayElements: ["orb", "chain", "moon"],
    bgPattern: "desire",
    bgImage: "/backgrounds/desire-unleash.jpg",
    fontClass: "font-[family-name:var(--font-bebas)]",
    fontStyle: "tracking-[0.3em] uppercase",
  },
  {
    id: "the-sin-vanish",
    name: "The Sin: Vanish",
    album: "7th Mini Album",
    year: "2025",
    theme: "Vanishing into shadows, mysterious absence",
    colors: {
      primary: "#050508",
      secondary: "#0d0d14",
      accent: "#1a1aff",
      text: "#a0a0ff",
      glow: "rgba(26,26,255,0.5)",
    },
    frameStyle: "border-4 border-[#1a1aff] shadow-[0_0_30px_rgba(26,26,255,0.5)]",
    overlayElements: ["eye", "mist", "spiral"],
    bgPattern: "vanish",
    bgImage: "/backgrounds/the-sin-vanish.jpg",
    fontClass: "font-[family-name:var(--font-space-grotesk)]",
    fontStyle: "tracking-[0.2em] uppercase",
  },
];

const STRIP_PHOTO_COUNT = 4;

interface PhotoboothProps {
  className?: string;
  onEraChange?: (era: Era) => void;
}

export function Photobooth({ className, onEraChange }: PhotoboothProps) {
  const [selectedEra, setSelectedEra] = useState<Era>(ENHYPEN_ERAS[0]);
  const [photos, setPhotos] = useState<string[]>([]);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [showFlash, setShowFlash] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    onEraChange?.(selectedEra);
  }, [selectedEra, onEraChange]);

  const startCamera = useCallback(async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 720 }, height: { ideal: 720 } },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsCameraActive(true);
      }
    } catch (err) {
      console.error("Camera access error:", err);
      setCameraError("Camera not available. Please use the upload button instead.");
      setIsCameraActive(false);
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  }, []);

  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;
    if (photos.length >= STRIP_PHOTO_COUNT) return;

    setCountdown(3);
    
    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev === null || prev <= 1) {
          clearInterval(countdownInterval);
          return null;
        }
        return prev - 1;
      });
    }, 1000);

    setTimeout(() => {
      setShowFlash(true);

      setTimeout(() => {
        const canvas = canvasRef.current!;
        const video = videoRef.current!;
        const ctx = canvas.getContext("2d")!;

        canvas.width = 720;
        canvas.height = 720;

        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        
        const size = Math.min(video.videoWidth, video.videoHeight);
        const x = (video.videoWidth - size) / 2;
        const y = (video.videoHeight - size) / 2;
        
        ctx.drawImage(video, x, y, size, size, 0, 0, 720, 720);

        const imageData = canvas.toDataURL("image/png");
        setPhotos(prev => [...prev, imageData]);
        
        setShowFlash(false);
      }, 150);
    }, 3000);
  }, [photos.length]);

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    Array.from(files).forEach(file => {
      if (photos.length >= STRIP_PHOTO_COUNT) return;
      
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d")!;
          canvas.width = 720;
          canvas.height = 720;
          
          const size = Math.min(img.width, img.height);
          const x = (img.width - size) / 2;
          const y = (img.height - size) / 2;
          
          ctx.drawImage(img, x, y, size, size, 0, 0, 720, 720);
          const imageData = canvas.toDataURL("image/png");
          setPhotos(prev => {
            if (prev.length >= STRIP_PHOTO_COUNT) return prev;
            return [...prev, imageData];
          });
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
    
    e.target.value = "";
  }, [photos.length]);

  const removePhoto = useCallback((index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  }, []);

  const downloadPhotostrip = useCallback(async () => {
    if (photos.length === 0) return;
    
    setIsDownloading(true);
    
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    
    // Photostrip dimensions - classic vertical strip
    const photoSize = 300;
    const padding = 16;
    const stripWidth = photoSize + padding * 2;
    const headerHeight = 60;
    const footerHeight = 80;
    const stripHeight = headerHeight + (photoSize + padding) * photos.length + padding + footerHeight;
    
    canvas.width = stripWidth;
    canvas.height = stripHeight;
    
    // Background
    ctx.fillStyle = selectedEra.colors.primary;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Decorative border
    ctx.strokeStyle = selectedEra.colors.accent;
    ctx.lineWidth = 4;
    ctx.strokeRect(6, 6, canvas.width - 12, canvas.height - 12);
    
    // Inner border
    ctx.strokeStyle = selectedEra.colors.accent + "60";
    ctx.lineWidth = 1;
    ctx.strokeRect(12, 12, canvas.width - 24, canvas.height - 24);
    
    // Header with era name
    ctx.fillStyle = selectedEra.colors.text;
    ctx.font = "bold 18px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(selectedEra.name.toUpperCase(), canvas.width / 2, 40);
    
    // Load and draw photos
    let loadedCount = 0;
    
    const drawPhoto = (photo: string, index: number) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
          const y = headerHeight + index * (photoSize + padding);
          
          // Photo frame glow
          ctx.shadowColor = selectedEra.colors.glow;
          ctx.shadowBlur = 15;
          ctx.fillStyle = selectedEra.colors.secondary;
          ctx.fillRect(padding - 4, y - 4, photoSize + 8, photoSize + 8);
          ctx.shadowBlur = 0;
          
          // Photo
          ctx.drawImage(img, padding, y, photoSize, photoSize);
          
          // Photo border
          ctx.strokeStyle = selectedEra.colors.accent;
          ctx.lineWidth = 2;
          ctx.strokeRect(padding, y, photoSize, photoSize);
          
          loadedCount++;
          resolve();
        };
        img.src = photo;
      });
    };
    
    await Promise.all(photos.map((photo, index) => drawPhoto(photo, index)));
    
    // Footer
    const footerY = stripHeight - footerHeight + 20;
    
    // ENHYPEN branding
    ctx.fillStyle = selectedEra.colors.accent;
    ctx.font = "bold 14px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("ENHYPEN", canvas.width / 2, footerY);
    
    // Album info
    ctx.fillStyle = selectedEra.colors.text + "99";
    ctx.font = "11px Inter, sans-serif";
    ctx.fillText(selectedEra.album, canvas.width / 2, footerY + 18);
    ctx.fillText(selectedEra.year, canvas.width / 2, footerY + 32);
    
    // Decorative dots at bottom
    const dotY = footerY + 48;
    ctx.fillStyle = selectedEra.colors.accent;
    for (let i = 0; i < 5; i++) {
      const dotX = canvas.width / 2 - 24 + i * 12;
      ctx.beginPath();
      ctx.arc(dotX, dotY, 2, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Download
    const link = document.createElement("a");
    link.download = `enhypen-${selectedEra.id}-photostrip.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    
    setIsDownloading(false);
  }, [photos, selectedEra]);

  const resetPhotobooth = useCallback(() => {
    setPhotos([]);
    setCameraError(null);
    stopCamera();
  }, [stopCamera]);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  const handleEraSelect = (era: Era) => {
    setSelectedEra(era);
  };

  const isStripComplete = photos.length >= STRIP_PHOTO_COUNT;

  return (
    <div className={cn("w-full max-w-4xl mx-auto", className)}>
      {/* Era Selector */}
      <div className="mb-6">
        <h2 
          className={`text-sm font-medium mb-3 text-center uppercase tracking-widest transition-colors duration-500 ${selectedEra.fontClass}`}
          style={{ color: selectedEra.colors.text, opacity: 0.7 }}
        >
          Select an Era
        </h2>
        <div className="flex gap-2 overflow-x-auto pb-3 px-2 snap-x snap-mandatory scrollbar-hide">
          {ENHYPEN_ERAS.map((era) => (
            <button
              key={era.id}
              onClick={() => handleEraSelect(era)}
              className={cn(
                "flex-shrink-0 snap-center px-3 py-2 rounded-lg transition-all duration-300 border",
                "hover:scale-105 active:scale-95",
                selectedEra.id === era.id
                  ? "scale-105"
                  : "opacity-60 hover:opacity-100"
              )}
              style={{
                backgroundColor: selectedEra.id === era.id ? era.colors.accent + "30" : era.colors.primary + "80",
                borderColor: selectedEra.id === era.id ? era.colors.accent : "transparent",
                boxShadow: selectedEra.id === era.id 
                  ? `0 0 20px ${era.colors.glow}` 
                  : undefined,
              }}
            >
              <div className="text-center min-w-[70px]">
                <div 
                  className={`font-semibold text-xs whitespace-nowrap transition-colors duration-300 ${era.fontClass}`}
                  style={{ color: selectedEra.id === era.id ? era.colors.accent : era.colors.text }}
                >
                  {era.name.length > 15 ? era.name.split(":")[0] : era.name}
                </div>
                <div 
                  className="text-[10px] transition-colors duration-300"
                  style={{ color: era.colors.text, opacity: 0.6 }}
                >
                  {era.year}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content - Camera/Upload + Photostrip Preview */}
      <div className="flex flex-col lg:flex-row gap-6 items-start justify-center">
        
        {/* Left Side - Camera/Upload Area */}
        <div className="flex-1 w-full lg:max-w-md">
          {/* Era Info Card */}
          <div 
            className="mb-4 p-4 rounded-xl border transition-all duration-500"
            style={{ 
              backgroundColor: selectedEra.colors.primary + "90",
              borderColor: selectedEra.colors.accent + "60",
              boxShadow: `0 0 30px ${selectedEra.colors.glow}`,
            }}
          >
            <h3 
              className={`text-lg font-bold transition-all duration-500 ${selectedEra.fontClass} ${selectedEra.fontStyle}`}
              style={{ color: selectedEra.colors.text }}
            >
              {selectedEra.name}
            </h3>
            <p 
              className="text-xs transition-colors duration-500"
              style={{ color: selectedEra.colors.text, opacity: 0.7 }}
            >
              {selectedEra.album} - {selectedEra.year}
            </p>
            <p 
              className={`text-xs mt-1 transition-all duration-500 ${selectedEra.fontClass}`}
              style={{ color: selectedEra.colors.accent }}
            >
              {selectedEra.theme}
            </p>
          </div>

          {/* Camera/Upload Box */}
          <div 
            className="relative aspect-square rounded-2xl overflow-hidden border-4 transition-all duration-500"
            style={{ 
              borderColor: selectedEra.colors.accent,
              boxShadow: `0 0 40px ${selectedEra.colors.glow}`,
              backgroundColor: selectedEra.colors.primary,
            }}
          >
            {/* Flash Effect */}
            {showFlash && (
              <div className="absolute inset-0 z-50 bg-white animate-pulse" />
            )}

            {/* Countdown */}
            {countdown !== null && (
              <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/50">
                <span 
                  className={`text-8xl font-bold animate-ping ${selectedEra.fontClass}`}
                  style={{ color: selectedEra.colors.accent }}
                >
                  {countdown}
                </span>
              </div>
            )}

            {/* Camera View */}
            {isCameraActive ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover scale-x-[-1]"
              />
            ) : (
              <div 
                className="w-full h-full flex flex-col items-center justify-center gap-4 p-6"
                style={{ backgroundColor: selectedEra.colors.secondary }}
              >
                {cameraError ? (
                  <>
                    <div 
                      className="text-center mb-2 px-4 py-2 rounded-lg"
                      style={{ backgroundColor: selectedEra.colors.primary + "80" }}
                    >
                      <p style={{ color: selectedEra.colors.text }} className="text-sm">
                        {cameraError}
                      </p>
                    </div>
                  </>
                ) : (
                  <ImageIcon 
                    className="w-16 h-16 opacity-30"
                    style={{ color: selectedEra.colors.text }}
                  />
                )}
                
                <p 
                  className={`text-center text-sm ${selectedEra.fontClass}`}
                  style={{ color: selectedEra.colors.text, opacity: 0.6 }}
                >
                  {isStripComplete 
                    ? "Photostrip complete!" 
                    : `Add ${STRIP_PHOTO_COUNT - photos.length} more photo${STRIP_PHOTO_COUNT - photos.length !== 1 ? "s" : ""}`
                  }
                </p>
              </div>
            )}

            <canvas ref={canvasRef} className="hidden" />
          </div>

          {/* Action Buttons */}
          <div className="mt-4 flex flex-wrap gap-2 justify-center">
            {!isStripComplete && (
              <>
                {!isCameraActive ? (
                  <Button
                    onClick={startCamera}
                    className="gap-2 transition-all duration-300"
                    style={{ 
                      backgroundColor: selectedEra.colors.accent,
                      color: selectedEra.colors.primary,
                    }}
                  >
                    <Camera className="w-4 h-4" />
                    Start Camera
                  </Button>
                ) : (
                  <>
                    <Button
                      onClick={capturePhoto}
                      disabled={countdown !== null}
                      className="gap-2 transition-all duration-300"
                      style={{ 
                        backgroundColor: selectedEra.colors.accent,
                        color: selectedEra.colors.primary,
                      }}
                    >
                      <Camera className="w-4 h-4" />
                      {countdown !== null ? "Get Ready..." : "Take Photo"}
                    </Button>
                    <Button
                      onClick={stopCamera}
                      variant="outline"
                      className="gap-2"
                      style={{ 
                        borderColor: selectedEra.colors.accent,
                        color: selectedEra.colors.text,
                      }}
                    >
                      <X className="w-4 h-4" />
                      Stop
                    </Button>
                  </>
                )}
                
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                  className="gap-2"
                  style={{ 
                    borderColor: selectedEra.colors.accent,
                    color: selectedEra.colors.text,
                  }}
                >
                  <Upload className="w-4 h-4" />
                  Upload
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </>
            )}

            {photos.length > 0 && (
              <>
                <Button
                  onClick={downloadPhotostrip}
                  disabled={isDownloading}
                  className="gap-2 transition-all duration-300"
                  style={{ 
                    backgroundColor: selectedEra.colors.accent,
                    color: selectedEra.colors.primary,
                  }}
                >
                  <Download className="w-4 h-4" />
                  {isDownloading ? "Creating..." : "Download Strip"}
                </Button>
                <Button
                  onClick={resetPhotobooth}
                  variant="outline"
                  className="gap-2"
                  style={{ 
                    borderColor: selectedEra.colors.accent,
                    color: selectedEra.colors.text,
                  }}
                >
                  <RefreshCw className="w-4 h-4" />
                  Reset
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Right Side - Photostrip Preview */}
        <div className="w-full lg:w-auto flex justify-center">
          <div 
            className="relative p-4 rounded-2xl transition-all duration-500"
            style={{ 
              backgroundColor: selectedEra.colors.primary,
              boxShadow: `0 0 60px ${selectedEra.colors.glow}`,
              border: `4px solid ${selectedEra.colors.accent}`,
            }}
          >
            {/* Decorative corner elements */}
            <div 
              className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2"
              style={{ borderColor: selectedEra.colors.accent }}
            />
            <div 
              className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2"
              style={{ borderColor: selectedEra.colors.accent }}
            />
            <div 
              className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2"
              style={{ borderColor: selectedEra.colors.accent }}
            />
            <div 
              className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2"
              style={{ borderColor: selectedEra.colors.accent }}
            />

            {/* Strip Header */}
            <div className="text-center mb-3">
              <h3 
                className={`text-sm font-bold uppercase tracking-wider ${selectedEra.fontClass} ${selectedEra.fontStyle}`}
                style={{ color: selectedEra.colors.text }}
              >
                {selectedEra.name}
              </h3>
            </div>

            {/* Photo Frames */}
            <div className="flex flex-col gap-3">
              {Array.from({ length: STRIP_PHOTO_COUNT }).map((_, index) => (
                <div
                  key={index}
                  className="relative w-[200px] h-[200px] rounded-lg overflow-hidden transition-all duration-300"
                  style={{ 
                    backgroundColor: selectedEra.colors.secondary,
                    border: `2px solid ${selectedEra.colors.accent}`,
                    boxShadow: photos[index] ? `0 0 20px ${selectedEra.colors.glow}` : undefined,
                  }}
                >
                  {photos[index] ? (
                    <>
                      <img 
                        src={photos[index]} 
                        alt={`Photo ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => removePhoto(index)}
                        className="absolute top-1 right-1 w-6 h-6 rounded-full flex items-center justify-center transition-all hover:scale-110"
                        style={{ 
                          backgroundColor: selectedEra.colors.primary + "cc",
                          color: selectedEra.colors.accent,
                        }}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                      <Plus 
                        className="w-8 h-8 opacity-30"
                        style={{ color: selectedEra.colors.text }}
                      />
                      <span 
                        className="text-xs opacity-50"
                        style={{ color: selectedEra.colors.text }}
                      >
                        Photo {index + 1}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Strip Footer */}
            <div className="text-center mt-4 pt-3 border-t" style={{ borderColor: selectedEra.colors.accent + "40" }}>
              <p 
                className={`text-xs font-bold uppercase tracking-widest ${selectedEra.fontClass}`}
                style={{ color: selectedEra.colors.accent }}
              >
                ENHYPEN
              </p>
              <p 
                className="text-[10px] mt-1"
                style={{ color: selectedEra.colors.text, opacity: 0.6 }}
              >
                {selectedEra.album} - {selectedEra.year}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
