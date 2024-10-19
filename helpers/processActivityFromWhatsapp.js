const { wspProcessIncomingMessage } = require('./processMessageFromWhatsapp');
const { v4: uuidv4 } = require('uuid');

async function wspProcessActivity(req, res) {
    try {
        const entry = req.body.entry[0];
        const changes = entry.changes[0];
        const value = changes.value;
        let activity = {};
        let idConversacion;
        let typeWebhook = '';
        let statuses = '', typeMessage = '', conversationId = '', timestamp = '', message_id = '', category = '', recipient_id = '', status = '', phone_number_id = '', msg_error = '';

        if (value.statuses) {
            typeWebhook = 'event';
            statuses = value.statuses[0];
            status = statuses.status;
            phone_number_id = value.metadata.phone_number_id;
            message_id = statuses.id;
            recipient_id = statuses.recipient_id;
            timestamp = statuses.timestamp;


            switch (status) {
                case 'sent':
                    conversationId = statuses.conversation.id;
                    break;
                default:

            }

            activity = {
                type: typeWebhook,
                conversation: { id: entry.id || '' },
                conversationWaba: { id: conversationId || '' },
                timestamp: timestamp || '',
                message_id: { id: message_id || '' },
                recipient: { id: recipient_id || '' },
                phone_number_id: { id: phone_number_id || '' },
                status: status || '',
                channelId: '4',
                msg_error: msg_error || ''
            };

        }
        else if (value.messages) {
            message = value.messages[0];
            contact = value.contacts[0]
            let text = await wspProcessIncomingMessage(message);

            if (!text) {
                activity = {};
            }
            else {
                timestamp = message.timestamp;
                message_id = message.id;
                typeMessage = message.type;
                typeWebhook = 'message';
                if (process.env.DEVENV=0)
                    {
                        const result = await queryMongo.logAFindUser(message.from);

                        if (!result) {
                            idConversacion = generateUniqueId(message.from)
                        }
                        else {
                            idConversacion = result.idConversation
                        }

                    }
                    else
                    {
                        idConversacion = message.from
                    }
              

                activity = {
                    type: typeWebhook,
                    conversation: { id: idConversacion },
                    timestamp: timestamp || '',
                    from: { id: message.from || '' },
                    message_id: { id: message_id || '' },
                    text: text || '',
                    channelId: '4',
                    typeMessage: typeMessage || ''
                };

            }
        }
        else {
            // myconsole.log('Otra actividad recibida:\n',value)
        }

        return activity;

    } catch (error) {
        console.error("Error processing activity:", error);
        res.status(400).json({ error: 'Internal Server Error' });
    }
}

function generateUniqueId(phoneNumber) {
    return `${phoneNumber}-${uuidv4()}`;
}

async function wspProcessEvents(req, res) {
    try {

        payload = {
            _id: + new Date(),
            idConversation: req.conversationWaba.id,
            message_id: req.message_id.id,
            date: new Date().toString(),
            type_of_activity: req.type,
            recipient_id: req.recipient.id,
            phone_number_id: req.phone_number_id.id,
            channelId: req.channelId,
            timestamp: req.timestamp,
            msg_status: req.status,
            msg_error: req.msg_error
        };

        transcriptMongo.logActivityUser(payload);

    } catch (error) {
        console.error("Error processing events:", error);
        res.status(400).json({ error: 'Internal Server Error' });
    }
}





module.exports = {
    wspProcessActivity: wspProcessActivity,
    wspProcessEvents: wspProcessEvents
};
