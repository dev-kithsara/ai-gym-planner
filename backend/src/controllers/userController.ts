import { Request, Response } from 'express';
import prisma from '../prisma'; // අපි කලින් හදාගත්තු Prisma Client එක

// අලුත් User කෙනෙක්ව Register කරන Function එක
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    // 1. Frontend එකෙන් (req.body එකෙන්) එවන දත්ත ටික අල්ලගන්නවා
    const { name, email, password } = req.body;

    // 2. මේ Email එකෙන් දැනටමත් කෙනෙක් ඉන්නවද කියලා බලනවා
    const existingUser = await prisma.user.findUnique({
      where: { email: email }
    });

    if (existingUser) {
      res.status(400).json({ error: "මේ Email එක දැනටමත් පාවිච්චි කරලා තියෙන්නේ!" });
      return;
    }

    // 3. කෙනෙක් නැත්නම්, අලුත් User ව Database එකට දානවා
    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        passwordHash: password, // ⚠️ මතක තියාගන්න: අපි පස්සේ පාඩමකදී මේ password එක encrypt (hash) කරනවා ආරක්ෂාවට. දැනට කෙලින්ම දාමු.
      }
    });

    // 4. වැඩේ සාර්ථකයි කියලා Frontend එකට උත්තරයක් (Response එකක්) යවනවා
    res.status(201).json({ 
      message: "User සාර්ථකව register වුණා!", 
      user: newUser 
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "සර්වර් එකේ පොඩි අවුලක්!" });
  }
};

// 6. Async Arrow Function
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  // Try-Catch
  try {
    // 11. Object Destructuring
    const { email, password } = req.body;

    // Database එකේ මේ Email එක තියෙන User කෙනෙක් ඉන්නවද බලනවා
    const user = await prisma.user.findUnique({
      where: { email: email }
    });

    // User කෙනෙක් නැත්නම් හෝ Password එක වැරදි නම්
    if (!user || user.passwordHash !== password) {
      res.status(401).json({ error: "Email එක හෝ Password එක වැරදියි!" });
      return;
    }

    // වැඩේ සාර්ථක නම් User ගේ විස්තර Frontend එකට යවනවා
    res.status(200).json({ 
      message: "සාර්ථකව ලොග් වුණා!", 
      user: { id: user.id, name: user.name, email: user.email } 
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "සර්වර් එකේ අවුලක්!" });
  }
};