const swaggerAutogen = require('swagger-autogen')();


const doc = {
    info: {
        title: 'Match Maker Api',
        description: 'Connect and Match Api',
    },
    host: 'localhost:9091',
    schemes: ['http', 'https']
};

const outputFile = 'swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);


