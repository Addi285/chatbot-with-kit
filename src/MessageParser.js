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

















    }
  }
  
  export default MessageParser;