const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API',
            version: '1.0.0',
            description: 'API for the app',
        },
        
    },
    apis: ['./routes/*.js'],
}

const specs = swaggerJsDoc(options);
module.exports = {swaggerUi, specs}