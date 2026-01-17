import React from 'react';
import { motion } from 'framer-motion';

export default function Settings(): React.JSX.Element {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6"
    >
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <p>Application settings page</p>
    </motion.div>
  );
}