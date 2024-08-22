 
const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;


///////////////////


module.exports = { session: process.env.SESSION_ID || 'Byte;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTURWT2tIeGVlODRMUXBKM1l4SnlIOElFelVSSGRuVmw1RUVoTXYxdzJIWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ0ovYmNVNk1zam1xd29iVGlLbUJSREVyMjd4aDBwaGxSck0vbDFYcFVqMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrS1VYeWlYZkpSV0xUK0g1bFZBOFZsRG96Z3J3cG82VHB1RWZ6R1NYMTJzPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJPeTFwVWZBbVl4Zmt1c3RzdDZTTWRWRXhDeW5BaUZ0SThqOXNkTjlUNDNzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InlERXArb3RDUzlOVW9WR2JsQmJVbXZPcUEvb2dSYzhKN0JjT2JsZ3hSbjg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImFYd0w5NjVZWkNsSjRzQk1oN3NXM2lFL0JaQXpWTDErdFBnMzJ6ZXVFRkE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMENUS2Q5bU1hdllYUEkxS2hYa0JRQ2J0NmhyQ3NNYWhuTDZ5Tmx0Q0tHcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibEFtRWZQYnhUVVdHc1QxTU5ENVdrWEZUZDNwUDlEazdGUUNNVHdVeDRBST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InRSR1NPQXNVc3ZTcTQzcTFBS0MrMDllNW0zWWFRK2xWOG5DL2ZHQWZZNTRuYXE0UnI4WFlvbG1MRkg3N3Nic0UrZGFuZEZmd1NSRCtUOGRTNFpJWGdBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTQ1LCJhZHZTZWNyZXRLZXkiOiJhQVgrcno5M2hYamJjeUtUZEdEZlBlS1l5R0NYaUIxZmJrM200K0lyZFpFPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIyOTQxODg3ODMzQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjNBMkEyMDkzRjU3RTE1MTVBQ0EzIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MjQzMDE3NTZ9LHsia2V5Ijp7InJlbW90ZUppZCI6IjIyOTQxODg3ODMzQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjNBMEY5MTNDNzVCNUUzQzIyODgzIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MjQzMDE3NTd9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IldKaDR1WmZGUXJDZF9ydmt6YXRYQnciLCJwaG9uZUlkIjoiMjE0NGE2NDQtOTRiZi00NDA2LTgzMDMtNzVjMDQzYjAyODljIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik42YytpTjJobk5uOXJIVVlOZDEwYnlWU1BvTT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJYWGFSV1haS0FGOFdFYWJDalZRZ2ZNajJJc1k9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiMjZTSjc3ODUiLCJtZSI6eyJpZCI6IjIyOTQxODg3ODMzOjExQHMud2hhdHNhcHAubmV0IiwibmFtZSI6IkppbiBjcm9zcyJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTm5nbzVjS0VLNkRtN1lHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoicjBGcFpNUXViR2FwemZqMDN6L3B1dHBGNEUyTmQvakFDM3p5ZVc2amFEdz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiVWdZcU5vdFpRYUkwR1FmWTluVDFXSjFPZkhJWUptc0lyaFRpQXVxMU9KaEpBdHRod3VvSi9pTjIyTUJ3ZTh4WDJRZ21mVzlqTHdxQ0hZRFFlalI5aGc9PSIsImRldmljZVNpZ25hdHVyZSI6InEySFU2L0E1WUlERXBzOUpXZ0FRVjJsYTd2bUxFQ1RQczAwc0NPZGlKZ1g2Yk8yU0ViWjZCdFY5UXlVUU1mYUE3T3RwTnQvOE10bEN4ZytyVFlNZWhBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjI5NDE4ODc4MzM6MTFAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCYTlCYVdURUxteG1xYzM0OU44LzZicmFSZUJOalhmNHdBdDg4bmx1bzJnOCJ9fV0sInBsYXRmb3JtIjoiaXBob25lIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzI0MzAxNzUzLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUFZRSJ9',

////////////////////////////////



    PREFIXE: process.env.PREFIX || ".",



///////////////////////////
    A_REACT : process.env.AUTO_REACTION || 'on',
    CHATBOT: process.env.CHAT_BOT || "off",
    OWNER_NAME: process.env.OWNER_NAME || "MARIANCROSS",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "22969526825",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "no",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'JIN CROSS',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://raw.githubusercontent.com/HyHamza/HyHamza/main/Images/BYTE-MD-LITE.jpeg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
