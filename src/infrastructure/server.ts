import fastify from "fastify";
import fastifyEnv from "@fastify/env";
import fastifyAutoload from "@fastify/autoload";
import { join } from "path";

const schema = {
  type: "object",
  required: ["PORT", "ADDRESS"],
  properties: {
    PORT: {
      type: "string",
    },
    ADDRESS: {
      type: "string",
    },
  },
};

async function buildServer() {
  const app = fastify({
    logger: true,
  });

  await app.register(fastifyEnv, { dotenv: true, schema });

  app.register(fastifyAutoload, {
    dir: join(__dirname, "services"),
  });
  app.register(fastifyAutoload, {
    dir: join(__dirname, "http/routes"),
    options: { prefix: "/api" },
  });

  app.ready().then(() => {
    app.log.info(app.printRoutes());
  });

  return app;
}

export { buildServer };
