import PatternLock from './node_modules/patternlock/lib/PatternLock.js';
import $ from './node_modules/jquery/dist/jquery.js'

import './node_modules/patternlock/dist/patternlock.css';
import './main.css'

function map(value, start1, stop1, start2, stop2) {
    return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
}

$.fn.multiline = function(text){
    this.text(text);
    this.html(this.html().replace(/\n/g,'<br/>'));
    return this;
}

var stats = {
    lock: {
        startTime: 0,
        endTime: 0,
        attempts: 1
    },
    color: {
        startTime: 0,
        endTime: 0
    }
}

var components = {
    lock: null
}

var successHandler = {
    lock: () => {
        // Lock is Correct
        stats.lock.endTime = +Date.now()

        components.lock.disable()
        $("#patternHolder").fadeOut(300, () => {
            stats.color.startTime = +Date.now()
            $("#colorPick").fadeIn(300)
        })

        $("body").on('mousemove', function(e) {
            let xPercent = ((e.pageX / $(window).width()).toFixed(4) * 100).toFixed(0)
            let yPercent = ((e.pageY / $(window).height()).toFixed(4) * 100).toFixed(0)

            let R = parseInt(map(xPercent, 0, 100, 0, 256))
            let B = parseInt(map(yPercent, 0, 100, 0, 256))
            let G = parseInt(map(xPercent, 0, 50, 0, 128) + map(yPercent, 50, 100, 128, 256))

            $(this).css({"background-color":`rgb(${R}, ${G}, ${B})`}); 
            
            $("#colorPick h2").text(`#${R.toString(16)}${(G % 256).toString(16)}${B.toString(16)}`.toUpperCase())

            if ((xPercent >= 90) && (yPercent <= 22)) {
                successHandler.color()
            }
        })
    },
    color: () => {
        stats.color.endTime = +Date.now()
        $("body").unbind("mousemove")
        $("#colorPick").fadeOut(1000, function () {
            $("body").css({"background-color":"white"})
            successHandler.results()
        })
    },
    results: () => {
        let lockTime = ((stats.lock.endTime - stats.lock.startTime) / 1000).toFixed(2)
            let colorTime = ((stats.color.endTime - stats.color.startTime) / 1000).toFixed(2)
            $("#results p").multiline(`It took ${lockTime} seconds, and ${stats.lock.attempts} attempt(s) to solve the lock.\nIt took ${colorTime} seconds to solve the color puzzle.`)
        $("#results").fadeIn(500)
    }
}

var errorHandler = {
    lock: () => {
        // Lock is Incorrect
        stats.lock.attempts = stats.lock.attempts + 1;
    }
}

function init() {
    stats.lock.startTime = +Date.now()
    components.lock = new PatternLock('#patternHolder',{
        enableSetPattern : true
    });

    components.lock.checkForPattern('321456987',function(){
        successHandler.lock()
    },function(){
        errorHandler.lock()
    });
}



init()