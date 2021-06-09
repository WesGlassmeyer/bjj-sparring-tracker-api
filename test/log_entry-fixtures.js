function makeLogEntriesArray() {
  return [
    {
      user_id: 1,
      date: "2021-05-21",
      rounds: 1,
      round_length: 1,
      cardio: 2,
      notes: "words",
    },
    {
      user_id: 1,
      date: "2021-04-20",
      rounds: 5,
      round_length: 5,
      cardio: 1,
      notes: "hey dare",
    },
  ];
}

function makeMovesArray() {
  return [
    {
      category: "subs",
      count: 2,
      name: "Triangle",
    },
    {
      category: "taps",
      count: 7,
      name: "Kimura",
    },
    {
      category: "sweeps",
      count: 6,
      name: "Flower Sweep",
    },
    {
      category: "sweeps",
      count: 30,
      name: "Knee Lever",
    },
    {
      category: "subs",
      count: 4,
      name: "Rear Naked Choke",
    },
    {
      category: "taps",
      count: 14,
      name: "Americana",
    },
    {
      category: "sweeps",
      count: 12,
      name: "Hip Sweep",
    },
    {
      category: "sweeps",
      count: 60,
      name: "Pendulum Sweep",
    },
  ];
}

function makeMovesPivotArray() {
  return [
    {
      log_entry_id: 2,
      move_id: 1,
    },
    {
      log_entry_id: 2,
      move_id: 2,
    },
    {
      log_entry_id: 2,
      move_id: 3,
    },
    {
      log_entry_id: 2,
      move_id: 4,
    },
    {
      log_entry_id: 1,
      move_id: 5,
    },
    {
      log_entry_id: 1,
      move_id: 6,
    },
    {
      log_entry_id: 1,
      move_id: 7,
    },
    {
      log_entry_id: 1,
      move_id: 8,
    },
  ];
}

function makeUsersArray() {
  return [
    {
      user_name: "wes123",
      password: "test987",
    },
    {
      user_name: "morgan456",
      password: "test654",
    },
  ];
}

function makeExpectedLogEntriesArray() {
  return [
    {
      id: 1,
      user_id: 1,
      date: "2021-05-21",
      rounds: 1,
      round_length: 1,
      cardio: 2,
      notes: "words",
      submissions: [
        {
          category: "subs",
          count: 4,
          name: "Rear Naked Choke",
        },
      ],
      taps: [
        {
          category: "taps",
          count: 14,
          name: "Americana",
        },
      ],
      sweeps: [
        {
          category: "sweeps",
          count: 60,
          name: "Pendulum Sweep",
        },
        {
          category: "sweeps",
          count: 12,
          name: "Hip Sweep",
        },
      ],
    },
    {
      id: 2,
      user_id: 1,
      date: "2021-04-20",
      rounds: 5,
      round_length: 5,
      cardio: 1,
      notes: "hey dare",
      submissions: [
        {
          category: "subs",
          count: 2,
          name: "Triangle",
        },
      ],
      taps: [
        {
          category: "taps",
          count: 7,
          name: "Kimura",
        },
      ],
      sweeps: [
        {
          category: "sweeps",
          count: 6,
          name: "Flower Sweep",
        },
        {
          category: "sweeps",
          count: 30,
          name: "Knee Lever",
        },
      ],
    },
  ];
}

function makeMaliciousItem() {
  const maliciousItem = {
    user_id: 911,
    date: "1999-12-31",
    rounds: 911,
    round_length: 911,
    cardio: 5,
    notes: 'Naughty naughty very naughty <script>alert("xss");</script>',
    submissions: [
      {
        category: "subs",
        count: 2,
        name: "Triangle",
      },
    ],
    taps: [
      {
        category: "taps",
        count: 7,
        name: "Kimura",
      },
    ],
    sweeps: [
      {
        category: "sweeps",
        count: 6,
        name: "Flower Sweep",
      },
    ],
  };

  const expectedItem = {
    ...maliciousItem,
    notes:
      'Naughty naughty very naughty &lt;script&gt;alert("xss");&lt;/script&gt;',
  };

  return maliciousItem, expectedItem;
}

module.exports = {
  makeUsersArray,
  makeLogEntriesArray,
  makeExpectedLogEntriesArray,
  makeMovesArray,
  makeMovesPivotArray,
  makeMaliciousItem,
};
