import { FlatCompat } from '@eslint/eslintrc'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname
})

const eslintConfig = [
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts'
    ]
  },
  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript'],
    plugins: ['react', '@typescript-eslint', 'simple-import-sort'],
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/require-default-props': 'off',
      'react/jsx-filename-extension': [
        1,
        { extensions: ['.js', '.jsx', '.ts', '.tsx'] }
      ],
      'react-hooks/exhaustive-deps': 'warn',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-var': 'error',
      'spaced-comment': ['warn', 'always'],
      'prefer-const': 'error',
      'no-invalid-this': 'off',
      'default-case': 'error',
      'react/no-unknown-property': ['error', { ignore: ['jsx', 'global'] }],
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',
      '@typescript-eslint/consistent-type-imports': 'warn',
      curly: ['error', 'all'],
      'no-magic-numbers': [
        'warn',
        { ignore: [0, 1], ignoreArrayIndexes: true, enforceConst: true }
      ]
    },
    overrides: [
      {
        files: ['**/*.js', '**/*.ts', '**/*.tsx'],
        rules: {
          'simple-import-sort/imports': [
            'warn',
            {
              groups: [
                // 1. React core
                ['^react$', '^react-dom$'],
                // 2. Next.js core
                ['next', '^next$', '^next/', '^next-auth', '^next-intl'],
                // 3. Third-party libraries
                ['^@?\\w'],
                // 4. Internal aliases
                [
                  '^@/providers',
                  '^@/auth',
                  '^@/components/ui',
                  '^@/components',
                  '^@/hooks',
                  '^@/i18n',
                  '^@/lib/definitions',
                  '^@/lib/client',
                  '^@/lib/utils'
                ],
                // 5. Relative imports
                ['^\\.\\./'],
                ['^\\.'],
                // 6. Styles last
                ['^@/styles']
              ]
            }
          ]
        }
      },
      {
        files: ['store/slices/**/*.ts'],
        rules: { 'no-param-reassign': ['error', { props: false }] }
      }
    ]
  })
]

export default eslintConfig
