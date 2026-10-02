# ⚡ Hugh's AI Portfolio Workspace

> An intelligent, interactive portfolio designed with an **Antigravity & Gemini-inspired AI workspace interface**. Features a left-hand navigation sidebar acting as an active Table of Contents, smooth shortcut scrolling to featured Generative AI projects, and a docked AI prompt bar with assistant capabilities.

![AI Portfolio Preview](https://raw.githubusercontent.com/MrYharon/portfolio/main/public/preview.png)

---

## 🌟 Key Features

- 🤖 **Antigravity & Gemini Workspace Aesthetic**: Dark-mode glassmorphic theme with glowing model badges, breadcrumbs, and real-time status indicators.
- 📑 **Interactive Sidebar as Table of Contents**:
  - Direct jump shortcuts to individual projects and sections (`#hero`, `#about`, `#skills`, `#projects`, `#experience`, `#contact`).
  - Active section scrollspy highlighting where the user is as they read through the page.
  - Collapsible on desktop and mobile drawer friendly.
- 🎯 **Deep Dive into Generative AI Projects**:
  - Dedicated cards detailing **"What I Did"**, **"Generative AI & LLM Components"**, metrics, and architecture decisions.
  - Quick action buttons: **Live Demo**, **GitHub Code**, and **"Ask AI"** shortcut.
- 💬 **Docked AI Assistant Prompt Bar**:
  - Located at the bottom of the screen with quick suggestion chips (e.g., *"Summarize Hugh's background"*, *"Explain GenAI projects"*, *"How to contact Hugh"*).
  - Built-in interactive assistant responses with direct action buttons that jump to the corresponding portfolio section.
- 🌐 **Custom Domain & Deployment Ready**:
  - Built with **React 19**, **Vite**, **TypeScript**, and **Tailwind CSS**.
  - Deploys instantly to **Vercel**, **Cloudflare Pages**, **Netlify**, or **GitHub Pages** with custom domain support.

---

## 📁 How to Customize Your Content

All data is separated into a single file so you can easily update your information, projects, resume link, and LinkedIn:

👉 **[`src/data/portfolioData.ts`](./src/data/portfolioData.ts)**

Inside, you will find:
1. **`personal`**:
   - `name`: Your name
   - `headline`: Your professional headline
   - `role`: Title (e.g. AI Engineer / Generative AI Specialist)
   - `avatarUrl`: Path or URL to your photo
   - `bio`: Short elevator pitch
   - `linkedin`: Your LinkedIn URL
   - `github`: Your GitHub profile URL
   - `email`: Your contact email
   - `resumeUrl`: Link to your resume PDF
2. **`projects`**:
   - Add, edit, or remove projects. Each project includes `id`, `title`, `tagline`, `category`, `overview`, `whatIDid`, `generativeAiAspects`, `techStack`, `metrics`, `demoUrl`, and `status`.
3. **`skillCategories`**:
   - Groupings for Generative AI, Full-Stack, Infrastructure, etc.
4. **`experience`**:
   - Career timeline and bullet points.

---

## 🚀 Quickstart & Local Development

### Prerequisites
- Node.js (v18+)
- npm or pnpm

### 1. Clone repository
```bash
git clone https://github.com/MrYharon/portfolio.git
cd portfolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run development server
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

### 4. Build for production
```bash
npm run build
```
Generates optimized static assets in the `dist/` directory ready for deployment.

---

## 🌐 Connecting Your New Domain

Since this is built with Vite, you can connect your newly purchased domain in under 3 minutes:

### Option A: Vercel (Recommended)
1. Push this repository to GitHub (`MrYharon/portfolio`).
2. Go to [vercel.com](https://vercel.com) and import the repository.
3. In Project Settings > **Domains**, enter your custom domain (e.g. `yourname.com`).
4. Update your domain's DNS records (A record to `76.76.21.21` or CNAME to `cname.vercel-dns.com`).

### Option B: Cloudflare Pages
1. Go to Cloudflare Dashboard > Workers & Pages > Create application > Pages > Connect to Git.
2. Select `portfolio`, framework preset `Vite`, build command `npm run build`, output directory `dist`.
3. Go to Custom Domains and add your domain with 1 click.

---

## 🔌 Connecting Real AI (Optional Next Step)

The bottom prompt bar currently includes simulated AI answers and automated navigation. To connect it to real-time generative responses:
- Add the **Google Gemini API** (`@google/genai` or `@google/generative-ai`) via a lightweight serverless function / backend route so your API key remains secure.

---

## 📄 License
MIT
