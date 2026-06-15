import express from 'express'; // Express කියන්නේ අපේ backend server එක (API) හදාගන්න පාවිච්චි කරන ප්‍රධාන framework එක. 
import dotenv from 'dotenv';   // .env file එකේ තියෙන රහස්‍ය දත්ත (passwords, API keys) අපේ code එකට අරන් එන්න මේක උදව් වෙනවා.
import userRoutes from './routes/userRoutes'; // අලුතින් හදපු Route එක Import කරගත්තා

dotenv.config(); // මේකෙන් කරන්නේ අර .env file එක කියවලා, ඒකෙ තියෙන දේවල් 'process.env' කියන එකට load කරන එක. ඊට පස්සේ අපිට ඒක ඕන තැනක පාවිච්චි කරන්න පුළුවන්.

const app = express(); // Express program එක start කරලා ඒක 'app' කියන variable එකට දාගන්නවා. මුළු server එකම control කරන්නේ මේ 'app' එකෙන්.

// JSON දත්ත (ඒ කියන්නේ ඉස්සරහට React frontend එකෙන් එවන දත්ත) කියවන්න server එකට උගන්වන්න ඕනේ. ඒකට තමයි මේ middleware එක පාවිච්චි කරන්නේ. මේක නැත්නම් frontend එකෙන් එවන දේවල් backend එකට තේරෙන්නේ නෑ.
app.use(express.json());

// අපේ අලුත් API Routes සර්වර් එකට සම්බන්ධ කරන තැන 👇
// දැන් කවුරුහරි 'http://localhost:5000/api/users/register' වලට ගියොත් අපේ කෝඩ් එක වැඩ කරනවා!
app.use('/api/users', userRoutes);

// Server එක run වෙන්න ඕන port එක. .env එකේ PORT එකක් දුන්නොත් ඒක ගන්නවා, නැත්නම් 5000 ගන්නවා. (5000 කියන්නේ කවුළුවක් වගේ, ඒ කවුළුවෙන් තමයි දත්ත එළියට යන්නේ)
const PORT = process.env.PORT || 5000; 

// මේක තමයි අපේ පළවෙනි API endpoint එක (Route එක). 
// කවුරුහරි බ්‍රවුසරේ ගිහින් (GET request එකක්) localhost:5000/ ගැහුවොත් මේක වැඩ කරනවා.
app.get('/', (req, res) => {
  // req (request) = frontend/user ගෙන් එන දත්ත සහ ඉල්ලීම්
  // res (response) = අපේ backend එකෙන් user ට යවන උත්තරය
  
  res.send('Hello Bro! Gym Planner API is running!'); // අපි මේ text එක උත්තරයක් විදිහට යවනවා වැඩ කරනවා කියලා පෙන්නන්න.
});

// Server එක start කරන කෑල්ල. අපි කියනවා අර කලින් හදාගත්ත PORT (5000) එක දිහා බලන් ඉන්න, කවුරුහරි එනවද කියලා.
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); // Server එක සාර්ථකව start වුණාම අපිට terminal එකේ මේක බලාගන්න පුළුවන්.
});