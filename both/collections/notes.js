Notes = new Meteor.Collection("notes", {
    schema: new SimpleSchema({
        text: {
            type: String
        },
        user: {
            type: String
        },
        day: {
            type: String
        },
        timestamp: {
            type: Date
        },
        visible:  {
            type: Boolean,
            defaultValue: true
        }
    })
});

Notes.allow({
    insert: function(userId, doc) {
        return !!userId;
    },
    update: function(userId, doc, fields, modifier) {
        return doc.user === userId;
    },
    remove: function(userId, doc) {
        return false;
    }
});