
function Messagetext(textResponse, phoneNumber) {
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": phoneNumber,
        "text": {
            "body": textResponse
        },
        "type": "text"

    });
    return data;
}


function MessagetextReply(textResponse, phoneNumber, whatsappMessageId) {
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": phoneNumber,
        "context": {
            "message_id": whatsappMessageId
        },
        "text": {
            "body": textResponse
        },
        "type": "text"

    });
    return data;
}


function MessageButtonOption(textResponse, phoneNumber, buttons) {
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": phoneNumber,
        "type": "interactive",
        "interactive": {
            "type": "button",
            "body": {
                "text": textResponse
            },
            "action": {
                "buttons": buttons
            }
        }


    });
    return data;
}




function MessageUrlAUTH(textResponse, phoneNumber) {
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": phoneNumber,
        "text": {
            "preview_url": false,
            "body": textResponse 
        }

    });
    return data;
}

function MessageLocation(phoneNumber) {
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": phoneNumber,
        "type": "location",
        "interactive": {
            "link": "https://biostoragecloud.blob.core.windows.net/resource-udemy-whatsapp-node/document_whatsapp.pdf"
        }

    });
    return data;
}





function MessageCallToAction(textResponse, phoneNumber, urlAPI) {
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": phoneNumber,
        "type": "interactive",
        "interactive": {
            "type": "cta_url",
            "header": {
                "type": "text",
                "text": "Sitio"
            },
            "body": {
                "text": textResponse
            },
            "footer": {
                "text": ""
            },
      "action": {
      "name": "cta_url",
      "parameters": {
        "display_text": "Click Aquí",
        "url": "URL"
            }
          }
        }

    });
    return data;
}



module.exports = {
    Messagetext,
    MessageLocation,
    MessageButtonOption,
    MessagetextReply,
    MessageUrlAUTH,
    MessageCallToAction
}