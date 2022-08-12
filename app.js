const fetch = require('node-fetch');
const express = require('express');
const getVideoId = require('./utils/getVideoId');
require('dotenv').config();
const app = express();

const PORT = process.env.PORT || 3000

// MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');


// ROUTES
app.get('/', (req, res) => {
    res.render('index', { success: undefined, message: '' });
});

app.post('/', async (req, res) => {
    const url = await req.body.videoUrl;
    const videoId = await getVideoId(url);

    if (videoId === undefined || videoId === "" || videoId === null) {
        return res.render('index', { success: false, message: 'Please enter a video url.' });
    } else {
        const fetchAPI = await fetch(`https://youtube-mp36.p.rapidapi.com/dl?id=${videoId}`, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': process.env.API_KEY,
                'X-RapidAPI-Host': process.env.API_HOST
            }
        });

        const response = await fetchAPI.json();

        if (response.status === 'ok') {
            return res.render('index', { success: true, song_link: response.link, song_title: response.title });
        } else {
            return res.render('index', { success: false, message: response.msg });
        }
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});