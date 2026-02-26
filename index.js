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

// ضع هنا ID الروم الذي تريد أن يعمل البوت فيه
const ALLOWED_CHANNEL_ID = '1476303113060089989';

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    // تحقق من الروم
    if (message.channel.id !== ALLOWED_CHANNEL_ID) return;

    // تحقق إذا أرسلت صورة
    if (message.attachments.size > 0) {
        for (const attachment of message.attachments.values()) {
            if (attachment.contentType && attachment.contentType.startsWith('image')) {
                try {
                    // إرسال البنر فقط
                    const bannerAttachment = new AttachmentBuilder(BANNER_PATH, { name: 'banner.png' });
                    await message.channel.send({ files: [bannerAttachment] });
                } catch (err) {
                    console.error('Error sending banner:', err);
                }
            }
        }
    }
});

// تسجيل الدخول
client.login(process.env.DISCORD_TOKEN);

