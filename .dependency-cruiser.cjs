/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  extends: [],
  forbidden: [
    {
      name: 'no-modules-to-legacy-root',
      comment: 'New modules (src/modules/*) MUST NOT import from Legacy Root (src/domain, src/application, src/infra, src/presentation)',
      severity: 'error',
      from: {
        path: '^src/modules/'
      },
      to: {
        path: '^src/(domain|application|infra|presentation)/'
      }
    },
    {
      name: 'no-shared-to-modules',
      comment: 'src/shared MUST NOT import from src/modules/*',
      severity: 'error',
      from: {
        path: '^src/shared/'
      },
      to: {
        path: '^src/modules/'
      }
    },
    {
      name: 'no-domain-to-outer-layers',
      comment: 'Domain layer cannot import from Application, Infra, or Presentation (Clean Architecture)',
      severity: 'error',
      from: {
        path: '^src/(shared/)?domain/'
      },
      to: {
        path: '^src/(shared/)?(application|infra|presentation)/'
      }
    },
    {
      name: 'no-application-to-outer-layers',
      comment: 'Application layer cannot import from Infra or Presentation (Clean Architecture)',
      severity: 'error',
      from: {
        path: '^src/(shared/)?application/'
      },
      to: {
        path: '^src/(shared/)?(infra|presentation)/'
      }
    },
    {
      name: 'no-cross-module-internals',
      comment: 'Modules cannot import internal files from other modules (use barrel exports only)',
      severity: 'error',
      from: {
        path: '^src/modules/([^/]+)/'
      },
      to: {
        path: '^src/modules/([^/]+)/',
        pathNot: [
          '^src/modules/$1/',
          '^src/modules/[^/]+/index\\.ts$'
        ]
      }
    }
  ],
  allowed: [
    {
      from: {},
      to: {}
    }
  ],
  options: {
    doNotFollow: {
      path: 'node_modules'
    },
    tsPreCompilationDeps: true,
    tsConfig: {
      fileName: './tsconfig.app.json'
    },
    enhancedResolveOptions: {
      exportsFields: ['exports'],
      conditionNames: ['import', 'require', 'node', 'default']
    },
    reporterOptions: {
      dot: {
        collapsePattern: 'node_modules/(@[^/]+/[^/]+|[^/]+)'
      },
      archi: {
        collapsePattern: '^(node_modules|packages|src|lib|app|test|spec)/[^/]+'
      }
    }
  }
}
