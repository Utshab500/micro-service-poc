import swaggerJsdoc from 'swagger-jsdoc';

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
        url: "http://localhost:3000/api",
      }
    ],
  },
  apis: ["./routes/*.js"], // Path to your API route files
};

const specs = swaggerJsdoc(options);
export default specs;