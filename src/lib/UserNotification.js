class UserNotification {
    constructor(teamID, userID, message, messageType) {
        this.teamID = teamID;
        this.message = message;
        this.userID = userID;
        this.messageType = messageType;
        console.log("message : " + message);

    }

    render() {

        console.log(this.message);
        switch (this.messageType) {
            case "silme":
                var container = document.createElement('div');
                container.className = "bildirim";
                container.style.backgroundColor = "#6c5ce7";
                var el = '<div class="kapat-container">' +
                    '<div class="bildirim-kapat">' +
                    '<i class="las la-times" id="bildirim-kapat-icon"></i>' +
                    '</div>' +
                    '</div>' +
                    '<div class="bildirim-mesaj-container">' +
                    '<p class="bildirim-mesaj">' +
                    String(this.message) +
                    '</p>' +
                    '</div>';

                container.innerHTML = el;
                var list = document.getElementById("bildirim-listesi-container");
                list.appendChild(container);
                break;
            default:
                var container = document.createElement('div');
                container.className = "bildirim";
                var el = '<div class="kapat-container">' +
                    '<div class="bildirim-kapat">' +
                    '<i class="las la-times" id="bildirim-kapat-icon"></i>' +
                    '</div>' +
                    '</div>' +

                    '<div class="bildirim-mesaj-container">' +
                    '<p class="bildirim-mesaj">' +
                    String(this.message) +
                    '</p>' +
                    '</div>';

                container.innerHTML = el;
                var list = document.getElementById("bildirim-listesi-container");
                list.appendChild(container);
                break;
        }
    }
}

export default UserNotification;