let startQueue = [documentLoaded]

let slider = {
    current: 0,
    total: startQueue.length,
    add() {
        slider.current += 1;
        document.getElementById("slider").setAttribute("value", (100 * slider.current) / slider.total)
    }
}

function delay() {
    return new Promise(resolve => setTimeout(() => resolve(), 500))
}

async function documentLoaded() {
    await new Promise((resolve) => {
        window.addEventListener('load', () => resolve());
    })

    // Fix loading animations
    document.querySelector("body").classList.remove("preload")
}

// Main method
Promise.all(startQueue.map(asyncFunction => asyncFunction().then(slider.add)))
    .then(() => {
        document.getElementById("start").disabled = false;
    })
