import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface FilterOption {
  value: string;
  label: string;
}

interface FilterDropdownProps {
  label: string;
  icon?: React.ReactNode;
  options: FilterOption[];
  value?: string;
  onChange?: (value: string) => void;
  variant?: 'primary' | 'secondary';
}

export default function FilterDropdown({
  label,
  icon,
  options,
  value,
  onChange,
  variant = 'secondary',
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || options[0]?.value);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    setSelectedValue(optionValue);
    onChange?.(optionValue);
    setIsOpen(false);
  };

  const selectedLabel = options.find(opt => opt.value === selectedValue)?.label || label;

  const isPrimary = variant === 'primary';

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`px-6 py-3 font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-105 transform flex items-center gap-2 ${
          isPrimary
            ? 'text-white bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800'
            : 'text-gray-700 bg-white border-2 border-gray-200 hover:bg-gray-50 hover:border-gray-300 shadow-sm hover:shadow-md'
        }`}
      >
        {icon}
        <span>{selectedLabel}</span>
        <ChevronDown
          size={18}
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 w-64 bg-white border border-gray-200 rounded-xl shadow-2xl overflow-hidden z-[9999] opacity-100 transition-opacity duration-200">
          <div className="max-h-80 overflow-y-auto">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`w-full px-4 py-3 text-left flex items-center justify-between transition-colors ${
                  selectedValue === option.value
                    ? 'bg-gradient-to-r from-teal-50 to-blue-50 text-teal-700 font-semibold'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span>{option.label}</span>
                {selectedValue === option.value && (
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
