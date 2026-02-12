const { Client, GatewayIntentBits, Collection, Events } = require("discord.js");
const mongoose = require("mongoose");
require("dotenv").config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.commands = new Collection();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const commands = require("./commands.js");

for (const command of commands) {
  client.commands.set(command.data.name, command);
}

client.once("clientReady", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: "❌ حدث خطأ", ephemeral: true });
  }
});

client.login(process.env.TOKEN);
