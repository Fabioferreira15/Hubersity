require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const mysqlDB = require("./connections/mysql").sequelize;
const { swaggerUi, specs } = require("./swagger");

const utilizadoresRoutes = require("./routes/utilizadores");
const cursosRoutes = require("./routes/cursos");
const cantinaRoutes = require("./routes/cantina");
const barRoutes = require("./routes/bar");

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/utilizadores", utilizadoresRoutes);
app.use("/cursos", cursosRoutes);
app.use("/cantina", cantinaRoutes);
app.use("/bar", barRoutes);

app.get("/", (req, res) => {
  res.send("Hubersity API");
});

app.get('/test.cron', (req, res) => {
  res.send('Cron test');
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
