// frontend/src/components/Dashboard.tsx
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// 3. Arrow Function
const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // 15. Optional Chaining
  // Login/Register වුණාම එන ID එක ගන්නවා. එහෙම එකක් නැත්නම් අර අපි දන්න Kithsara ගේ ID එක default ගන්නවා (Testing ලේසි වෙන්න).
  const userId = location.state?.userId || 'c115ebce-97f5-4ad9-93f2-4b45d343948c'; 

  // 12. Array Destructuring
  const [plans, setPlans] = useState<any[]>([]); // Plans ටික දාගන්න පෙට්ටිය
  const [loading, setLoading] = useState(true);  // Load වෙනවද කියලා බලන්න

  // 💡 React Hook (useEffect): 
  // මේකෙන් කරන්නේ පිටුව Load වුණු ගමන් ඉබේම ඇතුළේ තියෙන කෝඩ් එක (Database එකෙන් දත්ත ගේන එක) Run කරන එකයි.
  useEffect(() => {
    
    // 6. Async Arrow Function
    const fetchPlans = async () => {
      // Try-Catch
      try {
        const response = await fetch(`http://localhost:5000/api/workouts/${userId}`);
        const data = await response.json();
        setPlans(data); // Backend එකෙන් ආපු දත්ත ටික State එකට දානවා
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // වැඩේ ඉවරයි, loading නවත්වනවා
      }
    };

    fetchPlans();
  }, [userId]);

  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-4xl text-white my-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-400">My Workout Plans 🏋️‍♂️</h2>

      {/* 17. Ternary Operator (කන්ඩිෂන් 3ක් චෙක් කරනවා) */}
      {loading ? (
        <p className="text-center text-gray-400">Loading your plans... ⏳</p>
      ) : plans.length === 0 ? (
        <div className="text-center">
          <p className="mb-4 text-gray-300">You don't have any workout plans yet.</p>
          <button 
            onClick={() => navigate('/generate', { state: { newUserId: userId } })} 
            className="bg-blue-600 hover:bg-blue-700 p-2 rounded font-bold transition-colors"
          >
            Create New AI Plan 🚀
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 3. Arrow Function & Map Method */}
          {plans.map((plan: any) => (
            <div key={plan.id} className="bg-gray-700 p-5 rounded-lg border border-gray-600 hover:border-blue-400 transition-colors">
              <h3 className="text-xl font-bold text-green-400">{plan.name}</h3>
              <p className="text-sm text-gray-400 mb-4">
                Created: {new Date(plan.createdAt).toLocaleDateString()}
              </p>
              
              <h4 className="font-bold text-yellow-300 mb-2">Weekly Schedule:</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                {/* 15. Optional Chaining */}
                {plan.workouts?.map((w: any, index: number) => (
                  <li key={index}>🔥 {w.dayOfWeek}: {w.muscleGroup}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;