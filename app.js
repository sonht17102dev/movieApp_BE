const express = require("express");

const app = express();
const apiRoutes = require("./routes/movie");

app.use("/api", apiRoutes);

app.listen(3000);
