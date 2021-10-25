outputDOM = document.getElementById('output')
inputDOM = document.getElementById('input')
cryptSelectionDOM = document.getElementById('crypt')
statusDOM = document.getElementById("status")
arrowsDOM = document.getElementsByClassName("arrow")

function update() {
    updateIcon()
    if (cryptSelectionDOM.value == "rot13") {
        updateStatus("good", "All good")
        outputDOM.value = rot(inputDOM.value);
    } else if (cryptSelectionDOM.value == "binary") {
        updateStatus("good", "All good")
        switch (modeDOM.value) {
            case "encrypt":
                outputDOM.value = strTobinary(inputDOM.value);
                break;
            case "auto":
                if (!isBinary(inputDOM.value)) {
                    outputDOM.value = strTobinary(inputDOM.value);
                    break;
                }
            case "decrypt":
                answer = binaryTostr(inputDOM.value);
                if (answer == null) {
                    updateStatus("error", "Please enter valid input")
                    outputDOM.value = "";
                } else {
                    outputDOM.value = answer;
                }
                break;
        }
    } else if (cryptSelectionDOM.value == "base64") {
        updateStatus("good", "All good")
        switch (modeDOM.value) {
            case "encrypt":
                outputDOM.value = encodeBase64(inputDOM.value);
                break;
            case "auto":
                updateStatus("ok", "Warning: Auto is really buggy")
                if (!isBase64(inputDOM.value)) {
                    outputDOM.value = encodeBase64(inputDOM.value);
                    break;
                }
            case "decrypt":
                outputDOM.value = decodeBase64(inputDOM.value);
                break;
        }
    } else {
        updateStatus("ok", "This cipher has not been implemented yet")
    }
}

function updateIcon() {
    modeDOM = document.querySelector('input[name="mode"]:checked')

    switch (modeDOM.value) {
        case "auto":
            arrowsDOM.item(0).innerText = "↑↓"
            arrowsDOM.item(1).innerText = arrowsDOM.item(0).innerText
            break;
        case "encrypt":
            arrowsDOM.item(0).innerText = "↓"
            arrowsDOM.item(1).innerText = arrowsDOM.item(0).innerText
            break;
        case "decrypt":
            arrowsDOM.item(0).innerText = "↑"
            arrowsDOM.item(1).innerText = arrowsDOM.item(0).innerText
            break;
        default:
            updateStatus("error", "error")
            break;
    }
}

function updateStatus(type, status) {
    switch (type) {
        case "good":
            statusDOM.style.backgroundColor = "green";
            statusDOM.innerText = status
            break;
        case "ok":
            statusDOM.style.backgroundColor = "orange";
            statusDOM.innerText = status
            break;
        case "error":
            statusDOM.style.backgroundColor = "red";
            statusDOM.innerText = status
            break;
        default:
            statusDOM.style.backgroundColor = "red";
            statusDOM.innerText = "A Fatal Error has Occured"
            break;
    }
}