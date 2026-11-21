import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

// Local dev only: runs the same /api/*.ts handlers that Vercel runs in production.
// Secrets come from .env.local (never committed) — nothing is hardcoded here.
function localApi(): Plugin {
  return {
    name: 'learnloop-local-api',
    configureServer(server) {
      Object.assign(process.env, loadEnv('development', process.cwd(), ''));
      server.middlewares.use(async (req, res, next) => {
        const url = req.url?.split('?')[0] || '';
        if (!url.startsWith('/api/')) return next();
        const name = url.replace('/api/', '').replace(/[^a-z-]/g, '');
        try {
          let raw = '';
          for await (const chunk of req) {
            raw += chunk;
            if (raw.length > 4 * 1024 * 1024) throw new Error('Payload too large');
          }
          const mod = await server.ssrLoadModule(`/api/${name}.ts`);
          const out = {
            status(c: number) { res.statusCode = c; return out; },
            json(d: unknown) { res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(d)); }
          };
          await mod.default({ method: req.method, body: raw ? JSON.parse(raw) : {} }, out);
        } catch (e: any) {
          res.statusCode = 404;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: e.message }));
        }
      });
    }
  };
}

export default defineConfig({ plugins: [react(), localApi()] });
