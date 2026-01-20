import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import boundaries from 'eslint-plugin-boundaries'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', 'coverage', '**/index.ts']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser
    },
    plugins: { boundaries },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true
        }
      },
      'boundaries/elements': [
        { type: 'shared', pattern: 'src/shared/**', mode: 'full' },
        { type: 'main', pattern: 'src/main/**', mode: 'full' },
        {
          type: 'module-public',
          pattern: 'src/modules/*/public/**',
          capture: ['moduleName'],
          mode: 'full'
        },
        {
          type: 'module-private',
          pattern: 'src/modules/*/**',
          capture: ['moduleName'],
          mode: 'full'
        }
      ]
    },
    rules: {
      'boundaries/element-types': [
        'error',
        {
          default: 'disallow',
          rules: [
            {
              from: 'shared',
              allow: ['shared']
            },
            {
              from: 'main',
              allow: ['shared', 'main', 'module-public', 'module-private']
            },
            {
              from: 'module-public',
              allow: [
                'shared',
                ['module-private', { moduleName: '${from.moduleName}' }]
              ]
            },
            {
              from: 'module-private',
              allow: [
                'shared',
                'module-public',
                ['module-private', { moduleName: '${from.moduleName}' }]
              ]
            }
          ]
        }
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_'
        }
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'separate-type-imports'
        }
      ]
    }
  }
])
