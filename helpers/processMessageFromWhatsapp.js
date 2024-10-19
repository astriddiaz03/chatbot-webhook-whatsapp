

async function wspProcessIncomingMessage(messages) {
    let text = '';
    const typeMessage = messages["type"];

    if (typeMessage === "text") {
        text = (messages["text"])["body"];
    }
    else if (typeMessage === "interactive") {
        let contextObject = (messages["interactive"]);
        let typeOptions = contextObject["type"];

        if (typeOptions === "button_reply") {
            text = contextObject["button_reply"].title;
        }
        else if (typeOptions === "list_reply") {
            text = contextObject["list_reply"].title;
        }
    }

    if (!text) {
        myConsole.log('es un evento de mensaje enviado')
        return false;
    }

    return text;
}




module.exports = { wspProcessIncomingMessage }; 