import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';

// A string of triangular paper flags, as strung across the lanes of a book fair.
// Drawn wide and cropped by the viewport (slice) so flags never distort.
const COLOURS = ['#F2B233', '#1F5A3A', '#FFFFFF', '#2C3E8C', '#157780', '#FFFFFF'];

export default function Bunting({ width = 1600, gap = 44, sag = 14, flag = 30, className = '' }) {
  // Pause the sway while the string is off-screen, to spare mid-range phones.
  const ref = useRef(null);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    if (!ref.current || !('IntersectionObserver' in window)) return undefined;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  // On load the string is hung flag by flag, left to right.
  const reduce = useReducedMotion();

  const count = Math.floor(width / gap);
  const y = (x) => 6 + sag * 4 * (x / width) * (1 - x / width); // shallow catenary
  const flags = Array.from({ length: count }, (_, i) => {
    const x = gap / 2 + i * gap;
    return { x, y: y(x), fill: COLOURS[i % COLOURS.length], delay: `${(i % 7) * -0.4}s` };
  });

  return (
    <svg
      ref={ref}
      className={`bunting ${visible ? '' : 'bunting--paused'} ${className}`}
      viewBox={`0 0 ${width} ${sag + flag + 12}`}
      preserveAspectRatio="xMidYMin slice"
      aria-hidden="true"
      focusable="false"
    >
      <path d={`M0 6 Q ${width / 2} ${6 + sag * 2} ${width} 6`} className="bunting__string" />
      {flags.map((f, i) => (
        <motion.g
          key={f.x}
          style={{ transformBox: 'fill-box', transformOrigin: '50% 0' }}
          initial={reduce ? false : { scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ delay: Math.min(i * 0.018, 0.65), type: 'spring', stiffness: 320, damping: 14 }}
        >
        <polygon
          className="bunting__flag"
          style={{ animationDelay: f.delay }}
          points={`${f.x - flag / 2.4},${f.y} ${f.x + flag / 2.4},${f.y} ${f.x},${f.y + flag}`}
          fill={f.fill}
        />
        </motion.g>
      ))}
    </svg>
  );
}
