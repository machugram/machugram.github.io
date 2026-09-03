---
title: Airgeadas — Household Finance Planner
draft: false
date:  2026-09-03
github: https://github.com/machugram/airgeadas
---

**Airgeadas** is a household finance planner that lives in the browser. The app is called Clearplan. Money in, money out, leftover in a typical month. No account, no API, no Google Fonts. A job offer becomes net pay; net pay becomes a line on the same plan as rent and groceries.

The unit is a typical month, not a job title.

![Overview with leftover, month pie, and leftover pots](https://raw.githubusercontent.com/machugram/airgeadas/main/docs/overview.png)

## Why I built it

A job offer in Ireland is a gross number. Life is leftover after PAYE, USC, PRSI, pension, and rent.

I kept answering that in a spreadsheet: paste a salary, guess the tax, convert year to month, then subtract housing and bills in another tab. Bank apps show what already happened. They do not convert an offer into a household. Take-home calculators stop at net. They do not put that net next to cíos and leftover pots.

I wanted one plan on the device. Estimate Irish take-home from an offer (bonus, pension match, rent credit, tax credits), drop a typical month onto the plan, then split whatever is left into savings, stocks, emergency, extra pension. Income and spending are ordinary lines. Freelance sits next to PAYE. Weekly and yearly cadences collapse to the same month.

The numbers never leave the browser. That is the product constraint, not a privacy page. Irish figures use 2026 Revenue bands. It is not tax advice. Payroll will differ.

## Tech Stack

- **Angular 20** — standalone routes, signals, no backend
- **TypeScript** — Irish PAYE / USC / PRSI estimator as pure functions, tested in Jasmine
- **localStorage** — plan entries and leftover pots stay on the device (`clearplan-entries-v1`)
- **SVG pie** — month composition without a chart library

## Architecture Overview

The take-home tool writes into the planner. The planner does not call the network.

1. **Ireland take-home** — `estimatePay` turns annual salary into net for year, month, fortnight, week, and hour. First month can be a mid-month start. Occupational and MyFutureFund pensions, rent credit, household status, and 2026 PRSI steps are in the same function
2. **Planner** — income and expense lines with weekly / monthly / yearly cadence, folded to a typical month. Leftover is income minus spending
3. **Leftover pots** — allocate spare into Coigiltis, Stocanna, Ciste práinne, Pinsin extra. Suggest splits 50 / 30 / remainder; remaining is leftover that is still unassigned
4. **Guides and checklist** — arrival and household copy, not a second source of truth for the numbers

```
job offer  ─►  Ireland take-home (in-browser)
                      │
                      ▼
               income line on the plan
                      │
   spending lines  ───┼──►  leftover  ─►  pots
                      │
                 localStorage only
```

Origin never sees the plan. Private mode or a full disk keeps the session in memory and skips persist.

## Key Features

- **Typical month** — leftover, spending pie, and pots on one overview
- **Ireland take-home** — bonus, of-gross, tax credits, pension match, rent; year through hour on one table
- **Same plan for every line** — PAYE, freelance, rent received, housing, bills. Cadence is weekly, monthly, or yearly
- **Leftover pots** — named allocations for whatever the month still has
- **Arrival checklist and guides** — household orientation without an account
- **On-device** — no signup, no API, no third-party fonts

![Ireland take-home with bonus, of-gross, and year to hour table](https://raw.githubusercontent.com/machugram/airgeadas/main/docs/take-home.png)

![Income page with net pay and freelance on the plan](https://raw.githubusercontent.com/machugram/airgeadas/main/docs/income.png)

## Not tax advice

Irish figures use 2026 Revenue bands. Your own payroll will differ.

## Run

```bash
cd src/web
npm start
```

Open [http://localhost:4200](http://localhost:4200).
