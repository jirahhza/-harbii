const { Client, GatewayIntentBits, AttachmentBuilder } = require('discord.js');
const path = require('path');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages
    ]
});

// مسار البنر
const BANNER_PATH = path.join(__dirname, 'banner.png');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    // إذا كان هناك صورة مرفقة في الرسالة
    if (message.attachments.size > 0) {
        for (const attachment of message.attachments.values()) {
            if (attachment.contentType && attachment.contentType.startsWith('image')) {
                try {
                    // إرسال البنر فقط بدون دمج
                    const bannerAttachment = new AttachmentBuilder(BANNER_PATH, { name: 'banner.png' });
                    await message.channel.send({ files: [bannerAttachment] });
                } catch (err) {
                    console.error('Error sending banner:', err);
                }
            }
        }
    }
});

// تسجيل الدخول باستخدام متغير البيئة
client.login(process.env.DISCORD_TOKEN);
