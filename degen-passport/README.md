# Degen Passport

Your onchain identity card — powered by Zerion.

## Deploy to Vercel (5 mins, free)

1. Create a GitHub repo and upload this folder
2. Go to vercel.com → New Project → import your repo
3. Click Deploy — no env variables needed
4. Done. You get a live URL like `degen-passport.vercel.app`

Users enter their own Zerion API key directly in the app.

## Project Structure
```
degen-passport/
├── public/
│   └── index.html         # Frontend
├── api/
│   └── zerion/
│       └── [...path].js   # Zerion proxy (handles CORS)
└── vercel.json            # Routing config
```
