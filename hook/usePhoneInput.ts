// hooks/usePhoneInput.ts
// Custom hook for phone input management

import { useState, useCallback, useMemo } from 'react';
import { Country, countries, extractDigitsAfterCountryCode, countPhoneDigits, formatPhoneNumber, validatePhone, getValidationError } from '../utils/phoneUtils';

interface UsePhoneInputReturn {
  phone: string;
  country: Country;
  countries: Country[];
  error: string | undefined;
  isValid: boolean;
  digitCount: number;
  maxDigits: number;
  handlePhoneChange: (value: string) => void;
  handleCountryChange: (countryCode: Country['code']) => void;
  clearPhone: () => void;
  setPhoneDirectly: (value: string) => void;
}

export const usePhoneInput = (initialCountry: Country['code'] = 'FR', initialPhone: string = ''): UsePhoneInputReturn => {
  const [country, setCountry] = useState<Country>(countries.find((c) => c.code === initialCountry) || countries[0]);
  const [phone, setPhone] = useState<string>(initialPhone);

  /**
   * Handle phone input change with smart formatting
   */
  const handlePhoneChange = useCallback(
    (inputValue: string) => {
      // If the input is being deleted (backspace/delete)
      if (inputValue.length < phone.length) {
        setPhone(inputValue);
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
      const currentDigits = extractDigitsAfterCountryCode(phone, country);

      // If we already have max digits, don't allow more
      if (currentDigits.length >= country.maxDigitsAfterCode) {
        return;
      }

      // Find what new digits were added
      let newDigits = phoneDigits;

      // If the input already had some digits, find only the new ones
      if (currentDigits.length > 0) {
        // User might be typing in the middle or at the end
        // We'll take only the new characters that exceed current length
        if (phoneDigits.length > currentDigits.length) {
          newDigits = currentDigits + phoneDigits.slice(currentDigits.length);
        } else {
          // User might have selected all and pasted
          newDigits = phoneDigits;
        }
      }

      // Limit to max digits
      newDigits = newDigits.slice(0, country.maxDigitsAfterCode);

      // Format the phone number
      const formatted = formatPhoneNumber(newDigits, country);
      setPhone(formatted);
    },
    [phone, country]
  );

  /**
   * Handle country change
   */
  const handleCountryChange = useCallback((countryCode: Country['code']) => {
    const newCountry = countries.find((c) => c.code === countryCode);
    if (newCountry) {
      setCountry(newCountry);
      // Clear phone when country changes
      setPhone(newCountry.countryCode);
    }
  }, []);

  /**
   * Clear phone number (keep country code for FR and CH)
   */
  const clearPhone = useCallback(() => {
    if (country.code === 'FR' || country.code === 'CH') {
      setPhone(country.countryCode);
    } else {
      setPhone('');
    }
  }, [country]);

  /**
   * Set phone directly (for external updates)
   */
  const setPhoneDirectly = useCallback((value: string) => {
    setPhone(value);
  }, []);

  /**
   * Computed values
   */
  const digitCount = useMemo(() => countPhoneDigits(phone, country), [phone, country]);

  const maxDigits = useMemo(() => {
    // For GB with leading 0, it's 11 digits total
    if (country.code === 'GB' && phone.includes('0')) {
      return 11;
    }
    return country.maxDigitsAfterCode;
  }, [country, phone]);

  const isValid = useMemo(() => validatePhone(phone, country), [phone, country]);

  const error = useMemo(() => getValidationError(phone, country), [phone, country]);

  return {
    phone,
    country,
    countries,
    error,
    isValid,
    digitCount,
    maxDigits,
    handlePhoneChange,
    handleCountryChange,
    clearPhone,
    setPhoneDirectly,
  };
};
