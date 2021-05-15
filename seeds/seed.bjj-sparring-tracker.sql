INSERT INTO users (user_name, password)
VALUES ('wes123', 'test987'), ('morgan987', 'test123');

INSERT INTO log_entry (user_id, date, rounds, round_length, cardio, notes)
VALUES (1, '2021-05-15', 1, 5, 2, 'Today was a good day.'), (1, '2021-05-14', 2, 6, 3, 'Need to work on XYZ.'), (1, '2021-05-13', 3, 7, 3, 'I got Nothing to say.');

INSERT INTO submissions (log_entry_id, name, count)
VALUES (1, 'Arm Bar', 2), (2, 'Heel Hook', 4), (2, 'Rear Naked Choke', 6), (3, 'Triangle', 8), (3, 'Omoplata', 1), (3, 'Knee Bar', 3);

INSERT INTO taps (log_entry_id, name, count)
VALUES (1, 'Straight Ankle', 3), (1, 'Arm Triangle', 5), (1, 'American', 7), (2, 'Knee Bar', 2), (2, 'Guillotine', 4), (3, 'Kimura', 6);

INSERT INTO sweeps (log_entry_id, name, count)
VALUES (1, 'Elevator Sweep', 2), (2, 'Flower Sweep', 4), (2, 'Knee Lever Sweep', 6), (3, 'Tripod Sweep', 8), (3, 'Hip Sweep', 1), (3, 'Knee Tap', 3);

INSERT INTO log_subs_taps_sweeps_pivot (log_entry_id, sub_id, tap_id, sweep_id)
VALUES (1, 1, null, null), (2, 2, null, null), (2, 3, null, null), (3, 4, null, null), (3, 5, null, null), (3, 6, null, null), (1, null, 1, null), (1, null, 2, null), (1, null, 3, null), (2, null, 4, null), (2, null, 5, null), (3, null, 6, null), (1, null, null, 1), (2, null, null, 2), (2, null, null, 3), (3, null, null, 4), (3, null, null, 5), (3, null, null, 6);

--$ psql -U wes -d bjj-sparring-tracker -f ./seeds/seed.bjj-sparring-tracker.sql