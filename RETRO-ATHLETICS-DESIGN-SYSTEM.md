# Retro Athletics Design System
## Portfolio Theme Specification

---

## 1. Visual Design System

### Color Palette

#### Primary Track Colors
```css
/* Inspired by vintage track surfaces and lane markings */
--track-red: #D73502;        /* Classic track red/rust */
--track-orange: #FF6B35;     /* 70s orange track surface */
--lane-white: #FFF8F3;       /* Off-white lane lines */
--timing-yellow: #FFD23F;    /* Vintage timing board yellow */
--track-blue: #3E5C76;       /* Navy track uniform blue */
```

#### Athletic Wear Colors
```css
/* 1970s-80s running apparel inspiration */
--retro-gold: #F5A623;       /* Classic gold medals/trim */
--marathon-green: #2E7D32;   /* Boston Marathon green */
--vintage-maroon: #8B2635;   /* Old school track uniforms */
--champion-purple: #663399;  /* 80s athletic purple */
--sprint-coral: #FF6B6B;     /* Vintage sportswear coral */
```

#### Neutral System
```css
/* Inspired by vintage timing equipment and scoreboards */
--timing-black: #1A1A1A;     /* LED display black */
--concrete-gray: #4A4A4A;    /* Stadium concrete */
--equipment-gray: #7D7D7D;   /* Vintage equipment metal */
--paper-beige: #F5F2E8;      /* Old race program paper */
--carbon-black: #0A0A0A;     /* Track shoe carbon */
```

#### Semantic Colors
```css
/* Light Mode */
--background: #FFF8F3;
--foreground: #1A1A1A;
--card: #FFFFFF;
--card-foreground: #1A1A1A;
--primary: #D73502;
--primary-foreground: #FFF8F3;
--secondary: #3E5C76;
--secondary-foreground: #FFF8F3;
--accent: #FFD23F;
--accent-foreground: #1A1A1A;

/* Dark Mode */
--background-dark: #0A0A0A;
--foreground-dark: #FFF8F3;
--card-dark: #1A1A1A;
--card-foreground-dark: #FFF8F3;
--primary-dark: #FF6B35;
--primary-foreground-dark: #0A0A0A;
```

### Typography

#### Font Families
```css
/* Primary: Athletic Display */
@font-face {
  font-family: 'Bebas Neue';  /* Classic sports display font */
  /* Fallback to system athletic fonts */
}

/* Secondary: Timing Board */
@font-face {
  font-family: 'IBM Plex Mono';  /* Digital timing aesthetic */
  font-variant-numeric: tabular-nums;  /* Aligned numbers */
}

/* Body Text */
@font-face {
  font-family: 'Work Sans';  /* Clean, readable, slight vintage feel */
}
```

#### Type Scale
```css
/* Based on classic athletic poster hierarchy */
--type-scale-ratio: 1.414;  /* Augmented fourth */

/* Display sizes - for hero sections */
--text-6xl: 4.209rem;    /* 67.34px - Race numbers */
--text-5xl: 2.986rem;    /* 47.78px - Section headers */
--text-4xl: 2.111rem;    /* 33.78px - Subsection headers */

/* Body sizes */
--text-3xl: 1.5rem;      /* 24px - Card titles */
--text-2xl: 1.25rem;     /* 20px - Subtitles */
--text-xl: 1.125rem;     /* 18px - Large body */
--text-base: 1rem;       /* 16px - Body text */
--text-sm: 0.875rem;     /* 14px - Small text */
--text-xs: 0.75rem;      /* 12px - Captions */
```

### Spacing System
```css
/* Based on track lane widths (1.22m standard) */
--space-unit: 0.25rem;  /* 4px base */

--space-1: 0.25rem;     /* 4px - Tight spacing */
--space-2: 0.5rem;      /* 8px - Line spacing */
--space-3: 0.75rem;     /* 12px - Element spacing */
--space-4: 1rem;        /* 16px - Section spacing */
--space-6: 1.5rem;      /* 24px - Card padding */
--space-8: 2rem;        /* 32px - Major spacing */
--space-12: 3rem;       /* 48px - Section gaps */
--space-16: 4rem;       /* 64px - Page sections */
--space-24: 6rem;       /* 96px - Hero spacing */
```

### Layout Patterns

#### Track-Inspired Grid
```css
/* 8-lane track system */
.track-grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: var(--space-2);  /* Lane dividers */
}

/* Responsive lanes */
@media (max-width: 768px) {
  .track-grid {
    grid-template-columns: repeat(4, 1fr);  /* 4 lanes on mobile */
  }
}
```

#### Timing Board Layout
```css
.timing-board {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: baseline;
  padding: var(--space-4);
  background: var(--timing-black);
  border: 2px solid var(--timing-yellow);
}
```

---

## 2. Athletic-Inspired Interactive Elements

### Stopwatch Loading Animation
```css
@keyframes stopwatch-tick {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.stopwatch-loader {
  width: 48px;
  height: 48px;
  border: 3px solid var(--track-red);
  border-radius: 50%;
  position: relative;
}

.stopwatch-hand {
  position: absolute;
  width: 2px;
  height: 20px;
  background: var(--timing-yellow);
  left: 50%;
  top: 4px;
  transform-origin: bottom center;
  animation: stopwatch-tick 1s steps(60) infinite;
}
```

### Track Lane Dividers
```css
.lane-divider {
  height: 2px;
  background-image: repeating-linear-gradient(
    90deg,
    var(--lane-white) 0,
    var(--lane-white) 20px,
    transparent 20px,
    transparent 40px
  );
}

.vertical-lane {
  width: 2px;
  background-image: repeating-linear-gradient(
    0deg,
    var(--lane-white) 0,
    var(--lane-white) 20px,
    transparent 20px,
    transparent 40px
  );
}
```

### Race Bib Number Styling
```css
.race-bib {
  display: inline-block;
  background: var(--lane-white);
  color: var(--timing-black);
  font-family: 'Bebas Neue', sans-serif;
  font-size: var(--text-4xl);
  padding: var(--space-4) var(--space-6);
  border: 3px solid var(--timing-black);
  position: relative;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

.race-bib::before {
  content: '';
  position: absolute;
  top: var(--space-2);
  left: var(--space-2);
  right: var(--space-2);
  height: 4px;
  background: repeating-linear-gradient(
    90deg,
    transparent 0,
    transparent 4px,
    var(--timing-black) 4px,
    var(--timing-black) 6px
  );
}
```

### Starting Block Button
```css
.starting-block-btn {
  background: var(--track-orange);
  color: var(--lane-white);
  padding: var(--space-3) var(--space-8);
  font-family: 'Bebas Neue', sans-serif;
  font-size: var(--text-xl);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border: none;
  position: relative;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
}

.starting-block-btn::before {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--vintage-maroon);
  transform: translateZ(-1px);
}

.starting-block-btn:hover {
  transform: translateY(-2px);
}

.starting-block-btn:active {
  transform: translateY(0);
}
```

---

## 3. Content Structure Ideas

### Projects as Race Results
```html
<div class="race-result-card">
  <div class="race-position">01</div>
  <div class="race-details">
    <h3 class="project-name">Project Marathon</h3>
    <div class="race-stats">
      <span class="stat">
        <span class="label">Duration:</span>
        <span class="value">3:24:15</span>
      </span>
      <span class="stat">
        <span class="label">Tech:</span>
        <span class="value">React, Node.js</span>
      </span>
    </div>
  </div>
  <div class="finish-time">2024</div>
</div>
```

### Skills as Personal Records
```html
<div class="pr-board">
  <h2 class="board-title">Personal Records</h2>
  <div class="pr-grid">
    <div class="pr-entry">
      <span class="event">JavaScript</span>
      <span class="time">5+ years</span>
      <span class="badge">PR</span>
    </div>
    <div class="pr-entry">
      <span class="event">React</span>
      <span class="time">4+ years</span>
    </div>
  </div>
</div>
```

### Timeline as Race Progression
```html
<div class="race-timeline">
  <div class="timeline-marker start">
    <span class="marker-label">Start</span>
    <span class="marker-year">2018</span>
  </div>
  <div class="timeline-track">
    <div class="split-marker" style="left: 25%">
      <span class="split-label">First Dev Role</span>
    </div>
    <div class="split-marker" style="left: 50%">
      <span class="split-label">Senior Developer</span>
    </div>
    <div class="split-marker" style="left: 75%">
      <span class="split-label">Tech Lead</span>
    </div>
  </div>
  <div class="timeline-marker finish">
    <span class="marker-label">Current</span>
    <span class="marker-year">2024</span>
  </div>
</div>
```

### Contact as Race Registration
```html
<form class="race-registration">
  <h2 class="reg-title">Register for Contact</h2>
  <div class="bib-number-display">
    <span>Your Bib #</span>
    <span class="number">0047</span>
  </div>
  <div class="form-fields">
    <input type="text" placeholder="Name" class="reg-input" />
    <input type="email" placeholder="Email" class="reg-input" />
    <select class="reg-input">
      <option>Select Event</option>
      <option>Collaboration</option>
      <option>Consultation</option>
      <option>General Inquiry</option>
    </select>
    <textarea placeholder="Message" class="reg-input"></textarea>
  </div>
  <button class="starting-block-btn">Send Registration</button>
</form>
```

---

## 4. Micro-interactions

### Stopwatch Hover Effect
```css
.stopwatch-hover {
  position: relative;
  overflow: hidden;
}

.stopwatch-hover::before {
  content: '00:00:00';
  position: absolute;
  top: 0;
  left: 0;
  font-family: 'IBM Plex Mono', monospace;
  font-size: var(--text-xs);
  color: var(--timing-yellow);
  opacity: 0;
  transition: opacity 0.3s;
}

.stopwatch-hover:hover::before {
  opacity: 1;
  animation: timer-run 3s linear infinite;
}

@keyframes timer-run {
  0% { content: '00:00:00'; }
  33% { content: '00:00:01'; }
  66% { content: '00:00:02'; }
  100% { content: '00:00:03'; }
}
```

### Running Motion Scroll
```javascript
// Parallax running effect
const runningElements = document.querySelectorAll('.running-element');

window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const rate = scrolled * 0.5;
  
  runningElements.forEach(element => {
    element.style.transform = `translateX(${rate}px)`;
  });
});
```

### Starting Gun Button Click
```css
.gun-button {
  position: relative;
}

.gun-button::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100px;
  height: 100px;
  background: radial-gradient(circle, var(--timing-yellow) 0%, transparent 70%);
  transform: translate(-50%, -50%) scale(0);
  opacity: 0;
  pointer-events: none;
}

.gun-button:active::after {
  animation: gun-flash 0.5s ease-out;
}

@keyframes gun-flash {
  0% {
    transform: translate(-50%, -50%) scale(0);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(2);
    opacity: 0;
  }
}
```

---

## 5. Modern Implementation

### Contemporary Updates
1. **Glassmorphism on timing displays**
   ```css
   .modern-timing-board {
     background: rgba(26, 26, 26, 0.7);
     backdrop-filter: blur(10px);
     border: 1px solid rgba(255, 210, 63, 0.2);
   }
   ```

2. **Smooth gradients for depth**
   ```css
   .track-gradient {
     background: linear-gradient(135deg, 
       var(--track-red) 0%, 
       var(--track-orange) 100%
     );
   }
   ```

3. **Modern shadows and elevations**
   ```css
   .elevated-card {
     box-shadow: 
       0 4px 6px -1px rgba(0, 0, 0, 0.1),
       0 2px 4px -1px rgba(0, 0, 0, 0.06);
   }
   ```

### Accessibility Considerations
```css
/* High contrast mode support */
@media (prefers-contrast: high) {
  :root {
    --track-red: #FF0000;
    --lane-white: #FFFFFF;
    --timing-black: #000000;
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Focus indicators */
.focusable:focus-visible {
  outline: 3px solid var(--timing-yellow);
  outline-offset: 2px;
}
```

### Mobile-First Responsive
```css
/* Base mobile styles */
.container {
  padding: var(--space-4);
  max-width: 100%;
}

/* Tablet (768px) */
@media (min-width: 768px) {
  .container {
    padding: var(--space-8);
    max-width: 768px;
  }
}

/* Desktop (1024px) */
@media (min-width: 1024px) {
  .container {
    padding: var(--space-12);
    max-width: 1024px;
  }
}

/* Wide (1280px) */
@media (min-width: 1280px) {
  .container {
    max-width: 1280px;
  }
}
```

### Component Architecture
```typescript
// Example React component structure
interface RaceBibProps {
  number: string;
  event?: string;
  year?: string;
}

export const RaceBib: React.FC<RaceBibProps> = ({ 
  number, 
  event = "PORTFOLIO", 
  year = "2024" 
}) => {
  return (
    <div className="race-bib">
      <div className="bib-header">{event}</div>
      <div className="bib-number">{number}</div>
      <div className="bib-year">{year}</div>
    </div>
  );
};
```

---

## Implementation Checklist

### Phase 1: Foundation
- [ ] Set up color variables in CSS
- [ ] Import and configure fonts
- [ ] Create base spacing system
- [ ] Build responsive grid system

### Phase 2: Components
- [ ] Design and build race bib components
- [ ] Create stopwatch loader
- [ ] Implement lane divider patterns
- [ ] Build starting block buttons

### Phase 3: Layout
- [ ] Convert project section to race results
- [ ] Redesign skills as PR board
- [ ] Create timeline race progression
- [ ] Style contact form as registration

### Phase 4: Interactions
- [ ] Add hover animations
- [ ] Implement scroll effects
- [ ] Create button interactions
- [ ] Add loading states

### Phase 5: Polish
- [ ] Test accessibility
- [ ] Optimize for mobile
- [ ] Add dark mode support
- [ ] Performance optimization