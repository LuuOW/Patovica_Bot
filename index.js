const Discord = require('discord.js');
const random = require('random');
const fs = require('fs');
const jsonfile = require('jsonfile');

const bot = new Discord.Client();

var stats = {};

if (fs.existsSync('stats.json')) {
    stats = jsonfile.readFileSync('stats.json');
}

bot.on('message', (message) => {

    if (message.author.id == bot.user.id) {
        return;
    }

    if(message.guild.id in stats === false) {
        stats[message.guild.id] = {};
    }

    const guildStats = stats[message.guild.id];

    if (message.author.id in guildStats === false) {
        guildStats[message.author.id] = {
            xp: 0,
            level: 0,
            last_message: 0,
        };
    }

    const userStats = guildStats[message.author.id];

    if (Date.now() - userStats.last_message > 30000) {

    userStats.xp += random.int(15, 25);
    userStats.last_message = Date.now();


    const xpToNextLvl = 5 * Math.pow(userStats.level, 2) + 50 * userStats.level + 100;
    if (userStats.xp >= xpToNextLvl) {
        userStats.level++;
        userStats = userStats.xp - xpToNextLvl;
        message.channel.send(message.author.username + ' ha alcanzado el nivel: ' + userStats.level);
    }

    jsonfile.writeFileSync('stats.json', stats);

    console.log(message.author.username + ' ahora tiene de XP ' + userStats.xp);
    console.log('XP necesaria para el siguiente nivel: ' + xpToNextLvl );
}


    const parts = message.content.split(' ');

    if(parts[0] === '!hello') {
        message.reply('Hola pibe, te estas portando bien?');
    }
});


bot.login('NzQ3ODA1Njc3NjE4OTg3MTE4.X0UOTw.EoWXD7IjYEY2DopyPMccD4TgbU4');