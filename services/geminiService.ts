
import { GoogleGenAI, Type } from "@google/genai";
import { Employee, Task, AIReport, Strategy } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const geminiService = {
  generateWeeklyReport: async (employees: Employee[], tasks: Task[]): Promise<Partial<AIReport>> => {
    const prompt = `Act as a senior business analyst. Based on this team data:
    Employees: ${JSON.stringify(employees)}
    Recent Tasks: ${JSON.stringify(tasks)}
    Generate a concise weekly performance report in JSON format with summary, 3 key insights, and 3 recommendations.`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            keyInsights: { type: Type.ARRAY, items: { type: Type.STRING } },
            recommendations: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["summary", "keyInsights", "recommendations"]
        }
      }
    });

    return JSON.parse(response.text);
  },

  suggestTaskAssignment: async (task: Partial<Task>, employees: Employee[]): Promise<{ employeeId: string; reasoning: string }> => {
    const prompt = `Assign this task: "${task.title} - ${task.description}" requiring skills ${task.skillsRequired?.join(', ')} to the best employee from this list: ${JSON.stringify(employees)}. Consider skills match and current workload. Respond with the employee ID and a short reason.`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            employeeId: { type: Type.STRING },
            reasoning: { type: Type.STRING }
          },
          required: ["employeeId", "reasoning"]
        }
      }
    });

    return JSON.parse(response.text);
  },

  generateStrategy: async (businessGoal: string): Promise<Partial<Strategy>> => {
    const prompt = `Generate a high-level business strategy for this goal: "${businessGoal}". Focus on competitive advantage, resource allocation, and market positioning. Return a JSON with title and content in Markdown.`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            content: { type: Type.STRING }
          },
          required: ["title", "content"]
        }
      }
    });

    return JSON.parse(response.text);
  }
};
