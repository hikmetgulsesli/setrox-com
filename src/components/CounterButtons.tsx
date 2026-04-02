interface CounterButtonsProps {
  onIncrement: () => void;
  onDecrement: () => void;
  onReset: () => void;
}

export function CounterButtons({ onIncrement, onDecrement, onReset }: CounterButtonsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
      {/* Azalt Button */}
      <button
        onClick={onDecrement}
        aria-label="Azalt"
        className="w-full sm:w-auto px-8 py-4 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold font-['Space_Grotesk'] transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
      >
        <span className="material-symbols-outlined">remove</span>
        Azalt
      </button>

      {/* Sıfırla Button */}
      <button
        onClick={onReset}
        aria-label="Sıfırla"
        className="w-full sm:w-auto px-8 py-4 bg-gray-500 hover:bg-gray-600 text-white rounded-xl font-bold font-['Space_Grotesk'] transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
      >
        <span className="material-symbols-outlined">refresh</span>
        Sıfırla
      </button>

      {/* Artır Button */}
      <button
        onClick={onIncrement}
        aria-label="Arttır"
        className="w-full sm:w-auto px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold font-['Space_Grotesk'] transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
      >
        <span className="material-symbols-outlined">add</span>
        Arttır
      </button>
    </div>
  );
}
