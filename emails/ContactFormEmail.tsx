import { Body, Container, Column, Head, Heading, Hr, Html, Link, Preview, Row, Section, Text, Button, Font } from '@react-email/components';
import * as React from 'react';

interface ContactFormEmailProps {
  name: string;
  email: string;
  phone: string;
  country: string;
  message: string;
}

export const ContactFormEmail = ({
  name = 'Jean Dupont',
  email = 'jean@example.com',
  phone = '+33 6 12 34 56 78',
  country = 'France',
  message = 'Votre message apparaîtra ici...',
}: ContactFormEmailProps) => {
  const previewText = `Nouveau message de ${name}`;
  const formattedDate = new Date().toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

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
      <Body style={main}>
        <Container style={container}>
          {/* Header with Logo/Brand */}
          <Section style={header}>
            <Heading style={h1}>Jalaprana</Heading>
            <Text style={tagline}>Bien-être & Thérapies Holistiques</Text>
          </Section>

          {/* Main Content Card */}
          <Section style={card}>
            <Heading style={h2}>Nouvelle demande de contact</Heading>

            <Text style={timestamp}>Reçu le {formattedDate}</Text>

            <Hr style={divider} />

            {/* Contact Information */}
            <Section style={infoSection}>
              <Text style={label}>NOM</Text>
              <Text style={value}>{name}</Text>

              <Text style={label}>EMAIL</Text>
              <Link href={`mailto:${email}`} style={emailLink}>
                {email}
              </Link>

              <Text style={label}>TÉLÉPHONE</Text>
              <Text style={value}>
                {phone} ({country})
              </Text>
            </Section>

            <Hr style={divider} />

            {/* Message Section */}
            <Section style={messageSection}>
              <Text style={messageLabel}>MESSAGE</Text>
              <Section style={messageBox}>
                <Text style={messageContent}>{message}</Text>
              </Section>
            </Section>

            {/* Action Buttons */}
            <Section style={buttonSection}>
              <Button href={`mailto:${email}`} style={primaryButton}>
                Répondre par email
              </Button>

              <Text style={secondaryLinkContainer}>
                <Link href={`tel:${phone.replace(/\s/g, '')}`} style={secondaryLink}>
                  Appeler {phone}
                </Link>
              </Text>
            </Section>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>Cet email a été envoyé depuis le formulaire de contact du site Jalaprana.</Text>
            <Text style={footerText}>© {new Date().getFullYear()} Jalaprana - Tous droits réservés</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

// Styles
const main = {
  backgroundColor: '#f4f7f5',
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '40px 20px',
  maxWidth: '600px',
};

const header = {
  padding: '40px 0',
  textAlign: 'center' as const,
};

const h1 = {
  color: '#517664',
  fontSize: '32px',
  fontWeight: '300',
  letterSpacing: '2px',
  margin: '0',
  textTransform: 'uppercase' as const,
};

const tagline = {
  color: '#7a9b8b',
  fontSize: '14px',
  fontStyle: 'italic',
  margin: '8px 0 0 0',
};

const card = {
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  padding: '32px',
  boxShadow: '0 2px 8px rgba(81, 118, 100, 0.08)',
};

const h2 = {
  color: '#2c3e38',
  fontSize: '24px',
  fontWeight: '500',
  margin: '0 0 8px 0',
};

const timestamp = {
  color: '#8b9b93',
  fontSize: '14px',
  margin: '0 0 24px 0',
};

const divider = {
  borderColor: '#e5ede9',
  margin: '24px 0',
};

const infoSection = {
  marginBottom: '8px',
};

const label = {
  color: '#7a9b8b',
  fontSize: '12px',
  fontWeight: '600',
  margin: '0 0 4px 0',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.5px',
};

const value = {
  color: '#2c3e38',
  fontSize: '16px',
  margin: '0 0 16px 0',
  fontWeight: '400',
};

const emailLink = {
  color: '#517664',
  fontSize: '16px',
  textDecoration: 'underline',
  display: 'block',
  marginBottom: '16px',
};

const messageSection = {
  marginTop: '8px',
};

const messageLabel = {
  color: '#7a9b8b',
  fontSize: '12px',
  fontWeight: '600',
  margin: '0 0 12px 0',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.5px',
};

const messageBox = {
  backgroundColor: '#fafbfa',
  borderLeft: '3px solid #517664',
  borderRadius: '6px',
  padding: '16px',
};

const messageContent = {
  color: '#2c3e38',
  fontSize: '15px',
  lineHeight: '1.6',
  margin: '0',
  whiteSpace: 'pre-wrap' as const,
};

const buttonSection = {
  marginTop: '32px',
  textAlign: 'center' as const,
};

const primaryButton = {
  backgroundColor: '#517664',
  borderRadius: '8px',
  color: '#ffffff',
  display: 'inline-block',
  fontSize: '15px',
  fontWeight: '500',
  padding: '12px 24px',
  textDecoration: 'none',
  textAlign: 'center' as const,
};

const secondaryLinkContainer = {
  marginTop: '12px',
  textAlign: 'center' as const,
};

const secondaryLink = {
  color: '#517664',
  fontSize: '14px',
  textDecoration: 'underline',
};

const footer = {
  marginTop: '40px',
  padding: '24px 0',
  textAlign: 'center' as const,
};

const footerText = {
  color: '#8b9b93',
  fontSize: '12px',
  margin: '4px 0',
};

export default ContactFormEmail;
