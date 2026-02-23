---
description: How to deploy the Logiq app to Vercel
---

Follow these steps to deploy your project and make it live on the web:

### 1. Push your code to GitHub
Vercel works best with a Git repository. If you haven't already:
1. Create a new repository on [GitHub](https://github.com/new).
2. Initialize and push your project:
   ```bash
   git init
   git add .
   git commit -m "Initialize project"
   git remote add origin YOUR_REPOSITORY_URL
   git push -u origin main
   ```

### 2. Import to Vercel
1. Go to the [Vercel Dashboard](https://vercel.com/new).
2. Click **Import Repository** and select your GitHub repository.

### 3. Configure Environment Variables
**CRITICAL**: Your AI features (Genkit) will not work without an API key on the live site.
1. In the Vercel **Project Settings**, go to the **Environment Variables** tab.
2. Add a new variable:
   - **Key**: `GOOGLE_API_KEY`
   - **Value**: Your actual Gemini API key (from [Google AI Studio](https://aistudio.google.com/app/apikey)).
3. Click **Add**.

### 4. Deploy
1. Click **Deploy**. Vercel will automatically build and host your site.
2. Once finished, you will receive a public URL (e.g., `logiq-app.vercel.app`).

### 5. Future Updates
Every time you `git push` to your GitHub repository, Vercel will automatically trigger a new deployment and update your live site!
