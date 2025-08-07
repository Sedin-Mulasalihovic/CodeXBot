require('dotenv').config(); // Lädt .env-Datei

const fs = require('fs');
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

let levels = {};

// Leveldaten laden
if (fs.existsSync('./levels.json')) {
  levels = JSON.parse(fs.readFileSync('./levels.json'));
}

client.once('ready', () => {
  console.log(`✅ Eingeloggt als ${client.user.tag}`);
});

client.on('messageCreate', message => {
  if (message.author.bot) return;

  const userId = message.author.id;

  // XP-System
  if (!levels[userId]) {
    levels[userId] = { xp: 0, level: 1 };
  }

  levels[userId].xp += Math.floor(Math.random() * 10) + 5;
  const neededXp = levels[userId].level * 100;

  if (levels[userId].xp >= neededXp) {
    levels[userId].level++;
    levels[userId].xp = 0;
    message.channel.send(`🎉 ${message.author} ist jetzt Level ${levels[userId].level}!`);
  }

  // Speichern
  fs.writeFileSync('./levels.json', JSON.stringify(levels, null, 2));

  // Commands
  const msg = message.content.toLowerCase();

  if (msg === '!hallo') {
    message.channel.send('👋 Hallo! Ich bin dein Level-Bot.');
  }

  if (msg === '!hilfe') {
    message.channel.send('🛠 Verfügbare Befehle:\n`!hallo`, `!level`, `!hilfe`, `!portfolio`');
  }

  if (msg === '!level') {
    const { level, xp } = levels[userId];
    message.channel.send(`📊 ${message.author}, du bist Level **${level}** mit **${xp} XP**.`);
  }

  if (msg === '!portfolio') {
    message.channel.send('🌐 Hier ist mein Portfolio:\nhttps://sedin-mulasalihovic.github.io/portfolio/');
  }
});

// Bot starten
client.login(process.env.TOKEN);
