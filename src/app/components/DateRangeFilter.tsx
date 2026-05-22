import { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';

interface DateRangeFilterProps {
  label?: string;
  onChange?: (range: { start: string; end: string }) => void;
}

export default function DateRangeFilter({ label = 'Date Range', onChange }: DateRangeFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState('Today');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const ranges = [
    'Today',
    'Yesterday',
    'Last 7 days',
    'Last 30 days',
    'This month',
    'Last month',
    'This quarter',
    'This year',
    'Custom range',
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

  const handleSelect = (range: string) => {
    setSelectedRange(range);
    setIsOpen(false);
    // You can add actual date calculation logic here
    onChange?.({ start: '', end: '' });
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-6 py-3 font-semibold text-white bg-gradient-to-r from-teal-600 to-teal-700 rounded-xl hover:from-teal-700 hover:to-teal-800 transition-all shadow-lg hover:shadow-xl hover:scale-105 transform flex items-center gap-2"
      >
        <Calendar size={18} />
        <span>{selectedRange}</span>
        <ChevronDown
          size={18}
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 w-56 bg-white border border-gray-200 rounded-xl shadow-2xl overflow-hidden z-[9999] opacity-100 transition-opacity duration-200">
          <div className="p-2">
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wide px-3 py-2">
              Quick Select
            </div>
            {ranges.map((range) => (
              <button
                key={range}
                onClick={() => handleSelect(range)}
                className={`w-full px-3 py-2.5 text-left rounded-lg transition-colors ${
                  selectedRange === range
                    ? 'bg-gradient-to-r from-teal-50 to-blue-50 text-teal-700 font-semibold'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
