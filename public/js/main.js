window.Z2 = {};
Z2.Views = {};
Z2.Collections = {};
Z2.Models = {};
Z2.Routers = {};

window.collections = {};
window.views = {};

$(document).ready(function(){/* off-canvas sidebar toggle */
   console.log("mail.js loaded");
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

});

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