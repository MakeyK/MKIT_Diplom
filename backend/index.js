const express = require("express");
require("dotenv").config();
const sequelize = require("./db");
const models = require('./models/models');
const cors = require('cors');
const routes_createDB = require('./routers/index');
const http = require('http');
const crypto = require('crypto');

const HOST = process.env.HOST;
const PORT = process.env.PORT;
const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

function generateETag(data) {
    return crypto.createHash('md5').update(data).digest('hex');
}

app.use((req, res, next) => {
    const originalSend = res.send;
    res.send = function (body) {
        const generatedEtag = generateETag(body); 
        const lastModified = new Date().toUTCString(); 
        res.setHeader('ETag', generatedEtag);
        res.setHeader('Cache-Control', 'public, max-age=86400');
        if (req.headers['if-none-match'] === generatedEtag || req.headers['if-modified-since'] === lastModified) {
            return res.status(304).end();
        }
        originalSend.call(this, body);
    };
    next();
});

app.use('/api', routes_createDB);

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        server.listen(PORT, HOST, () => console.log(`Сервер работает на ${HOST}:${PORT}`));
    } catch (e) {
        console.log(e);
    }
};

start();