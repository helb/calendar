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
    }
});
