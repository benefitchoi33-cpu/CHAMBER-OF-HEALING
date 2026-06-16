import { useState, useEffect } from "react";
import { ColorGrid } from "./components/ColorGrid.tsx";
import { ChamberWindow } from "./components/ChamberWindow.tsx";
import { HealingHistory } from "./components/HealingHistory.tsx";
import { DeepAnalysis } from "./components/DeepAnalysis.tsx";
import { colorProfiles } from "./colorData.ts";
import { Compass, Sparkles, BookOpen, Clock, RotateCcw } from "lucide-react";
import { motion } from "motion/react";

interface HistoryItem {
  timestamp: string;
  num: number;
  title: string;
}

interface HealingData {
  stateTitle: string;
  stateDescription: string;
  spaceThemeTitle: string;
  spaceThemeDescription: string;
  meditationTitle: string;
  meditationSteps: string[];
  meditationAmbientSoundName: string;
  progressionAnalysis: string;
}

export default function App() {
  const [selectedNum, setSelectedNum] = useState<number | null>(null);
  const [healingData, setHealingData] = useState<HealingData | null>(null);
  const [historyList, setHistoryList] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<string>("");
  const [step, setStep] = useState<number>(1);
  const [showIntro, setShowIntro] = useState<boolean>(true);

  // 1. Initialize states and load history list from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("healing_vault_history");
      if (stored) {
        setHistoryList(JSON.parse(stored));
      }
    } catch (e) {
      console.warn("Could not read localStorage healing keys:", e);
    }

    // Dynamic clean clock
    const updateTime = () => {
      const d = new Date();
      const yr = d.getFullYear();
      const mo = String(d.getMonth() + 1).padStart(2, "0");
      const dy = String(d.getDate()).padStart(2, "0");
      const hr = String(d.getHours()).padStart(2, "0");
      const mn = String(d.getMinutes()).padStart(2, "0");
      setCurrentTime(`${yr}-${mo}-${dy} ${hr}:${mn}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  // 2. Fetch architectural healing space from Gemini backend
  const handleSelectColor = async (num: number) => {
    setSelectedNum(num);
    setStep(2);
    setLoading(true);
    setHealingData(null);

    // Current selection definition
    const profile = colorProfiles[num];
    if (!profile) return;

    // Get previous selections (excluding current to prevent feedback loops in analysis)
    const storedHistory = [...historyList];
    const prevNumbers = storedHistory.map((item) => item.num);

    try {
      const response = await fetch("/api/healing-guide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          selectedNum: num,
          history: prevNumbers,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "치유 공간 도면 설계에 실패했습니다.");
      }

      setHealingData(data);

      // Append new selection to the timeline history
      const now = new Date();
      const timestampStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
      
      const newHistoryItem: HistoryItem = {
        timestamp: timestampStr,
        num: num,
        title: profile.title,
      };

      const updatedHistory = [newHistoryItem, ...storedHistory];
      setHistoryList(updatedHistory);
      localStorage.setItem("healing_vault_history", JSON.stringify(updatedHistory));
    } catch (error) {
      console.error("Error creating healing chamber:", error);
      // Fallback local schema if server or internet is spotty, keeping app bullet-proof
      setHealingData({
        stateTitle: profile.title,
        stateDescription: profile.desc,
        spaceThemeTitle: `${profile.title}의 열린 보듬뜰`,
        spaceThemeDescription: `빛의 깊이가 다정하게 조절된 차분한 은빛 아뜰리에입니다. 거친 질감의 자연석 마감과 잔잔히 부는 남풍 기류에 마음의 갈등을 뉘이고 쉴 수 있습니다.`,
        meditationTitle: "마음의 균형 복원 호흡 수련",
        meditationAmbientSoundName: "숲속 골짜기의 이슬비 소리",
        meditationSteps: [
          "1. 턱을 살며시 당기고 꼬리뼈를 내리며 척추를 세웁니다.",
          "2. 이 방이 지닌 흙빛 벽들의 따스하고 시원한 결을 마인드맵으로 품어봅니다.",
          "3. 들이마시는 4초 동안 온몸에 신선한 산소를 실어 보내고, 멈추는 4초 동안 마음에 빛을 채웁니다.",
          "4. 가만히 날숨의 4초간 미워진 감정과 복잡한 생각을 방의 먼지 속으로 흩뿌립니다."
        ],
        progressionAnalysis: "오프라인 모드로 임시 치유 도안을 표시합니다. 더 풍성한 종합 progression 진단은 서버와 연계된 온라인 진단시 온전히 제공됩니다."
      });
    } finally {
      setLoading(false);
    }
  };

  const clearHistory = () => {
    setHistoryList([]);
    localStorage.removeItem("healing_vault_history");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 selection:bg-indigo-100 overflow-x-hidden pb-16 font-sans relative">
      {/* Background Mesh Gradient */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-45 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[65%] h-[65%] rounded-full bg-blue-200 blur-[130px]" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[55%] h-[55%] rounded-full bg-indigo-100 blur-[110px]" />
        <div className="absolute top-[40%] right-[15%] w-[40%] h-[40%] rounded-full bg-purple-100 blur-[100px]" />
      </div>

      {/* 1. Header Area with architectural aesthetics */}
      <header className="border-b border-white/20 bg-white/25 backdrop-blur-xl sticky top-0 z-50 transition-all duration-300 shadow-xs relative">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo brand */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => {
                setShowIntro(true);
                setSelectedNum(null);
                setHealingData(null);
                setStep(1);
              }}
              className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shrink-0 shadow-sm border border-indigo-400 hover:bg-indigo-700 transition-colors cursor-pointer"
            >
              <Compass className="w-5.5 h-5.5 text-white" />
            </button>
            <div className="text-left">
              <button 
                onClick={() => {
                  setShowIntro(true);
                  setSelectedNum(null);
                  setHealingData(null);
                  setStep(1);
                }}
                className="flex items-center gap-1.5 focus:outline-hidden text-left cursor-pointer"
              >
                <h1 className="font-serif font-bold text-lg tracking-tight text-slate-900 hover:text-indigo-600 transition-colors">
                  치유의방
                </h1>
                <span className="font-cinzel text-xs font-semibold text-indigo-500 tracking-widest mt-0.5">
                  CHAMBER OF HEALING
                </span>
              </button>
              <p className="text-[10px] text-slate-400 font-sans tracking-wide">
                Architectural Psychology Guide & Mindfulness Vault
              </p>
            </div>
          </div>

          {/* Time & Environment Status Indicator - Architectural Blueprint Vibe */}
          <div className="hidden sm:flex items-center gap-5 font-mono text-[11px] text-indigo-900 z-10">
            <div className="flex items-center gap-1.5 bg-white/50 backdrop-blur-md border border-white/40 px-3 py-1.5 rounded-xl shadow-xs">
              <Clock className="w-3.5 h-3.5 text-indigo-500" />
              <span>Vault Time:</span>
              <span className="text-indigo-950 font-bold">{currentTime || "Loading..."}</span>
            </div>

            <div className="flex items-center gap-1.5 bg-indigo-50/40 border border-indigo-100/30 px-3 py-1.5 rounded-xl shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
              <span>Chamber Status:</span>
              <span className="text-indigo-700 font-extrabold uppercase tracking-widest">Active</span>
            </div>
          </div>

        </div>
      </header>

      {/* 2. Main Content Dashboard Grid */}
      <main className="max-w-7xl mx-auto px-6 mt-8 relative z-10">
        
        {showIntro ? (
          /* Introduction Screen */
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto mt-12 mb-16 text-center space-y-10"
          >
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-3xl bg-indigo-50 border-2 border-indigo-100 flex items-center justify-center text-indigo-600 shadow-xl animate-[pulse_3s_ease-in-out_infinite]">
                <Compass className="w-10 h-10" />
              </div>
            </div>

            <div className="space-y-6">
              <span className="font-mono text-xs text-indigo-600 font-extrabold tracking-widest uppercase bg-indigo-50 px-4 py-1.5 rounded-full border border-indigo-100/50">
                Architectural Psychology & Color Projection
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-slate-900 font-black tracking-tight leading-tight max-w-2xl mx-auto">
                "색채라는 언어로 당신의 내면을 투영합니다."
              </h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto font-sans">
                이 테스트는 심리학적 투영 기법을 활용한 상담 도구입니다. 당신의 직관적인 선택을 통해 무의식 속 감정을 마주하고, 그에 따른 최적의 건축적 치유 공간을 발견해 보세요. 이제 36가지 중 가장 마음이 가는 색채를 선택하세요. 당신을 위한 치유의 방이 열립니다.
              </p>
            </div>

            <div className="pt-4">
              <button
                onClick={() => {
                  setShowIntro(false);
                  setStep(1);
                }}
                className="inline-flex items-center justify-center gap-2.5 bg-indigo-600 hover:bg-indigo-700 active:transform active:scale-98 text-white font-bold py-4.5 px-10 rounded-2xl transition-all duration-300 shadow-lg shadow-indigo-150/40 border border-indigo-500/30 font-sans cursor-pointer text-base text-center group"
              >
                <span>내면의 색채 분석 시작하기</span>
                <Sparkles className="w-5 h-5 text-indigo-200 group-hover:animate-spin" />
              </button>
            </div>
          </motion.div>
        ) : (
          /* Guided Experience Screen */
          <>
            {/* Elegant Guided Journey Progress Indicator bar */}
            <div className="mb-10 max-w-4xl mx-auto bg-white/45 backdrop-blur-md border border-white/50 rounded-[28px] p-4 shadow-xl">
              <div className="flex flex-col sm:flex-row items-stretch justify-between gap-2.5">
                {[
                  { n: 1, label: "1. 색채 선택", desc: "감정 지향점 터치" },
                  { n: 2, label: "2. 감정 진단", desc: "무의식 무늬 해명" },
                  { n: 3, label: "3. 치유의 방", desc: "빛과 소리 공간 조율" },
                  { n: 4, label: "4. 명상 수련", desc: "정화 호흡 리추얼" },
                  { n: 5, label: "5. 심화 분석", desc: "평온 궤적 아카이브" },
                ].map((item) => {
                  const isActive = step === item.n;
                  const isPassed = step > item.n;
                  const isInteractive = selectedNum !== null && healingData !== null;
                  
                  return (
                    <button
                      key={item.n}
                      disabled={item.n > 1 && !isInteractive}
                      onClick={() => setStep(item.n)}
                      className={`flex-1 flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 text-left group border border-transparent
                        ${isActive 
                          ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100/50 border-indigo-500" 
                          : isPassed
                            ? "text-indigo-600 bg-indigo-50/40 hover:bg-indigo-50 border-indigo-100/30"
                            : "text-slate-400 bg-white/50"
                        }
                        ${(item.n === 1 || isInteractive) ? "cursor-pointer" : "cursor-not-allowed opacity-60"}
                      `}
                    >
                      {/* Circle */}
                      <div className={`w-7 h-7 rounded-lg font-sans text-xs font-black flex items-center justify-center border shrink-0 transition-colors
                        ${isActive 
                          ? "bg-white text-indigo-600 border-white" 
                          : isPassed
                            ? "bg-indigo-100 border-indigo-200 text-indigo-600" 
                            : "border-slate-200 text-slate-400 bg-white"
                        }
                      `}>
                        {isPassed ? "✓" : item.n}
                      </div>
                      
                      <div>
                        <span className={`text-xs block font-bold transition-colors ${isActive ? "text-white" : "text-slate-900"}`}>
                          {item.label}
                        </span>
                        <span className={`text-[10px] block transition-colors ${isActive ? "text-indigo-100/90 font-medium" : "text-slate-400"}`}>
                          {item.desc}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dynamic Division Layout: Switch panels based on active step sequence */}
            <div className="max-w-4xl mx-auto">
              
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  {/* Simplified Direct Selection Grid */}
                  <ColorGrid 
                    onSelect={handleSelectColor} 
                    selectedNum={selectedNum} 
                  />
                </motion.div>
              )}

              {(step === 2 || step === 3 || step === 4) && (
                <ChamberWindow 
                  selectedProfile={selectedNum ? colorProfiles[selectedNum] : null}
                  healingData={healingData}
                  loading={loading}
                  step={step}
                  setStep={setStep}
                  historyList={historyList}
                  onSelectItem={(num) => {
                    handleSelectColor(num);
                  }}
                  onClearHistory={clearHistory}
                  onReset={() => {
                    setSelectedNum(null);
                    setHealingData(null);
                    setStep(1);
                  }}
                />
              )}

              {step === 5 && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  <div className="bg-white/50 backdrop-blur-md border border-white/60 shadow-xl rounded-[32px] p-6 md:p-8 relative overflow-hidden">
                    <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                      <div>
                        <span className="font-mono text-xs text-indigo-500 uppercase tracking-widest font-black block mb-1">
                          Step 5. Professional Progression Analysis
                        </span>
                        <h2 className="font-serif text-2xl text-slate-900 font-bold">
                          아카이브 통합 심화 분석
                        </h2>
                        <span className="text-slate-500 text-xs font-sans mt-1 block">
                          지금껏 누적된 치유 주파수 선택 이력과 내면 감정의 파동 궤적을 심화 계측한 임상적 소견 리포트입니다.
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setStep(4)}
                          className="flex items-center gap-1.5 text-xs bg-white hover:bg-slate-50 text-slate-700 font-bold py-2.5 px-4 rounded-xl transition border border-slate-200 cursor-pointer"
                        >
                          이전 단계로
                        </button>
                        <button
                          onClick={() => {
                            setSelectedNum(null);
                            setHealingData(null);
                            setStep(1);
                          }}
                          className="flex items-center gap-1.5 text-xs bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-4 rounded-xl transition cursor-pointer"
                        >
                          처음으로 돌아가기 <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <DeepAnalysis 
                      historyList={historyList} 
                      onSelectItem={(num) => {
                        handleSelectColor(num);
                      }}
                      onClearHistory={clearHistory}
                    />
                  </div>
                </motion.div>
              )}

            </div>
          </>
        )}

      </main>

      {/* Footer copyright */}
      <footer className="mt-20 border-t border-white/20 pt-8 text-center text-xs text-indigo-500/80 font-mono relative z-10">
        <p>© 2026 치유의방 (Chamber of Healing) • Crafted by AI Psychological Architect. All rights reserved.</p>
        <p className="mt-1 text-slate-400">"Every color carries an architectural soundscape of the sub-consciousness."</p>
      </footer>
    </div>
  );
}
