const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");

const client = new Discord.Client();
const config = require("./config.js");

client.config = config;

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

client.galleryEmote = new Enmap({
  name: "emotes for gallery",
  autoFetch: true,
  fetchAll: false
});

client.approvedLinks = new Enmap({
  name: "approved discord invite links",
  autoFetch: true,
  fetchAll: false
});

client.commands = new Enmap();
client.fcs = new Enmap({
  name: "friend codes",
  autoFetch: true,
  fetchAll: false
});

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Attempting to load command ${commandName}`);
    client.commands.set(commandName, props);
  });
});

client.login(config.token);
