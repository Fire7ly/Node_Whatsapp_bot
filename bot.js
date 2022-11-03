// import system modules
const package = require('./package.json');
const axios = require('axios');
const fetch = require('node-fetch');
require('dotenv').config()

// import 3rd party modules from npm 
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');


// Define runtime veriables
const OWNER = package.author || "fire7ly"
const weatherToken = process.env.WEATHER_API_TOKEN
const weatherURL = "https://api.openweathermap.org/data/2.5/weather"

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
*!cinfo* - ℹ️ _Show information of client_
*!ginfo* - ℹ️ _Send group information_
*!meme* - 🤣 _Send random memes_
*!weather* - 🌡️ _Send today weather info_
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
    } else if (message.body === '!cinfo') {
        let info = client.info;
        client.sendMessage(message.from, `
*Connection info*
*User name* : ${ info.pushname }
*My number* : ${ info.wid.user }
*Platform* : ${ info.platform }
    `);
    } else if (message.body === '!ginfo') {
        if (chat.isGroup) {
            message.reply(`
*Group Details*
*Name* : ${ chat.name }
*Description* : ${ chat.description }
*Created At* : ${ chat.createdAt.toString() }
*Participant count* : ${ chat.participants.length }
            `);
            console.log(`${ chat.name }`, 'request for', `${ content }`);
            // Created By: ${chat.owner.user}

        } else {
            message.reply('This command can only be used in a group!');
            console.log(`can\`t fullfill request for ${ content } by ${ chat.name } because of current chat is not a group`);
        }
    } else if (content === '!meme') {
        console.log(`${ chat.name }`, 'request for', `${ content }`);
        const meme = await axios("https://meme-api.herokuapp.com/gimme")
            .then(res => res.data)
        client.sendMessage(message.from, await MessageMedia.fromUrl(meme.url))
    } else if (content.startsWith("!weather")) {
        const city_name = message.body.replace("!weather ", "")
        message.delete(true)
        client.sendMessage(message.from, `please wait we are getting latest weather info`);
        console.log(`${ chat.name } request for weather`);
        if (city_name == null || city_name == '' || city_name == "!weather") {
            console.log(`There is no city name provided with weather command!`);
            message.reply(`opps! no city name provided! 
please provide city name
Example : !weather _*Delhi*_`)
        } else {
            const resp = await fetch(`${ weatherURL }?q=${ city_name }&appid=${ weatherToken }&units=metric`)
            const body = await resp.json()
            if (body.cod == '404' || body.cod == '401') {
                message.reply(`Error : ${ body.cod } 
*${ body.message }*`)
            } else {363
                console.log(`Successfully fetched weather for ${ city_name }`);
                message.reply(`*Description* : ${ body.weather[0].description } 
*City* : ${ body.name },${ body.sys.country }
*lon* : ${ body.coord.lon } | *lat*: ${ body.coord.lat }
*Temp* : ${ body.main.temp }°C
*Feels like* : ${ body.main.feels_like }°C
*Pressure* : ⬇
*Sea* : ${ body.main.sea_level } hPa | *Ground* : ${ body.main.grnd_level } hPa
*Humidity* : ${ body.main.humidity }%
*Wind speed* : ${ body.wind.speed }M/S
*Cloud* : ${ body.clouds.all }%
`)
                // *Sunrise* : 
                // *Sunset* :
            }
        }
    }
});

client.initialize();
 