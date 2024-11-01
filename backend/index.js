const express = require("express");
const cors = require("cors");
const sequelize = require('./config/database');
const superheroRoutes = require('./routes/superheroRoutes');
const path = require('path');

const app = express();

app.use(express.json())
app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api', superheroRoutes)

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});