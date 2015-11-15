Z2.Views.App = Backbone.View.extend({
    events: {
        "click .publica" : "showForm",
        "click #mainSubmit": "createPost"

    },
    initialize: function($el){
       this.$el = $el;
    },
    showForm: function () {
        //this.$el.find('Form').show();
    },
    createPost: function(e){
        e.preventDefault();
        //var title = $('input[name=titulo]').val(),
        //    username = "rodrigo quelca",
        //    description = $('input[name=description]').val();
        var data = {
            "zonaId":"5647bcd51dec3c0c76c31bcf",
                "description":"dhkjlsdalkjvksjav",
                "user":{
                "userId":"5647bcd51dec3c0c76c31bcf",
                    "name":"patito",
                    "email":"a@a.com"
            },
            "images":{
                "locations":{
                    "imageId":"5647bcd51dec3c0c76c31bcf",
                        "latitude":30,
                        "longitude":50
                },
                "image":"5647bcd51dec3c0c76c31bcf"
            }
        };
        var model = new Z2.Models.Post(data);
        model.save();

    }
});