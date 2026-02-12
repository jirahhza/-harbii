require('dotenv').config();

const { REST, Routes } = require("discord.js");

const commands = require("./commands.js").map(cmd => cmd.data.toJSON());

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  try {
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );

    console.log("✅ Commands Deployed");
  } catch (error) {
    console.error("❌ Error deploying commands:", error);
  }
})();
