const Hapi = require("@hapi/hapi");
const path = require("path");
const fs = require("fs");

let serverPromise;

async function createServer() {
  const server = Hapi.server({
    routes: { cors: true },
  });

  const routes = [];
  const routesPath = path.join(__dirname, "..", "routes");

  const routeFiles = fs
    .readdirSync(routesPath)
    .filter((file) => file.endsWith(".js"));

  routeFiles.forEach((file) => {
    const filePath = path.join(routesPath, file);
    const fileRoutes = require(filePath);
    routes.push(...fileRoutes);
  });

  server.route(routes);

  await server.initialize();

  return server;
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";

    req.on("data", (chunk) => {
      data += chunk;
    });

    req.on("end", () => {
      resolve(data || undefined);
    });

    req.on("error", reject);
  });
}

module.exports = async function handler(req, res) {
  try {
    const server = await (serverPromise || (serverPromise = createServer()));

    let payload;

    if (req.method !== "GET" && req.method !== "HEAD") {
      if (req.body) {
        payload =
          typeof req.body === "string" ? req.body : JSON.stringify(req.body);
      } else {
        payload = await readBody(req);
      }
    }

    const response = await server.inject({
      method: req.method,
      url: req.url,
      headers: req.headers,
      payload,
    });

    res.statusCode = response.statusCode;

    Object.entries(response.headers).forEach(([key, value]) => {
      res.setHeader(key, value);
    });

    res.end(response.payload);
  } catch (error) {
    res.statusCode = 500;
    res.end(JSON.stringify({ error: error.message }));
  }
};