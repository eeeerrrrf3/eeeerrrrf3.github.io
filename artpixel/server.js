const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let currentDrawingData = null;

wss.on('connection', (ws) => {
    if (currentDrawingData) {
        ws.send(JSON.stringify({ type: 'DRAW', data: currentDrawingData }));
    }

    ws.on('message', (message) => {
        const data = JSON.parse(message);
        if (data.type === 'DRAW') {
            currentDrawingData = data.data;
            wss.clients.forEach(client => {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(data));
                }
            });
        }
    });
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
