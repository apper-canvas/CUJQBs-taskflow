import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { setUser } from '../store/userSlice';
import apperService from '../services/apperService';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const apperUI = apperService.setupUI('#authentication', {
      view: 'login',
      onSuccess: (user) => {
        dispatch(setUser(user));
        navigate('/dashboard');
      },
      onError: (error) => {
        console.error("Authentication failed:", error);
      }
    });

    if (apperUI) {
      apperService.showLogin('#authentication');
    }

    return () => {
      // Cleanup if needed
    };
  }, [dispatch, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            TaskFlow
          </h1>
          <p className="text-surface-600 dark:text-surface-400 mt-2">
            Welcome back! Log in to your account.
          </p>
        </div>

        <div className="card">
          <div 
            id="authentication" 
            className="min-h-[400px] flex items-center justify-center" 
          />
          
          <div className="mt-6 text-center text-sm text-surface-600 dark:text-surface-400">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;