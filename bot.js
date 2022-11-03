// import 3rd party modules from npm 
const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');




const client = new Client();

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
    console.log('QR SUCCESSFULLY RECEIVED');
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.initialize();
 