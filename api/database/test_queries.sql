BEGIN;

-- Insert statements for `users`
INSERT INTO users (first_name, last_name, email, city, state, phone_number) VALUES 
('John', 'Doe', 'john.doe@email.com', 'CityA', 'StateA', '1234567890'),
('Jane', 'Smith', 'jane.smith@email.com', 'CityB', 'StateB', '0987654321'),
('Alex', 'Brown', 'alex.brown@email.com', 'CityC', 'StateC', '1122334455'),
('Emma', 'White', 'emma.white@email.com', 'CityD', 'StateD', '2233445566'),
('David', 'Jones', 'david.jones@email.com', 'CityE', 'StateE', '3344556677');

-- Insert statements for `employer`
INSERT INTO employer (company_name, industry, contact_info) VALUES 
('Tech Innovations', 'Technology', 'contact@techinnovations.com'),
('Design Studio', 'Design', 'contact@designstudio.com'),
('Global Corp', 'Consulting', 'contact@globalcorp.com'),
('Data Analysts Inc', 'Data Analysis', 'contact@dataanalysts.com'),
('Market Makers', 'Marketing', 'contact@marketmakers.com');

-- Insert statements for `skills`
INSERT INTO skills (skill_name) VALUES 
('Software Development'),
('Project Management'),
('Graphic Design'),
('Data Analysis'),
('Digital Marketing');

-- Insert statements for `education`
INSERT INTO education (degree, field_of_study, school_name, start_date, end_date) VALUES 
('BSc Computer Science', 'Computer Science', 'Tech University', '2015-09-01', '2019-06-30'),
('MA Design', 'Graphic Design', 'Art & Design College', '2016-09-01', '2018-06-30'),
('MBA', 'Business Administration', 'Business School', '2017-09-01', '2019-06-30'),
('PhD Data Science', 'Data Science', 'Global University', '2018-09-01', '2022-06-30'),
('BSc Marketing', 'Marketing', 'University of Commerce', '2019-09-01', '2023-06-30');

-- Insert statements for `work_history`
INSERT INTO work_history (company_name, title, start_date, end_date, job_description) VALUES 
('Tech Innovations', 'Software Engineer', '2019-07-01', '2021-08-31', 'Developing and maintaining software applications.'),
('Design Studio', 'Graphic Designer', '2018-07-01', '2020-08-31', 'Creating visual concepts and designs.'),
('Global Corp', 'Project Manager', '2020-09-01', '2022-09-30', 'Managing and leading project teams.'),
('Data Analysts Inc', 'Data Analyst', '2021-10-01', '2023-01-31', 'Analyzing data trends for business insights.'),
('Market Makers', 'Digital Marketer', '2022-02-01', NULL, 'Implementing digital marketing strategies.');

-- Insert statements for `profile_info`
INSERT INTO profile_info (user_id, username, password_hash, resume, skills_id, education_id, work_history_id) VALUES 
(1, 'john_doe', 'hashed_password1', 'resume_link_1', 1, 1, 1),
(2, 'jane_smith', 'hashed_password2', 'resume_link_2', 2, 2, 2),
(3, 'alex_brown', 'hashed_password3', 'resume_link_3', 3, 3, 3),
(4, 'emma_white', 'hashed_password4', 'resume_link_4', 4, 4, 4),
(5, 'david_jones', 'hashed_password5', 'resume_link_5', 5, 5, 5);

-- Insert statements for `jobs`
INSERT INTO jobs (employer_id, job_title, job_description, job_location, salary_range, job_type) VALUES 
(1, 'Software Engineer', 'Develop innovative software solutions.', 'CityA', '$70000-$90000', 'Full-Time'),
(2, 'Graphic Designer', 'Create compelling designs.', 'CityB', '$50000-$70000', 'Part-Time'),
(3, 'Project Manager', 'Lead projects to success.', 'CityC', '$80000-$100000', 'Contract'),
(4, 'Data Analyst', 'Analyze and interpret complex data sets.', 'CityD', '$60000-$80000', 'Full-Time'),
(5, 'Digital Marketer', 'Drive digital marketing campaigns.', 'CityE', '$55000-$75000', 'Freelance');

-- Insert statements for `applications`
INSERT INTO applications (user_id, job_id, application_date) VALUES 
(1, 1, '2024-02-01'),
(2, 2, '2024-02-02'),
(3, 3, '2024-02-03'),
(4, 4, '2024-02-04'),
(5, 5, '2024-02-05');

-- Insert statements for `user_activity_logs`
INSERT INTO user_activity_logs (user_id, timestamp, activity_type) VALUES 
(1, '2024-02-06 12:00:00', 'Login'),
(2, '2024-02-07 13:00:00', 'Apply Job'),
(3, '2024-02-08 14:00:00', 'Update Profile'),
(4, '2024-02-09 15:00:00', 'Logout'),
(5, '2024-02-10 16:00:00', 'View Jobs');

COMMIT;


-- Delete statements
DELETE FROM applications WHERE user_id = 1;
DELETE FROM user_activity_logs WHERE user_id = 5;
DELETE FROM jobs WHERE employer_id = 5;
DELETE FROM work_history WHERE work_history_id = 4;
DELETE FROM education WHERE education_id = 3;

-- Update statements
UPDATE users SET email = 'new_email@email.com' WHERE user_id = 1;
UPDATE jobs SET salary_range = '$80000-$95000' WHERE job_id = 2;
UPDATE employer SET contact_info = 'new_contact@globalcorp.com' WHERE employer_id = 3;
UPDATE profile_info SET resume = 'updated_resume_link' WHERE user_id = 4;
UPDATE education SET field_of_study = 'Cybersecurity' WHERE education_id = 5;
