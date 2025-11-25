import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './HorizontalScrollSection.module.css';

const HorizontalScrollSection = () => {
  // 1. Create a ref for the <section> that will be our "scroll track"
  const scrollRef = useRef(null);

  // 2. Hook into the scroll progress of that section
  // We'll track it from when its 'start' hits the 'start' of the viewport
  // to when its 'end' hits the 'end' of the viewport.
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start start', 'end end'],
  });

  // 3. Map the scroll progress (a value from 0 to 1) to a horizontal
  //    translateX value. We have 4 panels, so we want to move
  //    left by 3 panel-widths (which is -300vw).
  const xTransform = useTransform(scrollYProgress, [0, 1], ['0vw', '-300vw']);

  // 4. Map the scroll progress to reveal the text
  // We want the text to appear in the first 15% of the scroll
  const textOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const textY = useTransform(scrollYProgress, [0, 0.15], ['50px', '0px']);

  return (
    <section ref={scrollRef} className={styles.scrollContainer}>
      <div className={styles.stickyWrapper}>
        <motion.div style={{ x: xTransform }} className={styles.horizontalTrack}>
          
          {/* PANEL 1: The Text Reveal */}
          <div className={styles.panel}>
            <motion.div style={{ opacity: textOpacity, y: textY }} className={styles.textPanel}>
              <h2>This is the "white page."</h2>
              <p>As you scroll, this text appears. This is the effect you wanted, where the text is not static and completes as you scroll.</p>
            </motion.div>
          </div>

          {/* PANEL 2: Image from Right (your image) */}
          <div className={styles.panel}>
            <img src="/images/GTL-JORDAN_DESKTOP.png" alt="Creator 1" />
          </div>

          {/* PANEL 3: Image from Left (your image) */}
          <div className={styles.panel}>
            <img src="/images/GTL-MATTIE_DESKTOP(1).png" alt="Creator 2" />
          </div>

          {/* PANEL 4: Image from Right (your image) */}
          <div className={styles.panel}>
            <img src="/images/GTL-CHIAKA_DESKTOP.png" alt="Creator 3" />
          </div>
          
        </motion.div>
      </div>
    </section>
  );
};

export default HorizontalScrollSection;