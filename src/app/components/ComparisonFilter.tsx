import { useState, useRef, useEffect } from 'react';
import { TrendingUp, ChevronDown, Check } from 'lucide-react';

interface ComparisonFilterProps {
  onChange?: (value: string) => void;
}

export default function ComparisonFilter({ onChange }: ComparisonFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('previous-day');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const options = [
    { value: 'previous-day', label: 'Compared to previous day', icon: '📅' },
    { value: 'previous-week', label: 'Compared to previous week', icon: '📊' },
    { value: 'previous-month', label: 'Compared to previous month', icon: '📈' },
    { value: 'previous-quarter', label: 'Compared to previous quarter', icon: '📉' },
    { value: 'previous-year', label: 'Compared to previous year', icon: '🗓️' },
    { value: 'none', label: 'No comparison', icon: '⊘' },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (value: string) => {
    setSelected(value);
    onChange?.(value);
    setIsOpen(false);
  };

  const selectedLabel = options.find(opt => opt.value === selected)?.label || 'Select comparison';

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-6 py-3 font-semibold text-gray-700 bg-white border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm hover:shadow-md flex items-center gap-2"
      >
        <TrendingUp size={18} />
        <span className="max-w-[200px] truncate">{selectedLabel}</span>
        <ChevronDown
          size={18}
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 w-80 bg-white border border-gray-200 rounded-xl shadow-2xl overflow-hidden z-[9999] opacity-100 transition-opacity duration-200">
          <div className="p-2">
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wide px-3 py-2 flex items-center gap-2">
              <TrendingUp size={14} />
              Comparison Period
            </div>
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`w-full px-3 py-3 text-left flex items-center justify-between rounded-lg transition-all ${
                  selected === option.value
                    ? 'bg-gradient-to-r from-teal-50 to-blue-50 text-teal-700 font-semibold shadow-sm'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{option.icon}</span>
                  <span>{option.label}</span>
                </div>
                {selected === option.value && (
                  <Check size={18} className="text-teal-600" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
