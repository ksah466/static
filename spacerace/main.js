(function () {


    let isDev = false;

    function initReveal(time) {
        $(".preload").remove()
        $(".reveal").fadeIn(time, "swing")
        Reveal.initialize({
            hash: true,
            navigationMode: "linear",
            touch: true,
            help: false,
            pause: false,
            showNotes: false,
            dependencies: []
        });
    }

    if (isDev) {
        initReveal(0)
    } else {
        let multiplier = window.location.hash == "" || window.location.hash == "#/" ? 800 : 400


        $(".preload").fadeIn(1 * multiplier)
        $(window).on("load", function () {
            $(".preload").fadeOut(2 * multiplier, "swing", function () {
                initReveal(1 * multiplier)
            })
        })
    }
})()