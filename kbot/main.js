$(document).ready(function () {
    $(".learn-more").click(function (event) {
        $(this).off(event);
        $(".gradient-border").fadeOut(function () {
            $("#wave").fadeIn().delay(1900).fadeOut(function () {
                $("#name-input").fadeIn();
            });
        });
    })

    $("#name-input form").submit(function () {
        checkName();
        return false;
    });

    $(".wrapper form").submit(function () {
        processBot();
        return false;
    })

    /*
        var userInput = $("#inputText").val();
        $("#output").text("Thinking...");
        askBot(userInput, function (err, resp) {
            if (!err) {
                $("#output").text(resp);
            }
        })
        */
})

var user = {
    name: "No Name"
}

function processBot() {
    var userInput = ucfirst($(".group textarea").val().trim());
    $(".group textarea").val(userInput);
    $("#bot-input").fadeOut(function () {
        $("#wave").fadeIn()
        askBot(userInput, function (err, resp) {
            if (!err) {
                $(".group textarea").val("");
                $("#userMsg").text(`${user.name}: ${userInput}`);
                $("#aiMsg").text(`KBot: ${resp}`);
            }
            $("#wave").fadeOut(function () {
                $("#bot-input").fadeIn()
             });
        })
        
    })
}

var askBot = function (input, callback) {
    $.post("https://bot.kaustav.ml/v1/ask", {
        user: "XVXGIgND6rMXkQQ3",
        key: "4RStuq2CSCuucD0vgwrYLtf7QtKC9DNL",
        nick: "Vlad",
        text: input
    }, function (data) {
        if (typeof data != "object") {
            data = JSON.parse(data)
        }
        if (data.status == "success") {
            callback(false, data.response)
        } else {
            console.log(data.status);
            callback(true, data.status)
        }
    })
}

function checkName() {
    input = $("input#name").val().toLowerCase();
    $("input#name").val(ucfirst(input));
    if (/^[a-zA-Z]+$/.test(input) && input.length < 10) {
        user.name = ucfirstonly(input);
        $("#name-input").fadeOut(function () {
            $("#name-input form h1").text("Please Enter Your First Name");
            $("#wave").fadeIn().delay(1900).fadeOut(function () {
                /*
                    Correct Input
                */
               $("#bot-input").fadeIn()
            });
        })
    } else {
        $("#name-input").fadeOut(function () {
            $("input#name").val("");
            $("#name-input form h1").text("Please Enter A Valid Name");
            $("#wave").fadeIn().delay(400).fadeOut(function () {
                $("#name-input").fadeIn();
            });
        })
    }
}



function ucfirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1) + (["?","!"].includes(str[str.length -1]) ? "" : ".");
}

function ucfirstonly(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function skipB() {
    $(".gradient-border").hide()
    $("#name-input").hide();
    $("#bot-input").show();
}