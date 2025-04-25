import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, AlertTriangle } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md"
      >
        <motion.div 
          className="mb-8 flex justify-center"
          initial={{ scale: 0.8, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 200, 
            damping: 10,
            delay: 0.2
          }}
        >
          <div className="relative">
            <AlertTriangle size={80} className="text-accent" />
            <motion.div 
              className="absolute inset-0"
              animate={{ 
                rotate: [0, 5, -5, 0],
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 2,
                repeatType: "reverse"
              }}
            >
              <AlertTriangle size={80} className="text-accent" />
            </motion.div>
          </div>
        </motion.div>

        <motion.h1 
          className="text-4xl font-bold mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Page Not Found
        </motion.h1>
        
        <motion.p 
          className="text-surface-600 dark:text-surface-400 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          The page you're looking for doesn't exist or has been moved.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Link to="/">
            <motion.button 
              className="btn btn-primary inline-flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Home className="w-5 h-5 mr-2" />
              Back to Home
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;