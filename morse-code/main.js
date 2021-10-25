/*eslint-env jquery*/
String.prototype.replaceAll = function(str1, str2, ignore) 
{
    return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
} 

var domEl = {
    firstInput: {
        header: $("body > article > div > div > div:nth-child(2) > div > header > h3"),
        textarea: $("body > article > div > div > div:nth-child(2) > div > div.brick__content > textarea")
    },
    secondInput: {
        header: $("body > article > div > div > div:nth-child(6) > div > header > h3"),
        textarea: $("body > article > div > div > div:nth-child(6) > div > div.brick__content > textarea")
    },
    convertModule: {
        encode: $("body > article > div > div > div.pipe__part-brick.pipe__part-brick--encoder > div > header > ul > li:nth-child(1) > a"),
        decode: $("body > article > div > div > div.pipe__part-brick.pipe__part-brick--encoder > div > header > ul > li:nth-child(2) > a"),
        short: $("#u3"),
        long: $("#u4"),
        space: $("#u5"),
        bottomText: $("body > article > div > div > div.pipe__part-brick.pipe__part-brick--encoder > div > footer > div.brick__status-message")
    },
    mode: "encode"
}

var morseDict = {
    letterToMorse: null,
    morseToLetter: null,
}
morseDict.letterToMorse = {
    "A": "•-",
    "B": "-•••",
    "C": "•-•-",
    "D": "-••",
    "E": "•",
    "F": "••-•",
    "G": "--•",
    "H": "••••",
    "I": "••",
    "J": "•---",
    "K": "-•-",
    "L": "•-••",
    "M": "--",
    "N": "-•",
    "O": "---",
    "P": "•--•",
    "Q": "--•-",
    "R": "•-•",
    "S": "•••",
    "T": "-",
    "U": "••-",
    "V": "•••-",
    "W": "•--",
    "X": "-••-",
    "Y": "-•--",
    "Z": "--••",
    ".": "•-•-•-",
    ",": "--••--"
}
morseDict.morseToLetter = Object.assign({}, ...Object.entries(morseDict.letterToMorse).map(([a,b]) => ({ [b]: a })))

function translateToMorse(input) {
    return input.split("").map(e => {
        let o = morseDict.letterToMorse[e];
        if (e === " ") {
            return "$"
        } else if (o == null) {
            return "?" // {err : `Char "${e}" is not defined in Morse Code`}
        } else {
            return o
        }
    }).join(" ")
}
function translateToEnglish(input) {
    return input.split(" ").map(e => {
        let o = morseDict.morseToLetter[e];
        
        if (e == "$" || e == "") {
            return "$"
        } else if (o == null) {
            return "?" // {err : `Char "${e}" is not defined in Morse Code`}
        } else {
            return o
        }
    }).join("")
}

function changeMode(value) {
    if (value == "encode") {
        domEl.mode = value
        // changeMode is set to encode
        domEl.firstInput.header.text("Plaintext")
        domEl.secondInput.header.text("Ciphertext")

        domEl.convertModule.decode.removeClass("brick__action--active")
        domEl.convertModule.encode.addClass("brick__action--active")

        // Swap text when they are switched
        let firstText = domEl.firstInput.textarea.val()
        let secondText = domEl.secondInput.textarea.val()
        domEl.firstInput.textarea.val(secondText)
        domEl.secondInput.textarea.val(firstText)
    } else if (value == "decode") {
        domEl.mode = value
        // changeMode is set to decode
        domEl.firstInput.header.text("Ciphertext")
        domEl.secondInput.header.text("Plaintext")

        domEl.convertModule.encode.removeClass("brick__action--active")
        domEl.convertModule.decode.addClass("brick__action--active")

        // Swap text when they are switched
        let firstText = domEl.firstInput.textarea.val()
        let secondText = domEl.secondInput.textarea.val()
        domEl.firstInput.textarea.val(secondText)
        domEl.secondInput.textarea.val(firstText)
    }
}

function convert(mode) {
    let short = domEl.convertModule.short.val()
    let long = domEl.convertModule.long.val()
    let space = domEl.convertModule.space.val()

    if (mode == "encode") {
        let output = translateToMorse(domEl.firstInput.textarea.val().toUpperCase()).replaceAll("•", short).replaceAll("-", long).replaceAll("$", space)
        domEl.secondInput.textarea.val(output)
    } else if (mode == "decode") {
        let output = translateToEnglish(domEl.firstInput.textarea.val().replaceAll(short, "•").replaceAll(long, "-").replaceAll(space, "$"))
        domEl.secondInput.textarea.val(output.replaceAll("$", " "))
    }
}

function update() {
    // Check if inputs are valid
    /*
    if (domEl.convertModule.short.val().length == 0) {
        domEl.convertModule.short.addClass("field--invalid")
        return
    } else {
        domEl.convertModule.short.removeClass("field--invalid")
    }
    if (domEl.convertModule.long.val().length == 0) {
        domEl.convertModule.long.addClass("field--invalid")
        return
    } else {
        domEl.convertModule.long.removeClass("field--invalid")
    }
    if (domEl.convertModule.space.val().length == 0) {
        domEl.convertModule.space.addClass("field--invalid")
        return
    } else {
        domEl.convertModule.space.removeClass("field--invalid")
    }
    */


    let t0 = performance.now();

    // do something
    convert(domEl.mode)

    let t1 = performance.now();

    domEl.convertModule.bottomText.text(`Encoded ${domEl.firstInput.textarea.val().length} chars in ${(t1 - t0).toFixed(2)}ms`)
}

function init() {
    changeMode("encode")

    $(".field-text").each(() => $(this).on('input', update))

    $("textarea").each(() => $(this).on('input', update))

    $("#decodeBtn").on('click', () => changeMode('decode'))
    $("#encodeBtn").on('click', () => changeMode('encode'))

    domEl.firstInput.textarea.val("A quick brown fox jumps over the lazy dog.")
    domEl.convertModule.short.val("•")
    domEl.convertModule.long.val("-")
    domEl.convertModule.space.val("/")

    update()    
}

init()