/*global BackboneCalendar, Backbone, JST*/

BackboneCalendar.Views = BackboneCalendar.Views || {};

(function () {
    'use strict';

    BackboneCalendar.Views.EventsView = Backbone.View.extend({

        template: JST['app/scripts/templates/EventsView.ejs'],

        tagName: 'div',

        id: 'calendar',

        className: '',
        
        el: '#calendar',

        events: {},

        initialize: function () {
            _.bindAll(this, this.render);

            this.collection.bind('reset', this.addAll);
        },
        
        

        render: function () {
           this.el.fullCalendar({
                header: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'month,basicWeek,basicDay',
                    ignoreTimezone: false
                },
                selectable: true,
                selectHelper: true,
                editable: true
            });
        },
        addAll: function(){
            this.el.fullCalendar('addEventSource', this.collection.toJSON());
        }
           
    });
    
})();