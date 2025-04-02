const swaggerAutogen = require('swagger-autogen')();


const doc = {
    info: {
        titles: 'Match Maker Api',
        description: 'Connect and Match Api'
    },
    host: 'p2-crud.onrender.com',
    schemes: ['https', 'http']
};

const outputFile = 'swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);


