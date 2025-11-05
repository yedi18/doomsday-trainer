import { BookOpen, X } from 'lucide-react';
import { calculateDayOfWeek, getCenturyAnchor, getYearDoomsday, DAYS_OF_WEEK } from '../utils/doomsdayAlgorithm';

const translations = {
  he: {
    solution: 'פתרון מפורט',
    step: 'שלב',
    centuryAnchor: 'עוגן המאה',
    yearDoomsday: 'Doomsday של השנה',
    monthDoomsday: 'Doomsday של החודש',
    finalCalculation: 'חישוב סופי',
    result: 'תוצאה סופית',
    century: 'מאה',
    yearInCentury: 'שנה בתוך המאה',
    calculation: 'חישוב',
    leapYear: '(שנה מעוברת)',
    difference: 'הפרש',
    days: ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'],
    close: 'סגור'
  },
  en: {
    solution: 'Detailed Solution',
    step: 'Step',
    centuryAnchor: 'Century Anchor',
    yearDoomsday: 'Year Doomsday',
    monthDoomsday: 'Month Doomsday',
    finalCalculation: 'Final Calculation',
    result: 'Final Result',
    century: 'Century',
    yearInCentury: 'Year in Century',
    calculation: 'Calculation',
    leapYear: '(Leap Year)',
    difference: 'Difference',
    days: DAYS_OF_WEEK,
    close: 'Close'
  }
};

// Month doomsdays reference
const getMonthDoomsday = (month, isLeapYear) => {
  const doomsdayDates = [
    isLeapYear ? 4 : 3,  // Jan (4 in leap, 3 in common)
    isLeapYear ? 29 : 28, // Feb (29 in leap, 28 in common)
    7,  // Mar (March 7, or any multiple of 7: 0, 14, 21, 28)
    4,  // Apr
    9,  // May
    6,  // Jun
    11, // Jul
    8,  // Aug
    5,  // Sep
    10, // Oct
    7,  // Nov
    12  // Dec
  ];
  return doomsdayDates[month - 1];
};

const monthNames = {
  he: ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'],
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
};

function SolutionPanel({ date, darkMode, language = 'en', onClose }) {
  const t = translations[language];
  const daysOfWeek = t.days;
  
  const century = Math.floor(date.year / 100);
  const yearInCentury = date.year % 100;
  const isLeapYear = (date.year % 4 === 0 && date.year % 100 !== 0) || (date.year % 400 === 0);
  
  // Step 1: Century Anchor - using the algorithm function
  const centuryAnchor = getCenturyAnchor(date.year);
  
  // Step 2: Year Doomsday Calculation
  const a = Math.floor(yearInCentury / 12);
  const b = yearInCentury % 12;
  const c = Math.floor(b / 4);
  const yearDoomsday = (centuryAnchor + a + b + c) % 7;
  
  // Step 3: Month Doomsday
  const monthDoomsday = getMonthDoomsday(date.month, isLeapYear);
  
  // Step 4: Final Calculation
  const diff = date.day - monthDoomsday;
  let finalDay = (yearDoomsday + diff) % 7;
  if (finalDay < 0) finalDay += 7;

  return (
    <div className={`rounded-2xl p-8 backdrop-blur-sm ${
      darkMode 
        ? 'bg-gray-800/90 border border-gray-700' 
        : 'bg-white/90 border border-gray-200'
    }`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <BookOpen className={darkMode ? 'text-purple-400' : 'text-purple-600'} size={24} />
          <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {t.solution}
          </h3>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className={`p-2 rounded-lg hover:bg-gray-700/50 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
          >
            <X size={20} />
          </button>
        )}
      </div>

      <div className="space-y-5">
        {/* Step 1: Century Anchor */}
        <div className={`p-5 rounded-xl ${darkMode ? 'bg-purple-500/20 border border-purple-500/30' : 'bg-purple-50 border border-purple-200'}`}>
          <div className={`font-bold text-lg mb-3 ${darkMode ? 'text-purple-300' : 'text-purple-800'}`}>
            {t.step} 1: {t.centuryAnchor}
          </div>
          <div className={`space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <p>
              {t.century}: {century}00 → Position: {((century - 16) % 4 + 4) % 4}
            </p>
            <p className="font-mono text-sm">
              Century anchors cycle every 400 years (1600s→2, 1700s→0, 1800s→5, 1900s→3)
            </p>
            <div className={`mt-2 p-3 rounded-lg ${darkMode ? 'bg-purple-600/20' : 'bg-purple-100'}`}>
              <p className="font-bold">
                Anchor day = <span className={darkMode ? 'text-purple-300' : 'text-purple-700'}>{daysOfWeek[centuryAnchor]} ({centuryAnchor})</span>
              </p>
            </div>
          </div>
        </div>

        {/* Step 2: Year Doomsday */}
        <div className={`p-5 rounded-xl ${darkMode ? 'bg-blue-500/20 border border-blue-500/30' : 'bg-blue-50 border border-blue-200'}`}>
          <div className={`font-bold text-lg mb-3 ${darkMode ? 'text-blue-300' : 'text-blue-800'}`}>
            {t.step} 2: {t.yearDoomsday}
          </div>
          <div className={`space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <p>
              {t.yearInCentury}: {yearInCentury}
            </p>
            <p className="font-mono">
              a = ⌊{yearInCentury}/12⌋ = {a}
            </p>
            <p className="font-mono">
              b = {yearInCentury} mod 12 = {b}
            </p>
            <p className="font-mono">
              c = ⌊{b}/4⌋ = {c}
            </p>
            <div className={`mt-2 p-3 rounded-lg ${darkMode ? 'bg-blue-600/20' : 'bg-blue-100'}`}>
              <p className="font-bold">
                Year Doomsday = ({centuryAnchor} + {a} + {b} + {c}) mod 7 = <span className={darkMode ? 'text-blue-300' : 'text-blue-700'}>{yearDoomsday}</span>
              </p>
              <p className="text-sm mt-1">
                = {daysOfWeek[yearDoomsday]}
              </p>
            </div>
          </div>
        </div>

        {/* Step 3: Month Doomsday */}
        <div className={`p-5 rounded-xl ${darkMode ? 'bg-green-500/20 border border-green-500/30' : 'bg-green-50 border border-green-200'}`}>
          <div className={`font-bold text-lg mb-3 ${darkMode ? 'text-green-300' : 'text-green-800'}`}>
            {t.step} 3: {t.monthDoomsday}
          </div>
          <div className={`space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <p>
              {monthNames[language][date.month - 1]} {isLeapYear ? t.leapYear : ''}
            </p>
            <p className="text-sm">
              Reference dates: 4/4, 6/6, 8/8, 10/10, 12/12<br/>
              Odd months: 5/9, 9/5, 7/11, 11/7<br/>
              Jan: {isLeapYear ? '1/4' : '1/3'}, Feb: {isLeapYear ? '2/29' : '2/28'}, Mar: 3/0 (last day of Feb)
            </p>
            <div className={`mt-2 p-3 rounded-lg ${darkMode ? 'bg-green-600/20' : 'bg-green-100'}`}>
              <p className="font-bold">
                Month Doomsday = <span className={darkMode ? 'text-green-300' : 'text-green-700'}>{monthNames[language][date.month - 1]} {monthDoomsday}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Step 4: Final Calculation */}
        <div className={`p-5 rounded-xl ${darkMode ? 'bg-pink-500/20 border border-pink-500/30' : 'bg-pink-50 border border-pink-200'}`}>
          <div className={`font-bold text-lg mb-3 ${darkMode ? 'text-pink-300' : 'text-pink-800'}`}>
            {t.step} 4: {t.finalCalculation}
          </div>
          <div className={`space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <p>
              Target date: {monthNames[language][date.month - 1]} {date.day}
            </p>
            <p className="font-mono">
              {t.difference} = {date.day} - {monthDoomsday} = {diff}
            </p>
            <p className="font-mono">
              Day of week = ({yearDoomsday} + {diff}) mod 7 = {finalDay}
            </p>
          </div>
        </div>

        {/* Final Result */}
        <div className={`p-6 text-center rounded-xl ${
          darkMode 
            ? 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-2 border-yellow-500/50' 
            : 'bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-400'
        }`}>
          <div className={`text-sm mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {t.result}
          </div>
          <div className={`text-5xl font-bold ${darkMode ? 'text-yellow-400' : 'text-orange-700'}`}>
            {daysOfWeek[finalDay]}
          </div>
          <div className={`text-lg mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            ({finalDay})
          </div>
        </div>
      </div>
    </div>
  );
}

export default SolutionPanel;