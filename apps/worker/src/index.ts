import { run } from "graphile-worker";

const main = async () => {
  const runner = await run({
    connectionString: process.env.DATABASE_URL,
    concurrency: 5,
    noHandleSignals: false,
    pollInterval: 1000,
    crontabFile: `${__dirname}/../crontab`,
    taskDirectory: `${__dirname}/tasks`,
  });
  await runner.promise;
};
main().catch((error) => {
  console.log(error);
  process.exit(1);
});
