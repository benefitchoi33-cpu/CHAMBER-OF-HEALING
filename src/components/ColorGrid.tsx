import React from "react";
import { colorProfiles, ColorProfile } from "../colorData.ts";

interface ColorCircleProps {
  profile: ColorProfile;
  size?: number;
}

export const ColorCircle: React.FC<ColorCircleProps> = ({ profile, size = 52 }) => {
  const { colors } = profile;

  if (colors.type === "solid") {
    // Solid color circle
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        className="drop-shadow-sm transition-transform duration-200"
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          fill={colors.fill}
          stroke="#1F1E1C"
          strokeWidth="3.5"
        />
      </svg>
    );
  } else {
    // Split color circle (left/right)
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        className="drop-shadow-sm transition-transform duration-200"
      >
        {/* Right side backing */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill={colors.rightFill}
          stroke="#1F1E1C"
          strokeWidth="3.5"
        />
        {/* Left side overlay (semi-circle) */}
        <path
          d="M 50,5 A 45,45 0 0,0 50,95 Z"
          fill={colors.leftFill}
        />
        {/* Center divider line */}
        <line
          x1="50"
          y1="5"
          x2="50"
          y2="95"
          stroke="#1F1E1C"
          strokeWidth="3.5"
        />
      </svg>
    );
  }
};

interface ColorGridProps {
  onSelect: (num: number) => void;
  selectedNum: number | null;
}

export const ColorGrid: React.FC<ColorGridProps> = ({ onSelect, selectedNum }) => {
  return (
    <div className="bg-white/50 backdrop-blur-md border border-white/60 shadow-xl rounded-[32px] p-6 md:p-8 relative overflow-hidden transition-all duration-300">
      <div className="mb-6 relative z-10">
        <span className="font-mono text-xs text-indigo-500/80 uppercase tracking-widest block mb-1">
          Select Your Palette
        </span>
        <h2 className="font-serif text-2xl text-slate-900 font-bold">
          36가지 영혼의 색채 진단
        </h2>
        <p className="text-sm text-slate-600/95 mt-2 leading-relaxed">
          어릴 적 그림책을 보듯, 현재 직관적으로 가장 마음이 가거나 시선이 멈추는 동그라미를 한 가지 선택해 주세요. 당신이 감춘 무의식의 상실이나 치유의 갈증을 응답합니다.
        </p>
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-6 lg:grid-cols-9 gap-4 md:gap-5 relative z-10">
        {Object.values(colorProfiles).map((profile) => {
          const isSelected = selectedNum === profile.num;
          return (
            <button
              key={profile.num}
              id={`color-circle-btn-${profile.num}`}
              onClick={() => onSelect(profile.num)}
              className={`relative flex flex-col items-center justify-center p-2 rounded-2xl transition-all duration-300 group
                ${
                  isSelected
                    ? "bg-white/80 ring-2 ring-indigo-500/20 border border-indigo-200/50 shadow-md transform scale-105"
                    : "hover:bg-white/35 border border-transparent hover:border-white/40 focus:outline-none"
                }
              `}
            >
              {/* Animated hover glow element */}
              <div
                className={`absolute inset-0 rounded-2xl bg-radial from-indigo-100/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`}
              />

              {/* Programmatic SVG Color Circle */}
              <div className="relative group-hover:scale-110 transition-transform duration-200 z-10">
                <ColorCircle profile={profile} size={48} />
              </div>

              {/* Number tag */}
              <span className={`font-mono text-[11px] font-bold mt-1.5 z-10 ${isSelected ? "text-indigo-600" : "text-slate-500"}`}>
                {profile.num}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
