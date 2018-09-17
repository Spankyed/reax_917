(function() {
  app
  .value('mockSubjects',[
    {
    'id': 1,
    'label': 'Math',
    'items': [
      {
        'id': 11,
        'label': 'Algebra',
        'items': [
          {
            'id': 111,
            'label': 'ALG 1',
            'items': []
          }
        ]
      },
      {
        'id': 12,
        'label': 'Geometry',
        'items': []
      }
    ]
  }, {
    'id': 2,
    'label': 'Science',
    'items': [
      {
        'id': 21,
        'label': 'Chemistry',
        'items': []
      },
      {
        'id': 22,
        'label': 'Biology',
        'items': []
      }
    ]
}]);

})()