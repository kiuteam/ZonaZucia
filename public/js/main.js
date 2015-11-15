window.Z2 = {};
Z2.Views = {};
Z2.Collections = {};
Z2.Models = {};
Z2.Routers = {};

window.collections = {};
window.views = {};
var logged = false;


function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
}
$(document).ready(function(){/* off-canvas sidebar toggle */
    var myvar = getURLParameter('user');
    console.log(myvar);

    if (!myvar){
        $(".well").hide();
        $("#plusbutton").hide();
        //return false;
    } else {
        $(".well").show();
        $("#plusbutton").show();

        $.ajax({
            type: "GET",
            url: "http://localhost:3000/api/user/"+myvar,
            success: function (data) {
                console.log(data);
                window.user = data;
            }
        });
    }




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


    window.collections.zonas = new Z2.Collections.Zonas();
    window.collections.zonas.on('add',function(model){
        console.log('se ha agregado una zona', model.toJSON());
        // agregar nuevas vistas de post aqui

        var view = new Z2.Views.Zona({model: model});
        view.render();
        view.$el.appendTo('.zonas');
    });
    window.collections.zonas.fetch();




    $('#mainsubmit').click(function(){
        var locationData = {
            latitude: window.position.coords.latitude,
            longitude: window.position.coords.longitude
        };


        jQuery.ajax({
            url: 'http://localhost:3000/api/location',
            data: JSON.stringify(locationData),
            beforeSend: function (xhrObj) {
                xhrObj.setRequestHeader("Content-Type", "application/json");
                //xhrObj.setRequestHeader("Accept","application/json");
            },
            type: 'POST',
            success: function (data) {
                if(data.file) {
                    var imggoogleID = data.file._id,
                        zoneName = $('#zoneName').val(),
                        description = $('#description').val(),
                        userID = window.user._id || '123456',
                        userName =  window.user.facebook.name || 'Anonimus',
                        userEmail = window.user.facebook.email || 'anonimus@f.com',
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
                                zoneName: zoneName,
                                "description": description,
                                "user":{
                                    "userId": userID,
                                    "name": userName,
                                    "email": userEmail
                                },
                                "images":{
                                    "locations":{
                                        "imageId": imggoogleID,
                                        "latitude": window.position.coords.latitude,
                                        "longitude": window.position.coords.longitude
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
                            //rendering data
                            collections.posts.add(data);

                        }
                    });
                }
            }
        });
    });



    $('#mainsubmit2').click(function(){
        var locationData = {
            latitude: window.position.coords.latitude,
            longitude: window.position.coords.longitude
        };


        jQuery.ajax({
            url: 'http://localhost:3000/api/location',
            data: JSON.stringify(locationData),
            beforeSend: function (xhrObj) {
                xhrObj.setRequestHeader("Content-Type", "application/json");
                //xhrObj.setRequestHeader("Accept","application/json");
            },
            type: 'POST',
            success: function (data) {
                if(data.file) {
                    var imggoogleID = data.file._id,
                        zoneName = $('#zoneName2').val(),
                        description = $('#description2').val(),
                        userID = "5647bcd51dec3c0c76c31bcf",
                        userName =  "Juan Perez",
                        userEmail = "juan@aaa.com",
                        imgID = "";
                    var dataFile = new FormData();
                    jQuery.each(jQuery('#inputFile2')[0].files, function(i, file) {
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
                                zoneName: zoneName,
                                "description": description,
                                "user":{
                                    "userId": userID,
                                    "name": userName,
                                    "email": userEmail
                                },
                                "images":{
                                    "locations":{
                                        "imageId": imggoogleID,
                                        "latitude": window.position.coords.latitude,
                                        "longitude": window.position.coords.longitude
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
                            //rendering data
                            collections.posts.add(data);

                        }
                    });
                }

            }
        });
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


            window.map2 = new GMap2(document.getElementById("myMapContainerId2"));
            console.log(position);
            map2.setCenter(new GLatLng(position.coords.latitude, position.coords.longitude), 16);
            map2.addControl(new GLargeMapControl3D());
            map2.addControl(new GMapTypeControl());

            var point2 = new GPoint(position.coords.longitude, position.coords.latitude);
            var marker2= new GMarker(point2);  // Create the marker
            map2.addOverlay(marker2);
            // And open some infowindow, with some HTML text in it
            marker2.openInfoWindowHtml(
                '<strong>Usted esta aqui. </strong>'
            );
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