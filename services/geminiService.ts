
import { GoogleGenAI } from "@google/genai";

export const generateAIVideo = async (prompt: string, apiKey: string) => {
  const ai = new GoogleGenAI({ apiKey });
  
  try {
    // We use Veo for video generation as per requirements
    let operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: prompt,
      config: {
        numberOfVideos: 1,
        resolution: '720p',
        aspectRatio: '9:16' // Mobile-first look
      }
    });

    return operation;
  } catch (error) {
    console.error("Video generation start failed:", error);
    throw error;
  }
};

export const pollVideoOperation = async (operation: any, apiKey: string) => {
  const ai = new GoogleGenAI({ apiKey });
  
  try {
    const updatedOp = await ai.operations.getVideosOperation({ operation });
    return updatedOp;
  } catch (error) {
    console.error("Polling operation failed:", error);
    throw error;
  }
};

export const downloadVideoUrl = async (uri: string, apiKey: string) => {
  const response = await fetch(`${uri}&key=${apiKey}`);
  const blob = await response.blob();
  return URL.createObjectURL(blob);
};
