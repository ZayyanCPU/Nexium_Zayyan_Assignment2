# Deployment Guide for Vercel

## Environment Variables Setup

Before deploying to Vercel, you need to configure the following environment variables in your Vercel project settings:

### Required Environment Variables

1. **MONGODB_URI**
   - Your MongoDB connection string
   - Format: `mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority&appName=your-app-name`
   - Get this from your MongoDB Atlas dashboard

2. **NEXT_PUBLIC_SUPABASE_URL**
   - Your Supabase project URL
   - Format: `https://your-project-id.supabase.co`
   - Get this from your Supabase project settings

3. **NEXT_PUBLIC_SUPABASE_ANON_KEY**
   - Your Supabase anonymous/public key
   - Get this from your Supabase project settings under API keys

### How to Set Environment Variables in Vercel

1. Go to your Vercel dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add each variable:
   - **Name**: `MONGODB_URI`
   - **Value**: Your MongoDB connection string
   - **Environment**: Production, Preview, Development (select all)
5. Repeat for `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Security Notes

- ✅ Environment variables are encrypted and secure
- ✅ Never commit `.env` files to your repository
- ✅ The `.gitignore` file already excludes `.env*` files
- ✅ Use `NEXT_PUBLIC_` prefix only for variables that need to be accessible in the browser

### Local Development

For local development, create a `.env.local` file in your project root with the same variables:

```bash
MONGODB_URI=your-mongodb-connection-string
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### Deployment Steps

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set up the environment variables in Vercel dashboard
4. Deploy!

Your app will now use the secure environment variables instead of hardcoded credentials. 