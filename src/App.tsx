import { useCounter } from './hooks/useCounter';
import './App.css';

function App() {
  const { count, increment, decrement, reset } = useCounter({ initialValue: 0 });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-8">Sayaç Uygulaması</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-12 text-center">
        <div className="text-6xl font-mono font-bold mb-8 text-primary">
          {count}
        </div>
        
        <div className="flex gap-4 justify-center">
          <button
            onClick={decrement}
            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Azalt
          </button>
          
          <button
            onClick={reset}
            className="px-6 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-accent/90 transition-colors"
          >
            Sıfırla
          </button>
          
          <button
            onClick={increment}
            className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Artır
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
