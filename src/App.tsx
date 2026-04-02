import { useState, useEffect } from 'react';
import { CounterDisplay } from './components/CounterDisplay';
import { CounterButtons } from './components/CounterButtons';
import { ErrorBanner } from './components/ErrorBanner';
import './App.css';

function App() {
  const [count, setCount] = useState(() => {
    const saved = localStorage.getItem('sayac-v4-count');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('sayac-v4-count', count.toString());
      setError(null);
    } catch (e) {
      setError('localStorage yazma hatası');
    }
  }, [count]);

  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => c - 1);
  const reset = () => setCount(0);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent default for handled keys to avoid page scroll
      if (['ArrowUp', 'ArrowDown', '+', '-', 'r', 'R'].includes(e.key)) {
        e.preventDefault();
      }

      switch (e.key) {
        case 'ArrowUp':
        case '+':
          increment();
          break;
        case 'ArrowDown':
        case '-':
          decrement();
          break;
        case 'r':
        case 'R':
          reset();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#0c1324] text-[#dce1fb] font-['Inter'] flex flex-col items-center justify-center p-6">
      <ErrorBanner message={error} onDismiss={() => setError(null)} />
      
      <div className="w-full max-w-2xl flex flex-col items-center gap-8">
        <CounterDisplay count={count} />
        <CounterButtons 
          onIncrement={increment}
          onDecrement={decrement}
          onReset={reset}
        />
        
        {/* Keyboard Shortcuts Legend */}
        <div className="flex items-center gap-3 mt-8">
          <div className="flex gap-2">
            <kbd className="px-2 py-1 rounded bg-[#191f31] border border-[#2a3147] text-[10px] font-bold text-[#9aa3c2] font-mono">↑</kbd>
            <kbd className="px-2 py-1 rounded bg-[#191f31] border border-[#2a3147] text-[10px] font-bold text-[#9aa3c2] font-mono">↓</kbd>
            <kbd className="px-2 py-1 rounded bg-[#191f31] border border-[#2a3147] text-[10px] font-bold text-[#9aa3c2] font-mono">R</kbd>
          </div>
          <span className="text-[10px] font-medium text-[#9aa3c2] uppercase tracking-widest font-['Inter']">
            Klavye Kısayolları
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;
