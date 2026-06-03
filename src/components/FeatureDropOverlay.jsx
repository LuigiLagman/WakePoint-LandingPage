import { useEffect, useRef, useState, useCallback } from "react";

import feature1 from "../assets/images/feature_1.png";
import feature2 from "../assets/images/feature_2.png";
import feature3 from "../assets/images/feature_3.png";

const GRAVITY = 0.6;
const AIR_DRAG = 0.985;
const THROW_SMOOTH = 0.65;

const WALL_BOUNCE = 0.55;

// rotation stability
const ROTATION_DRAG = 0.85;
const ROTATION_LIMIT = 0.35;
const UPRIGHT_FORCE = 0.02;

// Performance optimization - only check collisions every N frames
const COLLISION_FRAMESKIP = 1; // Changed to 1 for better collision detection
const COLLISION_SUBSAMPLING = 1; // Changed to 1 to check all pairs

// base sizes
const IMAGE_SIZES = {
  1: { w: 304, h: 162 },
  2: { w: 246, h: 236 },
  3: { w: 262, h: 160 },
};

// size emphasis for visuals
const SIZE_BIAS = {
  1: 1.12, // wide (slightly bigger)
  2: 1.0,  // circle (unchanged)
  3: 1.15, // wide (slightly bigger)
};

function FeatureDropOverlay({ active, onClear }) {
  const [items, setItems] = useState([]);
  const [hoveredId, setHoveredId] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const [error, setError] = useState(null);
  const animationRef = useRef(null);
  const startTimeRef = useRef(null);
  const exitStartTimeRef = useRef(null);
  const frameCounterRef = useRef(0);
  const resizeTimeoutRef = useRef(null);
  const touchStartRef = useRef(null);
  const swipeThreshold = 50; // Minimum distance for swipe

  const itemsRef = useRef([]);
  const lastPointer = useRef({ x: 0, y: 0, t: 0 });
  const lastRender = useRef(0);

  // -------------------------
  // ERROR BOUNDARY
  // -------------------------
  const safePhysicsUpdate = useCallback((updateFn) => {
    try {
      return updateFn();
    } catch (err) {
      console.error('Physics error:', err);
      setError('Physics simulation encountered an error. Resetting...');
      
      // Reset to safe state
      setTimeout(() => {
        setError(null);
        if (active) {
          // Re-initialize items
          const initial = [
            createItem(1, feature1, 0),
            createItem(2, feature2, 1),
            createItem(3, feature3, 2),
          ];
          itemsRef.current = initial;
          setItems(initial);
        }
      }, 2000);
      
      return null;
    }
  }, [active]);

  // -------------------------
  // RESPONSIVE SCALE
  // -------------------------
  const getScale = () => {
    const w = window.innerWidth;

    if (w < 480) return 0.35;
    if (w < 768) return 0.45;
    if (w < 1200) return 0.55;
    return 0.65;
  };

  // -------------------------
  // SIZE CALC (WITH BIAS)
  // -------------------------
  const getSize = (id) => {
    const base = IMAGE_SIZES[id];
    const scale = getScale();
    const bias = SIZE_BIAS[id] ?? 1;

    return {
      w: base.w * scale * bias,
      h: base.h * scale * bias,
    };
  };

  // -------------------------
  // PERFORMANCE: Debounced resize handler
  // -------------------------
  useEffect(() => {
    const handleResize = () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      
      resizeTimeoutRef.current = setTimeout(() => {
        if (!active || isClosing) return;
        
        // Reposition items that go out of bounds on window resize
        itemsRef.current = itemsRef.current.map(item => {
          const size = getSize(item.id);
          return {
            ...item,
            x: Math.min(Math.max(item.x, 0), window.innerWidth - size.w),
            y: Math.min(Math.max(item.y, 0), window.innerHeight - size.h)
          };
        });
        
        setItems([...itemsRef.current]);
      }, 150); // Debounce resize events
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, [active, isClosing]);

  const handleClear = () => {
    setIsClosing(true);
    exitStartTimeRef.current = performance.now();
    
    // Apply exit velocities to all items - throw them back down
    itemsRef.current = itemsRef.current.map((item) => {
      // Calculate direction for exit throw (downward with some horizontal variation)
      const exitDirectionX = (Math.random() - 0.5) * 15; // Random horizontal
      const exitDirectionY = 12 + Math.random() * 8; // Strong downward force
      
      // Add extra spin on exit
      const exitSpin = (Math.random() - 0.5) * 0.4;
      
      return {
        ...item,
        vx: (item.vx * 0.5) + exitDirectionX,
        vy: exitDirectionY,
        vr: item.vr + exitSpin,
        dragging: false, // Ensure no dragging during exit
      };
    });

    setTimeout(() => {
      setIsClosing(false);
      // Stop physics animation
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      onClear?.();
    }, 800); // Slightly longer for more dramatic exit
  };

  const createItem = (id, img, index) => {
    const windowWidth = window.innerWidth;
    
    // Stronger starting velocities for more dramatic throw
    let startX;
    let vx;
    let vy;
    let vr;
    
    // Staggered timing for each image
    const delay = index * 80; // Slightly faster staggering
    
    switch(index) {
      case 0: // First image - left side, thrown right and up
        startX = windowWidth * 0.15 + (Math.random() - 0.5) * 60;
        vx = 12 + Math.random() * 6; // Strong throw right
        vy = -22 - Math.random() * 8; // Strong upward throw
        vr = -0.2 + (Math.random() * 0.3); // Counter-clockwise spin
        break;
      case 1: // Second image - center, thrown straight up with slight random
        startX = windowWidth * 0.5 + (Math.random() - 0.5) * 80;
        vx = (Math.random() - 0.5) * 10; // Moderate left or right
        vy = -25 - Math.random() * 7; // Highest throw
        vr = (Math.random() - 0.5) * 0.35; // Random spin
        break;
      case 2: // Third image - right side, thrown left and up
        startX = windowWidth * 0.85 + (Math.random() - 0.5) * 60;
        vx = -12 - Math.random() * 6; // Strong throw left
        vy = -22 - Math.random() * 8; // Strong upward throw
        vr = 0.2 + (Math.random() * 0.3); // Clockwise spin
        break;
      default:
        startX = windowWidth / 2;
        vx = (Math.random() - 0.5) * 15;
        vy = -20 - Math.random() * 10;
        vr = (Math.random() - 0.5) * 0.4;
    }
    
    return {
      id,
      img,
      x: startX,
      y: window.innerHeight + 80, // Start slightly lower for more dramatic effect
      vx: vx,
      vy: vy,
      rotation: (Math.random() - 0.5) * 0.4, // More initial rotation
      vr: vr,
      dragging: false,
      dragOffsetX: 0,
      dragOffsetY: 0,
      delay: delay,
      hasStarted: false,
      scale: 0.7, // Start slightly smaller for "spring" effect
    };
  };

  // Initialize items when active becomes true
  useEffect(() => {
    if (active) {
      // Reset closing state and errors
      setIsClosing(false);
      setError(null);
      startTimeRef.current = performance.now();
      frameCounterRef.current = 0;
      
      // Create fresh items with staggered delays
      const initial = [
        createItem(1, feature1, 0),
        createItem(2, feature2, 1),
        createItem(3, feature3, 2),
      ];

      itemsRef.current = initial;
      setItems(initial);
      
      // Start physics animation
      startPhysics();
    } else {
      // Clean up animation when inactive
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      // Clear items when inactive
      setItems([]);
      itemsRef.current = [];
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [active]);

  // -------------------------
  // FIXED: Optimized collision detection with proper ellipse collision
  // -------------------------
  const updateCollisions = (state) => {
    // Skip collision detection on some frames for performance
    frameCounterRef.current++;
    if (frameCounterRef.current % COLLISION_FRAMESKIP !== 0) {
      return state;
    }
    
    // Check all pairs for collision
    for (let i = 0; i < state.length; i++) {
      for (let j = i + 1; j < state.length; j++) {
        const a = state[i];
        const b = state[j];
        
        // Skip collision if either hasn't started yet or is being dragged
        if (!a.hasStarted || !b.hasStarted) continue;
        if (a.dragging || b.dragging) continue;
        
        // Get accurate sizes for both items
        const as = getSize(a.id);
        const bs = getSize(b.id);

        // Get center positions
        const ax = a.x + as.w / 2;
        const ay = a.y + as.h / 2;
        const bx = b.x + bs.w / 2;
        const by = b.y + bs.h / 2;

        // Calculate distance between centers
        const dx = ax - bx;
        const dy = ay - by;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Calculate collision radius (using average of width and height for better ellipse approximation)
        const radiusA = (as.w + as.h) / 4;
        const radiusB = (bs.w + bs.h) / 4;
        const minDistance = radiusA + radiusB;

        // Check if colliding
        if (distance < minDistance) {
          // Calculate collision response
          const overlap = minDistance - distance;
          const angle = Math.atan2(dy, dx);
          
          // Calculate push amounts (inverse mass ratio - both have same "mass")
          const pushX = Math.cos(angle) * overlap * 0.5;
          const pushY = Math.sin(angle) * overlap * 0.5;
          
          // Apply position correction
          state[i].x += pushX;
          state[i].y += pushY;
          state[j].x -= pushX;
          state[j].y -= pushY;
          
          // Calculate relative velocity
          const relVelX = state[j].vx - state[i].vx;
          const relVelY = state[j].vy - state[i].vy;
          
          // Calculate relative velocity along collision normal
          const normalX = Math.cos(angle);
          const normalY = Math.sin(angle);
          const velAlong = relVelX * normalX + relVelY * normalY;
          
          // Don't resolve if velocities are separating
          if (velAlong > 0) continue;
          
          // Calculate restitution (bounce factor)
          const restitution = 0.55;
          
          // Calculate impulse scalar
          const impulseScalar = -(1 + restitution) * velAlong;
          
          // Apply impulse (both have same "mass" of 1)
          const impulseX = impulseScalar * normalX;
          const impulseY = impulseScalar * normalY;
          
          state[i].vx -= impulseX;
          state[i].vy -= impulseY;
          state[j].vx += impulseX;
          state[j].vy += impulseY;
          
          // Add rotational transfer on collision based on impact angle
          const impactSpeed = Math.abs(velAlong);
          const rotationImpulse = impactSpeed * 0.1;
          
          state[i].vr += (Math.random() - 0.5) * rotationImpulse;
          state[j].vr += (Math.random() - 0.5) * rotationImpulse;
          
          // Clamp rotation to reasonable values
          state[i].vr = Math.min(Math.max(state[i].vr, -0.3), 0.3);
          state[j].vr = Math.min(Math.max(state[j].vr, -0.3), 0.3);
        }
      }
    }
    
    return state;
  };

  // -------------------------
  // PHYSICS LOOP with error boundary
  // -------------------------
  const startPhysics = () => {
    // Cancel any existing animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    const update = (time) => {
      // Error boundary for the entire update
      safePhysicsUpdate(() => {
        // Stop if not active
        if (!active) {
          animationRef.current = requestAnimationFrame(update);
          return;
        }
        
        let state = itemsRef.current;
        
        // Skip if no items
        if (!state.length) {
          animationRef.current = requestAnimationFrame(update);
          return;
        }
        
        const currentTime = performance.now();
        const elapsedTime = currentTime - (startTimeRef.current || currentTime);

        // -------------------------
        // MOVEMENT (with delay handling and exit animation)
        // -------------------------
        state = state.map((item) => {
          // Handle exit animation differently
          if (isClosing) {
            // During exit, items fall downward with increasing speed
            const size = getSize(item.id);
            
            let vx = item.vx;
            let vy = item.vy + GRAVITY * 1.5; // Stronger gravity during exit
            
            let x = item.x + vx;
            let y = item.y + vy;
            
            // No boundary constraints during exit - let them fly off screen
            // But add some air resistance
            vx *= AIR_DRAG * 0.98;
            vy *= AIR_DRAG * 0.98;
            
            // Increase rotation speed during exit
            let vr = item.vr * 1.05;
            let rotation = item.rotation + vr;
            
            // Fade out as they fall
            const exitProgress = (currentTime - exitStartTimeRef.current) / 800;
            const opacity = Math.max(0, 1 - exitProgress * 1.5);
            
            return {
              ...item,
              x,
              y,
              vx,
              vy,
              vr,
              rotation,
              exitOpacity: opacity,
            };
          }
          
          // Check if item should start based on delay
          if (!item.hasStarted && elapsedTime >= item.delay) {
            item.hasStarted = true;
            // Add a little "spring" effect by quickly scaling up
            item.scale = 1;
          }
          
          // If item hasn't started yet, keep it at bottom but invisible
          if (!item.hasStarted) {
            return {
              ...item,
              opacity: 0,
              scale: 0.7,
            };
          }
          
          if (item.dragging) return { ...item, opacity: 1, scale: 1 };

          const size = getSize(item.id);

          let vx = item.vx;
          let vy = item.vy + GRAVITY;

          let x = item.x + vx;
          let y = item.y + vy;

          const minX = 0;
          const minY = 0;
          const maxX = window.innerWidth - size.w;
          const maxY = window.innerHeight - size.h;

          // walls
          if (x < minX) {
            x = minX;
            vx = Math.abs(vx) * WALL_BOUNCE;
            // Add slight rotation on wall hit
            item.vr += (Math.random() - 0.5) * 0.05;
          }

          if (x > maxX) {
            x = maxX;
            vx = -Math.abs(vx) * WALL_BOUNCE;
            item.vr += (Math.random() - 0.5) * 0.05;
          }

          if (y < minY) {
            y = minY;
            vy = Math.abs(vy) * WALL_BOUNCE;
            item.vr += (Math.random() - 0.5) * 0.08;
          }

          if (y > maxY) {
            y = maxY;
            vy = -Math.abs(vy) * WALL_BOUNCE;
            
            // Add ground friction when landing
            vx *= 0.98;
            
            // Add bounce effect on landing
            if (Math.abs(item.vy) > 2) {
              item.vr += (Math.random() - 0.5) * 0.1;
            }
          }

          vx *= AIR_DRAG;
          vy *= AIR_DRAG;

          // -------------------------
          // ROTATION (STABLE READABLE)
          // -------------------------
          let vr = item.vr;
          let rotation = item.rotation + vr;

          vr *= ROTATION_DRAG;
          vr += -rotation * UPRIGHT_FORCE;

          rotation = Math.max(
            -ROTATION_LIMIT,
            Math.min(ROTATION_LIMIT, rotation)
          );

          // Gradually scale to normal if still animating scale
          let scale = item.scale;
          if (scale < 1) {
            scale = Math.min(1, scale + 0.05);
          }

          return {
            ...item,
            x,
            y,
            vx,
            vy,
            vr,
            rotation,
            opacity: 1,
            scale: scale,
          };
        });

        // Only apply collisions during normal state (not during exit)
        if (!isClosing) {
          state = updateCollisions(state);
        }

        itemsRef.current = state;

        if (time - lastRender.current > 16) {
          setItems([...state]);
          lastRender.current = time;
        }
      });

      animationRef.current = requestAnimationFrame(update);
    };

    animationRef.current = requestAnimationFrame(update);
  };

  // -------------------------
  // MOBILE GESTURE SUPPORT
  // -------------------------
  const handleTouchStart = (e, id) => {
    if (isClosing) return;
    
    const touch = e.touches[0];
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now(),
      id: id
    };
    
    handlePointerDown(touch, id);
  };
  
  const handleTouchMove = (e) => {
    if (isClosing || !touchStartRef.current) return;
    
    const touch = e.touches[0];
    const dx = touch.clientX - touchStartRef.current.x;
    const dy = touch.clientY - touchStartRef.current.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Check for swipe gesture (quick movement)
    if (distance > swipeThreshold) {
      const timeDiff = Date.now() - touchStartRef.current.time;
      if (timeDiff < 300) { // Quick swipe
        const velocity = distance / timeDiff;
        if (velocity > 0.5) { // Fast enough swipe
          // Apply swipe force to the item
          itemsRef.current = itemsRef.current.map((item) =>
            item.id === touchStartRef.current.id
              ? {
                  ...item,
                  vx: dx * 0.2,
                  vy: dy * 0.2,
                  dragging: false
                }
              : item
          );
          touchStartRef.current = null;
          e.preventDefault();
          return;
        }
      }
    }
    
    // Regular drag
    handlePointerMove(touch);
    e.preventDefault();
  };
  
  const handleTouchEnd = (e) => {
    if (isClosing) return;
    handlePointerUp();
    touchStartRef.current = null;
  };

  // -------------------------
  // DRAG HANDLERS (updated for touch)
  // -------------------------
  const handlePointerDown = (point, id) => {
    if (isClosing) return;
    
    setHoveredId(null);
    const now = performance.now();

    lastPointer.current = {
      x: point.clientX,
      y: point.clientY,
      t: now,
    };

    const element = document.getElementById(`feature-${id}`);
    if (!element) return;
    
    const rect = element.getBoundingClientRect();

    const offsetX = point.clientX - rect.left;
    const offsetY = point.clientY - rect.top;

    itemsRef.current = itemsRef.current.map((i) =>
      i.id === id
        ? {
            ...i,
            dragging: true,
            dragOffsetX: offsetX,
            dragOffsetY: offsetY,
            vx: 0,
            vy: 0,
            vr: 0,
          }
        : i
    );
  };

  const handlePointerMove = (point) => {
    if (isClosing) return;
    
    const now = performance.now();
    const dt = Math.max(now - lastPointer.current.t, 16);

    const dx = point.clientX - lastPointer.current.x;
    const dy = point.clientY - lastPointer.current.y;

    const vx = ((dx / dt) * 16) * THROW_SMOOTH;
    const vy = ((dy / dt) * 16) * THROW_SMOOTH;

    lastPointer.current = {
      x: point.clientX,
      y: point.clientY,
      t: now,
    };

    itemsRef.current = itemsRef.current.map((i) =>
      i.dragging
        ? {
            ...i,
            x: point.clientX - i.dragOffsetX,
            y: point.clientY - i.dragOffsetY,
            vx,
            vy,
          }
        : i
    );
  };

  const handlePointerUp = () => {
    if (isClosing) return;
    
    itemsRef.current = itemsRef.current.map((i) =>
      i.dragging ? { ...i, dragging: false } : i
    );
  };

  // Accessibility: Keyboard handling
  const handleKeyDown = (e) => {
    if (e.key === 'Escape' && active && !isClosing) {
      handleClear();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [active, isClosing]);

  if (!active) return null;

  // Error display
  if (error) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80">
        <div className="bg-white rounded-lg p-6 text-center max-w-md">
          <h3 className="text-xl font-bold mb-2">Something went wrong</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-[9999] overflow-hidden pointer-events-none"
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      role="dialog"
      aria-label="Feature showcase overlay"
      aria-modal="true"
    >
      {/* CLEAR BUTTON with accessibility */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 z-[10000] pointer-events-auto">
        <button
          onClick={handleClear}
          onKeyDown={(e) => e.key === 'Enter' && handleClear()}
          className="w-12 h-12 rounded-full bg-black/60 text-white flex items-center justify-center text-lg font-bold hover:scale-105 transition focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
          aria-label="Close features overlay"
          disabled={isClosing}
        >
          ✕
        </button>
      </div>

      {/* ITEMS with ARIA labels */}
      {items.map((item) => {
        const size = getSize(item.id);
        const scale = item.scale !== undefined ? item.scale : 1;
        
        // Determine opacity (exit opacity takes precedence)
        let opacity = 1;
        if (isClosing) {
          opacity = item.exitOpacity !== undefined ? item.exitOpacity : 0;
        } else if (item.dragging) {
          opacity = 1;
        } else if (hoveredId === item.id) {
          opacity = 0.55;
        } else if (item.opacity !== undefined) {
          opacity = item.opacity;
        }

        return (
          <div
            key={item.id}
            id={`feature-${item.id}`}
            onPointerDown={(e) => handlePointerDown(e, item.id)}
            onTouchStart={(e) => handleTouchStart(e, item.id)}
            onPointerEnter={() => !isClosing && setHoveredId(item.id)}
            onPointerLeave={() => !isClosing && setHoveredId(null)}
            className="absolute cursor-grab active:cursor-grabbing select-none pointer-events-auto will-change-transform focus:outline-none"
            style={{
              width: size.w,
              height: size.h,

              transform: `translate(${item.x}px, ${item.y}px) rotate(${item.rotation}rad) scale(${scale})`,

              opacity: opacity,

              transition: isClosing
                ? "opacity 400ms cubic-bezier(0.4, 0, 0.2, 1)"
                : "opacity 200ms ease",
              
              filter: isClosing ? "blur(2px)" : "none",
            }}
            role="button"
            tabIndex={0}
            aria-label={`Feature ${item.id} - draggable item`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                // Optional: Add keyboard drag functionality
                e.preventDefault();
              }
            }}
          >
            <img
              src={item.img}
              className="w-full h-full object-contain pointer-events-none"
              draggable={false}
              alt={`Feature ${item.id}`}
            />
          </div>
        );
      })}
    </div>
  );
}

export default FeatureDropOverlay;