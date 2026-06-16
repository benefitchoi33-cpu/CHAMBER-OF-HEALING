export interface ChamberDetail {
  num: number;
  name: string;
  state: string;
  light: string;
  texture: string;
  ceiling: string;
  density: string;
  images: {
    light: string;
    texture: string;
    ceiling: string;
    density: string;
  };
}

export const chamberDetails: Record<number, ChamberDetail> = {
  1: {
    num: 1,
    state: "쓸쓸함/어리광",
    name: "온기를 머금은 누에고치 둥지의 방",
    light: "마주하는 이의 다정한 뺨처럼 포근하고 온화한 필라멘트 불빛이 어스름한 방 언저리에서 서서히 밀려와 차오릅니다.",
    texture: "거친 외부 세상으로부터 연약해진 나를 가만히 감싸안아 주는 듯, 도톰하고 어루만지는 듯한 올가닉 부클레 직물과 울 펠트 마감의 숨결이 살결을 스칩니다.",
    ceiling: "한 치의 불안마저 완벽히 품어 안으려는 듯, 머리맡을 포개어주는 나지막하고 조용한 요람형 오목 층고가 더없는 안락함을 선사해 줘요.",
    density: "도톰한 패브릭 쿠션들과 양모 러그가 격자로 겹쳐져 사방의 찬 기류를 원천적으로 지워내고 온전한 보호의 원을 그려내고 있습니다.",
    images: {
      light: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=600&auto=format&fit=crop",
      texture: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=600&auto=format&fit=crop",
      ceiling: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop",
      density: "https://images.unsplash.com/photo-1615874959474-d609969a20ed?q=80&w=600&auto=format&fit=crop"
    }
  },
  2: {
    num: 2,
    state: "명랑/자신감",
    name: "태양의 입체 기하학적 전망 테라스",
    light: "수평선 너머 정오의 강력하고 눈부신 황금빛 태양이 찬란한 유리 통창을 부수듯 쏟아져 들어와 은총처럼 가슴 바로 위로 낙하합니다.",
    texture: "한낮의 뜨거운 입자를 받아 금모래처럼 산란하는 우아하게 다듬어진 부드러운 대리석과 티 없이 투명한 에칭 유리 표면의 고결한 질감입니다.",
    ceiling: "내면에 웅크리고 있던 무한한 용기와 활력을 우주로 뻗쳐 올리듯, 시원하게 하늘로 높인 고압적인 개방형 복층 층고가 시야를 가차 없이 넓혀 줘요.",
    density: "단 하나의 불필요한 장식도 남기지 않은 채, 탁 트인 바닥을 가로지르는 서늘하고 상쾌한 바람의 활력이 거침없이 원동력이 되어 순회합니다.",
    images: {
      light: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=600&auto=format&fit=crop",
      texture: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=600&auto=format&fit=crop",
      ceiling: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600&auto=format&fit=crop",
      density: "https://images.unsplash.com/photo-1504297050568-910d24c426d3?q=80&w=600&auto=format&fit=crop"
    }
  },
  3: {
    num: 3,
    state: "우울",
    name: "짙은 정적이 안착한 무채색 침묵의 심해실",
    light: "사선으로 조심스럽게 미끄러지는 미세한 틈새로만 오직 슬프도록 푸르른 한 자락의 인디고 색 어스름이 깊이 내려앉아 흐릅니다.",
    texture: "복잡한 소음과 상처 난 기억들을 말갛게 흡수해 잠재워 주는 다공성 에코 콘크리트의 거칠고 투박한 감촉이 마주한 손가락 끝을 적시네요.",
    ceiling: "정수리 끝에 부드럽게 닿을 듯 내려앉은 나지막한 무채색 천장이 둥글게 허리를 굽히게 하며, 둥둥 뜨던 미련을 무겁게 내려놓게 돕습니다.",
    density: "세상의 잔여 숨소리를 일절 배제한 채, 오직 나 자신의 고독한 실루엣과 조용한 우울의 호흡만이 대칭을 이루며 고요 속을 가라앉혀 줘요.",
    images: {
      light: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600&auto=format&fit=crop",
      texture: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=600&auto=format&fit=crop",
      ceiling: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=600&auto=format&fit=crop",
      density: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=600&auto=format&fit=crop"
    }
  },
  4: {
    num: 4,
    state: "소화기 불량",
    name: "온열 바닥을 입힌 도기질 황토 온유정",
    light: "발목 아래와 아랫배 부근을 36.5도의 부드러운 눈부심 없는 호박빛 간접 등이 강물처럼 졸졸 따라 흐르며 온기를 퍼뜨립니다.",
    texture: "태초의 미네랄을 머금은 원적외선이 모락모락 피어날 듯 거칠면서도 포슬포슬한 핸드크래프트 천연 황토 벽과 구운 진흙 바닥의 원초적인 질감이에요.",
    ceiling: "상체를 은근히 눕히며 긴장한 횡격막을 스르륵 내려놓을 수 있는 대지 지향의 낮고 따스한 다실의 편평한 층고입니다.",
    density: "구들장에 가득 모인 축열식 황토 온기가 방안 절반을 보이지 않는 아지랑이로 매워, 부조화를 정돈하는 끈적한 치유의 온화함이 퍼집니다.",
    images: {
      light: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=600&auto=format&fit=crop",
      texture: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=600&auto=format&fit=crop",
      ceiling: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=600&auto=format&fit=crop",
      density: "https://images.unsplash.com/photo-1594489428504-5c0c480a15fd?q=80&w=600&auto=format&fit=crop"
    }
  },
  5: {
    num: 5,
    state: "비뇨기 불량",
    name: "자연 낙수가 공명하는 침묵의 리플렉팅 가든",
    light: "깊은 잔물결 아래 서린 고요한 청색 조명이 수면을 관통해 천장에다 아른거리는 신비로운 물 그림자를 수채화처럼 덧대어 그립니다.",
    texture: "시원하고 매끄럽게 물기가 흘러내리는 진회색 슬레이트 석벽과, 맨발 끝 자궁처럼 어루만지고 지압해 올 조돌조돌한 조약돌의 시원한 텍스처예요.",
    ceiling: "동굴에 머물듯 위에서 떨어지는 청량한 물의 공명이 고고하고 낭랑하게 공간을 메우도록 가볍게 비워 올린 공기 소통식 중층고입니다.",
    density: "공간의 절반을 온전하고 깨끗한 리플렉팅 수면으로 양보하여 몸속 흐려진 림프 흐름을 깨끗하게 투사해 말려 정화해 줍니다.",
    images: {
      light: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop",
      texture: "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?q=80&w=600&auto=format&fit=crop",
      ceiling: "https://images.unsplash.com/photo-1471039497385-b6d6ba609f9c?q=80&w=600&auto=format&fit=crop",
      density: "https://images.unsplash.com/photo-1508333706533-1ab43ecb1606?q=80&w=600&auto=format&fit=crop"
    }
  },
  6: {
    num: 6,
    state: "불신/의혹",
    name: "두꺼운 벽으로 구획된 수호자 아머 벙커",
    light: "외부의 성가진 빛을 철저히 닫아둔 채, 오직 머리맡의 믿음직한 등잔불 모양 촛대 조명 한 가닥이 고립된 영혼의 나침반처럼 타오르고 있어요.",
    texture: "어떤 성가진 무력에도 끄떡없는 차갑지만 다저진 중후한 철근 매트 콘크리트와 나뭇결 흔적이 투박한 거푸집의 거친 단단함입니다.",
    ceiling: "바람을 가리고 고개를 숙인 가혹한 겨울에도 안도 속에서 휴면을 취할 수 있도록 높이를 극도로 제한한 비밀 벙커의 안전 층고예요.",
    density: "500mm가 넘는 무거운 엄호 콘크리트벽이 사방에서 든든하게 요새처럼 둘러싸며 그 어떠한 기밀도 허용치 않는 완전한 차단의 아늑함을 선사합니다.",
    images: {
      light: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=600&auto=format&fit=crop",
      texture: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=600&auto=format&fit=crop",
      ceiling: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600&auto=format&fit=crop",
      density: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=600&auto=format&fit=crop"
    }
  },
  7: {
    num: 7,
    state: "피(상처)",
    name: "점진적 순환이 빚어지는 곡선 루프 홀",
    light: "상처받고 아린 가슴 벽을 조율하듯 호흡의 맥박에 정교히 싱크되어 따스한 장미 적자색 라인 조명이 서서히 물결치며 부드럽게 점멸해요.",
    texture: "날선 상처의 기둥들을 수마하듯 부드럽게 이음새를 씻어낸 보드라운 화이트 고화도 미장과 한 자락 아크릴 몰딩의 곡선적 사랑스러움입니다.",
    ceiling: "웅크렸던 아픈 기억이 나선형 궤적을 그리며 솟아오르듯, 경쾌하지만 무거움을 위로 흘려보내는 둥글게 들여올린 상승형 볼트 천장 가볍습니다.",
    density: "정적으로 봉합된 보울 형태의 벽면이 아늑한 포옹을 만들어 슬픈 혈류의 고단함을 끈끈하게 도포하고 위무하는 곡선적 쉼터네요.",
    images: {
      light: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop",
      texture: "https://images.unsplash.com/photo-1615874959474-d609969a20ed?q=80&w=600&auto=format&fit=crop",
      ceiling: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop",
      density: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=600&auto=format&fit=crop"
    }
  },
  8: {
    num: 8,
    state: "체념/거슬림",
    name: "소리를 소멸시키는 거친 할석 사운드 박스",
    light: "수직 벽면에 길게 파인 균열 사이로 투과하는 어둠 섞인 수평 빛이, 복잡하고 소란스런 그림자들을 수만 개로 쪼개 기운을 완벽히 분할해 줍니다.",
    texture: "분노의 마찰음이 조용하게 가라앉도록 칼로 조각해 낸 거친 할석 암 판과 어둡고 단단한 검은 현무암 타일의 극도 질감입니다.",
    ceiling: "어지럽던 찌꺼기를 바닥으로 무겁게 흩치며 시선을 안착시키는데 충분하도록 높고 단호하게 뻗어 세워진 소음 차음형 천장 구조입니다.",
    density: "내지르고 무너진 자아의 소리까지 감쪽같이 삼켜 가라앉혀 주도록 묵직한 패브릭 단열 벽체와 가구들이 철저하게 나를 위요하고 있네요.",
    images: {
      light: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=600&auto=format&fit=crop",
      texture: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=600&auto=format&fit=crop",
      ceiling: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=600&auto=format&fit=crop",
      density: "https://images.unsplash.com/photo-1549692560-5e9a44552962?q=80&w=600&auto=format&fit=crop"
    }
  },
  9: {
    num: 9,
    state: "도움 필요",
    name: "하늘로 구를 마련한 원형 자비의 회랑",
    light: "속세의 지저분한 시선은 완벽히 단절된 채, 머리 위 아득한 오쿨루스(둥근 천창)를 타고 찬연히 낙하하는 여명의 흰 햇빛을 만나 축복받습니다.",
    texture: "성모의 무릎처럼 비를 맞으며 세월을 고이 다스려온 단단한 라임스톤의 표면과, 어루만지면 연한 슬픔이 지워지는 가뿐한 백자작 마감이 공존해요.",
    ceiling: "감히 손을 뻗어 결별의 눈물이나 간절한 소망을 기도 속에 고고히 담을 수 있게 기품을 준 장엄한 아치형 원궁 고층고 구조입니다.",
    density: "둥근 정자를 포근히 끌어안으며 사방으로 나열된 순결한 기둥들이 나의 한없이 유약한 배후를 보호하듯 아늑하게 결계를 둘러 줘요.",
    images: {
      light: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=600&auto=format&fit=crop",
      texture: "https://images.unsplash.com/photo-1508333706533-1ab43ecb1606?q=80&w=600&auto=format&fit=crop",
      ceiling: "https://images.unsplash.com/photo-1471039497385-b6d6ba609f9c?q=80&w=600&auto=format&fit=crop",
      density: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600&auto=format&fit=crop"
    }
  },
  10: {
    num: 10,
    state: "강렬한 물욕",
    name: "순백의 대칭 반사 미니멀 스완 메탈",
    light: "일체의 성가신 장식이나 조명 기구마저 지워낸 뒤, 완전하고 균질하게 빛나는 순수한 천장 면조명이 그림자 한 점 없이 맑게 방을 씻어내 줍니다.",
    texture: "무언가 더 쥐고 가지려는 탐욕의 얼룩조차 묻지 않도록 정교하게 가닥을 날카롭게 친 알루미늄 메탈 가공과 미송 분무 미장이 어우러져 있어요.",
    ceiling: "과잉된 욕구에 사로잡혀 질식할 것 같던 가슴에 깊은 '공백의 존엄'을 채우듯, 비대칭으로 길게 비워 올린 모던한 미장 슬라브 천장가 시원합니다.",
    density: "단 하나의 장식이나 불필요한 사치를 철절히 도려내어 오직 청명한 공기와 청결한 자아만이 대칭 속에 남아 호흡하는 완전한 무적의 공복 무드예요.",
    images: {
      light: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=600&auto=format&fit=crop",
      texture: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=600&auto=format&fit=crop",
      ceiling: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop",
      density: "https://images.unsplash.com/photo-1504297050568-910d24c426d3?q=80&w=600&auto=format&fit=crop"
    }
  },
  11: {
    num: 11,
    state: "자기주장욕",
    name: "수직 질주하는 붉은 오벨리스크 아트리움",
    light: "붉은 수직 슬릿 속에서 용암처럼 뜨겁게 터져 나오는 주도적인 명암의 수직 아우라 조명이, 단숨에 온 바닥을 짓누르듯 에너지를 폭사시킵니다.",
    texture: "강력한 의지가 단숨에 사방으로 질주해 뻗어 내리듯 기둥 전체를 감싸 흐르는 강인한 붉은 질석 마감과 거울처럼 코트된 은갈색 대리석이에요.",
    ceiling: "하잘것없는 의혹이나 고개를 떨구는 시선을 단숨에 제압해 수직 정열시키는, 전례 없는 원근의 거인과 같은 6.5m의 극적인 타워 고층고 구조입니다.",
    density: "중심부에 세워진 도열 붉은 기단이 기백을 한 정점으로 한 치 오차도 흐트러짐 없이 몰이하며, 모든 정세를 뒤바꿀 힘을 가둬 두고 있어요.",
    images: {
      light: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=600&auto=format&fit=crop",
      texture: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop",
      ceiling: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600&auto=format&fit=crop",
      density: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop"
    }
  },
  12: {
    num: 12,
    state: "근심",
    name: "시선이 조용히 분산되는 레이어드 대나무 미로",
    light: "지독하던 집착이나 고리를 사그라들게 끊어내듯, 겹겹이 중첩 구획된 대나무 틈 사이로 산들거리는 한 줄기 여린 녹색 그라데이션 광선들이 스며요.",
    texture: "사각샤각 대나무 이파리들의 가뿐한 정서적 유영을 받아 내는 촘촘한 대나무 줄기 가닥 벽지와 온화하고 고소한 참대나무 섬유 바닥재 질감입니다.",
    ceiling: "일체의 성가신 정체에 머리가 굳지 않고 물 흐르듯 가볍게 발을 떼 배회하도록 수평 사선으로 어긋나 흐르는 다중 천장의 슬라브 구조예요.",
    density: "포근히 배회하며 무심하게 시선을 흔들 수 있도록 길잡이 레이어로 결을 흐트러트린 촉촉하게 고립된 미로형의 평안 정원입니다.",
    images: {
      light: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=600&auto=format&fit=crop",
      texture: "https://images.unsplash.com/photo-1549692560-5e9a44552962?q=80&w=600&auto=format&fit=crop",
      ceiling: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=600&auto=format&fit=crop",
      density: "https://images.unsplash.com/photo-1508333706533-1ab43ecb1606?q=80&w=600&auto=format&fit=crop"
    }
  },
  13: {
    num: 13,
    state: "남성 그리움",
    name: "목재의 중후함이 숨쉬는 견고한 참나무 서재",
    light: "가죽 책상 모서리를 조용하게 데우는 황동 스탠드의 원추 불빛과, 기단 아래 가직하게 갈색의 중후함을 비추는 묵직무거운 간접 등이 공존합니다.",
    texture: "지나간 무정의 온 세월의 풍파를 한 몸에 감내하여 든든한 등받이가 지탱될 매진 티크 가죽질 무늬와 수제 단단한 가식 단정의 목재네요.",
    ceiling: "다른 성가신 망각적인 잡념에서 벗어나 차분한 원목 단정 무늬 아래 나직이 시선을 수납할 복가풍의 차분한 사재 천장 구조입니다.",
    density: "세월의 깊이와 사색이 사정없이 꽉 채운 엄정하고 지지선 든든한 서가 가구들이 마음자리를 묵직하고 신성하게 요새처럼 막아 줍니다.",
    images: {
      light: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=600&auto=format&fit=crop",
      texture: "https://images.unsplash.com/photo-1549692560-5e9a44552962?q=80&w=600&auto=format&fit=crop",
      ceiling: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=600&auto=format&fit=crop",
      density: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=600&auto=format&fit=crop"
    }
  },
  14: {
    num: 14,
    state: "물욕/애정욕",
    name: "침묵으로 가득 채운 브라운 소로우 챔버",
    light: "불을 원정적으로 멀리 끈 뒤, 바닥 아래 숨어 있는 틈으로 아주 미약하고 정갈한 밤색 낙엽 무늬 그림자 등진 불빛만이 흔들거림 없이 정적인 온기를 유지하네요.",
    texture: "말뿐인 자아의 상실과 가을 정취를 흡수 완충하는 투박하고 소박한 무광 진흙 황토판넬 벽과 수그려 빚어 말린 토기의 온기 질감입니다.",
    ceiling: "가질 수 없는 갈증과 가느다란 마찰에서 잠시 등을 가라앉힐 수 있도록 가치 정열된 무던하고 편평한 회갈빛 조용함의 천장 높이예요.",
    density: "오직 중심부에 놓인 여린 방석 하나에 내 온전한 중심을 안착시킨 뒤 모든 귀결을 먼 곳으로 비워 보낸 비움의 극치의 정원입니다.",
    images: {
      light: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop",
      texture: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=600&auto=format&fit=crop",
      ceiling: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=600&auto=format&fit=crop",
      density: "https://images.unsplash.com/photo-1504297050568-910d24c426d3?q=80&w=600&auto=format&fit=crop"
    }
  },
  15: {
    num: 15,
    state: "몸 상태 불량",
    name: "부드러운 곡벽으로 덮인 피안의 치유 동굴",
    light: "직접 안구와 신경을 찌르는 잔바람 불빛을 소거한 채, 달무리가 잔벽을 뒹굴며 타고 지혜롭게 내려앉는 연보랏빛 신비로운 유랑 반사광이에요.",
    texture: "살갗에 누운 세포와 아픈 신경 줄의 마찰을 사드러들게 막아 줄 극세 탄소 부드러운 우레탄 코트 무늬와 폭신한 세라믹 플라스터 마감입니다.",
    ceiling: "서글픔과 고통이 누워 어루만져지는 동안 억압 없는 회복이 숨 쉴 수 있게 달의 내부처럼 부드럽게 솟구친 신성한 구면 볼트 천장이에요.",
    density: "일절 다른 동선과 번잡함을 씻어버려 내 몸 하나가 기대어 다정히 호흡을 정리하고 골라 쉴 수 있도록 정렬된 안락하고 극진한 가동의 요람입니다.",
    images: {
      light: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop",
      texture: "https://images.unsplash.com/photo-1615874959474-d609969a20ed?q=80&w=600&auto=format&fit=crop",
      ceiling: "https://images.unsplash.com/photo-1615874959474-d609969a20ed?q=80&w=600&auto=format&fit=crop",
      density: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=600&auto=format&fit=crop"
    }
  },
  16: {
    num: 16,
    state: "육체적 피로",
    name: "인체 지압 하중을 분산하는 해저 캡슐",
    light: "지독한 각성에서 뇌파를 맑게 진정시키는 깊고 무거운 암흑 바탕 위에서, 오직 가뿐한 발목 끝에 안정을 줄 이슬 같은 인디고 푸른 유도등만이 빛나요.",
    texture: "척추의 온갖 마찰과 고된 뼈대의 하중을 무중력처럼 분산시켜 줄 고가 고탄성 메모리 메모리 천과 단정히 땋은 고품질의 울 매트입니다.",
    ceiling: "외부 소리는 완벽히 제어되어 정적이 일렁이는, 깊은 해저 요람 속에 안락히 들어선 듯한 인체 지향의 포근히 누운 아늑한 선형 층고 구조예요.",
    density: "깊은 고요와 무조건적인 휴수 상태를 도모할 마사지 리클라이너와 가벼운 공기가 빼곡해 내 고단 가득한 신체를 편안하게 밀봉 정돈해 줍니다.",
    images: {
      light: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=600&auto=format&fit=crop",
      texture: "https://images.unsplash.com/photo-1594489428504-5c0c480a15fd?q=80&w=600&auto=format&fit=crop",
      ceiling: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=600&auto=format&fit=crop",
      density: "https://images.unsplash.com/photo-1594489428504-5c0c480a15fd?q=80&w=600&auto=format&fit=crop"
    }
  },
  17: {
    num: 17,
    state: "증오/적의",
    name: "각을 깎아 증오를 소산하는 도끼칼 석랑",
    light: "응어리진 가슴의 슬릿을 타고 흐르는 곧고 날렵한 조명 줄기가 사방 예각 그림자들을 아래로 길게 투사시켜 맺힌 기운을 흩뜨려 놓아요.",
    texture: "마음속 소란스런 충격을 깎아내 듯 쪼개진 암판 판넬의 겹 침 벽과 수평으로 곧게 마찰하여 고요를 준 이 에코 무광 시멘트 바닥재 질감입니다.",
    ceiling: "이성적 호흡을 위로 끌어올림과 동시에 부귀를 비워낼 수 있도록 칼날처럼 예리하고 기품 있게 뚫고 올린 곧은 사면 피라미드 천장입니다.",
    density: "내 안에서 발화한 가혹한 적의가 밖으로 새어 나가지 않고 오롯이 깊은 돌 벽 아래 완충되어 고요히 참해지는 무거운 방호와 침묵의 밀도입니다.",
    images: {
      light: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=600&auto=format&fit=crop",
      texture: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=600&auto=format&fit=crop",
      ceiling: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600&auto=format&fit=crop",
      density: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=600&auto=format&fit=crop"
    }
  },
  18: {
    num: 18,
    state: "만족/포만",
    name: "햇살 가직한 온화한 안뜰의 백색 평온실",
    light: "풍부히 열어젖힌 창호 격자 살을 기어이 비집고 흐르는 포근하고 깨끗한 한아름 자연 채광 웅덩이가 고소한 마룻바닥에 가만 놓입니다.",
    texture: "내 모든 만조와 성취를 완만하게 위위해 주려는 듯 나랑거리는 가벼운 화이트 세탁 리넨 휘장과 참 고귀한 무이오크우드 원목 감각입니다.",
    ceiling: "마음속 한 톨의 억눌림이나 불안의 궤적마저 가신 완벽한 평화의 상태를 기리도록 넉넉하고 나직이 내린 안락한 중정의 편평 천장 구조예요.",
    density: "정가운데 은은하게 순환하는 맑은 수공간 화분들이 실내를 온통 정서 속 평안으로 꽉 채운 흠잡을 때 없는 완전함의 백색 쉼밭입니다.",
    images: {
      light: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=600&auto=format&fit=crop",
      texture: "https://images.unsplash.com/photo-1549692560-5e9a44552962?q=80&w=600&auto=format&fit=crop",
      ceiling: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=600&auto=format&fit=crop",
      density: "https://images.unsplash.com/photo-1508333706533-1ab43ecb1606?q=80&w=600&auto=format&fit=crop"
    }
  },
  19: {
    num: 19,
    state: "겸허한 체험",
    name: "땅 아래로 겸허히 낮춘 침하식 지중 정원",
    light: "대지 아래 경건하게 침하 구획된 길섶 수풀 틈으로, 오직 여과되어 스쳐 오는 여리고 순한 흙빛 그라데이션 광선만이 기어 나와 흘러가요.",
    texture: "세월의 기나긴 상흔과 물줄기의 퇴적을 가슴 안아 마지않은 깊은 점토 수제 플라스터 미장벽과 이끄이 낀 우직한 거석 바위들의 텍스처입니다.",
    ceiling: "지나치게 고개를 세우거나 욕심내던 날들을 뒤로 한 채 겸손의 참 안식을 마음껏 마실 수 있게 나직이 어깨를 토닥이는 지중 층층 높이예요.",
    density: "어머니인 땅속 깊은 가슴으로 자아를 수그리고 비워, 나 자신을 대자연의 우주의 돌들과 하나로 융합시키는 엄숙하고 침착한 침화 공간입니다.",
    images: {
      light: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop",
      texture: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=600&auto=format&fit=crop",
      ceiling: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600&auto=format&fit=crop",
      density: "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?q=80&w=600&auto=format&fit=crop"
    }
  },
  20: {
    num: 20,
    state: "이성 그리움",
    name: "온화한 붉은 노을을 투사하는 원형 로즈 라운지",
    light: "장미빛 황혼의 노을빛 그라데이션 조명이 마치 사랑하는 이의 다정하고 수줍은 맥박 소리처럼 잔벽 위에서 천천히 명멸해요.",
    texture: "가슴 한 편으로 가만히 가직하게 당기고 싶은 보풀 고운 마젠타 벨벳 소파 쿠션 패딩과 가쁜 핑크빛 파우더 밀착 벽면입니다.",
    ceiling: "뜨겁고 정열적인 내면의 상실과 이성 사이 갈증 흐름이 도넛모양 소용돌이를 따라 원기둥에 갇혀 승화될 안도 2.7m 천정이에요.",
    density: "타인과의 애틋하고 아름다운 결합을 동경하는 소수 내면의 고리를 포근하게 감싸 안는 둥근 유선형 소파 밀집의 애정 라운지입니다.",
    images: {
      light: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=600&auto=format&fit=crop",
      texture: "https://images.unsplash.com/photo-1615874959474-d609969a20ed?q=80&w=600&auto=format&fit=crop",
      ceiling: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=600&auto=format&fit=crop",
      density: "https://images.unsplash.com/photo-1615874959474-d609969a20ed?q=80&w=600&auto=format&fit=crop"
    }
  },
  21: {
    num: 21,
    state: "봉사",
    name: "정제된 빛을 뿜어내는 백색 성소의 룸",
    light: "세속적인 지저분함과 불완전함의 시선을 전면 여과해 내는 불투명 화이트 채널글라스 속으로 맑직한 거울 빛만이 고요한 방을 채워줍니다.",
    texture: "바깥으로 헛되이 쏟던 이타적인 나의 순수한 열정을 가만히 붙들어 줄 수고로움의 이태리 백스투코 가루의 고결한 미장 질감이에요.",
    ceiling: "내 모든 봉사와 깊은 자비의 마음이 구원처럼 도약할 수 있도록 경건하게 고안 올린 순백의 아름다운 원호 천창 층고예요.",
    density: "일절 어떤 화려한 색도 기하학도 빼버려 오직 순백의 안개와 자비로운 자아 성결에만 집중하게끔 맑게 도포된 중력 이완 공간무드입니다.",
    images: {
      light: "https://images.unsplash.com/photo-1508333706533-1ab43ecb1606?q=80&w=600&auto=format&fit=crop",
      texture: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=600&auto=format&fit=crop",
      ceiling: "https://images.unsplash.com/photo-1471039497385-b6d6ba609f9c?q=80&w=600&auto=format&fit=crop",
      density: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=600&auto=format&fit=crop"
    }
  },
  22: {
    num: 22,
    state: "학대 충동",
    name: "분노 가시를 터뜨리는 샌드 코트 스튜디오",
    light: "억눌리고 파괴적인 가시의 그림자를 단숨에 방출할 수 있게 역동적인 천장 메탈 할로겐 램프가 하얀 칼 조도처럼 타격합니다.",
    texture: "몸 던져 해소되더라도 생명 상처 없게 겉면을 단단히 잡은 내마모성 탄성 러버 매트와 거친 이 시멘트 스프레이 마감 질감이에요.",
    ceiling: "분출된 에너지의 파동들이 천장에 부닥쳐 내 머리를 찌르지 못하게 대담하게 열어 트인 거친 대공장 트러스 시그니처 층층 층고입니다.",
    density: "내재된 가시를 거칠게 내질러 수소화하게끔 쓸데없는 가구나 연약한 물품을 전부 배출시키고, 오직 모모 모래와 안전만을 확보한 소거 밀도입니다.",
    images: {
      light: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=600&auto=format&fit=crop",
      texture: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=600&auto=format&fit=crop",
      ceiling: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600&auto=format&fit=crop",
      density: "https://images.unsplash.com/photo-1504297050568-910d24c426d3?q=80&w=600&auto=format&fit=crop"
    }
  },
  23: {
    num: 23,
    state: "희망",
    name: "아침 태양을 포옹하는 골든 힐링 아뜰리에",
    light: "새로운 소생을 힘차게 선언하듯, 대지 동쪽 창을 와락 비집고 들어오는 명랑한 아침 여명의 금빛 다발들이 방 한복판을 완전히 지배하고 춤을 춰요.",
    texture: "새로운 생의 보상을 축하해 오듯 편안한 향이 잔잔히 호흡을 깨우는 무늬 고운 편백나무 패널 바닥과 고결한 금색 비단 무늬 소품들입니다.",
    ceiling: "꿈꾸고 뻗던 상상이 한계 장벽 없이 우주에 닿을 듯 영감을 채우는 사선으로 시원하게 들불 놓은 파란 하늘창 천장 층고가 높직해요.",
    density: "자아의 막혔던 환기율을 완벽히 소회시켜 줄 드넓은 전경과 고요한 바람의 결들이 수평으로 질주하여 희망의 맥을 가득 채웁니다.",
    images: {
      light: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=600&auto=format&fit=crop",
      texture: "https://images.unsplash.com/photo-1549692560-5e9a44552962?q=80&w=600&auto=format&fit=crop",
      ceiling: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600&auto=format&fit=crop",
      density: "https://images.unsplash.com/photo-1504297050568-910d24c426d3?q=80&w=600&auto=format&fit=crop"
    }
  },
  24: {
    num: 24,
    state: "초조함",
    name: "수평 지향선으로 평온을 잡는 리니어 우드 존",
    light: "분하듯 가파르게 요동쳐대는 심장 맥박을 강제로 어루만져 진정시키듯 차분히 일 자로 길게 이송 흐르는 수평 지향식 저조도 라인 불빛입니다.",
    texture: "초조한 손놀림을 보듬고 나이테의 긴 세월을 마음에 이식해 줄 바르고 차분하게 다듬어진 편안 미송 목개 루버와 고두 가습 흙벽조 질감이에요.",
    ceiling: "수직적으로 성나 기립하던 중력 긴장을 완화하여 조심스럽게 가로로 기대게 돕는 편안하게 다운된 갈색 평온 사각 천장이에요.",
    density: "흔들리는 시선을 지지대로 든든하게 받쳐 결박해 안정을 줄 격격이 놓인 목재 기둥들과 낮게 수로 깔린 넓직 소파의 무게감 균형 밀도입니다.",
    images: {
      light: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=600&auto=format&fit=crop",
      texture: "https://images.unsplash.com/photo-1549692560-5e9a44552962?q=80&w=600&auto=format&fit=crop",
      ceiling: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=600&auto=format&fit=crop",
      density: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=600&auto=format&fit=crop"
    }
  },
  25: {
    num: 25,
    state: "독선/들뜸",
    name: "나를 거울처럼 돌려세우는 전망대 전망 공간",
    light: "사방에 둘러 흐르는 은막 하늘 지평선 빛줄기들이 오만했던 소외 자아의 한계를 낱낱이 파헤치듯 음영 한 점 없이 내부를 깨끗이 씻어내네요.",
    texture: "교만과 들뜬 걸음을 위로 돌려세우줄 가쁜 하늘 지대 미송 무광 기단과 최고 투명도의 선명 맑은 통크리스탈 강화창의 서늘한 정갈함입니다.",
    ceiling: "지상에서 집착해 쌓은 보잘것없는 욕정들을 대지선 아래로 뉘이게끔, 하늘 높직이 솟구쳐 펼친 전망 타워의 극단 기하 돔형 고천장 구조예요.",
    density: "오직 허공과 나만이 독대로 서 있게 하는 아주 고립적인 방식을 통해, 흐트러진 자만기류를 공기 속 수평으로 깨끗하게 융해시켜 버립니다.",
    images: {
      light: "https://images.unsplash.com/photo-1527269537047-40fbe503411c?q=80&w=600&auto=format&fit=crop",
      texture: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=600&auto=format&fit=crop",
      ceiling: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600&auto=format&fit=crop",
      density: "https://images.unsplash.com/photo-1504297050568-910d24c426d3?q=80&w=600&auto=format&fit=crop"
    }
  },
  26: {
    num: 26,
    state: "명랑 속 불안",
    name: "낮과 밤이 조화롭게 교차하는 황혼의 살롱",
    light: "겉면의 밝은 웃음기 이면의 상실을 위정하듯 차가움과 따스함이 파도치듯 호흡하며 시네마틱 서정 속으로 자아를 끌고 순환하는 동적 등불이에요.",
    texture: "양가적인 두 우수를 고이 뉘어 완충 조율해 줄 세련된 골드 메탈 라인 패칭과 온 벽에 고두 덧댄 양모 카펫의 더할 나위 없는 부드러움입니다.",
    ceiling: "불안이 기어코 엄위해 올 때마다 가만히 닫혀 내려안아 자아를 든든하게 받쳐 주는 경사형 황혼 미장의 편평 사목형 천장이에요.",
    density: "고즈넉한 고독 벽난로 장작불의 타딱 소리와 모던한 대칭 탁자가 적사히 정세를 소통 조율하게 구획해 놓은 미학적인 균형의 대칭실입니다.",
    images: {
      light: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop",
      texture: "https://images.unsplash.com/photo-1615874959474-d609969a20ed?q=80&w=600&auto=format&fit=crop",
      ceiling: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=600&auto=format&fit=crop",
      density: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=600&auto=format&fit=crop"
    }
  },
  27: {
    num: 27,
    state: "절대자 사랑",
    name: "하늘 빛기둥이 쏟아지는 경건한 광야의 대성당",
    light: "아득한 성탑의 긴 고딕 핀 슬릿을 뚫어 내어 신의 긴 손가락처럼 성스럽고 고결하게 수직 낙하하는 6000K 순수의 아침빛 광원 다발이에요.",
    texture: "내 모든 오만을 내려두고 경배하기에 충분하리만큼 우직하게 거칠게 가공해 낸 채석 암벽 기둥들과 오랜 소명 속에 구운 기와 흙점토 바닥재입니다.",
    ceiling: "내가 기진하여 무릎 꿇는 순간 내면의 상처를 기어코 성결하게 끌어 올려 줄 8.0m 극도의 웅장한 천상형 고딕 메인 층고입니다.",
    density: "오직 공허하게 공간을 채운 기품 가득 파이프 오르간 소리와 공기의 진동만을 남겨둔 장엄하고 고결한 자비 밀도의 대성소예요.",
    images: {
      light: "https://images.unsplash.com/photo-1471039497385-b6d6ba609f9c?q=80&w=600&auto=format&fit=crop",
      texture: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=600&auto=format&fit=crop",
      ceiling: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600&auto=format&fit=crop",
      density: "https://images.unsplash.com/photo-1508333706533-1ab43ecb1606?q=80&w=600&auto=format&fit=crop"
    }
  },
  28: {
    num: 28,
    state: "허기",
    name: "유기적 활력이 충만해지는 대지의 키친 데크",
    light: "나뭇결 탁상 위의 오감을 자글자글 깨워줄 따뜻하게 소생 끓는 3000K 투명 벌브 조명들이, 식탁 중심 골고루 둥근 노란 온기를 뿌립니다.",
    texture: "대지가 준 소박한 보상 그대로의 투박 부드러운 핸드크래프트 사기 흙그릇 타일들과 기쁨을 소생할 은은 오크우드 키친의 손잡이 촉감이에요.",
    ceiling: "서글픈 섭섭함이나 배고픈 신경들의 배회를 붙들어 자리에 앉힐 내추럴 오두막 무드의 조심 차분한 주방 안착형 층층 천장 높이예요.",
    density: "유기적인 푸른 식물 조경 무늬들이 수풀처럼 빙 둘러쳐져 일체 고뇌 고립을 가사 융해 수납하고 포근함을 도모하는 맛있는 공간 밀도네요.",
    images: {
      light: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=600&auto=format&fit=crop",
      texture: "https://images.unsplash.com/photo-1549692560-5e9a44552962?q=80&w=600&auto=format&fit=crop",
      ceiling: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=600&auto=format&fit=crop",
      density: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=600&auto=format&fit=crop"
    }
  },
  29: {
    num: 29,
    state: "망설임",
    name: "결단과 지성이 선명해지는 모노톤 무향 복도",
    light: "뒤섞여 탁해진 망망한 갈등을 칼 한 자루 베어내 주듯 칼같이 수평 정열되어 곧고 선명하게 뻗은 무광 면조명 라인들이 내 길을 비춥니다.",
    texture: "흘린 미련조차 징징대 달라붙지 못하게 아예 은회색 도포 연마 에폭시 바닥과 고차 다크 아노다이징 프레임 도장 벽체 슬라브의 차분함입니다.",
    ceiling: "망설임의 고질 기류를 한 칼에 쭉 쓸어내며 도약해 갈 수 있도록 가만히 곧고 길게 뻗친 성소 터널 무드의 기품 대칭 천정 높이예요.",
    density: "일절 어떤 성가신 방해나 의존도 허용치 않게 지선 기둥들만 엄정히 통제 배치해 주어 우직한 이성적 결단을 소회하는 사색의 축입니다.",
    images: {
      light: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=600&auto=format&fit=crop",
      texture: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=600&auto=format&fit=crop",
      ceiling: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600&auto=format&fit=crop",
      density: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=600&auto=format&fit=crop"
    }
  },
  30: {
    num: 30,
    state: "소화기 질환",
    name: "인디고 요람을 두른 깊은 통찰의 침묵각",
    light: "과민해진 육체의 염증을 차분히 쓸어내릴 수 있게 수면의 빛깔을 여과해 가직히 비추는 인디고 블루의 치유 장벽 조명 라인이라네요.",
    texture: "복부의 사소 긴장을 완벽하게 완화해 줄 고온 현무암 황토 구이 세라믹 타일 마루판과 따뜻 단정하게 길쌈 편 누비 이불 벽입니다.",
    ceiling: "과민하여 성난 신경계를 감싸 지켜 머리가 요란찮게 수평 정돈되도록 다듬은 아주 다정한 단실 자궁 동굴형의 원형 마감 층층 층고입니다.",
    density: "구들장 한복판 따뜻한 차가 한 잔 흐르는 다과상을 중심으로 자아 내면의 신진 영양소들을 따뜻 보존해 정돈해 주는 수의 밀도예요.",
    images: {
      light: "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?q=80&w=600&auto=format&fit=crop",
      texture: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=600&auto=format&fit=crop",
      ceiling: "https://images.unsplash.com/photo-1615874959474-d609969a20ed?q=80&w=600&auto=format&fit=crop",
      density: "https://images.unsplash.com/photo-1594489428504-5c0c480a15fd?q=80&w=600&auto=format&fit=crop"
    }
  },
  31: {
    num: 31,
    state: "수면 문제",
    name: "모든 뇌파를 잠재우는 완전 무광 수면 캡슐",
    light: "멜라토닌 소생 세포가 기계처럼 가동되어 완벽 깊은 잠에 들도록 사방 잔여 유령광들을 100% 흡수 수호해 버리는 절대의 0 Lux 칠흑 정적입니다.",
    texture: "뒤척이는 여윈 등에 안도감을 줄 기품 벨벳 이불 가닥들과 공간의 소리 한 톨까지 가두어 비축할 특수 차음 흠벽 댐핑 패널 질감이에요.",
    ceiling: "한 줄기 침습하는 바람조차 허용치 않게 내 신체 치수를 따스히 감싸안으며 안도케 하는 둥글 둥지 모양 수면 캡슐 높이예요.",
    density: "안정용 산사 가습 등과 나 자신만의 유일하고 고루한 숨소리가 원형을 그어, 뇌파를 완벽한 깊은 세타파로 소생 정돈해 줍니다.",
    images: {
      light: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=600&auto=format&fit=crop",
      texture: "https://images.unsplash.com/photo-1594489428504-5c0c480a15fd?q=80&w=600&auto=format&fit=crop",
      ceiling: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=600&auto=format&fit=crop",
      density: "https://images.unsplash.com/photo-1594489428504-5c0c480a15fd?q=80&w=600&auto=format&fit=crop"
    }
  },
  32: {
    num: 32,
    state: "정서불안",
    name: "단단한 중력을 결속하는 기단부 지하 암반 깊은 방",
    light: "대지 아래서 안도하며 날 감싸 줄 태고의 중력 등불처럼, 단 한 조각 어스름한 촛불 무늬 가닥이 기단 언저리에 은하수처럼 박혀 반짝여요.",
    texture: "그 어떤 마음의 해일이나 균열도 어림없도록, 수백만 년을 버텨온 화강암의 굳건한 단단함과 세파를 견뎌낸 이 퇴적 질석의 텍스처입니다.",
    ceiling: "공허하게 부유하던 하잘것없는 잡념의 한숨들을 뿌리까지 무겁고 평온하게 대지로 가라앉혀 줄 침하식 중안 수평 천장입니다.",
    density: "천연의 지중 깊은 바위 속 자궁에 누운 듯 억겁의 안심 장벽이 나를 안전히 사방에서 위요해 주는 철벽 방지의 기품 보호 숲입니다.",
    images: {
      light: "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?q=80&w=600&auto=format&fit=crop",
      texture: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=600&auto=format&fit=crop",
      ceiling: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600&auto=format&fit=crop",
      density: "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?q=80&w=600&auto=format&fit=crop"
    }
  },
  33: {
    num: 33,
    state: "신변 정리",
    name: "한치의 빈틈도 용납 않는 기하학 백색 정밀고",
    light: "미세한 정서의 어둠 먼지조차 한 점 없이 완벽 분별 수납 정돈하게 할 사막 태양 무드의 칼같이 구획된 백그리드 격자 선조명 판넬이에요.",
    texture: "복잡하고 너저분한 것들과 일체 결착하지 않도록 깔끔 도장한 백광 아크릴 면판 바닥과 밀착된 슬라이드 화이트 정밀 보관의 서늘함입니다.",
    ceiling: "정렬되지 않아 괴로웠던 생각들을 차곡 서랍 안으로 가직 격리 정리해 줄 아주 곧고 반듯한 백소 정각 사각 층고 구조예요.",
    density: "과잉 집착되던 물건이나 미련의 쓰레기들을 빌트인 슬라이딩 월 속으로 완전히 엄폐 정돈하여, 온전 백지의 무결점을 드높였습니다.",
    images: {
      light: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=600&auto=format&fit=crop",
      texture: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=600&auto=format&fit=crop",
      ceiling: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop",
      density: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=600&auto=format&fit=crop"
    }
  },
  34: {
    num: 34,
    state: "회복",
    name: "생명 에너지를 폭발시키는 수변 치유 아트리움",
    light: "천장의 웅장하고 투명한 백색 수변 격자 통창을 아득히 뚫고 내려와, 흐려진 온몸 세포의 소생 활력을 일깨우는 6500K 생명 은총 광선 다발이에요.",
    texture: "질병과 싸운 고단함을 위하는 사뿐 실크 무이 벽지와 딛는 발바닥마다 경쾌하고 부드럽게 지탱할 지상 귀결의 은백 트래버틴 가공석입니다.",
    ceiling: "내가 마주하는 천장 무한의 우주 고까지 안도 흐름을 막힘없이 드높여 줄 정교 찬란한 거대 보이드 복층 오픈 층고 구조입니다.",
    density: "내부의 신선 식물 조경 무리와 맑디맑은 인공 중정 수조가 수평으로 연동되며, 온 심신의 소생을 축하하는 우수 넘치는 조화 정원입니다.",
    images: {
      light: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600&auto=format&fit=crop",
      texture: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600&auto=format&fit=crop",
      ceiling: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600&auto=format&fit=crop",
      density: "https://images.unsplash.com/photo-1508333706533-1ab43ecb1606?q=80&w=600&auto=format&fit=crop"
    }
  },
  35: {
    num: 35,
    state: "여성 그리움",
    name: "자궁의 미학을 담은 둥근 회색 플라스터 만다라",
    light: "수평 모서리를 둥글 아늑히 깎아낸 회랑 틈을 따라, 어머니의 더없는 온기를 담은 3000K 노을그늘빛 간접등 장식이 보석같이 스며 번져요.",
    texture: "어린 가슴을 가만히 안아줄 흙점토 황토 에코 라이트 베이지 플라스터 마감과 부드럽게 딛는 무릎을 고정할 고급 메리노 울 카펫 질감입니다.",
    ceiling: "상실의 외롭나 어린 고독 흐름이 등 돌려 눕더라도 그 어떤 억압 없이 포근히 내려안을 인체 수치 만다라 단층고 구조예요.",
    density: "세상의 시비로 엇나갔던 상한 발목 끝 긴장을 온전히 타원형 태극 곡선 속으로 융해 보존해 모으는 극치의 안온한 요새 밀도입니다.",
    images: {
      light: "https://images.unsplash.com/photo-1615874959474-d609969a20ed?q=80&w=600&auto=format&fit=crop",
      texture: "https://images.unsplash.com/photo-1615874959474-d609969a20ed?q=80&w=600&auto=format&fit=crop",
      ceiling: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=600&auto=format&fit=crop",
      density: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=600&auto=format&fit=crop"
    }
  },
  36: {
    num: 36,
    state: "애정 결핍",
    name: "자아 중심성의 자존감을 드높이는 부유 금광실",
    light: "버림받거나 소외되었던 가슴 자리를 주체적인 자존의 금빛으로 각성 장식해 주듯, 전방에 가식 매립한 신성 금사 조명 펄스 밴드들이 은은히 박동합니다.",
    texture: "애정의 갈증 신호를 단숨에 지우고 위로를 도포해 줄 풍요 윤기 베이지 가죽 질감 패딩과 영고 습도 오크 무늬 바닥이에요.",
    ceiling: "세파의 조롱이나 멸실 흐름에 기척 흘리지 않으며 영격을 한 단 더 수납해 올릴 품격 있는 클래식 다목적 층고 구조입니다.",
    density: "오직 중심부에 놓인 기품 충진 단 하나의 수면대 위에 독대로 누워, 부귀의 풍요 속에서 상흔을 자축 보존해 주는 든든함입니다.",
    images: {
      light: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=600&auto=format&fit=crop",
      texture: "https://images.unsplash.com/photo-1615874959474-d609969a20ed?q=80&w=600&auto=format&fit=crop",
      ceiling: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600&auto=format&fit=crop",
      density: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=600&auto=format&fit=crop"
    }
  }
};
