import { Plus } from 'lucide-react';

export default function FloatingAddButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Add budget entry"
      className="fixed bottom-20 left-4 z-20 flex h-14 w-14 items-center justify-center rounded-full
                 bg-ember-500 text-white shadow-lg shadow-ember-500/30 transition-transform duration-150
             hover:scale-105 hover:bg-ember-600 active:scale-95 md:bottom-19 md:left-[150px]"
    >
      <Plus className="h-6 w-6" strokeWidth={2} />
    </button>
  );
}
