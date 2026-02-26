# Contact Form Setup (Web3Forms)

The contact form uses Web3Forms, a free email service that doesn't require a backend.

## Quick Setup (2 minutes)

1. **Get your free access key:**
   - Visit: https://web3forms.com/
   - Enter your email address
   - Click "Get Access Key"
   - Copy the access key from your email

2. **Add the key to your project:**
   - Create a `.env` file in the project root
   - Add: `VITE_WEB3FORMS_KEY=your_access_key_here`
   - Replace `your_access_key_here` with the actual key

3. **Update recipient email:**
   - Open `src/components/home/CTASection.jsx`
   - Find the line: `to: "your-email@example.com"`
   - Replace with your actual email address

4. **That's it!** The form will now send emails to your address

## Features

✅ Free forever  
✅ Spam protection included  
✅ No backend needed  
✅ Email notifications  
✅ Form submissions stored in Web3Forms dashboard  

## Testing

After setup, test the form by:
1. Run `npm run dev`
2. Fill out the contact form
3. Check your inbox for the submission

## Deployment (Vercel)

When deploying to Vercel:
1. Go to your project settings
2. Navigate to Environment Variables
3. Add: `VITE_WEB3FORMS_KEY` with your access key value
4. Redeploy your application

## Need Help?

If you don't set up the access key, the form will work locally but won't send real emails. You can always add the key later in your hosting platform's environment variables.
