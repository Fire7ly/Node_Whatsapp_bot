# Node Whatsapp bot
## An ordinary *Whatsapp bot* written in *javascript* 
 
 # How to use it
 ##### clone git repo ->
 ``` git clone https://github.com/Fire7ly/Node_Whatsapp_bot.git .```
 ##### install all node dependencies
 ```npm install```
  ##### Get weather api from : [openweather](https://openweathermap.org/api)
 > ``` rename .env_sample to .env ```
  
 > copy your api code to .env file

  > ```  Eg:- WEATHER_API_TOKEN=Your_Api_Key ```
 ##### run the bot ->
 * Run ```npm run dev``` to use dev mode of bot. (auto restart if file change)
 * Run ```npm run start``` to use bot in normal mode. (auto restart not supported)

## Features of this bot ->
* ``` !alive ``` :  _Show status of bot_
* ``` !stats ``` :  _Show statistics of the bot & Host Machine_
* ``` !help ``` :   _Show this menu of bot_
* ``` !joke ``` : _Send random jokes_
* ``` !quote ``` : _Send quote in chat_
* ``` !cinfo ``` :  _Show information of client_
* ``` !ginfo ``` :  _Send group information_
* ``` !meme ``` : _Send random memes_
* ``` !weather ``` : _Send today weather info_

### This project uses :-
>  * [whatsapp-web.js](https://www.npmjs.com/package/whatsapp-web.js)
 
> * [check-disk-space](https://www.npmjs.com/package/check-disk-space)

> * [axios](https://www.npmjs.com/package/axios)

> * [qrcode-terminal](https://www.npmjs.com/package/qrcode-terminal)

> * [node-os-info](https://www.npmjs.com/package/@felipebutcher/node-os-info)

> * [nodemon](https://www.npmjs.com/package/nodemon)