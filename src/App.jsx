import { useState, useEffect } from 'react';
import { Moon, Sun, Settings, Trophy, RotateCcw, HelpCircle, Languages } from 'lucide-react';
import PracticeArea from './components/PracticeArea';
import Timer from './components/Timer';
import Stats from './components/Stats';
import SolutionPanel from './components/SolutionPanel';
import Sidebar from './components/Sidebar';
import SettingsModal from './components/SettingsModal';
import AchievementsPanel from './components/AchievementsPanel';
import { generateRandomDate, calculateDayOfWeek, DAYS_OF_WEEK } from './utils/doomsdayAlgorithm';

// תרגומים
const translations = {
  he: {
    title: 'מאמן Doomsday',
    subtitle: 'תרגל את אלגוריתם Conway',
    showSolution: 'הצג פתרון',
    nextQuestion: 'שאלה הבאה',
    checkAnswer: 'בדוק תשובה',
    correct: 'נכון!',
    incorrect: 'לא נכון',
    reset: 'איפוס',
    achievements: 'הישגים',
    settings: 'הגדרות',
    help: 'עזרה',
    stats: 'סטטיסטיקות',
    resetAll: 'אתה בטוח שאתה רוצה לאפס את כל הנתונים?',
    resetConfirm: 'כן, אפס הכל',
    cancel: 'ביטול',
    startPractice: 'התחל תרגול',
    clickToReveal: 'לחץ כדי לראות את התאריך'
  },
  en: {
    title: 'Doomsday Trainer',
    subtitle: 'Practice Conway\'s Algorithm',
    showSolution: 'Show Solution',
    nextQuestion: 'Next Question',
    checkAnswer: 'Check Answer',
    correct: 'Correct!',
    incorrect: 'Incorrect',
    reset: 'Reset',
    achievements: 'Achievements',
    settings: 'Settings',
    help: 'Help',
    stats: 'Statistics',
    resetAll: 'Are you sure you want to reset all data?',
    resetConfirm: 'Yes, Reset All',
    cancel: 'Cancel',
    startPractice: 'Start Practice',
    clickToReveal: 'Click to reveal date'
  }
};

function App() {
  // State Management
  const [currentDate, setCurrentDate] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showSolution, setShowSolution] = useState(false);
  const [dateRevealed, setDateRevealed] = useState(false);
  const [isFirstQuestion, setIsFirstQuestion] = useState(true);
  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem('doomsday-stats');
    return saved ? JSON.parse(saved) : {
      correct: 0,
      incorrect: 0,
      streak: 0,
      bestStreak: 0,
      totalTime: 0,
      attempts: 0,
      history: []
    };
  });
  const [startTime, setStartTime] = useState(null);
  const [timerRunning, setTimerRunning] = useState(false);
  const [pausedElapsedTime, setPausedElapsedTime] = useState(0);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('doomsday-darkmode');
    return saved ? JSON.parse(saved) : true;
  });
  const [showSettings, setShowSettings] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('doomsday-language');
    return saved || 'en';
  });
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('doomsday-settings');
    return saved ? JSON.parse(saved) : {
      minYear: 500,
      maxYear: 2500,
      showTimer: true,
      showHints: true,
      soundEnabled: false
    };
  });

  const t = translations[language];

  // Initialize with first question
  useEffect(() => {
    setCurrentDate(generateRandomDate(settings.minYear, settings.maxYear));
  }, [settings.minYear, settings.maxYear]);

  // Save stats to localStorage
  useEffect(() => {
    localStorage.setItem('doomsday-stats', JSON.stringify(stats));
  }, [stats]);

  // Save dark mode preference
  useEffect(() => {
    localStorage.setItem('doomsday-darkmode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Save language preference
  useEffect(() => {
    localStorage.setItem('doomsday-language', language);
    document.documentElement.dir = language === 'he' ? 'rtl' : 'ltr';
  }, [language]);

  // Save settings
  useEffect(() => {
    localStorage.setItem('doomsday-settings', JSON.stringify(settings));
  }, [settings]);

  const revealDate = () => {
    if (!dateRevealed) {
      setDateRevealed(true);
      setStartTime(Date.now() - pausedElapsedTime * 1000);
      setTimerRunning(true);
      if (isFirstQuestion) {
        setIsFirstQuestion(false);
      }
    }
  };

  const hideDate = () => {
    // שמירת הזמן שעבר לפני העצירה
    if (startTime && timerRunning) {
      const elapsed = (Date.now() - startTime) / 1000;
      setPausedElapsedTime(elapsed);
    }
    setDateRevealed(false);
    setTimerRunning(false);
  };

  const handleDaySelect = (day) => {
    if (isCorrect !== null) return;
    setSelectedDay(day);
  };

  const checkAnswer = () => {
    if (selectedDay === null || !dateRevealed) return;
    
    setTimerRunning(false);
    const timeTaken = startTime ? (Date.now() - startTime) / 1000 : pausedElapsedTime;
    const correctDay = calculateDayOfWeek(currentDate.day, currentDate.month, currentDate.year);
    const correct = selectedDay === correctDay;
    
    setIsCorrect(correct);
    
    // אם טעית, הצג את הפתרון אוטומטית
    if (!correct) {
      setShowSolution(true);
    }
    
    const newStats = { ...stats };
    newStats.attempts += 1;
    newStats.totalTime += timeTaken;
    
    if (correct) {
      newStats.correct += 1;
      newStats.streak += 1;
      if (newStats.streak > newStats.bestStreak) {
        newStats.bestStreak = newStats.streak;
      }
    } else {
      newStats.incorrect += 1;
      newStats.streak = 0;
    }
    
    newStats.history.push({
      date: currentDate,
      correct,
      timeTaken,
      selectedDay,
      correctDay,
      timestamp: Date.now()
    });
    
    // Keep only last 100 attempts
    if (newStats.history.length > 100) {
      newStats.history = newStats.history.slice(-100);
    }
    
    setStats(newStats);
  };

  const nextQuestion = () => {
    setCurrentDate(generateRandomDate(settings.minYear, settings.maxYear));
    setSelectedDay(null);
    setIsCorrect(null);
    setShowSolution(false);
    setPausedElapsedTime(0);
    
    // אחרי הפעם הראשונה, התאריך מוצג מיד
    if (isFirstQuestion) {
      setDateRevealed(false);
      setStartTime(null);
      setTimerRunning(false);
    } else {
      setDateRevealed(true);
      setStartTime(Date.now());
      setTimerRunning(true);
    }
  };

  const tryAgain = () => {
    setSelectedDay(null);
    setIsCorrect(null);
    setShowSolution(false);
    setStartTime(Date.now());
    setTimerRunning(true);
    setPausedElapsedTime(0);
  };

  const resetStats = () => {
    const newStats = {
      correct: 0,
      incorrect: 0,
      streak: 0,
      bestStreak: 0,
      totalTime: 0,
      attempts: 0,
      history: []
    };
    setStats(newStats);
    localStorage.setItem('doomsday-stats', JSON.stringify(newStats));
    setShowResetConfirm(false);
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'he' : 'en');
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (showSettings || showResetConfirm) return;
      
      // Number keys 0-6 for day selection
      if (e.key >= '0' && e.key <= '6') {
        const day = parseInt(e.key);
        handleDaySelect(day);
      }
      
      // Enter to check answer or reveal date
      if (e.key === 'Enter') {
        if (!dateRevealed) {
          revealDate();
        } else if (selectedDay !== null && isCorrect === null) {
          checkAnswer();
        }
      }
      
      // N for next question
      if (e.key.toLowerCase() === 'n' && isCorrect !== null) {
        nextQuestion();
      }
      
      // S for show solution
      if (e.key.toLowerCase() === 's' && dateRevealed) {
        setShowSolution(!showSolution);
      }
      
      // H for help/sidebar
      if (e.key.toLowerCase() === 'h') {
        setShowSidebar(!showSidebar);
      }
      
      // R for reset current question
      if (e.key.toLowerCase() === 'r' && isCorrect === null && !dateRevealed) {
        nextQuestion();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedDay, isCorrect, showSolution, showSidebar, showSettings, showResetConfirm, dateRevealed, isFirstQuestion, timerRunning, startTime, pausedElapsedTime]);

  if (!currentDate) return null;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode 
        ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' 
        : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
    }`}>
      {/* Header */}
      <header className={`border-b backdrop-blur-lg ${
        darkMode 
          ? 'bg-gray-800/50 border-gray-700' 
          : 'bg-white/80 border-purple-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex-1 flex flex-col items-center gap-2">
            <div className={`text-6xl font-bold bg-gradient-to-r ${
              darkMode 
                ? 'from-purple-400 via-pink-400 to-purple-400' 
                : 'from-purple-600 via-pink-600 to-purple-600'
            } bg-clip-text text-transparent`}>
              {t.title}
            </div>
            <span className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {t.subtitle}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={toggleLanguage}
              className={`p-2 rounded-lg transition-all ${
                darkMode 
                  ? 'hover:bg-gray-700 text-gray-300' 
                  : 'hover:bg-purple-100 text-gray-700'
              }`}
              title={language === 'en' ? 'עברית' : 'English'}
            >
              <Languages size={20} />
            </button>
            
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className={`p-2 rounded-lg transition-all ${
                darkMode 
                  ? 'hover:bg-gray-700 text-gray-300' 
                  : 'hover:bg-purple-100 text-gray-700'
              }`}
              title={t.help}
            >
              <HelpCircle size={20} />
            </button>
            
            <button
              onClick={() => setShowAchievements(true)}
              className={`p-2 rounded-lg transition-all ${
                darkMode 
                  ? 'hover:bg-gray-700 text-yellow-400' 
                  : 'hover:bg-purple-100 text-purple-700'
              }`}
              title={t.achievements}
            >
              <Trophy size={20} />
            </button>
            
            <button
              onClick={() => setShowResetConfirm(true)}
              className={`p-2 rounded-lg transition-all ${
                darkMode 
                  ? 'hover:bg-gray-700 text-gray-300' 
                  : 'hover:bg-purple-100 text-gray-700'
              }`}
              title={t.reset}
            >
              <RotateCcw size={20} />
            </button>
            
            <button
              onClick={() => setShowSettings(true)}
              className={`p-2 rounded-lg transition-all ${
                darkMode 
                  ? 'hover:bg-gray-700 text-gray-300' 
                  : 'hover:bg-purple-100 text-gray-700'
              }`}
              title={t.settings}
            >
              <Settings size={20} />
            </button>
            
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg transition-all ${
                darkMode 
                  ? 'hover:bg-gray-700 text-yellow-400' 
                  : 'hover:bg-purple-100 text-purple-600'
              }`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Top Stats Bar with Timer */}
        <div className="mb-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Stats stats={stats} darkMode={darkMode} language={language} compact={true} />
            {settings.showTimer && (
              <div className={`rounded-xl p-4 text-center backdrop-blur-sm ${
                darkMode 
                  ? 'bg-gradient-to-br from-purple-600/90 to-pink-600/90' 
                  : 'bg-gradient-to-br from-purple-500 to-pink-500'
              } text-white`}>
                <div className="text-2xl mb-2">⏱️</div>
                <Timer 
                  startTime={startTime} 
                  isRunning={timerRunning}
                  darkMode={darkMode}
                  show={settings.showTimer}
                  language={language}
                  compact={true}
                  onReset={() => {
                    setStartTime(Date.now());
                    setTimerRunning(true);
                    setPausedElapsedTime(0);
                  }}
                  onStart={() => {
                    if (!dateRevealed) {
                      revealDate();
                    } else if (!timerRunning && isCorrect === null) {
                      setStartTime(Date.now() - pausedElapsedTime * 1000);
                      setTimerRunning(true);
                    }
                  }}
                  onStop={() => {
                    if (startTime && timerRunning) {
                      const elapsed = (Date.now() - startTime) / 1000;
                      setPausedElapsedTime(elapsed);
                    }
                    setTimerRunning(false);
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Center Column - Practice Area */}
        <div className="max-w-4xl mx-auto">
          <PracticeArea
            currentDate={currentDate}
            selectedDay={selectedDay}
            onDaySelect={handleDaySelect}
            isCorrect={isCorrect}
            onCheck={checkAnswer}
            onNext={nextQuestion}
            onTryAgain={tryAgain}
            darkMode={darkMode}
            language={language}
            showHints={settings.showHints}
            dateRevealed={dateRevealed}
            onRevealDate={revealDate}
            onHideDate={hideDate}
            showSolution={showSolution}
            onToggleSolution={() => setShowSolution(!showSolution)}
          />
        </div>

        {/* Solution Panel - מתחת ל-Practice Area */}
        {showSolution && dateRevealed && (
          <div className="max-w-4xl mx-auto mt-6">
            <SolutionPanel 
              date={currentDate} 
              darkMode={darkMode}
              language={language}
              onClose={() => setShowSolution(false)}
            />
          </div>
        )}
      </div>

      {/* Sidebar */}
      {showSidebar && (
        <Sidebar 
          onClose={() => setShowSidebar(false)}
          darkMode={darkMode}
          language={language}
        />
      )}

      {/* Settings Modal */}
      {showSettings && (
        <SettingsModal
          settings={settings}
          onSave={(newSettings) => {
            setSettings(newSettings);
            setShowSettings(false);
          }}
          onClose={() => setShowSettings(false)}
          darkMode={darkMode}
          language={language}
        />
      )}

      {/* Achievements Panel */}
      {showAchievements && (
        <AchievementsPanel
          stats={stats}
          onClose={() => setShowAchievements(false)}
          darkMode={darkMode}
          language={language}
        />
      )}

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className={`rounded-2xl p-6 max-w-md w-full shadow-2xl ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <h3 className={`text-xl font-bold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {t.reset}
            </h3>
            <p className={`mb-6 ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {t.resetAll}
            </p>
            <div className="flex gap-3">
              <button
                onClick={resetStats}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-colors"
              >
                {t.resetConfirm}
              </button>
              <button
                onClick={() => setShowResetConfirm(false)}
                className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                  darkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
                }`}
              >
                {t.cancel}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;