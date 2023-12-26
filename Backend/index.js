require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const mysqlDB = require("./connections/mysql").sequelize;

const utilizadoresRoutes = require("./routes/utilizadores");
const cursosRoutes = require("./routes/cursos");
const cantinaRoutes = require("./routes/cantina");

app.use(express.json());
app.use("/utilizadores", utilizadoresRoutes);
app.use("/cursos", cursosRoutes);
app.use("/cantina", cantinaRoutes);

app.get("/", (req, res) => {
  res.send("Hubersity API");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  mysqlDB
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch((err) => {
      console.error("Unable to connect to the database:", err);
    });
});
