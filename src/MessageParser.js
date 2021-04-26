class MessageParser {
    constructor(actionProvider, state) {
      this.actionProvider = actionProvider;
      this.state = state;
    }
    
    //called when send button is pressed
    parse(message) {
        const lowerCaseMessage = message.toLowerCase()
        console.log(lowerCaseMessage)   //debug

        if (lowerCaseMessage.includes("hello")) {
            this.actionProvider.greet()
        }

        if (lowerCaseMessage.includes("?")) {
            this.actionProvider.queryClarif(lowerCaseMessage)
        }



        //temporary hard-coded keywords
        if (lowerCaseMessage.includes("brisbane grove")) {
            this.actionProvider.queryResponse(0)
        }
        if (lowerCaseMessage.includes("port of brisbane")) {
            this.actionProvider.queryResponse(0)
        }
        if (lowerCaseMessage.includes("south brisbane")) {
            this.actionProvider.queryResponse(0)
        }
        if (lowerCaseMessage.includes("brisbane city")) {
            this.actionProvider.queryResponse(0)
        }
        if (lowerCaseMessage.includes("brisbane airport")) {
            this.actionProvider.queryResponse(0)
        }
        if (lowerCaseMessage.includes("east brisbane")) {
            this.actionProvider.queryResponse(0)
        }
















    }
  }
  
  export default MessageParser;