import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

// Gemini AI එක අපේ API Key එකෙන් පණගන්වනවා
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

// 8. Type Alias 
// (AI එකට යවන දත්ත වල හැඩය TypeScript වලට අඳුන්වා දීම)
type UserStats = {
  age: number;
  weight: number;
  height: number;
  goal: string;
  experience: string;
};

// 6. Async Arrow Function
// මේක තමයි AI එකට Promt එක යවලා උත්තරේ අරන් එන Function එක
export const generateWorkoutPlan = async (stats: UserStats) => {
  
  // Try-Catch (Network හෝ AI සර්වර් ප්‍රශ්නයක් ආවොත් අල්ලගන්න)
  try {
    // අපි පාවිච්චි කරන්නේ අලුත්ම Gemini 2.5 Flash මොඩල් එක (ගොඩක් වේගවත්)
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // 11. Object Destructuring 
    // (stats object එකෙන් අපිට ඕන කෑලි ටික වෙන වෙනම ගලවලා ගන්නවා ලේසියට)
    const { age, weight, height, goal, experience } = stats;

    // AI එකට දෙන නියෝගය (Prompt Engineering)
    const prompt = `
      You are an expert fitness trainer. Create a 4-day workout plan for a user with the following stats:
      - Age: ${age}
      - Weight: ${weight} kg
      - Height: ${height} cm
      - Fitness Goal: ${goal}
      - Experience Level: ${experience}

      Provide the response in a structured JSON format. It must strictly follow this JSON structure without any markdown formatting or extra text:
      {
        "planName": "Name of the plan",
        "workouts": [
          {
            "day": "Day 1",
            "muscleGroup": "Chest and Triceps",
            "exercises": [
              { "name": "Bench Press", "sets": 3, "reps": "8-12", "restTime": "60s" }
            ]
          }
        ]
      }
    `;

    // AI එකෙන් උත්තරේ එනකම් ඉන්නවා
    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    // ආපු උත්තරේ Text එකක් විදිහට එළියට දෙනවා
    return response.text();

  } catch (error) {
    // සැබෑ error එක මොකක්ද කියලා terminal එකේ පැහැදිලිව පේන්න අපි මේක දැම්මා
    console.error("Gemini AI API Error Details:", error);
    throw new Error("AI එකෙන් Workout Plan එක හදන්න බැරි වුණා.");
  }
};