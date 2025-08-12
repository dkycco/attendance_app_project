const { Client, LocalAuth } = require('whatsapp-web.js');
let ioInstance = null;
let lastStatus = { type: 'initializing', data: null };

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  },
});

function setIO(io) {
  ioInstance = io;
  io.on('connection', (socket) => {
    socket.emit('status', lastStatus);
  });
}

client.on('qr', qr => {
  lastStatus = { type: 'qr', data: qr };
  if (ioInstance) ioInstance.emit('status', lastStatus);
});

client.on('ready', () => {
  lastStatus = { type: 'ready', data: null };
  if (ioInstance) ioInstance.emit('status', lastStatus);
});

client.on('disconnected', reason => {
  lastStatus = { type: 'disconnected', data: reason };
  if (ioInstance) ioInstance.emit('status', lastStatus);
});

client.initialize();

module.exports = { client, setIO };
