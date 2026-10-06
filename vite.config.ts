import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  // Inject loaded env variables into process.env for local serverless emulation
  Object.assign(process.env, env)

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'local-api-server',
        configureServer(server) {
          server.middlewares.use('/api/chat', async (req, res) => {
            try {
              const { default: handler } = await import('./api/chat.ts')
              await handler(req, res)
            } catch (err) {
              console.error('Local /api/chat error:', err)
              res.statusCode = 500
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ error: 'Internal server error in dev mode' }))
            }
          })
        },
      },
    ],
  }
})
