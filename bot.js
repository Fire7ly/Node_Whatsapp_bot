// import system modules
const package = require('./package.json');
const axios = require('axios');
const fetch  = require('node-fetch');

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
    } else if (content === '!help') {
        message.reply(`
_Help section of ${ OWNER }\`s Whatsapp Bot!_
*Aviliable commands are*
*!alive* - 🏃‍♀️ _Show status of bot_
*!help* - 🙋‍♂️ _Show this menu of bot_
*!joke* - 🙃 _Send random jokes_
*!quote* - 📋 _Send quote in chat_
        `);
        console.log(`${ chat.name }`, 'request for', `${ content }`);
        // set stats command response
    } else if (content === "!joke") {
        const joke = await axios("https://v2.jokeapi.dev/joke/Any?safe-mode")
            .then(res => res.data)
        const jokeMsg = await client.sendMessage(message.from, joke.setup || joke.joke)
        if (joke.delivery) setTimeout(function () { jokeMsg.reply(joke.delivery) }, 5000)
        console.log(`${ chat.name }`, 'request for', `${ content }`);
    } else if (message.body === '!quote') {
        const apiData = await fetch('https://type.fit/api/quotes')
        const JsonData = await apiData.json();
        message.reply(`*${ JsonData[Math.floor(Math.random() * JsonData.length)].text }*`)
        console.log(`${ chat.name }`, 'request for', `${ content }`);
    }
});

client.initialize();
 