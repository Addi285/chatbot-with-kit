import { prettyDOM } from "@testing-library/dom";
import LocationOptions from "./components/LocationOptions/LocationOptions";
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
const serverClarif = "http://192.46.220.90:5000/clarif?query=";
//const serverResponse = "http://192.46.220.90:5000/response?query=%E2%80%9DMaximum%20precipitation%20in%20Brisbane%20June%202015%E2%80%9D&NLPEntity={%22STAT%22:%20[%22maximum%22],%20%22ATTRIBUTE%22:%20[%22precipitation%22],%20%22GPE%22:%20[%22Brisbane%22],%20%22DATE%22:%20[%22June%202015%22]}&locIndex=";
const serverResponse = "http://192.46.220.90:5000/response?query=";
var result = "";
var query = {};
var nlpEntityString = "";
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
                nlpEntityString = JSON.stringify(Data.NLPEntity);
                console.log("nlpent STRING:", nlpEntityString);

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

    queryResponse(locIndex) {
        const theURL = serverResponse + query + "&NLPEntity=" + nlpEntityString + "&locIndex=" + locIndex;
        console.log("THE GET REQUEST", theURL);
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
        setTimeout(() => {  
            this.updateChatbotState(this.createChatBotMessage(result))
            this.speakText("The answer is:")
            this.speakText(result)
        }, 1000);
    }


    //Location button handlers
    handleLoc0 = () => {
        this.queryResponse(0);
    }
    handleLoc1 = () => {
        this.queryResponse(1);
    }
    handleLoc2 = () => {
        this.queryResponse(2);
    }
    handleLoc3 = () => {
        this.queryResponse(3);
    }
    handleLoc4 = () => {
        this.queryResponse(4);
    }
    handleLoc5 = () => {
        this.queryResponse(5);
    }








    //voice response function and config
    speakText(message) {
        const speech = new SpeechSynthesisUtterance();
        speech.text = message;
        speech.volume = 1;
        speech.rate = 1;
        speech.pitch = 1;
        window.speechSynthesis.speak(speech);
    }

    //updates the chatbot state. Leave alone
    updateChatbotState(message) {
        //this.speakText(message)
        this.setState(prevState => ({
            ...prevState, messages: [...prevState.messages, message]
        }))
    }
  }
  
  export default ActionProvider;