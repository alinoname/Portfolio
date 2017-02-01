document.addEventListener("DOMContentLoaded", function(event) {


    var hero = document.querySelector('.hero');

    function toggler() {
        hero.classList.toggle("secImg")
    }


    var interval;


    WebMidi.enable(function(err) {

        if (document.cookie = undefined) {

            let cookieR = document.cookie = "r=100";
            let cookieG = document.cookie = "g=50";
            let cookieB = document.cookie = "b=1";
            let cookieA = document.cookie = "a=127";

        } else {



            // if (err) {
            //     console.log("WebMidi could not be enabled.", err);
            // } else {
            //     console.log("WebMidi enabled!");
            // }
            var slices = document.cookie.split('; ');
            // console.log(slices[1]);
            let cookieR = document.cookie = "r=100";
            let cookieG = document.cookie = "g=50";
            let cookieB = document.cookie = "b=1";
            let cookieA = document.cookie = "a=127";

            const body = document.querySelector("body");
            let r = cookieR.substring(2),
                g = cookieG.substring(2),
                b = cookieB.substring(2),
                a = cookieA.substring(2);
            let color = "";
            var input = WebMidi.getInputByName("Maschine Controller In");
            var output = WebMidi.getOutputByName("Maschine Controller Out");

            output.sendControlChange(14, cookieR.substring(2), 1);
            output.sendControlChange(15, cookieG.substring(2), 2);
            output.sendControlChange(16, cookieB.substring(2), 3);
            output.sendControlChange(17, cookieA.substring(2), 4);

            function changer() {
                let color = "rgba(" + Math.floor(r.toString() * (255 / 127)) + "," + Math.floor(g.toString() * (255 / 127)) + "," + Math.floor(b.toString() * (255 / 127)) + "," + (a.toString()) / 127 + ")";

                body.style.backgroundColor = color;
                console.log(color);
            }
            changer();

            //         let Data = {
            // r:"",
            //       senCookie : function () {
            //
            //         let y = Data.
            //
            //       }
            // }

            input.addListener('controlchange', 1,
                function(x) {
                    r = x.value;
                    changer();
                    let cookieR = document.cookie = "r=" + r;
                });
            input.addListener('controlchange', 2,
                function(y) {
                    g = y.value;
                    changer();
                    let cookieG = document.cookie = "g=" + g;
                });
            input.addListener('controlchange', 3,
                function(z) {
                    b = z.value;
                    changer();
                    let cookieB = document.cookie = "b=" + b;
                });
            input.addListener('controlchange', 4,
                function(v) {
                    a = v.value;
                    changer();
                    let cookieA = document.cookie = "a=" + a;
                });
            input.addListener('controlchange', 16,
                function(v) {

                    clearInterval(interval);

                    interval = setInterval(toggler, 500);



                });
                input.addListener('controlchange', 15,
                    function(v) {

                        clearInterval(interval);





                    });


        };
    });


});
