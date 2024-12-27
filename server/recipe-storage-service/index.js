const express = require('express');
const cors = require('cors');
// const bodyParser = require('body-parser');
const recipesRouter = require('./routes/recipes');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
// app.use(bodyParser.json());
app.use('/api/recipes', recipesRouter);

app.listen(PORT, () => {
    console.log(`Recipe storage service is running on port ${PORT}`);
});
