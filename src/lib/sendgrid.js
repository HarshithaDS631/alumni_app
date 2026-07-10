// src/lib/sendgrid.js

/**
 * Sends a welcome email using SendGrid Dynamic Templates.
 * NOTE: Calling SendGrid directly from the frontend exposes the API key to the client bundle.
 * For a production environment, you should move this logic to a backend server or a Supabase Edge Function.
 * 
 * @param {string} toEmail - The recipient's email address
 * @param {string} toName - The recipient's name
 */
export const sendWelcomeEmail = async (toEmail, toName) => {
  const SENDGRID_API_KEY = process.env.EXPO_PUBLIC_SENDGRID_API_KEY;
  const TEMPLATE_ID = process.env.EXPO_PUBLIC_SENDGRID_TEMPLATE_ID;
  const FROM_EMAIL = 'rveducational@gmail.com'; // Must match your verified SendGrid sender

  if (!SENDGRID_API_KEY || !TEMPLATE_ID) {
    console.warn('SendGrid API Key or Template ID missing. Email not sent.');
    return;
  }

  try {
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SENDGRID_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: {
          email: FROM_EMAIL,
          name: 'RV Alumni Portal'
        },
        personalizations: [
          {
            to: [
              {
                email: toEmail,
                name: toName
              }
            ],
            dynamic_template_data: {
              name: toName,
              // Add any other variables your template expects here
            }
          }
        ],
        template_id: TEMPLATE_ID
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('SendGrid Error:', errorData);
      throw new Error('Failed to send welcome email');
    }

    console.log(`Welcome email sent successfully to ${toEmail}`);
  } catch (error) {
    console.error('Error sending welcome email:', error);
  }
};
