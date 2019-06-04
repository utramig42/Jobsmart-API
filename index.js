const express = require("express");
const conn = require("./bd");
const app = express();

app.all("/*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get("/", (req, res) => {
  res.set({ "Content-Type": "application/JSON" });
  conn.query("SELECT * FROM produto", (err, rows, filds) => {
    res.json(rows);
  });
});

app.get("/:id", (req, res) => {
  res.set({ "Content-Type": "application/JSON" });
  conn.query(
    `SELECT * FROM produto WHERE id_prod = ${req.params.id} `,
    (err, rows, filds) => {
      res.json(rows);
    }
  );
});

// Initialize the app.
var server = app.listen(process.env.PORT || 8080, function() {
  var port = server.address().port;
  console.log("API rodando na porta", port);
});
