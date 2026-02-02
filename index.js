const { Client, GatewayIntentBits } = require("discord.js");
const { joinVoiceChannel } = require("@discordjs/voice");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates
  ]
});

client.once("ready", async () => {
  console.log(`Logged in as ${client.user.tag}`);

  const channelId = "1456846219061100596";

  const channel = await client.channels.fetch(channelId);

  if (!channel || channel.type !== 2) {
    console.log("Voice channel not found or not a voice channel");
    return;
  }

  joinVoiceChannel({
    channelId: channel.id,
    guildId: channel.guild.id,
    adapterCreator: channel.guild.voiceAdapterCreator,
    selfMute: true,
    selfDeaf: true
  });

  console.log("Bot joined voice channel");
});

client.login(process.env.TOKEN);
