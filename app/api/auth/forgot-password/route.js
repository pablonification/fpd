import { NextResponse } from 'next/server';
import { db } from '@/db/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { email } = await request.json();
    console.log('Password reset request for:', email);

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // 1. Find user
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!user) {
      console.log('User not found in database for email:', email);
      // Return 404 for debugging so user knows why email didn't send
      return NextResponse.json(
        { error: 'User not found in our database.' },
        { status: 404 }
      );
    }

    console.log('User found:', user.name, '(ID:', user.id + ')');

    // 2. Generate token
    const token = crypto.randomUUID();
    const expiry = new Date();
    expiry.setHours(expiry.getHours() + 1); // 1 hour expiry

    // 3. Update user with token
    await db
      .update(users)
      .set({
        resetToken: token,
        resetTokenExpiry: expiry,
      })
      .where(eq(users.id, user.id));

    // 4. Send Email via Nodemailer (Gmail)
    const baseUrl = process.env.NEXT_BASE_URL || 'http://localhost:3000';
    const resetLink = `${baseUrl}/new-password?token=${token}`;

    console.log('Preparing to send email via Nodemailer to:', email);

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },

      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: `"FPD Lab" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: 'Reset Password - FPD Lab',
      html: `
                <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px; max-width: 600px;">
                    <h2 style="color: #2AB2C7;">Reset Your Password</h2>
                    <p>You requested a password reset for your account at FPD Lab. Click the button below to set a new password. This link is valid for 1 hour.</p>
                    <a href="${resetLink}" style="display: inline-block; padding: 12px 24px; background-color: #2AB2C7; color: white; text-decoration: none; border-radius: 8px; font-weight: bold; margin-top: 10px;">Reset Password</a>
                    <p style="font-size: 12px; color: #777; margin-top: 20px;">If the button doesn't work, copy and paste this link into your browser: <br/> ${resetLink}</p>
                    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
                    <p style="font-size: 12px; color: #999;">If you did not request this, please ignore this email.</p>
                </div>
            `,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', info.messageId);
    } catch (mailError) {
      console.error('Nodemailer Error:', mailError);
      return NextResponse.json(
        { error: 'Failed to send email: ' + mailError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Password reset link sent to email.',
    });
  } catch (error) {
    console.error('General Forgot Password error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error.message },
      { status: 500 }
    );
  }
}
