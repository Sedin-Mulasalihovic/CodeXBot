const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

// Wenn Bot startet
client.once('ready', () => {
  console.log(`Eingeloggt als ${client.user.tag}!`);
});

// Wenn eine Nachricht gesendet wird
client.on('messageCreate', message => {
  if(message.author.bot) return; // Ignoriere Bots

  if(message.content.toLowerCase() === '!hallo') {
    message.channel.send('Hallo! Ich bin dein Bot 🤖');
  }
});

// Bot mit Token einloggen
client.login('yourToken');
