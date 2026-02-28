# Cloudability Learning Hub

An interactive, self-paced static training site for **IBM Apptio Cloudability** and **FinOps**. No login required — just open `index.html` in any modern browser.

## Quick Start

### Option A – Open directly
```bash
# Just double-click or open in your browser:
open index.html
```

### Option B – Serve with a local HTTP server (recommended)
Using Python (no install needed on macOS/Linux):
```bash
python3 -m http.server 8080
# then open http://localhost:8080
```

Using Node.js:
```bash
npx serve .
# then open the URL shown in the terminal
```

Using VS Code:
- Install the [**Live Server** extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) (`ritwickdey.LiveServer`) and click *Go Live* in the status bar.

## Learning Path

The site covers 8 modules in a logical progression from fundamentals to advanced topics:

| # | Module | Topics |
|---|--------|--------|
| 1 | **FinOps & Cloudability Fundamentals** | FinOps lifecycle, Inform/Optimise/Operate, key terminology |
| 2 | **Getting Started & Data Ingestion** | AWS CUR, Azure Cost Export, GCP BigQuery billing |
| 3 | **Cost Visibility & Reporting** | Saved Views, anomaly detection, dashboards |
| 4 | **Allocation & Tagging** | Tagging taxonomy, business mapping, shared cost distribution |
| 5 | **Optimisation & Waste Reduction** | Rightsizing, Reserved Instances, Savings Plans, waste elimination |
| 6 | **Budgeting & Forecasting** | Budget creation, alert thresholds, statistical forecasting |
| 7 | **Advanced Topics** | Business mapping deep-dive, forecasting nuances, API, Kubernetes cost |
| 8 | **FinOps Best Practices** | Operating model, Crawl/Walk/Run maturity, KPIs |

After completing the modules, visit the **Resources** section for curated external links, then take the **Knowledge Quiz** to test your understanding.

## Project Structure

```
Cloudability-training-page/
├── index.html        # Single-page application (all sections)
├── css/
│   └── styles.css    # Full site stylesheet (IBM design system colours)
├── js/
│   └── app.js        # Navigation, progress tracking, tabs, accordions, quiz engine
└── README.md
```

## Features

- **Single-page app** – sidebar navigation switches between sections without page reloads
- **Progress tracking** – topbar progress bar updates as you complete modules
- **Responsive** – sidebar collapses to a hamburger menu on small screens
- **Interactive quiz** – 20+ questions with per-answer explanations and a final score screen
- **No build step** – pure HTML/CSS/JavaScript, no framework or bundler required
