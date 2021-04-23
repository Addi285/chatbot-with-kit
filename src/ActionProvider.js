import { prettyDOM } from "@testing-library/dom";
import LocationOptions from "./components/LocationOptions/LocationOptions";

const serverClarif = "http://192.46.220.90:5000/clarif?query=";
const serverResponse = "http://192.46.220.90:5000/response?query=%E2%80%9DMaximum%20precipitation%20in%20Brisbane%20June%202015%E2%80%9D&NLPEntity={%22STAT%22:%20[%22maximum%22],%20%22ATTRIBUTE%22:%20[%22precipitation%22],%20%22GPE%22:%20[%22Brisbane%22],%20%22DATE%22:%20[%22June%202015%22]}&locIndex=0";
//const serverResponse = "http://192.46.220.90:5000/response?query=";
var result = "";
var query = {};
var nlpEntity = {};
var locations = [];
var locationsFormatted = [];

class ActionProvider {
    constructor(createChatBotMessage, setStateFunc, createClientMessage) {
      this.createChatBotMessage = createChatBotMessage;
      this.setState = setStateFunc;
      this.createClientMessage = createClientMessage;
    }

    //drops greeting message when called
    greet() {
        const greetingMessage = this.createChatBotMessage("Hello there")
        this.updateChatbotState(greetingMessage)
    }

    queryClarif(transcript) {
        const theURL = serverClarif + transcript;
        var ajax = new XMLHttpRequest();

        ajax.open("GET", theURL, true);
        ajax.send(null);
        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4 && (ajax.status == 200)) {
                console.log("ready")            
                var Data = JSON.parse(ajax.responseText);

                query = Data.query;
                console.log("query:", query);
                nlpEntity = Data.NLPEntity;
                console.log("NLPEntity:", nlpEntity);

                var i, j;
                for (i = 0; i < Data.Location.length; i++) {
                    locations[i] = []
                    locationsFormatted[i] = Data.Location[i][2]
                    for (j = 0; j < 1; j++) {
                        locations[i][j] = Data.Location[i][0];
                        locations[i][j+1] = Data.Location[i][2];
                    }
                }
            } else {
                console.log("not ready yet")            
            }
        }

        console.log("SPECIFIC LOCATIONS: ", locationsFormatted);
        this.updateChatbotState(this.createChatBotMessage("Please specify which location:", {
            widget: "locationOptions",
          }),
        )
        //this.updateChatbotState(this.createChatBotMessage(locationsFormatted))
    }

    handleLoc1 = () => {
        const theURL = serverResponse // + NLPEntity + locIndex;
        var ajax = new XMLHttpRequest();

        ajax.open("GET", theURL, true);
        ajax.send(null);
        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4 && (ajax.status == 200)) {
                console.log("ready")     
                const Data = JSON.parse(ajax.responseText);       
                result = Data.Result;
                console.log("RESULT: ", result);
            } else {
                console.log("not ready yet")   
            }
        }
        console.log("RESPONSE GET REQUEST")
        //this.updateChatbotState(this.createChatBotMessage(result))
        setTimeout(() => {  
            this.updateChatbotState(this.createChatBotMessage(result))
        }, 1000);
      }
    













    //updates the chatbot state. Leave alone
    updateChatbotState(message) {
        this.setState(prevState => ({
            ...prevState, messages: [...prevState.messages, message]
        }))
    }
  }
  
  export default ActionProvider;