CREATE TABLE liked (
    id SERIAL PRIMARY KEY,
    music_name VARCHAR(255),
    singer_name VARCHAR (255),
    url_image VARCHAR(255),
    audio VARCHAR(255), 
    comment VARCHAR(255)
);

CREATE TABLE playlist (
    id SERIAL PRIMARY KEY,
    music_name VARCHAR(255),
    singer_name VARCHAR (255),
    url_image VARCHAR(255),
    audio VARCHAR(255),
    comment VARCHAR(255)
);