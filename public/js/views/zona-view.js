
Z2.Views.Zona = Backbone.View.extend({
    tagName: "zona",
    className: "zona",
    initialize: function() {
        //debugger;
        this.template = _.template($('#zona-template').html())
    },
    render: function() {
        var data = this.model.toJSON();
        var html = this.template(data);
        this.$el.html(html);
    }
});
