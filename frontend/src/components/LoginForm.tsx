// frontend/src/components/LoginForm.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 3. Arrow Function
const LoginForm = () => {
  // 12. Array Destructuring
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  
  const navigate = useNavigate();

  // 3. Arrow Function
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 11. Object Destructuring
    const { name, value } = e.target;
    // 13. Spread Operator
    setFormData({ ...formData, [name]: value });
  };

  // 6. Async Arrow Function
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Try-Catch
    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // 🚀 මැජික් එක මෙතනයි! බ්‍රවුසරයේ මතකයේ (Local Storage) ID එක Save කරනවා.
        // එතකොට Refresh කළත් ID එක මැකෙන්නේ නෑ.
        localStorage.setItem('gymUserId', data.user.id);
        
        // Dashboard එකට යනවා
        navigate('/dashboard');
      } else {
        setMessage("❌ " + data.error);
      }
    } catch (error) {
      setMessage("❌ සර්වර් එකට සම්බන්ධ වෙන්න බැහැ!");
    }
  };

  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96 text-white">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-400">Login to Gym Planner</h2>
      
      {/* 15. Optional Chaining වගේ කෙටි ක්‍රමයක් (message එක තිබ්බොත් පෙන්වන්න) */}
      {message && <p className="mb-4 text-center text-red-400">{message}</p>}
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="p-2 rounded bg-gray-700 outline-none focus:ring-2 focus:ring-green-500" required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="p-2 rounded bg-gray-700 outline-none focus:ring-2 focus:ring-green-500" required />
        <button type="submit" className="bg-green-600 hover:bg-green-700 p-2 rounded font-bold transition-colors">Login</button>
      </form>

      <p className="mt-4 text-center text-gray-400 text-sm">
        Don't have an account? <span className="text-blue-400 cursor-pointer hover:underline" onClick={() => navigate('/')}>Register here</span>
      </p>
    </div>
  );
};

export default LoginForm;