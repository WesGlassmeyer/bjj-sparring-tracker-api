# BJJ Sparring Tracker Api

In Brazilian Jiu Jitsu we do a lot of sparring.
You can use our app to track your sparring sessions and use the
statistics to help guide your training.

This is the backend for `bjj-sparring-tracker.app`. A live version of the app can be found at https://bjj-sparring-tracker.vercel.app/

The front end client can be found at https://github.com/WesGlassmeyer/bjj-sparring-tracker

## Introduction

Keeping a log of what you did successfully during each jiu jitsu sparring session can be very useful. Our app helps you track how much you trained, how you felt, moves that were executed and notes on any specific session. The statistics page can then be leveraged to inform your next training session.

## Quick App Demo

https://user-images.githubusercontent.com/71471439/121461529-48cd5800-c96c-11eb-9029-0c170e5254a8.mp4

## Technology

#### Back End

- Node and Express
  - RESTful Api
- Testing
  - Supertest
  - Mocha and Chai
- Database
  - Postgres
  - Knex.js

#### Production

Deployed via Heroku

## API Documentation

- Request Type: `POST`
- Path `https://rocky-mountain-25010.herokuapp.com/log_entry`
- Required Request Headers:  
  `{Content-Type: 'application/json'}`
- Required JSON Body:

```
   {
      date: "DateStringGoesHere",
      rounds: RoundNumberHere,
      round_length: RoundLengthNumberHere,
      cardio: CardioNumberHere,
      notes: "NotesStringGoesHere",
      submissions: [
        {
          category: "subs",
          count: CountNumberGoesHere,
          name: "MoveStringGoesHere",
        },
      ]
    }

```

### GET Log Entries

- Request Type: `GET`
- Path `https://rocky-mountain-25010.herokuapp.com/log_entry`
- Required Request Headers:

`{Content-Type: 'application/json'}`

- Response Body will be an array of JSON Objects:

```
[{
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
        }
      ]
    }]
```

### GET Log Entry By ID

- Request Type: `GET`
- Path `https://rocky-mountain-25010.herokuapp.com/log_entry/{EntryIdGoesHere}`
- Required Request Headers:
  `{Content-Type: 'application/json'}`

- Response Body will be a JSON Object matching the Id number:

```
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
        }
      ]
    }

```

### Update Log Entry By ID

- Request Type: `PUT`
- Path `https://rocky-mountain-25010.herokuapp.com/log_entry/{EntryIdGoesHere}`
- Required Request Headers:  
  `{Content-Type: 'application/json'}`
- Required JSON Body:

```
   {
      date: "DateStringGoesHere",
      rounds: RoundNumberHere,
      round_length: RoundLengthNumberHere,
      cardio: CardioNumberHere,
      notes: "NotesStringGoesHere",
      submissions: [
        {
          category: "subs",
          count: CountNumberGoesHere,
          name: "MoveStringGoesHere",
        },
      ]
    }

```
