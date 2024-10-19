const { WaterfallDialog, ComponentDialog, DialogSet, DialogTurnStatus, Dialog } = require('botbuilder-dialogs');
const whatsappModels = require('../models/messageModels.js');
const { TEXTS } = require('./TEXTSTRUCTURES.js');

const WATERFALL_DIALOG = 'WATERFALL_DIALOG';

class WelcomeDialog extends ComponentDialog {
  constructor(conversationState, userState) {
    super('welcomeDialog');

    this.conversationState = conversationState;
    this.userState = userState;
    this.dialogState = conversationState.createProperty("dialogState");
    this.dialogSet = new DialogSet(this.dialogState);

    this.addDialog(new WaterfallDialog(WATERFALL_DIALOG, [
      this.welcomeStepOne.bind(this)
    ]));

  

    this.initialDialogId = WATERFALL_DIALOG;
  }

  async run(turnContext, accessor) {
    const dialogSet = new DialogSet(accessor);
    dialogSet.add(this);
    const dialogContext = await dialogSet.createContext(turnContext);

    const results = await dialogContext.continueDialog();
    if (results.status === DialogTurnStatus.empty) {
      await dialogContext.beginDialog(this.id);
    }
  }

  async welcomeStepOne(step) {
    let phone = step.context.activity.from.id;

    const sendUserWelcome = whatsappModels.Messagetext(`${TEXTS.SALUDAR}${TEXTS.BOTNAME}`, phone);
    let response = await step.context.sendActivity({
      type: 'message',
      text: sendUserWelcome,
      recipient: {
        id: phone
      }
    });

    return Dialog.EndOfTurn;

  }

 

}




module.exports = { WelcomeDialog };

