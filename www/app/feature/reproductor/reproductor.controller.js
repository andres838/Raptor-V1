(function () {
    "use strict";

    angular
        .module('reproductorModule')
        .controller('reproductorCtrl', reproductorCtrl);

    //Inyeccion de dependencias
    reproductorCtrl.$inject = ['$stateParams', '$state', 'appService'];

    function reproductorCtrl($stateParams, $state, appService) {

        var vm = this;
        vm.playerFull = playerFull;
        vm.imgCover;
        vm.urlAudio;


        //datos control Media
        vm.data_controls = {
            track: '',
            artist: '',
            cover: '',

            isPlaying: true,
            dismissable: false,

            hasPrev: true,
            hasNext: true,
            hasClose: false,

            ticker: 'Escuchando ' /*app.reproductor.playList[app.result.itemSeleted].titulo*/
        };        

        function playerFull(id) {
            var data = 'id='+id;
            appService.download(data).then(function(response){
                vm.urlAudio = response.data.data.data;
                
            });
        }   

        soundManager.setup({
            url: '/path/to/swf-files/',
            flashVersion: 9, // optional: shiny features (default = 8)
            // optional: ignore Flash where possible, use 100% HTML5 mode
            // preferFlash: false,
            onready: function() {// Ready to use; soundManager.createSound() etc. can now be called.
            }
        });


        

        vm.eventsBkg = {
            getColorPalette: function () {
                var img = document.getElementById('img_cover_detail');
                RGBaster.colors(img, {
                    exclude: ['rgb(255,255,255)', 'rgb(0,0,0)', 'rgb(233, 233, 233)',
                                "rgb(234,234,234)", "rgb(235,235,235)", "rgb(232,232,232)",
                                "rgb(236,236,236)", "rgb(237,237,237)", "rgb(228,228,228)",
                                "rgb(230,230,230)", "rgb(229,229,229)", "rgb(238,238,238)", "rgb(238,238,238)"],
                    success: function (payload) {
                        /*$(".song-detail").css({ "background-color": payload.dominant });
                        $("#_reproductor_").css({ "background-color": payload.dominant });
                        app.reproductor.changeControlsColors(payload.dominant);*/
                    }
                });
            },
            colorControlsPlayer: "",
            changeControlsColors: function (rgb) {
                rgb = rgb.replace("rgb(", "").replace(")", "");
                rgb = rgb.split(',')
                rgb = eval(rgb.join("+")) / 3;
                if (rgb <= 127) {
                   /* $("#lbl_title_alt").css({ color: "#fff" });
                    $("#lbl_artist_alt").css({ color: "#fff" });
                    $("#currentTime").css({ color: "#fff" });
                    $("#totalTime").css({ color: "#fff" });
                    $(".progress-bar").css({ "background-color": "#fff" });
                    $(".progress-bar-inverse").css({ "background-color": "#2b2b2b" });
                    $("#btn_back_detail")[0].src = "img/ic_skip_previous_white_24px.svg";
                    $("#btn_play_pause_detail")[0].src = "img/ic_pause_white_24px.svg";
                    $("#btn_next_detail")[0].src = "img/ic_skip_next_white_24px.svg";
                    app.reproductor.colorControlsPlayer = "blanco";*/
                } else {
                    /*$("#lbl_title_alt").css({ color: "#000" });
                    $("#lbl_artist_alt").css({ color: "#000" });
                    $("#currentTime").css({ color: "#000" });
                    $("#totalTime").css({ color: "#000" });
                    $(".progress-bar").css({ "background-color": "#000" });
                    $(".progress-bar-inverse").css({ "background-color": "#CCCCCC" }) ;
                    $("#btn_back_detail")[0].src = "img/ic_skip_previous_black_24px.svg";
                    $("#btn_play_pause_detail")[0].src = "img/ic_pause_black_24px.svg";
                    $("#btn_next_detail")[0].src = "img/ic_skip_next_black_24px.svg";
                    app.reproductor.colorControlsPlayer = "negro";*/
                }

            }
        };


        function start_remote_controls(data) {
            MusicControls.destroy(onSuccess_control, onError_control);
            MusicControls.create(data, onSuccess_control, onError_control);
            function events(action) {
                switch(action) {
                    case 'music-controls-next':
                        /*app.reproductor.next();*/
                        break;
                    case 'music-controls-previous':
                        /*app.reproductor.back();*/
                        break;
                    case 'music-controls-pause':
                        /*app.reproductor.playPause();*/
                        break;
                    case 'music-controls-play':                
                        /*app.reproductor.playPause();*/
                        break;
                    case 'music-controls-destroy':
                        alert("fuera");
                        break;

                    // // Headset events (Android only)
                    // case 'music-controls-media-button' :
                    //     // Do something
                    //     break;
                    // case 'music-controls-headset-unplugged':
                    //     // Do something
                    //     break;
                    // case 'music-controls-headset-plugged':
                    //     // Do something
                    //     break;
                    // default:
                    //     break;
                }
            }

            // Register callback
            MusicControls.subscribe(events);

            // Start listening for events
            // The plugin will run the events function each time an event is fired
            MusicControls.listen();

        }

        function onSuccess_control() {
            //alert("Exito");
        }

        function onError_control() {
            alert("Error en controles externos de la aplicacion");
        }

    }
})();