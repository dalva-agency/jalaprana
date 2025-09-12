'use client';
import React, { useState } from 'react';
import { Mail, User, MessageSquare, Send, CheckCircle, AlertCircle } from 'lucide-react';
import PhoneInput from '@/components/input/phoneInput';

// Main form interfaces
interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

const ContactPage: React.FC = () => {
  // Form state - Initialize phone with country code
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '+33',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [phoneIsValid, setPhoneIsValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Email validation
  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Handle form input changes
  const handleInputChange = (field: keyof FormData, value: string): void => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }

    // Clear submit status
    if (submitStatus !== 'idle') {
      setSubmitStatus('idle');
    }
  };

  // Handle phone change from PhoneInput component
  const handlePhoneChange = (value: string, isValid: boolean): void => {
    setFormData((prev) => ({ ...prev, phone: value }));
    setPhoneIsValid(isValid);

    // Clear phone error when user types
    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: undefined }));
    }

    // Clear submit status
    if (submitStatus !== 'idle') {
      setSubmitStatus('idle');
    }
  };

  // Form validation
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

    if (!formData.phone.trim() || formData.phone === '+33' || formData.phone === '+41') {
      newErrors.phone = 'Le numéro de téléphone est requis';
    } else if (!phoneIsValid) {
      newErrors.phone = 'Format de téléphone invalide';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Le message est requis';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Check if form is valid (for button state)
  const isFormValid = (): boolean => {
    const hasPhone = formData.phone.trim() !== '' && formData.phone !== '+33' && formData.phone !== '+41' && formData.phone !== '+44' && formData.phone !== '+1';

    return formData.name.trim() !== '' && formData.email.trim() !== '' && validateEmail(formData.email) && hasPhone && phoneIsValid && formData.message.trim() !== '';
  };

  // Form submission
  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Extract country from phone format
      let country = 'France'; // default
      if (formData.phone.startsWith('+33')) country = 'France';
      else if (formData.phone.startsWith('+41')) country = 'Suisse';
      else if (formData.phone.startsWith('+44')) country = 'Royaume-Uni';
      else if (formData.phone.startsWith('+1') || formData.phone.startsWith('(')) country = 'États-Unis';
      console.log({ formData: formData });
      // Send to your API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          country: country,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send email');
      }

      setSubmitStatus('success');

      // Reset form after success
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '+33',
          message: '',
        });
        setPhoneIsValid(false);
        setSubmitStatus('idle');
      }, 5000);
    } catch (error) {
      console.error('Submit error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mb-20 bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-20">
          <h1 className="text-5xl font-light text-green-base mb-2">Me contacter</h1>
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

            {/* Phone Field - Using the new PhoneInput component */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Téléphone</label>
              <PhoneInput
                value={formData.phone}
                onChange={handlePhoneChange}
                defaultCountry="FR"
                showError={false} // We handle errors ourselves
                className=""
              />
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
                <p className="text-sm text-green-700">Message envoyé avec succès! Je vous répondrai dans les plus brefs délais.</p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <p className="text-sm text-red-700">{"Erreur lors de l'envoi. Veuillez réessayer ou me contacter directement par email."}</p>
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
