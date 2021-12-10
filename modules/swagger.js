const swaggerJsDoc = require('swagger-jsdoc');

const optionsSwagger = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Ong Somos Mas',
      version: '1.0.0',
      description: 'Api for ong page'
    },
    servers: [
      { url: 'http://localhost:3000' }
    ]
  },
  apis: ['./routes/*.js']
};

const specs = swaggerJsDoc(optionsSwagger);

module.exports = specs;
