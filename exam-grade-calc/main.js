let textInputs = document.querySelectorAll("input[type=number]")
let statusDOM = document.getElementById("status")

document.querySelector("input[type=reset]").onclick = () => textInputs.forEach(e => e.value = "")
textInputs.forEach(e => e.setAttribute("onkeyup", "update()"))
update()

function update() {
    let selectedButton = document.querySelector('input[type=radio]:checked').value
    document.querySelector(`input[name=${selectedButton}]`).disabled = true;
    document.querySelectorAll('input[type="radio"]:not(:checked)').forEach(e => document.querySelector(`input[name=${e.value}]`).disabled = false)
    result = calculate(selectedButton);
    if (result > 0) {
        if (result >= 100) {
            updateStatus("ok", `You would need a ${result}%`)
        } else {
            updateStatus("good", `You would need a ${result}%`)
        }
    } else {
        updateStatus("good", "Select the one you want to calculate, and enter valid inputs")
    }
}

function calculate(calculatingVal) {
    let q1 = textInputs[0].value
    let q2 = textInputs[1].value
    let exam = textInputs[2].value
    let final = textInputs[3].value
    let result = 0
    switch (calculatingVal) {
        case "q1":
            result = (final - (0.4 * q2) - (0.2 * exam)) / 0.4
            break;
        case "q2":
            result = (final - (0.4 * q1) - (0.2 * exam)) / 0.4
            break;
        case "exam":
            result = (final - (0.4 * q1) - (0.4 * q2)) / 0.2
            break;
        case "final":
            result = (0.4 * q1) + (0.4 * q2) + (0.2 * exam)
            break;
        default:
            console.log(calculatingVal);
    }
    return result.toFixed()
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