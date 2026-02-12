const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const User = require("../models/User");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("leaderboard")
    .setDescription("عرض المتصدرين"),

  async execute(interaction) {

    const users = await User.find().sort({ points: -1 }).limit(10);

    let desc = "";

    users.forEach((u, i) => {
      desc += `**${i + 1}.** <@${u.userId}> - ${u.points} نقطة\n`;
    });

    const embed = new EmbedBuilder()
      .setTitle("🏆 المتصدرين")
      .setDescription(desc || "لا يوجد بيانات")
      .setColor("Gold");

    interaction.reply({ embeds: [embed] });
  }
};
