// frontend/src/components/RegisterForm.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 6. Async Arrow Function (Component declaration)
const RegisterForm = () => {
  // 12. Array Destructuring
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');

   // React Hook: වෙනත් පිටුවකට යන්න පාවිච්චි කරන ආයුධය
   const navigate =  useNavigate();

  // 3. Arrow Function
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 11. Object Destructuring (Event එකෙන් නම සහ අගය ගැනීම)
    const { name, value } = e.target;
    
    // 13. Spread Operator (කලින් දත්ත තියාගෙන අලුත් දේ එකතු කිරීම)
    setFormData({ ...formData, [name]: value });
  };

  // 6. Async Arrow Function
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Page එක reload වෙන එක නවත්තනවා

    // Try-Catch
    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // 🚀 වැඩේ සාර්ථක නම්: User ගේ අලුත් ID එකත් අරගෙන Generator පිටුවට යනවා!
        // අර කලින් තිබ්බ Ternary operator එක වෙනුවට පැහැදිලි if/else එකක් දැම්මා.
        navigate('/generate', { state: { newUserId: data.user.id } });
      } else {
        setMessage("❌ " + data.error);
      }

    } catch (error) {
      setMessage("❌ සර්වර් එකට සම්බන්ධ වෙන්න බැහැ!");
    }
  };

  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96 text-white">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-400">Register in Gym Planner</h2>
      
      {/* 15. Optional Chaining (message එකක් තිබ්බොත් විතරක් පෙන්වන්න) - මෙතන කෙලින්ම && පාවිච්චි කරමු */}
      {message && <p className="mb-4 text-center">{message}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input 
          type="text" 
          name="name" 
          placeholder="Name" 
          value={formData.name} 
          onChange={handleChange} 
          className="p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          value={formData.email} 
          onChange={handleChange} 
          className="p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          value={formData.password} 
          onChange={handleChange} 
          className="p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 p-2 rounded font-bold transition-colors">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;