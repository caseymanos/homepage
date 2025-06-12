import { motion } from 'framer-motion';
import { Mail, ExternalLink } from 'lucide-react';

interface SubstackPost {
  title: string;
  description: string;
  date: string;
  url: string;
}

// Substack is newly launched - will be populated with real posts as they're published
const SUBSTACK_POSTS: SubstackPost[] = [];

export default function SubstackSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 gradient-text">
            Latest Writing
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Thoughts on software engineering, technology, and building better products.
          </p>
        </motion.div>

        {SUBSTACK_POSTS.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {SUBSTACK_POSTS.map((post, index) => (
              <motion.article
                key={post.url}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={{ 
                  scale: 1.02, 
                  rotateY: 5,
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
                viewport={{ once: true, margin: "-50px" }}
                className="group glass rounded-lg p-6 hover:bg-accent/5 transition-all duration-300 cursor-pointer"
              >
                <div className="flex justify-between items-start mb-3">
                  <time className="text-sm text-muted-foreground">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {post.description}
                </p>
                
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                >
                  Read more
                  <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </motion.article>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ 
              scale: 1.05,
              rotateX: 5,
              transition: { type: "spring", stiffness: 200 }
            }}
            transition={{ 
              duration: 0.8, 
              type: "spring",
              stiffness: 80,
              damping: 12
            }}
            viewport={{ once: true, margin: "-30px" }}
            className="text-center mb-12"
          >
            <div className="glass rounded-lg p-8 max-w-md mx-auto">
              <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
              <p className="text-muted-foreground mb-4">
                I'm just getting started with my writing. Subscribe to be notified when I publish my first posts!
              </p>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="glass rounded-lg p-8 max-w-md mx-auto">
            <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Subscribe to my newsletter</h3>
            <p className="text-muted-foreground mb-6">
              Get updates on new posts and insights delivered to your inbox.
            </p>
            <a
              href="https://caseymanos.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Subscribe on Substack
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
