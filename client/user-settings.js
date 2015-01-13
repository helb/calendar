Template.user_settings.helpers({
    userHasCalendar: function(userId) {
        return Meteor.users.find({
            _id: userId
        }).fetch()[0].profile.calendar;
    }
});

Template.user_settings.rendered = function() {
    $("input.checked").prop('checked', true);
}

Template.user_settings.events({
    'click .btn-change-color': function(event) {
        var newColor = event.currentTarget.classList[1];
        Meteor.users.update({
            _id:  Meteor.user()._id
        }, {
            $set: {
                "profile.color": newColor
            }
        });
    },
    'change #check-calendar': function(event) {
        var isChecked = event.currentTarget.checked;
        Meteor.users.update({
            _id:  Meteor.user()._id
        }, {
            $set: {
                "profile.calendar": isChecked
            }
        });
    },
});
