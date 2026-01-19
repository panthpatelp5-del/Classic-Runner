const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

// Serve static files from the current directory
app.use(express.static(__dirname));

const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

const players = {};

io.on('connection', (socket) => {
  console.log(`Player connected: ${socket.id}`);
  players[socket.id] = { id: socket.id };

  // Broadcast updated player list
  io.emit('update_players', players);

  // Handle model update
  socket.on('update_model', (url) => {
    socket.broadcast.emit('update_model', { id: socket.id, url });
  });

  // Handle position updates
  socket.on('update_position', (data) => {
    socket.broadcast.emit('update_position', data);
  });

  // Handle winner
  socket.on('winner', (id) => {
    io.emit('show_winner', id);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`Player disconnected: ${socket.id}`);
    delete players[socket.id];
    io.emit('update_players', players);
  });
});

const PORT = 3000;

// Listen on all network interfaces (0.0.0.0) to allow network access
server.listen(PORT, '0.0.0.0', () => {
  const os = require('os');
  const interfaces = os.networkInterfaces();
  let localIP = 'localhost';

  // Find the local network IP address
  for (let interfaceName in interfaces) {
    for (let iface of interfaces[interfaceName]) {
      // Skip internal (localhost) and non-IPv4 addresses
      if (iface.family === 'IPv4' && !iface.internal) {
        localIP = iface.address;
        break;
      }
    }
  }

  console.log('\n========================================');
  console.log('🎮 CLASSIC RUNNER SERVER STARTED');
  console.log('========================================');
  console.log(`\n✅ Local access:    http://localhost:${PORT}`);
  console.log(`✅ Network access:  http://${localIP}:${PORT}`);
  console.log('\n📱 Share the Network URL with other devices on your WiFi!');
  console.log('========================================\n');
});