# Portfolio Admin + PostgreSQL (no redeploy for content changes)

This package keeps the existing React portfolio and adds a Spring Boot API with PostgreSQL persistence. The Admin page edits one JSON document containing profile, about, experience, education, skills, projects and contact information. The profile photo is stored as a PostgreSQL BYTEA value. Public visitors read the latest record from `GET /api/portfolio`.

## Architecture
- React/Vite: existing portfolio plus `/admin` page.
- Spring Boot 3 / Java 17: REST API.
- PostgreSQL: latest portfolio JSON and latest profile photo.
- Netlify hosts the React static site. The API must be hosted separately.

Content/photo updates do not require a React or Netlify deployment. Changes to frontend code or backend code still require deployment.

## 1. Run PostgreSQL locally
Create a database:

```bash
createdb portfolio_db
```

If your local PostgreSQL requires a username/password, use the matching credentials in the environment variables below.

## 2. Run backend locally
Open Terminal in `my-portfolio/backend`:

```bash
export DATABASE_URL='jdbc:postgresql://localhost:5432/portfolio_db'
export DB_USERNAME='postgres'
export DB_PASSWORD='YOUR_POSTGRES_PASSWORD'
export ADMIN_PASSWORD='Choose-A-Long-Unique-Password'
export CORS_ORIGIN='http://localhost:5173'
./mvnw spring-boot:run
```

If Maven Wrapper (`mvnw`) is not included, use `mvn spring-boot:run` after installing Maven. The backend creates the two tables and inserts starter content from `src/main/resources/portfolio-seed.json` on first startup.

## 3. Run React frontend
Open a second Terminal in the project root (`my-portfolio`):

```bash
npm install
```

Create `.env.local` in the project root:

```env
VITE_API_URL=http://localhost:8080
```

Then run:

```bash
npm run dev
```

Open:
- Public portfolio: http://localhost:5173
- Admin: http://localhost:5173/admin

Login with the `ADMIN_PASSWORD` value set for the backend.

## 4. Admin usage
The editor uses a JSON document so all sections are editable without needing a database schema change for each field. Keep the JSON valid. Update the fields and click **Save latest changes**. Choose a new image to replace the existing photo. The latest version overwrites the single database record; the admin UI does not show old versions.

## 5. Deploy
1. Create a PostgreSQL database with a provider such as Supabase or Neon. Copy its PostgreSQL connection details.
2. Deploy `backend/` as a Java 17 Spring Boot service on a backend host. Set `DATABASE_URL`, `DB_USERNAME`, `DB_PASSWORD`, `ADMIN_PASSWORD`, and `CORS_ORIGIN` in the backend host's environment settings. `DATABASE_URL` must be a JDBC URL, for example `jdbc:postgresql://HOST:5432/DATABASE?sslmode=require`.
3. Deploy the React project root to Netlify. Set `VITE_API_URL` to the deployed backend base URL (no trailing slash), then trigger one frontend build.
4. After deployment, normal Admin content/photo saves go to PostgreSQL and do not trigger a Netlify build.

Free hosting/database plans have quotas, sleep/idle policies, connection limits and may change. A free backend host may sleep, causing the first API request to be slow. A free database does not guarantee a permanently awake backend or zero-cost production availability. Check each provider's current pricing/limits before launch. Keep database backups.

## Security before public production
This is a test-ready starter, not a fully hardened admin identity system. Before exposing it publicly, replace the simple shared-password bearer token with Spring Security + BCrypt + expiring JWT/session cookies, add rate limiting, restrict CORS to your exact Netlify domain, enforce HTTPS, validate image formats by inspecting file signatures, and configure database backups. Never commit passwords or database credentials. Do not use the default password.

## Troubleshooting
- `Connection refused`: PostgreSQL is not running or the JDBC host/port is wrong.
- `password authentication failed`: correct `DB_USERNAME` and `DB_PASSWORD`.
- Admin says portfolio is not initialized: check backend startup logs and that database schema initialization succeeded.
- Public site shows old content: confirm `VITE_API_URL` points to the deployed API and refresh the browser.
- First API call is slow: free backend hosting may have been sleeping.
