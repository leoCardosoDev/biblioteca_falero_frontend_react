import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'node',
    restoreMocks: true,
    setupFiles: ['./tests/setup.ts'],
    include: ['**/*.spec.{ts,tsx}'],
    exclude: [
      'node_modules/**',
      'dist/**',
      'tests/e2e/**',
      '**/*.test.{ts,tsx}'
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
