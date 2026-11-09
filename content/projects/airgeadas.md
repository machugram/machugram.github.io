---
title: Airgeadas — Household Finance Planner
displayTitle: Airgeadas
summary: "A browser household planner: Irish take-home next to rent, bills, and leftover pots."
draft: false
date:  2026-09-03
github: https://github.com/machugram/airgeadas
cover: https://raw.githubusercontent.com/machugram/airgeadas/main/docs/overview.png
stack: [Angular, TypeScript]
featured: false
order: 7
---

**Airgeadas** — Irish for finance — is a household planner that lives in the browser. The app is called Clearplan. Money in, money out, leftover in a typical month. No account, no API, no Google Fonts.

A job offer in Ireland is a gross number. Life is leftover after PAYE, USC, PRSI, pension, and rent. I kept answering that in a spreadsheet.

![Overview with leftover, month pie, and leftover pots](https://raw.githubusercontent.com/machugram/airgeadas/main/docs/overview.png)

```text
job offer  ─►  Ireland take-home (in-browser)
                      │
                      ▼
               income line on the plan
                      │
   spending lines  ───┼──►  leftover  ─►  pots
                      │
                 localStorage only
```

## Why I built it

Paste a salary. Guess the tax. Convert year to month. Subtract housing and bills in another tab.

Bank apps show what already happened. They do not convert an offer into a household. Take-home calculators stop at net. They do not put that net next to cíos and leftover pots.

I wanted one plan on the device. Estimate Irish take-home from an offer (bonus, pension match, rent credit, tax credits), drop a typical month onto the plan, then split whatever is left into savings, stocks, emergency, extra pension. Freelance sits next to PAYE. Weekly and yearly cadences collapse to the same month.

The numbers never leave the browser. That is the product constraint, not a privacy page. Irish figures use 2026 Revenue bands. It is not tax advice. Payroll will differ.

Origin never sees the plan. Private mode or a full disk keeps the session in memory and skips persist.

## Tech Stack

- **Angular 20** — standalone routes, signals, no backend
- **TypeScript** — Irish PAYE / USC / PRSI as pure functions, tested in Jasmine
- **localStorage** — plan entries and leftover pots (`clearplan-entries-v1`)
- **SVG pie** — month composition without a chart library

## What it does

- Typical month: leftover, spending pie, and pots on one overview
- Ireland take-home: bonus, of-gross, tax credits, pension match, rent. Year through hour on one table
- PAYE, freelance, rent received, housing, bills. Cadence is weekly, monthly, or yearly
- Leftover pots: Coigiltis, Stocanna, Ciste práinne, Pinsin extra
- Arrival checklist and guides, still with no account

![Ireland take-home with bonus, of-gross, and year to hour table](https://raw.githubusercontent.com/machugram/airgeadas/main/docs/take-home.png)

![Income page with net pay and freelance on the plan](https://raw.githubusercontent.com/machugram/airgeadas/main/docs/income.png)

```bash
cd src/web
npm start
```

Open [http://localhost:4200](http://localhost:4200).
