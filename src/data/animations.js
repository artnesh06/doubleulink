// CSS animated backgrounds per theme
// Each returns { css: string (keyframes + extra), style: object (applied to .lt-body) }

export function getAnimation(themeId) {
  switch (themeId) {
    case 'dark':
      return {
        css: `
          @keyframes twinkle {
            0%, 100% { opacity: 0.2; transform: scale(1); }
            50%       { opacity: 1;   transform: scale(1.4); }
          }
          .anim-stars::before, .anim-stars::after {
            content: '';
            position: fixed;
            inset: 0;
            pointer-events: none;
            background-image:
              radial-gradient(1px 1px at 10% 15%, #fff 0%, transparent 100%),
              radial-gradient(1px 1px at 25% 40%, #fff 0%, transparent 100%),
              radial-gradient(1px 1px at 40% 10%, #fff 0%, transparent 100%),
              radial-gradient(1px 1px at 55% 60%, #fff 0%, transparent 100%),
              radial-gradient(1px 1px at 70% 25%, #fff 0%, transparent 100%),
              radial-gradient(1px 1px at 85% 75%, #fff 0%, transparent 100%),
              radial-gradient(1px 1px at 15% 80%, #fff 0%, transparent 100%),
              radial-gradient(1px 1px at 60% 90%, #fff 0%, transparent 100%),
              radial-gradient(1px 1px at 90% 45%, #fff 0%, transparent 100%),
              radial-gradient(1px 1px at 35% 70%, #fff 0%, transparent 100%),
              radial-gradient(1px 1px at 75% 5%,  #fff 0%, transparent 100%),
              radial-gradient(1px 1px at 5%  50%, #fff 0%, transparent 100%);
            animation: twinkle 3s ease-in-out infinite;
            z-index: 0;
          }
          .anim-stars::after { animation-delay: 1.5s; animation-duration: 4s; }
        `,
        bodyClass: 'anim-stars',
      }

    case 'midnight':
      return {
        css: `
          @keyframes aurora {
            0%   { transform: translateX(-20%) skewX(-5deg); opacity: 0.3; }
            50%  { transform: translateX(20%)  skewX(5deg);  opacity: 0.6; }
            100% { transform: translateX(-20%) skewX(-5deg); opacity: 0.3; }
          }
          .anim-aurora::before {
            content: '';
            position: fixed;
            top: -20%; left: -10%;
            width: 120%; height: 60%;
            background: linear-gradient(180deg, transparent 0%, #4444aa44 40%, #8888ff33 60%, transparent 100%);
            animation: aurora 8s ease-in-out infinite;
            pointer-events: none;
            z-index: 0;
          }
          .anim-aurora::after {
            content: '';
            position: fixed;
            top: 10%; left: -20%;
            width: 140%; height: 40%;
            background: linear-gradient(180deg, transparent 0%, #2222aa33 50%, transparent 100%);
            animation: aurora 12s ease-in-out infinite reverse;
            pointer-events: none;
            z-index: 0;
          }
        `,
        bodyClass: 'anim-aurora',
      }

    case 'forest':
      return {
        css: `
          @keyframes rain {
            0%   { transform: translateY(-100%); opacity: 0; }
            10%  { opacity: 0.6; }
            90%  { opacity: 0.6; }
            100% { transform: translateY(100vh); opacity: 0; }
          }
          .anim-rain::before {
            content: '';
            position: fixed;
            inset: 0;
            pointer-events: none;
            background-image:
              linear-gradient(180deg, #6bcb7788 0%, transparent 100%),
              repeating-linear-gradient(
                90deg,
                transparent 0px, transparent 18px,
                #6bcb7722 18px, #6bcb7722 19px
              );
            background-size: 100% 8px, 100% 100%;
            animation: rain 1.2s linear infinite;
            z-index: 0;
          }
        `,
        bodyClass: 'anim-rain',
      }

    case 'ember':
      return {
        css: `
          @keyframes ember1 { 0% { transform: translateY(100vh) translateX(0px);   opacity: 0; } 10% { opacity: 0.8; } 90% { opacity: 0.6; } 100% { transform: translateY(-20px) translateX(30px);  opacity: 0; } }
          @keyframes ember2 { 0% { transform: translateY(100vh) translateX(0px);   opacity: 0; } 10% { opacity: 0.6; } 90% { opacity: 0.4; } 100% { transform: translateY(-20px) translateX(-20px); opacity: 0; } }
          @keyframes ember3 { 0% { transform: translateY(100vh) translateX(0px);   opacity: 0; } 10% { opacity: 1;   } 90% { opacity: 0.7; } 100% { transform: translateY(-20px) translateX(15px);  opacity: 0; } }
          .anim-ember::before, .anim-ember::after {
            content: '';
            position: fixed;
            pointer-events: none;
            z-index: 0;
            width: 3px; height: 3px;
            border-radius: 50%;
            background: #ff6b3d;
            box-shadow:
              10vw  0px 0 0 #ff6b3d,
              25vw  0px 0 0 #ff4500,
              40vw  0px 0 0 #ff6b3d,
              55vw  0px 0 0 #ffaa44,
              70vw  0px 0 0 #ff4500,
              85vw  0px 0 0 #ff6b3d;
            bottom: 0; left: 5vw;
            animation: ember1 4s ease-in infinite;
          }
          .anim-ember::after {
            left: 15vw;
            box-shadow:
              8vw  0px 0 0 #ffaa44,
              22vw 0px 0 0 #ff6b3d,
              38vw 0px 0 0 #ff4500,
              52vw 0px 0 0 #ff6b3d,
              68vw 0px 0 0 #ffaa44,
              82vw 0px 0 0 #ff4500;
            animation: ember2 5s ease-in infinite;
            animation-delay: 1.5s;
          }
        `,
        bodyClass: 'anim-ember',
      }

    case 'ocean':
      return {
        css: `
          @keyframes wave1 { 0%, 100% { transform: translateX(0);    } 50% { transform: translateX(-30px); } }
          @keyframes wave2 { 0%, 100% { transform: translateX(-20px); } 50% { transform: translateX(20px);  } }
          .anim-ocean::before, .anim-ocean::after {
            content: '';
            position: fixed;
            bottom: 0; left: -10%;
            width: 120%; height: 30%;
            pointer-events: none;
            z-index: 0;
            background: repeating-linear-gradient(
              90deg,
              transparent 0px, transparent 40px,
              #1a669922 40px, #1a669922 80px
            );
            border-radius: 50% 50% 0 0 / 20px 20px 0 0;
            animation: wave1 6s ease-in-out infinite;
            opacity: 0.4;
          }
          .anim-ocean::after {
            height: 20%;
            opacity: 0.25;
            animation: wave2 9s ease-in-out infinite;
            background: repeating-linear-gradient(
              90deg,
              transparent 0px, transparent 60px,
              #4cc9f033 60px, #4cc9f033 120px
            );
          }
        `,
        bodyClass: 'anim-ocean',
      }

    case 'sand':
      return {
        css: `
          @keyframes drift { 0% { transform: translateX(-5%); } 100% { transform: translateX(5%); } }
          .anim-sand::before {
            content: '';
            position: fixed;
            inset: 0;
            pointer-events: none;
            z-index: 0;
            background: repeating-linear-gradient(
              0deg,
              transparent 0px, transparent 6px,
              #aa996622 6px, #aa996622 7px
            );
            animation: drift 8s ease-in-out infinite alternate;
            opacity: 0.5;
          }
        `,
        bodyClass: 'anim-sand',
      }

    case 'rose':
      return {
        css: `
          @keyframes petal1 { 0% { transform: translateY(-10px) rotate(0deg);   opacity: 0; } 10% { opacity: 0.7; } 90% { opacity: 0.5; } 100% { transform: translateY(100vh) rotate(360deg); opacity: 0; } }
          @keyframes petal2 { 0% { transform: translateY(-10px) rotate(0deg);   opacity: 0; } 10% { opacity: 0.5; } 90% { opacity: 0.3; } 100% { transform: translateY(100vh) rotate(-270deg); opacity: 0; } }
          .anim-rose::before, .anim-rose::after {
            content: '';
            position: fixed;
            top: 0; left: 10vw;
            width: 8px; height: 8px;
            border-radius: 50% 0;
            background: #ffb3c6;
            pointer-events: none;
            z-index: 0;
            box-shadow:
              15vw 0 0 0 #ffb3c6,
              30vw 0 0 0 #ff8fab,
              45vw 0 0 0 #ffb3c6,
              60vw 0 0 0 #ff8fab,
              75vw 0 0 0 #ffb3c6;
            animation: petal1 6s linear infinite;
          }
          .anim-rose::after {
            left: 5vw;
            animation: petal2 8s linear infinite;
            animation-delay: 2s;
            box-shadow:
              20vw 0 0 0 #ff8fab,
              38vw 0 0 0 #ffb3c6,
              55vw 0 0 0 #ff8fab,
              72vw 0 0 0 #ffb3c6,
              88vw 0 0 0 #ff8fab;
          }
        `,
        bodyClass: 'anim-rose',
      }

    case 'bright':
      return {
        css: `
          @keyframes float-dot { 0%, 100% { transform: translateY(0px); opacity: 0.3; } 50% { transform: translateY(-15px); opacity: 0.7; } }
          .anim-bright::before {
            content: '';
            position: fixed;
            inset: 0;
            pointer-events: none;
            z-index: 0;
            background-image:
              radial-gradient(2px 2px at 15% 20%, #cccccc 0%, transparent 100%),
              radial-gradient(2px 2px at 35% 55%, #cccccc 0%, transparent 100%),
              radial-gradient(2px 2px at 55% 30%, #cccccc 0%, transparent 100%),
              radial-gradient(2px 2px at 75% 70%, #cccccc 0%, transparent 100%),
              radial-gradient(2px 2px at 90% 15%, #cccccc 0%, transparent 100%);
            animation: float-dot 4s ease-in-out infinite;
            opacity: 0.5;
          }
        `,
        bodyClass: 'anim-bright',
      }

    case 'chrome':
    default:
      return {
        css: `
          @keyframes scanline { 0% { transform: translateY(-100%); } 100% { transform: translateY(100vh); } }
          .anim-chrome::before {
            content: '';
            position: fixed;
            left: 0; top: 0;
            width: 100%; height: 4px;
            background: linear-gradient(90deg, transparent 0%, #ffffff22 50%, transparent 100%);
            pointer-events: none;
            z-index: 0;
            animation: scanline 4s linear infinite;
          }
          .anim-chrome::after {
            content: '';
            position: fixed;
            inset: 0;
            pointer-events: none;
            z-index: 0;
            background: repeating-linear-gradient(
              0deg,
              transparent 0px, transparent 3px,
              #ffffff08 3px, #ffffff08 4px
            );
          }
        `,
        bodyClass: 'anim-chrome',
      }
  }
}
