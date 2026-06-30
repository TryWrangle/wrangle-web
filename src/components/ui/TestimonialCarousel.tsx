import { motion } from 'framer-motion';

const testimonials = [
  {
    text: 'I used to lose all my travel memories in the camera roll. Wrangle turned my Kyoto trip into something I actually share.',
    author: 'Aisha K.',
    location: 'London',
    stars: 5,
  },
  {
    text: 'My friends keep asking me which app I use. So much more personal than an Instagram highlight.',
    author: 'Marco T.',
    location: 'Sydney',
    stars: 5,
  },
  {
    text: 'I had 2,000 photos from Bali. Wrangle turned them into a guide in about 8 minutes. Genuinely magic.',
    author: 'Priya M.',
    location: 'Toronto',
    stars: 5,
  },
];

export default function TestimonialCarousel() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
      {testimonials.map((t, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: i * 0.15 }}
          style={{
            background: '#1A2A6C',
            border: '1px solid rgba(255,255,255,0.10)',
            borderRadius: '12px',
            padding: '24px',
          }}
        >
          {/* Stars */}
          <div style={{ display: 'flex', gap: 2, marginBottom: 12 }}>
            {Array.from({ length: t.stars }).map((_, j) => (
              <span key={j} style={{ color: '#FF7A59', fontSize: 16 }}>★</span>
            ))}
          </div>

          {/* Quote */}
          <p style={{
            fontFamily: '"Manrope", sans-serif',
            fontSize: 14,
            lineHeight: 1.7,
            color: '#F0F4F8',
            marginBottom: 16,
          }}>
            "{t.text}"
          </p>

          {/* Author */}
          <p style={{
            fontFamily: '"Manrope", sans-serif',
            fontSize: 13,
            fontWeight: 500,
            color: '#B0C4DE',
          }}>
            — {t.author}, {t.location}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
