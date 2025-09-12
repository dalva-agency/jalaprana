import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import ContactFormEmail from '@/emails/ContactFormEmail';
import ConfirmationEmail from '@/emails/ConfirmationEmail';
import { render } from '@react-email/render';

// Initialize Resend
const resend = new Resend(process.env.NODE_ENV === 'development' ? process.env.RESEND_API_KEY_DEV : process.env.RESEND_API_KEY);

const RECIPIENT_EMAIL = process.env.NODE_ENV === 'development' ? process.env.RECIPIENT_EMAIL_DEV : process.env.RECIPIENT_EMAIL || 'jalaprana@proton.me';

export async function POST(request: Request) {
  try {
    // Parse request body
    const body = await request.json();
    const { name, email, phone, country, message } = body;

    // Validate required fields
    if (!name || !email || !phone || !message) {
      return NextResponse.json({ error: 'Tous les champs sont requis' }, { status: 400 });
    }

    // Log for debugging in development
    if (process.env.NODE_ENV === 'development') {
      console.log('📧 Contact Form Submission:', {
        name,
        email,
        phone,
        country,
        message,
        recipient: RECIPIENT_EMAIL,
      });
    }

    try {
      // Render email to HTML
      const adminHtml = await render(
        ContactFormEmail({
          name,
          email,
          phone,
          country,
          message,
        })
      );

      // Send main notification email
      const { data: adminEmail, error: adminError } = await resend.emails.send({
        from: 'Jalaprana Test <onboarding@resend.dev>',
        to: [RECIPIENT_EMAIL!],
        replyTo: email,
        subject: `[TEST] Nouveau message de ${name}`,
        html: adminHtml,
        headers: process.env.NODE_ENV === 'development' ? { 'X-Test-Mode': 'true' } : undefined,
      });

      if (adminError) {
        console.error('Error sending admin email:', adminError);
        throw adminError;
      }

      console.log('✅ Email sent successfully:', adminEmail?.id);

      // For testing: Also send the confirmation email to YOUR email
      // In production, this would go to the customer
      if (process.env.NODE_ENV === 'development') {
        try {
          const confirmHtml = await render(ConfirmationEmail({ name }));

          const { data: confirmEmail } = await resend.emails.send({
            from: 'Jalaprana <onboarding@resend.dev>',
            to: [email!],
            subject: `[TEST - Confirmation for ${name}] Jalaprana - Confirmation de votre message`,
            html: confirmHtml,
          });

          console.log('✅ Confirmation email sent:', confirmEmail?.id);
        } catch (confirmError) {
          console.error('Confirmation email error:', confirmError);
        }
      } else {
        // Production: Send to actual customer
        try {
          const confirmHtml = await render(ConfirmationEmail({ name }));

          await resend.emails.send({
            from: 'Jalaprana <noreply@yourdomain.com>', // Your verified domain
            to: [email], // Customer's email
            subject: 'Jalaprana - Confirmation de votre message',
            html: confirmHtml,
          });
        } catch (confirmError) {
          console.error('Confirmation email error:', confirmError);
        }
      }

      // Return success
      return NextResponse.json(
        {
          message: 'Email envoyé avec succès',
          id: adminEmail?.id,
          testMode: process.env.NODE_ENV === 'development',
        },
        { status: 200 }
      );
    } catch (sendError: unknown) {
      // Handle Resend API errors
      if (sendError && typeof sendError === 'object' && 'statusCode' in sendError && sendError.statusCode === 403) {
        console.error('🔒 Resend Authentication Error:', sendError && typeof sendError === 'object' && 'message' in sendError ? sendError.message : 'Authentication failed');

        // In development, provide helpful error message
        if (process.env.NODE_ENV === 'development') {
          return NextResponse.json(
            {
              error: 'Configuration email requise',
              details: "Pour tester en local, assurez-vous d'utiliser votre email Resend (jalaprana@proton.me) comme destinataire.",
              testMode: true,
            },
            { status: 403 }
          );
        }
      }

      throw sendError;
    }
  } catch (error: unknown) {
    console.error('API route error:', error);

    return NextResponse.json(
      {
        error: 'Erreur serveur interne',
        details: process.env.NODE_ENV === 'development' && error && typeof error === 'object' && 'message' in error ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}
