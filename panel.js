const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("panel")
    .setDescription("إرسال لوحة تسجيل الدخول"),

  async execute(interaction) {

    const embed = new EmbedBuilder()
      .setTitle("لوحة الحضور للرقابة")
      .setDescription("استخدم الأزرار بالأسفل لتسجيل الدخول أو الخروج")
      .setColor("Green");

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("login")
        .setLabel("تسجيل دخول")
        .setStyle(ButtonStyle.Success),

      new ButtonBuilder()
        .setCustomId("logout")
        .setLabel("تسجيل خروج")
        .setStyle(ButtonStyle.Danger)
    );

    await interaction.reply({ embeds: [embed], components: [row] });
  }
};
