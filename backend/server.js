const app = require('./config/express');
const mongoose = require('./config/mongoose');

const PORT = process.env.PORT || 3000;

mongoose.start();

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));