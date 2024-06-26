BEGIN;

-- Insert statements for `users`
INSERT INTO users (first_name, last_name, email, username, password_hash) VALUES 
('John', 'Doe', 'john.doe@email.com', 'john_doe', 'd37c58fc285057684347eb49d010dab6e525d2817005802d6b4ee747dd0ab976' ), -- hashed_password1
('Jane', 'Smith', 'jane.smith@email.com', 'jane_smith', '54388fcfd8bd804cd86306eb584fc034b6659c94c34ee17317a431ee333518b9'), -- hashed_password2
('Alex', 'Brown', 'alex.brown@email.com', 'alex_brown', 'd08d095db7b2d6e574f2b00fdd4daa5d06e2cc939077404712af267b63b657ee'), -- hashed_password3
('Emma', 'White', 'emma.white@email.com', 'emma_white', '066dbd4c36732ea85e9f8fa5c9127f8bd3da2117576c0cda1a2164c70ce20404'), -- hashed_password4
('David', 'Jones', 'david.jones@email.com', 'david_jones', '758c2a6cf939ca32d5707cc42659f27ae7d05db1610f8c6c9c36b2aacc1fdac7'); -- hashed_password5

-- Insert statements for `profile_info`
INSERT INTO profile_info (user_id, resume, city, state, phone_number) VALUES 
(1, 'resume_link_1','CityA', 'StateA', '1234567890'),
(2,  'resume_link_2', 'CityB', 'StateB', '0987654321'),
(3, 'resume_link_3', 'CityC', 'StateC', '1122334455'),
(4, 'resume_link_4', 'CityD', 'StateD', '2233445566'),
(5, 'resume_link_5', 'CityE', 'StateE', '3344556677');

-- Insert statements for `employer`
INSERT INTO employers (company_name, industry, contact_info) VALUES 
('Tech Innovations', 'Technology', 'contact@techinnovations.com'),
('Design Studio', 'Design', 'contact@designstudio.com'),
('Global Corp', 'Consulting', 'contact@globalcorp.com'),
('Data Analysts Inc', 'Data Analysis', 'contact@dataanalysts.com'),
('Market Makers', 'Marketing', 'contact@marketmakers.com');

-- Insert statements for `skills`
INSERT INTO skills (profileinfo_id, skill_name) VALUES 
(1, 'Software Development'),
(2, 'Project Management'),
(3, 'Graphic Design'),
(4, 'Data Analysis'),
(5, 'Digital Marketing');

-- Insert statements for `education`
INSERT INTO education (profileinfo_id, degree, field_of_study, school_name, start_date, end_date) VALUES 
(1, 'BSc Computer Science', 'Computer Science', 'Tech University', '2015-09-01', '2019-06-30'),
(2, 'MA Design', 'Graphic Design', 'Art & Design College', '2016-09-01', '2018-06-30'),
(3, 'MBA', 'Business Administration', 'Business School', '2017-09-01', '2019-06-30'),
(4, 'PhD Data Science', 'Data Science', 'Global University', '2018-09-01', '2022-06-30'),
(5, 'BSc Marketing', 'Marketing', 'University of Commerce', '2019-09-01', '2023-06-30');

-- Insert statements for `work_history`
INSERT INTO work_history (profileinfo_id, company_name, title, start_date, end_date, job_description) VALUES 
(1, 'Tech Innovations', 'Software Engineer', '2019-07-01', '2021-08-31', 'Developing and maintaining software applications.'),
(2, 'Design Studio', 'Graphic Designer', '2018-07-01', '2020-08-31', 'Creating visual concepts and designs.'),
(3, 'Global Corp', 'Project Manager', '2020-09-01', '2022-09-30', 'Managing and leading project teams.'),
(4, 'Data Analysts Inc', 'Data Analyst', '2021-10-01', '2023-01-31', 'Analyzing data trends for business insights.'),
(5, 'Market Makers', 'Digital Marketer', '2022-02-01', NULL, 'Implementing digital marketing strategies.');

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
UPDATE employers SET contact_info = 'new_contact@globalcorp.com' WHERE employer_id = 3;
UPDATE profile_info SET resume = 'updated_resume_link' WHERE user_id = 4;
UPDATE education SET field_of_study = 'Cybersecurity' WHERE education_id = 5;
