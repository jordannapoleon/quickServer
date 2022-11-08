DROP IF EXISTS TABLE quickServer;

CREATE TABLE quickserver (
    item_id serial PRIMARY KEY,
    item_name VARCHAR(50),
    item_price INTEGER,
    item_avail BOOLEAN
);