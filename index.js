const { Client, GatewayIntentBits, AttachmentBuilder } = require('discord.js');
const Jimp = require('jimp');
const path = require('path');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages
    ]
});

// مسار صورة البنر
const BANNER_PATH = path.join(__dirname, 'banner.png');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    if (message.attachments.size > 0) {
        for (const attachment of message.attachments.values()) {
            if (attachment.contentType && attachment.contentType.startsWith('image')) {
                try {
                    const userImage = await Jimp.read(attachment.url);
                    const width = userImage.getWidth();
                    const height = userImage.getHeight();

                    const bannerImage = await Jimp.read(BANNER_PATH);
                    bannerImage.resize(width, Jimp.AUTO);
                    const bannerHeight = bannerImage.getHeight();

                    const finalImage = new Jimp(width, height + bannerHeight);
                    finalImage.composite(userImage, 0, 0);
                    finalImage.composite(bannerImage, 0, height);

                    const buffer = await finalImage.getBufferAsync(Jimp.MIME_PNG);
                    const attachmentWithBanner = new AttachmentBuilder(buffer, { name: 'with_banner.png' });

                    await message.channel.send({ files: [attachmentWithBanner] });

                } catch (err) {
                    console.error('Error processing image:', err);
                }
            }
        }
    }
});

client.login(process.env.DISCORD_TOKEN);
