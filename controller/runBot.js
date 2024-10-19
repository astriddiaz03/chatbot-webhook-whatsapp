const { ActivityHandler } = require('botbuilder');  
const { DialogSet } = require('botbuilder-dialogs');  
const {WelcomeDialog}= require('../dialogs/welcome.js');    
const whatsappModels = require('../models/messageModels.js')
const { TEXTS } = require('../dialogs/TEXTSTRUCTURES.js'); 

let payload = '';

let timeoutId;  

class BotWspApp extends ActivityHandler {  
    constructor(conversationState, userState, dialog) {  
        super();  
        this.dialog = dialog; 
        this.conversationState=conversationState;
        this.userState= userState;
        this.dialogState= conversationState.createProperty("dialogState");
        this.previousIntent= this.conversationState.createProperty("previousIntent");
        this.conversationData= this.conversationState.createProperty("conversationData");
        this.WelcomeDialog= new WelcomeDialog(this.conversationState,this.userState);
        this.dialogSet = new DialogSet(this.dialogState);  
        this.dialogSet.add(this.dialog);  
        this.timers = new Map();
    }  

    async onTurn(context) {  
         await super.onTurn(context); 
          
         let lastUserResponse;
         if (timeoutId) {  
            clearTimeout(timeoutId);  
          }  

          if (context.activity.type === 'message') {  
            lastUserResponse = (context.activity.text).trim().toLowerCase().replace(/[\u0300-\u036f]/g, "");  
          }
      
        if (lastUserResponse==='volver luego') {  
          let phone= context.activity.from.id;
          let dialogContext = await this.dialogSet.createContext(context);
          const sendDespedida = whatsappModels.Messagetext( `${TEXTS.DESPEDIDA}`,  phone ); 
          await context.sendActivity({      
                                      type: 'message',      
                                      text: sendDespedida,      
                                      recipient: {      
                                      id: phone  }      
                                    }); 
          await dialogContext.cancelAllDialogs();
          await this.conversationState.saveChanges(context, true);  
          await this.userState.saveChanges(context, true);
          

        }
        else
        { 
          await this.dialog.run(context, this.dialogState);
          await this.conversationState.saveChanges(context, false);  
          await this.userState.saveChanges(context, false);  
         
       }

       payload = {  
        _id:+ new Date(),  
        idConversation: context.activity.conversation.id,  
        message_id: context.activity.message_id.id,  
        date: new Date().toString(),  
        type_of_activity: context.activity.type,  
        typeMessage: context.activity.typeMessage,  
        text: context.activity.text,  
        from: context.activity.from.id,  
        channelId: context.activity.channelId,
        timestamp:context.activity.timestamp 
    };

          
       timeoutId = setTimeout(async () => {  
        let dc = await this.dialogSet.createContext(context);
        if (dc.activeDialog) {   
          let phone= context.activity.from.id;
          const sendDespedida = whatsappModels.Messagetext( `${TEXTS.DESPEDIDA_USUARIO_INACTIVO}`,  phone ); 
          await context.sendActivity({      
                                      type: 'message',      
                                      text: sendDespedida,      
                                      recipient: {      
                                      id: phone   }      
                                    }); 
         // Cancelar todos los diálogos activos  
                                       
         await dc.cancelAllDialogs();  
         await this.conversationState.clear(context); 
         await this.conversationState.saveChanges(context, false);  
         await this.userState.saveChanges(context, false);
        }  
        timeoutId = undefined; // Restablecer el valor de timeoutId después de que se complete el temporizador  
      }, process.env.TIMEO_OUT * 60 * 1000);
      
  }

} 
  
module.exports.BotWspApp = BotWspApp;