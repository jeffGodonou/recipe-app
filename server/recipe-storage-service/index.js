const express = require('express');
const bodyParser = require('body-parser');
const recipesRouter = require('./routes/recipes');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(bodyParser.json());
app.use('/api/recipes', recipesRouter);

app.listen(PORT, () => {
    console.log(`Recipe storage service is running on port ${PORT}`);
});
