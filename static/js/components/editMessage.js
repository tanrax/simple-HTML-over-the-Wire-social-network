import { sendData } from '../webSocketsCli.js';

function editMessage() {

    /*
        FUNCTIONS
    */

    /**
     * Displays the update form
     * @param {Event} event
     * @return {void}
     */
    function displayUpdateForm(event) {
        const message = {
            "action": "open edit page",
            "data": {
                "id": event.target.dataset.id
            }
        };
        sendData(message, window.myWebSocket);
    }


    /**
     * Update message
     * @param {Event} event
     * @return {void}
     */
    function updateMessage(event) {
        event.preventDefault();
        const message = {
            "action": "update message",
            "data": {
                "id": event.target.dataset.id,
                "author": event.target.querySelector("#message-form__author--update").value,
                "text": event.target.querySelector("#message-form__text--update").value
            }
        };
        sendData(message, myWebSocket);
    }


    /**
     * Updates events
     * @return {void}
     */
    function updateEvents() {
        // Add to the update form the event
        document.querySelectorAll(".update-form").forEach(form => {
            form.addEventListener("submit", updateMessage);
        });
    }

    return {
        updateEvents: updateEvents,
        displayUpdateForm: displayUpdateForm
    }
}

export default editMessage();