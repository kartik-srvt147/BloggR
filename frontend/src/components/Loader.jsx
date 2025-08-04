import React from "react";
import { motion } from "framer-motion";

const Loader = ({ text = "Loading..." }) => {
  return (
    <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black/50 flex items-center justify-center">
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-12 h-12 border-4 border-teal-400 border-t-transparent rounded-full animate-spin" />
        <p className="mt-4 text-teal-300 text-sm">{text}</p>
      </motion.div>
    </div>
  );
};

export default Loader;
