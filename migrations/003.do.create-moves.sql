CREATE TABLE moves (
    
 id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY UNIQUE,
 category TEXT NOT NULL,
 name TEXT NOT NULL,
 count INTEGER NOT NULL );