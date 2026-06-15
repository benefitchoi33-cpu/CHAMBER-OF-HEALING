import React, { useState } from "react";
import { colorProfiles } from "../colorData.ts";
import { History, Calendar, Trash2, TrendingUp, HelpCircle, Activity, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Simple lightweight Markdown renderer to support clean styling without bundling issues on React 19
const CustomMarkdown: React.FC<{ text: string }> = ({ text }) => {
  const lines = text.split("\n");
  return (
    <div className="space-y-3 font-sans text-stone-700 text-sm leading-relaxed">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        
        if (trimmed.startsWith("###")) {
          return (
            <h4 key={idx} className="font-serif text-base font-bold text-[#1F1E1C] mt-4 pt-2 mb-1">
              {trimmed.replace("###", "").trim()}
            </h4>
          );
        }
        if (trimmed.startsWith("##")) {
          return (
            <h3 key={idx} className="font-serif text-lg font-bold text-[#1F1E1C] mt-5 border-b border-stone-200 pb-1 mb-2">
              {trimmed.replace("##", "").trim()}
            </h3>
          );
        }
        if (trimmed.startsWith("#")) {
          return (
            <h2 key={idx} className="font-serif text-xl font-bold text-[#1F1E1C] mt-6 border-b border-stone-300 pb-1.5 mb-2">
              {trimmed.replace("#", "").trim()}
            </h2>
          );
        }
        if (trimmed.startsWith("-") || trimmed.startsWith("*")) {
          // Bullet points
          const bulletText = trimmed.substring(1).trim();
          return (
            <ul key={idx} className="list-disc pl-5 my-1 space-y-1">
              <li>{parseBoldText(bulletText)}</li>
            </ul>
          );
        }
        if (trimmed === "") {
          return <div key={idx} className="h-2" />;
        }
        
        return <p key={idx}>{parseBoldText(trimmed)}</p>;
      })}
    </div>
  );
};

// Simple bold parser helper
function parseBoldText(text: string) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) => {
    if (i % 2 === 1) {
      return <strong key={i} className="text-[#1F1E1C] font-semibold">{part}</strong>;
    }
    return part;
  });
}

interface HistoryItem {
  timestamp: string;
  num: number;
  title: string;
}

interface HealingHistoryProps {
  historyList: HistoryItem[];
  onSelectItem: (num: number) => void;
  onClearHistory: () => void;
}

export const HealingHistory: React.FC<HealingHistoryProps> = ({
  historyList,
  onSelectItem,
  onClearHistory,
}) => {
  const [analysisText, setAnalysisText] = useState<string>("");
  const [analyzing, setAnalyzing] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [showConfirm, setShowConfirm] = useState<boolean>(false);

  const requestSequenceAnalysis = async () => {
    if (historyList.length < 2) {
      setError("상태 분석을 하려면 최소 2개 이상의 감정 선택 이력이 누적되어야 합니다.");
      return;
    }

    try {
      setAnalyzing(true);
      setError("");
      setAnalysisText("");

      // Extract sequence of numbers
      const numSequence = historyList.map((item) => item.num);

      const response = await fetch("/api/analyze-progression", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ history: numSequence }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "이력 분석에 실패했습니다.");
      }

      setAnalysisText(data.analysis);
    } catch (err: any) {
      setError(err.message || "서버 통신 중 에러가 발생했습니다.");
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="bg-white/50 backdrop-blur-md border border-white/60 shadow-xl rounded-[32px] p-6 md:p-8 flex flex-col gap-6 relative overflow-hidden transition-all duration-300">
      {/* Title block */}
      <div className="flex items-center justify-between border-b border-white/40 pb-4 relative z-10">
        <div className="flex items-center gap-2.5">
          <History className="w-5 h-5 text-indigo-500" />
          <h2 className="font-serif text-xl text-slate-950 font-bold">
            마인드 아카이브 (누적 기록)
          </h2>
        </div>
        {historyList.length > 0 && (
          <div className="flex items-center gap-1.5 z-20">
            {showConfirm ? (
              <div className="flex items-center gap-1.5 bg-rose-50 border border-rose-200 rounded-xl px-2.5 py-1 shadow-sm">
                <span className="text-[10px] font-bold text-rose-700 font-sans">진짜 지울까요?</span>
                <button
                  onClick={() => {
                    onClearHistory();
                    setShowConfirm(false);
                  }}
                  className="text-[10px] font-bold text-white bg-rose-600 hover:bg-rose-700 px-2 py-1 rounded-lg transition-all shadow-xs cursor-pointer select-none"
                >
                  지우기
                </button>
                <button
                  onClick={() => setShowConfirm(false)}
                  className="text-[10px] font-bold text-[#1F1E1C] bg-white hover:bg-stone-50 px-2 py-1 rounded-lg border border-stone-200 transition-all cursor-pointer select-none"
                >
                  취소
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowConfirm(true)}
                className="text-[11px] font-mono hover:text-red-500 text-slate-500 flex items-center gap-1 transition-colors px-2 py-1 rounded bg-white/40 hover:bg-red-50/50 border border-transparent hover:border-red-100 cursor-pointer select-none"
                title="기록 지우기"
              >
                <Trash2 className="w-3.5 h-3.5" /> 전체 초기화
              </button>
            )}
          </div>
        )}
      </div>

      {historyList.length === 0 ? (
        /* Empty History status */
        <div className="text-center py-8 bg-white/30 backdrop-blur-xs rounded-2xl border border-dashed border-white/50 flex flex-col items-center">
          <HelpCircle className="w-8 h-8 text-indigo-400/50 mb-2" />
          <p className="text-xs text-slate-500 font-sans leading-relaxed">
            아직 누적된 치유 기록이 없습니다.<br />
            오감을 자극하는 색채를 탭하여 첫 공간을 아카이빙해 보세요.
          </p>
        </div>
      ) : (
        /* Render timelines of user choices */
        <div className="flex flex-col md:flex-row gap-6">
          {/* History selection column */}
          <div className="flex-1 max-h-[300px] overflow-y-auto space-y-2 pr-1 relative z-10">
            <span className="text-[10px] uppercase font-mono text-indigo-500/80 block mb-1 font-bold tracking-widest">
              Healing Timeline ({historyList.length} saves)
            </span>
            <div className="space-y-1.5">
              {historyList.map((item, idx) => {
                const colors = colorProfiles[item.num]?.colors;
                const isSplit = colors?.type === "split";
                
                return (
                  <button
                    key={idx}
                    onClick={() => onSelectItem(item.num)}
                    className="w-full text-left bg-white/60 hover:bg-white/90 border border-white/50 hover:border-indigo-200 rounded-2xl p-3 flex items-center justify-between gap-3 transition-all duration-200 group shadow-xs"
                  >
                    <div className="flex items-center gap-3">
                      {/* Nano Color representation */}
                      <div className="w-6 h-6 rounded-full overflow-hidden border border-slate-900 shrink-0 relative">
                        {isSplit ? (
                          <>
                            <div className="absolute inset-y-0 left-0 w-1/2" style={{ backgroundColor: colors.leftFill }} />
                            <div className="absolute inset-y-0 right-0 w-1/2" style={{ backgroundColor: colors.rightFill }} />
                            <div className="absolute inset-y-0 left-1/2 w-[1px] bg-slate-900" />
                          </>
                        ) : (
                          <div className="w-full h-full" style={{ backgroundColor: colors?.fill }} />
                        )}
                      </div>
                      
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                          {item.num}. {item.title}
                        </h4>
                        <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1 mt-0.5">
                          <Calendar className="w-3 h-3" /> {item.timestamp}
                        </span>
                      </div>
                    </div>
                    
                    <span className="text-[10px] font-mono text-indigo-700 bg-indigo-50/50 border border-indigo-100/50 px-2 py-0.5 rounded-md group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all font-semibold">
                      자세히 보기
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* AI Guide Progression analysis panel */}
          <div className="flex-1 bg-white/35 border border-white/60 rounded-[24px] p-5 flex flex-col justify-between backdrop-blur-xs shadow-inner relative z-10">
            <div>
              <span className="font-mono text-[10px] text-indigo-500/80 uppercase tracking-widest block mb-1 font-bold">
                Sequence Progression Diagnostics
              </span>
              <h3 className="font-serif text-base font-bold text-slate-950 flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-indigo-500" /> 감정 상태 변화 추이 분석
              </h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed font-sans pb-1">
                사용자의 연속된 감정 흐름(색채 선택 시퀀스)을 인공지능 건축가가 면밀히 진단하여, 마음이 순항하고 있는지 혹은 탈진 상태가 심해지고 있는지 정량적으로 해명해 드립니다.
              </p>
            </div>

            {/* Response Area */}
            <div className="mt-4">
              <AnimatePresence mode="wait">
                {analyzing ? (
                  <motion.div
                    key="analyzing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-6 flex flex-col items-center text-center justify-center bg-white rounded-lg border border-[#EBE6DC]/60"
                  >
                    <div className="w-8 h-8 rounded-full border-t border-b border-[#8C8476] animate-spin mb-2" />
                    <span className="text-xs font-mono text-[#8C8476] tracking-wider animate-pulse">
                      정신 감정 시퀀스 공명 분석 중...
                    </span>
                  </motion.div>
                ) : analysisText ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-white/90 rounded-2xl border border-white shadow-inner max-h-[220px] overflow-y-auto"
                  >
                    <div className="flex items-center gap-1 mb-2 border-b border-indigo-50/50 pb-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                      <span className="text-[11px] font-bold text-indigo-900 font-sans">심리 건축가 편지</span>
                    </div>
                    <CustomMarkdown text={analysisText} />
                  </motion.div>
                ) : null}
              </AnimatePresence>

              {error && (
                <p className="text-xs text-rose-600 bg-rose-50 border border-rose-100 p-2.5 rounded-lg mt-2 font-sans">
                  {error}
                </p>
              )}

              <div className="mt-4 flex justify-end">
                <button
                  onClick={requestSequenceAnalysis}
                  disabled={historyList.length < 2 || analyzing}
                  className={`w-full md:w-auto text-xs font-bold px-4 py-2.5 rounded-xl border transition-all duration-200 flex items-center justify-center gap-1.5
                    ${
                      historyList.length < 2
                        ? "bg-slate-100/55 text-slate-300 border-slate-100 cursor-not-allowed"
                        : "bg-indigo-600 hover:bg-indigo-700 text-white border-indigo-600 shadow-md shadow-indigo-100 cursor-pointer"
                    }
                  `}
                >
                  <TrendingUp className="w-3.5 h-3.5" />
                  감정 변화 흐름 분석 받기 (AI 종합 진단)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
