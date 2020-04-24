-- Your SQL goes here
CREATE TABLE states (
    id INTEGER PRIMARY KEY NOT NULL,
    state_name VARCHAR NOT NULL,
    has_end_date BOOLEAN NOT NULL,
    end_date DATETIME
)
