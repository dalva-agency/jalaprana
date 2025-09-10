'use client';
import React, { useState } from 'react';
import { Phone, Mail, User, MessageSquare, ChevronDown, Send, CheckCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

// Types and Interfaces
interface Country {
  code: 'FR' | 'CH' | 'US' | 'GB';
  name: string;
  flag: string;
  phoneFormat: string;
  mask: string;
  maxDigits: number;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  country: Country['code'];
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    country: 'FR',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showCountryDropdown, setShowCountryDropdown] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const countries: Country[] = [
    { code: 'FR', name: 'France', flag: '🇫🇷', phoneFormat: '+33 X XX XX XX XX', mask: '+33 _ __ __ __ __', maxDigits: 9 },
    { code: 'CH', name: 'Suisse', flag: '🇨🇭', phoneFormat: '+41 XX XXX XX XX', mask: '+41 __ ___ __ __', maxDigits: 9 },
    { code: 'US', name: 'États-Unis', flag: '🇺🇸', phoneFormat: '+1 XXX XXX XXXX', mask: '+1 ___ ___ ____', maxDigits: 10 },
    { code: 'GB', name: 'Royaume-Uni', flag: '🇬🇧', phoneFormat: '+44 XXXX XXX XXX', mask: '+44 ____ ___ ___', maxDigits: 10 },
  ];

  const selectedCountry: Country = countries.find((c) => c.code === formData.country) || countries[0];

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string, countryCode: Country['code']): boolean => {
    const cleanPhone = phone.replace(/\s/g, '');
    switch (countryCode) {
      case 'FR':
        return /^\+33\d{9}$/.test(cleanPhone);
      case 'CH':
        return /^\+41\d{9}$/.test(cleanPhone);
      case 'US':
        return /^\+1\d{10}$/.test(cleanPhone);
      case 'GB':
        return /^\+44\d{10}$/.test(cleanPhone);
      default:
        return false;
    }
  };

  const formatPhoneNumber = (value: string, countryCode: Country['code']): string => {
    // Remove all non-digits
    const numbers = value.replace(/\D/g, '');

    // Get the country configuration
    const country = countries.find((c) => c.code === countryCode);
    if (!country) return value;

    // Limit numbers to the maximum allowed for this country
    const limitedNumbers = numbers.slice(0, country.maxDigits);

    switch (countryCode) {
      case 'FR':
        if (!value.startsWith('+33')) {
          const formatted = `+33 ${limitedNumbers.slice(0, 1)} ${limitedNumbers.slice(1, 3)} ${limitedNumbers.slice(3, 5)} ${limitedNumbers.slice(5, 7)} ${limitedNumbers.slice(7, 9)}`.trim();
          return formatted;
        }
        break;
      case 'CH':
        if (!value.startsWith('+41')) {
          const formatted = `+41 ${limitedNumbers.slice(0, 2)} ${limitedNumbers.slice(2, 5)} ${limitedNumbers.slice(5, 7)} ${limitedNumbers.slice(7, 9)}`.trim();
          return formatted;
        }
        break;
      case 'US':
        if (!value.startsWith('+1')) {
          const formatted = `+1 ${limitedNumbers.slice(0, 3)} ${limitedNumbers.slice(3, 6)} ${limitedNumbers.slice(6, 10)}`.trim();
          return formatted;
        }
        break;
      case 'GB':
        if (!value.startsWith('+44')) {
          const formatted = `+44 ${limitedNumbers.slice(0, 4)} ${limitedNumbers.slice(4, 7)} ${limitedNumbers.slice(7, 10)}`.trim();
          return formatted;
        }
        break;
    }

    return value;
  };

  const handleInputChange = (field: keyof FormData, value: string): void => {
    let processedValue = value;

    if (field === 'phone') {
      // Don't allow more digits than the format allows
      const numbers = value.replace(/\D/g, '');
      if (numbers.length <= selectedCountry.maxDigits) {
        processedValue = formatPhoneNumber(value, formData.country);
      } else {
        // If too many digits, keep the current value
        return;
      }
    }

    setFormData((prev) => ({ ...prev, [field]: processedValue }));

    // Clear error when user starts typing
    if (['name', 'email', 'phone', 'message'].includes(field as keyof FormErrors) && errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }

    // Clear success/error status when user starts typing again
    if (submitStatus !== 'idle') {
      setSubmitStatus('idle');
    }
  };

  const handleCountryChange = (countryCode: Country['code']): void => {
    setFormData((prev) => ({
      ...prev,
      country: countryCode,
      phone: '', // Reset phone when country changes
    }));
    setShowCountryDropdown(false);
    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
    }

    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Format d'email invalide";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Le téléphone est requis';
    } else if (!validatePhone(formData.phone, formData.country)) {
      newErrors.phone = 'Format de téléphone invalide';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Le message est requis';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isFormValid = (): boolean => {
    return (
      formData.name.trim() !== '' &&
      formData.email.trim() !== '' &&
      validateEmail(formData.email) &&
      formData.phone.trim() !== '' &&
      validatePhone(formData.phone, formData.country) &&
      formData.message.trim() !== ''
    );
  };

  const handleSubmit = async (): Promise<void> => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // EmailJS configuration - Replace with your actual values
      const serviceId = 'YOUR_SERVICE_ID';
      const templateId = 'YOUR_TEMPLATE_ID';
      const publicKey = 'YOUR_PUBLIC_KEY';

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        country: selectedCountry.name,
        message: formData.message,
        to_name: 'Support Team', // Your name/company
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      setSubmitStatus('success');
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        country: 'FR',
        message: '',
      });
      setErrors({});
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mb-20 bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-20">
          <h1 className="text-5xl font-light text-green-base mb-2">Contactez-nous</h1>
          <p className="text-slate-600">Nous sommes là pour vous aider</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-8">
          <div className="space-y-6">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Nom complet</label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-[#517664]" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:border-[#517664] focus:outline-none transition-colors ${errors.name ? 'border-red-300 bg-red-50' : 'border-slate-300'}`}
                  placeholder="Votre nom complet"
                />
              </div>
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-[#517664]" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:border-[#517664] focus:outline-none transition-colors ${errors.email ? 'border-red-300 bg-red-50' : 'border-slate-300'}`}
                  placeholder="votre@email.com"
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            {/* Phone Field with Country Selection */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Téléphone</label>
              <div className="flex gap-2">
                {/* Country Selector */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                    className="flex items-center gap-2 px-3 py-3 border border-slate-300 rounded-lg hover:bg-slate-50 focus:border-[#517664] focus:outline-none transition-colors"
                  >
                    <span className="text-lg">{selectedCountry.flag}</span>
                    <ChevronDown className="h-4 w-4 text-slate-400" />
                  </button>

                  {showCountryDropdown && (
                    <div className="absolute top-full left-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-10 min-w-[160px]">
                      {countries.map((country) => (
                        <button
                          key={country.code}
                          type="button"
                          onClick={() => handleCountryChange(country.code)}
                          className="w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center gap-2 first:rounded-t-lg last:rounded-b-lg"
                        >
                          <span className="text-lg">{country.flag}</span>
                          <span className="text-sm text-slate-700">{country.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Phone Input */}
                <div className="flex-1 relative">
                  <Phone className="absolute left-3 top-3 h-5 w-5 text-[#517664]" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:border-[#517664] focus:outline-none transition-colors ${errors.phone ? 'border-red-300 bg-red-50' : 'border-slate-300'}`}
                    placeholder={selectedCountry.mask}
                  />
                </div>
              </div>
              <p className="mt-1 text-xs text-slate-500">Format: {selectedCountry.phoneFormat}</p>
              {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
            </div>

            {/* Message Field */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-[#517664]" />
                <textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  rows={4}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:border-[#517664] focus:outline-none transition-colors resize-none ${
                    errors.message ? 'border-red-300 bg-red-50' : 'border-slate-300'
                  }`}
                  placeholder="Votre message..."
                />
              </div>
              {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
            </div>

            {/* Success/Error Messages */}
            {submitStatus === 'success' && (
              <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <p className="text-sm text-green-700">Message envoyé avec succès! Nous vous répondrons bientôt.</p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg">
                <MessageSquare className="h-5 w-5 text-red-600" />
                <p className="text-sm text-red-700">{"Erreur lors de l'envoi. Veuillez réessayer"}.</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!isFormValid() || isSubmitting}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                isFormValid() && !isSubmitting ? 'bg-[#517664] hover:bg-[#435d52] text-white cursor-pointer shadow-sm hover:shadow-md' : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  Envoi en cours...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Envoyer
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
