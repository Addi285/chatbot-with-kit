import { createChatBotMessage } from "react-chatbot-kit";

import LocationOptions from "./components/LocationOptions/LocationOptions";
import LinkList from "./components/LinkList/LinkList";


const config = {
    initialMessages: [
        createChatBotMessage("Hello what is your query?", {
          //widget: "locationOptions",
        }),
    ],

    widgets: [
        {
            widgetName: "locationOptions",
            widgetFunc: (props) => <LocationOptions {...props} />,
        },
        {
            widgetName: "javascriptLinks",
            widgetFunc: (props) => <LinkList {...props} />,
            props: {
                options: [
                  {
                    text: "BANG",
                    url:
                      "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/basic-javascript/",
                    id: 1,
                  },
                ],
            },
        },
    ],
}


export default config