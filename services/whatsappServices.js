const { TurnContext } = require('botbuilder');
const https = require("https");
let data;

class WhatsAppConnector {
    async processActivity(activity, callback) {
        const context = new TurnContext(this, activity);
        await callback(context);
    }

    async sendActivities(context, activities) {

        for (const activity of activities) {
            if (activity.type === 'message') {
                data = activity.text;
                // Convierte el mensaje en el formato JSON específico  
                const response = await this.sendMessageToWhatsApp(data);
                return [response];
            }
        }
        return response;
    }


    async sendMessageToWhatsApp(data) {
        const options = {
            host: "graph.facebook.com",
            path: "/v20.0/134631209728179/messages",
            method: "POST",
            body: data,  //lo q se contruye en la funcion en este caso Data 
            headers: {
                "Content-Type": "application/json",
                "Authorization": process.env.WHATSAPP_TOKEN_BEARER
            }
        };

        return new Promise((resolve, reject) => {
            const req = https.request(options, res => {
                let responseData = '';

                res.on('data', d => {
                    process.stdout.write(d); // Mantener esta línea  
                    responseData += d;
                });

                res.on('end', () => {
                    try {
                        const parsedData = JSON.parse(responseData);
                        resolve(parsedData);
                    } catch (error) {
                        reject(error);
                    }
                });
            });

            req.on('error', error => {
                reject(error);
            });


            req.write((data));
            req.end();
        });
    }


}



module.exports.WhatsAppConnector = WhatsAppConnector;