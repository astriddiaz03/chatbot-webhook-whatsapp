
const SelectAuthenticationOptions = [
    {
        "type": "reply",
        "reply": {
            "id": "001",
            "title": "Continuar"
        }
    },
    {
        "type": "reply",
        "reply": {
            "id": "002",
            "title": "Volver luego"
        }
    }
];

const selectAuthenticationValidation = [
    {
        "type": "reply",
        "reply": {
            "id": "001",
            "title": "Listo"
        }
    }
];

const selectYesOrNo = [
    {
        "type": "reply",
        "reply": {
            "id": "001",
            "title": "Si"
        }
    },
    {
        "type": "reply",
        "reply": {
            "id": "002",
            "title": "No"
        }
    }
];



const selectConfirmEmailStep = [
    {
        "type": "reply",
        "reply": {
            "id": "001",
            "title": "Correcto"
        }
    },
    {
        "type": "reply",
        "reply": {
            "id": "002",
            "title": "Modificar"
        }
    }
];




const selectMainStep = [
    {
        "type": "reply",
        "reply": {
            "id": "001",
            "title": "Ir al Menu principal"
        }
    },
    {
        "type": "reply",
        "reply": {
            "id": "002",
            "title": "Salir"
        }
    }
];




module.exports = {
    SelectAuthenticationOptions,
    selectAuthenticationValidation,
    selectFundOptionsPromptStep,
    selectTransferOptionsStep,
    selectModifyDataStep,
    selectConfirmEmailStep,
    selectMainStep, selectYesOrNo
};

