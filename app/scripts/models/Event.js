/*global BackboneCalendar, Backbone*/

BackboneCalendar.Models = BackboneCalendar.Models || {};

(function () {
    'use strict';

    BackboneCalendar.Models.Event = Backbone.Model.extend({

        initialize: function() {
            console.log(JSON.stringify(this));
        },
        
        summary: function() {
            return this.get('title') + this.get('date');
        }
        
    });

})();