import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import { colorProfiles } from "./src/colorData.ts";

dotenv.config();

const PORT = 3000;

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// Cache or check default color profiles database helper
function getColorStateDescription(num: number): string {
  const profile = colorProfiles[num];
  return profile ? `[상태 번호 ${num}: ${profile.title}] - ${profile.desc}` : `[상태 번호 ${num}]`;
}

async function startChamberServer() {
  const app = express();

  // Middleware
  app.use(express.json());

  // 1. Healing guide generation API
  app.post("/api/healing-guide", async (req, res) => {
    try {
      const { selectedNum, history } = req.body;
      
      if (!selectedNum || isNaN(Number(selectedNum)) || Number(selectedNum) < 1 || Number(selectedNum) > 36) {
        return res.status(400).json({ error: "유효한 1~36번 색채 번호를 선택해주세요." });
      }

      const num = Number(selectedNum);
      const mainProfile = colorProfiles[num];
      const mainStateText = getColorStateDescription(num);

      let historyContextText = "";
      if (history && Array.isArray(history) && history.length > 0) {
        historyContextText = `사용자의 과거 컬러 선택 이력 시퀀스: ${history.join(" -> ")}. `;
        historyContextText += "각 기록의 의미는 다음과 같습니다:\n" + history.map(h => getColorStateDescription(Number(h))).join("\n");
      }

      const systemPrompt = `너는 심리 치유 건축가이자 '치유의방' 앱의 인공지능 가이드야.
사용자가 선택한 36가지 색채 심리 진단 정보를 기반으로, 한 편의 우아하고 시적인 가상 치유 공간(건축물)을 설계하고, 그 안에서 마음을 정화하고 에너지를 복원할 수 있는 아름다운 명상 행위(의식)를 설계해줘.

건축가의 정밀하고도 감각적인 시선으로 공간을 묘사해야 해. 단순히 말로만 위로하는 것을 넘어서 온도, 조도, 자재의 텍스처(거친 마감의 돌, 부드러운 목재 등), 소리의 하모니(물이 흐르는 소리학, 울림), 향기, 그리고 개방과 밀폐의 대비 등 오감이 세밀하게 시각화되도록 묘사해줘.

다음은 사용자의 입력 정보야:
- 현재 선택한 상태: ${mainStateText}
${historyContextText ? `- 이전 행적 및 감정 시퀀스:\n${historyContextText}` : ""}

[안내 사항]
1. 'stateTitle'은 사용자의 상태를 보듬어주는 어울리는 문학적이고 따뜻한 한국어 서브 타이틀로 정의해줘 (예: "슬픔을 받아들이는 잔잔한 기슭").
2. 'stateDescription'은 환자의 심리를 건축가의 깊은 공감 능력으로 풀어내어 마음을 가만히 내려놓게 만드는 심리 진단 해설을 적어줘.
3. 'spaceThemeTitle'은 설계할 가상 공간의 우아하고 감성적인 건축적 이름으로 정의해줘 (예: "태양이 쉬어가는 이끼 정원", "깊은 정적이 머무는 침묵의 선실").
4. 'spaceThemeDescription'은 사용자가 실제 그 공간에 들어선 것처럼 느끼도록 재료, 빛의 성격, 공기의 흐름, 가구, 소리를 극도록 아름다운 한국어로 세밀히 설명해줘.
5. 'meditationTitle'은 이 공간에서 할 명상 행위의 서정적인 제목을 붙여줘 (예: "흘러내린 모래알 헤아리기명상", "차가운 바위를 딛고 소리로 숨쉬기").
6. 'meditationSteps'는 4~5단계의 정제된 단계식 명상 호흡과 마음가짐 가이드를 순서대로 제공해줘. 가급적 "들이쉬고", "멈추고", "내쉬는" 호흡 템포와의 조화가 들어가면 좋아.
7. 'meditationAmbientSoundName'은 이 공간과 명상에 잘 어울리는 추천 소리를 단어나 짧은 어절로 지정해줘 (예: "울림 맑은 싱잉볼 소리", "안개 낀 호숫가의 잔물결", "모닥불 타닥이는 소리").
8. 'progressionAnalysis'는 사용자의 이전 선택 기록(시퀀스)이 존재할 때만 활성화하여 감정의 호전(치유 진행)/악화(깊은 탈진 상태) 혹은 내면적 성장에 관한 아주 통찰력 깊고 학술적이면서도 위로가 되는 분석 글을 적어주고, 이력이 없거나 1개 미만일 경우에는 "이전 선택 이력이 기록된 후, 더 고도화된 감정 흐름 추이 분석이 제공됩니다."라고 조용히 안내해줘.

안전하고 정형화된 JSON 데이터로 답변해야 함을 명심해.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: "이 색채 프로필을 기반으로 치유 공간과 명상 의식을 세밀하게 공학적/건축적/예술적으로 설계해줘.",
        config: {
          systemInstruction: systemPrompt,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              stateTitle: {
                type: Type.STRING,
                description: "사용자 현재 심리 상태에 어울리는 Poetic한 서브 타이틀"
              },
              stateDescription: {
                type: Type.STRING,
                description: "심리 치유 건축가로서 감정을 다정하고 세밀히 짚어주는 심리 분석"
              },
              spaceThemeTitle: {
                type: Type.STRING,
                description: "치유 건축 테마 공간의 고아한 이름"
              },
              spaceThemeDescription: {
                type: Type.STRING,
                description: "공간의 물리적 세부와 빛, 촉감, 공기, 음향을 극적으로 그린 묘사서"
              },
              meditationTitle: {
                type: Type.STRING,
                description: "명상 리추얼의 독창적이고 평화로운 타이틀"
              },
              meditationSteps: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "공간과 동화되는 4~5가지 세심한 단계별 명상 활동"
              },
              meditationAmbientSoundName: {
                type: Type.STRING,
                description: "가장 알맞은 사운드 환경 스펙트럼 추천"
              },
              progressionAnalysis: {
                type: Type.STRING,
                description: "선택 이력이 있을 경우 시퀀스를 통계적/심리적으로 정밀 분석한 변화 리포트"
              }
            },
            required: [
              "stateTitle",
              "stateDescription",
              "spaceThemeTitle",
              "spaceThemeDescription",
              "meditationTitle",
              "meditationSteps",
              "meditationAmbientSoundName",
              "progressionAnalysis"
            ]
          }
        }
      });

      const resultText = response.text;
      if (!resultText) {
        throw new Error("AI가 응답을 생성하지 못했습니다.");
      }

      const data = JSON.parse(resultText.trim());
      return res.json(data);
    } catch (error: any) {
      console.error("Error generating healing space:", error);
      return res.status(500).json({ error: "치유 공간 설계 중 오류가 발생했습니다. 잠시 후 다시 시도해보세요." });
    }
  });

  // 2. Comprehensive Sequence Progression Analysis API (for bulk stats or manual click)
  app.post("/api/analyze-progression", async (req, res) => {
    try {
      const { history } = req.body;
      if (!history || !Array.isArray(history) || history.length === 0) {
        return res.status(400).json({ error: "분석할 감정 이력이 기록되지 않았습니다." });
      }

      const historySeq = history.map(num => getColorStateDescription(Number(num))).join("\n");

      const promptText = `사용자가 누적하여 기록해온 36가지 심리 컬러 선택 이력 시퀀스입니다:
${history.join(" -> ")}

각 시퀀스의 상태 설명은 다음과 같습니다:
${historySeq}

너는 심리 치유 건축가의 철학적인 자세로, 이 흐름에서 일관되게 관찰되는 마인드 패턴, 점진적 회복 상태(호전 여부) 혹은 지속적으로 짓눌린 감정적 코어(피로의 심화/우울의 누적 등)를 건축공학 및 색채 심리 이론과 연결하여 깊이 깊게 진단해줘.
그리고 사용자가 이 마음의 여정을 평화로운 연대로 승화할 수 있도록 마지막에 따뜻한 조언의 방(공간 처방)을 선물해줘. 마크다운 형식으로 감성적이면서 정갈하게 답변을 생성해줘.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: promptText,
        config: {
          systemInstruction: "너는 영감을 부르는 심리 치유 건축가이자 심리 치료 전문가야. 대답은 깊은 울림을 남기는 경어체의 에세이 또는 편지 형태로, 정성스러운 한글 마크다운으로 완성해줘."
        }
      });

      return res.json({ analysis: response.text });
    } catch (error: any) {
      console.error("Error analyzing sequence:", error);
      return res.status(500).json({ error: "감정 경로 시퀀스 분석 중 서버 오류가 발생했습니다." });
    }
  });

  // Vite Setup on Express
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  // Listen on 0.0.0.0 and port 3000 (obligatory)
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

// Start full stack server
startChamberServer().catch((e) => {
  console.error("Critical: Failed to boot chamber server:", e);
});
