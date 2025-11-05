import { Check, X, Calendar, Eye } from 'lucide-react';
import { DAYS_OF_WEEK } from '../utils/doomsdayAlgorithm';

const translations = {
  he: {
    question: 'איזה יום בשבוע הוא?',
    leapYear: '(שנה מעוברת)',
    checkAnswer: 'בדוק תשובה',
    nextQuestion: 'שאלה הבאה',
    tryAgain: 'נסה שוב',
    selectDay: 'בחר יום',
    revealDate: 'לחץ כדי לראות את התאריך',
    hideDate: 'לחץ כדי להסתיר את התאריך',
    days: ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת']
  },
  en: {
    question: 'What day of the week is:',
    leapYear: '(Leap Year)',
    checkAnswer: 'Check Answer',
    nextQuestion: 'Next Question',
    tryAgain: 'Try Again',
    selectDay: 'Select a day',
    revealDate: 'Click to reveal the date',
    hideDate: 'Click to hide the date',
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  }
};

const months = {
  he: ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'],
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
};

function PracticeArea({ currentDate, selectedDay, onDaySelect, isCorrect, onCheck, onNext, onTryAgain, darkMode, language, showHints, dateRevealed, onRevealDate, onHideDate, showSolution, onToggleSolution }) {
  const t = translations[language];
  const daysOfWeek = language === 'he' ? t.days : DAYS_OF_WEEK;
  
  const isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  };

  const formatDate = () => {
    const monthName = months[language][currentDate.month - 1];
    return `${currentDate.day} ${monthName}, ${currentDate.year}`;
  };

  return (
    <div className={`rounded-3xl p-8 shadow-2xl backdrop-blur-lg transition-all duration-300 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-800/90 to-gray-900/90 border border-gray-700' 
        : 'bg-gradient-to-br from-white/95 to-purple-50/95 border border-purple-200'
    }`}>
      {/* Question Header */}
      <div className="text-center mb-8">
        <h2 className={`text-2xl font-bold mb-6 ${
          darkMode ? 'text-gray-200' : 'text-gray-800'
        }`}>
          {t.question}
        </h2>
        
        {/* Date Display - Large and Centered */}
        {!dateRevealed ? (
          <button
            onClick={onRevealDate}
            className={`w-full py-16 rounded-2xl mb-4 transition-all duration-300 hover:scale-[1.02] ${
              darkMode 
                ? 'bg-gradient-to-r from-purple-600/30 to-pink-600/30 border-2 border-purple-500/50 hover:border-purple-400' 
                : 'bg-gradient-to-r from-purple-200 to-pink-200 border-2 border-purple-400 hover:border-purple-500'
            }`}
          >
            <Eye className={`mx-auto mb-4 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} size={48} />
            <span className={`text-2xl font-bold ${
              darkMode ? 'text-purple-300' : 'text-purple-700'
            }`}>
              {t.revealDate}
            </span>
            <div className={`mt-2 text-sm ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Press Enter or click to start
            </div>
          </button>
        ) : (
          <button
            onClick={onHideDate}
            className={`w-full py-12 px-8 rounded-2xl mb-4 animate-in fade-in transition-all duration-300 hover:scale-[1.02] ${
              darkMode 
                ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-2 border-purple-500/40 hover:border-purple-300' 
                : 'bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-300 hover:border-purple-400'
            }`}
          >
            <Calendar className={`mx-auto mb-4 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} size={48} />
            <div className={`text-8xl font-bold mb-2 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {formatDate()}
            </div>
            
            {isLeapYear(currentDate.year) && (
              <div className={`text-lg mt-3 font-semibold ${
                darkMode ? 'text-purple-400' : 'text-purple-600'
              }`}>
                {t.leapYear}
              </div>
            )}
            
            <div className={`mt-4 text-sm ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {t.hideDate}
            </div>
          </button>
        )}
      </div>

      {/* Result Feedback */}
      {isCorrect !== null && (
        <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2 ${
          isCorrect 
            ? darkMode 
              ? 'bg-green-500/20 border-2 border-green-500/50 text-green-400' 
              : 'bg-green-100 border-2 border-green-400 text-green-700'
            : darkMode
              ? 'bg-red-500/20 border-2 border-red-500/50 text-red-400'
              : 'bg-red-100 border-2 border-red-400 text-red-700'
        }`}>
          {isCorrect ? (
            <>
              <div className="bg-green-500 rounded-full p-1.5">
                <Check size={24} className="text-white" />
              </div>
              <span className="font-bold text-lg">
                {language === 'he' ? '🎉 נכון! כל הכבוד!' : '🎉 Correct! Well done!'}
              </span>
            </>
          ) : (
            <>
              <div className="bg-red-500 rounded-full p-1.5">
                <X size={24} className="text-white" />
              </div>
              <span className="font-bold text-lg">
                {language === 'he' ? '❌ לא נכון. נסה שוב!' : '❌ Incorrect. Try again!'}
              </span>
            </>
          )}
        </div>
      )}

      {/* Hint */}
      {showHints && isCorrect === null && dateRevealed && (
        <div className={`mb-6 p-3 rounded-lg text-sm ${
          darkMode 
            ? 'bg-purple-500/10 border border-purple-500/30 text-purple-300' 
            : 'bg-purple-50 border border-purple-300 text-purple-700'
        }`}>
          💡 {language === 'he' 
            ? 'השתמש במקשים 0-6 כדי לבחור יום, או לחץ על הכפתורים'
            : 'Use keys 0-6 to select a day, or click the buttons'
          }
        </div>
      )}

      {/* Day Selection Grid */}
      {dateRevealed && (
        <div className="grid grid-cols-7 gap-3 mb-6">
          {daysOfWeek.map((day, index) => {
            const isSelected = selectedDay === index;
            const isDisabled = isCorrect !== null;
            
            return (
              <button
                key={index}
                onClick={() => !isDisabled && onDaySelect(index)}
                disabled={isDisabled}
                className={`
                  group relative py-6 px-2 rounded-xl font-bold transition-all duration-200 text-center
                  ${isSelected 
                    ? darkMode
                      ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-xl shadow-purple-500/50 scale-110'
                      : 'bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-xl shadow-purple-500/50 scale-110'
                    : darkMode
                      ? 'bg-gray-700/50 text-gray-300 hover:bg-gray-600 hover:scale-105'
                      : 'bg-purple-100/50 text-gray-700 hover:bg-purple-200 hover:scale-105'
                  }
                  ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                `}
              >
                <div className={`text-2xl font-bold mb-1 ${
                  isSelected 
                    ? 'text-white' 
                    : darkMode 
                      ? 'text-purple-400' 
                      : 'text-purple-600'
                }`}>
                  {index}
                </div>
                <div className="text-sm leading-tight">{day}</div>
                
                {!isDisabled && !isSelected && (
                  <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity ${
                    darkMode 
                      ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20' 
                      : 'bg-gradient-to-br from-purple-400/20 to-pink-400/20'
                  }`} />
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Action Buttons */}
      {dateRevealed && (
        <div className="flex gap-3">
          {isCorrect === null ? (
            <>
              <button
                onClick={onCheck}
                disabled={selectedDay === null}
                className={`
                  flex-1 py-4 rounded-xl font-bold text-lg transition-all duration-200
                  ${selectedDay !== null
                    ? darkMode
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-xl shadow-purple-500/30 hover:scale-[1.02]'
                      : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-xl shadow-purple-500/30 hover:scale-[1.02]'
                    : darkMode
                      ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }
                `}
              >
                {t.checkAnswer}
              </button>
              <button
                onClick={onToggleSolution}
                className={`
                  px-6 py-4 rounded-xl font-bold text-lg transition-all duration-200
                  ${darkMode
                    ? 'bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border-2 border-blue-500/50'
                    : 'bg-blue-100 hover:bg-blue-200 text-blue-700 border-2 border-blue-300'
                  }
                `}
              >
                {showSolution ? '🙈 Hide' : '👁️ Show'} Solution
              </button>
            </>
          ) : isCorrect === false ? (
            <>
              <button
                onClick={onTryAgain}
                className={`
                  flex-1 py-4 rounded-xl font-bold text-lg transition-all duration-200
                  ${darkMode
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white shadow-xl shadow-yellow-500/30 hover:scale-[1.02]'
                    : 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white shadow-xl shadow-yellow-500/30 hover:scale-[1.02]'
                  }
                `}
              >
                {t.tryAgain}
              </button>
              <button
                onClick={onNext}
                className={`
                  flex-1 py-4 rounded-xl font-bold text-lg transition-all duration-200
                  ${darkMode
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-xl shadow-green-500/30 hover:scale-[1.02]'
                    : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-xl shadow-green-500/30 hover:scale-[1.02]'
                  }
                `}
              >
                {t.nextQuestion}
              </button>
              <button
                onClick={onToggleSolution}
                className={`
                  px-6 py-4 rounded-xl font-bold text-lg transition-all duration-200
                  ${darkMode
                    ? 'bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border-2 border-blue-500/50'
                    : 'bg-blue-100 hover:bg-blue-200 text-blue-700 border-2 border-blue-300'
                  }
                `}
              >
                {showSolution ? '🙈 Hide' : '👁️ Show'} Solution
              </button>
            </>
          ) : (
            <>
              <button
                onClick={onNext}
                className={`
                  flex-1 py-4 rounded-xl font-bold text-lg transition-all duration-200
                  ${darkMode
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-xl shadow-green-500/30 hover:scale-[1.02]'
                    : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-xl shadow-green-500/30 hover:scale-[1.02]'
                  }
                `}
              >
                {t.nextQuestion}
              </button>
              <button
                onClick={onToggleSolution}
                className={`
                  px-6 py-4 rounded-xl font-bold text-lg transition-all duration-200
                  ${darkMode
                    ? 'bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border-2 border-blue-500/50'
                    : 'bg-blue-100 hover:bg-blue-200 text-blue-700 border-2 border-blue-300'
                  }
                `}
              >
                {showSolution ? '🙈 Hide' : '👁️ Show'} Solution
              </button>
            </>
          )}
        </div>
      )}

      {/* Keyboard Shortcuts Helper */}
      {dateRevealed && (
        <div className={`mt-4 text-center text-xs ${
          darkMode ? 'text-gray-500' : 'text-gray-500'
        }`}>
          {language === 'he' 
            ? 'מקשים: 0-6 = ימים • Enter = בדיקה • N = הבא • S = פתרון • H = עזרה'
            : 'Keys: 0-6 = Days • Enter = Check • N = Next • S = Solution • H = Help'
          }
        </div>
      )}
    </div>
  );
}

export default PracticeArea;