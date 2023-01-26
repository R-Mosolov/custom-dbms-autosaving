const http = require('node:http');
const exec = require('child_process').exec;
const { v4: uuidv4 } = require("uuid");
const Docs = require("./dbms/Docs");

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World!\n');
});

setInterval(() => {
  const docs = new Docs();
  docs.create("test-db", {
    id: uuidv4(),
    firstName: "Test",
    email: "test@mail.ru",
  });
  exec(
    "git add . && git commit -m \"Create copy of databases\" && git push",
    function(err, stdout, stderr) {
    if (err) {
      console.log(err);
    }
    console.log(stdout);
  });
  return console.log("The setInterval is finished");
}, 5000);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});