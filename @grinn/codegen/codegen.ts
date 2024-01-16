import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "../../data/schema.graphql",
  hooks: {
    afterAllFileWrite: ["node addToPersistedOperations.js"],
  },
  generates: {
    // the queries for the site. Will be used with apollo
    "../../apps/site/graphql/index.ts": {
      documents: [
        "../../apps/site/graphql/**/*.graphql",
        "../../apps/site/components/**/*.graphql",
        "../../apps/site/app/**/*.graphql",
      ],
      plugins: [
        {
          add: {
            content: "// @ts-nocheck",
          },
        },
        "typescript",
        "typescript-operations", // "typescript-graphql-request",
        "typescript-generic-sdk",
      ],
    },
    "persisted-query-ids/client.json": {
      documents: [
        "../../apps/site/graphql/**/*.graphql",
        "../../apps/site/components/**/*.graphql",
        "../../apps/site/app/**/*.graphql",
      ],
      plugins: [
        {
          "graphql-codegen-persisted-query-ids": {
            output: "client",
            algorithm: "sha256",
          },
        },
      ],
    },
    "persisted-query-ids/server.json": {
      documents: [
        "../../apps/site/graphql/**/*.graphql",
        "../../apps/site/components/**/*.graphql",
        "../../apps/site/app/**/*.graphql",
      ],
      plugins: [
        {
          "graphql-codegen-persisted-query-ids": {
            output: "server",
            algorithm: "sha256",
          },
        },
      ],
    },
  },
};

export default config;
