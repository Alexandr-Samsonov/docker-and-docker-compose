const express = require("express");
const mongoose = require("mongoose");
const axios = require('axios');
const { connectDb } = require('./helpers/db');
const { port, host, db, authApiUrl } = require('./configuration');


const app = express();

const postSchema = new mongoose.Schema({
    name: String
});

const Post = mongoose.model('Post', postSchema);

const startServer = () => {
    app.listen(port, () => {
        console.log(`Started api service on port ${port}`);
        console.log(`On host ${host}`);
        console.log(`Our database ${db}`);

        // Post.find(function(err, posts) {
        //     if (err) return console.log(err);
        //     console.log(posts);
        // })

        const silence = new Post({ name: "Silence" });
        silence.save(function(err, savedSilence) {
            if (err) return console.error(err);
            console.log("savedSilence", savedSilence);
        });

    });
}

app.get('/test', (req, res) => {
    res.send('Our api server is working correctly');
});

app.get('/api/test-api-data', (req, res) => {
    res.json({
        testWithApi: true,
    });
});

app.get('/test-with-current-user', async (req, res) => {
    // axios.get(authApiUrl + '/currentUser')
    //     .then(response => {
    //         res.json({
    //             testWithCurrentUser: true,
    //             currentUserFromAuth: response.data,
    //         });
    //     });

    const response = await axios.get(authApiUrl + '/currentUser');
    res.json({
        testWithCurrentUser: true,
        currentUserFromAuth: response.data,
    });
});

connectDb()
    .on('error', console.log)
    .on('disconnected', connectDb)
    .on('open', startServer)
