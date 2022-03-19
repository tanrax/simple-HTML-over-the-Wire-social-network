import { sendData } from '../webSocketsCli.js';

function addMessage() {
    /*
        VARIABLES
    */
    const inputAuthor = document.querySelector("#message-form__author");
    const inputText = document.querySelector("#message-form__text");
    const inputSubmit = document.querySelector("#message-form__submit");

    /*
        FUNCTIONS
    */

    /**
     * Send new message
     * @param {Event} event
     * @return {void}
     */
    function sendNewMessage(event) {
        event.preventDefault();
        // Prepare the information we will send
        const newData = {
            "action": "add message",
            "data": {
                "author": inputAuthor.value,
                "text": inputText.value
            }
        };
        // Send the data to the server
        sendData(newData, window.myWebSocket);
        // Clear message form
        inputText.value = "";
    }

    // Sends new message when you click on Submit
    inputSubmit.addEventListener("click", sendNewMessage);

}

export default addMessage();