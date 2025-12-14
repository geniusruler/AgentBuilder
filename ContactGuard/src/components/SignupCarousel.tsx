import { useState, useEffect } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion, AnimatePresence } from 'motion/react';

interface CarouselSlide {
  image: string;
  title: string;
  description: string;
}

const slides: CarouselSlide[] = [
  {
    image: "https://images.unsplash.com/photo-1759844197486-5b3612c7d534?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtd29yayUyMGNvbGxhYm9yYXRpb24lMjBvZmZpY2V8ZW58MXx8fHwxNzYyMDQ4Njk3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Collaborate Seamlessly",
    description: "Work together with your team in real-time, no matter where you are."
  },
  {
    image: "https://images.unsplash.com/photo-1730382624709-81e52dd294d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdWNjZXNzZnVsJTIwYnVzaW5lc3MlMjBncm93dGh8ZW58MXx8fHwxNzYyMDg4MzA5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Achieve Your Goals",
    description: "Transform your ideas into reality with powerful tools designed for success."
  },
  {
    image: "https://images.unsplash.com/photo-1759668358660-0d06064f0f84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3b3Jrc3BhY2UlMjBwcm9kdWN0aXZpdHl8ZW58MXx8fHwxNzYxOTk5NTY3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Stay Productive",
    description: "Streamline your workflow and focus on what matters most to you."
  }
];

export function SignupCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Auto-advance every 5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-purple-600 to-blue-600">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <ImageWithFallback
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 flex flex-col justify-end p-12">
        <motion.div
          key={`content-${currentSlide}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-lg"
        >
          <h2 className="mb-4 text-white">{slides[currentSlide].title}</h2>
          <p className="text-white/90">{slides[currentSlide].description}</p>
        </motion.div>

        <div className="mt-8 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className="group relative h-1 w-12 overflow-hidden rounded-full bg-white/30"
              aria-label={`Go to slide ${index + 1}`}
            >
              <motion.div
                className="h-full bg-white"
                initial={{ width: '0%' }}
                animate={{
                  width: currentSlide === index ? '100%' : '0%'
                }}
                transition={{
                  duration: currentSlide === index ? 5 : 0.3,
                  ease: 'linear'
                }}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
