# Logiq Setup Guide (For Beginners) 🚀

This guide will help you set up the backend (Supabase) and AI (Groq) for your app. Even if you have zero knowledge of these tools, just follow the steps below!

---

## Step 1: Set Up Supabase (Database & Auth)

Supabase is where your user data (profiles, matches, followers) is stored.

1.  **Create an Account**: Go to [supabase.com](https://supabase.com/) and sign up.
2.  **Create a New Project**: 
    *   Click **"New Project"**.
    *   Choose a name (e.g., `Logiq-App`).
    *   Set a **Database Password** (write this down!).
    *   Choose the region closest to you.
    *   Click **"Create New Project"** (this takes about 1-2 minutes).
3.  **Get Your Keys**:
    *   Once the project is ready, go to **Project Settings** (gear icon) -> **API**.
    *   Copy the **Project URL**.
    *   Copy the **`anon` public API Key**.

---

## Step 2: Set Up Groq (AI Puzzles)

Groq is the "brain" that generates your logic puzzles.

1.  **Create an Account**: Go to [console.groq.com](https://console.groq.com/) and sign up.
2.  **Get an API Key**:
    *   Go to the **"API Keys"** section in the left sidebar.
    *   Click **"Create API Key"**.
    *   Give it a name (e.g., `Logiq-AI`) and copy the key.

---

## Step 3: Configure Your App (Environment Variables)

Now you need to tell your code where to find Supabase and Groq.

1.  **Open your project** in VS Code (the `App-one` folder).
2.  **Create a file** named `.env.local` in the root folder (if it doesn't exist).
3.  **Paste your keys** into the file like this (replace the text with your actual keys):

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# Groq AI
GROQ_API_KEY=your_groq_api_key_here
```

---

## Step 4: Initialize the Database (SQL)

This creates the tables for users, matches, and questions.

1.  Go back to your **Supabase Dashboard**.
2.  Click on **"SQL Editor"** (the `>_` icon in the left sidebar).
3.  Click **"+ New Query"**.
4.  Open the file `supabase/schema.sql` in VS Code, copy everything inside it, and paste it into the Supabase SQL Editor.
5.  Click **"Run"**. You should see "Success"!

---

## Step 5: Start the App!

1.  Open your **Terminal** in VS Code.
2.  Type `npm install` (this installs all the "gears" the app needs).
3.  Type `npm run dev`.
4.  Open [http://localhost:3000](http://localhost:3000) in your browser.

**You're all set!** You can now go to `/signup` to create your first real account and start playing. 🧩⚽✨

---

## Step 6: How the AI & Sync Work (The "Magic")

Based on your rules, the app now handles the four sections differently:

### 1. Synchronized Duels (Logic Puzzle & Aptitude Sprint)
*   **The Function**: When you play against an opponent, the AI generates questions on-the-fly.
*   **The Sync**: Both you and your opponent will see the **exact same questions** at the same time. If you finish them, the app generates more automatically.
*   **Integration**: This uses Supabase **Realtime** to keep both players in "lockstep."

### 2. Daily Leaderboards (Number Series & Speed Trial)
*   **The Function**: These are for global ranking.
*   **The Sync**: Every user in the world sees the **same set of questions** for a full 24 hours.
*   **Rotation**: At UTC midnight, the app automatically asks Groq to generate a fresh set of questions for the new day.
*   **Integration**: This uses the `daily_challenges` table we created in Step 4.

---

## Step 7: Enabling Google Authentication (Supabase + Google Cloud)

To make the "Sign in with Google" button work, you need to connect your app to Google.

### A. Get Google Client ID & Secret
1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a **New Project**.
3. Search for **"APIs & Services"** -> **"OAuth consent screen"**.
    - Choose **External** and fill in your app name.
4. Go to **"Credentials"** -> **"Create Credentials"** -> **"OAuth client ID"**.
    - Select **Web application**.
    - Under **Authorized redirect URIs**, paste your Supabase Redirect URI.
    - *You can find your Supabase Redirect URI in Step B below.*
5. Copy your **Client ID** and **Client Secret**.

### B. Configure Supabase
1. In your **Supabase Dashboard**, go to **Authentication** -> **Providers** -> **Google**.
2. Toggle it to **ON**.
3. Paste the **Client ID** and **Client Secret** you got from Google.
4. Copy the **Redirect URI** shown in this Supabase tab and paste it back into your Google Cloud "Authorized redirect URIs" (from Step A.4).
5. Click **Save**.

---

## Troubleshooting Tip 💡
If you don't see questions loading:
1. Check your `.env.local` to ensure your keys are correct.
2. Ensure you have run the **SQL script** in the Supabase Dashboard SQL Editor.
3. Make sure your internet connection is active so the app can reach Groq.

**You're ready to master the Arena!** 🧩⚔️✨
