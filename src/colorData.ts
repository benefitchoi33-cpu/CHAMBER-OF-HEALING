export interface ColorProfile {
  num: number;
  title: string;
  desc: string;
  colors: {
    type: "solid" | "split";
    fill?: string;       // For solid
    leftFill?: string;   // For split
    rightFill?: string;  // For split
  };
}

export const colorProfiles: Record<number, ColorProfile> = {
  1: {
    num: 1,
    title: "쓸쓸함/어리광",
    desc: "표면상으로 명랑하고 사교적이며 정서적인 인정미가 넘쳐흐르는 것처럼 보이지만, 마음 한구석에는 누구도 편드는 사람이 없어 혼자 외롭게 지냅니다. 의지할 이성, 안심하고 어리광부리거나 의존하고 싶은 애정욕구를 가지고 있으며, 고독감과 쓸쓸함이 특히 강한 상태입니다.",
    colors: { type: "solid", fill: "#FFE600" } // Yellow
  },
  2: {
    num: 2,
    title: "명랑/자신감",
    desc: "명랑하고 자신감이 넘치며 기쁨으로 가득 차 있습니다. 애정이 풍부하고 협조적이며 가장 바람직한 정신 상태를 유지하고 있습니다. 스트레스가 최소화되고 내면의 에너지가 외면으로 아름답게 발산되는 상태입니다.",
    colors: { type: "split", leftFill: "#E50914", rightFill: "#FFFFFF" } // Red/White
  },
  3: {
    num: 3,
    title: "우울",
    desc: "피로가 누적되었거나 트러블로 인해 울적하고 몸과 마음의 밸런스가 흐트러진 상태입니다. 위화감과 울적함이 해소되지 않고 계속 마음을 짓누르고 있어 솔직한 위로와 원인 진단이 필요합니다.",
    colors: { type: "solid", fill: "#6A1B9A" } // Dark Purple
  },
  4: {
    num: 4,
    title: "소화기 불량",
    desc: "과식, 과음 혹은 과도한 스트레스로 인해 신경이 지나치게 위장으로 쏠려 있어 소아기 계통의 가슴앓이나 통증, 불안감을 마음에 품고 있는 상태입니다.",
    colors: { type: "split", leftFill: "#F5D6B4", rightFill: "#76D6FF" } // Peach / Sky Blue
  },
  5: {
    num: 5,
    title: "비뇨기 불량",
    desc: "신장, 방광 등 비뇨기 계통이나 숙취의 영향으로 신체적인 위화감이 느껴지고 피로가 쌓인 상태입니다. 잠재적으로 심신의 정화와 이완이 필요한 신호입니다.",
    colors: { type: "split", leftFill: "#111111", rightFill: "#0D47A1" } // Black / Blue
  },
  6: {
    num: 6,
    title: "불신/의혹",
    desc: "뜻하지 않게 불편한 광경이나 얘기를 접하고 자신이 기대하고 믿었던 대상에 신용을 잃게 되어 불안, 불신, 경계심과 깊은 공포감을 느끼고 있는 예민한 심리 상태를 나타냅니다.",
    colors: { type: "solid", fill: "#111111" } // Solid Black
  },
  7: {
    num: 7,
    title: "피(상처)",
    desc: "충격적인 장면이나 사고 잔상이 마음에 남았거나, 생리 전후 또는 외상으로 인해 신체와 피에 얽힌 불안감과 스트레스에 민감하게 사로잡혀 있는 긴장 상태입니다.",
    colors: { type: "split", leftFill: "#6A1B9A", rightFill: "#E50914" } // Purple / Red
  },
  8: {
    num: 8,
    title: "체념/거슬림",
    desc: "하고 싶었던 것이나 갖고 싶던 열망을 억압하거나 체념하게 되면서, 억울하고 삐뚤어진 보복 심리 또는 사소한 심통을 부리고 싶을 만큼 욕구 불만이 내면에 가득 찬 반항적인 상태입니다.",
    colors: { type: "split", leftFill: "#111111", rightFill: "#0D47A1" } // Black / Blue
  },
  9: {
    num: 9,
    title: "도움 필요",
    desc: "감당하기 힘든 큰 걱정거리로 인해 정신적으로 벼랑에 몰린 듯 고독하고 나약해져 있습니다. 스스로의 한계를 느끼고 깊은 울림으로 누군가의 도움과 상담을 절박하게 갈구하고 있습니다.",
    colors: { type: "split", leftFill: "#FFFFFF", rightFill: "#00A854" } // White / Green
  },
  10: {
    num: 10,
    title: "강렬한 물욕",
    desc: "원하는 물건이나 필요 자금의 금액이 커 강렬한 집착 and 물질적 욕망에 빠져 있습니다. 모든 주의력이 금전적 결핍과 물질 소유에만 몰두하여 감정이 무겁게 짓눌린 감금 상태입니다.",
    colors: { type: "split", leftFill: "#111111", rightFill: "#5D4037" } // Black / Brown
  },
  11: {
    num: 11,
    title: "자기주장욕",
    desc: "외면상 기력과 힘이 충실해 능동적으로 행동하지만, 은연중 내면의 불만과 깊은 갈증을 추진력 삼아 남을 이기고 상대를 제압하더라도 자신을 극도로 과시하고 싶은 강한 주장욕에 차 있습니다.",
    colors: { type: "solid", fill: "#E53935" } // Solid Red
  },
  12: {
    num: 12,
    title: "근심",
    desc: "눈앞에 당면한 과제, 상황, 대인관계 등으로 인해 지독히 신경이 쓰여 마음이 편하지 않고 계속 겉도는 상태입니다. 깊은 생각에 사로잡혀 에너지가 소모되고 흐려져 있습니다.",
    colors: { type: "split", leftFill: "#0D47A1", rightFill: "#FFE600" } // Blue / Yellow
  },
  13: {
    num: 13,
    title: "남성 그리움",
    desc: "할아버지, 아버지, 형제, 혹은 연인과 같이 자신과 정서적으로 친밀했던 남성적 애착 대상이 멀어져 가는 상실에 대한 근원적인 슬픔과 공포를 느끼고 있으며 애정을 간절히 원하고 있는 기분입니다.",
    colors: { type: "split", leftFill: "#111111", rightFill: "#FFE600" } // Black / Yellow
  },
  14: {
    num: 14,
    title: "물욕/애정욕",
    desc: "돈이나 새 물건 등 소유를 향한 가벼운 갈망에 머물러 있습니다. 비정상적으로 극단적이진 않으나 정서적 결핍을 물건으로 채우려는 만족 지향의 보상 심리가 잔류하는 상태입니다.",
    colors: { type: "solid", fill: "#5D4037" } // Solid Brown
  },
  15: {
    num: 15,
    title: "몸 상태 불량",
    desc: "신체 컨디션도 부쩍 나쁘고 마음까지 회색빛으로 지독히 침체되어 있습니다. 다른 밝은 자극에는 시선이 가지 않고 스스로의 고달픔과 통증에만 오롯이 집중하며 무기력에 빠진 적신호입니다.",
    colors: { type: "split", leftFill: "#7B1FA2", rightFill: "#FFE600" } // Purple / Yellow
  },
  16: {
    num: 16,
    title: "육체적 피로",
    desc: "몸이 심하게 탈진되었지만, 자신이 맡은 무거운 책임과 역할 때문에 쉬지 못하고 극심한 갈등을 느낍니다. 성실함과 의무감의 굴레 속에서 온전한 근육 이완과 쉼을 갈망하는 피로 상태입니다.",
    colors: { type: "solid", fill: "#0D47A1" } // Solid Navy
  },
  17: {
    num: 17,
    title: "증오/적의",
    desc: "잊고 싶은 불쾌하고 적대적인 기억에 속박되어, 원인이 된 사람이나 대상을 깊이 원망하고 적의를 뿜어내는 상태입니다. 지독히 날이 서 있고 지속성이 있는 공격적이고 외향적인 상처의 증상입니다.",
    colors: { type: "split", leftFill: "#111111", rightFill: "#00A854" } // Black / Green
  },
  18: {
    num: 18,
    title: "만족/포만",
    desc: "소유하고 싶던 대상의 획득이나 만족스러운 상황의 진행으로 오랫동안 느껴보지 못한 삶의 충만함과 만복감을 느낍니다. 심리와 관계, 물질에 불만이 없이 느긋하고 평화가 온전히 가득 찬 청명한 상태입니다.",
    colors: { type: "split", leftFill: "#5D4037", rightFill: "#FFFFFF" } // Brown / White
  },
  19: {
    num: 19,
    title: "겸허한 체험",
    desc: "타인에게는 조용히 따르고 모나지 않게 수긍하지만, 마음 밑바닥에는 스스로 포기해야만 했던 현실에 깊은 서글픔을 조용히 품었습니다. 거스르지 않는 차분한 단념과 자연 수용이 웅크리고 있습니다.",
    colors: { type: "split", leftFill: "#FFFFFF", rightFill: "#0D47A1" } // White / Navy
  },
  20: {
    num: 20,
    title: "이성 그리움",
    desc: "꿈결 같은 로맨틱한 연애에 목말라 하거나, 이성에 대한 감정적 접근과 뜨거운 접촉을 본능적으로 갈구합니다. 마음의 허기를 성적인 긴장감이나 정열적인 스스로의 사랑으로 녹여내고 싶어 합니다.",
    colors: { type: "split", leftFill: "#00A854", rightFill: "#E50914" } // Green / Red
  },
  21: {
    num: 21,
    title: "봉사",
    desc: "소중하고 동경하는 상대를 위해 나를 깎아 희생적으로 보듬고 전념하고자 합니다. 그러나 에너지가 완전히 밖에만 쏠린 상태로, 이제는 자신에게 에너지를 되돌려야 하는 시점입니다.",
    colors: { type: "solid", fill: "#FFFFFF" } // Solid White
  },
  22: {
    num: 22,
    title: "학대 충동",
    desc: "해소되지 못하는 깊은 억압 아래 극도의 심리적 열등과 불만을 겪고 있습니다. 이 미어터지는 억압 스트레스를 승화시켜 스포츠나 신체 활동으로 온전히 감정을 전환시킬 필요가 있습니다.",
    colors: { type: "split", leftFill: "#5D4037", rightFill: "#E50914" } // Brown / Red
  },
  23: {
    num: 23,
    title: "희망",
    desc: "행복한 안정감이 충만하여 주위 대상을 신뢰하고 따스하게 돕고 싶은 여유가 풍부합니다. 오랜 시간 한 땀씩 성실히 노력했던 바를 마침내 일구어 기쁨으로 찬란히 도약하고 밝은 미래를 내다보는 맑은 빛입니다.",
    colors: { type: "split", leftFill: "#FFFFFF", rightFill: "#FFE600" } // White / Yellow
  },
  24: {
    num: 24,
    title: "초조함",
    desc: "내 마음대로 상황이 제어되지 않고 혼자 힘으로는 도저히 헤어날 수 없는 겉잡을 수 없는 수렁에 빠진 듯, 끝없는 조바심과 초조함에 스스로를 타내고 있습니다. 비상식적인 압박을 늦추어 줄 호흡이 절실합니다.",
    colors: { type: "split", leftFill: "#0D47A1", rightFill: "#E50914" } // Blue / Red
  },
  25: {
    num: 25,
    title: "독선/들뜸",
    desc: "간절히 원한 일을 예리하게 신속히 성취하면서 감정이 하늘 높이 치솟아 무척 고무되고 기뻐서 대담해진 심리 상태입니다. 그러나 지나친 자신감으로 독선과 타인 무시의 우려가 있어 겸손 훈련이 보완되어야 합니다.",
    colors: { type: "split", leftFill: "#FFE600", rightFill: "#E50914" } // Yellow / Red
  },
  26: {
    num: 26,
    title: "명랑 속 불안",
    desc: "외적으로는 웃으며 명랑하고 즐거운 일을 나누고 있으나, 해결하지 못한 마음의 숙제와 걱정거리가 그늘진 모서리처럼 남아 불안과 기쁨 사이의 미묘한 균형과 중심 잡기가 필요합니다.",
    colors: { type: "solid", fill: "#FF80AB" } // Solid Pink
  },
  27: {
    num: 27,
    title: "절대자 사랑",
    desc: "절대적으로 소망하고 찬양하는 영적 지주나 경건한 마음으로부터 위안을 보장받고 기대려는 참된 순복의 마음입니다. 깊은 의지와 기도를 통해 완전한 평온을 염원하고 있습니다.",
    colors: { type: "split", leftFill: "#111111", rightFill: "#FFFFFF" } // Black / White
  },
  28: {
    num: 28,
    title: "허기",
    desc: "몸에 수분이나 칼로리 부족 등 실제 허기가 졌거나, 무언가를 격하게 삼키고 소화하고 싶은 원시적 갈구 리듬입니다. 마인드풀 이팅을 통해 감각 전반을 가만히 각성하고 다스려 주어야 합니다.",
    colors: { type: "split", leftFill: "#00A854", rightFill: "#FFE600" } // Green / Yellow
  },
  29: {
    num: 29,
    title: "망설임",
    desc: "이러지도 저러지도 못하는 고통스러운 딜레마와 기로에 서서, 마음과 행동이 심하게 정체되어 긴장이 치솟았습니다. 이지적인 분석과 명료한 결단 명상의 힘으로 이 정체를 풀어내야 합니다.",
    colors: { type: "solid", fill: "#9E9E9E" } // Solid Grey
  },
  30: {
    num: 30,
    title: "소화기 질환",
    desc: "만성적인 신경 예민 상태로 실제 위장 질환이나 복부 통증 경험이 반복되고 있어, 주변의 모든 환경 자극을 무겁게 소화불량으로 받아들여 고요하고 따뜻한 위배 마사지 및 온열 차 복용이 필요합니다.",
    colors: { type: "split", leftFill: "#6A1B9A", rightFill: "#5D4037" } // Purple / Brown
  },
  31: {
    num: 31,
    title: "수면 문제",
    desc: "심각한 활성 각성과 머리에 가시 돋친 듯한 잡생각으로 불면에 지친 수면 부족의 가속 상태입니다. 부드러운 수면 유도 사이클을 동조시켜서 수면 호르몬의 정상분비를 되찾아야 합니다.",
    colors: { type: "solid", fill: "#008744" } // Solid Green
  },
  32: {
    num: 32,
    title: "정서불안",
    desc: "뿌리에서부터 솟구쳐 나오는 근원적인 정체 모를 두려움과 불안감을 시리게 앓고 있습니다. 깊은 수심의 침수 속에서 단단한 지구력 숨을 불어넣음으로써 내면의 토대를 무겁고 안전히 보존합니다.",
    colors: { type: "split", leftFill: "#111111", rightFill: "#6A1B9A" } // Black / Purple
  },
  33: {
    num: 33,
    title: "신변 정리",
    desc: "서랍이나 침대, 일상 소품 또는 영달을 완강하게 비우고 쓸어내면서 정리하려는 강박적 정화욕입니다. 주변 환경 정돈을 통해 해시되지 않은 고단한 내면을 깔끔히 마감 짓고 싶어 합니다.",
    colors: { type: "split", leftFill: "#AF8F30", rightFill: "#0D47A1" } // Ochre / Blue
  },
  34: {
    num: 34,
    title: "회복",
    desc: "길었던 신체의 병색과 열기, 마음의 상처와 아픔이 흐뭇하게 씻겨 나간 청정 복원 무드입니다. 완전하게 자생 충전되는 세포 수준의 청량한 해방과 감사 의식을 누려야 합니다.",
    colors: { type: "split", leftFill: "#FFFFFF", rightFill: "#6A1B9A" } // White / Purple
  },
  35: {
    num: 35,
    title: "여성 그리움",
    desc: "어머니, 할머니, 혹은 나를 품어주던 깊은 수심의 온화한 여성에 맺힌 안타까움, 상실감, 웅숭깊은 애수가 소용돌이칩니다. 가슴 중심의 호흡을 땋아 애정 어린 그리움을 보듬어냅니다.",
    colors: { type: "split", leftFill: "#E50914", rightFill: "#111111" } // Red / Black
  },
  36: {
    num: 36,
    title: "애정 결핍",
    desc: "사랑받지 못해 시려 죽어가는 차가운 뉴런 신호를 느끼며, 강렬한 온기와 기대 누울 영혼의 처우를 그리며 슬픔에 침강 중입니다. 내면 깊은 곳 버림받은 아이를 주체적으로 보살펴 주어야 합니다.",
    colors: { type: "solid", fill: "#9E7E1E" } // Gold-olive
  }
};
