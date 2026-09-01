# Shraddha Bhujbal — Portfolio

A dark/light-mode developer portfolio styled like a code editor: a VS Code–style file explorer for navigation, syntax-highlighted hero text, and each section presented as an "open file" (`about.md`, `education.json`, `experience.log`, etc). Built with plain HTML, CSS, and JavaScript — no build step, no frameworks — so it deploys anywhere for free.

## ✨ Features

- Editor-inspired UI: file-explorer sidebar, tabs, gutter line numbers
- Dark / light theme toggle (saved across visits, respects system preference on first visit)
- Typing animation in the hero, scroll-triggered section reveals, hover micro-interactions
- Fully responsive (sidebar collapses to a menu on mobile)
- Accessible: visible keyboard focus states, `prefers-reduced-motion` respected
- Zero dependencies — pure HTML/CSS/JS, easy to host on GitHub Pages, Netlify, or Vercel

## 📁 Folder structure

```
portfolio/
├── index.html              # All page content/sections
├── css/
│   └── style.css           # Theme tokens (dark + light), layout, animations
├── js/
│   └── script.js           # Theme toggle, typing effect, scroll reveal, nav highlighting
├── assets/
│   ├── images/              # Put a profile photo / project screenshots here (optional)
│   └── Shraddha_Bhujbal_Resume.pdf   # ⚠️ add your actual résumé PDF here (see below)
└── README.md
```

## ⚠️ Before you publish — placeholders to update

Open `index.html` and search for these and replace with your real details:

| What | Where | Search for |
|---|---|---|
| Email | Contact section | `your.email@example.com` |
| Phone | Contact section | `+91XXXXXXXXXX` |
| LinkedIn URL | Hero + Contact | `href="#"` near `data-social="linkedin"` and the LinkedIn contact card |
| GitHub URL | Hero + Contact | `href="#"` near `data-social="github"` and the GitHub contact card |
| Portfolio/other URL | Hero | `href="#"` near `data-social="portfolio"` |
| Résumé PDF | `assets/` folder | Add a file named exactly `Shraddha_Bhujbal_Resume.pdf` (or update the `href` in the two "Download résumé" buttons in `index.html` if you name it differently) |

Everything else (education, skills, experience, projects, achievements, certifications) is already filled in from your résumé — edit the text directly inside the relevant `<section>` in `index.html` any time your details change.

## 🚀 Deploy on GitHub Pages (free)

1. Create a new repository on GitHub, e.g. `shraddha-portfolio`.
2. Upload the **contents** of this `portfolio/` folder to the repo root (so `index.html` sits at the top level, not inside a subfolder).
   - Easiest way: on the repo page, click **Add file → Upload files**, drag in everything from this folder, and commit.
   - Or via git:
     ```bash
     git init
     git add .
     git commit -m "Initial portfolio"
     git branch -M main
     git remote add origin https://github.com/<your-username>/shraddha-portfolio.git
     git push -u origin main
     ```
3. In the repo, go to **Settings → Pages**.
4. Under **Build and deployment → Source**, choose **Deploy from a branch**.
5. Under **Branch**, select `main` and folder `/ (root)`, then **Save**.
6. Wait a minute, then your site will be live at:
   `https://<your-username>.github.io/shraddha-portfolio/`

### Alternative: Netlify / Vercel
Both support "drag and drop" deploys of a static folder — just drag this `portfolio/` folder onto their dashboard and it will be live in seconds, with a custom subdomain and free HTTPS.

## 🎨 Customizing the theme

All colors, fonts, and spacing live as CSS variables at the top of `css/style.css`:

```css
:root, [data-theme="dark"] { --bg:#0B0E14; --accent:#4FD1C5; ... }
[data-theme="light"]       { --bg:#FAFAF8; --accent:#0E8F82; ... }
```

Change `--accent`, `--accent-2`, etc. to re-theme the whole site without touching layout code.

## 🖼️ Adding a profile photo (optional)

Drop an image into `assets/images/`, then in `index.html` add an `<img>` tag inside `.hero-render` — the layout already has room above `.hero-name` for one.

---

Built with plain HTML, CSS & JavaScript. No npm install needed — just open `index.html` in a browser to preview locally.
