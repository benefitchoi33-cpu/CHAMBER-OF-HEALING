import React, { useMemo } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  Bar,
  Cell
} from "recharts";
import { 
  TrendingUp, 
  Heart, 
  Activity, 
  ShieldAlert, 
  Zap, 
  HelpCircle, 
  Calendar, 
  Info, 
  Sparkles,
  Award,
  Flame,
  Brain
} from "lucide-react";
import { colorProfiles } from "../colorData.ts";
import { HealingHistory } from "./HealingHistory.tsx";

interface HistoryItem {
  timestamp: string;
  num: number;
  title: string;
}

interface DeepAnalysisProps {
  historyList: HistoryItem[];
  onSelectItem: (num: number) => void;
  onClearHistory: () => void;
}

export const getEmotionalIndices = (num: number) => {
  // Return emotional dimensions [sadness, anxiety, desire, vitality] between 0 and 100 perfectly aligned with the 36 profiles in colorData.ts
  let sadness = 20;
  let anxiety = 25;
  let desire = 30;
  let vitality = 50;

  switch (num) {
    case 1: // 쓸쓸함/어리광
      sadness = 75; anxiety = 40; desire = 80; vitality = 35; break;
    case 2: // 명랑/자신감
      sadness = 10; anxiety = 10; desire = 15; vitality = 95; break;
    case 3: // 우울
      sadness = 90; anxiety = 55; desire = 30; vitality = 15; break;
    case 4: // 소화기 불량
      sadness = 25; anxiety = 75; desire = 40; vitality = 40; break;
    case 5: // 비뇨기 불량
      sadness = 30; anxiety = 60; desire = 30; vitality = 35; break;
    case 6: // 불신/의혹
      sadness = 65; anxiety = 85; desire = 45; vitality = 25; break;
    case 7: // 피(상처)
      sadness = 50; anxiety = 90; desire = 35; vitality = 20; break;
    case 8: // 체념/거슬림
      sadness = 55; anxiety = 65; desire = 85; vitality = 30; break;
    case 9: // 도움 필요
      sadness = 95; anxiety = 80; desire = 60; vitality = 10; break;
    case 10: // 강렬한 물욕
      sadness = 45; anxiety = 70; desire = 95; vitality = 25; break;
    case 11: // 자기주장욕
      sadness = 20; anxiety = 65; desire = 85; vitality = 75; break;
    case 12: // 근심
      sadness = 55; anxiety = 85; desire = 35; vitality = 30; break;
    case 13: // 남성 그리움
      sadness = 80; anxiety = 60; desire = 70; vitality = 35; break;
    case 14: // 물욕/애정욕
      sadness = 30; anxiety = 50; desire = 70; vitality = 50; break;
    case 15: // 몸 상태 불량
      sadness = 75; anxiety = 70; desire = 25; vitality = 15; break;
    case 16: // 육체적 피로
      sadness = 60; anxiety = 75; desire = 30; vitality = 20; break;
    case 17: // 증오/적의
      sadness = 50; anxiety = 90; desire = 60; vitality = 40; break;
    case 18: // 만족/포만
      sadness = 10; anxiety = 10; desire = 15; vitality = 95; break;
    case 19: // 겸허한 체험
      sadness = 65; anxiety = 35; desire = 30; vitality = 45; break;
    case 20: // 이성 그리움
      sadness = 40; anxiety = 50; desire = 85; vitality = 70; break;
    case 21: // 봉사
      sadness = 30; anxiety = 45; desire = 20; vitality = 55; break;
    case 22: // 학대 충동
      sadness = 55; anxiety = 85; desire = 75; vitality = 35; break;
    case 23: // 희망
      sadness = 10; anxiety = 10; desire = 20; vitality = 95; break;
    case 24: // 초조함
      sadness = 50; anxiety = 95; desire = 40; vitality = 25; break;
    case 25: // 독선/들뜸
      sadness = 15; anxiety = 40; desire = 50; vitality = 85; break;
    case 26: // 명랑 속 불안
      sadness = 35; anxiety = 60; desire = 25; vitality = 65; break;
    case 27: // 절대자 사랑
      sadness = 20; anxiety = 20; desire = 15; vitality = 85; break;
    case 28: // 허기
      sadness = 25; anxiety = 45; desire = 75; vitality = 50; break;
    case 29: // 망설임
      sadness = 45; anxiety = 80; desire = 35; vitality = 40; break;
    case 30: // 소화기 질환
      sadness = 65; anxiety = 85; desire = 30; vitality = 20; break;
    case 31: // 수면 문제
      sadness = 60; anxiety = 85; desire = 25; vitality = 20; break;
    case 32: // 정서불안
      sadness = 75; anxiety = 95; desire = 30; vitality = 15; break;
    case 33: // 신변 정리
      sadness = 35; anxiety = 65; desire = 60; vitality = 50; break;
    case 34: // 회복
      sadness = 10; anxiety = 10; desire = 10; vitality = 95; break;
    case 35: // 여성 그리움
      sadness = 80; anxiety = 60; desire = 70; vitality = 35; break;
    case 36: // 애정 결핍
      sadness = 95; anxiety = 70; desire = 80; vitality = 15; break;
  }

  return { sadness, anxiety, desire, vitality };
};

export const DeepAnalysis: React.FC<DeepAnalysisProps> = ({ historyList, onSelectItem, onClearHistory }) => {
  
  // 1. Process trend data for Line Chart (chronological: oldest to newest)
  const trendData = useMemo(() => {
    return [...historyList]
      .reverse()
      .map((item, index) => {
        const indices = getEmotionalIndices(item.num);
        const profile = colorProfiles[item.num];
        // Shorten timestamp for display
        const datePart = item.timestamp.split(" ")[0]?.substring(5) || "";
        const timePart = item.timestamp.split(" ")[1] || "";
        return {
          id: index + 1,
          name: `${index + 1}회차 (${datePart})`,
          fullTime: item.timestamp,
          title: item.title,
          colorCode: profile?.colors?.fill || profile?.colors?.leftFill || "#6366F1",
          우울도: indices.sadness,
          불안긴장: indices.anxiety,
          스트레스욕구: indices.desire,
          활력충전: indices.vitality,
        };
      });
  }, [historyList]);

  // 2. Average psychological index calculations
  const summaryAverages = useMemo(() => {
    if (historyList.length === 0) {
      return { sadness: 0, anxiety: 0, desire: 0, vitality: 0 };
    }
    const sum = historyList.reduce(
      (acc, item) => {
        const ind = getEmotionalIndices(item.num);
        return {
          sadness: acc.sadness + ind.sadness,
          anxiety: acc.anxiety + ind.anxiety,
          desire: acc.desire + ind.desire,
          vitality: acc.vitality + ind.vitality,
        };
      },
      { sadness: 0, anxiety: 0, desire: 0, vitality: 0 }
    );

    const len = historyList.length;
    return {
      sadness: Math.round(sum.sadness / len),
      anxiety: Math.round(sum.anxiety / len),
      desire: Math.round(sum.desire / len),
      vitality: Math.round(sum.vitality / len),
    };
  }, [historyList]);

  // 3. Radar Chart Data
  const radarData = useMemo(() => {
    return [
      { subject: "울적함·사기저하", value: summaryAverages.sadness, fullMark: 100 },
      { subject: "과각성·불안긴장", value: summaryAverages.anxiety, fullMark: 100 },
      { subject: "결핍감·충동욕구", value: summaryAverages.desire, fullMark: 100 },
      { subject: "항상성·심신활력", value: summaryAverages.vitality, fullMark: 100 },
    ];
  }, [summaryAverages]);

  // 4. Color distribution calculations
  const colorDistribution = useMemo(() => {
    const counts: Record<number, { count: number; title: string; fill: string }> = {};
    historyList.forEach((item) => {
      const p = colorProfiles[item.num];
      if (!counts[item.num]) {
        counts[item.num] = {
          count: 0,
          title: item.title,
          fill: p?.colors?.fill || p?.colors?.leftFill || "#CBD5E1",
        };
      }
      counts[item.num].count += 1;
    });

    return Object.entries(counts)
      .map(([numStr, info]) => ({
        num: parseInt(numStr),
        title: info.title,
        count: info.count,
        fill: info.fill,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5); // top 5
  }, [historyList]);

  // 5. Advanced Healing Counseling Commentary synthesis
  const customAnalyticalCommentary = useMemo(() => {
    if (historyList.length === 0) return "";
    
    const latestItem = historyList[0];
    const latestIndices = getEmotionalIndices(latestItem.num);
    const profile = colorProfiles[latestItem.num];

    let focusTheme = "";
    let systemAdvice = "";

    if (latestIndices.sadness >= 70) {
      focusTheme = "울집 및 심리적 침전(Depressive Downward Sync) 증조";
      systemAdvice = "현재 내면의 기세가 가라앉아 에너지가 저대역 수용체에 멈춘 상태입니다. 이럴 때는 급박한 목표 실행을 모두 보류하고, 가상 테마실에서 조명을 조도 8-Lux 수준의 완벽히 흐릿한 황금 온색광으로 조율한 채 침잠하는 것을 추천합니다. 사운드는 싱잉볼 소리 같은 청정 배음이 마그네슘 같은 안정을 가져옵니다.";
    } else if (latestIndices.anxiety >= 70) {
      focusTheme = "교감신경 과활성 및 방어 기제(Sympathetic Overdrive) 고조";
      systemAdvice = "경계 신호와 근심으로 미주신경 밸런스가 위태로운 상태입니다. 불안이 심할 때는 차갑고 견고한 석재 마감재 등의 시각적 요소가 대뇌 편도체를 안착시킵니다. 정화호흡 단계에서 들숨(Inhale) 비율 대비 날숨(Exhale) 비율을 1.5배 이상 늘린 4-2-6 호흡이나 4-7-8 Pranayama 사이클에 맞춰서 맥박을 물리적으로 부드럽게 감속시키십시오.";
    } else if (latestIndices.desire >= 70) {
      focusTheme = "소유욕 및 보상성 자아 강박(Frustrated Desire Response)";
      systemAdvice = "채워지지 않는 대상에 신경 회로가 완전히 함몰되었거나, 반발성 스트레스가 임계점에 도달했습니다. 외부 수집 행위를 일체 멈추고 빈 공간을 바라보는 Savasana(완전 항복) 의식 명상이 극약 처방이 될 것입니다. 272Hz 수준의 동조 기류 진동 속에서 손가락 끝을 가볍게 두드리는 타성 탭 기법을 병행하면 불필요한 뉴런 긴장이 누그러집니다.";
    } else {
      focusTheme = "심신 항상성 복원 메커니즘(Functional Homeostasis) 안착";
      systemAdvice = "비교적 안정된 알파파 리듬을 유지하고 있습니다. 현재의 맑고 명랑한 자신감을 주위에 긍정 자애 투사(Metta Projection)로 흘려보내 마음의 요람을 더 넓게 다지십시오. 숲속 잔물결 같은 자연적 화이트 노이즈 속에서 꼬리뼈를 가볍게 세우고 잔잔한 정각(Mindful watching)을 이어가시면 좋습니다.";
    }

    // Dynamic trend commentary if user has multiple records
    let trendComment = "";
    if (historyList.length >= 2) {
      const prevItem = historyList[1];
      const prevIndices = getEmotionalIndices(prevItem.num);
      const isBetter = latestIndices.vitality > prevIndices.vitality;
      
      if (isBetter) {
        trendComment = "다행히 이전 회차 대비 심신 항상성과 활력 스펙트럼이 긍정적인 반등세를 보이고 있습니다. 호흡 정화 단계에서의 노력이 자율신경계 복원에 실질적으로 기여하고 있음을 보여줍니다.";
      } else {
        trendComment = "직전 심연 진찰 대비 피로 지수 혹은 교감 불안 반응이 증가하고 있어, 보다 적극적인 정적 안전 기지 조성이 요구되는 휴식 권장 시그널입니다.";
      }
    } else {
      trendComment = "최초 1회의 감정이 기록되었습니다. 앞으로 2회 이상 감정 점검이 이어질수록, 시간의 조류에 따른 감정 완화 경향 지표가 고도화되어 다이어그램으로 제공됩니다.";
    }

    return {
      focusTheme,
      systemAdvice,
      trendComment,
      latestDesc: profile?.desc || ""
    };
  }, [historyList]);


  if (historyList.length === 0) {
    return (
      <div className="bg-white/80 border border-white/60 backdrop-blur-md rounded-[32px] p-10 text-center shadow-xl">
        <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center mx-auto mb-5">
          <HelpCircle className="w-7 h-7 text-slate-450" />
        </div>
        <h3 className="font-serif text-xl font-bold text-slate-900">누적된 마인드 아카이브가 존재하지 않습니다</h3>
        <p className="text-slate-500 text-xs max-w-md mx-auto mt-2 leading-relaxed">
          메인 화면의 "색채 선택" 보드에서 오늘의 마음 상태를 치유의 색채 원반으로 먼저 진단하면, 
          누적된 이력 데이터가 무의식 알고리즘에 따라 복합적 감정 다이어그램으로 완벽하게 수렴됩니다.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      
      {/* 1. Header Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        
        <div className="bg-white/80 border border-white/60 backdrop-blur-md rounded-3xl p-5 shadow-xs flex items-center gap-4">
          <div className="w-11 h-11 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-500 shrink-0">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-mono block font-bold uppercase tracking-wider">누적 점검 횟수</span>
            <span className="text-xl font-black text-slate-950 font-mono">{historyList.length} <span className="text-xs text-slate-500 font-sans font-medium">회</span></span>
          </div>
        </div>

        <div className="bg-white/80 border border-white/60 backdrop-blur-md rounded-3xl p-5 shadow-xs flex items-center gap-4">
          <div className="w-11 h-11 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500 shrink-0">
            <Heart className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-mono block font-bold uppercase tracking-wider">평균 울적함</span>
            <span className="text-xl font-black text-rose-950 font-mono">{summaryAverages.sadness}<span className="text-xs text-slate-500 font-sans">%</span></span>
          </div>
        </div>

        <div className="bg-white/80 border border-white/60 backdrop-blur-md rounded-3xl p-5 shadow-xs flex items-center gap-4">
          <div className="w-11 h-11 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-500 shrink-0">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-mono block font-bold uppercase tracking-wider">평균 불안·긴장</span>
            <span className="text-xl font-black text-amber-950 font-mono">{summaryAverages.anxiety}<span className="text-xs text-slate-500 font-sans">%</span></span>
          </div>
        </div>

        <div className="bg-white/80 border border-white/60 backdrop-blur-md rounded-3xl p-5 shadow-xs flex items-center gap-4">
          <div className="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-500 shrink-0">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-mono block font-bold uppercase tracking-wider">평균 항상도·활력</span>
            <span className="text-xl font-black text-emerald-950 font-mono">{summaryAverages.vitality}<span className="text-xs text-slate-500 font-sans">%</span></span>
          </div>
        </div>

      </div>

      {/* 2. Interactive Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left column: Full-width line trend */}
        <div className="lg:col-span-8 bg-white/70 border border-white/60 backdrop-blur-md rounded-[32px] p-6 shadow-xl flex flex-col justify-between min-h-[400px]">
          <div>
            <div className="flex items-center gap-1 text-indigo-500 font-mono text-[10px] uppercase font-bold tracking-widest mb-1">
              <TrendingUp className="w-4 h-4" /> Timeline Psychological Trace
            </div>
            <h4 className="font-serif text-base font-bold text-slate-900">시계열 무의식 지평 추이 그래프</h4>
            <p className="text-slate-400 text-[10px] font-sans mt-0.5">회차별로 축적된 감정 스펙트럼의 동조적 변화 추세를 가볍게 역추적합니다.</p>
          </div>

          <div className="h-68 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 10, right: 15, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 9, fill: "#64748B", fontWeight: 600 }}
                  axisLine={{ stroke: "#E2E8F0" }}
                />
                <YAxis 
                  domain={[0, 100]} 
                  tick={{ fontSize: 9, fill: "#64748B" }} 
                  axisLine={{ stroke: "#E2E8F0" }}
                />
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-slate-950/95 backdrop-blur-md text-white p-3.5 rounded-2xl border border-white/10 shadow-xl max-w-xs font-sans text-xs">
                          <p className="font-mono text-[10px] text-slate-400 font-bold">{data.fullTime}</p>
                          <p className="text-[13px] font-bold text-indigo-300 mt-1 flex items-center gap-1.5 leading-tight">
                            <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: data.colorCode }} />
                            {data.title}
                          </p>
                          <div className="mt-2.5 space-y-1 text-[11px] font-medium border-t border-white/10 pt-2 font-mono">
                            <div className="flex justify-between gap-5 text-rose-300">
                              <span>우울도(Sadness):</span>
                              <span className="font-bold">{data.우울도}%</span>
                            </div>
                            <div className="flex justify-between gap-5 text-amber-300">
                              <span>불안긴장(Anxiety):</span>
                              <span className="font-bold">{data.불안긴장}%</span>
                            </div>
                            <div className="flex justify-between gap-5 text-indigo-300">
                              <span>스트레스(Stress):</span>
                              <span className="font-bold">{data.스트레스욕구}%</span>
                            </div>
                            <div className="flex justify-between gap-5 text-emerald-300">
                              <span>항상활력(Homeostasis):</span>
                              <span className="font-bold">{data.활력충전}%</span>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={24}
                  iconSize={8}
                  wrapperStyle={{ fontSize: 10, fontFamily: "sans-serif", fontWeight: 650 }}
                />
                <Line type="monotone" dataKey="우울도" stroke="#F43F5E" strokeWidth={2.5} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="불안긴장" stroke="#F59E0B" strokeWidth={2.5} />
                <Line type="monotone" dataKey="스트레스욕구" stroke="#6366F1" strokeWidth={2.5} />
                <Line type="monotone" dataKey="활력충전" stroke="#10B981" strokeWidth={2.5} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right column: Radar distribution of average */}
        <div className="lg:col-span-4 bg-white/70 border border-white/60 backdrop-blur-md rounded-[32px] p-6 shadow-xl flex flex-col justify-between min-h-[400px]">
          <div>
            <div className="flex items-center gap-1 text-indigo-500 font-mono text-[10px] uppercase font-bold tracking-widest mb-1">
              <Brain className="w-4 h-4 text-indigo-500" /> Subconscious Radar Profile
            </div>
            <h4 className="font-serif text-base font-bold text-slate-900">종합 마음 아카이브 다이어그램</h4>
            <p className="text-slate-400 text-[10px] font-sans mt-0.5">내면 누적 감정의 균형비를 보여주는 다이어그램 레이더입니다.</p>
          </div>

          <div className="h-68 w-full mt-2 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#E2E8F0" />
                <PolarAngleAxis 
                  dataKey="subject" 
                  tick={{ fontSize: 8.5, fill: "#475569", fontWeight: 700 }} 
                />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 8, fill: "#94A3B8" }} />
                <Radar
                   name="무의식 지점"
                   dataKey="value"
                   stroke="#6366F1"
                   fill="#818CF8"
                   fillOpacity={0.35}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* 3. Deep insights Commentary & Frequent Colors List */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Insight Commentary Card */}
        <div className="md:col-span-8 bg-gradient-to-b from-indigo-900/95 to-slate-950 text-white rounded-[32px] p-6 md:p-8 relative overflow-hidden border border-slate-950 shadow-2xl flex flex-col justify-between">
          <div className="absolute inset-0 bg-radial-at-t from-slate-800/10 via-transparent to-transparent pointer-events-none" />
          
          <div className="relative z-10 space-y-4">
            <div>
              <span className="font-mono text-[9px] text-indigo-300 uppercase tracking-widest font-black flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" /> Subconscious Clinical Diagnosis Insight
              </span>
              <h4 className="font-serif text-lg font-bold text-indigo-100 mt-1">
                최신 마음 아카이브 정밀 처방전
              </h4>
            </div>

            <div className="space-y-3 pt-2">
              <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10">
                <p className="text-[10px] font-mono text-indigo-300 font-extrabold uppercase tracking-wider">주목할 마음의 파형 패턴</p>
                <div className="flex items-center gap-2 mt-1">
                  <Flame className="w-4 h-4 text-[#F59E0B]" />
                  <span className="text-xs font-bold text-white leading-normal">
                    {customAnalyticalCommentary.focusTheme}
                  </span>
                </div>
              </div>

              <div className="text-slate-200 text-xs leading-relaxed space-y-2 font-sans bg-slate-950/40 p-4 rounded-2xl border border-white/5">
                <p className="font-bold text-indigo-200 flex items-center gap-1.5 text-xs">
                  <Info className="w-4 h-4 text-indigo-300" /> 감정 흐름 분석:
                </p>
                <p className="text-slate-300 mt-1">
                  <em>"{customAnalyticalCommentary.latestDesc}"</em>
                </p>
                <p className="border-t border-white/5 pt-2.5 text-slate-300 font-medium">
                  {customAnalyticalCommentary.trendComment}
                </p>
              </div>

              <div className="bg-indigo-950/60 p-4 rounded-2xl border border-indigo-500/20">
                <p className="text-[10px] font-mono text-indigo-300 font-extrabold uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-indigo-300" /> 건축 치유 명상 리추얼 조언 (Recommended Protocol)
                </p>
                <p className="text-[11px] text-slate-200 leading-normal mt-1.5">
                  {customAnalyticalCommentary.systemAdvice}
                </p>
              </div>
            </div>
          </div>

          <div className="text-[9px] font-mono text-indigo-400 mt-5 pt-3 border-t border-white/10">
            * 이 종합 진단은 36종의 색채 대비 심리학 스펙트럼과 자율신경계 반응 알고리즘에 기초하여 인위 시뮬레이션된 항상성 요약 리포트입니다.
          </div>
        </div>

        {/* Right Favorite Elements Card */}
        <div className="md:col-span-4 bg-white/70 border border-white/60 backdrop-blur-md rounded-[32px] p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1 text-indigo-500 font-mono text-[10px] uppercase font-bold tracking-widest mb-1">
              <Activity className="w-3.5 h-3.5" /> Mind Base-Top 5
            </div>
            <h4 className="font-serif text-base font-bold text-slate-900">자주 이완된 색반 순위</h4>
            <p className="text-slate-400 text-[10px] font-sans mt-0.5">내 편안함을 자극하여 최다 아카이빙된 원반 목록입니다.</p>
          </div>

          <div className="space-y-2.5 my-4 flex-1 flex flex-col justify-center">
            {colorDistribution.map((item, index) => {
              const maxCount = colorDistribution[0]?.count || 1;
              const percent = Math.round((item.count / maxCount) * 100);
              return (
                <button
                  key={item.num}
                  onClick={() => onSelectItem(item.num)}
                  className="w-full text-left bg-white/80 p-3 rounded-2xl border border-slate-150 hover:border-indigo-300 transition-all flex items-center justify-between gap-3 shadow-xs group cursor-pointer focus:outline-none"
                  title="이 감정 분석 공간 다시 구축하기"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative shrink-0">
                      <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center shrink-0 shadow-sm" style={{ backgroundColor: item.fill }} />
                      <span className="absolute -top-1 -left-1 font-mono text-[9px] font-bold bg-slate-950 text-white w-4 h-4 rounded-full flex items-center justify-center scale-90">
                        {index + 1}
                      </span>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-900 block group-hover:text-indigo-600 transition-colors leading-tight">
                        {item.title}
                      </span>
                      <span className="text-[9px] font-mono text-slate-400 block mt-0.5">
                        Profile Code #{item.num}
                      </span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs font-black text-indigo-650 font-mono block">
                      {item.count} <span className="text-[10px] text-slate-400 font-sans font-normal">회</span>
                    </span>
                    <div className="w-12 h-1 bg-slate-100 rounded-full mt-1 overflow-hidden">
                      <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${percent}%` }} />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="bg-indigo-50/50 p-3 rounded-2xl border border-indigo-100/30 text-indigo-950 text-[10px] font-semibold leading-normal flex items-center gap-2">
            <Info className="w-4 h-4 text-indigo-500 shrink-0" />
            <span>원반 카드를 탭하시면 해당 감정 상태에 매칭된 독창적 치유의 방 도안을 고속 재설계할 수 있습니다.</span>
          </div>
        </div>

      </div>

      {/* 4. 마인드 아카이브 (누적 기록 및 상세 타임라인 분석) */}
      <div className="mt-4">
        <HealingHistory 
          historyList={historyList}
          onSelectItem={onSelectItem}
          onClearHistory={onClearHistory}
        />
      </div>

    </div>
  );
};
