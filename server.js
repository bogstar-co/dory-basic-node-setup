const http = require("http");
const fs = require("fs");
const path = require("path");

const hostname = "localhost";
const port = 3000;

const server = http.createServer((req, res) => {
  //console.log(`${req.method} ${req.url}`);

  // Default route: if "/", serve index.html
  let filePath = req.url === "/" ? "/index.html" : req.url;
  filePath = "public" + filePath;
  console.log(filePath);

  // Determine content type
  const ext = path.extname(filePath).toLowerCase();
  let contentType = "text/html";
  if (ext === ".css") contentType = "text/css";
  else if (ext === ".js") contentType = "application/javascript";
  else if (ext === ".json") contentType = "application/json";
  else if (ext === ".png") contentType = "image/png";
  else if (ext === ".jpg" || ext === ".jpeg") contentType = "image/jpeg";

  fs.readFile(filePath, (err, content) => {
    if (err) {
      // Handle 404 or server error
      if (err.code === "ENOENT") {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404: File Not Found");
      } else {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf-8");
    }
  });
});

server.listen(port, hostname, () => {
  console.log(`✅ Server running at http://${hostname}:${port}/`);
});
