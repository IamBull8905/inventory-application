const SQL = `CREATE TABLE IF NOT EXISTS brand(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    brand_name VARCHAR( 75 ),
    origin VARCHAR( 75 )
);

CREATE TABLE IF NOT EXISTS category(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    category_name VARCHAR( 30 ),
    category_description TEXT
);

CREATE TABLE IF NOT EXISTS product(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    product_name VARCHAR ( 75 ),
    product_description TEXT,
    price INTEGER CONSTRAINT price_must_be_positive CHECK (price > 0),
    stock INTEGER CONSTRAINT stock_must_be_non_negative CHECK (stock >= 0),
    brand_id INTEGER references brand(id),
    category_id INTEGER references category(id)
);

CREATE TABLE IF NOT EXISTS brand_category(
    brand_id INTEGER references brand(id),
    category_id INTEGER references category(id),
    PRIMARY KEY (brand_id, category_id)
);`;
