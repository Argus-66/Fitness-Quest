import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft } from 'react-icons/fa';

const quotes = [
  "Every rep brings you closer to your legendary status.",
  "Your body can stand almost anything. It's your mind you have to convince.",
  "The only bad workout is the one that didn't happen.",
  "Success isn't always about greatness. It's about consistency.",
  "The pain you feel today will be the strength you feel tomorrow.",
];

export default function QuoteCard() {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-solo-dark/40 backdrop-blur-lg rounded-xl border border-solo-purple/30 p-6 shadow-glow-sm"
    >
      <div className="flex items-start space-x-3">
        <FaQuoteLeft className="text-solo-accent text-xl flex-shrink-0" />
        <p className="text-solo-light/80 italic">{quote}</p>
      </div>
    </motion.div>
  );
} 