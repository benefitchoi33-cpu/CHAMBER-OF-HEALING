import React, { useState, useEffect, useRef } from "react";
import { ColorCircle } from "./ColorGrid.tsx";
import { ColorProfile, colorProfiles } from "../colorData.ts";
import { chamberDetails } from "../chamberData.ts";
import { Play, Pause, RotateCcw, Volume2, VolumeX, Sparkles, Footprints, Wind, Sun, ChevronLeft, ChevronRight, Palette, Activity, Music, Waves, CheckCircle2, Award } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { DeepAnalysis } from "./DeepAnalysis.tsx";

// Curated high-resolution Unsplash meditation, architectural, and zen chamber images for each of the 36 profiles
const getChamberImageUrl = (profileNum: number): string => {
  const images: Record<number, string> = {
    1: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop", // Cozy Warm Bedroom (cocoon)
    2: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop", // Sunny Terrace Double Height
    3: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop", // Deep Blue Ocean Retreat
    4: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop", // Earth Clay Warm Teahouse
    5: "https://images.unsplash.com/photo-1508333706533-1ab43ecb1606?q=80&w=1200&auto=format&fit=crop", // Stone Water Channel Temple
    6: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=1200&auto=format&fit=crop", // Concrete Heavy Guarded Vault
    7: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1200&auto=format&fit=crop", // Glowing Rose Circular Loop Hallway
    8: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=1200&auto=format&fit=crop", // Sound-absorbing Basalt Dark Box
    9: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1200&auto=format&fit=crop", // Symmetrical Sacred Oculus Dome Hallway
    10: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200&auto=format&fit=crop", // Sunlit Symmetrical White Swift/Metal room
    11: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=1200&auto=format&fit=crop", // Red Obelisk Tower Atrium
    12: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200&auto=format&fit=crop", // Bamboo Maze Quiet Garden Path
    13: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=1200&auto=format&fit=crop", // Wood Study Room with Bookcases (Oak)
    14: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop", // Sorrow Brown Clay Chamber
    15: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=1200&auto=format&fit=crop", // Soft Amethyst Lavender Curved Wall Cave
    16: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1200&auto=format&fit=crop", // Deep Sea Submarine Capsule
    17: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=1200&auto=format&fit=crop", // Sharp Angular Quarry Obsidian Room
    18: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200&auto=format&fit=crop", // Sunkissed Central Courtyard with Teak floor
    19: "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?q=80&w=1200&auto=format&fit=crop", // Submerged Humble Ground Garden Earth
    20: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1200&auto=format&fit=crop", // Rose Red Lounge Velvet Glow
    21: "https://images.unsplash.com/photo-1471039497385-b6d6ba609f9c?q=80&w=1200&auto=format&fit=crop", // White Pure Holy Sanctuary
    22: "https://images.unsplash.com/photo-1594489428504-5c0c480a15fd?q=80&w=1200&auto=format&fit=crop", // Industrial Sandblast Boxing/Meditation Dojo
    23: "https://images.unsplash.com/photo-1504297050568-910d24c426d3?q=80&w=1200&auto=format&fit=crop", // Golden Morning Sunshine Glass Ceiling Loft
    24: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1200&auto=format&fit=crop", // Linear Wood Slat Grid calming path
    25: "https://images.unsplash.com/photo-1527269537047-40fbe503411c?q=80&w=1200&auto=format&fit=crop", // High Tower Observatory deck with infinite glass windows
    26: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop", // Twilight Saloon with symmetric fireplace hearth
    27: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=1200&auto=format&fit=crop", // Cathedral tall light shafts
    28: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop", // Beautiful plants kitchen deck
    29: "https://images.unsplash.com/photo-1615874959474-d609969a20ed?q=80&w=1200&auto=format&fit=crop", // Monolithic dark corridor
    30: "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?q=80&w=1200&auto=format&fit=crop", // Deep indigo glass reflection deck
    31: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=1200&auto=format&fit=crop", // Ultra black cozy bed capsule
    32: "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?q=80&w=1200&auto=format&fit=crop", // Granite underground shelter
    33: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=1200&auto=format&fit=crop", // Symmetric grid gallery
    34: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop", // High water healing atrium
    35: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop", // Soft round plaster alcove bedroom
    36: "https://images.unsplash.com/photo-1505312980407-af1521206bad?q=80&w=1200&auto=format&fit=crop"  // Golden light brass bedroom
  };
  return images[profileNum] || "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop";
};

// Robust sentence splitter with support for typical Korean punctuation and newlines
const splitDescriptionToSentences = (desc: string): string[] => {
  if (!desc) return [];
  const rawParts = desc.split(/([.!?\n])/);
  const result: string[] = [];
  let currentSentence = "";
  
  for (let i = 0; i < rawParts.length; i++) {
    const part = rawParts[i];
    if (part === undefined || part === null) continue;
    if (/[.!?\n]/.test(part)) {
      if (part === "\n") {
        if (currentSentence.trim()) {
          result.push(currentSentence.trim());
          currentSentence = "";
        }
      } else {
        currentSentence += part;
        if (currentSentence.trim()) {
          result.push(currentSentence.trim());
          currentSentence = "";
        }
      }
    } else {
      currentSentence += part;
    }
  }
  if (currentSentence.trim()) {
    result.push(currentSentence.trim());
  }
  return result.filter(s => s.length > 0);
};

const recommendedHealingBehaviors: Record<number, { action: string; core: string }> = {
  1: { action: "자기 수용 명상", core: "스스로를 안아주는 '셀프 허깅' 동작과 확언" },
  2: { action: "에너지 확장", core: "현재의 긍정적 상태를 기록하는 '감사 일기'" },
  3: { action: "바디 스캔", core: "신체 각 부위를 세심히 살피며 뭉친 곳을 이완" },
  4: { action: "복식 호흡", core: "위의 긴장을 푸는 완만한 복식 호흡" },
  5: { action: "수분 섭취/이완", core: "차분한 음악과 함께하는 정적인 휴식" },
  6: { action: "관찰자 명상", core: "생각과 감정을 판단 없이 바라보는 훈련" },
  7: { action: "정화 호흡", core: "코로 들이마시고 입으로 나쁜 기운을 내뱉기" },
  8: { action: "감정 배출", core: "억눌린 분노를 안전하게 해소하는 활동 (글쓰기/운동)" },
  9: { action: "상담/커뮤니티", core: "신뢰할 수 있는 사람과의 대화 또는 전문가 상담" },
  10: { action: "비움 명상", core: "'소유'보다 '존재'에 집중하는 명상" },
  11: { action: "자기 객관화", core: "자신의 행동 밑바닥의 불만을 직시하는 명상" },
  12: { action: "걱정 리스트 비우기", core: "마음속 근심을 글로 써서 시각적으로 분리하기" },
  13: { action: "애정 중심 호흡", core: "소중한 사람을 떠올리며 가슴 중앙에 집중" },
  14: { action: "만족 연습", core: "가진 것에 대한 감각을 깨우는 명상" },
  15: { action: "완전한 휴식", core: "수면 또는 아무것도 하지 않는 정적인 명상" },
  16: { action: "근육 이완법(PMR)", core: "신체 근육을 강하게 조였다 푸는 동작" },
  17: { action: "용서 명상", core: "증오의 대상을 내려놓는 시각화 기법" },
  18: { action: "평온 만끽", core: "현재 상태를 온전히 음미하며 명상" },
  19: { action: "수용 명상", core: "거스르지 않고 자연의 흐름을 받아들이기" },
  20: { action: "자기 사랑", core: "타인이 아닌 나를 우선 사랑하는 명상" },
  21: { action: "자기 돌봄", core: "타인에게 쏟는 에너지를 나에게로 돌리는 훈련" },
  22: { action: "감정 전환", core: "분노 에너지를 신체 활동으로 승화시키기" },
  23: { action: "미래 시각화", core: "희망하는 미래를 생생하게 그리기" },
  24: { action: "4-7-8 호흡법", core: "부교감 신경을 활성화하는 강제 호흡" },
  25: { action: "겸손 훈련", core: "타인의 의견을 듣는 경청 명상" },
  26: { action: "중심 잡기", core: "불안과 기쁨 사이의 균형점을 찾는 명상" },
  27: { action: "기도/명상", core: "마음을 바치고 의지하는 경건한 시간" },
  28: { action: "마인드풀 이팅", core: "음식을 온전히 느끼며 천천히 식사하기" },
  29: { action: "결단 명상", core: "마음속 양자택일의 고민을 객관적으로 분석" },
  30: { action: "따뜻한 찜질/휴식", core: "위장을 보호하는 따뜻한 차와 정적" },
  31: { action: "수면 유도", core: "규칙적인 리듬을 찾는 수면 개선 명상" },
  32: { action: "지구력 호흡", core: "깊고 뿌리 깊은 안정감을 찾는 호흡" },
  33: { action: "청소/비움", core: "주변 환경을 정리하며 마음을 정리하기" },
  34: { action: "회복", core: "축하 명상: 회복된 상태를 기뻐하고 에너지를 충전" },
  35: { action: "애정 중심 호흡", core: "소중한 여성을 떠올리며 가슴 중심 호흡" },
  36: { action: "자존감 명상", core: "스스로를 소중히 여기는 내면 아이 치유" }
};

interface BGMPreset {
  id: string;
  name: string;
  description: string;
  frequencyName: string;
}

const BGM_PRESETS: BGMPreset[] = [
  { id: "cosmic", name: "우주 성운의 OM 진동 (OM 136.1Hz)", description: "고대 OM 치유 진동수와 화음의 우주적 신비함과 무한한 평온", frequencyName: "136.1Hz OM Tone" },
  { id: "solfeggio", name: "솔페지오 528Hz 기적의 치유 톤", description: "세포 재생과 내면의 온전한 무조건적 조화를 돕는 기적의 주파수", frequencyName: "528Hz Solfeggio" },
  { id: "ocean", name: "심해의 파도 호흡 (Theta Resonance)", description: "호흡 주기에 맞춰 자연스럽고 쓸려갔다 밀려오는 파도 자장가", frequencyName: "Theta Sea Wave" },
  { id: "zen_garden", name: "선(Zen) 가든의 바람 & 무쇠종", description: "대나무 숲의 미풍과 수수한 은색 종소리 화음의 명상 사운드", frequencyName: "Zen Chime Bell" },
  { id: "theta", name: "세타 뇌파 동조 (6Hz Binaural Beat)", description: "좌우 주파수 차이를 이용해 고유 세타파 상태로 이끄는 뇌파 진정", frequencyName: "6Hz Theta Sync" }
];

interface MeditationMethod {
  method: string;
  description: string;
  keywords: string[];
  rhythm: {
    inhale: number;
    hold: number;
    exhale: number;
  };
}

const getMeditationMethodKeywords = (profileNum: number): MeditationMethod => {
  const mapping: Record<number, MeditationMethod> = {
    1: {
      method: "쓸쓸함/어리광 해소를 위한 자기 수용 명상 (Self-Acceptance)",
      description: "스스로를 포근하게 감싸 안는 '셀프 허깅' 동작과 애정 어린 긍정적 확언을 암송하며 고독과 쓸쓸한 마음에 가득한 위안을 전합니다.",
      keywords: ["자기 수용(Self-Acceptance)", "셀프 허깅(Self-Hugging)", "심리 안정 확언", "포근함 안착", "고독 치유"],
      rhythm: { inhale: 4, hold: 2, exhale: 4 }
    },
    2: {
      method: "행복 고조를 위한 에너지 확장 감사 일기 (Gratitude Journal)",
      description: "현재 마주한 자신감 넘치고 긍정적인 마음 상태를 감사 일기로 차분하고 진지하게 기록하며 마음속 온전한 에너지를 주변으로 확장합니다.",
      keywords: ["에너지 확장", "감사 일기", "자존 투사", "알파파 파동 고수", "자신감 보완"],
      rhythm: { inhale: 4, hold: 4, exhale: 4 }
    },
    3: {
      method: "위로와 이완을 위한 심신 바디 스캔 명상 (Body Scanning)",
      description: "머리끝부터 발가락 끝까지 신체의 긴장 지점을 차근차근 세심히 살피고 호흡을 불어넣어, 뭉쳐 있는 우울의 잔류 탁기와 저기압을 부드럽게 용해시킵니다.",
      keywords: ["바디 스캔(Body Scan)", "통증 수용 지각", "신체 긴장 완화", "기류 정화 이완", "우울 소산"],
      rhythm: { inhale: 4, hold: 2, exhale: 6 }
    },
    4: {
      method: "위장 긴장 조율형 완만한 복식 호흡 (Visceral Vagus Core)",
      description: "횡격막 근처의 경직되고 위축된 신경 영역을 아랫배의 완만하고 율동적인 팽창 및 수축 호흡을 통해 풀어 주어 소화기 안정을 돕습니다.",
      keywords: ["복식 호흡", "위장근 이완", "장-뇌 축 진정", "소화기 항상성 복원", "완만한 템포"],
      rhythm: { inhale: 4, hold: 2, exhale: 6 }
    },
    5: {
      method: "신장 정화와 이완을 위한 온수 섭취 및 정작 휴식 (Water Clearance)",
      description: "인체 정화 작용을 돕는 가벼운 수분 섭취를 마친 뒤, 고요히 흘러가는 맑은 선율 속에서 비뇨기 피로와 체내 긴장을 내려놓는 정적인 휴식을 가집니다.",
      keywords: ["수분 보완 섭취", "하단 괄약 안정", "체내 독소 해독", "정적인 쉼", "비뇨기 자율 조절"],
      rhythm: { inhale: 4, hold: 4, exhale: 4 }
    },
    6: {
      method: "신경 안정 및 판단 보류 관찰자 마음챙김 (Observer Witness)",
      description: "기대의 단절과 불안 속에서 엄습하는 불신, 경계 의식들을 시비판단 없이 흘러가는 풍경으로 응시하는 위대한 관찰자 명상입니다.",
      keywords: ["관찰자 명상", "인지적 판단 보류", "편도체 각성 차단", "안전 기지 정위", "무비판적 자각"],
      rhythm: { inhale: 4, hold: 4, exhale: 6 }
    },
    7: {
      method: "외상 및 상흔 충격성 스트레스 소산을 위한 정화 호흡 (Purifying Breath)",
      description: "맑고 투명한 하늘의 에너지를 코로 가득 들이마시고, 가슴과 상처에 달라붙은 모든 불안하고 혼란스러운 잔상을 날숨과 함께 전면 배출합니다.",
      keywords: ["정화 호흡(Purify)", "탁기 구강 배출", "세포 수준 산소 환기", "상흔 외상 이완", "해방감 증진"],
      rhythm: { inhale: 4, hold: 0, exhale: 6 }
    },
    8: {
      method: "감정 과부하 해소를 위한 분노 안전 배출 의식 (Catharsis Practice)",
      description: "억눌려진 슬픔, 체념, 반항 성향의 거슬리는 마음을 편안한 자필 글쓰기나 온전한 신체 운동으로 표출하여 카타르시스를 맞이합니다.",
      keywords: ["감정 배출(Catharsis)", "보복 심리 이완", "표현 글쓰기", "신체 운동 승화", "가시 맺힘 소산"],
      rhythm: { inhale: 4, hold: 2, exhale: 4 }
    },
    9: {
      method: "정신적 쇠진 예방을 위한 소통 연결 상담 (Secure Dialogues)",
      description: "혼자 안고 지탱하기 고달픈 걱정거리를 차분히 허용하고, 신뢰 깊은 지인이나 상담사와의 무비판적 정위 대화를 열어 기댈 곳을 찾습니다.",
      keywords: ["치유 상담 연대", "마음 그늘 고백", "벼랑 끝 해소 기지", "상호 조율 위안", "커뮤니티 소통"],
      rhythm: { inhale: 4, hold: 4, exhale: 4 }
    },
    10: {
      method: "소유 집착을 내려놓는 공허의 비움 명상 (Detachment Void)",
      description: "금전 등 물질을 소유하고자 채근했던 마음의 불꽃을 덮고, 형태 없는 자아의 순전한 실존에 안착하는 풍요로운 무소유의 쉼을 누립니다.",
      keywords: ["비움 명상", "존재 지평 집중", "소유 지배욕 절제", "무소유 항상도", "에고 방하착"],
      rhythm: { inhale: 5, hold: 5, exhale: 5 }
    },
    11: {
      method: "행동 기저 투시를 위한 명료한 자기 객관화 (Self-Objectified Mirror)",
      description: "과도한 현시욕과 남을 꺾고자 하는 투쟁력의 불씨 아래 도사린, 승인 갈증과 무의식적인 서운함을 조용히 마주하고 달래줍니다.",
      keywords: ["자기 객관화", "에고 불만 투시", "허위 지향성 배제", "겸양적 안착안정", "내면 직시"],
      rhythm: { inhale: 4, hold: 4, exhale: 4 }
    },
    12: {
      method: "근심 사슬 이탈을 위한 걱정 리스트 비우기 (Worry Dumping)",
      description: "나를 구르는 수레바퀴처럼 조이는 끝없는 걱정들을 흰 종이 위에 남김없이 기록하여, 그것을 제삼자처럼 타자화하고 바라봅니다.",
      keywords: ["걱정 서사 분리", "걱정 시각화 덤프", "신경 과잉 복원", "지평 격리 수용", "잡념 정리"],
      rhythm: { inhale: 4, hold: 2, exhale: 6 }
    },
    13: {
      method: "친한 남성에 대한 그리움을 안아내는 애정 중심 호흡 (Anahata Core)",
      description: "과거에 나를 단단히 감싸 던 남성 원형(부친, 가호자)의 부재가 주는 외로움과 상실 슬픔을 가슴 중앙의 온화한 우주 에너지로 채웁니다.",
      keywords: ["가슴 애착 조율", "남성 원형 애정", "상실 슬픔 위무", "중앙 심박 안정", "요람의 가호"],
      rhythm: { inhale: 4, hold: 4, exhale: 4 }
    },
    14: {
      method: "갈감 해소를 위한 사소함 만족 연습 (Santusha Satisfaction)",
      description: "애정의 갈증을 충동적인 소유나 금전 소비로 연소하지 않고, 이미 내 곁에 존재하는 것들에 닿는 미세한 결을 사랑해 봅니다.",
      keywords: ["만족 연습(Santusha)", "애정 갈망 대체", "현재의 소박한 감각", "기류 만족 회로", "에고 팽만 제어"],
      rhythm: { inhale: 4, hold: 4, exhale: 4 }
    },
    15: {
      method: "에너지 충전을 유도하는 무위식 완전한 휴식 (Absolute Nesting)",
      description: "어떤 의지나 방향성 있는 집중 작업도 내려놓고, 그저 무중력 상태처럼 누워 자생적인 신체 자연 치유 능력을 극대화하는 시간입니다.",
      keywords: ["완전 휴식", "자율 수면 정위", "무기력 수용", "신체 리듬 자율갱신", "회색 침수 정작"],
      rhythm: { inhale: 5, hold: 5, exhale: 5 }
    },
    16: {
      method: "등척성 미세 물리 림프 요법 근육 이완법 (PMR Tension Release)",
      description: "고된 피로 속에서도 쉬지 못하는 전신의 근육군을 5초간 터질 듯 꽉 수축했다가, 날숨과 함께 한 번에 스르륵 녹여 배출합니다.",
      keywords: ["점진적 근육이완법(PMR)", "수축 이완 물리요법", "누적 탈진 해방", "근전도 평형", "성실 피로 감소"],
      rhythm: { inhale: 4, hold: 2, exhale: 4 }
    },
    17: {
      method: "원망의 끈을 가늘게 흩트리는 용서 명상 (Forgiveness Ritual)",
      description: "불쾌했던 기억에 소용돌이치는 적의의 대상을 자욱한 물안개 너머로 천천히 흩뜨리며, 가시를 뽑아 나를 완전히 호위해 줍니다.",
      keywords: ["용서 시각화", "적의 그물 소산", "원망 밧줄 절단", "감정 과부하 진정", "해방 속 안도"],
      rhythm: { inhale: 4, hold: 4, exhale: 4 }
    },
    18: {
      method: "기쁨의 여운을 가만히 보존하는 평온 만끽 (Savoring Serenity)",
      description: "오래간만에 기라성처럼 찾아든 충만감과 만복을 서두르지 않고, 대뇌 전체에 스며들도록 부드러운 평온으로 온전히 보존합니다.",
      keywords: ["평온 만끽(Savoring)", "기쁨 공진 회로", "뇌파 평탄 안정", "항상성 최고조", "만복 이완"],
      rhythm: { inhale: 4, hold: 4, exhale: 4 }
    },
    19: {
      method: "거스름 없는 평온을 채취하는 수용 명상 (Surrender Practice)",
      description: "스스로가 애지중지 움켜쥐었던 고뇌를 고요히 이탈시키고, 거스르지 않는 강물의 평화와 자연의 흐름을 수인적으로 채택합니다.",
      keywords: ["수용 명상(Surrender)", "자연 조화 흐름", "순종 뒤 영적 단안", "내면 수심 요람", "체념 단념 치유"],
      rhythm: { inhale: 5, hold: 5, exhale: 5 }
    },
    20: {
      method: "사랑의 주권을 나로 가두는 자애적 자기 사랑 (Self-Loving Metta)",
      description: "타인을 향해 시리게 그리워하던 정열의 온기를 비로소 가장 소중하고 사랑 가득한 나 자신에게로 온전하게 되비추어 줍니다.",
      keywords: ["자기 사랑(Metta)", "로맨틱 결핍 조율", "자가 보석 활성", "불타는 마인드 안착", "사랑 수심 정작"],
      rhythm: { inhale: 4, hold: 4, exhale: 4 }
    },
    21: {
      method: "피로 소진 방지를 위한 자애적 자기 돌봄 (Self-Compassion Care)",
      description: "가족이나 동경자 등 남을 구제하기에 급급했던 꺾인 마음을 뒤로하고, 내 가녀린 신경과 자아를 먼저 안타깝게 보듬습니다.",
      keywords: ["자기 돌봄", "헌신 소진 피로 방지", "감각 경계 확립", "에너지 주권 복원", "나로 환원"],
      rhythm: { inhale: 4, hold: 2, exhale: 4 }
    },
    22: {
      method: "공격에너지를 다스리는 고귀한 감정 전환 (Sublimation Art)",
      description: "억압된 충동으로 치솟은 불쾌한 공격성과 학대 욕망을, 건장한 육체 노동이나 창조적 스포츠 릴렉스로 우아하게 지평 치환합니다.",
      keywords: ["공격성 전환/승화", "불만 격렬 표출", "신체 활동 전환", "이상 발산 충동 제립", "감정 궤적 유해 소산"],
      rhythm: { inhale: 4, hold: 2, exhale: 6 }
    },
    23: {
      method: "도약을 확신하는 찬란한 미래 시각화 (Future Visualizationary)",
      description: "이미 실현된 풍요롭고 포근한 지평을 가락 정밀하게 시각화하여, 성실한 노력 끝에 당당히 서 있는 축하의 순간을 도면화해 봅니다.",
      keywords: ["미래 시각화", "도파민 보상 활성", "긍정 성실 안착", "목표 에피파니 기질", "희망 가속"],
      rhythm: { inhale: 4, hold: 4, exhale: 4 }
    },
    24: {
      method: "불안 자극의 맥박을 끄는 4-7-8 자율 호흡 (Vagus Nerve Tuning)",
      description: "인위적으로 제어 범위를 벗어나 요동치는 초조함을 4-7-8 프라나야마 호흡의 완고한 비율 수련을 통해 평안의 궤적으로 포획합니다.",
      keywords: ["4-7-8 호흡법", "부교감 강제 가속", "조바심 맥박 감속", "임상 자율신경 조율", "짜증 초조 감하"],
      rhythm: { inhale: 4, hold: 7, exhale: 8 }
    },
    25: {
      method: "독선과 충동을 어루만져 가부좌를 잠재우는 겸손 훈련 (Humbled Listening)",
      description: "과속한 결실이나 성공 뒤 찾아온 아만심과 독선을 유연히 낮추어, 나직하게 흐르는 대자연과 타인의 자각음을 귀담아 봅니다.",
      keywords: ["경청 훈련", "독선 충동 제어", "도치 평탄 요람", "겸손 수심 의식", "자율 타협 안정"],
      rhythm: { inhale: 4, hold: 4, exhale: 4 }
    },
    26: {
      method: "그림자를 안고 기조를 잡는 중심 잡기 호흡 (Center Equilibrium)",
      description: "외적으로 나누는 화사함의 미소 속에 꼭꼭 봉쇄한 마음 한편의 가시 돋친 우려를 인정하고, 단단한 수평 균형을 조율해 냅니다.",
      keywords: ["중심 잡기 호흡", "양가적 모순 수용", "마음 그늘 정돈", "내적 고유 밸런스", "불안 기쁨 융합"],
      rhythm: { inhale: 4, hold: 4, exhale: 4 }
    },
    27: {
      method: "무한한 보호에 뇌를 귀의하는 경건 기도 / 명상 (Sacred Devotional)",
      description: "초월성 있는 절대 영역에 내 미어터지는 우려를 위탁하고, 요새 속에 숨듯 안도하는 기도 속에 영혼을 위안합니다.",
      keywords: ["경건 기도 수심", "절대 귀의 안식", "맹목 불안 수렴", "찬란한 가치 정각", "절대자 사랑"],
      rhythm: { inhale: 5, hold: 5, exhale: 5 }
    },
    28: {
      method: "대뇌 수용체를 고요히 정돈하는 마인드풀 이팅 (Mindful Swallowing)",
      description: "식품과 물을 삼키는 아주 단순하고 본원적인 물리 감각에 온 정신을 몰입하여 불균형해진 신경 신호를 말끔히 씻어냅니다.",
      keywords: ["마인드풀 이팅", "원시 허기 통제", "혀끝 미세 수용", "감각 온전 만끽", "생체 욕구 정온"],
      rhythm: { inhale: 4, hold: 2, exhale: 4 }
    },
    29: {
      method: "딜레마 기로를 해소하는 객관 결단 명상 (Decision Defusing)",
      description: "실패에의 과도한 공포로 정체되어 굳어버린 양자택일 상태를 이지적, 분석적으로 분별하고 첫 한 걸음을 뗄 수 있게 도와줍니다.",
      keywords: ["결단 명상", "기로 불안 인지 해소", "주저함 기류 해방", "행동 장벽 제거", "딜레마 무력화"],
      rhythm: { inhale: 4, hold: 4, exhale: 4 }
    },
    30: {
      method: "해독을 돕는 따뜻한 온열 찜질 & 위장 휴식 (Visceral Hydropathic)",
      description: "소아기 내장을 감싸는 따뜻한 구강 수액과 함께, 위장 신경의 예민성을 완화하는 조용한 정적 찜질과 평형을 가져봅니다.",
      keywords: ["소화기 온열 정적", "위장 보호 온기", "가목 신경총 안착", "장관 자율 수축", "위장 통증 다스림"],
      rhythm: { inhale: 4, hold: 2, exhale: 6 }
    },
    31: {
      method: "뇌를 깊은 밤으로 내려놓는 수면 유도 훈련 (Sleep Entrainment)",
      description: "각성된 전두엽의 잡음을 완화하고 송과선 멜라토닌 파동을 회복하는 차분한 사이클 속에서 조용히 수면에 도달합니다.",
      keywords: ["수면 유도", "송과체 멜라토닌 유도", "과부하 뇌파 소산", "진묵 밤 안정", "수면 질 개선"],
      rhythm: { inhale: 5, hold: 5, exhale: 5 }
    },
    32: {
      method: "생을 딛는 대지의 고요를 찾는 지구력 호흡 (Stamina Foundation)",
      description: "뿌리 깊은 종말 느낌의 극단불안을 마주하여, 차고 평탄한 반석 위에 누운 듯한 지구력 숨을 천천히 호흡하며 안착합니다.",
      keywords: ["지구력 호흡", "근원 불안 소산", "석재 안도 기지", "체화 토대 강화", "뿌리 깊은 안정"],
      rhythm: { inhale: 4, hold: 4, exhale: 4 }
    },
    33: {
      method: "정돈과 환기를 통한 마음 먼지 청소/비움 (Decluttering Zen)",
      description: "손때 묻은 사소한 침참을 개운하게 쓸고 닦는 외적 정리 활동으로, 얽매여 응어리진 머릿속 서랍을 시각적으로 정비합니다.",
      keywords: ["주변 청소 비움", "강박 가시 정돈", "서사적 밀어내기", "환경 가구 환치", "신변 정리욕 위무"],
      rhythm: { inhale: 4, hold: 2, exhale: 4 }
    },
    34: {
      method: "화사한 해방감을 찬미하는 축하 감사 명상 (Aesthetic Celebration)",
      description: "어렵게 치러낸 심신의 역경이 씻겨나간 빈 터를 향해, 전개할 건강한 광채 기조를 온전히 입술 벌려 찬미하는 명상입니다.",
      keywords: ["기량 축하 명상", "자궁 자율 감사", "생체 에너지 기쁨", "치유 도약 찬탄", "회복 축하"],
      rhythm: { inhale: 4, hold: 4, exhale: 4 }
    },
    35: {
      method: "모성의 영원을 가슴에 새기는 애정 중심 호흡 (Anahata Metta)",
      description: "어머니와 온유한 영혼이 나를 보듬던 추억의 안식처를 떠올리고 숨 쉬어, 외로운 그리움의 슬픔을 존경과 자애로 승화합니다.",
      keywords: ["모성 조율 가슴", "여성 원형 수렴", "요람 이불 안식", "애수 상흔 치료", "가슴 중심 호흡"],
      rhythm: { inhale: 4, hold: 4, exhale: 4 }
    },
    36: {
      method: "결핍된 아이를 보살피고 안아주는 자존감 명상 (Inner Child Reparenting)",
      description: "소외되고 외로움에 몸서리치는 내 가슴 깊숙한 내면의 지친 아이를, 지혜와 사랑을 입은 현재의 내가 꼬옥 가다듬듯이 사랑해 줍니다.",
      keywords: ["내면 아이 구출", "결핍 보존 안착", "자존 기질 정위", "자가 Reparenting", "애정 축적 명상"],
      rhythm: { inhale: 4, hold: 4, exhale: 4 }
    }
  };

  const defaultVal: MeditationMethod = {
    method: "생체 균형 회복을 위한 4-7-8 통합 프라나야마 자율 조절 (Pranayama Homoeostasis)",
    description: "생리적 평형 상태를 재확립하고 자율신경계 교감-부교감 스펙트럼 밸런스를 즉각 정상화하는 고전 임상 프로토콜.",
    keywords: ["자율 조율 항상성 회복", "뇌파 동조화(EEG Sync)", "세포 수준 휴식(REAP)", "대뇌 피질 진정 피드백"],
    rhythm: { inhale: 4, hold: 7, exhale: 8 } // Classical 4-7-8 Pranayama
  };

  return mapping[profileNum] || defaultVal;
};

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

interface ChamberWindowProps {
  selectedProfile: ColorProfile | null;
  healingData: HealingData | null;
  loading: boolean;
  step: number;
  setStep: (step: number) => void;
  historyList: any[];
  onSelectItem: (num: number) => void;
  onClearHistory: () => void;
  onReset: () => void;
}

export const ChamberWindow: React.FC<ChamberWindowProps> = ({
  selectedProfile,
  healingData,
  loading,
  step,
  setStep,
  historyList,
  onSelectItem,
  onClearHistory,
  onReset,
}) => {
  // Meditation Timer States
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [totalSeconds, setTotalSeconds] = useState<number>(60); // Overridden dynamically below based on 5 selected profile cycles
  const [breathPhase, setBreathPhase] = useState<"inhale" | "hold" | "exhale">("inhale");
  const [breathCounter, setBreathCounter] = useState<number>(4); // 4-second intervals (4-4-4)
  const [meditationCompleted, setMeditationCompleted] = useState<boolean>(false);

  const currentMethod = getMeditationMethodKeywords(selectedProfile?.num || 1);
  const breathCycleLength = (currentMethod.rhythm.inhale || 4) + (currentMethod.rhythm.hold || 0) + (currentMethod.rhythm.exhale || 4);
  const totalDuration = breathCycleLength * 5; // Exactly 5 repetitions/cycles of the breathing rhythm
  const totalSteps = 5; // Each step represents 1 full cycle
  const durationPerStep = breathCycleLength;

  // Compute active step index and step seconds left
  const currentStepIdx = Math.min(
    totalSteps - 1,
    Math.floor(Math.max(0, totalDuration - totalSeconds) / durationPerStep)
  );
  
  const stepSecondsElapsed = (totalDuration - totalSeconds) % durationPerStep;
  const stepSecondsLeft = totalSeconds === 0 ? 0 : durationPerStep - stepSecondsElapsed;

  // Audio Synthesizer States
  const [soundPlaying, setSoundPlaying] = useState<boolean>(false);
  const [selectedBgmId, setSelectedBgmId] = useState<string>("cosmic");

  // Speech Synthesis (TTS) States
  const [isReading, setIsReading] = useState<boolean>(false);
  const [readingIndex, setReadingIndex] = useState<number | null>(null);
  const speechUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const speechTimeoutRef = useRef<any>(null);

  // Slide Carousel State for Chamber (Stage 3)
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  
  // Refs for Web Audio synthesizer assets
  const audioCtxRef = useRef<AudioContext | null>(null);
  const activeNodesRef = useRef<any[]>([]);
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const lfoRef = useRef<OscillatorNode | null>(null);
  const lfoGainRef = useRef<GainNode | null>(null);

  // Breath controller cycle synchronized with each profile's specific rhythm
  useEffect(() => {
    let intervalId: any = null;
    if (timerActive) {
      intervalId = setInterval(() => {
        // Decrease total session time
        setTotalSeconds((prev) => {
          if (prev <= 1) {
            setTimerActive(false);
            stopHealingSound();
            setMeditationCompleted(true);
            return 0;
          }
          return prev - 1;
        });

        // Get rhythm configuration for the current profile
        const method = getMeditationMethodKeywords(selectedProfile?.num || 1);
        const { rhythm } = method;

        // Update breath counter
        setBreathCounter((prev) => {
          if (prev <= 1) {
            const nextPhaseMap: Record<"inhale" | "hold" | "exhale", "inhale" | "hold" | "exhale"> = {
              inhale: "hold",
              hold: "exhale",
              exhale: "inhale"
            };
            const nextP = nextPhaseMap[breathPhase];
            setBreathPhase(nextP);
            return rhythm[nextP];
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [timerActive, breathPhase, selectedProfile]);

  // Synchronize initial setup when profile changes, step moves, or healingData loads
  useEffect(() => {
    if (selectedProfile) {
      const method = getMeditationMethodKeywords(selectedProfile.num);
      setBreathPhase("inhale");
      setBreathCounter(method.rhythm.inhale);
      const cycleDuration = method.rhythm.inhale + method.rhythm.hold + method.rhythm.exhale;
      setTotalSeconds(cycleDuration * 5); // 5 cycles of custom breathing rhythm
      setMeditationCompleted(false);
    } else {
      setTotalSeconds(180);
      setMeditationCompleted(false);
    }
  }, [selectedProfile, step, healingData]);

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      stopHealingSound();
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      if (speechTimeoutRef.current) {
        clearTimeout(speechTimeoutRef.current);
      }
    };
  }, []);

  // Stop speaking and reset slide index when step changes or selected profile changes
  useEffect(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    if (speechTimeoutRef.current) {
      clearTimeout(speechTimeoutRef.current);
    }
    setIsReading(false);
    setReadingIndex(null);
    setActiveSlideIndex(0);
  }, [step, selectedProfile]);

  // Format MM:SS
  const formatTime = (secs: number): string => {
    const minutes = Math.floor(secs / 60);
    const seconds = secs % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  // Synthesize diverse deep meditation sound utilizing Web Audio API
  const startHealingSound = (bgmId: string = selectedBgmId) => {
    try {
      if (soundPlaying) return;

      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;
      activeNodesRef.current = [];

      // Create main Lowpass Filter
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(320, ctx.currentTime);
      filterRef.current = filter;

      // Master Gain for smooth volume control
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.01, ctx.currentTime); // Soft start
      masterGain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 1.5); // Smooth fade-in
      gainNodeRef.current = masterGain;

      if (bgmId === "cosmic") {
        // Option 1: Cosmic Nebula Drone (OM 136.1Hz & Warm Harmonics)
        const osc1 = ctx.createOscillator();
        osc1.type = "sine";
        osc1.frequency.setValueAtTime(136.1, ctx.currentTime);
        osc1Ref.current = osc1;

        const osc2 = ctx.createOscillator();
        osc2.type = "sine";
        osc2.frequency.setValueAtTime(272.2, ctx.currentTime);
        osc2Ref.current = osc2;

        const oscSub = ctx.createOscillator();
        oscSub.type = "sine";
        oscSub.frequency.setValueAtTime(68.05, ctx.currentTime);

        const lfo = ctx.createOscillator();
        lfo.type = "sine";
        lfo.frequency.setValueAtTime(0.08, ctx.currentTime); // 12-second wave
        lfoRef.current = lfo;

        const lfoGain = ctx.createGain();
        lfoGain.gain.setValueAtTime(120, ctx.currentTime);
        lfoGainRef.current = lfoGain;

        lfo.connect(lfoGain);
        lfoGain.connect(filter.frequency);

        osc1.connect(filter);
        osc2.connect(filter);
        oscSub.connect(filter);
        filter.connect(masterGain);
        masterGain.connect(ctx.destination);

        osc1.start(0);
        osc2.start(0);
        oscSub.start(0);
        lfo.start(0);

        activeNodesRef.current.push(osc1, osc2, oscSub, lfo, lfoGain, filter, masterGain);

      } else if (bgmId === "solfeggio") {
        // Option 2: Solfeggio 528Hz Miracle Resonance
        const oscCore = ctx.createOscillator();
        oscCore.type = "sine";
        oscCore.frequency.setValueAtTime(528, ctx.currentTime);

        const oscLower = ctx.createOscillator();
        oscLower.type = "sine";
        oscLower.frequency.setValueAtTime(264, ctx.currentTime);

        const oscSub = ctx.createOscillator();
        oscSub.type = "sine";
        oscSub.frequency.setValueAtTime(132, ctx.currentTime);

        const lfo = ctx.createOscillator();
        lfo.type = "sine";
        lfo.frequency.setValueAtTime(0.12, ctx.currentTime);

        const lfoGain = ctx.createGain();
        lfoGain.gain.setValueAtTime(0.05, ctx.currentTime);

        const tremoloGain = ctx.createGain();
        tremoloGain.gain.setValueAtTime(0.06, ctx.currentTime);

        lfo.connect(lfoGain);
        lfoGain.connect(tremoloGain.gain);

        oscCore.connect(tremoloGain);
        oscLower.connect(tremoloGain);
        oscSub.connect(filter);

        tremoloGain.connect(filter);
        filter.connect(masterGain);
        masterGain.connect(ctx.destination);

        oscCore.start(0);
        oscLower.start(0);
        oscSub.start(0);
        lfo.start(0);

        activeNodesRef.current.push(oscCore, oscLower, oscSub, lfo, lfoGain, tremoloGain, filter, masterGain);

      } else if (bgmId === "ocean") {
        // Option 3: Deep Sea Wave Breath (Noise Generator + LFO filter sweep)
        const bufferSize = ctx.sampleRate * 3;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
        }

        const noiseSrc = ctx.createBufferSource();
        noiseSrc.buffer = noiseBuffer;
        noiseSrc.loop = true;

        const waterFilter = ctx.createBiquadFilter();
        waterFilter.type = "lowpass";
        waterFilter.Q.setValueAtTime(2.0, ctx.currentTime);
        waterFilter.frequency.setValueAtTime(180, ctx.currentTime);

        const lfo = ctx.createOscillator();
        lfo.type = "sine";
        lfo.frequency.setValueAtTime(0.07, ctx.currentTime); // 14-second waves

        const lfoGain = ctx.createGain();
        lfoGain.gain.setValueAtTime(260, ctx.currentTime); // Swells filters

        const oscSub1 = ctx.createOscillator();
        oscSub1.type = "sine";
        oscSub1.frequency.setValueAtTime(75, ctx.currentTime);

        lfo.connect(lfoGain);
        lfoGain.connect(waterFilter.frequency);

        noiseSrc.connect(waterFilter);
        waterFilter.connect(masterGain);

        oscSub1.connect(filter);
        filter.connect(masterGain);
        masterGain.connect(ctx.destination);

        noiseSrc.start(0);
        oscSub1.start(0);
        lfo.start(0);

        activeNodesRef.current.push(noiseSrc, waterFilter, lfo, lfoGain, oscSub1, filter, masterGain);

      } else if (bgmId === "zen_garden") {
        // Option 4: Zen Garden Chimes (Pentatonic bell resonance scheduled over time with deep pad)
        const pad1 = ctx.createOscillator();
        pad1.type = "sine";
        pad1.frequency.setValueAtTime(144, ctx.currentTime);

        const pad2 = ctx.createOscillator();
        pad2.type = "sine";
        pad2.frequency.setValueAtTime(216, ctx.currentTime);

        const chimeGain = ctx.createGain();
        chimeGain.gain.setValueAtTime(0, ctx.currentTime);

        const freqs = [288, 324, 360, 432, 486];
        const chimeOscList: OscillatorNode[] = [];
        freqs.forEach((f) => {
          const oscC = ctx.createOscillator();
          oscC.type = "sine";
          oscC.frequency.setValueAtTime(f, ctx.currentTime);
          oscC.connect(chimeGain);
          oscC.start(0);
          chimeOscList.push(oscC);
          activeNodesRef.current.push(oscC);
        });

        // Pre-schedule chime sweeps for peaceful environment
        for (let time = ctx.currentTime + 1.5; time < ctx.currentTime + 1200; time += 7.5) {
          const actualTime = time + (Math.random() * 1.0 - 0.5);
          chimeGain.gain.setValueAtTime(0, actualTime);
          chimeGain.gain.linearRampToValueAtTime(0.04, actualTime + 0.8);
          chimeGain.gain.exponentialRampToValueAtTime(0.0001, actualTime + 5.0);
        }

        pad1.connect(filter);
        pad2.connect(filter);
        chimeGain.connect(filter);
        filter.connect(masterGain);
        masterGain.connect(ctx.destination);

        pad1.start(0);
        pad2.start(0);

        activeNodesRef.current.push(pad1, pad2, chimeGain, filter, masterGain);

      } else if (bgmId === "theta") {
        // Option 5: Theta Brain Wave Binaural Sync
        const oscL = ctx.createOscillator();
        oscL.type = "sine";
        oscL.frequency.setValueAtTime(115, ctx.currentTime);

        const oscR = ctx.createOscillator();
        oscR.type = "sine";
        oscR.frequency.setValueAtTime(121, ctx.currentTime); // 6Hz beat difference (Theta)

        const subBass = ctx.createOscillator();
        subBass.type = "sine";
        subBass.frequency.setValueAtTime(57.5, ctx.currentTime);

        const isStereoSupported = !!ctx.createStereoPanner;
        if (isStereoSupported) {
          const pannerL = ctx.createStereoPanner!();
          pannerL.pan.setValueAtTime(-1.0, ctx.currentTime);

          const pannerR = ctx.createStereoPanner!();
          pannerR.pan.setValueAtTime(1.0, ctx.currentTime);

          oscL.connect(pannerL);
          pannerL.connect(filter);

          oscR.connect(pannerR);
          pannerR.connect(filter);

          activeNodesRef.current.push(pannerL, pannerR);
        } else {
          oscL.connect(filter);
          oscR.connect(filter);
        }

        subBass.connect(filter);
        filter.connect(masterGain);
        masterGain.connect(ctx.destination);

        oscL.start(0);
        oscR.start(0);
        subBass.start(0);

        activeNodesRef.current.push(oscL, oscR, subBass, filter, masterGain);
      }

      setSoundPlaying(true);
    } catch (e) {
      console.error("Failed to compile custom synth BGM track:", e);
    }
  };

  const stopHealingSound = () => {
    try {
      if (gainNodeRef.current && audioCtxRef.current) {
        const ctx = audioCtxRef.current;
        const currentGain = gainNodeRef.current;
        currentGain.gain.cancelScheduledValues(ctx.currentTime);
        currentGain.gain.setValueAtTime(currentGain.gain.value, ctx.currentTime);
        currentGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.0);

        setTimeout(() => {
          try {
            // Stop and cleanup all nodes in the tracker
            activeNodesRef.current.forEach((n) => {
              try { n.stop(); } catch(err) {}
              try { n.disconnect(); } catch(err) {}
            });
            activeNodesRef.current = [];

            osc1Ref.current?.stop();
            osc2Ref.current?.stop();
            lfoRef.current?.stop();

            audioCtxRef.current?.close();
          } catch (err) {}

          osc1Ref.current = null;
          osc2Ref.current = null;
          lfoRef.current = null;
          gainNodeRef.current = null;
          audioCtxRef.current = null;
          setSoundPlaying(false);
        }, 1100);
      } else {
        setSoundPlaying(false);
      }
    } catch (err) {
      console.warn("Exception closing synthesized drone:", err);
      setSoundPlaying(false);
    }
  };

  const toggleSound = () => {
    if (soundPlaying) {
      stopHealingSound();
    } else {
      startHealingSound(selectedBgmId);
    }
  };

  const toggleTimer = () => {
    setTimerActive(!timerActive);
    // Auto-turn on sound when starting meditation for deep immersive sensory sync
    if (!timerActive && !soundPlaying) {
      startHealingSound(selectedBgmId);
    }
  };

  const resetTimer = () => {
    setTimerActive(false);
    setMeditationCompleted(false);
    const method = getMeditationMethodKeywords(selectedProfile?.num || 1);
    const cycleDuration = method.rhythm.inhale + method.rhythm.hold + method.rhythm.exhale;
    setTotalSeconds(cycleDuration * 5); // 5 cycles of custom breathing rhythm
    setBreathPhase("inhale");
    setBreathCounter(method.rhythm.inhale);
    if (isReading) {
      stopSpeaking();
    }
  };

  // Setup circle breathing animations with dynamic ratio scale
  const getBreathCircleScale = () => {
    const method = getMeditationMethodKeywords(selectedProfile?.num || 1);
    const { rhythm } = method;
    if (breathPhase === "inhale") {
      const maxInhale = rhythm.inhale;
      const pct = Math.max(0, Math.min(1, (maxInhale - breathCounter) / maxInhale));
      return 1.0 + pct * 0.6;
    }
    if (breathPhase === "hold") {
      return 1.6; // High stable
    }
    // Exhale (contracting back to 1.0)
    const maxExhale = rhythm.exhale;
    const pct = Math.max(0, Math.min(1, (maxExhale - breathCounter) / maxExhale));
    return 1.6 - pct * 0.6;
  };

  const getBreathColorClass = () => {
    if (breathPhase === "inhale") return "bg-[#DFD4C0]/40 text-[#4E412C] border-[#8C8476]/30";
    if (breathPhase === "hold") return "bg-[#BACDB0]/40 text-[#2B3E22] border-[#2B3E22]/30";
    return "bg-[#BDD9DB]/40 text-[#294042] border-[#294042]/30";
  };

  const getBreathLabel = () => {
    const method = getMeditationMethodKeywords(selectedProfile?.num || 1);
    const { inhale, hold, exhale } = method.rhythm;
    if (breathPhase === "inhale") return `흡 (들숨) : ${inhale}초간 마음의 빛 깊게 들이쉬기`;
    if (breathPhase === "hold") return `지 (멈춤) : ${hold}초간 내면의 고요한 평온 머금기`;
    return `호 (날숨) : ${exhale}초간 모든 슬픔과 긴장 내보내기`;
  };

  // Meditative guided voice reader using SpeechSynthesis
  const stopSpeaking = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    if (speechTimeoutRef.current) {
      clearTimeout(speechTimeoutRef.current);
    }
    setIsReading(false);
    setReadingIndex(null);
  };

  const startSpeaking = () => {
    if (!window.speechSynthesis || !healingData || !healingData.meditationSteps) return;

    window.speechSynthesis.cancel();
    if (speechTimeoutRef.current) {
      clearTimeout(speechTimeoutRef.current);
    }
    setIsReading(true);

    const speakStep = (idx: number) => {
      if (idx >= healingData.meditationSteps.length) {
        setIsReading(false);
        setReadingIndex(null);
        return;
      }

      setReadingIndex(idx);
      const rawText = healingData.meditationSteps[idx];
      const stepNames = ["첫 번째 지침,", "두 번째 지침,", "세 번째 지침,", "네 번째 지침,", "다섯 번째 지침,", "여섯 번째 지침,", "일곱 번째 지침,"];
      const prefix = stepNames[idx] || `${idx + 1}번째 지침, `;
      
      const textToSpeak = `${prefix} ${rawText}`;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = "ko-KR";
      utterance.rate = 0.8; // Composed, highly professional announcer cadence
      utterance.pitch = 0.88; // Deep, calm, and stabilizing mid-low announcer tone (중저음)

      // Select a neat premium Korean female voice if available
      const voices = window.speechSynthesis.getVoices();
      const koVoices = voices.filter((v) => v.lang.includes("ko") || v.lang.includes("KO"));
      let selectedVoice = koVoices.find((v) => 
        v.name.toLowerCase().includes("yuna") || 
        v.name.toLowerCase().includes("heami") || 
        v.name.toLowerCase().includes("female") || 
        v.name.toLowerCase().includes("korean") || 
        v.name.toLowerCase().includes("google")
      );
      if (!selectedVoice && koVoices.length > 0) {
        selectedVoice = koVoices[0];
      }
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      // If the timer is NOT active, we automatically speak the next step when this one ends
      if (!timerActive) {
        utterance.onend = () => {
          speechTimeoutRef.current = setTimeout(() => {
            speakStep(idx + 1);
          }, 1800);
        };

        utterance.onerror = (e) => {
          if (e.error !== "interrupted") {
            speechTimeoutRef.current = setTimeout(() => {
              speakStep(idx + 1);
            }, 1000);
          }
        };
      } else {
        utterance.onend = () => {
          // Driven by the timer instead
        };
      }

      speechUtteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    };

    const startIdx = timerActive ? currentStepIdx : 0;
    speakStep(startIdx);
  };

  // Automatically speak the new step when the active step changes while timer and TTS is active
  useEffect(() => {
    if (timerActive && isReading && healingData && healingData.meditationSteps) {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      if (speechTimeoutRef.current) {
        clearTimeout(speechTimeoutRef.current);
      }
      
      const idx = currentStepIdx;
      setReadingIndex(idx);
      const rawText = healingData.meditationSteps[idx];
      if (!rawText) return;

      const stepNames = ["첫 번째 지침,", "두 번째 지침,", "세 번째 지침,", "네 번째 지침,", "다섯 번째 지침,", "여섯 번째 지침,", "일곱 번째 지침,"];
      const prefix = stepNames[idx] || `${idx + 1}번째 지침, `;
      
      const textToSpeak = `${prefix} ${rawText}`;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = "ko-KR";
      utterance.rate = 0.8;
      utterance.pitch = 0.88;

      const voices = window.speechSynthesis.getVoices();
      const koVoices = voices.filter((v) => v.lang.includes("ko") || v.lang.includes("KO"));
      let selectedVoice = koVoices.find((v) => 
        v.name.toLowerCase().includes("yuna") || 
        v.name.toLowerCase().includes("heami") || 
        v.name.toLowerCase().includes("female") || 
        v.name.toLowerCase().includes("korean") || 
        v.name.toLowerCase().includes("google")
      );
      if (!selectedVoice && koVoices.length > 0) {
        selectedVoice = koVoices[0];
      }
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      speechUtteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    }
  }, [currentStepIdx, timerActive, isReading, healingData]);

  const toggleSpeaking = () => {
    if (isReading) {
      stopSpeaking();
    } else {
      startSpeaking();
    }
  };

  return (
    <div className="bg-white/40 backdrop-blur-md border border-white/60 shadow-xl rounded-[32px] p-6 md:p-8 h-full flex flex-col justify-between transition-all duration-300 relative overflow-hidden">
      <AnimatePresence mode="wait">
        {loading ? (
          /* High detail Blueprint/Architect loading screen */
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-20 text-center min-h-[450px]"
          >
            <div className="relative mb-8 w-28 h-28 flex items-center justify-center">
              <motion.div
                animate={{
                  rotate: 360,
                  borderRadius: ["50%", "40%", "50%"],
                }}
                transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                className="absolute inset-0 border-t border-b border-indigo-300/30"
              />
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="w-14 h-14 rounded-full bg-indigo-50 flex items-center justify-center border border-indigo-200"
              >
                <Sparkles className="w-6 h-6 text-indigo-500 animate-pulse" />
              </motion.div>
            </div>
            
            <span className="font-mono text-xs text-indigo-500 uppercase tracking-widest font-bold">
              Architectural Drafting
            </span>
            <h3 className="font-serif text-xl text-slate-900 mt-2 font-bold">
              스마트 치유 도면을 설계하고 있습니다...
            </h3>
            
            <p className="text-slate-500 text-sm mt-3 max-w-sm leading-relaxed font-sans">
              "색채가 전하는 내면의 주파수를 분석하고 있습니다. 당신의 슬픔과 긴장을 보호할 깊고 아늑한 치유실의 온빛 두께와 기류, 그리고 주파수 소리를 조율하는 중이니 가슴을 펴고 잠시 대기해주세요."
            </p>

            <div className="mt-6 flex gap-1.5 justify-center">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.2,
                    delay: i * 0.2,
                    ease: "easeInOut",
                  }}
                  className="w-2.5 h-2.5 rounded-full bg-indigo-500"
                />
              ))}
            </div>
          </motion.div>
        ) : selectedProfile && healingData ? (
          /* Multi-step progression views based on 'step' key supplied by parent */
          <div className="flex flex-col h-full justify-between gap-6 min-h-[500px]">
            <div>
              {/* Common Step Progress Indicator at the top of card */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 font-bold border border-indigo-100/30">
                    {step}
                  </div>
                  <div>
                    <span className="font-mono text-[9px] text-indigo-400 block tracking-widest uppercase font-black">
                      Chamber Journey Phase
                    </span>
                    <h3 className="text-sm font-bold text-slate-900">
                      {step === 2 && "2단계: 마음의 무늬 감정 진단"}
                      {step === 3 && "3단계: 가상 물리 치유 공간 입장"}
                      {step === 4 && "4단계: 정화 호흡 수련 & 명상 리추얼"}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold bg-indigo-50/80 text-indigo-600 px-2.5 py-1 rounded-full border border-indigo-100/30">
                    Chamber No. {selectedProfile.num}
                  </span>
                </div>
              </div>

              {/* STAGE 2: EMOTIONAL DIAGNOSIS VIEW */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Highlight Color Summary Circle */}
                  <div className="flex flex-col sm:flex-row items-center gap-4 bg-white/60 p-4 rounded-3xl border border-white/50 shadow-xs">
                    <ColorCircle profile={selectedProfile} size={64} />
                    <div className="text-center sm:text-left">
                      <div className="flex items-center justify-center sm:justify-start gap-1.5">
                        <span className="text-[10px] font-mono text-indigo-600 font-bold bg-indigo-50 px-2 py-0.5 rounded-full">
                          Selected Color Tone
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">
                          36-Color Horizon
                        </span>
                      </div>
                      <h4 className="font-serif text-xl font-black text-slate-900 mt-1">
                        {selectedProfile.title}
                      </h4>
                    </div>
                  </div>

                  {/* Diagnosis Report Quote */}
                  <div className="bg-gradient-to-br from-indigo-50/50 to-purple-50/30 border border-indigo-100/40 rounded-[28px] p-6 shadow-sm relative overflow-hidden">
                    <div className="absolute right-[-10px] top-[-10px] opacity-10 text-indigo-700 pointer-events-none">
                      <Sparkles className="w-24 h-24" />
                    </div>
                    
                    <span className="font-mono text-[10px] text-indigo-500 uppercase tracking-wider block mb-1 font-bold">
                      Architectural Psychology Diagnosis
                    </span>
                    <h5 className="font-serif text-lg font-bold text-indigo-950 mb-3 italic">
                      "{healingData.stateTitle}"
                    </h5>
                    
                    <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap font-sans">
                      {healingData.stateDescription}
                    </p>
                  </div>

                  {/* Sequential analysis detail inside */}
                  <div className="bg-white/40 p-5 rounded-2xl border border-white/40 shadow-inner">
                    <h6 className="text-xs font-bold text-slate-800 flex items-center gap-1.5 mb-2.5">
                      <Activity className="w-4 h-4 text-indigo-500" />
                      연속 색채 심리 진단 (Archive Progression)
                    </h6>
                    <p className="text-xs text-slate-500 leading-relaxed font-sans">
                      {healingData.progressionAnalysis || "선택된 감정의 흔적들이 정량적으로 분석되어 내면의 기후 변화 추이를 도출하였습니다."}
                    </p>
                  </div>
                </motion.div>
              )}

              {/* STAGE 3: ENTERING THE CHAMBER */}
              {step === 3 && (() => {
                const chamberImage = getChamberImageUrl(selectedProfile.num);
                const sentences = splitDescriptionToSentences(healingData.spaceThemeDescription);
                const currentSentenceIdx = Math.max(0, Math.min(activeSlideIndex, sentences.length - 1));
                const activeSentence = sentences[currentSentenceIdx] || "";

                return (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    {/* Unified Architectural Render Card with Overlay text */}
                    <div className="relative rounded-[32px] overflow-hidden min-h-[460px] border border-slate-950/20 shadow-2xl p-6 md:p-8 flex flex-col justify-between text-white bg-slate-900 group">
                      {/* Image background cover */}
                      <div className="absolute inset-0 z-0">
                        <motion.img
                          key={selectedProfile.num}
                          src={chamberImage}
                          alt={healingData.spaceThemeTitle}
                          referrerPolicy="no-referrer"
                          initial={{ opacity: 0, scale: 1.05 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5, ease: "easeInOut" }}
                          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                        />
                      </div>

                      {/* Mix-blend color profile overlay */}
                      <div 
                        className="absolute inset-0 opacity-25 mix-blend-color pointer-events-none z-1"
                        style={{
                          background: selectedProfile.colors.type === "solid" 
                            ? selectedProfile.colors.fill 
                            : `linear-gradient(135deg, ${selectedProfile.colors.leftFill}, ${selectedProfile.colors.rightFill})`
                        }}
                      />
                      {/* Pure dark heavy gradient overlay for maximum reading legibility */}
                      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/70 to-slate-950/95 pointer-events-none z-1" />

                      {/* Header block within card */}
                      <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-4">
                        <div className="flex items-center gap-2">
                          <span 
                            className="inline-block w-2.5 h-2.5 rounded-full ring-2 ring-white/20"
                            style={{
                              background: selectedProfile.colors.type === "solid" 
                                ? selectedProfile.colors.fill 
                                : selectedProfile.colors.leftFill
                            }}
                          />
                          <span className="font-serif text-lg md:text-xl font-bold tracking-tight text-white">
                            #{selectedProfile.num} {selectedProfile.title} 공간
                          </span>
                        </div>
                        <span className="text-xs font-mono text-slate-300 font-medium select-none bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                          {currentSentenceIdx + 1} / {sentences.length}
                        </span>
                      </div>

                      {/* Poetic description content of the space (Spacious Centered single sentence reader) */}
                      <div className="relative z-10 flex-1 flex flex-col justify-center py-10 md:py-14 max-w-2xl mx-auto text-center px-4">
                        <AnimatePresence mode="wait">
                          <motion.p
                            key={currentSentenceIdx}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.35, ease: "easeOut" }}
                            className="text-slate-100 text-base md:text-xl lg:text-2xl leading-relaxed font-sans font-medium drop-shadow-md select-text whitespace-pre-wrap tracking-wide"
                          >
                            {activeSentence}
                          </motion.p>
                        </AnimatePresence>
                      </div>

                      {/* Beautiful branding bottom ribbon with Slide dot indicators & navigation arrows */}
                      <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between gap-4">
                        {/* Slide Dots */}
                        <div className="flex items-center gap-1.5">
                          {sentences.map((_, i) => (
                            <button
                              key={i}
                              onClick={() => {
                                setActiveSlideIndex(i);
                              }}
                              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer
                                ${currentSentenceIdx === i 
                                  ? "w-6 bg-white" 
                                  : "w-1.5 bg-white/40 hover:bg-white/60"
                                }
                              `}
                              title={`${i + 1}번째 구절`}
                            />
                          ))}
                        </div>

                        {/* Navigation Arrows */}
                        <div className="flex items-center gap-2">
                          <button
                            disabled={currentSentenceIdx === 0}
                            onClick={() => {
                              setActiveSlideIndex((prev) => prev - 1);
                            }}
                            className="w-9 h-9 rounded-full border border-white/10 bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/10 disabled:opacity-20 disabled:cursor-not-allowed transition-all cursor-pointer"
                            title="이전 구절"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                          <button
                            disabled={currentSentenceIdx === sentences.length - 1}
                            onClick={() => {
                              setActiveSlideIndex((prev) => prev + 1);
                            }}
                            className="w-9 h-9 rounded-full border border-white/10 bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/10 disabled:opacity-20 disabled:cursor-not-allowed transition-all cursor-pointer"
                            title="다음 구절"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Atmospheric Sound Synthesizer with Selection */}
                    <div className="bg-white/80 p-6 rounded-3xl border border-white/80 shadow-md space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center border border-indigo-100 shrink-0">
                            <Music className="w-5 h-5 text-indigo-600" />
                          </div>
                          <div>
                            <h5 className="text-xs font-extrabold text-slate-800">정화 호흡 동반 사운드 스케이프</h5>
                            <p className="text-[10px] text-slate-400 font-sans mt-0.5">
                              인공지능 진단 추천 BGM환경: <strong className="text-indigo-600 bg-indigo-50 px-1 py-0.5 rounded font-bold">{healingData.meditationAmbientSoundName}</strong>
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={toggleSound}
                          className={`w-full sm:w-auto text-xs font-mono font-bold px-4 py-2.5 rounded-xl transition-all duration-300 border flex items-center justify-center gap-2 cursor-pointer
                            ${
                              soundPlaying
                                ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-100"
                                : "bg-white text-slate-700 border-slate-200 hover:border-indigo-300 hover:bg-slate-50 shadow-xs"
                            }
                          `}
                        >
                          {soundPlaying ? (
                            <>
                              <VolumeX className="w-4 h-4 animate-pulse" />
                              BGM 끄기 (Mute)
                            </>
                          ) : (
                            <>
                              <Volume2 className="w-4 h-4" />
                              BGM 켜기 (Play)
                            </>
                          )}
                        </button>
                      </div>

                      {/* BGM Preset Grid Selector */}
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider mb-2 font-mono">가상 자연 주파수 테마 선택</span>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {BGM_PRESETS.map((preset) => (
                            <button
                              key={preset.id}
                              onClick={() => {
                                setSelectedBgmId(preset.id);
                                if (!soundPlaying) {
                                  startHealingSound(preset.id);
                                } else {
                                  stopHealingSound();
                                  setTimeout(() => {
                                    startHealingSound(preset.id);
                                  }, 800);
                                }
                              }}
                              className={`flex items-start text-left p-3 rounded-2xl border transition-all duration-200 cursor-pointer ${
                                selectedBgmId === preset.id
                                  ? "bg-indigo-50/80 border-indigo-500/50 shadow-xs ring-1 ring-indigo-500/20"
                                  : "bg-white/40 border-slate-200/60 hover:bg-white hover:border-slate-300"
                              }`}
                            >
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-2.5 shrink-0 text-xs ${
                                selectedBgmId === preset.id ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-500"
                              }`}>
                                {preset.id === "cosmic" && <Sparkles className="w-4 h-4" />}
                                {preset.id === "solfeggio" && <Activity className="w-4 h-4" />}
                                {preset.id === "ocean" && <Waves className="w-4 h-4" />}
                                {preset.id === "zen_garden" && <Wind className="w-4 h-4" />}
                                {preset.id === "theta" && <Sun className="w-4 h-4" />}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <span className={`text-[11px] font-bold truncate ${selectedBgmId === preset.id ? "text-indigo-900" : "text-slate-800"}`}>
                                    {preset.name}
                                  </span>
                                  <span className="text-[9px] font-mono text-slate-400 shrink-0 font-semibold">{preset.frequencyName}</span>
                                </div>
                                <p className="text-[10px] text-slate-500 truncate mt-0.5 leading-snug">{preset.description}</p>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })()}

              {/* STAGE 4: MEDITATION PROGRESSION */}
              {step === 4 && (() => {
                const currentMethod = getMeditationMethodKeywords(selectedProfile?.num || 1);
                const currentPhaseTotal = currentMethod.rhythm[breathPhase] || 1;
                const currentPhaseElapsed = currentPhaseTotal - breathCounter;
                const currentPhaseProgress = Math.min(100, Math.max(0, (currentPhaseElapsed / currentPhaseTotal) * 100));

                if (meditationCompleted) {
                  return (
                    <motion.div
                      key="meditation-completed"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="space-y-8 animate-fade-in"
                    >
                      {/* Celebration Card */}
                      <div className="bg-white/90 backdrop-blur-md border border-indigo-100/50 rounded-[32px] p-8 md:p-10 shadow-xl relative overflow-hidden text-center max-w-2xl mx-auto">
                        {/* Soft ambient aura background */}
                        <div 
                          className="absolute w-64 h-64 opacity-10 filter blur-3xl pointer-events-none -right-12 -top-12"
                          style={{
                            background: selectedProfile?.colors.type === "solid" 
                              ? selectedProfile?.colors.fill 
                              : `linear-gradient(135deg, ${selectedProfile?.colors.leftFill}, ${selectedProfile?.colors.rightFill})`
                          }}
                        />
                        <div 
                          className="absolute w-64 h-64 opacity-10 filter blur-3xl pointer-events-none -left-12 -bottom-12"
                          style={{
                            background: selectedProfile?.colors.type === "solid" 
                              ? selectedProfile?.colors.fill 
                              : `linear-gradient(135deg, ${selectedProfile?.colors.rightFill}, ${selectedProfile?.colors.leftFill})`
                          }}
                        />

                        <div className="relative z-10 flex flex-col items-center">
                          {/* Success Icon Circle */}
                          <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mb-6 shadow-xs text-indigo-600">
                            <CheckCircle2 className="w-8 h-8 animate-[pulse_2.5s_ease-in-out_infinite]" />
                          </div>

                          <span className="font-mono text-[10px] text-indigo-500 uppercase tracking-widest font-black block mb-2">
                            Mindfulness Ritual Completed
                          </span>
                          
                          <h4 className="font-serif text-2xl font-black text-slate-900 leading-tight">
                            기품 깊은 정화 수련 완료
                          </h4>

                          <p className="text-slate-600 text-sm mt-4 leading-relaxed font-sans max-w-md">
                            "5회의 평온한 호흡 주기 조율이 성공적으로 끝마쳤습니다! 당신이 설계한 치유의 침실 주파수 속에서 마침내 정서와 슬픔이 곱게 흩어지며, 마음속 자율신경계가 안정적인 평형 상태를 복원해 가고 있습니다. 한껏 맑아진 마음의 기후를 가만히 누려 보십시오."
                          </p>

                          {/* Quick Actions inside completed view */}
                          <div className="mt-8 flex flex-wrap gap-3 justify-center">
                            <button
                              onClick={resetTimer}
                              className="flex items-center gap-1.5 text-xs bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-5 rounded-xl transition-all shadow-md shadow-indigo-100 cursor-pointer"
                            >
                              명상 한번 더 하기 <RotateCcw className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={onReset}
                              className="flex items-center gap-1.5 text-xs bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-5 rounded-xl transition-all shadow-md cursor-pointer"
                            >
                              다른 방 설계하기 <Palette className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Deep Analysis Component inside the final completed view as requested */}
                      <div className="border-t border-slate-200/50 pt-8">
                        <div className="max-w-4xl mx-auto">
                          <div className="mb-6 flex flex-col items-center text-center">
                            <span className="font-mono text-[9px] text-[#4E412C] font-black bg-amber-50/80 border border-amber-200 px-3 py-1 rounded-full uppercase tracking-wider block w-fit">
                              Archive Deep Progression Analysis (아카이브 심화분석)
                            </span>
                            <h4 className="font-serif text-xl font-bold text-slate-900 mt-2">차원적 무의식 아카이빙 진찰 리포트</h4>
                            <p className="text-slate-400 text-xs mt-1">지금껏 누적된 치유 주파수 데이터와 평온의 궤적을 심화 분석한 최종 임상 소견입니다.</p>
                          </div>
                          
                          <DeepAnalysis 
                            historyList={historyList} 
                            onSelectItem={(num) => {
                              onSelectItem(num);
                              setStep(2); // take back to Step 2 when selecting an archive item
                            }}
                            onClearHistory={onClearHistory}
                          />
                        </div>
                      </div>
                    </motion.div>
                  );
                }

                return (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    {/* 1. Personalized Prescription card at the very top of Step 4 */}
                    <div className="bg-white/95 border border-amber-200/50 shadow-md rounded-3xl p-6 relative overflow-hidden">
                      {/* Ambient Aura Background */}
                      <div 
                        className="absolute w-72 h-72 opacity-[0.06] filter blur-3xl pointer-events-none -right-16 -top-16"
                        style={{
                          background: selectedProfile?.colors.type === "solid" 
                            ? selectedProfile?.colors.fill 
                            : `linear-gradient(135deg, ${selectedProfile?.colors.leftFill}, ${selectedProfile?.colors.rightFill})`
                        }}
                      />

                      <div className="relative z-10 flex flex-col gap-6">
                        {/* Header metadata row */}
                        <div className="border-b border-slate-100 pb-5">
                          <div className="space-y-1.5">
                            <span className="font-mono text-[9px] text-[#4E412C] font-black bg-amber-50/80 border border-amber-200 px-3 py-1 rounded-full uppercase tracking-wider block w-fit">
                              Step 4: Personalized Prescription & Guided Respiration
                            </span>
                            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 pt-1.5">
                              <span className="text-[12px] font-bold text-slate-400">진단 처방행동:</span>
                              <h4 className="font-serif text-lg font-extrabold text-[#111827]">
                                {recommendedHealingBehaviors[selectedProfile?.num || 1]?.action || "정서 조율 명상"}
                              </h4>
                            </div>
                            <div className="flex items-center gap-2 pt-1 font-medium text-slate-600 font-sans text-xs">
                              <span className="text-[11px] font-bold text-slate-400">치유의 핵심:</span>
                              <span>{recommendedHealingBehaviors[selectedProfile?.num || 1]?.core || "마음을 열어 고요 속에 호흡과 소리를 동치시킵니다."}</span>
                            </div>
                          </div>
                        </div>

                        {/* Step-by-Step breathing coach description */}
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">
                              🌬️ 맞춤형 의학 조율 단계별 호흡법 ({currentMethod.rhythm.inhale}s - {currentMethod.rhythm.hold}s - {currentMethod.rhythm.exhale}s 템포)
                            </span>
                            <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-bold font-mono">
                              구조화된 5회 반복 기압 적용
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Inhale */}
                            <div className="bg-indigo-50/40 border border-indigo-100/40 rounded-2xl p-4 flex flex-col gap-2">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-black text-indigo-900 flex items-center gap-2">
                                  <span className="w-5 h-5 rounded-md bg-indigo-100/70 text-indigo-700 text-[11px] flex items-center justify-center font-black">1</span>
                                  마음 들이쉬기 (들숨)
                                </span>
                                <span className="font-mono text-xs font-bold text-indigo-600 bg-indigo-50 border border-indigo-100/50 px-2.5 py-0.5 rounded-full">
                                  {currentMethod.rhythm.inhale}초간
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-600 leading-relaxed font-sans">
                                가슴을 곧게 펴고 코끝을 타고 드나드는 차분한 공기에 집중해 보세요. {currentMethod.rhythm.inhale}초 동안 우주의 온화하고 기품 어린 생명력을 폐 깊숙이 가만히 빨아들입다.
                              </p>
                            </div>

                            {/* Hold */}
                            <div className="bg-emerald-50/40 border border-emerald-100/40 rounded-2xl p-4 flex flex-col gap-2">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-black text-emerald-950 flex items-center gap-2">
                                  <span className="w-5 h-5 rounded-md bg-emerald-100/70 text-emerald-700 text-[11px] flex items-center justify-center font-black">2</span>
                                  치유 머금기 (보흡)
                                </span>
                                <span className="font-mono text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-100/50 px-2.5 py-0.5 rounded-full">
                                  {currentMethod.rhythm.hold}초간
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-600 leading-relaxed font-sans">
                                {currentMethod.rhythm.hold > 0 ? (
                                  `들이쉬어 가득 채운 호흡을 부드럽게 고정합니다. ${currentMethod.rhythm.hold}초 동안 신선한 치유의 생체 주파수가 심장과 자율신경계 온몸 전반에 골고루 스며들어 번짐을 느껴봅니다.`
                                ) : (
                                  `긴장 이완율을 극대화하기 위해 정체 주기 없이 즉시 부드럽게 날숨으로 순환을 이어 가십시오. 숨가쁨을 딛고 리드미컬하게 다음 기어에 닿을 수 있습니다.`
                                )}
                              </p>
                            </div>

                            {/* Exhale */}
                            <div className="bg-cyan-50/45 border border-cyan-100/40 rounded-2xl p-4 flex flex-col gap-2">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-black text-cyan-500 flex items-center gap-2">
                                  <span className="w-5 h-5 rounded-md bg-cyan-100/70 text-cyan-700 text-[11px] flex items-center justify-center font-black">3</span>
                                  슬픔 비워내기 (날숨)
                                </span>
                                <span className="font-mono text-xs font-bold text-cyan-600 bg-cyan-50 border border-cyan-100/50 px-2.5 py-0.5 rounded-full">
                                  {currentMethod.rhythm.exhale}초간
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-600 leading-relaxed font-sans">
                                입술을 작게 불어 {currentMethod.rhythm.exhale}초 동안 전신에 머물던 묵은 상념, 긴장 잔여물, 감정의 앙금들을 치유 공간의 안착된 공기 속으로 흩뿌려 비워냅니다.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 2. Audio timer controls */}
                    <div className="max-w-xl mx-auto w-full">
                      {/* Breathing & Sound Station */}
                      <div className="bg-gradient-to-b from-indigo-50/10 to-purple-50/10 backdrop-blur-xs border border-white/60 rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-xs relative overflow-hidden">
                        {/* Aura */}
                        <div 
                          className="absolute w-56 h-56 opacity-10 filter blur-3xl pointer-events-none"
                          style={{
                            background: selectedProfile?.colors.type === "solid" 
                              ? selectedProfile?.colors.fill 
                              : `linear-gradient(135deg, ${selectedProfile?.colors.leftFill}, ${selectedProfile?.colors.rightFill})`
                          }}
                        />

                        <span className="font-mono text-[9px] text-indigo-500 uppercase tracking-widest block mb-4 font-black">
                          Respiration Coach
                        </span>

                        {/* Mini Breathing Sphere */}
                        <div className="relative w-36 h-36 flex items-center justify-center mb-4">
                          <motion.div
                            animate={{
                              scale: getBreathCircleScale(),
                            }}
                            transition={{ duration: 1.0, ease: "linear" }}
                            className={`absolute w-20 h-20 rounded-full border transition-colors duration-500 flex items-center justify-center shadow-md ${getBreathColorClass()}`}
                          />

                          {/* Digital countdown */}
                          <div className="relative z-20 flex flex-col items-center">
                            <span className="font-mono text-[11px] font-black text-indigo-700 bg-indigo-50/90 px-2 py-0.5 rounded-full border border-indigo-200/40 mb-2 shadow-xs animate-bounce" style={{ animationDuration: "3s" }}>
                              {currentStepIdx + 1} / 5회
                            </span>
                            <span className="font-mono text-3xl font-black text-slate-950 tracking-tight leading-none">
                              {formatTime(stepSecondsLeft)}
                            </span>
                            <span className="font-mono text-[9px] text-slate-500 mt-1.5 font-bold tracking-wider leading-none">
                              {breathPhase === "hold" ? `지 (Hold)` : breathPhase === "inhale" ? `흡 (Inhale)` : `호 (Exhale)`} {breathCounter}s
                            </span>
                          </div>
                        </div>

                        {/* Guide badge */}
                        <div className="mb-5 h-6">
                          <span className="text-[11px] font-bold text-indigo-950 px-3 py-1 rounded-full bg-indigo-50/85 border border-indigo-100/20 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                            {getBreathLabel()}
                          </span>
                        </div>

                        {/* Controls Row */}
                        <div className="flex flex-wrap items-center justify-center gap-2 w-full">
                          <button
                            onClick={toggleTimer}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-4 py-2 text-xs font-bold flex items-center gap-1 transition-all shadow-sm cursor-pointer"
                          >
                            {timerActive ? (
                              <>
                                <Pause className="w-3.5 h-3.5" /> 멈춤
                              </>
                            ) : (
                              <>
                                <Play className="w-3.5 h-3.5" /> 호흡 시작
                              </>
                            )}
                          </button>

                          <button
                            onClick={toggleSound}
                            className={`text-xs px-3 py-2 rounded-xl border flex items-center gap-1 transition-all cursor-pointer ${
                              soundPlaying
                                ? "bg-indigo-50 text-indigo-700 border-indigo-200"
                                : "bg-white text-slate-600 border-slate-200 hover:border-indigo-200"
                            }`}
                          >
                            {soundPlaying ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                            {soundPlaying ? "소리 끄기" : "배경음 켜기"}
                          </button>

                          <button
                            onClick={resetTimer}
                            className="border border-slate-200 hover:border-indigo-200 bg-white text-slate-500 rounded-xl p-2 transition-all cursor-pointer"
                            title="시간 초기화"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="mt-4 text-[10px] text-slate-450 font-sans space-y-1">
                          <div>
                            추천 사운드환경: <strong className="text-indigo-600 font-bold">{healingData.meditationAmbientSoundName}</strong>
                          </div>
                        </div>

                        {/* Live BGM Presets Panel in Step 4 */}
                        <div className="mt-4 pt-4 border-t border-slate-100/40 w-full text-left font-sans">
                          <span className="text-[9px] font-mono font-black text-slate-450 block tracking-wider uppercase mb-2">
                            BGM 사운드테마 변경 ({BGM_PRESETS.find(p => p.id === selectedBgmId)?.frequencyName || "Cosmic"})
                          </span>
                          <div className="grid grid-cols-2 gap-1.5">
                            {BGM_PRESETS.map((p) => {
                              const isSelected = selectedBgmId === p.id;
                              return (
                                <button
                                  key={p.id}
                                  onClick={() => {
                                    setSelectedBgmId(p.id);
                                    if (soundPlaying) {
                                      stopHealingSound();
                                      setTimeout(() => {
                                        startHealingSound(p.id);
                                      }, 800);
                                    } else {
                                      startHealingSound(p.id);
                                    }
                                  }}
                                  className={`text-[10px] text-left p-2 rounded-xl border transition-all truncate cursor-pointer ${
                                    isSelected
                                      ? "bg-indigo-600 text-white border-indigo-600 font-bold shadow-sm"
                                      : "bg-white border-slate-200/60 text-slate-700 hover:bg-slate-50/50 hover:border-slate-300"
                                  }`}
                                  title={p.name}
                                >
                                  {p.name.split(" ")[0]}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })()}
            </div>

            {/* Bottom step switcher buttons block */}
            <div className="pt-5 border-t border-slate-100/50 mt-4 flex items-center justify-between gap-4">
              {/* Back actions */}
              <div>
                {step === 2 && (
                  <button
                    onClick={onReset}
                    className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-indigo-600 transition-colors font-bold"
                  >
                    <ChevronLeft className="w-4 h-4" /> 상태 색채 새로 선택
                  </button>
                )}
                {step === 3 && (
                  <button
                    onClick={() => setStep(2)}
                    className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-indigo-600 transition-colors font-bold"
                  >
                    <ChevronLeft className="w-4 h-4" /> 이전 단계 (감정 분석 결과)
                  </button>
                )}
                {step === 4 && (
                  <button
                    onClick={() => setStep(3)}
                    className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-indigo-600 transition-colors font-bold"
                  >
                    <ChevronLeft className="w-4 h-4" /> 이전 단계 (공간 테마 구성)
                  </button>
                )}
              </div>

              {/* Forward actions */}
              <div>
                {step === 2 && (
                  <button
                    onClick={() => setStep(3)}
                    className="flex items-center gap-1.5 text-xs bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-4 rounded-xl transition-all shadow-md shadow-indigo-100"
                  >
                    치유의 방 입장하기 <ChevronRight className="w-4 h-4" />
                  </button>
                )}
                {step === 3 && (
                  <button
                    onClick={() => setStep(4)}
                    className="flex items-center gap-1.5 text-xs bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-4 rounded-xl transition-all shadow-md shadow-indigo-100"
                  >
                    명상 공간 시작하기 <ChevronRight className="w-4 h-4" />
                  </button>
                )}
                {step === 4 && (
                  <button
                    onClick={onReset}
                    className="flex items-center gap-1.5 text-xs bg-slate-900 hover:bg-slate-900 text-white font-bold py-2.5 px-4 rounded-xl transition-all shadow-md"
                  >
                    처음으로 회귀하기 (Reset) <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Empty / Prompt selection screen */
          <div className="flex flex-col items-center justify-center py-20 text-center min-h-[450px]">
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: [0.98, 1, 0.98] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="w-24 h-24 rounded-full bg-linear-to-b from-slate-50 to-indigo-50 border border-indigo-100 flex items-center justify-center mb-6 shadow-xs"
            >
              <Wind className="w-8 h-8 text-indigo-400" />
            </motion.div>

            <h3 className="font-serif text-2xl text-slate-950 font-extrabold tracking-tight">
              평온의 도면에 오신 것을 환영합니다
            </h3>
            <p className="text-slate-500 text-sm mt-3 max-w-md leading-relaxed font-sans px-4">
              "당신의 무의식이 이끄는 곳을 선택하십시오. 위 격자에서 흘러나오는 36종의 색채 원반 중 마음이 편해지는 하나의 색깔을 조용히 터치하여, 차례대로 감정을 진찰하고 나만의 명상 침실을 설계하십시오."
            </p>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
