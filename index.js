const { Client, GatewayIntentBits, Collection, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, Events } = require("discord.js");
const mongoose = require("mongoose");
const config = require("./config.json");
const fs = require("fs");

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});

client.commands = new Collection();

mongoose.connect(config.mongoURI)
  .then(() => console.log("MongoDB Connected"));

const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

client.on(Events.InteractionCreate, async interaction => {
  if (interaction.isChatInputCommand()) {
    const command = client.commands.get(interaction.commandName);
    if (command) await command.execute(interaction);
  }

  if (interaction.isButton()) {
    const User = require("./models/User");
    let user = await User.findOne({ userId: interaction.user.id });

    if (!user) {
      user = await User.create({ userId: interaction.user.id });
    }

    if (interaction.customId === "login") {
      if (user.isActive) return interaction.reply({ content: "❌ أنت مسجل دخول بالفعل", ephemeral: true });

      user.isActive = true;
      user.loginTime = new Date();
      user.sessions += 1;
      await user.save();

      return interaction.reply({ content: "✅ تم تسجيل الدخول", ephemeral: true });
    }

    if (interaction.customId === "logout") {
      if (!user.isActive) return interaction.reply({ content: "❌ أنت لست مسجل دخول", ephemeral: true });

      const diff = Date.now() - user.loginTime;
      const minutes = Math.floor(diff / 60000);

      user.totalTime += diff;
      user.points += minutes;
      user.isActive = false;
      user.loginTime = null;
      await user.save();

      return interaction.reply({ content: `✅ تم تسجيل الخروج\n⏱ المدة: ${minutes} دقيقة`, ephemeral: true });
    }
  }
});

require("./deploy-commands.js");

client.login(config.token);
