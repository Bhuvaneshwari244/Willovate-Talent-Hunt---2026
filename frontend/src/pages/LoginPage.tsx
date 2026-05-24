import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { Lock, Mail } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
      toast.success('Login successful!');
      navigate('/admin/dashboard');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-500 via-primary-600 to-purple-600 px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        <div className="text-center mb-8 animate-fadeIn">
          <div className="inline-block p-4 bg-white/10 backdrop-blur-lg rounded-2xl mb-4 animate-bounce-slow">
            <h1 className="text-5xl font-bold text-white">Smart Offer</h1>
          </div>
          <p className="text-xl text-primary-100 animate-slideInRight stagger-1">Admin Login</p>
        </div>

        <div className="card glass animate-scaleIn stagger-2 hover-glow">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="animate-slideInLeft stagger-3">
              <label className="block text-sm font-medium mb-2">Email</label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary-600 transition-colors" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field pl-10"
                  placeholder="admin@smartoffer.com"
                  required
                />
              </div>
            </div>

            <div className="animate-slideInLeft stagger-4">
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary-600 transition-colors" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pl-10"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary ripple animate-slideInLeft stagger-5"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </span>
              ) : (
                'Login'
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400 animate-fadeIn stagger-6">
            <p className="mb-2">Default credentials:</p>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 font-mono text-xs">
              <p>admin@smartoffer.com</p>
              <p>Admin@123</p>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center animate-fadeIn stagger-6">
          <button
            onClick={() => navigate('/')}
            className="text-white hover:text-primary-100 transition-all duration-300 hover:scale-105 inline-flex items-center"
          >
            <span className="mr-2">←</span> Back to Offers
          </button>
        </div>
      </div>
    </div>
  );
}
