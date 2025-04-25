import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, User, Settings, ChevronDown } from 'lucide-react';
import { clearUser } from '../store/userSlice';
import apperService from '../services/apperService';

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  
  const toggleMenu = () => setIsOpen(!isOpen);
  
  const handleLogout = async () => {
    try {
      await apperService.logout();
      dispatch(clearUser());
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Format initials for avatar
  const getInitials = () => {
    if (!user) return '?';
    
    if (user.firstName && user.lastName) {
      return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;
    }
    
    if (user.emailAddress) {
      return user.emailAddress.charAt(0).toUpperCase();
    }
    
    return '?';
  };
  
  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={toggleMenu}
        className="flex items-center gap-2 p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors focus:outline-none"
        aria-label="User menu"
      >
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-medium">
          {getInitials()}
        </div>
        <span className="hidden md:block text-sm font-medium">
          {user?.firstName || user?.emailAddress?.split('@')[0] || 'User'}
        </span>
        <ChevronDown className="w-4 h-4" />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-surface-800 ring-1 ring-black ring-opacity-5 z-50"
          >
            <div className="py-1">
              <div className="px-4 py-2 border-b border-surface-100 dark:border-surface-700">
                <p className="text-sm font-medium">{user?.firstName} {user?.lastName}</p>
                <p className="text-xs text-surface-500 truncate">{user?.emailAddress}</p>
              </div>
              
              <button
                onClick={() => {
                  setIsOpen(false);
                  navigate('/profile');
                }}
                className="flex items-center w-full px-4 py-2 text-sm text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700"
              >
                <User className="w-4 h-4 mr-2" />
                Profile
              </button>
              
              <button
                onClick={() => {
                  setIsOpen(false);
                  navigate('/settings');
                }}
                className="flex items-center w-full px-4 py-2 text-sm text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700"
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </button>
              
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-sm text-accent hover:bg-surface-100 dark:hover:bg-surface-700"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserMenu;