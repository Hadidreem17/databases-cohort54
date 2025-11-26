CREATE TABLE authors (
    author_id SERIAL PRIMARY KEY,
    author_name VARCHAR(100),
    university VARCHAR(100),
    date_of_birth DATE,
    h_index INT,
    gender VARCHAR(20)
);

ALTER TABLE authors
ADD COLUMN mentor INT;

ALTER TABLE authors
ADD CONSTRAINT fk_mentor
FOREIGN KEY (mentor) REFERENCES authors(author_id);