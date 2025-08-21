# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.
# Sasha-Tutor

## Environment Variables

To deploy this application, you will need to set the following environment variable.

- `GEMINI_API_KEY`: Your API key for Google's Gemini models.

You can get a free API key from [Google AI Studio](https://aistudio.google.com/app/apikey).

### Local Development

Create a file named `.env` in the root of your project and add your API key to it:

```
GEMINI_API_KEY="YOUR_API_KEY_HERE"
```

### Vercel Deployment

When deploying to Vercel, you will need to add the `GEMINI_API_KEY` in the "Environment Variables" section of your project settings.
