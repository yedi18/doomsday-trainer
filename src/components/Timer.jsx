import { useState, useEffect } from 'react';
import { Clock, Play, Pause, RotateCcw } from 'lucide-react';

const translations = {
  he: { 
    time: 'זמן',
    start: 'התחל',
    stop: 'עצור',
    reset: 'איפוס'
  },
  en: { 
    time: 'Time',
    start: 'Start',
    stop: 'Stop',
    reset: 'Reset'
  }
};

function Timer({ startTime, isRunning, darkMode, show, language = 'en', compact = false, onReset, onStart, onStop }) {
  const [elapsedTime, setElapsedTime] = useState(0);
  const t = translations[language];

  useEffect(() => {
    if (!isRunning || !startTime) return;

    const interval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 100);

    return () => clearInterval(interval);
  }, [startTime, isRunning]);

  useEffect(() => {
    if (!startTime) {
      setElapsedTime(0);
    }
  }, [startTime]);

  if (!show) return null;

  const minutes = Math.floor(elapsedTime / 60);
  const seconds = elapsedTime % 60;

  // Compact mode for stats bar
  if (compact) {
    return (
      <>
        <div className="text-4xl font-bold font-mono">
          {minutes}:{seconds.toString().padStart(2, '0')}
        </div>
        <div className="text-sm opacity-90 mb-2">{t.time}</div>
        
        {/* Compact controls */}
        <div className="flex gap-1 mt-2">
          {!isRunning ? (
            <button
              onClick={onStart}
              className="p-1.5 rounded bg-green-600 hover:bg-green-700 text-white transition-all"
              title={t.start}
            >
              <Play size={12} />
            </button>
          ) : (
            <button
              onClick={onStop}
              className="p-1.5 rounded bg-yellow-600 hover:bg-yellow-700 text-white transition-all"
              title={t.stop}
            >
              <Pause size={12} />
            </button>
          )}
          
          <button
            onClick={onReset}
            className="p-1.5 rounded bg-gray-600 hover:bg-gray-700 text-white transition-all"
            title={t.reset}
          >
            <RotateCcw size={12} />
          </button>
        </div>
      </>
    );
  }

  // Full timer view
  return (
    <div className={`rounded-xl p-6 backdrop-blur-sm transition-all duration-200 sticky top-4 ${
      darkMode 
        ? 'bg-gray-800/80 border border-gray-700' 
        : 'bg-white/80 border border-orange-200'
    }`}>
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 rounded-lg ${
          darkMode ? 'bg-purple-500/20' : 'bg-orange-100'
        }`}>
          <Clock className={darkMode ? 'text-purple-400' : 'text-orange-600'} size={20} />
        </div>
        <span className={`text-sm font-semibold ${
          darkMode ? 'text-gray-300' : 'text-gray-700'
        }`}>
          {t.time}
        </span>
      </div>
      
      <div className={`text-5xl font-bold font-mono mb-4 text-center ${
        darkMode ? 'text-white' : 'text-gray-900'
      }`}>
        {minutes}:{seconds.toString().padStart(2, '0')}
      </div>
      
      <div className={`mb-4 h-2 rounded-full overflow-hidden ${
        darkMode ? 'bg-gray-700' : 'bg-gray-200'
      }`}>
        <div 
          className={`h-full transition-all duration-1000 ${
            elapsedTime < 10 
              ? 'bg-green-500' 
              : elapsedTime < 30 
                ? 'bg-yellow-500' 
                : elapsedTime < 60
                  ? 'bg-orange-500'
                  : 'bg-red-500'
          }`}
          style={{ width: `${Math.min((elapsedTime / 120) * 100, 100)}%` }}
        />
      </div>

      {/* Timer Controls */}
      <div className="flex gap-2">
        {!isRunning ? (
          <button
            onClick={onStart}
            className={`flex-1 py-2 px-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
              darkMode
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            <Play size={16} />
            {t.start}
          </button>
        ) : (
          <button
            onClick={onStop}
            className={`flex-1 py-2 px-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
              darkMode
                ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
                : 'bg-yellow-500 hover:bg-yellow-600 text-white'
            }`}
          >
            <Pause size={16} />
            {t.stop}
          </button>
        )}
        
        <button
          onClick={onReset}
          className={`py-2 px-3 rounded-lg font-semibold transition-all flex items-center justify-center ${
            darkMode
              ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
              : 'bg-gray-300 hover:bg-gray-400 text-gray-700'
          }`}
          title={t.reset}
        >
          <RotateCcw size={16} />
        </button>
      </div>
    </div>
  );
}

export default Timer;