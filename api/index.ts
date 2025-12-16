import express, { type Request, Response } from "express";
import { registerRoutes } from "../server/routes";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Helper to handle the async registration and request processing
const handler = async (req: Request, res: Response) => {
    // We need to await registerRoutes to ensure the server is set up
    // There is no need to cache the server instance in a serverless context 
    // as the "warm" instance behavior is handled by the platform.
    // However, purely for safety against multiple registrations if the container works differently:
    // We can attach it to the app or a global variable.
    // Given registerRoutes creates a new HTTP server (which we ignore) and modifies app, we should be careful.

    // Actually, registerRoutes modifies the app instance passed to it.
    // If we reuse 'app' across requests in a warm container, we might re-register routes which Express warns about or duplicates.
    // But Express router stack just grows.

    // Solution: Lazily register once.
    if (!app._router) {
        // This check is insufficient as app is initialized.
        // Better check:
    }

    // Simplified approach ensuring 'registerRoutes' is idempotent or we check a flag.
    // Since we can't easily modify 'server/routes.ts' to be idempotent without editing it.
    // Let's use a global flag here.

    await registerRoutes(app);

    // Forward request to app
    app(req, res);
};

// Start-up once optimization
let routesRegistered = false;

export default async function (req: Request, res: Response) {
    if (!routesRegistered) {
        await registerRoutes(app);
        routesRegistered = true;
    }

    // Vercel might strip the /api prefix when using rewrites to a function in api/
    // Ensure the URL passed to Express matches what we defined in routes.ts
    if (req.url && !req.url.startsWith('/api')) {
        req.url = '/api' + req.url;
    }

    app(req, res);
}
