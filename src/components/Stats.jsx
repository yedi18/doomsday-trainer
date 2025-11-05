import { Target, Zap, Clock, TrendingUp } from 'lucide-react';

const translations = {
  he: {
    accuracy: 'דיוק',
    streak: 'רצף',
    avgTime: 'זמן',
    total: 'סה"כ',
  },
  en: {
    accuracy: 'Accuracy',
    streak: 'Streak',
    avgTime: 'Avg Time',
    total: 'Total',
  }
};

function Stats({ stats, darkMode, language, compact = false }) {
  const t = translations[language];
  
  const accuracy = stats.attempts > 0 
    ? ((stats.correct / stats.attempts) * 100).toFixed(0) 
    : 0;
  
  const avgTime = stats.attempts > 0 
    ? (stats.totalTime / stats.attempts).toFixed(1) 
    : 0;

  const StatCard = ({ icon: Icon, label, value, color }) => (
    <div className={`rounded-xl p-4 backdrop-blur-sm transition-all duration-200 hover:scale-[1.02] ${
      darkMode 
        ? 'bg-gray-800/80 border border-gray-700' 
        : 'bg-white/80 border border-orange-200'
    }`}>
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg flex-shrink-0 ${
          darkMode ? `bg-${color}-500/20` : `bg-${color}-100`
        }`}>
          <Icon 
            className={darkMode ? `text-${color}-400` : `text-${color}-600`} 
            size={20} 
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className={`text-2xl font-bold ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {value}
          </div>
          <div className={`text-xs truncate ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {label}
          </div>
        </div>
      </div>
    </div>
  );

  if (compact) {
    return (
      <>
        <StatCard
          icon={Target}
          label={t.accuracy}
          value={`${accuracy}%`}
          color="purple"
        />
        
        <StatCard
          icon={Zap}
          label={t.streak}
          value={stats.streak}
          color="pink"
        />
        
        <StatCard
          icon={Clock}
          label={t.avgTime}
          value={`${avgTime}s`}
          color="orange"
        />
        
        <StatCard
          icon={TrendingUp}
          label={t.total}
          value={stats.attempts}
          color="red"
        />
      </>
    );
  }

  // Full stats view can be added here if needed
  return null;
}

export default Stats;