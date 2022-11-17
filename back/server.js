const express = require("express");
const router = require("./routers/appRouter");
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');


const app = express();
const port = 4000;

app.use(cors());
app.use(helmet());
app.use(morgan('combined'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use('/api', router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
