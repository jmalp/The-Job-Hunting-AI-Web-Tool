DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS profile_info CASCADE;
DROP TABLE IF EXISTS skills;
DROP TABLE IF EXISTS education;
DROP TABLE IF EXISTS work_history;
DROP TABLE IF EXISTS employers CASCADE;
DROP TABLE IF EXISTS jobs CASCADE;
DROP TABLE IF EXISTS applications;
DROP TABLE IF EXISTS user_activity_logs;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL
);

CREATE TABLE profile_info (
    profileinfo_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    city VARCHAR(255) NOT NULL,
    state VARCHAR(255) NOT NULL,
    phone_number VARCHAR(255) NOT NULL,
    resume VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE skills (
    skill_id SERIAL PRIMARY KEY,
    profileinfo_id INTEGER NOT NULL,
    skill_name VARCHAR(255) NOT NULL, 
    FOREIGN KEY (profileinfo_id) REFERENCES profile_info(profileinfo_id) ON DELETE CASCADE
);

CREATE TABLE education (
    education_id SERIAL PRIMARY KEY,
    profileinfo_id INTEGER NOT NULL,
    degree VARCHAR(255) NOT NULL,
    field_of_study VARCHAR(255) NOT NULL,
    school_name VARCHAR(255) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    FOREIGN KEY (profileinfo_id) REFERENCES profile_info(profileinfo_id) ON DELETE CASCADE,
    CHECK (start_date < end_date OR end_date IS NULL)
);

CREATE TABLE work_history (
    work_history_id SERIAL PRIMARY KEY,
    profileinfo_id INTEGER NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    job_description VARCHAR(255) NOT NULL,
    FOREIGN KEY (profileinfo_id) REFERENCES profile_info(profileinfo_id) ON DELETE CASCADE,
    CHECK (start_date < end_date OR end_date IS NULL)
);

CREATE TABLE employers (
    employer_id SERIAL PRIMARY KEY,
    company_name VARCHAR(255) NOT NULL,
    industry VARCHAR(255) NOT NULL,
    contact_info VARCHAR(255) NOT NULL
);

CREATE TABLE jobs (
    job_id SERIAL PRIMARY KEY,
    employer_id INTEGER NOT NULL,
    job_title VARCHAR(255) NOT NULL,
    job_description VARCHAR(255) NOT NULL,
    job_location VARCHAR(255) NOT NULL,
    salary_range VARCHAR(255) NOT NULL,
    job_type VARCHAR(255) NOT NULL,
    FOREIGN KEY (employer_id) REFERENCES employers(employer_id) ON DELETE CASCADE
);

CREATE TABLE applications (
    application_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    job_id INTEGER NOT NULL,
    application_date DATE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (job_id) REFERENCES jobs(job_id) ON DELETE CASCADE
);

CREATE TABLE user_activity_logs (
    activity_log_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    activity_type VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);
