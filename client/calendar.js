Session.set("dayCount", 10);

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
    },
    modalDateNotes: function() {
        return Notes.find({
            "day": Session.get("modalDate"),
            "visible": {
                $ne: false
            }
        }, {
            sort:  {
                timestamp: -1
            }
        });
    },
    noteName: function(userId) {
        return nameFromId(userId);
    },
    noteNameColor: function(userId) {
        return userColorFromId(userId);
    },
    isMyNote: function(userId) {
        if (Meteor.userId() == userId) {
            return true;
        } else {
            return false;
        }
    }
});

Template.calendar.rendered = function() {
    $('body').on('click', 'button.btn-remove-note', function() {
        var id = $(this).attr("data-note");
        Notes.update({
            _id: id
        }, {
            $set:  {
                visible:  false
            }
        });
    });

    $('body').on('click', 'button#btn-save-note', function() {
        Notes.insert({
            user:  Meteor.user()._id,
            text: $("#frm-note").val(),
            day: Session.get("modalDate")
        }, function() {
            $("#frm-note").val("")
        });
    });
};

Template.calendar.events({
    "click #btn-more-days": function(event) {
        Session.set("dayCount", Session.get("dayCount") + 10);
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
        var date = event.currentTarget.parentNode.parentNode.attributes["data-date"].value;
        Session.set("modalDate", date);
        var day = moment(date).format("dddd D[.]M[.]YYYY");
        $("#msg-modal-day").text(day);
        $("#msg-modal").modal("show");
    }
});
