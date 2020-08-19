const express = require("express");
const mongoose = require("mongoose");
const axios = require('axios');
const { connectDb } = require('./helpers/db');
const { port, host, db, apiUrl } = require('./configuration');


const app = express();

const startServer = () => {
    app.listen(port, () => {
        console.log(`Started auth service on port ${port}`);
        console.log(`On host ${host}`);
        console.log(`Our database ${db}`);
    });
}

app.get('/test', (req, res) => {
    res.send('Our auth server is working correctly');
});

app.get('/test-with-api-data', async (req, res) => {
    // axios.get(apiUrl + '/test-api-data')
    //     .then(response => {
    //         res.json({
    //             testApiData: response.data.testWithApi
    //         });
    //     });
    const response = await axios.get(apiUrl + '/test-api-data');
    res.json({
        testApiData: response.data.testWithApi,
    });
});

app.get('/api/currentUser', (req, res) => {
    res.json({
        id: "1234",
        email: "foo@gmail.com",
    });
});

connectDb()
    .on('error', console.log)
    .on('disconnected', connectDb)
    .on('open', startServer)
