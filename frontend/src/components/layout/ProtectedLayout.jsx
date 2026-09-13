import { useRef } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import AppBackdrop from '../background/AppBackdrop.jsx';

export default function ProtectedLayout() {
  const glowRef = useRef(null);

  const handlePointerMove = (event) => {
    const glow = glowRef.current;
    if (!glow) return;
    glow.style.setProperty('--cursor-x', `${event.clientX}px`);
    glow.style.setProperty('--cursor-y', `${event.clientY}px`);
    glow.style.opacity = '1';
  };

  const handlePointerLeave = () => {
    if (glowRef.current) glowRef.current.style.opacity = '0';
  };

  return (
    <div
      className="relative min-h-screen w-full"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <AppBackdrop />
      <div ref={glowRef} className="cursor-glow" aria-hidden="true" />
      <Sidebar />
      <main className="relative min-h-screen px-4 py-6 pb-32 sm:px-6 md:ml-[104px] md:px-8 md:py-8 md:pb-8 lg:ml-[120px] lg:px-12">
        <Outlet />
      </main>
    </div>
  );
}
