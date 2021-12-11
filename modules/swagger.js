const swaggerJsDoc = require('swagger-jsdoc');

const optionsSwagger = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ONG - Somos Más',
      description: '',
      version: '1.0.0'
    },
    servers: [
      { url: 'http://localhost:3000' }
    ],
  },
  apis: ['./routes/*.js'],
};

const specs = swaggerJsDoc(optionsSwagger);

module.exports = specs;
