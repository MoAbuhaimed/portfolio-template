# Portfolio-template

A reusable, dark-themed developer portfolio built with Flask + Jinja.
Most portfolio content is driven by [`data/portfolio.json`](data/portfolio.json)
— no HTML/Jinja editing is required for normal customization.

![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-000000?style=flat-square&logo=flask&logoColor=white)
![Jinja](https://img.shields.io/badge/Jinja-B41717?style=flat-square&logo=jinja&logoColor=white)
![No Build Step](https://img.shields.io/badge/Build%20Step-none-22d3ee?style=flat-square)
![JSON Driven](https://img.shields.io/badge/Content-JSON--driven-8b5cf6?style=flat-square)

## Live Project

Not deployed yet — the live project URL will be added after deployment.

## Preview

![Portfolio-template preview](docs\preview.gif)

## Features

- **JSON-driven content** — no HTML/Jinja editing for normal use
- **No database, no build step** — portfolio content is managed
  through JSON, with no npm/bundler required
- **Dark / light theme** — persisted, with a system-preference fallback
- **Fully responsive** — dedicated mobile, tablet, and desktop layouts
- **Scroll animations** — reveal-on-scroll and an animated "typing"
  panel, both respecting `prefers-reduced-motion`
- **Five ready-made sections** — Hero, About, Skills, Projects, Contact
- **Deploys anywhere Python runs** — a standard Flask app

## Customize

The whole workflow, start to finish:

1. Edit [`data/portfolio.json`](data/portfolio.json) — name, about,
   skills, projects, social links
2. Add your images and resume under `static/`
3. Run the app locally to check it
4. Deploy

**No `.html` or Jinja template editing needed for normal customization.**

| What you want to change | Where |
|---|---|
| Name / title | `data/portfolio.json` |
| About | `data/portfolio.json` |
| Skills | `data/portfolio.json` |
| Projects | `data/portfolio.json` |
| Social links | `data/portfolio.json` |
| Profile photo | `static/images/` |
| Project screenshots | `static/images/projects/` |
| Resume | `static/files/resume.pdf` |
| Theme colors | `static/css/style.css` |
| Favicon | `static/images/favicon.svg` |

## Quick Start

Requires Python 3.10+. Click **Use this template** on GitHub, or
clone the repository directly.

```bash
cd Portfolio-template
python -m venv .venv
```

Activate the virtual environment, then install and run:

```bash
# Windows
.venv\Scripts\activate

# macOS / Linux
source .venv/bin/activate
```

```bash
pip install -r requirements.txt
python app.py
```

Open **http://localhost:5050**. Changes to `data/portfolio.json`, CSS,
and JavaScript are picked up automatically by the development server —
refresh the page to see them. Set `PORT` to use a different port
(e.g. `PORT=5000 python app.py`).

## Project Structure

```text
Portfolio-template/
├── app.py                  # Loads portfolio.json, renders templates
├── data/
│   └── portfolio.json      # ← the file you edit
├── templates/               # Jinja layout — you shouldn't need to touch this
├── static/
│   ├── css/style.css        # Theme colors, fonts, layout
│   ├── js/main.js
│   ├── images/               # Favicon, profile photo, project screenshots
│   └── files/                 # Resume PDF
├── requirements.txt
└── README.md
```

## Customization

### Content

`data/portfolio.json` drives the site — edit `site`, `hero`, `about`,
`skills`, `projects`, and `contact` directly. A few examples:

```json
"site": { "name": "Your Name", "title": "AI & Software Developer" }
```

```json
"skills": ["Python", "Flask", "SQL"]
```

```json
{
  "title": "My Project",
  "description": "What it does.",
  "technologies": ["Flask"],
  "github_url": "https://github.com/you/it",
  "demo_url": "",
  "image": "",
  "featured": false
}
```

Only `title` and `description` are required on a project — every
other field is optional and simply doesn't render if left empty (no
technologies row, no live-demo link, no screenshot). `featured` only
affects sort order (featured projects appear first); it doesn't
change how a project card looks.

**Social links** live in `contact.email` / `.github` / `.linkedin`
(leave any as `""` to hide that pill) plus an open-ended
`contact.extra_links` array for anything else.

Two syntax notes: `hero.terminal.lines` are plain code-like strings
(quoted substrings get auto-colored), and `about.paragraphs` support
`**asterisks**` for the site's gradient text highlight.

### Profile & Project Images

- **Profile photo:** add it to `static/images/`, then set
  `site.profile_image` (+ `profile_image_alt`, `initials`). If the
  image is missing or fails to load, it falls back to showing
  `initials` instead of a broken image icon.
- **Project screenshots:** add to `static/images/projects/`, then set
  `image` on that project. Leave `image` empty and the card still
  looks complete — it uses the default decorative gradient panel.

### Resume

1. Put your resume PDF at `static/files/resume.pdf`.
2. Set `site.resume_url` to `/static/files/resume.pdf` (or an external
   URL, e.g. Google Drive).

A "Resume" button appears in the navbar automatically (opens in a new
tab) whenever `resume_url` is set. Leave it as `""` to hide the button
entirely — there's never a link to a file that doesn't exist.

### Theme & Favicon

Colors, fonts, radii, and spacing are all CSS variables at the top of
[`static/css/style.css`](static/css/style.css) (`:root { ... }`, with
a light-mode override block right below) — one place to re-theme
everything consistently. For the favicon, replace
`static/images/favicon.svg` and update `site.favicon` if you rename it.

## Deployment

Standard Flask app — the app reads `PORT` from the environment, so
most platforms that inject `$PORT` work without code changes.

**Render** (recommended):

1. Create a new **Web Service** and connect this GitHub repository.
2. **Build Command:** `pip install -r requirements.txt`
3. **Start Command:** `gunicorn app:app`

Static files are served by Flask directly, which is fine for a small
personal site.

## Limitations

- **No contact form** — the CTA is a `mailto:` link.
- **No CMS/admin panel** — content is managed through JSON.
- **No image processing** — optimize/compress images yourself before
  adding them.
