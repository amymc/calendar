/*global BackboneCalendar, Backbone*/

BackboneCalendar.Collections = BackboneCalendar.Collections || {};

(function () {
    'use strict';

    BackboneCalendar.Collections.Events = Backbone.Collection.extend({

        model: BackboneCalendar.Models.Event,
        url: 'events'
    });

})();