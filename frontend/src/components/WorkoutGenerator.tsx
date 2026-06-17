import { useState } from 'react';
import { useLocation } from 'react-router-dom'; // 👈 පිටුවට ආපු දත්ත අල්ලගන්න මේක ඕනේ

// 8. Type Alias
// (Backend එකෙන් එන සංකීර්ණ JSON එකේ හැඩය React වලට අඳුන්වා දීම)
type Exercise = { name: string; sets: number; reps: string; restTime: string };
type Workout = { dayOfWeek: string; muscleGroup: string; exercises: Exercise[] };
type WorkoutPlan = { name: string; workouts: Workout[] };

// 3. Arrow Function
const WorkoutGenerator = () => {
  // React Hook: කලින් පිටුවෙන් එවපු දත්ත (state) අල්ලගන්නවා
  const location = useLocation();

  // 15. Optional Chaining (දත්ත ආවේ නැත්නම් හිස් අගයක් '' දෙනවා)
  // Register පිටුවෙන් ආපු ID එක මෙතනට ගන්නවා
  const incomingUserId = location.state?.newUserId || '';

  // 12. Array Destructuring
  // (Form එකේ ටයිප් කරන දත්තයි, loading වෙනවද කියන එකයි මතක තියාගන්න)
  const [formData, setFormData] = useState({
    userId: incomingUserId , // 👈 Hardcode කරපු දිග ID එක වෙනුවට මේක දැම්මා!
    age: '', weight: '', height: '', goal: 'Muscle Gain', experience: 'Beginner'
  });
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<WorkoutPlan | null>(null);

  // 3. Arrow Function
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    // 11. Object Destructuring
    const { name, value } = e.target;
    // 13. Spread Operator
    setFormData({ ...formData, [name]: value });
  };

  // 6. Async Arrow Function
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Try-Catch
    try {
      const response = await fetch('http://localhost:5000/api/workouts/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Strings විදිහට තියෙන වයස, බර Numbers බවට පත් කරලා යවනවා
        body: JSON.stringify({ 
          ...formData, 
          age: Number(formData.age), 
          weight: Number(formData.weight), 
          height: Number(formData.height) 
        }),
      });

      const data = await response.json();
      
      // 17. Ternary Operator (වගේම වැඩ කරන if/else කෙටි ක්‍රමය)
      response.ok ? setPlan(data.plan) : alert(data.error);

    } catch (error) {
      alert("සර්වර් එකට සම්බන්ධ වෙන්න බැහැ!");
    } finally {
      setLoading(false); // වැඩේ ඉවර වුණාම loading එක නවත්වනවා
    }
  };

  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-2xl text-white my-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-400">Generate AI Workout</h2>
      
      {/* Form එක */}
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mb-8">
        <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} className="p-2 rounded bg-gray-700 outline-none" required />
        <input type="number" name="weight" placeholder="Weight (kg)" value={formData.weight} onChange={handleChange} className="p-2 rounded bg-gray-700 outline-none" required />
        <input type="number" name="height" placeholder="Height (cm)" value={formData.height} onChange={handleChange} className="p-2 rounded bg-gray-700 outline-none" required />
        
        <select name="goal" value={formData.goal} onChange={handleChange} className="p-2 rounded bg-gray-700 outline-none">
          <option value="Muscle Gain">Muscle Gain</option>
          <option value="Fat Loss">Fat Loss</option>
          <option value="Endurance">Endurance</option>
        </select>
        
        <select name="experience" value={formData.experience} onChange={handleChange} className="p-2 rounded bg-gray-700 outline-none">
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>

        <button type="submit" disabled={loading} className="col-span-2 bg-blue-600 hover:bg-blue-700 p-3 rounded font-bold transition-colors">
          {/* 17. Ternary Operator */}
          {loading ? "AI is thinking... 🧠" : "Generate Plan 🚀"}
        </button>
      </form>

      {/* 15. Optional Chaining (Plan එකක් හැදිලා ආවොත් විතරක් මේක පෙන්වන්න) */}
      {plan?.workouts && (
        <div className="mt-8">
          <h3 className="text-2xl font-bold text-green-400 mb-4">{plan.name}</h3>
          <div className="flex flex-col gap-4">
            {plan.workouts.map((workout, index) => (
              <div key={index} className="bg-gray-700 p-4 rounded">
                <h4 className="text-xl font-bold text-yellow-300">{workout.dayOfWeek} - {workout.muscleGroup}</h4>
                <ul className="mt-2 space-y-1">
                  {workout.exercises.map((ex, idx) => (
                    <li key={idx} className="text-gray-300">
                      🏋️ {ex.name} <span className="text-sm text-gray-400">({ex.sets} Sets | {ex.reps} Reps | Rest: {ex.restTime})</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutGenerator;