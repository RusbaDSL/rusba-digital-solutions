const express = require('express');
const cors = require('cors');
const { Resend } = require('resend');
require('dotenv').config();

const app = express();
const PORT = 5000;

const resendApiKey = process.env.RESEND_API_KEY;

// Initialize Resend only if API key is available
let resend = null;
if (resendApiKey && resendApiKey !== 're_placeholder_get_your_key_from_resend_dashboard') {
    resend = new Resend(resendApiKey);
}

// Simple CORS configuration
const corsOptions = {
    origin: ['http://localhost:3000', 'https://rusba-ng.netlify.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true
};

console.log('Configured CORS origins:', corsOptions.origin);

// Enable CORS for all routes
app.use(cors(corsOptions));

// Handle preflight requests explicitly  
app.options('*', cors(corsOptions));

app.use(express.json());

// Debug middleware to log all requests
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url} from ${req.headers.origin || 'unknown origin'}`);
    next();
});

// Test endpoint
app.get('/api/health', (req, res) => {
    console.log('Health check hit from origin:', req.headers.origin);
    res.json({ status: 'ok', cors: 'working' });
});

// Contact endpoint
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, phone, subject, message } = req.body;
        
        console.log('Contact endpoint hit from origin:', req.headers.origin);
        console.log('Request body:', { name, email, phone, subject, message });

        // Validate required fields
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ 
                success: false, 
                message: 'Please fill in all required fields.' 
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ 
                success: false, 
                message: 'Please provide a valid email address.' 
            });
        }

        // Create email content
        const emailHtml = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
                <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <h1 style="color: #66b2ff; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
                        <div style="width: 60px; height: 3px; background-color: #66b2ff; margin: 10px auto;"></div>
                    </div>
                    
                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                        <h2 style="color: #333; margin: 0 0 15px 0; font-size: 18px;">Contact Details</h2>
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 8px 0; color: #666; font-weight: bold; width: 100px;">Name:</td>
                                <td style="padding: 8px 0; color: #333;">${name}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; color: #666; font-weight: bold;">Email:</td>
                                <td style="padding: 8px 0; color: #333;">${email}</td>
                            </tr>
                            ${phone ? `
                            <tr>
                                <td style="padding: 8px 0; color: #666; font-weight: bold;">Phone:</td>
                                <td style="padding: 8px 0; color: #333;">${phone}</td>
                            </tr>
                            ` : ''}
                            <tr>
                                <td style="padding: 8px 0; color: #666; font-weight: bold;">Subject:</td>
                                <td style="padding: 8px 0; color: #333;">${subject}</td>
                            </tr>
                        </table>
                    </div>
                    
                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px;">
                        <h2 style="color: #333; margin: 0 0 15px 0; font-size: 18px;">Message</h2>
                        <div style="background-color: #ffffff; padding: 15px; border-radius: 5px; border-left: 4px solid #66b2ff; line-height: 1.6; color: #333;">
                            ${message.replace(/\n/g, '<br>')}
                        </div>
                    </div>
                    
                    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #666; font-size: 12px;">
                        <p>This email was sent from the Rusba Digital Solutions contact form.</p>
                        <p>Submitted on: ${new Date().toLocaleString('en-US', { 
                            timeZone: 'Africa/Lagos',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true
                        })}</p>
                    </div>
                </div>
            </div>
        `;

        // Create confirmation email content
        const confirmationHtml = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
                <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <h1 style="color: #66b2ff; margin: 0; font-size: 24px;">Thank You for Contacting Us!</h1>
                        <div style="width: 60px; height: 3px; background-color: #66b2ff; margin: 10px auto;"></div>
                    </div>
                    
                    <div style="color: #333; line-height: 1.6;">
                        <p>Dear ${name},</p>
                        <p>Thank you for reaching out to Rusba Digital Solutions. We have received your message and will get back to you within 24 hours.</p>
                        
                        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                            <h3 style="color: #333; margin: 0 0 10px 0;">Your Message Summary:</h3>
                            <p style="margin: 0; color: #666;"><strong>Subject:</strong> ${subject}</p>
                            <p style="margin: 10px 0 0 0; color: #666;"><strong>Message:</strong> ${message}</p>
                        </div>
                        
                        <p>If you have any urgent inquiries, please feel free to call us directly.</p>
                        <p>Best regards,<br>The Rusba Digital Solutions Team</p>
                    </div>
                    
                    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #666; font-size: 12px;">
                        <p>Rusba Digital Solutions Limited</p>
                        <p>Port Harcourt, Rivers State, Nigeria</p>
                        <p>Email: contact@rusbadsl.com.ng</p>
                    </div>
                </div>
            </div>
        `;

        // Send email using Resend (if available)
        if (resend) {
            const emailData = await resend.emails.send({
                from: 'Contact Form <noreply@rusbadsl.com.ng>', // Replace with your verified domain
                to: ['boruye@gmail.com'], // Your email address
                subject: `New Contact Form Submission: ${subject}`,
                html: emailHtml,
                replyTo: email, // Allow replying directly to the sender
            });

            console.log('Email sent successfully:', emailData);

            // Send confirmation email to the user
            try {
                await resend.emails.send({
                    from: 'Rusba Digital Solutions <noreply@rusbadsl.com.ng>', // Replace with your verified domain
                    to: [email],
                    subject: 'Thank you for contacting Rusba Digital Solutions',
                    html: confirmationHtml,
                });
            } catch (confirmationError) {
                console.warn('Could not send confirmation email:', confirmationError);
                // Don't fail the main request if confirmation email fails
            }
        } else {
            // Log form data when Resend is not configured (development mode)
            console.log('=== CONTACT FORM SUBMISSION (DEV MODE) ===');
            console.log('From:', name, `<${email}>`);
            console.log('Phone:', phone || 'Not provided');
            console.log('Subject:', subject);
            console.log('Message:', message);
            console.log('Timestamp:', new Date().toISOString());
            console.log('===============================================');
        }

        res.json({ 
            success: true, 
            message: 'Thank you for your message! We will get back to you soon.' 
        });

    } catch (error) {
        console.error('Error sending contact email:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Sorry, there was an error sending your message. Please try again later.' 
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log('CORS origins:', corsOptions.origin);
    console.log('Resend configured:', resend ? 'Yes' : 'No (dev mode)');
});
