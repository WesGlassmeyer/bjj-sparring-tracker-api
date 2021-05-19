INSERT INTO users (user_name, password)
VALUES ('wes123', 'test987'), ('morgan987', 'test123');

INSERT INTO log_entry (user_id, date, rounds, round_length, cardio, notes)
VALUES (1, '2021-05-15', 1, 5, 2, 'Today was a good day.'), (1, '2021-05-14', 2, 6, 3, 'Need to work on XYZ.'), (1, '2021-05-13', 3, 7, 3, 'I got Nothing to say.');

INSERT INTO moves (category, name, count)
VALUES ('subs', 'Americana', 1), ('subs', 'Arm Bar', 2), ('subs', 'Kimura', 3), ('subs', 'Omoplata', 4), ('subs','Rear Naked Choke', 5), ('subs', 'Triangle', 6), ('taps', 'Head and Arm', 7), ('taps', 'Guillotine', 8), ('taps','Collar Choke', 9), ('taps', 'Heel Hook', 1), ('taps', 'Knee Bar', 2), ('taps', 'Toe Hold', 3), ('subs', 'Straight Ankle', 4), ('sweeps', 'Elevator Sweep', 5), ('sweeps', 'Tripod Sweep', 6), ('sweeps', 'Sickle Sweep', 7), ('sweeps', 'Over Head Sweep', 8), ('sweeps', 'Hip Sweep', 9), ('sweeps', 'Flower Sweep', 1);

INSERT INTO log_moves_pivot (log_entry_id, move_id)
VALUES (1 , 1),  (2 , 2), (2 , 3), (3 , 4), (3 , 5), (3 , 6), (1 , 7), (1 , 8), (1 , 9), (2 , 10), (2 , 11), (3 , 12), (1 , 13), (2 , 14), (2 , 15), (3 , 16), (3 , 17), (3 , 18), (1 , 19);

--$ psql -U wes -d bjj-sparring-tracker -f ./seeds/seed.bjj-sparring-tracker.sql