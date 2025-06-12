import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  icon: string;
  gradient: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  index: number;
  isComingSoon?: boolean;
}

export default function ProjectCard({
  title,
  description,
  icon,
  gradient,
  technologies,
  liveUrl,
  githubUrl,
  index,
  isComingSoon = false
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      whileHover={!isComingSoon ? { 
        scale: 1.05, 
        rotateY: 8,
        rotateX: 5,
        z: 50,
        transition: { 
          type: "spring", 
          stiffness: 300, 
          damping: 20 
        }
      } : {}}
      whileTap={!isComingSoon ? { scale: 0.95 } : {}}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.2,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      viewport={{ once: true, margin: "-100px" }}
      className="glass rounded-lg overflow-hidden group perspective-1000"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <motion.div
        className={`h-48 ${gradient} flex items-center justify-center text-white text-4xl relative overflow-hidden`}
        whileHover={!isComingSoon ? {
          scale: 1.1,
          transition: { duration: 0.3 }
        } : {}}
      >
        <motion.div
          initial={{ scale: 1, rotate: 0 }}
          whileHover={!isComingSoon ? { 
            scale: 1.2, 
            rotate: 10,
            transition: { type: "spring", stiffness: 400 }
          } : {}}
        >
          {icon}
        </motion.div>
        
        {/* Animated background particles */}
        <motion.div
          className="absolute inset-0 opacity-20"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 0.3 }}
          transition={{ duration: 0.3 }}
        >
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${20 + (i % 2) * 40}%`
              }}
              animate={{
                y: [0, -10, 0],
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{
                duration: 2,
                delay: i * 0.2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
      </motion.div>
      
      <div className="p-6">
        <motion.h3 
          className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors"
          whileHover={{ x: 5 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          {title}
        </motion.h3>
        
        <motion.p 
          className="text-muted-foreground mb-4"
          initial={{ opacity: 0.8 }}
          whileHover={{ opacity: 1 }}
        >
          {description}
        </motion.p>
        
        <motion.div 
          className="flex flex-wrap gap-2 mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: index * 0.2 + 0.3 }}
        >
          {technologies.map((tech, techIndex) => (
            <motion.span
              key={tech}
              className="px-2 py-1 bg-accent text-accent-foreground rounded text-xs"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              whileHover={{ 
                scale: 1.1,
                backgroundColor: "hsl(var(--primary))",
                color: "hsl(var(--primary-foreground))"
              }}
              transition={{ 
                delay: index * 0.1 + techIndex * 0.05,
                type: "spring",
                stiffness: 200
              }}
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
        
        {!isComingSoon ? (
          <motion.div 
            className="flex gap-4"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.2 + 0.4 }}
          >
            {liveUrl && (
              <motion.a
                href={liveUrl}
                className="inline-flex items-center text-primary hover:underline text-sm"
                whileHover={{ 
                  scale: 1.05,
                  x: 5,
                  transition: { type: "spring", stiffness: 400 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                Live Site
                <ExternalLink className="ml-1 h-3 w-3" />
              </motion.a>
            )}
            {githubUrl && (
              <motion.a
                href={githubUrl}
                className="inline-flex items-center text-primary hover:underline text-sm"
                whileHover={{ 
                  scale: 1.05,
                  x: 5,
                  transition: { type: "spring", stiffness: 400 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                GitHub
                <ExternalLink className="ml-1 h-3 w-3" />
              </motion.a>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0.6 }}
            animate={{ 
              opacity: [0.6, 1, 0.6],
              transition: { duration: 2, repeat: Infinity }
            }}
          >
            <span className="text-muted-foreground text-sm">Updates coming soon</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}