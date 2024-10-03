import express from "express";
const app = express();

app.use(express.json());

app.post("/", (req, res) => {
  console.log(req);

  res.json({ message: "Data received", data: req.body });
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(5100, () => {
  console.log("server running....");
});
