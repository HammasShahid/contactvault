CREATE TABLE contact
(
    id         BIGINT AUTO_INCREMENT,
    first_name VARCHAR(75) NOT NULL,
    last_name  VARCHAR(75),
    title      VARCHAR(255),
    user_id    BIGINT      NOT NULL,
    created_at DATETIME DEFAULT (NOW()),

    CONSTRAINT PK_contact PRIMARY KEY (id),
    CONSTRAINT FK_contact_user_id FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE
);

CREATE TABLE contact_phone
(
    id           BIGINT AUTO_INCREMENT,
    label        VARCHAR(255),
    phone_number VARCHAR(20) NOT NULL,
    contact_id   BIGINT      NOT NULL,

    CONSTRAINT PK_phone PRIMARY KEY (id),
    CONSTRAINT FK_phone_contact_id FOREIGN KEY (contact_id) REFERENCES contact (id) ON DELETE CASCADE
);

CREATE TABLE contact_email
(
    id         BIGINT AUTO_INCREMENT,
    label      VARCHAR(255),
    email      VARCHAR(255) NOT NULL,
    contact_id BIGINT       NOT NULL,

    CONSTRAINT PK_email PRIMARY KEY (id),
    CONSTRAINT FK_email_contact_id FOREIGN KEY (contact_id) REFERENCES contact (id) ON DELETE CASCADE,
    CONSTRAINT UQ_contact_email UNIQUE (email, contact_id)
);