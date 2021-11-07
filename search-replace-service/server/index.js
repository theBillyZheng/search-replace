const express = require("express");
const file = require('./routes/fileApi');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/file", file);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});