const express = require('express');
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
    res.render('index');
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});