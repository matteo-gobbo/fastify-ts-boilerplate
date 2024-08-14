import { buildServer } from "./infrastructure/server";

async function run() {
  const server = await buildServer();

  try {
    await server.listen({
      port: parseInt(process.env.PORT!, 10),
      host: process.env.ADDRESS,
    });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

run();
