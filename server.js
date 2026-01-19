
const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer((req, res) => {
    // Simple health check endpoint
    if (req.url === '/health') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'ok' }));
        return;
    }
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Run Arena Socket Server');
});

const io = new Server(server, {
    cors: {
        origin: '*', // Allow all origins for Vercel frontend
        methods: ['GET', 'POST'],
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

// Use PORT environment variable (Fly.io sets this automatically)
const PORT = process.env.PORT || 3000;

// Fly.io requires binding to 0.0.0.0
server.listen(PORT, '0.0.0.0', () => {
    console.log(`🎮 Run Arena Socket Server running on port ${PORT}`);
});
