const devMode = false;

let startQueue = [documentLoaded]

let slider = {
    current: 0,
    total: startQueue.length,
    add() {
        slider.current += 1;
        document.querySelector("#start progress").setAttribute("value", (100 * slider.current) / slider.total)
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(() => resolve(), ms))
}

async function documentLoaded() {
    await new Promise((resolve) => {
        window.addEventListener('load', () => resolve());
    })
}

let user = {
    country: "ml",
    get flag() {
        return `https://www.countryflags.io/${user.country}/flat/64.png`
    }
}

async function getCountry() {
    let location = await fetch("https://extreme-ip-lookup.com/json/").then(res => res.json())
    user.country = location.countryCode.toLowerCase();
}

// Main method
Promise.all(startQueue.map(asyncFunction => asyncFunction().then(slider.add)))
    .then(() => {
        // Fix loading animations
        document.querySelector("body").classList.remove("preload")

        document.querySelector("#start button").disabled = false;
        document.querySelector("#start button").onclick = transitionToCategories
    })

async function transitionToCategories() {
    document.querySelector("#start").style.opacity = 0;
    if (!devMode) await delay(250);
    document.querySelector("#start").remove()
    document.querySelector("#categories").style.display = "";
}

if (devMode) {
    transitionToCategories()
}