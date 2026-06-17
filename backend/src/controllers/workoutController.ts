// backend/src/controllers/workoutController.ts

import { Request, Response } from 'express';
import prisma from '../prisma';
import { generateWorkoutPlan } from '../services/aiService';

// 6. Async Arrow Function (Controller එකක් නිසා අනිවාර්යයෙන්ම async වෙන්න ඕනේ)
export const createPersonalizedPlan = async (req: Request, res: Response): Promise<void> => {
  
  // Try-Catch (AI එක හරි Database එක හරි fail වුණොත් අල්ලගන්න)
  try {
    // 11. Object Destructuring (Frontend එකෙන් එවන Request Body එකෙන් දත්ත ටික ගලවලා ගන්නවා)
    const { userId, age, weight, height, goal, experience } = req.body;

    // 1. මුලින්ම AI Service එකට කතා කරලා Plan එකක් හදවගන්නවා
    const aiResponseText = await generateWorkoutPlan({ age, weight, height, goal, experience });

    // 👨‍🏫 Pro Tip: සමහර වෙලාවට Gemini AI එක උත්තරේ එවන්නේ ```json කියන කෑලිත් එක්ක. ඒක අයින් කරලා පිරිසිදු JSON එකක් ගන්න මේක ලියනවා.
    const cleanJsonString = aiResponseText.replace(/```json/g, '').replace(/```/g, '').trim();
    
    // String එකක් විදිහට ආපු උත්තරේ, JavaScript Object එකක් බවට හරවනවා (Parse කරනවා)
    const planData = JSON.parse(cleanJsonString);

    // 2. ඒ ආපු Plan එක Database එකේ Save කරනවා (Prisma Nested Writes)
    const savedPlan = await prisma.workoutPlan.create({
      data: {
        userId: userId, // කාගේ Plan එකද කියලා අඳුරගන්න
        name: planData.planName,
        workouts: {
          create: planData.workouts.map((workout: any) => ({
            dayOfWeek: workout.day,
            muscleGroup: workout.muscleGroup,
            exercises: {
              create: workout.exercises.map((exercise: any) => ({
                name: exercise.name,
                sets: exercise.sets,
                reps: exercise.reps,
                restTime: exercise.restTime,
              }))
            }
          }))
        }
      },
      // 13. Spread Operator වගේමයි, හැබැයි මේක Prisma වල විශේෂාංගයක්. Save කරපු ගමන් මුළු Plan එකම (Exercises එක්කම) අපිට ආපහු Return කරන්න කියලා කියන්නේ.
      include: {
        workouts: {
          include: { exercises: true }
        }
      }
    });

    // 3. වැඩේ සාර්ථකයි කියලා Frontend එකට උත්තරේ යවනවා
    res.status(201).json({ 
      message: "AI Plan generated and saved successfully! 🎉", 
      plan: savedPlan 
    });

  } catch (error) {
    console.error("Error creating plan:", error);
    res.status(500).json({ error: "Workout Plan එක හදන්න බැරි වුණා. සර්වර් එකේ අවුලක්!" });
  }
};

// 6. Async Arrow Function (Database එකෙන් දත්ත එනකම් ඉන්න ඕන නිසා)
export const getUserWorkouts = async (req: Request, res: Response): Promise<void> => {
  // Try-Catch (Database එකේ අවුලක් ගියොත් සර්වර් එක බේරගන්න)
  try {
    // 11. Object Destructuring 
    // (URL එකෙන් එවන userId එක අල්ලගන්නවා. උදා: /api/workouts/c115ebce...)
    const { userId } = req.params;

    // Prisma පාවිච්චි කරලා අදාළ User ගේ Plans ඔක්කොම අදිනවා
    const userPlans = await prisma.workoutPlan.findMany({
      where: { userId: userId },
      include: {
        workouts: {
          include: { exercises: true } // Exercises ටිකත් එක්කම ගන්නවා
        }
      },
      orderBy: { createdAt: 'desc' } // අලුත්ම එක උඩින් එන්න පිළිවෙළ කරනවා
    });

    // 17. Ternary Operator (වගේ පාවිච්චි කරන if-else එකක්)
    // Plans තිබුණොත් ඒ ටික යවනවා, නැත්නම් හිස් Array එකක් යවනවා.
    res.status(200).json(userPlans);

  } catch (error) {
    console.error("Error fetching plans:", error);
    res.status(500).json({ error: "Plans ටික අරගන්න බැරි වුණා!" });
  }
};