import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import WorkoutGenerator from './components/WorkoutGenerator';
import Dashboard from './components/Dashboard';

// 3. Arrow Function
// (මේක තමයි අපේ ප්‍රධාන Component එක)
const App = () => {
  return (
    // React Component Tree Pattern:
    // Router එකෙන් තමයි මුළු ඇප් එකටම URL එක අනුව පිටු මාරු කරන්න හැකියාව දෙන්නේ
    <Router>
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <Routes>
          {/* අන්තර්ජාල ලිපිනය '/' නම්, Register Form එක පෙන්වන්න */}
          <Route path="/" element={<RegisterForm />} />
          
          {/* අන්තර්ජාල ලිපිනය '/generate' නම්, Workout Generator එක පෙන්වන්න */}
          <Route path="/generate" element={<WorkoutGenerator />} />

          {/* අලුත් Dashboard පාර */}
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;