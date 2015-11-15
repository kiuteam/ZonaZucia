window.Z2 = {};
Z2.Views = {};
Z2.Collections = {};
Z2.Models = {};
Z2.Routers = {};

window.collections = {};
window.views = {};

$(document).ready(function(){/* off-canvas sidebar toggle */
   console.log("main.js loaded");
   window.views.app = new Z2.Views.App( $('body') );

    window.collections.posts = new Z2.Collections.Posts();
    window.collections.posts.on('add',function(model){
        console.log('se ha agregado un modelo', model.toJSON());
        // agregar nuevas vistas de post aqui

        var view = new Z2.Views.Post({model: model});
        view.render();
        view.$el.prependTo('.posts');
    });
    window.collections.posts.fetch();

    $('#mainsubmit').click(function(){
        var locationData = {
            latitude: window.position.latitude,
            longitude: window.position.longitude
        };

        jQuery.ajax({
            url: 'http://localhost:3000/api/location',
            data: locationData,
            cache: false,
            contentType: false,
            processData: false,
            type: 'POST',
            success: function (data) {
                if(data.file) {
                    var imggoogleID = data.file._id,
                        zonaName = $('#zonaName').val(),
                        description = $('#description').val(),
                        userID = "5647bcd51dec3c0c76c31bcf",
                        userName =  "Juan Perez",
                        userEmail = "juan@aaa.com",
                        imgID = "";
                    var dataFile = new FormData();
                    jQuery.each(jQuery('#inputFile')[0].files, function(i, file) {
                        dataFile.append('image', file);
                    });
                    jQuery.ajax({
                        url: 'http://localhost:3000/api/upload',
                        data: dataFile,
                        cache: false,
                        contentType: false,
                        processData: false,
                        type: 'POST',
                        success: function(data){
                             imgID = data.file._id || '';
                            var data = {
                                //"zonaId":"5647bcd51dec3c0c76c31bcf",
                                zonaName: zonaName,
                                "description": description,
                                "user":{
                                    "userId": userID,
                                    "name": userName,
                                    "email": userEmail
                                },
                                "images":{
                                    "locations":{
                                        "imageId": imggoogleID,
                                        "latitude": window.position.latitude,
                                        "longitude": window.position.longitude
                                    },
                                    "image": imgID
                                }
                            };
                            $.ajax({
                                type: "POST",
                                url: "http://localhost:3000/api/post",
                                data: JSON.stringify(data),
                                beforeSend: function (xhrObj) {
                                    xhrObj.setRequestHeader("Content-Type", "application/json");
                                    //xhrObj.setRequestHeader("Accept","application/json");
                                },
                                success: function (data) {
                                    console.log('almacenamiento exitoso');
                                }
                            });

                        }
                    });



                }

            }


        });



    //

    //    console.log(data);
    //    console.log('mainbutton  clic event');

    //
    //
    //    });
    //
    });
    setupMap();
});

window.setupMap = function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            window.map = new GMap2(document.getElementById("myMapContainerId"));
            console.log(position);
            map.setCenter(new GLatLng(position.coords.latitude, position.coords.longitude), 16);
            map.addControl(new GLargeMapControl3D());
            map.addControl(new GMapTypeControl());

            var point = new GPoint(position.coords.longitude, position.coords.latitude);
            var marker = new GMarker(point);  // Create the marker
            map.addOverlay(marker);
            // And open some infowindow, with some HTML text in it
            marker.openInfoWindowHtml(
                '<strong>Usted esta aqui. </strong>'
            );
            window.position = position;
        });

    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }



};

/*
 metadata
 zonaLocation: {
 id:
 titulo:
 descripcion:
 user:{
 id:
 image:
 name:
 email:
 }
 images: {
 image:
 latitud:
 longitud:
 }
 image: id


 }

 * */