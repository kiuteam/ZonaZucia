
Z2.Views.Post = Backbone.View.extend({
    tagName: "post",
    className: "post",
    initialize: function() {
        //debugger;
        this.template = _.template($('#post-template').html())
    },
    render: function() {
        var data = this.model.toJSON();
        var html = this.template(data);
        this.$el.html(html);
    }
});
