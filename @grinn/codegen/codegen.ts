import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "../../data/schema.graphql",
  documents: "./graphql/**/*.graphql",
  hooks: {
    afterAllFileWrite: [
      'tsup-node ./src/index.ts --dts --format="cjs" && echo "✅ Generated code successfully built"',
      "node addToPersistedOperations.js",
    ],
  },
  generates: {
    "./src/index.ts": {
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
      // config: { documentMode: "string" },
    },
    "../../apps/mobile/graphql/apollo-client.tsx": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
    },
    "persisted-query-ids/client.json": {
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
