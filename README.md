# Arya's Petals

A full-stack flower-store web application with a customer-facing storefront and an administrative portal for store inventory and orders.

## Features

- Separate customer and admin React applications
- Node.js and Express REST API
- MongoDB persistence through Mongoose
- Admin authentication using bcrypt password hashing and JWT
- Optional Cloudinary integration for image hosting
- Environment-based configuration for database URI, secrets, and frontend API URLs

> Feature note: Confirm individual customer/cart/order capabilities against the current code before treating this list as a production feature checklist.

## Technology stack

- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB with Mongoose
- **Authentication:** bcryptjs and JSON Web Tokens
- **Image hosting:** Cloudinary (optional)
- **Development environment:** Windows, PowerShell, npm

## Project structure

```text
aryas-petals/
├── server/       # Express API, Mongoose models, controllers, middleware
├── client/       # Customer-facing React app
└── admin/        # Admin portal React app
```

## Prerequisites

- Node.js and npm installed
- A MongoDB Atlas cluster, or a local MongoDB Community Server
- Git
- A modern browser

## Environment configuration

Create separate `.env` files in `server/`, `client/`, and `admin/`. Do not commit real environment files or share their contents.

### `server/.env`

```dotenv
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-host>/arya_blooms?retryWrites=true&w=majority
JWT_SECRET=<generate-a-unique-random-secret>
ADMIN_EMAIL=<initial-admin-email>
ADMIN_PASSWORD=<strong-unique-password>
CLIENT_URL=http://localhost:5173
ADMIN_URL=http://localhost:5174
# Optional Cloudinary configuration:
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

For a local MongoDB service, the URI can be:

```dotenv
MONGO_URI=mongodb://127.0.0.1:27017/arya_blooms
```

Generate a JWT secret locally in PowerShell:

```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"
```

Use the actual Atlas URI supplied by Atlas. URL-encode reserved characters in the username/password components when required. Never put real credentials in this README.

### `client/.env` and `admin/.env`

```dotenv
VITE_API_URL=http://localhost:5000/api
```

Vite exposes variables prefixed with `VITE_` to browser code. **Never put secrets in frontend environment variables.**

## Install dependencies

Run the install command separately in each app directory:

```powershell
cd server
npm.cmd install

cd ..\client
npm.cmd install

cd ..\admin
npm.cmd install
```

## Run locally

Open three separate PowerShell terminals.

**Terminal 1 — API server**

```powershell
cd server
npm.cmd run dev
```

The API is expected to listen on `http://localhost:5000`.

**Terminal 2 — customer app**

```powershell
cd client
npm.cmd run dev
```

Vite normally serves the customer app at `http://localhost:5173`.

**Terminal 3 — admin portal**

```powershell
cd admin
npm.cmd run dev
```

Vite normally serves the admin portal at `http://localhost:5174`.

Use the exact URLs printed by Vite if the ports differ.

## Admin account notes

- The initial admin configuration is read from `ADMIN_EMAIL` and `ADMIN_PASSWORD` during account bootstrap.
- Changing these environment variables does not automatically change an existing MongoDB admin document.
- The project stores a password hash and verifies submitted passwords through the model's password-comparison method.
- If you need to recover an existing admin account, use a controlled, local administrative reset procedure. Do not expose reset functionality publicly or commit temporary reset scripts.
- Do not run the seed script against a database containing data unless you have verified its behavior and backed up data; the current project seed script may delete existing records before reseeding.

## Troubleshooting

### MongoDB connection refused at `127.0.0.1:27017`

The backend is trying to use a local MongoDB service. Check `server/.env`, verify `MONGO_URI`, and confirm the intended database service is reachable. For Atlas, check the cluster URI and Network Access IP allowlist.

### Admin login returns 401

Confirm the email exists in the connected database and use the password associated with that account. `ADMIN_EMAIL` and `ADMIN_PASSWORD` are not guaranteed to overwrite an existing account.

### Frontend returns HTTP 500

Inspect the backend terminal first. Database connection failures can cause database-backed API operations to time out.

### Tailwind/PostCSS plugin error

The project was configured for Tailwind CSS 3. Keep the Tailwind/PostCSS versions and configuration compatible. Avoid running `npm audit fix --force` blindly; major upgrades can break Vite plugins and CSS configuration.

### PowerShell blocks `npm.ps1`

Use `npm.cmd` commands in PowerShell instead of changing the execution policy unnecessarily.

## Security

- `.env` files must remain untracked.
- Keep `.env.example` files limited to variable names and safe placeholders.
- Use a unique, strong `JWT_SECRET`; do not rely on hard-coded fallback secrets.
- Use a least-privilege MongoDB database user and restrict Atlas Network Access to trusted IP addresses.
- Do not commit credentials, tokens, connection strings, or admin passwords.
- Review `npm audit` in each of `server/`, `client/`, and `admin/`, and test the application after dependency updates.

## Validation status

This README describes the repository setup based on the project configuration reviewed during development. A live production deployment, full end-to-end test suite, and current zero-vulnerability status are **not claimed** here. Run the app locally and verify the flows before release.

## License

Add the license applicable to this project before public distribution.
