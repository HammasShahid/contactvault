CREATE TABLE user
(
    id         BIGINT AUTO_INCREMENT,
    email      VARCHAR(255) NOT NULL,
    password   VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT (NOW()),

    CONSTRAINT PK_user PRIMARY KEY (id),
    CONSTRAINT UQ_user_email UNIQUE (email)
);