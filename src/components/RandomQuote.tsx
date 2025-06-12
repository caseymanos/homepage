import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Placeholder quotes - you can replace these with your favorites
const QUOTES = [
  {
    text: "The miracle isn't that I finished. The miracle is that I had the courage to start.",
    author: "John Bingham",
    category: "Running"
  },
  {
    text: "Run when you have to, walk if you have to, crawl if you have to; just never give up.",
    author: "Dean Karnazes",
    category: "Perseverance"
  },
  {
    text: "The obsession with running is really an obsession with the potential for more and more life.",
    author: "George Sheehan",
    category: "Philosophy"
  },
  {
    text: "Every mile begins with a single step.",
    author: "Casey Manos", // You can add your own quotes too!
    category: "Motivation"
  },
  {
    text: "You have to wonder at times what you're doing out there. Over the years, I've given myself a thousand reasons to keep running, but it always comes back to where it started. It comes down to self-satisfaction and a sense of achievement.",
    author: "Steve Prefontaine",
    category: "Running"
  },
];

export default function RandomQuote() {
  const [currentQuote, setCurrentQuote] = useState(QUOTES[0]);
  const [isVisible, setIsVisible] = useState(true);

  // Change quote every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * QUOTES.length);
        setCurrentQuote(QUOTES[randomIndex]);
        setIsVisible(true);
      }, 300); // Short delay for transition
      
    }, 10000); // Change every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      className="relative max-w-2xl mx-auto text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="glass rounded-lg p-8 backdrop-blur-sm border border-copper-bronze/20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuote.text}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {/* Quote Icon */}
            <motion.div 
              className="text-retro-gold/60 text-4xl mb-4"
              animate={{ 
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1] 
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                repeatDelay: 8 
              }}
            >
              "
            </motion.div>
            
            {/* Quote Text */}
            <blockquote className="text-lg md:text-xl text-foreground/90 mb-6 font-medium leading-relaxed">
              {currentQuote.text}
            </blockquote>
            
            {/* Author and Category */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-2 text-muted-foreground">
              <cite className="font-semibold text-copper-bronze">
                — {currentQuote.author}
              </cite>
              <span className="hidden sm:inline text-muted-foreground/60">•</span>
              <span className="px-3 py-1 bg-track-red/10 text-track-red rounded-full text-sm font-medium">
                {currentQuote.category}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
        
        {/* Progress indicator */}
        <motion.div 
          className="absolute bottom-2 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 1 }}
        >
          <div className="flex gap-1">
            {QUOTES.map((_, index) => (
              <motion.div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  QUOTES.indexOf(currentQuote) === index 
                    ? 'bg-retro-gold' 
                    : 'bg-muted-foreground/30'
                }`}
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 400 }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}