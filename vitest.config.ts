import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    include: ['**/*.spec.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      exclude: [
        'node_modules/**',
        'dist/**',
        'tests/**',
        'src/application/protocols/**',
        'src/domain/contracts/**',
        'src/domain/models/**',
        'src/domain/usecases/**',
        'src/**/index.ts',
        // Mocked pages
        'src/presentation/react/pages/dashboard/**',
        'src/presentation/react/pages/books/**',
        'src/presentation/react/pages/loans/**',
        'src/presentation/react/pages/reports/**',
        'src/presentation/react/pages/reservations/**',
        'src/presentation/react/pages/settings/**',
        // Mocked factories
        'src/main/factories/pages/dashboard/**',
        'src/main/factories/pages/books/**',
        'src/main/factories/pages/loans/**',
        'src/main/factories/pages/reports/**',
        'src/main/factories/pages/reservations/**',
        'src/main/factories/pages/settings/**'
      ],
      thresholds: {
        lines: 100,
        functions: 100,
        branches: 100,
        statements: 100
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
