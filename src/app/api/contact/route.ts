import { NextResponse } from 'next/server';

interface ContactFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export async function POST(request: Request) {
  try {
    const data: ContactFormData = await request.json();

    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // In production, you would send an email here using a service like:
    // - Nodemailer with SMTP
    // - SendGrid
    // - Resend
    // - AWS SES
    //
    // Example with environment variables:
    // const transporter = nodemailer.createTransport({
    //   host: process.env.SMTP_HOST,
    //   port: parseInt(process.env.SMTP_PORT || '587'),
    //   secure: false,
    //   auth: {
    //     user: process.env.SMTP_USER,
    //     pass: process.env.SMTP_PASSWORD,
    //   },
    // });
    //
    // await transporter.sendMail({
    //   from: process.env.SMTP_FROM,
    //   to: process.env.CONTACT_EMAIL,
    //   subject: `Portfolio Contact: ${data.subject || 'No subject'}`,
    //   text: `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`,
    // });

    // For now, log the submission (remove in production)
    console.log('Contact form submission:', {
      name: data.name,
      email: data.email,
      subject: data.subject || 'No subject',
      message: data.message,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to process your message. Please try again.' },
      { status: 500 }
    );
  }
}
