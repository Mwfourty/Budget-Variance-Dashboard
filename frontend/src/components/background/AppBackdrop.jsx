import { useTheme } from '../../context/ThemeContext.jsx';
import LiquidEther from './LiquidEther.jsx';

// Renders the ambient fluid effect fixed behind the whole app, beneath the
// floating panels. Kept subtle (low opacity) so it reads as atmosphere,
// not a distraction from the financial data in front of it.
export default function AppBackdrop() {
  const { isDark } = useTheme();

  return (
    <div
      className="fixed inset-0 -z-10 opacity-[0.35] dark:opacity-[0.25]"
      aria-hidden="true"
    >
      <LiquidEther
        colors={isDark ? ['#F2600E', '#7E2C05', '#1F1F1E'] : ['#F2600E', '#FF9F5F', '#FFE4D2']}
        backgroundColor={isDark ? '#000000' : '#FAFAF9'}
        lightMode={false}
        autoDemo
        autoSpeed={0.3}
        autoIntensity={1.6}
        mouseForce={14}
        cursorSize={130}
        resolution={0.45}
      />
    </div>
  );
}
