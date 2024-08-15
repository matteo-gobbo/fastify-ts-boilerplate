import fastify from "fastify";
import fastifyEnv from "@fastify/env";
import fastifyAutoload from "@fastify/autoload";
import fastifySensible from "@fastify/sensible";
import { join } from "path";
import { errorHandler } from "./http/errors";

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

  app.register(fastifySensible);

  app.register(fastifyAutoload, {
    dir: join(__dirname, "plugins"),
  });
  app.register(fastifyAutoload, {
    dir: join(__dirname, "services"),
  });
  app.register(fastifyAutoload, {
    dir: join(__dirname, "http/routes"),
    options: { prefix: "/api" },
  });

  app.setErrorHandler(errorHandler);

  return app;
}

export { buildServer };
