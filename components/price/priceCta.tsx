import React from 'react';

// Define the allowed currency types
type Currency = 'EUR' | 'USD' | 'GBP';

// Define the allowed size types
type Size = 'small' | 'medium' | 'large';

// Define the allowed variant types
type Variant = 'default' | 'primary' | 'success' | 'warning';

// Props interface
interface PriceDisplayProps {
  amount: number;
  currency?: Currency;
  size?: Size;
  variant?: Variant;
  className?: string;
  label?: string; // New optional prop for left text
  fullWidth?: boolean; // Optional prop to make it full width for table-like layout
}

// Currency symbols with proper typing
const currencySymbols: Record<Currency, string> = {
  EUR: '€',
  USD: '$',
  GBP: '£',
} as const;

// Size configurations with proper typing
const sizes: Record<Size, { container: string; icon: string; text: string; labelText: string }> = {
  small: {
    container: 'gap-2 px-3.5 py-2 rounded-md',
    icon: 'w-3.5 h-3.5',
    text: 'text-md font-semibold font-bodoni',
    labelText: 'text-sm font-medium',
  },
  medium: {
    container: 'gap-2.5 px-4 py-2 rounded-lg',
    icon: 'w-4 h-4',
    text: 'text-md font-semibold font-bodoni',
    labelText: 'text-base font-medium',
  },
  large: {
    container: 'gap-3 px-5 py-2.5 rounded-lg',
    icon: 'w-5 h-5',
    text: 'text-md font-semibold font-bodoni',
    labelText: 'text-lg font-medium',
  },
} as const;

// Variant configurations with proper typing
const variants: Record<Variant, string> = {
  default: 'bg-gray-100 text-gray-800 hover:bg-gray-150 border border-gray-200',
  primary: 'bg-blue-100 text-blue-800 hover:bg-blue-150 border border-blue-200',
  success: 'bg-green-100 text-green-800 hover:bg-green-150 border border-green-200',
  warning: 'bg-orange-base text-white hover:bg-amber-50 border border-amber-300 shadow-sm',
} as const;

const PriceDisplay: React.FC<PriceDisplayProps> = ({ amount, currency = 'EUR', size = 'medium', variant = 'default', className = '', label, fullWidth = false }) => {
  const symbol = currencySymbols[currency];
  const sizeConfig = sizes[size];
  const variantClass = variants[variant];

  const containerWidth = fullWidth ? 'w-full' : 'inline-flex';
  const justifyContent = label ? 'justify-between' : 'justify-center';

  return (
    <div className={`flex items-center ${containerWidth} ${justifyContent} ${sizeConfig.container} ${variantClass} transition-colors duration-150 ${className}`}>
      {label && <span className={`${sizeConfig.labelText} truncate`}>{label}</span>}
      <span className={`${sizeConfig.text} font-mono tracking-wide flex-shrink-0`}>
        {amount} {symbol}
      </span>
    </div>
  );
};

export default PriceDisplay;
