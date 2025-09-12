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

    // Log for debugging
    console.log('📧 Contact Form Submission:', {
      name,
      email,
      phone,
      country,
      message,
      recipient: RECIPIENT_EMAIL,
      environment: process.env.NODE_ENV,
    });

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
        from: process.env.NODE_ENV === 'development' ? 'Jalaprana Test <onboarding@resend.dev>' : 'Jalaprana <onboarding@resend.dev>', // FIXED: Use resend.dev in production too until domain is verified
        to: [RECIPIENT_EMAIL!],
        replyTo: email,
        subject: process.env.NODE_ENV === 'development' ? `[TEST] Nouveau message de ${name}` : `Nouveau message de ${name}`,
        html: adminHtml,
        headers: process.env.NODE_ENV === 'development' ? { 'X-Test-Mode': 'true' } : undefined,
      });

      if (adminError) {
        console.error('Error sending admin email:', adminError);
        throw adminError;
      }

      console.log('✅ Email sent successfully:', adminEmail?.id);

      // Send confirmation email
      try {
        const confirmHtml = await render(ConfirmationEmail({ name }));

        const { data: confirmEmail, error: confirmError } = await resend.emails.send({
          from: process.env.NODE_ENV === 'development' ? 'Jalaprana <onboarding@resend.dev>' : 'Jalaprana <onboarding@resend.dev>', // FIXED: Use resend.dev until domain is verified
          to: [email], // Send to the person who submitted the form
          subject: process.env.NODE_ENV === 'development' ? `[TEST - Confirmation] Jalaprana - Confirmation de votre message` : 'Jalaprana - Confirmation de votre message',
          html: confirmHtml,
        });

        if (confirmError) {
          console.error('Confirmation email error:', confirmError);
          // Don't throw - we still want to return success if main email was sent
        } else {
          console.log('✅ Confirmation email sent:', confirmEmail?.id);
        }
      } catch (confirmError) {
        console.error('Confirmation email error:', confirmError);
        // Don't fail the whole request if confirmation fails
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

        return NextResponse.json(
          {
            error: "Erreur d'authentification email",
            details: process.env.NODE_ENV === 'development' ? 'Vérifiez votre configuration Resend' : 'Erreur de configuration du service email',
            testMode: process.env.NODE_ENV === 'development',
          },
          { status: 403 }
        );
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
