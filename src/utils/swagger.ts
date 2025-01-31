import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'URL API',
      version: '1.0.0',
      description: 'API for working with URLs'
    },
    servers: [
      {
        url: 'http://localhost:3000/v1'
      }
    ]
  },
  apis: ['./src/routes/**/*.ts']
};

const specs = swaggerJsdoc(options);

export default specs;