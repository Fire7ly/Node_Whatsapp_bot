// import system modules
const package = require('./package.json');


// import 3rd party modules from npm 
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');


// Define runtime veriables
const OWNER = package.author || "fire7ly"

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        ignoreDefaultArgs: ['--disable-extensions'],
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
    console.log('QR SUCCESSFULLY RECEIVED');
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', async message => {
    let chat = await message.getChat();
    const content = message.body

    // set alive command response
    if (content == '!alive') {
        message.reply(`
Hi I am ${ OWNER }\`s Whatsapp Bot 🤖
I can do some enterainment untill 
my owner get back online! You can 
check my abilites by *!help* command
        `);
        console.log(`${ chat.name }`, 'request for', `${ content }`);
    }
});

client.initialize();
 