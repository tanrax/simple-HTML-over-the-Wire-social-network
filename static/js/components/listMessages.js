import { sendData } from '../webSocketsCli.js';
import editMessage from './editMessage.js';

function listMessage() {

    /*
        FUNCTIONS
    */

    /**
     * Switches to the next page when the last message is displayed.
     */
    function enableInfiniteScroll() {
        const lastMessage = [...document.querySelectorAll('.message')].at(-1);
        // Turn the page when the last message is displayed.
        const observerLastMessage = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    if (!isLastPage()) goToNextPage();
                }
            });
        });

        observerLastMessage.observe(lastMessage);
    }


    /**
     * Get current page stored in #paginator as dataset
     * @returns {number}
     */
    function getCurrentPage() {
        return parseInt(document.querySelector("#paginator").dataset.page);
    }

    /**
     * Check if we are on the last page
     * @returns {boolean}
     */
    function isLastPage() {
        return parseInt(document.querySelector("#paginator").dataset.totalPages) === getCurrentPage();
    }


    /**
     * Switch to the next page
     * @param {Event} event
     * @return {void}
     */
    function goToNextPage(event) {
        // Prepare the information we will send
        const newData = {
            "action": "list messages",
            "data": {
                "page": getCurrentPage() + 1,
            }
        };
        // Send the data to the server
        sendData(newData, myWebSocket);
    }

    /**
     * Get current page stored in #paginator as dataset
     * @returns {number}
     */
    function getCurrentPage() {
        return parseInt(document.querySelector("#paginator").dataset.page);
    }


    /**
     * Switch to the next page
     * @return {void}
     */
    function goToNextPage() {
        // Prepare the information we will send
        const newData = {
            "action": "list messages",
            "data": {
                "page": getCurrentPage() + 1,
            }
        };
        // Send the data to the server
        sendData(newData, myWebSocket);
    }


    /**
     * Delete message
     * @param {Event} event
     * @return {void}
     */
    function deleteMessage(event) {
        const message = {
            "action": "delete message",
            "data": {
                "id": event.target.dataset.id
            }
        };
        sendData(message, window.myWebSocket);
    }

    /**
     * Add event listeners to the buttons
     * @return {void}
     */
    function updateEvents() {
        enableInfiniteScroll();
        // Add to all delete buttons the event
        document.querySelectorAll(".messages__delete").forEach(button => {
            button.addEventListener("click", deleteMessage);
        });
        // Add to all update buttons the event
        document.querySelectorAll(".messages__update").forEach(button => {
            button.addEventListener("click", editMessage.displayUpdateForm);
        });
    }

    /*
        INITIALIZATION
     */

    return {
        updateEvents: updateEvents
    }
}

// Initialize
export default listMessage();