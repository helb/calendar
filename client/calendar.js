Template.calendar.created = function() {
    if (typeof(Session.get("dayCount")) == "undefined") {
        Session.set("dayCount", 10);
    }

    window.location.hash = "";
};

Template.calendar.helpers({
    days: function() {
        var count = Session.get("dayCount");
        if (typeof count != "number") {
            var count = 10;
        }
        var days = [];
        for (var i = 0; i < count; i++) {
            day = moment().startOf("day").add(i, "days");
            if (day.day() == 0 || day.day() == 6) {
                var weekend = true;
            } else {
                var weekend = false;
            }
            var notes = Notes.find({
                "visible": {
                    $ne: false
                },
                "day": {
                    $regex: ".*" + day.format("YYYY-MM-DD") + ".*"
                }
            }).fetch();
            if (notes.length > 0) {
                var hasNotes = true;
            } else {
                var hasNotes = false;
            }
            days[i] = {
                "date": day.format("YYYY-MM-DD"),
                "date_display": day.format("D[.]M[.]"),
                "day_name": day.format("dddd"),
                "day_short": day.format("dd"),
                "weekend": weekend,
                "hasNotes": hasNotes
            }
        }
        return days;
    },
    weekdays: function() {
        return [{
            day: "pondělí",
            number: 1
        }, {
            day: "úterý",
            number: 1
        }, {
            day: "středa",
            number: 3
        }, {
            day: "čtvrtek",
            number: 4
        }, {
            day: "pátek",
            number: 5
        }, {
            day: "sobota",
            number: 6
        }, {
            day: "neděle",
            number: 0
        }, ];
    },
    willCome: function(user, date) {
        if (Meteor.users.find({
                _id: user,
                "profile.days": {
                    $regex: ".*" + date + ".*"
                }
            }).fetch().length == 1) {
            return true;
        } else {
            return false;
        }
    },
    isMyColumn: function(userId) {
        if (Meteor.userId() == userId) {
            return true;
        } else {
            return false;
        }
    },
    calendarUsers: function() {
        return Meteor.users.find({
            "profile.calendar": true
        }, {
            sort: {
                "profile.name": 1
            }
        }).fetch();
    }
});

Template.calendar.events({
    "click #btn-more-days": function(event) {
        var button = event.currentTarget;
        button.classList.add("loading");
        Session.set("dayCount", Session.get("dayCount") + 10);
        setTimeout(function() {
            button.classList.remove("loading");
        }, 1000);
    },

    "click .btn-enable": function(event) {
        var button = event.currentTarget;
        button.classList.add("loading");
        var userId = button.attributes["data-user"].value;
        var date = button.parentNode.parentNode.attributes["data-date"].value;
        if (button.classList.contains("green")) {
            Meteor.users.update({
                _id: userId
            }, {
                $pull: {
                    "profile.days": date
                }
            }, function() {
                button.classList.remove("loading");
            });
        } else {
            Meteor.users.update({
                _id: userId
            }, {
                $push: {
                    "profile.days": date
                }
            }, function() {
                button.classList.remove("loading");
            });
        }
    },

    "click .btn-day": function(event) {
        var button = event.currentTarget;
        button.classList.add("loading");
        var date = button.parentNode.parentNode.attributes["data-date"].value;
        Session.set("notesDate", date);
        Router.go("notes");
        button.classList.remove("loading");
    }
});
