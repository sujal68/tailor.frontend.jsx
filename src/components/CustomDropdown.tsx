import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface CustomDropdownProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  value,
  onChange,
  placeholder
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openUp, setOpenUp] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const selectedOption = options.find(option => option.value === value);
  const displayText = selectedOption ? selectedOption.label : placeholder;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;

      // Open upward if less space below and more space above
      setOpenUp(spaceBelow < 250 && spaceAbove > 250);
    }
  }, [isOpen]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  const handleOptionSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className="w-full px-3 py-2.5 pr-12 bg-white/60 border border-[#e3dbd0] rounded-xl text-sm text-[#6f5b3e] focus:outline-none focus:ring-2 focus:ring-[#6f5b3e]/30 focus:border-[#6f5b3e] cursor-pointer text-left transition-all duration-200 hover:bg-white/70"
      >
        <span className="block truncate">{displayText}</span>
        <ChevronDown
          className={`absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8b7a63] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''
            }`}
        />
      </button>

      {isOpen && (
        <div className={`absolute z-50 w-full bg-white border border-[#e3dbd0] rounded-xl shadow-lg animate-in fade-in-0 zoom-in-95 duration-200 ${openUp ? 'bottom-full mb-1' : 'top-full mt-1'
          }`}>
          <div className="py-1 max-h-60 overflow-auto">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleOptionSelect(option.value)}
                className={`w-full px-3 py-2 text-left text-sm transition-colors duration-150 hover:bg-[#f8f6f3] hover:rounded-lg flex items-center justify-between ${value === option.value
                    ? 'bg-[#6f5b3e]/5 text-[#6f5b3e] font-medium'
                    : 'text-[#6f5b3e]'
                  }`}
              >
                <span className="truncate">{option.label}</span>
                {value === option.value && (
                  <Check className="w-4 h-4 text-[#6f5b3e] flex-shrink-0 ml-2" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;