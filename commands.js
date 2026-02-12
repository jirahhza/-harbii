const { SlashCommandBuilder } = require("discord.js");

module.exports = [
  {
    data: new SlashCommandBuilder()
      .setName("leaderboard")
      .setDescription("عرض قائمة المتصدرين"),
    async execute(interaction) {
      await interaction.reply("🏆 هذه قائمة المتصدرين");
    },
  },

  {
    data: new SlashCommandBuilder()
      .setName("panel")
      .setDescription("فتح لوحة التحكم"),
    async execute(interaction) {
      await interaction.reply("🎛️ تم فتح لوحة التحكم");
    },
  },

  {
    data: new SlashCommandBuilder()
      .setName("stats")
      .setDescription("عرض إحصائياتك"),
    async execute(interaction) {
      await interaction.reply("📊 هذه إحصائياتك");
    },
  },

  {
    data: new SlashCommandBuilder()
      .setName("user")
      .setDescription("عرض معلومات مستخدم")
      .addUserOption(option =>
        option.setName("target")
          .setDescription("اختر المستخدم")
          .setRequired(true)
      ),
    async execute(interaction) {
      const user = interaction.options.getUser("target");
      await interaction.reply(`👤 معلومات المستخدم: ${user.tag}`);
    },
  },
];
