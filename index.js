// implement your API here
const express = require("express");

const postsRouter = require("./data/posts-router");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send("Hello World");
});

server.use("/api/posts", postsRouter);

server.listen(8000, () => console.log("API running on port 8000"));
