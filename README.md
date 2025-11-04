<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Yusr — Frontend README</title>
<style>
  :root{
    --royal-blue:#002E47;
    --royal-green:#2A4628;
    --ink:#0c1116;
    --paper:#ffffff;
    --muted:#5e6b74;
    --line:#e6edf3;
    --code-bg:#f6f8fa;
  }
  html,body{margin:0;padding:0;background:#f7fafc;color:var(--ink);font:16px/1.6 "Inter",system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,"Helvetica Neue",Arial,"Apple Color Emoji","Segoe UI Emoji";}
  .wrap{max-width:1000px;margin:48px auto;padding:0 20px;}
  .hero{
    background: linear-gradient(140deg, var(--royal-blue) 0%, var(--royal-green) 100%);
    color:#fff;border-radius:18px;padding:28px 28px 26px 28px;margin-bottom:28px;
    box-shadow:0 8px 24px rgba(0,0,0,.12);
  }
  .hero h1{margin:0 0 6px 0;font-size:32px;letter-spacing:.3px}
  .hero p{margin:4px 0 0 0;color:#e7eef5}

  h2{
    margin:28px 0 12px 0;
    color:var(--royal-green);
    font-size:22px;
    border-left:6px solid var(--royal-blue);
    padding-left:10px;
  }
  p{margin:10px 0}
  .card{
    background:var(--paper);border:1px solid var(--line);border-radius:14px;padding:18px;margin:14px 0;
    box-shadow:0 4px 12px rgba(0,0,0,.04);
  }
  table{width:100%;border-collapse:separate;border-spacing:0;overflow:hidden;border-radius:12px;border:1px solid var(--line);background:var(--paper)}
  thead th{
    background: linear-gradient(120deg, rgba(0,46,71,.12), rgba(42,70,40,.12));
    color:var(--royal-blue);text-align:left;font-weight:600;padding:12px 14px;border-bottom:1px solid var(--line);
  }
  tbody td{padding:12px 14px;border-bottom:1px solid var(--line);vertical-align:top}
  tbody tr:last-child td{border-bottom:none}
  code, pre code{font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,"Liberation Mono","Courier New",monospace}
  pre{background:var(--code-bg);border:1px solid var(--line);border-radius:12px;padding:14px;overflow:auto}
  .muted{color:var(--muted)}
  .kicker{color:#d7e4ea;letter-spacing:.12em;text-transform:uppercase;font-size:12px}
  .two-col{display:grid;grid-template-columns:1fr 1fr;gap:14px}
  @media (max-width:820px){.two-col{grid-template-columns:1fr}}
  .foot{
    margin:32px 0 60px 0;padding:16px 18px;border:1px solid var(--line);border-radius:12px;background:#fff;
    display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap
  }
  .chip{
    display:inline-block;padding:6px 10px;border-radius:999px;border:1px solid var(--line);background:#fff;font-size:12px;color:var(--royal-blue)
  }
</style>
</head>
<body>
  <div class="wrap">

    <section class="hero">
      <div class="kicker">Yusr • Frontend</div>
      <h1>Yusr — Frontend</h1>
      <p>Single-page React application that provides a unified interface for government services with secure authentication and a clean, minimal UI using the royal palette.</p>
    </section>

    <section class="card">
      <h2>Project Overview</h2>
      <p>
        Yusr Frontend is a SPA built with React + Vite. It integrates with the Yusr Backend to let users authenticate, browse agencies and services, create and track service requests, manage appointments, add/remove credit cards, and view/pay traffic fines — all in one place.
      </p>
    </section>

    <section class="card">
      <h2>Technologies Used</h2>
      <table>
        <thead>
          <tr><th>Category</th><th>Tools</th></tr>
        </thead>
        <tbody>
          <tr><td>Framework</td><td>React (Vite)</td></tr>
          <tr><td>Routing</td><td>React Router</td></tr>
          <tr><td>HTTP</td><td>Fetch API via <code>sendRequest.js</code></td></tr>
          <tr><td>State</td><td>React Hooks</td></tr>
          <tr><td>Styling</td><td>Custom CSS (royal blue / royal green)</td></tr>
          <tr><td>Auth</td><td>JWT stored in <code>localStorage</code></td></tr>
          <tr><td>Build/Dev</td><td>Vite scripts</td></tr>
        </tbody>
      </table>
    </section>

    <section class="card">
      <h2>App Functionality (User Stories)</h2>
      <table>
        <thead>
          <tr><th>User Story</th><th>Description</th></tr>
        </thead>
        <tbody>
          <tr><td>Sign up and log in</td><td>Create an account or log in securely using JWT authentication.</td></tr>
          <tr><td>Browse agencies</td><td>View all government agencies and their descriptions.</td></tr>
          <tr><td>View services</td><td>Explore services offered and inspect their details.</td></tr>
          <tr><td>Create service requests</td><td>Submit requests for specific services with dynamic payload.</td></tr>
          <tr><td>Track requests</td><td>Review the status and details for all submitted requests.</td></tr>
          <tr><td>Manage appointments</td><td>Schedule, view, update, and delete appointments.</td></tr>
          <tr><td>Manage credit cards</td><td>Add or remove saved credit cards from “My Account”.</td></tr>
          <tr><td>View and pay fines</td><td>List unpaid traffic fines and pay individually or all at once.</td></tr>
          <tr><td>Change password</td><td>Update account password securely.</td></tr>
        </tbody>
      </table>
    </section>

    <section class="card">
      <h2>App Pages</h2>
      <table>
        <thead>
          <tr><th>Page</th><th>Path</th><th>Description</th></tr>
        </thead>
        <tbody>
          <tr><td>Home</td><td><code>/</code></td><td>Landing page introducing Yusr.</td></tr>
          <tr><td>Login</td><td><code>/login</code></td><td>User login form.</td></tr>
          <tr><td>Signup</td><td><code>/signup</code></td><td>Create a new account.</td></tr>
          <tr><td>Services</td><td><code>/services</code></td><td>List of all available services.</td></tr>
          <tr><td>My Requests</td><td><code>/my-requests</code></td><td>Manage user service requests.</td></tr>
          <tr><td>My Account</td><td><code>/my-account</code></td><td>User profile and credit card management.</td></tr>
          <tr><td>Fines</td><td><code>/fines</code></td><td>View and pay traffic fines.</td></tr>
          <tr><td>Chat</td><td><code>/chat</code></td><td>Interactive assistant to guide service selection.</td></tr>
        </tbody>
      </table>
    </section>

    <section class="card">
      <h2>API Endpoints (Backend Integration)</h2>
      <div class="two-col">
        <table>
          <thead>
            <tr><th>Endpoint</th><th>Method</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>/users/signup/</code></td><td>POST</td><td>Register a new user</td></tr>
            <tr><td><code>/users/login/</code></td><td>POST</td><td>Login, receive JWT</td></tr>
            <tr><td><code>/users/token/refresh/</code></td><td>GET</td><td>Refresh token</td></tr>
            <tr><td><code>/agencies/</code></td><td>GET</td><td>List agencies</td></tr>
            <tr><td><code>/services/</code></td><td>GET</td><td>List services</td></tr>
            <tr><td><code>/services/&lt;id&gt;/</code></td><td>GET</td><td>Service details</td></tr>
            <tr><td><code>/service-requests/</code></td><td>GET</td><td>List my requests</td></tr>
            <tr><td><code>/service-requests/</code></td><td>POST</td><td>Create request</td></tr>
            <tr><td><code>/service-requests/&lt;id&gt;/</code></td><td>PUT</td><td>Update request</td></tr>
            <tr><td><code>/service-requests/&lt;id&gt;/</code></td><td>DELETE</td><td>Delete request</td></tr>
            <tr><td><code>/service-requests/&lt;id&gt;/pay/</code></td><td>POST</td><td>Pay a request</td></tr>
          </tbody>
        </table>

        <table>
          <thead>
            <tr><th>Endpoint</th><th>Method</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>/credit-card/</code></td><td>GET</td><td>Get saved credit cards</td></tr>
            <tr><td><code>/credit-card/</code></td><td>POST</td><td>Add a credit card</td></tr>
            <tr><td><code>/credit-card/</code></td><td>DELETE</td><td>Delete a credit card</td></tr>
            <tr><td><code>/my-fines/</code></td><td>GET</td><td>List unpaid fines</td></tr>
            <tr><td><code>/pay-fines/</code></td><td>POST</td><td>Pay one/all fines</td></tr>
          </tbody>
        </table>
      </div>
      <p class="muted">All requests must include a valid <code>Authorization: Bearer &lt;token&gt;</code> header after login.</p>
    </section>

    <section class="card">
      <h2>Setup Instructions</h2>
      <pre><code>cd frontend
npm install
npm run dev</code></pre>
      <p class="muted">Optional: create <code>.env</code> with <code>VITE_API_BASE_URL=http://127.0.0.1:8000</code></p>
    </section>

    <section class="card">
      <h2>Project Structure</h2>
      <pre><code>frontend/
├─ public/
├─ src/
│  ├─ components/
│  │  └─ Navbar/
│  ├─ pages/
│  │  ├─ ChatBotPage/
│  │  ├─ MyAccountPage/
│  │  ├─ MyRequestsPage/
│  │  ├─ FinesPage/
│  │  ├─ Auth/
│  │  └─ Home/
│  ├─ utilities/
│  │  ├─ sendRequest.js
│  │  ├─ users-api.js
│  │  ├─ users-service.js
│  │  ├─ serviceRequest-api.js
│  │  └─ creditCard-api.js
│  └─ styles/
└─ index.html</code></pre>
    </section>

    <section class="foot">
      <span class="chip">Royal Palette: #002E47 · #2A4628</span>
      <span class="muted">Developed by Lujain Al Sultan</span>
    </section>

  </div>
</body>
</html>
