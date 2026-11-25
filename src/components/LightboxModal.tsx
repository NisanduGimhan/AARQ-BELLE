"use client";

import { useEffect, useCallback } from "react";

interface LightboxModalProps {
  images: string[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function LightboxModal({
  images,
  currentIndex,
  onClose,
  onNavigate,
}: LightboxModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (currentIndex === null) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate((currentIndex + 1) % images.length);
      if (e.key === "ArrowLeft")
        onNavigate((currentIndex - 1 + images.length) % images.length);
    },
    [currentIndex, images.length, onClose, onNavigate]
  );

  useEffect(() => {
    if (currentIndex !== null) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentIndex, handleKeyDown]);

  if (currentIndex === null) return null;

  const currentImage = images[currentIndex];

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-md"
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        type="button"
        className="absolute top-6 right-6 z-50 p-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all focus:outline-none"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Close Lightbox"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      {/* Counter */}
      <div className="absolute top-6 left-6 text-xs uppercase tracking-widest text-white/70 bg-black/40 px-4 py-2 rounded-full border border-white/10">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Left Navigation Button */}
      {images.length > 1 && (
        <button
          type="button"
          className="absolute left-6 z-50 p-4 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all focus:outline-none"
          onClick={(e) => {
            e.stopPropagation();
            onNavigate((currentIndex - 1 + images.length) % images.length);
          }}
          aria-label="Previous Image"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
      )}

      {/* Center Image */}
      <div
        className="relative max-w-[90vw] max-h-[85vh] flex items-center justify-center p-2"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={currentImage}
          alt={`Gallery item ${currentIndex + 1}`}
          className="max-w-full max-h-[85vh] object-contain transition-all duration-300"
          style={{ border: "none", outline: "none", boxShadow: "none" }}
        />
      </div>

      {/* Right Navigation Button */}
      {images.length > 1 && (
        <button
          type="button"
          className="absolute right-6 z-50 p-4 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all focus:outline-none"
          onClick={(e) => {
            e.stopPropagation();
            onNavigate((currentIndex + 1) % images.length);
          }}
          aria-label="Next Image"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      )}
    </div>
  );
}
