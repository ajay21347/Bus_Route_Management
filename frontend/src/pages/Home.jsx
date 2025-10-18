import React from "react";
import SearchForm from "./components/SearchForm";
import { motion } from "framer-motion";

export default function Home({ onSearch }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex-col items-center text-center">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mt-20"
      >
        <h1 className="text-4xl font-extrabold text-blue-600 mb-3">
          Smart Bus Route Management
        </h1>
        <p className="text-gray-600 text-lg">
          Plan your route efficiently and reach your destination faster.
        </p>
      </motion.div>
      <SearchForm onSearch={onSearch} />
    </div>
  );
}
