import swaggerJsdoc from 'swagger-jsdoc';

const port = process.env.SERVICE_PORT || 3000;
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "GatherSG Control Panel API",
      version: "1.0.0",
      description: "API documentation",
    },
    servers: [
      {
        url: `http://localhost:${port}/api`,
      }
    ],
  },
  apis: ["./routes/*.js"], // Path to your API route files
};

const specs = swaggerJsdoc(options);
export default specs;