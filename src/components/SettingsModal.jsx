import { X, Settings as SettingsIcon } from 'lucide-react';
import { useState } from 'react';

const translations = {
  he: {
    settings: 'הגדרות',
    yearRange: 'טווח שנים',
    minYear: 'שנה מינימלית',
    maxYear: 'שנה מקסימלית',
    display: 'תצוגה',
    showTimer: 'הצג טיימר',
    showHints: 'הצג רמזים',
    soundEnabled: 'הפעל צלילים',
    save: 'שמור',
    cancel: 'ביטול',
    defaults: 'ברירת מחדל'
  },
  en: {
    settings: 'Settings',
    yearRange: 'Year Range',
    minYear: 'Minimum Year',
    maxYear: 'Maximum Year',
    display: 'Display',
    showTimer: 'Show Timer',
    showHints: 'Show Hints',
    soundEnabled: 'Enable Sounds',
    save: 'Save',
    cancel: 'Cancel',
    defaults: 'Reset to Defaults'
  }
};

function SettingsModal({ settings, onSave, onClose, darkMode, language = 'en' }) {
  const [localSettings, setLocalSettings] = useState(settings);
  const t = translations[language];

  const handleSave = () => {
    onSave(localSettings);
  };

  const handleReset = () => {
    setLocalSettings({
      minYear: 500,
      maxYear: 2500,
      showTimer: true,
      showHints: true,
      soundEnabled: false
    });
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`rounded-2xl max-w-md w-full shadow-2xl ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        {/* Header */}
        <div className={`p-6 border-b ${
          darkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <SettingsIcon className={darkMode ? 'text-purple-400' : 'text-orange-600'} size={24} />
              <h2 className={`text-2xl font-bold ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {t.settings}
              </h2>
            </div>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg transition-colors ${
                darkMode 
                  ? 'hover:bg-gray-700 text-gray-400' 
                  : 'hover:bg-gray-200 text-gray-600'
              }`}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Year Range */}
          <section>
            <h3 className={`text-lg font-semibold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {t.yearRange}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className={`block text-sm mb-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {t.minYear}
                </label>
                <input
                  type="number"
                  value={localSettings.minYear}
                  onChange={(e) => setLocalSettings({
                    ...localSettings,
                    minYear: parseInt(e.target.value)
                  })}
                  min="1"
                  max={localSettings.maxYear}
                  className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white focus:border-purple-500' 
                      : 'bg-white border-gray-300 text-gray-900 focus:border-orange-500'
                  } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
                />
              </div>

              <div>
                <label className={`block text-sm mb-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {t.maxYear}
                </label>
                <input
                  type="number"
                  value={localSettings.maxYear}
                  onChange={(e) => setLocalSettings({
                    ...localSettings,
                    maxYear: parseInt(e.target.value)
                  })}
                  min={localSettings.minYear}
                  max="9999"
                  className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white focus:border-purple-500' 
                      : 'bg-white border-gray-300 text-gray-900 focus:border-orange-500'
                  } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
                />
              </div>
            </div>
          </section>

          {/* Display Options */}
          <section>
            <h3 className={`text-lg font-semibold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {t.display}
            </h3>
            
            <div className="space-y-3">
              <label className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-colors ${
                darkMode 
                  ? 'bg-gray-700/50 hover:bg-gray-700' 
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}>
                <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                  {t.showTimer}
                </span>
                <input
                  type="checkbox"
                  checked={localSettings.showTimer}
                  onChange={(e) => setLocalSettings({
                    ...localSettings,
                    showTimer: e.target.checked
                  })}
                  className="w-5 h-5 rounded accent-purple-500"
                />
              </label>

              <label className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-colors ${
                darkMode 
                  ? 'bg-gray-700/50 hover:bg-gray-700' 
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}>
                <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                  {t.showHints}
                </span>
                <input
                  type="checkbox"
                  checked={localSettings.showHints}
                  onChange={(e) => setLocalSettings({
                    ...localSettings,
                    showHints: e.target.checked
                  })}
                  className="w-5 h-5 rounded accent-purple-500"
                />
              </label>

              <label className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-colors ${
                darkMode 
                  ? 'bg-gray-700/50 hover:bg-gray-700' 
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}>
                <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                  {t.soundEnabled}
                </span>
                <input
                  type="checkbox"
                  checked={localSettings.soundEnabled}
                  onChange={(e) => setLocalSettings({
                    ...localSettings,
                    soundEnabled: e.target.checked
                  })}
                  className="w-5 h-5 rounded accent-purple-500"
                />
              </label>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className={`p-6 border-t ${
          darkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <div className="flex gap-3">
            <button
              onClick={handleReset}
              className={`px-4 py-2 rounded-lg transition-colors text-sm ${
                darkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
            >
              {t.defaults}
            </button>
            
            <div className="flex-1" />
            
            <button
              onClick={onClose}
              className={`px-4 py-2 rounded-lg transition-colors ${
                darkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
              }`}
            >
              {t.cancel}
            </button>
            
            <button
              onClick={handleSave}
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white transition-all hover:scale-[1.02]"
            >
              {t.save}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsModal;