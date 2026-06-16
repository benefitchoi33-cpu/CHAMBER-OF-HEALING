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
  1: { action: "햇살을 받는 긍정 확언(Affirmation)", core: "밝고 개방적인 테라스 느낌의 환경" },
  2: { action: "리드미컬한 복식 호흡", core: "에너제틱한 붉은 톤의 입구 환경" },
  3: { action: "정적인 바디 스캔 명상", core: "차분한 낮은 조도의 공간 환경" },
  4: { action: "규칙적인 4-4-4 호흡법", core: "대칭적인 중립적 색조 공간 환경" },
  5: { action: "어깨와 목 근육 이완 가이드", core: "깊고 고요한 남색의 서재 환경" },
  6: { action: "접지(Grounding) 호흡법", core: "안전한 박스형 아늑한 공간 환경" },
  7: { action: "좌우 뇌 균형을 맞추는 교차 호흡", core: "대비가 강한 기하학적 공간 환경" },
  8: { action: "소리를 내며 내뱉는 정화 호흡", core: "거칠고 단단한 돌 질감의 공간 환경" },
  9: { action: "명상 전 스트레칭", core: "투명한 유리 소재의 개방 공간 환경" },
  10: { action: "자기 연민(Self-compassion) 명상", core: "따뜻한 목재의 밀폐 공간 환경" },
  11: { action: "에너지를 밖으로 쏟아내는 활동", core: "높은 층고의 다이나믹한 공간 환경" },
  12: { action: "선택과 집중을 돕는 심상화 명상", core: "곡선이 강조된 유동적 공간 환경" },
  13: { action: "경직된 사고를 푸는 가벼운 산책", core: "수직성이 강조된 견고한 공간 환경" },
  14: { action: "10분간의 깊은 수면(낮잠)", core: "부드러운 패브릭 질감의 공간 환경" },
  15: { action: "창의적인 글쓰기(브레인 덤프)", core: "확장되는 그라데이션 공간 환경" },
  16: { action: "전신 이완 및 근육 풀기", core: "차갑고 깨끗한 화이트 공간 환경" },
  17: { action: "심리적 거리두기 시각화 명상", core: "겹겹이 쌓인 레이어 공간 환경" },
  18: { action: "차분한 침묵의 명상", core: "비어있는 미니멀한 공간 환경" },
  19: { action: "미래를 그리는 시각화 명상", core: "탁 트인 수평선적 공간 환경" },
  20: { action: "자연음 청취 및 명상", core: "자연이 투영된 그린 공간 환경" },
  21: { action: "호흡에만 집중하는 집중 명상", core: "백색의 비움이 강조된 공간 환경" },
  22: { action: "감정을 관찰하는 마인드풀니스", core: "붉은 포인트의 밀도 높은 공간 환경" },
  23: { action: "감사 일기 쓰기", core: "따뜻한 노란빛의 밝은 공간 환경" },
  24: { action: "4-7-8 호흡법으로 신경 안정", core: "다양한 색이 섞인 복합 공간 환경" },
  25: { action: "목표를 되새기는 확언", core: "수직으로 뻗은 상승적 공간 환경" },
  26: { action: "심장 호흡(Heart-focused breathing)", core: "핑크빛의 따뜻한 감성 공간 환경" },
  27: { action: "호흡을 세며 마음 정돈", core: "그림자가 강조된 차분한 공간 환경" },
  28: { action: "가벼운 스트레칭과 움직임", core: "변화가 느껴지는 패턴 공간 환경" },
  29: { action: "마음 비우기(비움 명상)", core: "그레이톤의 평온한 공간 환경" },
  30: { action: "통찰을 얻는 침묵 명상", core: "깊은 인디고의 신비한 공간 환경" },
  31: { action: "깊은 수면 유도 가이드", core: "자연스러운 유기적 곡선 공간 환경" },
  32: { action: "감정을 분류하는 명상", core: "레이어가 겹친 미로형 공간 환경" },
  33: { action: "일상적 감사 가이드", core: "현실적인 질감의 조화 공간 환경" },
  34: { action: "자기 돌봄(Self-care) 명상", core: "밝은 빛이 스며드는 공간 환경" },
  35: { action: "억눌린 감정 배출 가이드", core: "폐쇄에서 개방으로 변하는 공간 환경" },
  36: { action: "성취를 기념하는 명상", core: "황금빛이 도는 안정된 공간 환경" }
};

const getCheeringQuote = (num: number, title: string): string => {
  const quotes: Record<number, string> = {
    1: "포근한 어리광을 부리고 싶을 만큼 쓸쓸한 하루였나요? 애써 씩씩하지 않아도 괜찮아요. 이곳의 다정한 노란빛이 당신을 따뜻하게 안아줄 거예요.",
    2: "기쁨으로 활짝 피어난 당신의 자신감은 참 보기 좋습니다. 스스로 찬란히 빛나고 있음을 기억하며, 이 순수한 기운을 주위에도 널리 흘려보내 주세요.",
    3: "마음의 방 한구석에 무거운 그늘이 드리워졌군요. 어둠이 짙을수록 흘러갈 빛도 준비되고 있습니다. 무리하지 말고 가만히 마음을 쉬어 가세요.",
    4: "몸이 보내는 긴장의 메시지가 소화기로 닿았군요. 가만히 숨을 어루만지며, 일상의 과도한 압박감을 편안하게 내려놓아 보세요.",
    5: "피로가 쌓이며 심신의 순환 기능이 지쳤던 것 같습니다. 맑은 물이 흘러 정화되듯, 오늘 당신의 무거웠던 기운들도 모두 깨끗하게 씻겨 나갈 것입니다.",
    6: "믿음이 흐려지고 경계심이 날카로워질 만한 일들이 있었네요. 자신을 보호하기 위한 예민한 촉이었으니, 이제는 긴장감을 풀고 편히 안전하게 머무르세요.",
    7: "마음에 남은 날선 자극과 충격적인 기억들이 평온을 뒤흔들었군요. 부드러운 치유의 손길로 아픈 흔적을 포근히 다독이고 치유해 드릴게요.",
    8: "뜻대로 되지 않아 속상하고 억울한 감정이 꿈틀댔군요. 그 속상함을 부정하지 말고 고스란히 이곳에 털어놓으세요. 마음이 한결 가벼워 질 거예요.",
    9: "혼자 감당하기 벅찬 고단함 속에서 소리 없이 도움을 기다리고 계셨네요. 당신은 고립된 존재가 아닙니다. 이 은은한 공간이 늘 함께 호흡하고 있습니다.",
    10: "내면의 허기를 어떤 갈망으로 채우려 바빴던 나날이군요. 잠시 소유와 집착을 뒤로하고, 지금 이 순간 존재하는 나 자체로 가득해지는 만족감을 누리세요.",
    11: "나의 진심과 역량을 세상에 힘 있게 펼치고 싶으셨군요. 당신의 주장은 가치 있고 당당합니다. 잠시 힘을 빼고 내면의 단단한 중심을 감각해 보세요.",
    12: "끝없는 생각의 나래와 근심들이 의식을 어둡게 흐립니다. 머릿속의 어지러운 글자들을 하얀 안개 속에 흩뿌리며 숨결 뒤로 멀리 흘려보냅니다.",
    13: "마음 깊은 곳 든든한 온기와 믿음직한 어깨 혹은 남성적인 애정이 그리웠던 밤입니다. 홀로 감당하던 짐을 내려놓고 고요한 온기를 음미해 보세요.",
    14: "무언가를 채우고 싶다는 무의식적인 허전함이 있었나요? 이미 당신 안에 가장 온전하고 순수하게 채워진 사랑의 씨앗이 있음을 믿어보세요.",
    15: "지친 육체가 마음을 조용히 두드리고 있는 날입니다. 모든 일과 판단을 멈추고 온전히 쉼에 집중하세요. 당신의 몸을 가장 귀중히 대접할 시간입니다.",
    16: "누적된 피로 속에 뼈와 근육들이 묵직한 고단함을 하소연하네요. 단잠이 드는 침대처럼 이 공간에 몸을 폭 뉘이고 피로의 무늬를 지워 나갑니다.",
    17: "상처와 서운함이 미움과 적의로 변해 가슴을 찌르고 있습니다. 상처 입은 날카로운 마음을 이곳의 푸른 평온 속에 고요히 희석해 흘려보냅니다.",
    18: "더할 나위 없이 든든하고 풍성한 일상을 지나고 계시네요. 이 충만함을 편안하게 만지며, 스스로에게 따사로운 미소를 아낌없이 보내 주세요.",
    19: "세상과 조화롭게 흐르며 수용하는 겸손한 마음의 지평을 가지고 계십니다. 비울수록 더 가득 차오르는 평화와 우아함을 누려 가세요.",
    20: "마음에 따스한 그리움과 이성적인 섬세한 애정이 보드랍게 움트고 있군요. 그 애틋하고도 아름다운 떨림을 이곳에 고요히 뉘여 간직해 둡니다.",
    21: "주변을 돌보고 이타적으로 희생하기 위해 애써온 당신. 오늘은 타인 대신 수고 많았던 나 자신에게 가장 정성스럽고 무한한 보살핌을 배풀어주세요.",
    22: "억눌린 긴장감이 충동처럼 번쩍이며 마음을 세차게 흔들었군요. 거센 감정의 폭풍 뒤 부는 잔잔한 바람에 기댄 채 가쁜 숨을 차분히 가다듬어 보세요.",
    23: "새벽하늘을 여는 맑은 서광처럼, 당신의 길에 눈부신 희망이 떠오르고 있습니다. 내면의 맑은 거울 속에 비친 당신의 소망은 곧 현실로 다가옵니다.",
    24: "조급한 시계 소리처럼 마음이 타들어가고 긴장이 차올랐나요? 괜찮아요, 조급해하지 않아도 모든 꽃은 저마다의 계절을 따라 비로소 피어납니다.",
    25: "자신을 향한 자존감이 돋보이지만 마음이 다소 방실대며 들떴을 수 있습니다. 들뜬 기류를 차분히 가라앉히며 좀 더 맑고 투명한 지혜와 마주하세요.",
    26: "밝게 웃고 있지만 마음 한편엔 숨겨둔 조그만 걱정과 조바심이 숨 쉬고 있군요. 그 겉모습과 속모습 모두가 당신의 소중하고 자연스러운 한 면입니다.",
    27: "어떤 큰 흐름에 온전히 몸과 마음을 내맡긴 채 평안을 누리는 깊은 신비로운 상태입니다. 사랑으로 가득 찬 고요가 영혼을 부드럽게 감싸줍니다.",
    28: "정서적이거나 물질적으로 채워지지 않은 배고픔이 느껴지네요. 차 한 잔의 여유를 통해 가장 단순하면서도 포근한 감각부터 달콤하게 채워 주세요.",
    29: "선택의 갈림길 앞에서 서성거리며 막연한 답답함을 느끼고 있군요. 정답은 이미 당신의 정화된 내면 안에 보석처럼 기다리고 있습니다.",
    30: "소화기에서 정서로 정화가 고프다는 신호를 부드럽게 주고 있네요. 위장의 결을 쓸어내리는 따스한 보듬이 가슴 깊은 응어리까지 고요히 녹여줍니다.",
    31: "잠 못 드는 깊은 밤의 피로가 머리와 눈가를 무겁게 누르고 있네요. 어지러운 생각들을 밤하늘에 띄워 보내고 가장 평온한 숨소리에만 귀 기울여 보세요.",
    32: "정서적 흔들림과 불안정이 물결처럼 굽이치는 날이군요. 흔들리는 물결도 언젠가는 호수의 거울처럼 고요해집니다. 이 공간이 든든한 닻이 되어 줄게요.",
    33: "오래된 마음에 쓸 데 없는 엉클어짐을 한 장 한 장 가지런히 청소하고 계시군요. 홀가분한 가벼움으로 비워낸 자리에 싱그러운 새바람이 찾아올 것입니다.",
    34: "기나긴 터널을 지나 비로소 건강하고 평화롭게 소생하는 기적을 느끼는 시간입니다. 단단해진 마음에 돋아날 희망의 푸른 잎사귀들을 축하합니다.",
    35: "가장 포근한 모성 혹은 여성적인 섬세하고 따사로운 애정이 간간이 그리우셨나요? 사랑과 돌봄의 공간이 늘 당신 주변에 머무르고 있습니다.",
    36: "사랑받지 못하고 채워지지 않는 슬픔과 결핍이 내면의 아이를 울리고 있었네요. 세상의 그 누구도 아닌 당신의 손길이 지금 그 아이를 안아줍니다."
  };
  return quotes[num] || `당신의 ${title} 상태를 가장 평온하게 보살펴 드릴게요. 마음을 놓고 편안히 가라앉혀 보십시오.`;
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
      method: "햇살을 받는 긍정 확언(Affirmation) 명상",
      description: "밝고 개방적인 테라스 느낌의 환경에서 따스한 아침 햇살을 온몸으로 받으며 내면에 새로운 희망과 기쁨을 일깨우는 긍정 확언 카드를 소리 내어 읊어 봅니다.",
      keywords: ["희망", "기쁨", "긍정 확언", "개방 테라스", "태양 에너지"],
      rhythm: { inhale: 4, hold: 2, exhale: 4 }
    },
    2: {
      method: "리드미컬한 복식 호흡법",
      description: "에너제틱한 붉은 톤의 입구 환경을 머릿속에 시각화하며, 아랫배를 리드미컬하고 힘차게 움직여 산소와 열정을 불어넣는 복식 호흡을 수행합니다.",
      keywords: ["열정", "행동", "붉은 에너지", "복식 호흡", "리드미컬"],
      rhythm: { inhale: 4, hold: 2, exhale: 4 }
    },
    3: {
      method: "정적인 바디 스캔 명상",
      description: "차분하고 은은한 낮은 조도의 공간에서 의식을 정수리부터 발끝까지 천천히 내리며, 우울함과 무기력이 서린 몸의 긴장 부위를 세심하게 녹여냅니다.",
      keywords: ["우울", "무기력", "바디 스캔", "낮은 조도", "정적 치유"],
      rhythm: { inhale: 4, hold: 4, exhale: 6 }
    },
    4: {
      method: "규칙적인 4-4-4 균형 호흡법",
      description: "대칭적이고 중립적인 색조로 마음을 진정시키는 공간 속에서, 들이마시고 멈추고 내쉬는 박자를 각각 4초씩 일정하게 유지하며 흐트러진 내면의 밸런스를 되찾습니다.",
      keywords: ["균형", "안정", "4-4-4 호흡", "대칭 공간", "중립 분위기"],
      rhythm: { inhale: 4, hold: 4, exhale: 4 }
    },
    5: {
      method: "어깨와 목 근육 이완 가이드",
      description: "깊고 고요한 남색 서재의 침묵 속에서 숨을 내쉴 때마다 잔뜩 긴장해 굳어 있던 어깨와 목 주변의 큰 근육들을 차례로 노곤하게 이완시켜줍니다.",
      keywords: ["긴장", "억제", "근육 이완", "남색 서재", "고요"],
      rhythm: { inhale: 4, hold: 2, exhale: 4 }
    },
    6: {
      method: "접지(Grounding) 호흡법",
      description: "사방이 나를 지켜주는 안전한 박스형 아늑한 공간에서 양발을 대지에 단단히 내리듯이 들숨과 날숨의 안정된 지구 중력을 체험하며 두려움과 차단을 치유합니다.",
      keywords: ["두려움", "차단", "접지 호흡", "안전 벙커", "안도감"],
      rhythm: { inhale: 4, hold: 4, exhale: 4 }
    },
    7: {
      method: "좌우 뇌 균형을 맞추는 교차 호흡법",
      description: "대비가 강한 기하학적인 입체 공간 속에서 한쪽 코를 번갈아 막으며 호흡하여 불안감과 갈등으로 엉킨 좌우 뇌의 생각 흐름을 이상적으로 정렬합니다.",
      keywords: ["갈등", "불안", "교차 호흡", "기하학 공간", "뇌 평형"],
      rhythm: { inhale: 4, hold: 4, exhale: 4 }
    },
    8: {
      method: "소리를 내며 내뱉는 정화 호흡법",
      description: "거칠고 견고한 돌 질감의 동굴 공간 속에서 솟구치는 가슴속 분노와 고집의 불덩어리를 큰 비명이나 하- 소리를 내어 날숨에 투박하게 뿜어내 말소합니다.",
      keywords: ["분노", "고집", "정화 호흡", "소리 배출", "할석 돌방"],
      rhythm: { inhale: 4, hold: 0, exhale: 6 }
    },
    9: {
      method: "명상 전 신체 오프닝 스트레칭",
      description: "탁 트이고 투명한 유리 소재의 개방감 넘치는 공간을 느끼며, 뭉치고 경직된 척추와 사지를 시원하게 뻗쳐내어 내면의 순수한 시작을 신체적으로 축하합니다.",
      keywords: ["시작", "순수", "스트레칭", "유리 개방", "기지개"],
      rhythm: { inhale: 4, hold: 2, exhale: 4 }
    },
    10: {
      method: "자비심 어린 자기 연민(Self-compassion) 명상",
      description: "따뜻한 나무 향이 감도는 편안하고 차단된 밀폐 공간 속에서, 지치고 상처받은 스스로에게 '충분히 잘해왔다'며 가슴 위로 양손을 조용히 포개어 위무해 줍니다.",
      keywords: ["고립", "소외", "자기 연민", "따뜻한 목재", "소생"],
      rhythm: { inhale: 4, hold: 2, exhale: 4 }
    },
    11: {
      method: "에너지를 밖으로 쏟아내는 역동적 활동",
      description: "하늘로 시원하게 뚫린 아주 높은 층고의 다이나믹한 진동 공간에서 정체된 신체 에너지를 가벼운 수동 진동이나 소리를 지르는 역동적인 도약으로 완전히 분출해버립니다.",
      keywords: ["열정", "분출", "역동 활동", "높은 층고", "에너지 시너지"],
      rhythm: { inhale: 4, hold: 2, exhale: 4 }
    },
    12: {
      method: "의사결정을 돕는 심상화 명상",
      description: "부드럽고 유려한 곡선이 흐르는 유동적인 공간에서 고민하던 두 가지 갈등의 갈래를 강물에 흘려보내는 시각화를 통해 오직 참된 내면의 정답에 마음을 정위시킵니다.",
      keywords: ["갈등", "모호함", "선택 심상화", "곡선 유동", "집중 정렬"],
      rhythm: { inhale: 4, hold: 4, exhale: 4 }
    },
    13: {
      method: "경직된 고집을 해소하는 마음 산책",
      description: "하늘로 높이 곧게 뻗은 기둥들이 서 있는 엄숙하고 견고한 공간에서 단단히 얼어붙었던 어리석은 아치들을 풀어주며 한걸음씩 의식적으로 바닥을 딛는 치유 산책을 합니다.",
      keywords: ["고집", "단절", "의식 산책", "수직 기둥", "생각 환기"],
      rhythm: { inhale: 4, hold: 2, exhale: 4 }
    },
    14: {
      method: "10분간의 깊은 수면(무위 낮잠)",
      description: "포근하고 보드라운 펠트와 부클레 직물의 질감으로 둘러싸여 찬 기운이 배제된 침실에서 완전하게 자아의 끈을 놓고 누워 잠시 고요한 단잠의 복원을 맛봅니다.",
      keywords: ["피로", "고립", "깊은 낮잠", "패브릭 감촉", "수면 복원"],
      rhythm: { inhale: 4, hold: 4, exhale: 4 }
    },
    15: {
      method: "창의적인 글쓰기(브레인 덤프) 리추얼",
      description: "색과 빛이 서서히 퍼져 울리는 무한히 확장되는 그라데이션 공간 속에서 가슴 밑바닥 속에 도사리는 욕구불만과 정돈 안 된 문장들을 종이 위에 끄집어내 쏟아냅니다.",
      keywords: ["욕구 불만", "글쓰기", "그라데이션", "브레인 덤프", "표현 해방"],
      rhythm: { inhale: 4, hold: 2, exhale: 4 }
    },
    16: {
      method: "전신 미세 이완 및 근육 정돈",
      description: "티 없이 차갑고 깨끗하게 빚어진 순백의 화이트 공간 속에서, 지친 신체의 모든 림프와 자잘한 감각 마디들을 씻어내어 맑은 호흡으로 전신을 깨끗이 정돈합니다.",
      keywords: ["육체적 피로", "전신 이완", "화이트 공간", "피로 리셋", "숨고르기"],
      rhythm: { inhale: 4, hold: 2, exhale: 4 }
    },
    17: {
      method: "심리적 거리두기를 위한 레이어 시각화 명상",
      description: "겹겹이 쌓인 부드러운 벽체와 레이어 구획 공간 속에서, 타인과 나를 괴롭히는 외부 자극 사이에 안전한 치유의 반투명 방음벽을 한 겹씩 세워 사색을 보호합니다.",
      keywords: ["자기 보호", "방어", "시각화", "레이어 벽", "안전 한계"],
      rhythm: { inhale: 4, hold: 4, exhale: 4 }
    },
    18: {
      method: "차분한 텅 빈 침묵 명상",
      description: "어떠한 기교나 장식도 존재하지 않는 조용히 비워진 미니멀 공간에서 가슴 무거웠던 상실의 애통과 허무를 고요히 바라보고 있는 그대로 비워 흘려보냅니다.",
      keywords: ["상실", "허무", "침묵 명상", "미니멀리즘", "비워내기"],
      rhythm: { inhale: 4, hold: 4, exhale: 4 }
    },
    19: {
      method: "미래를 그리는 수평선적 시각화 명상",
      description: "광활하고 탁 트인 하늘과 장엄한 수평선이 머무는 공간 속에서, 새롭게 움트는 미래의 명예와 순결한 성취 장면들을 수채화 그리듯 마음의 눈 위에 펼쳐봅니다.",
      keywords: ["새로운 시작", "수평선", "미래 시각화", "개방 지평", "해방"],
      rhythm: { inhale: 4, hold: 2, exhale: 4 }
    },
    20: {
      method: "자연을 담은 그린 사운드스케이프 명상",
      description: "푸르른 이끼와 싱그러운 식물이 자연 그대로 투영된 아늑한 그린 공간에서 흔들리는 나뭇잎 바람 소리에 자율신경 주파수를 완벽하게 평온히 동조시킵니다.",
      keywords: ["조화", "평온", "자연음 싱크", "그린 테라피", "수풀"],
      rhythm: { inhale: 4, hold: 4, exhale: 4 }
    },
    21: {
      method: "오직 호흡에만 마음을 박는 집중 명상",
      description: "잡음과 장식마저 가뿐히 제거해 올린 절대 백색의 침묵 공간 속에서, 오직 끝없이 드나드는 숨의 입구와 출구 끝 바람의 마찰에만 순수히 의식을 고정해봅니다.",
      keywords: ["순수", "잠재력", "백색 비움", "집중 호흡", "원초 진리"],
      rhythm: { inhale: 4, hold: 4, exhale: 4 }
    },
    22: {
      method: "겪고 있는 날것의 감정을 관찰하는 마인드풀니스",
      description: "붉은 포인트가 밀도 있게 새겨진 집중력 강한 붉은 공간 속에서, 마음 가득 끓어오르는 격정과 소용돌이치는 갈등들을 남의 일 보듯 무심하고 투명하게 바라봅니다.",
      keywords: ["격정", "갈등", "관찰자 주시", "밀도", "포인트"],
      rhythm: { inhale: 4, hold: 4, exhale: 4 }
    },
    23: {
      method: "온화한 온기 수렴형 감사 일기",
      description: "따스하고 부드러운 노란빛이 아침 안개처럼 스며드는 공간 속에서, 오늘 하루 내 곁을 스쳐 간 소중한 은인들과 가쁜 생명의 평화 세 가지를 일기에 조심스레 적어봅니다.",
      keywords: ["희망", "기대", "감사 일기", "노란빛", "온기 수렴"],
      rhythm: { inhale: 4, hold: 2, exhale: 4 }
    },
    24: {
      method: "부교감 신경 활성 4-7-8 자율 조율 호흡법",
      description: "다양한 빛과 불규칙한 각도가 섞여 불안을 유발하던 환경을 이겨내듯, 호흡을 정확히 4초 들이마시고, 7초 동안 지그시 참았다가, 8초 동안 길게 하 내쉬어 진정을 꾀합니다.",
      keywords: ["혼란", "불안", "4-7-8 호흡", "복합 공간", "자율 진정"],
      rhythm: { inhale: 4, hold: 7, exhale: 8 }
    },
    25: {
      method: "열정의 정위를 위한 확언 리추얼",
      description: "하늘로 곧고 장엄하게 솟아오른 소통 아궁의 상승형 층고 속에서, 도취되지 않고 순고하게 내가 다다를 삶의 가치와 원대한 지표를 덤덤하게 다짐하며 확언합니다.",
      keywords: ["열망", "갈구", "확언 암송", "상승 축", "목표 각인"],
      rhythm: { inhale: 4, hold: 2, exhale: 4 }
    },
    26: {
      method: "심장 중심 심장 박동 호흡 (Heart-Focused Breath)",
      description: "러블리한 핑크빛 노을 조명이 고고하게 흐르는 아늑하고 사랑스런 쉼터에서, 깊은 숨을 마음이 아닌 가슴 한가운데 심장 속 혈류로 직접 마주하듯 들이마셔 온기를 키웁니다.",
      keywords: ["애정", "부드러움", "심장 호흡", "핑크 아우라", "사랑 에너지"],
      rhythm: { inhale: 5, hold: 0, exhale: 5 }
    },
    27: {
      method: "생각을 붙잡아 두는 호흡 구절 세기(수식관)",
      description: "그림자가 세밀하게 서려 고요해진 차분한 서재 한 모퉁이에서, 번잡하게 흩뿌려진 미련을 거둬들이듯 호흡의 숫자를 하나부터 열까지 조용히 헤아리며 정신을 모읍니다.",
      keywords: ["불안", "공허", "수식 호흡", "그림자 법", "안정"],
      rhythm: { inhale: 4, hold: 4, exhale: 4 }
    },
    28: {
      method: "순환을 깨우는 가랑이 스트레칭과 정돈 움직임",
      description: "역동적인 변화의 물결이 감지되는 감각적인 기하학 패턴 공간 속에서, 지체된 피하의 노폐물 순환을 돕도록 굳어 있는 등뼈와 어깨뼈를 정교히 흔들며 스트레칭에 임합니다.",
      keywords: ["활력", "변화", "스트레칭", "기하 패턴", "순환 촉진"],
      rhythm: { inhale: 4, hold: 2, exhale: 4 }
    },
    29: {
      method: "마음을 투명하게 청소하는 비움 명상",
      description: "어느 한쪽으로도 치우치지 않는 평온하고 무심한 그레이톤 중성 공간에서 머릿속 가득 들어찼던 선입견과 판단들을 바람에 흘려 보내듯 고이 꺼내어 지워냅니다.",
      keywords: ["무관심", "중립", "마음 비우기", "그레이존", "침잠"],
      rhythm: { inhale: 4, hold: 4, exhale: 4 }
    },
    30: {
      method: "내면의 눈을 밝히는 침묵 통찰 명상",
      description: "우주의 고고한 심연과 닮은 깊고 깊은 인디고 빛 고요의 지하실에서, 눈을 지그시 감고 미동도 하지 않은 채 생각 밑에서 샘솟는 영혼의 참된 직관을 길어 올립니다.",
      keywords: ["직관", "통찰", "침묵 통찰", "인디고 지하실", "지혜"],
      rhythm: { inhale: 4, hold: 4, exhale: 4 }
    },
    31: {
      method: "천천히 수렁으로 이끄는 부드러운 수면 인도 가이드",
      description: "포개어진 곡선 천장과 은은한 필라멘트 등 아래서 몸 전체를 한 장의 소솜 깃털처럼 구부리고 누워, 조용하게 뇌파를 수면 아래 긴장 해소로 안내합니다.",
      keywords: ["평화", "이완", "수면 인도", "곡선 포개기", "릴렉세이션"],
      rhythm: { inhale: 4, hold: 4, exhale: 6 }
    },
    32: {
      method: "혼재된 정서를 상자에 담는 감정 분류 가이드",
      description: "정교하게 겹쳐진 미로와 격자 형태의 입체 공간 구조 속에서, 나를 어지럽혔던 슬픔, 노여움, 집착을 각각 투명한 유리상자 속에 담아 정렬하며 분류해 나갑니다.",
      keywords: ["복합 심리", "분류 수렴", "격자 미로", "감정 큐브", "정서 정체"],
      rhythm: { inhale: 4, hold: 4, exhale: 4 }
    },
    33: {
      method: "소소한 내 일상의 가치에 헌정하는 감사 가이드",
      description: "현실적이고 친밀한 황토와 흙 질감, 나무의 아날로그적 온화함 가득한 방에서 내가 발 딛고 숨 쉬는 오늘 하루라는 축복에 조고조고히 공경하며 감사하는 마음을 전합니다.",
      keywords: ["조화", "현실", "현실 질감", "일상 정위", "온화"],
      rhythm: { inhale: 4, hold: 2, exhale: 4 }
    },
    34: {
      method: "세상의 풍파로부터 나를 안착시키는 자기 돌봄(Self-care) 명상",
      description: "창틈으로 찬란하게 부서져 물결처럼 낙하하는 깨끗하고 밝은 신성한 불빛 아래서, 그 누구보다 소중한 소우주인 나 한 사람을 전율하도록 소중히 보살피고 안아줍니다.",
      keywords: ["회복", "치유", "자기 돌봄", "빛의 낙하", "리부트"],
      rhythm: { inhale: 4, hold: 4, exhale: 4 }
    },
    35: {
      method: "억눌린 무의식의 족쇄를 풀어내는 감정 배출 가이드",
      description: "나지막한 폐쇄형 밀실에서 아주 드높은 지경의 하늘을 향해 드라마틱하게 전향되는 방 속에서 나의 오랜 침묵의 장벽과 억압들을 입으로 모조리 토해내 흘러 보냅니다.",
      keywords: ["억압", "분출", "감정 배출", "개방 전향", "카타르시스"],
      rhythm: { inhale: 4, hold: 0, exhale: 6 }
    },
    36: {
      method: "충만함과 완전성을 음미하는 성취 기념 명상",
      description: "찬연하고 기운찬 황금빛 노을이 둥글게 방안을 밀도 있게 물들이는 안정된 원경 속에서, 이미 완성되어 있는 온전한 사랑과 무결한 충만함을 기념하며 마음의 흙을 딛습니다.",
      keywords: ["만족", "완성", "성취 기념", "황금 동공", "체화 완성"],
      rhythm: { inhale: 4, hold: 4, exhale: 4 }
    }
  };

  const defaultVal: MeditationMethod = {
    method: "규칙적인 4-4-4 균형 호흡법",
    description: "대칭적이고 중립적인 색조로 마음을 진정시키는 공간 속에서, 들이마시고 멈추고 내쉬는 박자를 각각 4초씩 일정하게 유지하며 흐트러진 내면의 밸런스를 되찾습니다.",
    keywords: ["균형", "안정", "4-4-4 호흡", "대칭 공간", "중립 분위기"],
    rhythm: { inhale: 4, hold: 4, exhale: 4 }
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
  const totalDuration = breathCycleLength * 3; // Exactly 3 repetitions/cycles of the breathing rhythm
  const totalSteps = 3; // Each step represents 1 full cycle
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
      setTotalSeconds(cycleDuration * 3); // 3 cycles of custom breathing rhythm
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
    setTotalSeconds(cycleDuration * 3); // 3 cycles of custom breathing rhythm
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
                      <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center border border-indigo-100 shrink-0">
                            <Music className="w-5 h-5 text-indigo-600" />
                          </div>
                          <div>
                            <h5 className="text-xs font-extrabold text-slate-800">치유의 BGM 사운드스케이프</h5>
                          </div>
                        </div>

                        {soundPlaying && (
                          <button
                            onClick={stopHealingSound}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs px-4 py-2.5 font-bold flex items-center justify-center gap-2 transition cursor-pointer border border-indigo-500/25 shadow-md shadow-indigo-100/50"
                          >
                            <VolumeX className="w-4 h-4" /> BGM 끄기
                          </button>
                        )}
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
                                startHealingSound(preset.id);
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
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="space-y-12"
                    >
                      {/* Celebration Card */}
                      <div className="bg-white/95 backdrop-blur-md border border-indigo-150/60 rounded-[36px] p-8 md:p-12 shadow-2xl relative overflow-hidden text-center max-w-2xl mx-auto">
                        
                        {/* Soft floating ambient orbs based on the active profile color */}
                        <div 
                          className="absolute w-80 h-80 opacity-[0.12] filter blur-3xl pointer-events-none -right-16 -top-16 animate-pulse"
                          style={{
                            background: selectedProfile?.colors.type === "solid" 
                              ? selectedProfile?.colors.fill 
                              : `linear-gradient(135deg, ${selectedProfile?.colors.leftFill}, ${selectedProfile?.colors.rightFill})`
                          }}
                        />
                        <div 
                          className="absolute w-80 h-80 opacity-[0.12] filter blur-3xl pointer-events-none -left-16 -bottom-16 animate-pulse"
                          style={{
                            background: selectedProfile?.colors.type === "solid" 
                              ? selectedProfile?.colors.fill 
                              : `linear-gradient(135deg, ${selectedProfile?.colors.rightFill}, ${selectedProfile?.colors.leftFill})`
                          }}
                        />

                        <div className="relative z-10 flex flex-col items-center">
                          
                          {/* Beautiful concentric breathing circle completion animation */}
                          <div className="relative w-32 h-32 flex items-center justify-center mb-6">
                            {/* Outer radiating circle */}
                            <motion.div 
                              className="absolute inset-0 rounded-full bg-indigo-100/30 border border-indigo-200/50"
                              animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
                              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                            />
                            {/* Middle radiating circle */}
                            <motion.div 
                              className="absolute w-24 h-24 rounded-full bg-indigo-50/50 border border-indigo-100/70"
                              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.1, 0.5] }}
                              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1.5 }}
                            />
                            {/* Center solid gold icon badge */}
                            <motion.div 
                              className="w-16 h-16 rounded-2xl bg-indigo-600/10 border border-indigo-250 flex items-center justify-center text-indigo-600 shadow-sm z-10"
                              initial={{ scale: 0.8 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 200, damping: 15 }}
                            >
                              <Award className="w-8 h-8 text-indigo-605 animate-bounce" />
                            </motion.div>
                          </div>

                          <div className="space-y-2">
                            <span className="font-mono text-[10px] text-indigo-500 uppercase tracking-widest font-black bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100/40">
                              Mindfulness Journey Complete
                            </span>
                            <h4 className="font-serif text-3xl font-black text-slate-900 tracking-tight pt-2">
                              명상이 모두 끝났습니다
                            </h4>
                          </div>

                          {/* Customized Emotional Support/Cheering Bubble (감정별 응원멘트) */}
                          <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="mt-6 p-6 rounded-2xl bg-amber-50/65 border border-amber-200/40 text-left max-w-lg relative"
                          >
                            <span className="absolute -top-3 left-4 bg-amber-250 text-amber-950 font-bold font-sans text-[9px] px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                              {selectedProfile?.title} 응원 메세지
                            </span>
                            <p className="text-[#5C4524] text-xs font-serif font-medium leading-relaxed pt-1.5 italic">
                              "{getCheeringQuote(selectedProfile?.num || 1, selectedProfile?.title || "")}"
                            </p>
                          </motion.div>

                          <p className="text-slate-500 text-xs mt-5 leading-normal font-sans max-w-sm">
                            성공적으로 심신 오차가 조율되었습니다. 마음속 일렁임과 걱정이 치유의 파동 속에서 정돈되었습니다. 깨끗해진 마음의 기온을 조용히 품에 담아두세요.
                          </p>

                          {/* Quick Actions inside completed view */}
                          <div className="mt-8 flex flex-wrap gap-3 justify-center">
                            <button
                              onClick={resetTimer}
                              className="flex items-center gap-1.5 text-xs bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-md shadow-indigo-100 hover:shadow-lg hover:shadow-indigo-150 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                            >
                              명상 한번 더 하기 <RotateCcw className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={onReset}
                              className="flex items-center gap-1.5 text-xs bg-slate-950 hover:bg-slate-900 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                            >
                              다른 방 설계하기 <Palette className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Navigate to Step 5 (Deep Analysis) block */}
                      <div className="border-t border-slate-200/50 pt-10">
                        <div className="max-w-xl mx-auto text-center bg-white/75 backdrop-blur-md rounded-3xl p-8 border border-white/80 shadow-lg">
                          <span className="font-mono text-[9px] text-[#4E412C] font-black bg-amber-50/80 border border-amber-200 px-3 py-1 rounded-full uppercase tracking-wider block mx-auto w-fit">
                            Step 5 Integration Analysis
                          </span>
                          <h4 className="font-serif text-xl font-bold text-slate-900 mt-2.5">차원적 무의식 아카이빙 진찰 리포트</h4>
                          <p className="text-slate-500 text-xs mt-2 leading-relaxed max-w-sm mx-auto">
                            지금껏 누적된 치유 주파수 데이터와 내면의 평온 궤적을 통합하여 심층 진단한 결과를 확인하시겠습니까?
                          </p>
                          
                          <div className="mt-6">
                            <button
                              onClick={() => setStep(5)}
                              className="inline-flex items-center gap-1.5 text-xs bg-amber-600 hover:bg-amber-700 text-white font-bold py-3.5 px-6 rounded-xl transition shadow-md shadow-amber-100 hover:shadow-lg hover:shadow-amber-150 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                            >
                              <span>아카이브 심화 분석하기</span>
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
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
                              구조화된 3회 반복 적용
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
                              {currentStepIdx + 1} / 3회
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

                          {soundPlaying && (
                            <button
                              onClick={stopHealingSound}
                              className="text-xs px-3 py-2 rounded-xl border bg-indigo-50 text-indigo-700 border-indigo-200 flex items-center gap-1 transition-all cursor-pointer"
                            >
                              <VolumeX className="w-3.5 h-3.5" /> 소리 끄기
                            </button>
                          )}

                          <button
                            onClick={resetTimer}
                            className="border border-slate-200 hover:border-indigo-200 bg-white text-slate-500 rounded-xl p-2 transition-all cursor-pointer"
                            title="시간 초기화"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                          </button>
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
                                    startHealingSound(p.id);
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
