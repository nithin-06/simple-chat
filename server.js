const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Define the base directory where your static files are located
const baseDir = path.join(__dirname, 'public');

// Serve static files from the public directory
app.use(express.static(baseDir));

// Serve the chat page after successful registration
app.get('/index.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve the registration page from the root directory
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'reg.html'));
});



// WebSocket connection
wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    // Check if message is a Blob
    if (message instanceof Buffer) {
      // Convert the Buffer to a string
      message = message.toString('utf-8');
    }

    // Broadcast the message to all connected clients
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// Middleware to prevent directory traversal
app.use((req, res, next) => {
  const requestedPath = path.resolve(baseDir, req.url.slice(1));
  if (!requestedPath.startsWith(baseDir)) {
    return res.status(403).send('Forbidden');
  }
  next();
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});