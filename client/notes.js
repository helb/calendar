Template.notes.created = function() {
    if (typeof(Session.get("notesDate")) == "undefined") {
        var urlDay = window.location.hash.substr(1);
        if (/^\d{4}-\d{2}-\d{2}$/.test(urlDay)) {
            Session.set("notesDate", urlDay);
        } else {
            Session.set("notesDate", moment().format("YYYY-MM-DD"));
        }
    }

    var baseUrl = window.location.href.split('#')[0];
    window.location.replace(baseUrl + '#' + Session.get("notesDate"));
};

Template.notes.helpers({
    notesDay: function() {
        return moment(Session.get("notesDate")).format("dddd D[.]M[.]YYYY");
    },
    notesForDay: function() {
        return Notes.find({
            "day": Session.get("notesDate"),
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
    },
    date: function(timestamp) {
        if (timestamp) {
            return moment(timestamp).calendar();
        } else  {
            return null;
        }
    },
});

Template.notes.events({
    "click #btn-save-note": function(event) {
        var button = event.currentTarget;
        button.classList.add("loading");
        Notes.insert({
            user:  Meteor.user()._id,
            text: $("#frm-note").val(),
            day: Session.get("notesDate"),
            timestamp: new Date()
        }, function() {
            button.classList.remove("loading");
            $("#frm-note").val("");
        });
    },

    "click .btn-remove-note": function(event) {
        var button = event.currentTarget;
        button.classList.add("loading");
        var id = button.attributes["data-note"].value;
        Notes.update({
            _id: id
        }, {
            $set:  {
                visible:  false
            }
        }, function() {
            button.classList.remove("loading");
        });
    },

    "click #btn-back-to-calendar": function(event) {
        Router.go("calendar")
    }

});
