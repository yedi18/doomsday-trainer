import { X, Calendar, BookOpen, Lightbulb, Zap, User } from 'lucide-react';

const translations = {
  he: {
    title: 'אלגוריתם Doomsday',
    subtitle: 'של ג׳ון קונווי',
    overview: 'סקירה כללית',
    overviewText: 'אלגוריתם Doomsday מאפשר לך לחשב את יום השבוע של כל תאריך בראש. האלגוריתם משתמש ב"עוגני יום" - תאריכים שתמיד חלים על אותו יום בשבוע בשנה נתונה.',
    examples: 'דוגמאות מפורטות',
    example: 'דוגמה',
    steps: 'ארבעת השלבים',
    step1: 'שלב 1: עוגן המאה',
    step1Text: 'כל מאה מתחילה ביום בסיס שחוזר על עצמו כל 400 שנה',
    step2: 'שלב 2: Doomsday של השנה',
    step2Text: 'חשב את ה-Doomsday של השנה',
    step3: 'שלב 3: תאריכי ייחוס',
    step3Text: 'תאריכים אלה תמיד חלים על ה-Doomsday של השנה',
    step4: 'שלב 4: ספור ימים',
    step4Text: 'ספור קדימה או אחורה מתאריך הייחוס הקרוב ביותר',
    centuryAnchors: 'עוגני מאה',
    centuries: {
      '500-1600-2000-2400': 'ראשון (0)',
      '600-1700-2100-2500': 'שישי (5)',
      '700-1800-2200-2600': 'רביעי (3)',
      '800-1900-2300-2700': 'שלישי (2)'
    },
    referenceDates: 'תאריכי ייחוס',
    evenMonths: 'חודשים זוגיים',
    oddMonths: 'חודשים אי-זוגיים',
    specialDates: 'תאריכים מיוחדים',
    tricks: 'טריקים לזכירה',
    yearTricks: 'טריקים לחישוב שנים',
    trick1: '"אני עובד 9-5 ב-7-11"',
    trick2: 'יום הפאי - 3/14 (14 במרץ)',
    trick3: '1/3 או 1/4 בינואר',
    trick4: 'תמיד היום האחרון בפברואר',
    trick5: 'כל 12 שנה הוסף 1',
    trick6: 'כל 28 שנה - איפוס',
    about: 'אודות',
    aboutTitle: 'שלום! אני ידידיה שאולי',
    aboutText1: 'למדתי את אלגוריתם דומסדיי של קונווי והתאהבתי ביכולת לחשב במהירות את יום השבוע של כל תאריך. אחרי שהתאמנתי והשתפרתי, החלטתי ליצור אתר נגיש שיכול לעזור לאחרים להתאמן, להשתפר וללמוד את האלגוריתם המדהים הזה.',
    aboutText2: 'אני נהנה ליצור כלים ואפליקציות שעוזרות לאנשים ללמוד ולהשתפר. תכנות הוא התשוקה שלי, ואני מאמין שטכנולוגיה יכולה לעשות חינוך נגיש ומהנה יותר לכולם.',
    aboutText3: 'האתר הזה נועד לעזור לכם לתרגל ולשלוט באלגוריתם דומסדיי. עם תרגול מספיק, תוכלו לחשב את יום השבוע של כל תאריך תוך שניות ספורות, ולהרשים את החברים והמשפחה!',
    close: 'סגור'
  },
  en: {
    title: 'The Doomsday Algorithm',
    subtitle: 'By John Conway',
    overview: 'Overview',
    overviewText: 'The Doomsday Algorithm lets you calculate the day of the week for any date mentally. It uses "anchor days" - dates that always fall on the same day of the week within a year.',
    examples: 'Detailed Examples',
    example: 'Example',
    steps: 'Four Steps',
    step1: 'Step 1: Century Anchor',
    step1Text: 'Each century has a base day that repeats every 400 years',
    step2: 'Step 2: Year Doomsday',
    step2Text: 'Calculate the year\'s doomsday',
    step3: 'Step 3: Reference Dates',
    step3Text: 'These dates always fall on the year\'s doomsday',
    step4: 'Step 4: Count Days',
    step4Text: 'Count forward or backward from nearest reference date',
    centuryAnchors: 'Century Anchors',
    centuries: {
      '500-1600-2000-2400': 'Sunday (0)',
      '600-1700-2100-2500': 'Friday (5)',
      '700-1800-2200-2600': 'Wednesday (3)',
      '800-1900-2300-2700': 'Tuesday (2)'
    },
    referenceDates: 'Reference Dates',
    evenMonths: 'Even Months',
    oddMonths: 'Odd Months',
    specialDates: 'Special Dates',
    tricks: 'Memory Tricks',
    yearTricks: 'Year Calculation Tricks',
    trick1: '"I work 9-5 at 7-11"',
    trick2: 'Pi Day - 3/14 (March 14)',
    trick3: '1/3 or 1/4 in January',
    trick4: 'Always last day of February',
    trick5: 'Every 12 years add 1',
    trick6: 'Every 28 years - reset',
    about: 'About',
    aboutTitle: 'Hi! I\'m Yedidya Shauli',
    aboutText1: 'I learned Conway\'s Doomsday Algorithm and fell in love with the ability to quickly calculate the day of the week for any date. After practicing and improving, I decided to create an accessible website that can help others train, improve, and learn this amazing algorithm.',
    aboutText2: 'I enjoy creating tools and applications that help people learn and improve. Programming is my passion, and I believe technology can make education more accessible and enjoyable for everyone.',
    aboutText3: 'This site is designed to help you practice and master the Doomsday Algorithm. With enough practice, you\'ll be able to calculate the day of the week for any date in just seconds, and impress your friends and family!',
    close: 'Close'
  }
};

function Sidebar({ onClose, darkMode, language = 'en' }) {
  const t = translations[language];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-end z-50">
      <div 
        className="absolute inset-0" 
        onClick={onClose}
      />
      
      <div className={`relative w-full max-w-2xl h-full overflow-y-auto shadow-2xl ${
        darkMode ? 'bg-gray-900' : 'bg-white'
      }`}>
        {/* Header */}
        <div className={`sticky top-0 z-10 p-6 border-b backdrop-blur-lg ${
          darkMode 
            ? 'bg-gray-900/95 border-gray-700' 
            : 'bg-white/95 border-orange-200'
        }`}>
          <div className="flex items-start justify-between">
            <div>
              <h2 className={`text-2xl font-bold mb-1 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {t.title}
              </h2>
              <p className={`text-sm ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {t.subtitle}
              </p>
            </div>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg transition-colors ${
                darkMode 
                  ? 'hover:bg-gray-800 text-gray-400' 
                  : 'hover:bg-orange-100 text-gray-600'
              }`}
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Overview */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className={darkMode ? 'text-purple-400' : 'text-orange-600'} size={20} />
              <h3 className={`text-lg font-bold ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {t.overview}
              </h3>
            </div>
            <p className={`text-sm leading-relaxed ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              {t.overviewText}
            </p>
          </section>

          {/* Four Steps */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Calendar className={darkMode ? 'text-pink-400' : 'text-red-600'} size={20} />
              <h3 className={`text-lg font-bold ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {t.steps}
              </h3>
            </div>

            <div className="space-y-3">
              {[
                { title: t.step1, text: t.step1Text },
                { title: t.step2, text: t.step2Text },
                { title: t.step3, text: t.step3Text },
                { title: t.step4, text: t.step4Text }
              ].map((step, index) => (
                <div 
                  key={index}
                  className={`p-4 rounded-xl ${
                    darkMode ? 'bg-gray-800' : 'bg-orange-50'
                  }`}
                >
                  <div className={`font-semibold mb-1 ${
                    darkMode ? 'text-purple-300' : 'text-orange-700'
                  }`}>
                    {step.title}
                  </div>
                  <div className={`text-sm ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {step.text}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Century Anchors */}
          <section>
            <h3 className={`text-lg font-bold mb-3 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {t.centuryAnchors}
            </h3>
            <div className={`rounded-xl overflow-hidden ${
              darkMode ? 'bg-gray-800' : 'bg-orange-50'
            }`}>
              {Object.entries(t.centuries).map(([years, day], index) => (
                <div 
                  key={index}
                  className={`p-4 flex items-center justify-between ${
                    index !== Object.keys(t.centuries).length - 1
                      ? darkMode ? 'border-b border-gray-700' : 'border-b border-orange-200'
                      : ''
                  }`}
                >
                  <span className={`font-mono ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {years}
                  </span>
                  <span className={`font-semibold ${
                    darkMode ? 'text-purple-300' : 'text-orange-600'
                  }`}>
                    {day}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Reference Dates */}
          <section>
            <h3 className={`text-lg font-bold mb-3 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {t.referenceDates}
            </h3>
            
            <div className="space-y-3">
              <div className={`p-4 rounded-xl ${
                darkMode ? 'bg-gray-800' : 'bg-orange-50'
              }`}>
                <div className={`font-semibold mb-2 ${
                  darkMode ? 'text-gray-200' : 'text-gray-800'
                }`}>
                  {t.evenMonths}
                </div>
                <div className={`font-mono text-lg ${
                  darkMode ? 'text-purple-300' : 'text-orange-600'
                }`}>
                  4/4, 6/6, 8/8, 10/10, 12/12
                </div>
              </div>

              <div className={`p-4 rounded-xl ${
                darkMode ? 'bg-gray-800' : 'bg-orange-50'
              }`}>
                <div className={`font-semibold mb-2 ${
                  darkMode ? 'text-gray-200' : 'text-gray-800'
                }`}>
                  {t.oddMonths}
                </div>
                <div className={`font-mono text-lg ${
                  darkMode ? 'text-purple-300' : 'text-orange-600'
                }`}>
                  5/9, 9/5, 7/11, 11/7
                </div>
              </div>

              <div className={`p-4 rounded-xl ${
                darkMode ? 'bg-gray-800' : 'bg-orange-50'
              }`}>
                <div className={`font-semibold mb-2 ${
                  darkMode ? 'text-gray-200' : 'text-gray-800'
                }`}>
                  {t.specialDates}
                </div>
                <div className="space-y-1">
                  <div className={`font-mono ${
                    darkMode ? 'text-purple-300' : 'text-orange-600'
                  }`}>
                    <span className="font-bold">π</span> 3/14 (March 14 - Pi Day!)
                  </div>
                  <div className={`font-mono ${
                    darkMode ? 'text-purple-300' : 'text-orange-600'
                  }`}>
                    📅 Jan: 1/3 (common) or 1/4 (leap)
                  </div>
                  <div className={`font-mono ${
                    darkMode ? 'text-purple-300' : 'text-orange-600'
                  }`}>
                    📆 Feb: 2/28 or 2/29 (last day)
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Memory Tricks */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className={darkMode ? 'text-yellow-400' : 'text-yellow-600'} size={20} />
              <h3 className={`text-lg font-bold ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {t.tricks}
              </h3>
            </div>
            
            <div className="space-y-3">
              <div className={`p-4 rounded-xl ${
                darkMode 
                  ? 'bg-yellow-500/10 border border-yellow-500/30' 
                  : 'bg-yellow-50 border border-yellow-300'
              }`}>
                <div className={`font-bold mb-1 ${
                  darkMode ? 'text-yellow-300' : 'text-yellow-700'
                }`}>
                  💼 {t.trick1}
                </div>
                <div className={`text-sm ${
                  darkMode ? 'text-yellow-200' : 'text-yellow-600'
                }`}>
                  5/9, 9/5, 7/11, 11/7
                </div>
              </div>

              <div className={`p-4 rounded-xl ${
                darkMode 
                  ? 'bg-yellow-500/10 border border-yellow-500/30' 
                  : 'bg-yellow-50 border border-yellow-300'
              }`}>
                <div className={`font-bold mb-1 ${
                  darkMode ? 'text-yellow-300' : 'text-yellow-700'
                }`}>
                  🥧 {t.trick2}
                </div>
                <div className={`text-sm ${
                  darkMode ? 'text-yellow-200' : 'text-yellow-600'
                }`}>
                  March 14 = 3.14 = π
                </div>
              </div>

              <div className={`p-4 rounded-xl ${
                darkMode 
                  ? 'bg-yellow-500/10 border border-yellow-500/30' 
                  : 'bg-yellow-50 border border-yellow-300'
              }`}>
                <div className={`font-bold mb-1 ${
                  darkMode ? 'text-yellow-300' : 'text-yellow-700'
                }`}>
                  📅 {t.trick3}
                </div>
                <div className={`text-sm ${
                  darkMode ? 'text-yellow-200' : 'text-yellow-600'
                }`}>
                  3 years = 1/3, 4th year (leap) = 1/4
                </div>
              </div>

              <div className={`p-4 rounded-xl ${
                darkMode 
                  ? 'bg-yellow-500/10 border border-yellow-500/30' 
                  : 'bg-yellow-50 border border-yellow-300'
              }`}>
                <div className={`font-bold mb-1 ${
                  darkMode ? 'text-yellow-300' : 'text-yellow-700'
                }`}>
                  📆 {t.trick4}
                </div>
                <div className={`text-sm ${
                  darkMode ? 'text-yellow-200' : 'text-yellow-600'
                }`}>
                  2/28 (common) or 2/29 (leap year)
                </div>
              </div>
            </div>
          </section>

          {/* Year Tricks */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <Zap className={darkMode ? 'text-pink-400' : 'text-red-600'} size={20} />
              <h3 className={`text-lg font-bold ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {t.yearTricks}
              </h3>
            </div>
            
            <div className="space-y-3">
              <div className={`p-4 rounded-xl ${
                darkMode 
                  ? 'bg-pink-500/10 border border-pink-500/30' 
                  : 'bg-red-50 border border-red-300'
              }`}>
                <div className={`font-bold mb-1 ${
                  darkMode ? 'text-pink-300' : 'text-red-700'
                }`}>
                  ⚡ {t.trick5}
                </div>
                <div className={`text-sm ${
                  darkMode ? 'text-pink-200' : 'text-red-600'
                }`}>
                  Every 12 years, add 1 to doomsday
                </div>
              </div>

              <div className={`p-4 rounded-xl ${
                darkMode 
                  ? 'bg-pink-500/10 border border-pink-500/30' 
                  : 'bg-red-50 border border-red-300'
              }`}>
                <div className={`font-bold mb-1 ${
                  darkMode ? 'text-pink-300' : 'text-red-700'
                }`}>
                  🔄 {t.trick6}
                </div>
                <div className={`text-sm ${
                  darkMode ? 'text-pink-200' : 'text-red-600'
                }`}>
                  Every 28 years, the pattern repeats
                </div>
              </div>
            </div>
          </section>

          {/* Detailed Examples */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Calendar className={darkMode ? 'text-blue-400' : 'text-blue-600'} size={20} />
              <h3 className={`text-lg font-bold ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {t.examples}
              </h3>
            </div>

            {/* Example 1: March 15, 2024 */}
            <div className={`p-5 rounded-xl mb-4 ${darkMode ? 'bg-blue-500/10 border border-blue-500/30' : 'bg-blue-50 border border-blue-300'}`}>
              <div className={`font-bold text-lg mb-3 ${darkMode ? 'text-blue-300' : 'text-blue-800'}`}>
                {t.example} 1: March 15, 2024
              </div>
              <div className={`space-y-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <p><strong>Step 1:</strong> Century 2000 → Anchor = Friday (5)</p>
                <p><strong>Step 2:</strong> Year 24 in century</p>
                <p className="mr-4">a = ⌊24/12⌋ = 2</p>
                <p className="mr-4">b = 24 mod 12 = 0</p>
                <p className="mr-4">c = ⌊0/4⌋ = 0</p>
                <p className="mr-4">Doomsday = (5 + 2 + 0 + 0) mod 7 = 0 (Sunday)</p>
                <p><strong>Step 3:</strong> March doomsday = 0 (last day of Feb)</p>
                <p><strong>Step 4:</strong> 15 - 0 = 15, (0 + 15) mod 7 = 1</p>
                <p className={`font-bold mt-2 text-base ${darkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                  Answer: Monday 📅
                </p>
              </div>
            </div>

            {/* Example 2: December 7, 1941 (Pearl Harbor) */}
            <div className={`p-5 rounded-xl mb-4 ${darkMode ? 'bg-green-500/10 border border-green-500/30' : 'bg-green-50 border border-green-300'}`}>
              <div className={`font-bold text-lg mb-3 ${darkMode ? 'text-green-300' : 'text-green-800'}`}>
                {t.example} 2: December 7, 1941 (Pearl Harbor)
              </div>
              <div className={`space-y-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <p><strong>Step 1:</strong> Century 1900 → Anchor = Sunday (0)</p>
                <p><strong>Step 2:</strong> Year 41 in century</p>
                <p className="mr-4">a = ⌊41/12⌋ = 3</p>
                <p className="mr-4">b = 41 mod 12 = 5</p>
                <p className="mr-4">c = ⌊5/4⌋ = 1</p>
                <p className="mr-4">Doomsday = (0 + 3 + 5 + 1) mod 7 = 2 (Tuesday)</p>
                <p><strong>Step 3:</strong> December doomsday = 12/12</p>
                <p><strong>Step 4:</strong> 7 - 12 = -5, (2 + (-5)) mod 7 = 0</p>
                <p className={`font-bold mt-2 text-base ${darkMode ? 'text-green-400' : 'text-green-700'}`}>
                  Answer: Sunday 🎖️
                </p>
              </div>
            </div>

            {/* Example 3: July 20, 1969 (Moon Landing) */}
            <div className={`p-5 rounded-xl ${darkMode ? 'bg-purple-500/10 border border-purple-500/30' : 'bg-purple-50 border border-purple-300'}`}>
              <div className={`font-bold text-lg mb-3 ${darkMode ? 'text-purple-300' : 'text-purple-800'}`}>
                {t.example} 3: July 20, 1969 (Moon Landing)
              </div>
              <div className={`space-y-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <p><strong>Step 1:</strong> Century 1900 → Anchor = Sunday (0)</p>
                <p><strong>Step 2:</strong> Year 69 in century</p>
                <p className="mr-4">a = ⌊69/12⌋ = 5</p>
                <p className="mr-4">b = 69 mod 12 = 9</p>
                <p className="mr-4">c = ⌊9/4⌋ = 2</p>
                <p className="mr-4">Doomsday = (0 + 5 + 9 + 2) mod 7 = 2 (Tuesday)</p>
                <p><strong>Step 3:</strong> July doomsday = 7/11</p>
                <p><strong>Step 4:</strong> 20 - 11 = 9, (2 + 9) mod 7 = 4</p>
                <p className={`font-bold mt-2 text-base ${darkMode ? 'text-purple-400' : 'text-purple-700'}`}>
                  Answer: Thursday 🌙
                </p>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <User className={darkMode ? 'text-yellow-400' : 'text-yellow-600'} size={20} />
              <h3 className={`text-lg font-bold ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {t.about}
              </h3>
            </div>

            <div className={`p-6 rounded-xl space-y-4 ${
              darkMode 
                ? 'bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30' 
                : 'bg-gradient-to-br from-orange-50 to-pink-50 border border-orange-300'
            }`}>
              <div className={`text-xl font-bold mb-3 ${darkMode ? 'text-purple-300' : 'text-purple-800'}`}>
                {t.aboutTitle} 👋
              </div>
              
              <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {t.aboutText1}
              </p>
              
              <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                💻 {t.aboutText2}
              </p>
              
              <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                🎯 {t.aboutText3}
              </p>

              <div className={`mt-4 p-4 rounded-lg text-center ${
                darkMode ? 'bg-purple-600/20' : 'bg-purple-100'
              }`}>
                <p className={`font-bold text-lg ${darkMode ? 'text-purple-300' : 'text-purple-800'}`}>
                  Good luck! 🚀
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;