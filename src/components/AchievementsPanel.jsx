import { X, Trophy, Star, Zap, Target, Clock, TrendingUp, Award, Crown, Flame } from 'lucide-react';

const translations = {
  he: {
    achievements: 'הישגים',
    unlocked: 'נפתח',
    locked: 'נעול',
    progress: 'התקדמות',
    close: 'סגור',
    achievements_list: [
      { name: 'צעדים ראשונים', desc: 'ענה נכון על השאלה הראשונה', icon: Star, requirement: 1, type: 'correct' },
      { name: 'מתחיל', desc: 'ענה נכון על 10 שאלות', icon: Target, requirement: 10, type: 'correct' },
      { name: 'מתמיד', desc: 'ענה נכון על 50 שאלות', icon: Trophy, requirement: 50, type: 'correct' },
      { name: 'מומחה', desc: 'ענה נכון על 100 שאלות', icon: Award, requirement: 100, type: 'correct' },
      { name: 'אמן', desc: 'ענה נכון על 250 שאלות', icon: Crown, requirement: 250, type: 'correct' },
      { name: 'רצף של 3', desc: 'רצף של 3 תשובות נכונות', icon: Flame, requirement: 3, type: 'streak' },
      { name: 'רצף של 5', desc: 'רצף של 5 תשובות נכונות', icon: Flame, requirement: 5, type: 'streak' },
      { name: 'רצף של 10', desc: 'רצף של 10 תשובות נכונות', icon: Flame, requirement: 10, type: 'streak' },
      { name: 'מהיר', desc: 'ענה נכון תוך פחות מ-5 שניות', icon: Zap, requirement: 5, type: 'speed' },
      { name: 'בזק', desc: 'ענה נכון תוך פחות מ-3 שניות', icon: Zap, requirement: 3, type: 'speed' },
      { name: 'דיוק 90%', desc: 'השג דיוק של 90% (מינימום 20 ניסיונות)', icon: Target, requirement: 90, type: 'accuracy' },
      { name: 'דיוק מושלם', desc: 'השג דיוק של 95% (מינימום 50 ניסיונות)', icon: Trophy, requirement: 95, type: 'accuracy' },
    ]
  },
  en: {
    achievements: 'Achievements',
    unlocked: 'Unlocked',
    locked: 'Locked',
    progress: 'Progress',
    close: 'Close',
    achievements_list: [
      { name: 'First Steps', desc: 'Answer your first question correctly', icon: Star, requirement: 1, type: 'correct' },
      { name: 'Beginner', desc: 'Answer 10 questions correctly', icon: Target, requirement: 10, type: 'correct' },
      { name: 'Persistent', desc: 'Answer 50 questions correctly', icon: Trophy, requirement: 50, type: 'correct' },
      { name: 'Expert', desc: 'Answer 100 questions correctly', icon: Award, requirement: 100, type: 'correct' },
      { name: 'Master', desc: 'Answer 250 questions correctly', icon: Crown, requirement: 250, type: 'correct' },
      { name: 'Streak of 3', desc: 'Get 3 correct answers in a row', icon: Flame, requirement: 3, type: 'streak' },
      { name: 'Streak of 5', desc: 'Get 5 correct answers in a row', icon: Flame, requirement: 5, type: 'streak' },
      { name: 'Streak of 10', desc: 'Get 10 correct answers in a row', icon: Flame, requirement: 10, type: 'streak' },
      { name: 'Fast', desc: 'Answer correctly in under 5 seconds', icon: Zap, requirement: 5, type: 'speed' },
      { name: 'Lightning', desc: 'Answer correctly in under 3 seconds', icon: Zap, requirement: 3, type: 'speed' },
      { name: '90% Accuracy', desc: 'Achieve 90% accuracy (minimum 20 attempts)', icon: Target, requirement: 90, type: 'accuracy' },
      { name: 'Perfect Accuracy', desc: 'Achieve 95% accuracy (minimum 50 attempts)', icon: Trophy, requirement: 95, type: 'accuracy' },
    ]
  }
};

function AchievementsPanel({ stats, onClose, darkMode, language }) {
  const t = translations[language];
  const achievements = t.achievements_list;

  const checkAchievement = (achievement) => {
    switch (achievement.type) {
      case 'correct':
        return stats.correct >= achievement.requirement;
      
      case 'streak':
        return stats.bestStreak >= achievement.requirement;
      
      case 'speed':
        const fastAnswers = stats.history.filter(h => h.correct && h.timeTaken < achievement.requirement);
        return fastAnswers.length > 0;
      
      case 'accuracy':
        if (achievement.requirement === 90 && stats.attempts < 20) return false;
        if (achievement.requirement === 95 && stats.attempts < 50) return false;
        const accuracy = stats.attempts > 0 ? (stats.correct / stats.attempts) * 100 : 0;
        return accuracy >= achievement.requirement;
      
      default:
        return false;
    }
  };

  const getProgress = (achievement) => {
    switch (achievement.type) {
      case 'correct':
        return Math.min((stats.correct / achievement.requirement) * 100, 100);
      
      case 'streak':
        return Math.min((stats.bestStreak / achievement.requirement) * 100, 100);
      
      case 'speed':
        const fastAnswers = stats.history.filter(h => h.correct && h.timeTaken < achievement.requirement);
        return fastAnswers.length > 0 ? 100 : 0;
      
      case 'accuracy':
        const minAttempts = achievement.requirement === 90 ? 20 : 50;
        if (stats.attempts < minAttempts) {
          return (stats.attempts / minAttempts) * 100;
        }
        const accuracy = stats.attempts > 0 ? (stats.correct / stats.attempts) * 100 : 0;
        return Math.min((accuracy / achievement.requirement) * 100, 100);
      
      default:
        return 0;
    }
  };

  const unlockedCount = achievements.filter(a => checkAchievement(a)).length;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        {/* Header */}
        <div className={`p-6 border-b ${
          darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className={`text-2xl font-bold flex items-center gap-3 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                <Trophy className="text-yellow-500" size={28} />
                {t.achievements}
              </h2>
              <p className={`mt-1 text-sm ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {unlockedCount} / {achievements.length} {t.unlocked}
              </p>
            </div>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg transition-colors ${
                darkMode 
                  ? 'hover:bg-gray-700 text-gray-400' 
                  : 'hover:bg-gray-200 text-gray-600'
              }`}
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement, index) => {
              const unlocked = checkAchievement(achievement);
              const progress = getProgress(achievement);
              const Icon = achievement.icon;

              return (
                <div
                  key={index}
                  className={`rounded-xl p-4 transition-all duration-200 ${
                    unlocked
                      ? darkMode
                        ? 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-2 border-yellow-500/50 shadow-lg shadow-yellow-500/20'
                        : 'bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-400 shadow-lg shadow-yellow-400/20'
                      : darkMode
                        ? 'bg-gray-700/30 border border-gray-600'
                        : 'bg-gray-100 border border-gray-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Icon */}
                    <div className={`p-3 rounded-lg ${
                      unlocked
                        ? darkMode
                          ? 'bg-yellow-500/20'
                          : 'bg-yellow-100'
                        : darkMode
                          ? 'bg-gray-600/50'
                          : 'bg-gray-200'
                    }`}>
                      <Icon 
                        className={unlocked 
                          ? 'text-yellow-500' 
                          : darkMode ? 'text-gray-500' : 'text-gray-400'
                        } 
                        size={24} 
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className={`font-semibold mb-1 ${
                        unlocked
                          ? darkMode ? 'text-yellow-400' : 'text-yellow-700'
                          : darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {achievement.name}
                      </h3>
                      <p className={`text-xs mb-2 ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {achievement.desc}
                      </p>

                      {/* Progress Bar */}
                      {!unlocked && (
                        <div>
                          <div className={`h-1.5 rounded-full overflow-hidden ${
                            darkMode ? 'bg-gray-600' : 'bg-gray-300'
                          }`}>
                            <div 
                              className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 transition-all duration-500"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                          <div className={`text-xs mt-1 ${
                            darkMode ? 'text-gray-500' : 'text-gray-500'
                          }`}>
                            {progress.toFixed(0)}%
                          </div>
                        </div>
                      )}

                      {/* Unlocked Badge */}
                      {unlocked && (
                        <div className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold ${
                          darkMode 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-green-100 text-green-700'
                        }`}>
                          ✓ {t.unlocked}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AchievementsPanel;