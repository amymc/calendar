/*global BackboneCalendar, $*/


window.BackboneCalendar = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function () {
        'use strict';
        console.log('Hello from Backbone!');
        var new_event = new this.Models.Event({
            date: '10.12.14',
            title: 'product secrets'
        });
        console.log(new_event.summary());
        var view = new this.Views.EventsView({model: new_event});
        $('#calender').append(view.render().el);
    }
};

$(document).ready(function () {
    'use strict';
    BackboneCalendar.init();
});