import { Body, Container, Head, Heading, Html, Preview, Section, Text, Hr, Font } from '@react-email/components';
import * as React from 'react';

interface ConfirmationEmailProps {
  name: string;
}

export const ConfirmationEmail = ({ name = 'Cher(e) client(e)' }: ConfirmationEmailProps) => {
  const previewText = 'Nous avons bien reçu votre message - Jalaprana';

  return (
    <Html>
      <Head>
        <Font
          fontFamily="Inter"
          fallbackFontFamily="Helvetica"
          webFont={{
            url: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>{previewText}</Preview>
      <Body style={confirmMain}>
        <Container style={confirmContainer}>
          {/* Header */}
          <Section style={confirmHeader}>
            <Heading style={confirmH1}>Jalaprana</Heading>
            <Text style={confirmTagline}>Bien-être & Thérapies Holistiques</Text>
          </Section>

          {/* Content */}
          <Section style={confirmCard}>
            <Section style={checkmarkContainer}>
              <Text style={checkmark}>✓</Text>
            </Section>

            <Heading style={confirmH2}>Message bien reçu!</Heading>

            <Text style={confirmGreeting}>Bonjour {name},</Text>

            <Text style={confirmMessage}>Je vous remercie de votre message. Je vous répondrai dans les plus brefs délais.</Text>

            <Text style={confirmMessage}>{"En attendant, n'hésitez pas à explorer les différentes thérapies que je propose pour votre bien-être et votre épanouissement personnel"}.</Text>

            <Hr style={confirmDivider} />

            <Text style={confirmSignature}>Bien cordialement,</Text>
            <Text style={confirmSignatureName}>Jalaprana</Text>
            <Text style={confirmSignatureTitle}>Thérapeute holistique</Text>
          </Section>

          {/* Footer */}
          <Section style={confirmFooter}>
            <Text style={confirmFooterText}>© {new Date().getFullYear()} Jalaprana - Bien-être & Thérapies Holistiques</Text>
            <Text style={confirmFooterText}>Cet email est un accusé de réception automatique</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

// Confirmation email styles
const confirmMain = {
  backgroundColor: '#f4f7f5',
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const confirmContainer = {
  margin: '0 auto',
  padding: '40px 20px',
  maxWidth: '560px',
};

const confirmHeader = {
  padding: '32px 0',
  textAlign: 'center' as const,
};

const confirmH1 = {
  color: '#517664',
  fontSize: '28px',
  fontWeight: '300',
  letterSpacing: '2px',
  margin: '0',
  textTransform: 'uppercase' as const,
};

const confirmTagline = {
  color: '#7a9b8b',
  fontSize: '13px',
  fontStyle: 'italic',
  margin: '8px 0 0 0',
};

const confirmCard = {
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  padding: '40px 32px',
  boxShadow: '0 2px 8px rgba(81, 118, 100, 0.08)',
};

const checkmarkContainer = {
  textAlign: 'center' as const,
  marginBottom: '24px',
};

const checkmark = {
  backgroundColor: '#517664',
  borderRadius: '50%',
  color: '#ffffff',
  display: 'inline-block',
  fontSize: '24px',
  width: '48px',
  height: '48px',
  lineHeight: '48px',
  margin: '0 auto',
  textAlign: 'center' as const,
};

const confirmH2 = {
  color: '#2c3e38',
  fontSize: '22px',
  fontWeight: '500',
  margin: '0 0 24px 0',
  textAlign: 'center' as const,
};

const confirmGreeting = {
  color: '#2c3e38',
  fontSize: '16px',
  margin: '0 0 16px 0',
};

const confirmMessage = {
  color: '#5a6b63',
  fontSize: '15px',
  lineHeight: '1.6',
  margin: '0 0 16px 0',
};

const confirmDivider = {
  borderColor: '#e5ede9',
  margin: '32px 0 24px 0',
};

const confirmSignature = {
  color: '#5a6b63',
  fontSize: '15px',
  margin: '0 0 8px 0',
};

const confirmSignatureName = {
  color: '#517664',
  fontSize: '16px',
  fontWeight: '500',
  margin: '0 0 4px 0',
};

const confirmSignatureTitle = {
  color: '#7a9b8b',
  fontSize: '14px',
  fontStyle: 'italic',
  margin: '0',
};

const confirmFooter = {
  marginTop: '32px',
  padding: '20px 0',
  textAlign: 'center' as const,
};

const confirmFooterText = {
  color: '#8b9b93',
  fontSize: '11px',
  margin: '4px 0',
};

export default ConfirmationEmail;
