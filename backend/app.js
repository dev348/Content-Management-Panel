const express = require('express')
var mongoose = require('mongoose');
const app = express()
const port = 8000
const cors = require('cors')
const dotenv = require('dotenv');

dotenv.config();

const mongoUri = process.env.MONGODB_URI;


mongoose.connect(mongoUri).then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.use(cors());
app.use(express.json());

app.use(require("./routes/post"));

app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
})

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  });

  
process.on('SIGINT', async function () {
    await mongoose.disconnect();
    process.exit(0)
});