// components/PhoneInput.tsx
// Phone input component - controlled component pattern

import React, { useState, useCallback } from 'react';
import { Phone, ChevronDown } from 'lucide-react';
import { countries, Country, formatPhoneNumber, extractDigitsAfterCountryCode, countPhoneDigits, validatePhone, getValidationError } from '../../utils/phoneUtils';

interface PhoneInputProps {
  value: string;
  onChange: (value: string, isValid: boolean) => void;
  defaultCountry?: Country['code'];
  className?: string;
  showError?: boolean;
  disabled?: boolean;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({ value, onChange, defaultCountry = 'FR', className = '', showError = true, disabled = false }) => {
  const [selectedCountryCode, setSelectedCountryCode] = useState<Country['code']>(defaultCountry);
  const [showDropdown, setShowDropdown] = useState(false);

  const country = countries.find((c) => c.code === selectedCountryCode) || countries[0];

  // Calculate derived values
  const digitCount = countPhoneDigits(value, country);
  const maxDigits = country.code === 'GB' && value.includes('0') ? 11 : country.maxDigitsAfterCode;
  const error = getValidationError(value, country);

  // Handle phone input change
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;

      // If the input is being deleted (backspace/delete)
      if (inputValue.length < value.length) {
        onChange(inputValue, validatePhone(inputValue, country));
        return;
      }

      // Extract all digits from the input
      const allInputDigits = inputValue.replace(/\D/g, '');

      // Remove country code if it was typed
      const countryCodeDigits = country.countryCode.replace(/\D/g, '');
      let phoneDigits = allInputDigits;

      // Check if user is trying to type the country code
      if (allInputDigits.startsWith(countryCodeDigits)) {
        phoneDigits = allInputDigits.slice(countryCodeDigits.length);
      }

      // Get current digits (without country code)
      const currentDigits = extractDigitsAfterCountryCode(value, country);

      // If we already have max digits, don't allow more
      if (currentDigits.length >= country.maxDigitsAfterCode) {
        return;
      }

      // Find what new digits were added
      let newDigits = phoneDigits;

      // If the input already had some digits, find only the new ones
      if (currentDigits.length > 0) {
        if (phoneDigits.length > currentDigits.length) {
          newDigits = currentDigits + phoneDigits.slice(currentDigits.length);
        } else {
          newDigits = phoneDigits;
        }
      }

      // Limit to max digits
      newDigits = newDigits.slice(0, country.maxDigitsAfterCode);

      // Format the phone number
      const formatted = formatPhoneNumber(newDigits, country);
      onChange(formatted, validatePhone(formatted, country));
    },
    [value, country, onChange]
  );

  // Handle country change
  const handleCountrySelect = useCallback(
    (countryCode: Country['code']) => {
      setSelectedCountryCode(countryCode);
      const newCountry = countries.find((c) => c.code === countryCode);
      if (newCountry) {
        // Reset to just country code when changing countries
        onChange(newCountry.countryCode, false);
      }
      setShowDropdown(false);
    },
    [onChange]
  );

  return (
    <div className={className}>
      <div className="flex gap-2">
        {/* Country Selector */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowDropdown(!showDropdown)}
            disabled={disabled}
            className={`flex items-center gap-2 px-3 py-3 border rounded-lg transition-colors ${
              disabled ? 'bg-gray-100 cursor-not-allowed' : 'hover:bg-gray-50 focus:outline-none focus:border-[#517664] border-slate-300'
            }`}
          >
            <span className="text-xl">{country.flag}</span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>

          {showDropdown && !disabled && (
            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[200px]">
              {countries.map((c) => (
                <button key={c.code} type="button" onClick={() => handleCountrySelect(c.code)} className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-left">
                  <span className="text-xl">{c.flag}</span>
                  <span className="text-sm">{c.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Phone Input */}
        <div className="relative flex-1">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#517664]" />
          <input
            type="tel"
            value={value}
            onChange={handleInputChange}
            disabled={disabled}
            className={`w-full pl-10 pr-16 py-3 border rounded-lg transition-colors ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'focus:border-[#517664] focus:outline-none'} ${
              showError && error && value && value !== country.countryCode ? 'border-red-300 bg-red-50' : 'border-slate-300'
            }`}
            placeholder={country.phoneFormat}
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">
            {digitCount}/{maxDigits}
          </div>
        </div>
      </div>

      {/* Error and Help Text */}
      {showError && error && value && value !== country.countryCode && <p className="mt-1 text-sm text-red-600">{error}</p>}
      <p className="mt-1 text-xs text-gray-500">
        Format: {country.phoneFormat}
        {country.allowedFormats && <span className="block">Also accepts: {country.allowedFormats.join(', ')}</span>}
      </p>
    </div>
  );
};

export default PhoneInput;
