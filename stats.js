const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const User = require("../models/User");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stats")
    .setDescription("عرض إحصائياتك"),

  async execute(interaction) {
    const user = await User.findOne({ userId: interaction.user.id });
    if (!user) return interaction.reply("لا توجد بيانات");

    const hours = Math.floor(user.totalTime / 3600000);

    const embed = new EmbedBuilder()
      .setTitle("إحصائياتك")
      .addFields(
        { name: "عدد الجلسات", value: `${user.sessions}`, inline: true },
        { name: "عدد الساعات", value: `${hours}`, inline: true },
        { name: "النقاط", value: `${user.points}`, inline: true }
      )
      .setColor("Blue");

    interaction.reply({ embeds: [embed] });
  }
};
