import React, { useEffect, useRef } from 'react';

const App = () => {
  const heroRef = useRef(null);
  const scrollRevealElements = useRef([]);

  

  // Define colors based on the finalized Play.O aesthetic
  const colors = {
    darkPrimaryBg: '#121212',          // Main background, near black
    darkSecondaryBg: '#202020',        // Slightly lighter dark for alternating sections
    greenPrimary: '#0bda5e',           // User specified vibrant green (for accents, CTAs, single bullet color)
    bluePrimary: '#4D7BF1',            // Blue accent (for OKR icon, specific highlights if needed elsewhere)
    headlineGradientStart: '#00FFFF',  // Light blue/cyan for hero headline gradient
    headlineGradientEnd: '#E000FF',    // Pink/purple for hero headline gradient
    whiteText: '#FFFFFF',              // Pure white for primary text on dark backgrounds
    lightText: '#E0E0E0',              // Lighter grey for secondary text on dark backgrounds
    darkText: '#333333',               // Dark text (e.g., if any section ever had a light bg)
    subtleShadow: 'rgba(0, 0, 0, 0.2)', // Stronger shadow for dark theme elements
    textOnCardDark: '#C0C0C0',         // Slightly brighter text for readability on dark cards
  };

  // Custom styling for the hero headline text gradient
  const heroHeadlineGradientStyle = {
    backgroundImage: `linear-gradient(to right, ${colors.headlineGradientStart}, ${colors.headlineGradientEnd})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    textFillColor: 'transparent',
  };

  // Red gradient style for problem section heading
  const problemHeadingGradientStyle = {
    backgroundImage: 'linear-gradient(to right, #FF4444, #CC0000)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    textFillColor: 'transparent',
  };

  // Green gradient style for solution section heading
  const solutionHeadingGradientStyle = {
    backgroundImage: 'linear-gradient(to right, #0bda5e, #00AA44)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    textFillColor: 'transparent',
  };

  const solutionItems = [
    {
      title: "Capture & Develop",
      desc:
        "Flow seamlessly from abstract idea to actionable plan on a single canvas.",
    },
    {
      title: "Manage & Collaborate",
      desc:
        "Coordinate tasks, projects, and work in harmony with your team.",
    },
    {
      title: "Track Progress",
      desc:
        "Set clear objectives and track your path with focused tranquility.",
    },
    {
      title: "Visualize & Personalize",
      desc:
        "Gain clarity with powerful dashboards and a workspace that fits you.",
    },
    {
      title: "Optimize Time",
      desc:
        "Spend less time managing, and dramatically more time building.",
    },
  ];
  

  // Intersection Observer setup
  useEffect(() => {
    const observerInstance = new IntersectionObserver((entries) => { // Renamed to avoid conflict with outer 'observer' ref
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active'); // Use 'active' class for reveal
          observerInstance.unobserve(entry.target); // Use observerInstance here
        }
      });
    }, {
      threshold: 0.2, // Trigger when 20% of the element is visible
      rootMargin: '0px 0px -50px 0px' // Start animation slightly earlier
    });

    scrollRevealElements.current.forEach(el => {
      if (el) observerInstance.observe(el); // Use observerInstance here
    });

    // Cleanup function for the effect
    return () => {
      if (observerInstance) { // Use observerInstance here
        observerInstance.disconnect();
      }
    };
  }, []); // Empty dependency array means this runs once on mount

  // Function to add elements to the list for Intersection Observer
  const addScrollRevealRef = (el) => {
    if (el && !scrollRevealElements.current.includes(el)) { // Ensure element is unique
      scrollRevealElements.current.push(el);
      // 'scroll-reveal' class will handle initial hidden state and transition
      el.classList.add('scroll-reveal');
    }
  };


  return (
    <div className="app-container" style={{ backgroundColor: colors.darkPrimaryBg }}>
      {/* Import the Inter font */}
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      
      {/* Defined Custom CSS Styles for the entire page */}
      <style>
        {`
          /* Global Body Styles & Font */
          body { 
              font-family: 'Inter', sans-serif; 
              margin: 0;
              padding: 0;
              box-sizing: border-box; /* Ensure padding/border are included in element's total width/height */
              scroll-behavior: smooth;
              background-color: ${colors.darkPrimaryBg};
              color: ${colors.lightText};
          }

          :root {
  /* typography */
  --font-heading: 'Rubik', sans-serif;
  --font-body:    'Work Sans', sans-serif;

  /* dark backgrounds */
  --bg-card:      #1E1E1E;
  --bg-section:   #111111;
  --text-base:    #E0E0E0;
  --text-strong:  #FFFFFF;

  /* accent gradients */
  --accent-start: #00FFC6;
  --accent-end:   #FF00C8;
}
          .app-container {
              min-height: 100vh;
              display: flex;
              flex-direction: column;
          }

          /* General Section Padding */
          .section-padding {
              padding-top: 5rem;    /* py-20 */
              padding-bottom: 5rem; /* py-20 */
              padding-left: 1.5rem; /* px-6 */
              padding-right: 1.5rem; /* px-6 */
          }
          @media (min-width: 768px) { /* md */
            .section-padding {
                padding-left: 3rem; /* md:px-12 */
                padding-right: 3rem; /* md:px-12 */
            }
          }
          @media (min-width: 1024px) { /* lg */
            .section-padding {
                padding-top: 8rem;    /* lg:py-32 */
                padding-bottom: 8rem; /* lg:py-32 */
                padding-left: 6rem;   /* lg:px-24 */
                padding-right: 6rem;  /* lg:px-24 */
            }
          }
          .max-width-content {
              max-width: 72rem; /* max-w-6xl */
              margin-left: auto;
              margin-right: auto;
          }
          .text-center-desktop {
            text-align: center;
          }
          @media (max-width: 767px) { /* Apply text-center for mobile */
            .text-center-mobile {
              text-align: center;
            }
          }

          /* Scroll Reveal Animation */
          .scroll-reveal {
              opacity: 0;
              transform: translateY(20px);
              transition: opacity 0.6s ease-out, transform 0.6s ease-out;
          }
          .scroll-reveal.active {
              opacity: 1;
              transform: translateY(0);
          }

          /* Animation Keyframes */
          @keyframes fadeInUp {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
          }
          .animate-fade-in-up { animation: fadeInUp 1s ease-out forwards; }
          .animate-fade-in { animation: fadeIn 1s ease-out forwards; }
          /* Animation delays */
          .delay-200 { animation-delay: 0.2s; } .delay-400 { animation-delay: 0.4s; }
          .delay-600 { animation-delay: 0.6s; } .delay-800 { animation-delay: 0.8s; }
          .delay-900 { animation-delay: 0.9s; } .delay-1000 { animation-delay: 1.0s; }
          .delay-1100 { animation-delay: 1.1s; } .delay-1200 { animation-delay: 1.2s; }

          /* Hero Section Specifics */
          .hero-section {
              position: relative;
              display: flex;
              align-items: center;
              min-height: 100vh;
              overflow: hidden;
              padding-top: 4rem; /* pt-16 */
              color: ${colors.whiteText};
              background-color: ${colors.darkPrimaryBg};
          }
          .hero-background-elements {
              position: absolute;
              inset: 0;
              z-index: 0;
              opacity: 0.2;
          }
          .hero-background-circle-1 {
              position: absolute;
              width: 10rem; height: 10rem; /* w-40 h-40 */
              border-radius: 50%;
              top: 25%; left: 25%;
              transform: translate(-50%, -50%);
              filter: blur(3rem); /* blur-3xl */
              opacity: 0.5;
              background-color: ${colors.greenPrimary};
          }
          .hero-background-circle-2 {
              position: absolute;
              width: 15rem; height: 15rem; /* w-60 h-60 */
              border-radius: 50%;
              bottom: 25%; right: 25%;
              transform: translate(50%, 50%);
              filter: blur(3rem);
              opacity: 0.5;
              background-color: #4D7BF1; /* Blue accent */
          }
          .hero-background-circle-3 {
              position: absolute;
              width: 8rem; height: 8rem; /* w-32 h-32 */
              border-radius: 50%;
              top: 50%; left: 50%;
              transform: translate(-50%, -50%);
              filter: blur(3rem);
              opacity: 0.5;
              background-color: #A020F0; /* Purple accent */
          }
          .hero-content {
              position: relative;
              z-index: 1;
              max-width: 48rem; /* max-w-4xl */
              width: 100%;
              margin-left: auto;
              margin-right: auto;
              text-align: left;
              padding-left: 1.5rem; /* px-6 */
              padding-right: 1.5rem; /* px-6 */
          }
          @media (min-width: 768px) { /* md */
            .hero-content {
                padding-left: 3rem; /* md:px-12 */
                padding-right: 3rem; /* md:px-12 */
            }
          }
          @media (min-width: 1024px) { /* lg */
            .hero-content {
                padding-left: 6rem; /* lg:px-24 */
                padding-right: 6rem; /* lg:px-24 */
            }
          }
          .hero-headline {
              font-size: 2.25rem; /* text-4xl */
              line-height: 2.5rem; /* leading-10 */
              font-weight: 800; /* font-extrabold */
              margin-bottom: 1.5rem; /* mb-6 */
          }
          @media (min-width: 768px) { /* md */
            .hero-headline {
                font-size: 3.75rem; /* md:text-6xl */
                line-height: 1;
            }
          }
          @media (min-width: 1024px) { /* lg */
            .hero-headline {
                font-size: 4.5rem; /* lg:text-7xl */
            }
          }
          .hero-subheadline {
              font-size: 1.125rem; /* text-lg */
              line-height: 1.75rem; /* leading-7 */
              font-weight: 300; /* font-light */
              margin-bottom: 2.5rem; /* mb-10 */
              color: ${colors.lightText};
          }
          @media (min-width: 768px) { /* md */
            .hero-subheadline {
                font-size: 1.25rem; /* md:text-xl */
            }
          }
          @media (min-width: 1024px) { /* lg */
            .hero-subheadline {
                font-size: 1.5rem; /* lg:text-2xl */
            }
          }
          .hero-cta-wrapper {
            /* flex items-center justify-center */
          }
          .hero-cta-button {
              padding: 1rem 2rem; /* px-8 py-4 */
              border-radius: 0.5rem; /* rounded-lg */
              background-color: ${colors.greenPrimary};
              color: ${colors.whiteText};
              font-size: 1.125rem; /* text-lg */
              font-weight: 600; /* font-semibold */
              box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); /* shadow-xl */
              display: inline-block; /* For proper padding and hover */
              position: relative;
              overflow: hidden;
          }
          .hero-key-features-text {
              position: absolute;
              bottom: 2.5rem; /* bottom-10 */
              left: 50%;
              transform: translateX(-50%);
              text-align: center;
              color: ${colors.whiteText};
              font-size: 1.25rem; /* text-xl */
              font-weight: 600; /* font-semibold */
          }

          /* Problem/Solution Sections - Shared Styles */
          /* Flex-based horizontal cards */
          /* Container stays the same */
.section-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
  margin-top: 2rem;
}

/* Card */
.section-card {
  position: relative;
  background: var(--bg-card);
  border-radius: 12px;
  overflow: hidden;
  padding: 1.75rem;
  width: 100%;
  max-width: 18rem;
  box-shadow: 0 6px 20px rgba(0,0,0,0.5);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  font-family: var(--font-body);
}

.section-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 10px 28px rgba(0,0,0,0.7);
}

/* Neon stripe */
.section-card .card-accent {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 4px;
  background: linear-gradient(
    90deg,
    var(--accent-start),
    var(--accent-end)
  );
}

/* Title */
.card-title {
  margin: 0 0 0.5rem;
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-strong);
}

/* Description */
.card-desc {
  margin: 0;
  font-size: 1rem;
  line-height: 1.6;
  color: var(--text-base);
}

/* Section heading gradient */
.section-heading {
  font-family: var(--font-heading);
  background: linear-gradient(
    to right,
    var(--accent-start),
    var(--accent-end)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1.5rem;
  text-align: center;
}

/* Problem Cards - Red Theme */
.problem-card {
  position: relative;
  background: rgba(30, 30, 30, 0.95);
  border: 1px solid rgba(255, 68, 68, 0.3);
  border-radius: 12px;
  overflow: hidden;
  padding: 1.75rem;
  width: 100%;
  max-width: 18rem;
  box-shadow: 0 6px 20px rgba(255, 68, 68, 0.2);
  transition: all 0.3s ease;
  font-family: var(--font-body);
}

.problem-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 10px 28px rgba(255, 68, 68, 0.4);
  border-color: rgba(255, 68, 68, 0.5);
  background: rgba(40, 20, 20, 0.95);
}

/* Red gradient stripe */
.problem-card .card-accent {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 4px;
  background: linear-gradient(90deg, #FF4444, #CC0000);
}

/* Problem card title with red accent */
.problem-card .card-title {
  margin: 0 0 0.5rem;
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 600;
  color: #FF6B6B;
  text-shadow: 0 0 10px rgba(255, 68, 68, 0.3);
}

/* Problem card description */
.problem-card .card-desc {
  margin: 0;
  font-size: 1rem;
  line-height: 1.6;
  color: #E0B0B0;
}

/* Solution Cards - Green Theme */
.solution-card {
  position: relative;
  background: rgba(30, 30, 30, 0.95);
  border: 1px solid rgba(11, 218, 94, 0.3);
  border-radius: 12px;
  overflow: hidden;
  padding: 1.75rem;
  width: 100%;
  max-width: 18rem;
  box-shadow: 0 6px 20px rgba(11, 218, 94, 0.2);
  transition: all 0.3s ease;
  font-family: var(--font-body);
}

.solution-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 10px 28px rgba(11, 218, 94, 0.4);
  border-color: rgba(11, 218, 94, 0.5);
  background: rgba(20, 40, 20, 0.95);
}

/* Green gradient stripe */
.solution-card .card-accent {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 4px;
  background: linear-gradient(90deg, #0bda5e, #00AA44);
}

/* Solution card title with green accent */
.solution-card .card-title {
  margin: 0 0 0.5rem;
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 600;
  color: #4ADE80;
  text-shadow: 0 0 10px rgba(11, 218, 94, 0.3);
}

/* Solution card description */
.solution-card .card-desc {
  margin: 0;
  font-size: 1rem;
  line-height: 1.6;
  color: #B0E0B0;
}



          /* Features Section */
          .features-grid {
              display: grid;
              grid-template-columns: 1fr; /* Default to single column */
              gap: 2.5rem; /* gap-10 */
              margin-top: 4rem; /* For spacing below heading */
          }
          @media (min-width: 768px) { /* md */
            .features-grid {
                grid-template-columns: repeat(2, minmax(0, 1fr)); /* md:grid-cols-2 */
            }
          }
          @media (min-width: 1024px) { /* lg */
            .features-grid {
                grid-template-columns: repeat(3, minmax(0, 1fr)); /* lg:grid-cols-3 */
            }
          }
          .feature-card {
              padding: 2rem; /* p-8 */
              display: flex;
              flex-direction: column;
              align-items: center;
              text-align: center;
              border-radius: 1rem; /* rounded-2xl */
              /* Glassmorphism effect */
              background: rgba(255, 255, 255, 0.05);
              backdrop-filter: blur(20px);
              -webkit-backdrop-filter: blur(20px);
              border: 1px solid rgba(255, 255, 255, 0.1);
              box-shadow: 
                0 8px 32px rgba(0, 0, 0, 0.3),
                inset 0 1px 0 rgba(255, 255, 255, 0.1),
                inset 0 -1px 0 rgba(255, 255, 255, 0.05);
              color: ${colors.lightText};
              position: relative;
              overflow: hidden;
              transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          }
          .feature-card::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0));
              pointer-events: none;
              transition: opacity 0.3s ease;
              opacity: 0;
          }
          .feature-card:hover {
              transform: translateY(-8px) scale(1.02); /* enhanced lift and scale */
              box-shadow: 
                0 20px 60px rgba(0, 0, 0, 0.4),
                0 8px 32px rgba(0, 0, 0, 0.2),
                inset 0 1px 0 rgba(255, 255, 255, 0.2),
                inset 0 -1px 0 rgba(255, 255, 255, 0.1);
              border-color: rgba(255, 255, 255, 0.2);
              background: rgba(255, 255, 255, 0.08);
          }
          .feature-card:hover::before {
              opacity: 1;
          }
          .feature-icon-wrapper {
              width: 6rem; height: 6rem; /* w-24 h-24 */
              margin-bottom: 1.5rem; /* mb-6 */
              border-radius: 50%;
              /* Enhanced glassmorphism for icon wrapper */
              background: rgba(255, 255, 255, 0.1);
              backdrop-filter: blur(10px);
              -webkit-backdrop-filter: blur(10px);
              border: 1px solid rgba(255, 255, 255, 0.15);
              display: flex;
              align-items: center;
              justify-content: center;
              position: relative;
              overflow: hidden;
              transition: all 0.3s ease;
              box-shadow: 
                0 8px 25px rgba(0, 0, 0, 0.2),
                inset 0 1px 0 rgba(255, 255, 255, 0.2);
          }
          .feature-icon-wrapper::before {
              content: '';
              position: absolute;
              top: -50%;
              left: -50%;
              width: 200%;
              height: 200%;
              background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
              transform: rotate(45deg);
              transition: transform 0.6s ease;
              opacity: 0;
          }
          .feature-card:hover .feature-icon-wrapper {
              transform: scale(1.1) rotate(5deg);
              background: rgba(255, 255, 255, 0.15);
              box-shadow: 
                0 12px 35px rgba(0, 0, 0, 0.3),
                inset 0 1px 0 rgba(255, 255, 255, 0.3);
          }
          .feature-card:hover .feature-icon-wrapper::before {
              opacity: 1;
              transform: rotate(45deg) translate(50%, 50%);
          }
          .feature-icon {
              width: 3rem; height: 3rem; /* w-12 h-12 */
              color: currentColor; /* Use text color from parent */
              transition: all 0.3s ease;
              filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3));
          }
          .feature-card:hover .feature-icon {
              transform: scale(1.1);
              filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.4));
          }
          .feature-card h3 {
              font-size: 1.5rem; /* text-2xl */
              font-weight: 600; /* font-semibold */
              margin-bottom: 0.75rem; /* mb-3 */
              color: ${colors.whiteText};
              text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
              transition: all 0.3s ease;
          }
          .feature-card:hover h3 {
              color: rgba(255, 255, 255, 0.95);
              text-shadow: 0 2px 12px rgba(0, 0, 0, 0.4);
          }
          .feature-card p {
              line-height: 1.6;
              margin-bottom: 1.5rem; /* mb-6 */
              color: ${colors.lightText};
              text-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
              transition: color 0.3s ease;
          }
          .feature-card:hover p {
              color: rgba(224, 224, 224, 0.9);
          }
          .feature-card-link {
              font-weight: 600; /* font-semibold */
              text-decoration: none;
              margin-top: 1rem; /* mt-4 */
              padding: 0.5rem 1rem;
              border-radius: 0.5rem;
              background: rgba(255, 255, 255, 0.05);
              border: 1px solid rgba(255, 255, 255, 0.1);
              backdrop-filter: blur(10px);
              -webkit-backdrop-filter: blur(10px);
              transition: all 0.3s ease;
              position: relative;
              overflow: hidden;
          }
          .feature-card-link::before {
              content: '';
              position: absolute;
              top: 0;
              left: -100%;
              width: 100%;
              height: 100%;
              background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
              transition: left 0.5s ease;
          }
          .feature-card-link:hover {
              background: rgba(255, 255, 255, 0.1);
              border-color: rgba(255, 255, 255, 0.2);
              transform: translateY(-2px);
              box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          }
          .feature-card-link:hover::before {
              left: 100%;
          }

          /* CTA Section */
          .cta-section {
            background-color: ${colors.greenPrimary}; /* Solid green background */
            color: ${colors.whiteText};
            text-align: center;
          }
          .cta-headline {
            font-size: 2.25rem; /* text-4xl */
            line-height: 2.5rem;
            font-weight: 700; /* font-bold */
            margin-bottom: 2rem; /* mb-8 */
          }
          @media (min-width: 768px) { /* md */
            .cta-headline {
                font-size: 3rem; /* md:text-5xl */
            }
          }
          .cta-subheadline {
            font-size: 1.25rem; /* text-xl */
            line-height: 1.75rem;
            font-weight: 300; /* font-light */
            margin-bottom: 3rem; /* mb-12 */
          }
          @media (min-width: 768px) { /* md */
            .cta-subheadline {
                font-size: 1.5rem; /* md:text-2xl */
            }
          }
          .cta-button {
              padding: 1.25rem 2.5rem; /* px-10 py-5 */
              border-radius: 0.5rem; /* rounded-lg */
              background-color: ${colors.whiteText};
              color: ${colors.greenPrimary};
              font-size: 1.25rem; /* text-xl */
              font-weight: 700; /* font-bold */
              box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); /* shadow-2xl */
              display: inline-block;
              transition: background-color 0.3s ease-out;
          }
          .cta-button:hover {
              background-color: rgba(255,255,255,0.9); /* hover:bg-gray-100 */
          }
          .cta-small-text {
            margin-top: 2rem; /* mt-8 */
            font-size: 0.875rem; /* text-sm */
            opacity: 0.8;
          }
          
          /* Footer */
          .footer-section {
            background-color: ${colors.darkPrimaryBg};
            color: ${colors.lightText};
            padding-top: 3rem; padding-bottom: 3rem; /* py-12 */
            padding-left: 1.5rem; padding-right: 1.5rem; /* px-6 */
          }
          @media (min-width: 768px) { /* md */
            .footer-section {
                padding-left: 3rem; padding-right: 3rem; /* md:px-12 */
            }
          }
          @media (min-width: 1024px) { /* lg */
            .footer-section {
                padding-left: 6rem; padding-right: 6rem; /* lg:px-24 */
            }
          }
          .footer-content {
            max-width: 72rem; /* max-w-6xl */
            margin-left: auto;
            margin-right: auto;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            text-align: center;
            gap: 1.5rem; /* space-y-6 */
          }
          @media (min-width: 768px) { /* md */
            .footer-content {
                flex-direction: row;
                text-align: left;
                gap: 0;
            }
          }
          .footer-logo {
              font-size: 1.5rem; /* text-2xl */
              font-weight: 800; /* font-extrabold */
              display: flex;
              align-items: center;
          }
          .footer-logo svg {
            width: 1.5rem; height: 1.5rem; /* w-6 h-6 */
            margin-right: 0.5rem; /* mr-2 */
            color: ${colors.greenPrimary};
          }
          .footer-links {
            display: flex;
            gap: 1.5rem; /* space-x-6 */
            font-size: 0.875rem; /* text-sm */
          }
          .footer-links a {
            color: ${colors.lightText};
            text-decoration: none;
            transition: color 0.2s ease;
          }
          .footer-links a:hover {
            color: ${colors.greenPrimary};
          }
          .footer-copyright {
            font-size: 0.875rem; /* text-sm */
            opacity: 0.7;
          }

        `}
      </style>

      {/* Hero Section */}
      <section id="hero" ref={heroRef} className="hero-section">
        {/* Abstract background elements (placeholders for Whisk output) */}
        <div className="hero-background-elements">
            <div className="hero-background-circle-1" style={{ backgroundColor: colors.greenPrimary }}></div>
            <div className="hero-background-circle-2"></div>
            <div className="hero-background-circle-3"></div>
        </div>

        {/* Hero Content (left-aligned) */}
        <div className="hero-content">
            <div>
                <h1 className="hero-headline animate-fade-in-up text-lift-hover hero-headline-gradient" style={heroHeadlineGradientStyle}>
                    Veridian: <br/>Revolutionize <br/>Your Developer Flow.
                </h1>
                <p className="hero-subheadline animate-fade-in delay-200">
                    The ultimate productivity tool for developers, designed to
                    streamline your workflow and help you build better software, faster.
                </p>
                <div className="animate-fade-in delay-400">
                    <a href="#" className="hero-cta-button hero-cta">
                        Get Started for Free
                    </a>
                </div>
            </div>
        </div>
      </section>

      <section
  id="product"
  className="section-padding"
  style={{ backgroundColor: colors.darkPrimaryBg }}
>
  <div ref={addScrollRevealRef} className="max-width-content">
    <h2
      className="section-heading animate-fade-in-up delay-200 text-lift-hover"
      style={problemHeadingGradientStyle}
    >
      These Productivity Killers Are Destroying Your Flow
    </h2>

    <div className="section-content-wrapper">

      <div className="section-cards">
  {[
    {
      title: "Fragmented Knowledge",
      desc:
        "Information scattered across disparate tools, making context retrieval a nightmare.",
    },
    {
      title: "Lost Focus",
      desc:
        "Difficulty maintaining momentum and hitting critical deadlines due to constant context switching.",
    },
    {
      title: "Creative Blocks",
      desc:
        "Breakthroughs stifled by disorganization and unclear paths, hindering innovation.",
    },
    {
      title: "Collaboration Chaos",
      desc:
        "Miscommunication and bottlenecks slowing your team.",
    },
    {
      title: "Wasted Time",
      desc:
        "Valuable hours spent managing, not building – draining your productive energy.",
    },
  ].map((item, i) => (
    <div
      key={item.title}
      className="problem-card animate-fade-in"
      style={{ animationDelay: `${0.2 + i * 0.1}s` }}
      ref={addScrollRevealRef}
    >
      <div className="card-accent" />
      <h4 className="card-title">{item.title}</h4>
      <p className="card-desc">{item.desc}</p>
    </div>
  ))}
</div>

    
    </div>
  </div>
</section>


<section id="solution" className="section-padding" style={{ backgroundColor: colors.darkSecondaryBg }}>
  <div ref={addScrollRevealRef} className="max-width-content">
    <h2 className="section-heading animate-fade-in-up delay-200 text-lift-hover" style={solutionHeadingGradientStyle}>
      The All-in-One Solution for Developer Productivity.
    </h2>
    <div className="section-content-wrapper">

      {/* ←— NEW CARDS LAYOUT —→ */}
      <div className="section-cards">
        {solutionItems.map((item, idx) => (
          <div
            key={item.title}
            className="solution-card animate-fade-in"
            style={{ animationDelay: `${0.6 + idx * 0.1}s` }}
            ref={addScrollRevealRef}
          >
            <div className="card-accent" />
            <h4 className="card-title">{item.title}</h4>
            <p className="card-desc">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>


      {/* Features Section - NO BOXES */}
      <section id="features" className="section-padding" style={{ backgroundColor: colors.darkPrimaryBg }}>
        <div ref={addScrollRevealRef} className="max-width-content">
          <h2 className="section-heading animate-fade-in-up delay-200">
            Key Features Designed for Developers.
          </h2>
          <div className="features-grid">
            {/* Feature Item 1: Idea Canvas */}
            <div className="feature-card animate-fade-in delay-400" style={{ backgroundColor: colors.darkSecondaryBg }}>
              <div className="feature-icon-wrapper">
                <svg className="feature-icon" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              </div>
              <h3 className="text-2xl font-semibold text-white-text mb-3 text-lift-hover">Idea Canvas</h3>
              <p className="feature-card-text">
                Capture, organize, and connect every spark of inspiration on a dynamic visual workspace.
              </p>
              <a href="#" className="feature-card-link" style={{ color: colors.greenPrimary }}>Learn More &rarr;</a>
            </div>

            {/* Feature Item 2: OKR Tracking */}
            <div className="feature-card animate-fade-in delay-600" style={{ backgroundColor: colors.darkSecondaryBg }}>
              <div className="feature-icon-wrapper">
                <svg className="feature-icon" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ color: colors.bluePrimary }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5 5 0 000 12h16.71a5 5 0 005-4.99L17 11.71a5 5 0 00-.99-9.32L3.99 6z"/></svg>
              </div>
              <h3 className="text-2xl font-semibold text-white-text mb-3 text-lift-hover">OKR Tracking</h3>
              <p className="feature-card-text">
                Define bold objectives, track key results, and achieve measurable growth effortlessly.
              </p>
              <a href="#" className="feature-card-link" style={{ color: colors.bluePrimary }}>Learn More &rarr;</a>
            </div>

            {/* Feature Item 3: Seamless Collaboration */}
            <div className="feature-card animate-fade-in delay-800" style={{ backgroundColor: colors.darkSecondaryBg }}>
              <div className="feature-icon-wrapper">
                <svg className="feature-icon" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17 20h-5m-5 0h5m5 0a2 2 0 11-4 0 2 2 0 014 0zM12 15V8m-4 7v-4m8 4v-4m-4 4a2 2 0 11-4 0 2 2 0 014 0zM12 10V5m-4 5v-2m8 2v-2m-4 5a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
              </div>
              <h3 className="text-2xl font-semibold text-white-text mb-3 text-lift-hover">Seamless Collaboration</h3>
              <p className="feature-card-text">
                Collaborate effortlessly with your team to bring shared visions to life.
              </p>
              <a href="#" className="feature-card-link" style={{ color: colors.greenPrimary }}>Learn More &rarr;</a>
            </div>
          </div>
        </div>
      </section>

      {/* Secondary Call to Action Section */}
      <section id="cta" className="section-padding cta-section" style={{ backgroundColor: colors.greenPrimary }}>
        <div ref={addScrollRevealRef} className="max-width-content">
          <h2 className="section-heading animate-fade-in-up delay-200">
            Unlock Your Potential.
          </h2>
          <p className="text-xl md:text-2xl font-light mb-12 animate-fade-in delay-400">
            Join Veridian today and bring unparalleled clarity to your projects and goals.
          </p>
          <a href="#" className="px-10 py-5 rounded-lg bg-white text-green-500 text-xl font-bold shadow-2xl hover:bg-gray-100 transition-all duration-300 relative overflow-hidden hero-cta animate-fade-in delay-600">
            Sign Up Now
          </a>
          <p className="mt-8 text-sm opacity-80 animate-fade-in delay-800">No credit card required. Free forever plan available.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="section-padding" style={{ backgroundColor: colors.darkPrimaryBg, color: colors.lightText }}>
        <div className="max-width-content footer-content">
          <div className="footer-logo">
            <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 12l10 10 10-10L12 2zM12 17.1L6.9 12 12 6.9 17.1 12 12 17.1z"/>
            </svg>
            Veridian
          </div>
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Contact Us</a>
          </div>
          <p className="footer-copyright">&copy; 2025 Veridian. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
