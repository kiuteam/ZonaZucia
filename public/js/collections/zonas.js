/**
 * Created by rodrigoquelcasirpa on 15/11/15.
 */
Z2.Collections.Zonas = Backbone.Collection.extend({
    model: Z2.Models.Zona,
    url: 'api/zonas',
    name: 'zonas'
});