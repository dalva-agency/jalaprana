// utils/phoneFormatter.ts
// Utility functions for phone number formatting and validation

export interface Country {
  code: 'FR' | 'CH' | 'US' | 'GB';
  name: string;
  flag: string;
  phoneFormat: string;
  countryCode: string;
  maxDigitsAfterCode: number;
  mobilePrefix?: string[];
  allowedFormats?: string[];
}

export const countries: Country[] = [
  {
    code: 'FR',
    name: 'France',
    flag: '🇫🇷',
    phoneFormat: '+33 6 12 34 56 78',
    countryCode: '+33',
    maxDigitsAfterCode: 9,
    mobilePrefix: ['6', '7'],
  },
  {
    code: 'CH',
    name: 'Switzerland',
    flag: '🇨🇭',
    phoneFormat: '+41 79 123 45 67',
    countryCode: '+41',
    maxDigitsAfterCode: 9,
    mobilePrefix: ['7'],
  },
  {
    code: 'US',
    name: 'United States',
    flag: '🇺🇸',
    phoneFormat: '(555) 123-4567',
    countryCode: '+1',
    maxDigitsAfterCode: 10,
    allowedFormats: ['(XXX) XXX-XXXX', 'XXX-XXX-XXXX', 'XXX.XXX.XXXX', '+1 XXX XXX XXXX'],
  },
  {
    code: 'GB',
    name: 'United Kingdom',
    flag: '🇬🇧',
    phoneFormat: '07700 900123',
    countryCode: '+44',
    maxDigitsAfterCode: 10,
    allowedFormats: ['0XXXX XXXXXX', '0XXXX XXX XXXX', '+44 XXXX XXXXXX', '+44 XXXX XXX XXXX'],
  },
];

/**
 * Extract only the digits after the country code
 */
export const extractDigitsAfterCountryCode = (value: string, country: Country): string => {
  // Remove all non-digit characters and the country code
  let cleanValue = value.replace(/\D/g, '');

  // Remove country code digits if present
  const countryCodeDigits = country.countryCode.replace(/\D/g, '');
  if (cleanValue.startsWith(countryCodeDigits)) {
    cleanValue = cleanValue.slice(countryCodeDigits.length);
  }

  return cleanValue;
};

/**
 * Count only the actual phone digits (excluding country code)
 */
export const countPhoneDigits = (value: string, country: Country): number => {
  return extractDigitsAfterCountryCode(value, country).length;
};

/**
 * Format phone number based on country
 */
export const formatPhoneNumber = (digits: string, country: Country): string => {
  // Ensure we only have digits
  const cleanDigits = digits.replace(/\D/g, '');

  // Limit to maximum allowed digits
  const limitedDigits = cleanDigits.slice(0, country.maxDigitsAfterCode);

  if (limitedDigits.length === 0) {
    return country.countryCode;
  }

  switch (country.code) {
    case 'FR':
      // Format: +33 6 12 34 56 78
      let frFormatted = country.countryCode;
      if (limitedDigits.length > 0) frFormatted += ' ' + limitedDigits.slice(0, 1);
      if (limitedDigits.length > 1) frFormatted += ' ' + limitedDigits.slice(1, 3);
      if (limitedDigits.length > 3) frFormatted += ' ' + limitedDigits.slice(3, 5);
      if (limitedDigits.length > 5) frFormatted += ' ' + limitedDigits.slice(5, 7);
      if (limitedDigits.length > 7) frFormatted += ' ' + limitedDigits.slice(7, 9);
      return frFormatted;

    case 'CH':
      // Format: +41 79 123 45 67
      let chFormatted = country.countryCode;
      if (limitedDigits.length > 0) chFormatted += ' ' + limitedDigits.slice(0, 2);
      if (limitedDigits.length > 2) chFormatted += ' ' + limitedDigits.slice(2, 5);
      if (limitedDigits.length > 5) chFormatted += ' ' + limitedDigits.slice(5, 7);
      if (limitedDigits.length > 7) chFormatted += ' ' + limitedDigits.slice(7, 9);
      return chFormatted;

    case 'US':
      // Check if user wants +1 format or standard format
      if (limitedDigits.startsWith('1') && limitedDigits.length > 1) {
        // User typed 1, use +1 format
        let usFormatted = country.countryCode;
        const remaining = limitedDigits.slice(1);
        if (remaining.length > 0) usFormatted += ' ' + remaining.slice(0, 3);
        if (remaining.length > 3) usFormatted += ' ' + remaining.slice(3, 6);
        if (remaining.length > 6) usFormatted += ' ' + remaining.slice(6, 10);
        return usFormatted;
      } else {
        // Standard format: (555) 123-4567
        if (limitedDigits.length === 0) return '';
        if (limitedDigits.length <= 3) return `(${limitedDigits}`;
        if (limitedDigits.length <= 6) return `(${limitedDigits.slice(0, 3)}) ${limitedDigits.slice(3)}`;
        return `(${limitedDigits.slice(0, 3)}) ${limitedDigits.slice(3, 6)}-${limitedDigits.slice(6, 10)}`;
      }

    case 'GB':
      // Check if user wants +44 format
      if (limitedDigits.startsWith('44')) {
        // This shouldn't happen as we strip country codes, but handle it
        return country.countryCode + ' ' + limitedDigits.slice(2);
      }

      // Check if it's a UK number starting with 0
      if (limitedDigits.startsWith('0')) {
        // Standard UK format
        if (limitedDigits.startsWith('020')) {
          // London: 020 XXXX XXXX
          if (limitedDigits.length <= 3) return limitedDigits;
          if (limitedDigits.length <= 7) return `${limitedDigits.slice(0, 3)} ${limitedDigits.slice(3)}`;
          return `${limitedDigits.slice(0, 3)} ${limitedDigits.slice(3, 7)} ${limitedDigits.slice(7, 11)}`;
        } else if (limitedDigits.startsWith('07')) {
          // Mobile: 07XXX XXXXXX
          if (limitedDigits.length <= 5) return limitedDigits;
          return `${limitedDigits.slice(0, 5)} ${limitedDigits.slice(5, 11)}`;
        } else {
          // Generic format
          if (limitedDigits.length <= 5) return limitedDigits;
          return `${limitedDigits.slice(0, 5)} ${limitedDigits.slice(5, 11)}`;
        }
      } else {
        // Use +44 format for non-0 starting numbers
        let gbFormatted = country.countryCode;
        if (limitedDigits.startsWith('7')) {
          // Mobile: +44 7XXX XXXXXX
          if (limitedDigits.length > 0) gbFormatted += ' ' + limitedDigits.slice(0, 4);
          if (limitedDigits.length > 4) gbFormatted += ' ' + limitedDigits.slice(4, 10);
        } else {
          // Other: +44 XXXX XXXXXX
          if (limitedDigits.length > 0) gbFormatted += ' ' + limitedDigits.slice(0, 4);
          if (limitedDigits.length > 4) gbFormatted += ' ' + limitedDigits.slice(4, 10);
        }
        return gbFormatted;
      }

    default:
      return limitedDigits;
  }
};

/**
 * Validate phone number
 */
export const validatePhone = (phone: string, country: Country): boolean => {
  const digits = extractDigitsAfterCountryCode(phone, country);

  switch (country.code) {
    case 'FR':
      // Must have exactly 9 digits and start with 6 or 7
      return digits.length === 9 && (digits.startsWith('6') || digits.startsWith('7'));

    case 'CH':
      // Must have exactly 9 digits and start with 7
      return digits.length === 9 && digits.startsWith('7');

    case 'US':
      // Must have exactly 10 digits
      return digits.length === 10;

    case 'GB':
      // Must have 10 or 11 digits (with leading 0)
      if (digits.startsWith('0')) {
        return digits.length === 11;
      }
      return digits.length === 10;

    default:
      return false;
  }
};

/**
 * Get validation error message
 */
export const getValidationError = (phone: string, country: Country): string | undefined => {
  if (!phone) return undefined;

  const digits = extractDigitsAfterCountryCode(phone, country);
  const isValid = validatePhone(phone, country);

  if (isValid) return undefined;

  if (digits.length < country.maxDigitsAfterCode) {
    const needed = country.code === 'GB' && digits.startsWith('0') ? 11 - digits.length : country.code === 'FR' || country.code === 'CH' ? 9 - digits.length : 10 - digits.length;
    return `Phone number incomplete (${needed} more digit${needed > 1 ? 's' : ''} needed)`;
  }

  switch (country.code) {
    case 'FR':
      if (!digits.startsWith('6') && !digits.startsWith('7')) {
        return 'French mobile numbers must start with 6 or 7';
      }
      break;
    case 'CH':
      if (!digits.startsWith('7')) {
        return 'Swiss mobile numbers must start with 7';
      }
      break;
    case 'GB':
      return 'Invalid UK phone number format';
    case 'US':
      return 'Invalid US phone number format';
  }

  return 'Invalid phone number format';
};
