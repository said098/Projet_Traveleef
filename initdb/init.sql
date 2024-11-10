-- Supprimer la table Users si elle existe déjà
DROP TABLE IF EXISTS Users;

-- Créer la table Users
CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    email VARCHAR(50)
);

-- Insérer des données dans la table Users
INSERT INTO Users (name, email) VALUES
('Alice', 'alice@example.com'),
('Bob', 'bob@example.com'),
('Said', 'said@example.com');


INSERT INTO users (name, email) VALUES ('Juba', 'juba@example.com');
