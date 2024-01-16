import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: '../../data/schema.graphql',
  hooks: {
    afterAllFileWrite: ['node addToPersistedOperations.js'],
  },
  generates: {
    // the queries for the site. Will be used with apollo
    '../../apps/site/graphql/index.ts': {
      documents: [
        '../../apps/site/graphql/**/*.graphql',
        '../../apps/site/components/**/*.graphql',
        '../../apps/site/app/**/*.graphql',
      ],
      plugins: [
        {
          add: {
            content: '// @ts-nocheck',
          },
        },
        'typescript',
        'typescript-operations', // "typescript-graphql-request",
        'typescript-generic-sdk',
      ],
    },
    'persisted-query-ids/client.json': {
      documents: [
        '../../apps/site/graphql/**/*.graphql',
        '../../apps/site/components/**/*.graphql',
        '../../apps/site/app/**/*.graphql',
        '../../apps/mobile/**/!(*.generated).graphql',
      ],
      plugins: [
        {
          'graphql-codegen-persisted-query-ids': {
            output: 'client',
            algorithm: 'sha256',
          },
        },
      ],
    },
    'persisted-query-ids/server.json': {
      documents: [
        '../../apps/site/graphql/**/*.graphql',
        '../../apps/site/components/**/*.graphql',
        '../../apps/site/app/**/*.graphql',
        '../../apps/mobile/**/!(*.generated).graphql',
      ],
      plugins: [
        {
          'graphql-codegen-persisted-query-ids': {
            output: 'server',
            algorithm: 'sha256',
          },
        },
      ],
    },
    '../../apps/mobile/graphql/types.ts': {
      documents: ['../../apps/mobile/**/!(*.generated).graphql'],
      plugins: ['typescript'],
    },
    '../../apps/mobile/': {
      documents: ['../../apps/mobile/**/!(*.generated).graphql'],
      preset: 'near-operation-file',
      presetConfig: {
        extension: '.generated.tsx',
        baseTypesPath: './graphql/types.ts',
      },
      plugins: ['typescript-operations', 'typescript-react-apollo'],
      config: { withHooks: true },
    },
  },
};

export default config;
