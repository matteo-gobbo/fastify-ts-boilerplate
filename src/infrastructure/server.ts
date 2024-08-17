import fastify from "fastify";
import fastifyEnv from "@fastify/env";
import fastifyAutoload from "@fastify/autoload";
import fastifySensible from "@fastify/sensible";
import { join } from "path";
import { errorHandler } from "./http/errors";
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

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

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  app.register(fastifySwagger, {
    openapi: {
      info: {
        title: "SampleApi",
        description: "Sample backend service",
        version: "1.0.0",
      },
      servers: [],
    },
    transform: jsonSchemaTransform,
    // You can also create transform with custom skiplist of endpoints that should not be included in the specification:
    //
    // transform: createJsonSchemaTransform({
    //   skipList: [ '/documentation/static/*' ]
    // })
  });

  app.register(fastifySwaggerUi, {
    routePrefix: "/documentation",
  });

  await app.after();

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
