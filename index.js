const { Plugin } = require("powercord/entities");

var readMessages = [];
var pluginRunning = false;

module.exports = class AntiSpoilerSpam extends Plugin {
    messageListener() {
        if (pluginRunning) {
            let messages = document.getElementsByClassName("messageListItem-ZZ7v6g");

            if (messages) {
                for (let i = 0; i < messages.length; i++) {
                    let message = messages[i];
                    let messageContent = message.getElementsByClassName("messageContent-2t3eCI")[0];
        
                    if (messageContent) {
                        if (!readMessages.includes(message)) {
                            let spoilers = messageContent.getElementsByTagName("span");
                            spoilers = Array.from(spoilers).filter(spoiler => {
                                return spoiler.getAttribute("aria-label") == "Spoiler";
                            });
                            
                            if (spoilers.length > 100) {
                                spoilers.forEach(spoiler => {
                                    spoiler.remove();
                                });
                                console.log("[AntiSpoilerSpam] Removed " + spoilers.length + " spoilers from " + messageContent.innerText);
                            }
        
                            readMessages.push(message);
                        }
                    }
                }
            }
        }

        setTimeout(() => {
            this.messageListener();
        }, 1000);
    }

    startPlugin() {
        pluginRunning = true;
        this.messageListener();
    }
    pluginWillUnload() {
        pluginRunning = false;
    }
}