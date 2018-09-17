(function() {
    app
    .value('mockAreas',[
        { id: 1, value: 'cafeteria', checked: true, isSelected: false },
        { id: 2, value: 'hall a', checked: true, isSelected: false },
        { id: 3, value: 'hall b', checked: false, isSelected: true },
        { id: 4, value: 'gym', checked: false, isSelected: false }
    ])
    .value('mockGrades',[
        { id: 1, value: '1', checked: true, isSelected: false },
        { id: 2, value: '2', checked: true, isSelected: true },
        { id: 3, value: '3', checked: false, isSelected: false },
        { id: 4, value: '4', checked: false, isSelected: false }
    ])    
    .value('mockPeriods',[
        { id: 1, value: '1', checked: true, isSelected: false },
        { id: 2, value: '2', checked: true, isSelected: true },
        { id: 3, value: '3', checked: false, isSelected: false },
        { id: 4, value: '4', checked: false, isSelected: false }
    ]);
  
  })()