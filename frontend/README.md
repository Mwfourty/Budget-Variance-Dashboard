# Ledger — Finance Dashboard

A React + Vite + Tailwind frontend for a tech company's finance department:
budget tracking, variance/utilization reporting, and department approval
status, backed by a Spring Boot REST API.

## 1. Tech stack

- **React 18 + Vite** — fast local dev server and optimized production build.
- **Tailwind CSS** (`darkMode: 'class'`) — grayscale base palette with an
  orange ("ember") accent, plus a true OLED-black dark theme.
- **React Router v6** — separates public auth routes from the protected app.
- **Axios** — HTTP client wired to the Spring Boot backend.
- **Recharts** — bar / line / pie charts driven by one toggle.
- **lucide-react** — icon set used throughout (sidebar, header, table, pills).
- **three.js** — powers the ambient `LiquidEther` fluid background.

## 2. Folder structure

```
finance-dashboard/
├── index.html
├── vite.config.js
├── tailwind.config.js         # color tokens: ember (orange), graphite (gray), oled (dark)
├── postcss.config.js
├── .env.example
└── src/
    ├── main.jsx                 # app bootstrap: Router + ThemeProvider + AuthProvider
    ├── App.jsx                  # route table (public vs protected)
    ├── index.css                # Tailwind layers + base styles
    ├── api/
    │   └── axiosClient.js       # Axios instance, JWT header, 401 handling
    ├── context/
    │   ├── ThemeContext.jsx     # light / OLED-dark mode state (persisted)
    │   └── AuthContext.jsx      # login, admin login, register, logout
    ├── data/
    │   └── mockData.js          # local fallback data if the API isn't up yet
    ├── components/
    │   ├── background/
    │   │   ├── LiquidEther.jsx  # fluid-simulation canvas (your supplied code)
    │   │   ├── LiquidEther.css
    │   │   └── AppBackdrop.jsx  # themed wrapper, fixed behind all panels
    │   ├── layout/
    │   │   ├── Sidebar.jsx          # persistent left icon rail
    │   │   ├── ProtectedLayout.jsx  # backdrop + sidebar + <Outlet/>
    │   │   └── AuthLayout.jsx       # centered card shell for auth pages
    │   ├── routes/
    │   │   └── ProtectedRoute.jsx   # auth + role guard
    │   ├── ui/
    │   │   ├── StatusPill.jsx       # Draft/Pending/Approved/Rejected
    │   │   ├── ModeSwitch.jsx       # light/dark toggle (used in Settings)
    │   │   └── FormField.jsx        # shared labeled input
    │   └── dashboard/
    │       ├── TopHeader.jsx        # logo, Month/Year, Q1–Q4, chart-type cycle
    │       ├── ChartPanel.jsx       # bar / line / pie via one toggle
    │       ├── SummaryPanel.jsx     # total variance + budget utilization
    │       ├── FinancialTable.jsx   # Department/Allocated/Actual/Variance/Utilization
    │       ├── AdminSummaryPanel.jsx# department list + status pills
    │       ├── FloatingAddButton.jsx# bottom-left "+" button
    │       └── AddEntryModal.jsx    # form opened by the "+" button
    └── pages/
        ├── auth/
        │   ├── Login.jsx         # standard finance-user login
        │   ├── Register.jsx
        │   └── AdminLogin.jsx    # isolated admin login (separate endpoint)
        ├── Dashboard.jsx         # composes header + chart + table + panels
        ├── Settings.jsx          # appearance (mode switch) + account info
        ├── Profile.jsx
        └── Messages.jsx
```

## 3. Getting started

```bash
cd finance-dashboard
npm install
cp .env.example .env      # point VITE_API_BASE_URL at your Spring Boot API
npm run dev
```

The app opens at `http://localhost:5173`. Because routes are protected,
you'll land on `/login` until a real login call succeeds — either point
`VITE_API_BASE_URL` at a running backend, or stub the endpoints below.

## 4. Expected Spring Boot API contract

The frontend calls these endpoints via `src/api/axiosClient.js`
(base URL from `VITE_API_BASE_URL`, JWT sent as `Authorization: Bearer …`):

| Method | Path                  | Purpose                                       |
|--------|-----------------------|------------------------------------------------|
| POST   | `/auth/login`         | Standard user login → `{ token, user }`         |
| POST   | `/auth/admin/login`   | Admin login (email, password, adminCode)        |
| POST   | `/auth/register`      | Create a department account                     |
| GET    | `/dashboard?period=&quarter=` | Chart data, summary, table rows, department statuses |
| POST   | `/budgets`            | Create a budget log entry                       |
| DELETE | `/budgets/:id`        | Remove a budget log entry                       |

If `/dashboard` isn't reachable yet, the UI falls back to
`src/data/mockData.js` so you can review the design without a backend.

## 5. Design notes

- **Floating, not boxed:** panels use soft background tints
  (`bg-graphite-100/70`, `dark:bg-graphite-800/30`) and hairline dividers
  instead of borders/shadows, matching the wireframe's un-boxed layout.
- **Color:** orange ("ember", `#F2600E`) is the single accent against a
  warm-gray light theme and a true `#000000` OLED dark theme — set in
  `tailwind.config.js` under `colors.ember` / `colors.graphite` / `colors.oled`.
- **Type:** Space Grotesk for headings/figures, IBM Plex Sans for body/UI —
  loaded in `index.html`.
- **Mode switch:** lives in Settings (`ModeSwitch.jsx`), persisted to
  `localStorage` and toggled via a `dark` class on `<html>`
  (see `ThemeContext.jsx`).
