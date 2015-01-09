Template.kalendar.helpers({
  days: function (count) {
    count = 30;
    var days = [];
    for (var i = 0; i < count; i++) {
      days[i] = {
        date: moment().startOf('day').add(i, 'days'),
        date_display: moment().startOf('day').add(i, 'days').format("dddd D[.]M[.]")
      }
    }
    return days;
  }
});