
const connection = require("./database/connection")
//importar dependencias
const express= require('express');
const cors =require('cors');
require('dotenv').config();

// ejecutar conexion a la bd
//connection();

//servidor
const app = express();
const port = 3911;


const { MemoryStorage, ConversationState, UserState } = require('botbuilder');
const { WhatsAppConnector } = require('./services/whatsappServices');
const { wspProcessActivity } = require('./helpers/processActivityFromWhatsapp');

const { WelcomeDialog } = require('./dialogs/welcome');
const whatsappConnector = new WhatsAppConnector();
// This bot's main dialog.
const { BotWspApp } = require('./controller/runBot');
//configurar cors
app.use(cors());

app.listen (port, () => {
    console.log("servidor corriendo en el puerto " + port);
})

app.use(async function (req, res, next) {
    res.header('Access-Control-Allow-Origin', process.env.CORS_ORIGIN);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, DELETE");
    next();
});

//convertir todo a json
app.use(express.json());
app.use(express.urlencoded({extended:true}));


const memoryStorage = new MemoryStorage();
const conversationState = new ConversationState(memoryStorage);
const userState = new UserState(memoryStorage);
const botWspApp = new BotWspApp(conversationState, userState, new WelcomeDialog(conversationState, userState));


//cargar rutas

app.get("/ruta-probando", (req,res)=>{

    return res.status(200).send({
            "id":12,
            "nombre":"jose",
            "web":"jose.com"
    });
});


app.get("/webhook", (req, res) => {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    // Check the mode and token sent are correct  
    if (mode === "subscribe" && token === process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN) {
        // Respond with 200 OK and challenge token from the request  
        res.status(200).send(challenge);
        console.log("Webhook verified successfully!");
    } else {
        // Respond with '403 Forbidden' if verify tokens do not match  
        res.sendStatus(403);
    }
});

// Listen for incoming requests.
app.post("/webhook", async (req, res) => {
    try {
        const activity = await wspProcessActivity(req);

        if (activity && !isEmptyObject(activity)) {
            if (activity.type === 'event') {
                res.sendStatus(200);
            } else if (activity.type === 'message') {
                await whatsappConnector.processActivity(activity, async (context) => {
                    await botWspApp.onTurn(context);
                });
                res.sendStatus(200);
            }
            else {
                res.sendStatus(200);
            }
        } else {
            res.sendStatus(200);
        }
    } catch (error) {
        console.error("Error al procesar la solicitud:", error);
        res.sendStatus(400);
    }
});

function isEmptyObject(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}


//

