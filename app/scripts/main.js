/*global BackboneCalendar, $*/

(function ($) {

  var events =
        [{title:"JS the good parts", start:"2014-19-10"}];

    var Event = Backbone.Model.extend({
        defaults:{
            title  : 'event1',
            start  : '2014-19-10'
        }
    });

    var EventsList = Backbone.Collection.extend({
        model: Event,
        url: 'events'
    });

    var EventView = Backbone.View.extend({
        tagName:"div",
        className:"eventContainer",
        template:$("#eventTemplate").html(),

        render:function () {
            var tmpl = _.template(this.template); //tmpl is a function that takes a JSON object and returns html

            this.$el.html(tmpl(this.model.toJSON())); //this.el is what we defined in tagName. use $el to get access to jQuery html() function
            return this;
        }
    });

    var EventsListView = Backbone.View.extend({
      //tie the view to the '#events' div
       el:$("#events"),

        initialize:function(){
            //EventsList constructor is called with the array of event properties from line 05, creating a collection of Event models
            this.collection = new EventsList(events);
            this.render();

            //when a new event is added to the collection the collection will fire the renderEvent function
            this.collection.on("add", this.renderEvent, this);
        },

         render: function() {

            this.$el.fullCalendar({
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

           var that = this;
            //The render function iterates over the EventsList collection and calls renderEvent for each Event model
            _.each(this.collection.models, function(item){
                that.renderEvent(item);
            }, this);
        },

       addAll: function(e){
            e.preventDefault();
            var formData = {};

            //iterating over the input elements in the form and adding them to the events array
            $("#addEvent div").children("input").each(function(i, el){
                if ($(el).val() !== "") {
                    formData[el.id] = $(el).val();
                }
            });

            events.push(formData);

            //new event model is added to the collection
            this.collection.add(new Event(formData));
        },

        events:{
            //addAll called on button click
            "click #add":"addAll"
        },

        renderEvent:function(item){
           //creates a new EventView from the given Event model
            var eventView = new EventView({
                model: item
            });
            //The render function of EventView is called and the result is appended to the events div
            this.$el.append(eventView.render().el);
            console.log(item.toJSON());
            this.$el.fullCalendar('addEventSource', item.toJSON());
        }
    });

    //call the EventsListView constructor
    var eventsListView = new EventsListView();


})(jQuery);
