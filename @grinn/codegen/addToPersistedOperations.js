// addToPersistedOperations.js
const map = require("./persisted-query-ids/server.json");
const { promises: fsp } = require("fs");

async function main() {
  await Promise.all(
    Object.entries(map).map(([hash, query]) =>
      fsp.writeFile(`${__dirname}/.persisted_operations/${hash}.graphql`, query)
    )
  );
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
