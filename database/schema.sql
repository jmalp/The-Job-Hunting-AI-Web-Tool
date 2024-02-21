CREATE TABLE skills (
    skill_id SERIAL PRIMARY KEY,
    skill_name VARCHAR(255) NOT NULL
);

CREATE TABLE education (
    education_id SERIAL PRIMARY KEY,
    degree VARCHAR(255) NOT NULL,
    field_of_study VARCHAR(255) NOT NULL,
    school_name VARCHAR(255) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    CHECK (start_date < end_date OR end_date IS NULL)
);

CREATE TABLE work_history (
    work_history_id SERIAL PRIMARY KEY,
    company_name VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    job_description VARCHAR(255) NOT NULL,
    CHECK (start_date < end_date OR end_date IS NULL)
);

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    city VARCHAR(255) NOT NULL,
    state VARCHAR(255) NOT NULL,
    phone_number VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL
);

CREATE TABLE profile_info (
    profileinfo_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    resume VARCHAR(255) NOT NULL,
    skills_id INTEGER NOT NULL,
    education_id INTEGER NOT NULL,
    work_history_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (skills_id) REFERENCES skills(skill_id) ON DELETE CASCADE,
    FOREIGN KEY (education_id) REFERENCES education(education_id) ON DELETE CASCADE,
    FOREIGN KEY (work_history_id) REFERENCES work_history(work_history_id) ON DELETE CASCADE
);

CREATE TABLE employer (
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
    FOREIGN KEY (employer_id) REFERENCES employer(employer_id) ON DELETE CASCADE
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
