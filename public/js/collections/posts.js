/**
 * Created by rodrigoquelcasirpa on 14/11/15.
 */
Z2.Collections.Posts = Backbone.Collection.extend({
    model: Z2.Models.Post,
    url: 'api/posts',
    name: 'posts'
});