import fastify from "fastify";
import fastifyEnv from "@fastify/env";

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

  app.get("/", () => {
    return { hello: "world" };
  });

  return app;
}

export { buildServer };
