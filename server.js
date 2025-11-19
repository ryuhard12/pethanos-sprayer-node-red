const http = require("http");
const express = require("express");
const RED = require("node-red");

const app = express();

// Node-RED settings
const settings = {
    httpAdminRoot: "/",
    httpNodeRoot: "/api",
    userDir: "./",
    flowFile: "flows.json",
    functionGlobalContext: {}
};

// Create server
const server = http.createServer(app);

// Start Node-RED runtime
RED.init(server, settings);

// Admin UI (editor)
app.use(settings.httpAdminRoot, RED.httpAdmin);

// Node-RED HTTP nodes
app.use(settings.httpNodeRoot, RED.httpNode);

const PORT = process.env.PORT || 1880;

// Start server
server.listen(PORT, () => {
    console.log(`Node-RED running on port ${PORT}`);
});

// Start Node-RED engine
RED.start();
