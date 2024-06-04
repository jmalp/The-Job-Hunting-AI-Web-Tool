# The-Job-Hunting-AI-Web-Tool

The Job Hunting AI Web Tool

## Description

The complex landscape of online job searching often leaves job seekers overwhelmed by the vast options and unsure of the best opportunities aligning with their skills and preferences. Traditional job search methodologies rely heavily on manual filtration, leading to unsatisfying matches and inefficiencies for both the job seekers and the employers. This paper proposes a solution that takes advantage of AI techniques and statistical modeling to improve the job search process, offering real-time, curated job matching. 

## Table of Contents
- [Access the Deployed Website](#access-the-deployed-website)
- [Running the Code Locally](#running-the-code-locally)
- [Architecture](#architecture)
- [Design Decisions](#design-decisions)
- [Deployment Information](#deployment-information)
- [Help](#help)
- [Authors](#authors)
- [Version History](#version-history)
- [Acknowledgments](#acknowledgments)

## Getting Started

## Access the Deployed Website

You can use the deployed version of our project by visiting the following link:

[Deployed Website](http://tjhait-react-app-bucket.s3-website-us-west-2.amazonaws.com/)

To interact with the application, you can either create your own account or use the following test credentials:

Username: testing@oregonstate.edu
Password: virtualexpo2024

This account represents a user who has recently graduated from Oregon State with a Bachelor's in Computer Science. Their project experience and skills include the languages, frameworks, and libraries used to develop this application.

This website is fully functional and allows you to interact with all the features of our project without needing to set up anything locally.

## Running the Code Locally

If the deployed website is unavailable or you prefer to run the code locally, follow the next steps to set up the project on your local machine. This includes installing the necessary dependencies for both the backend and the frontend.

### Dependencies

<!-- * prerequisites, libraries, OS version, etc., needed before installing program.
* ex. Windows 10 -->
#### Backend Dependencies

The backend of this project is built using Flask and several additional libraries for various functionalities. Below is a list of the main Python packages used:

- `Flask==3.0.2`
- `Flask-Cors==4.0.0`
- `Flask-RESTful==0.3.10`
- `gensim==4.3.2`
- `nltk==3.8.1`
- `numpy==1.26.3`
- `pandas==2.2.0`
- `psycopg2==2.9.9`
- `psycopg2-binary==2.9.9`
- `PyJWT==2.8.0`
- `requests==2.31.0`
- `scikit-learn==1.4.0`
- `scipy==1.10.1`
- `gunicorn==21.2.0`
- `pdfplumber==0.11.0`
- `sklearn-features==0.0.2`

You can install the required Python packages using the `requirements.txt` file in the API directory. Follow these steps to install the dependencies:

1. **Create a Virtual Environment (Optional but Recommended):**
   ```bash
   python -m venv venv
   source venv/bin/activate   # On Windows use `venv\Scripts\activate`
   ```

2. **Install the Dependencies:**
   ```bash
   cd api
   pip install -r requirements.txt
   ```

#### Frontend Dependencies

The frontend of this project is built using React and managed via npm. To set up the frontend dependencies, follow these steps:

1. **Navigate to the app Directory:**
   ```bash
   cd app
   ```

2. **Install npm Packages:**
   ```bash
   npm install
   ```

#### Setting Up a Local Database

To set up a local PostgreSQL database for this project, follow these steps:

1. **Install pgAdmin4:**
   - Download and install pgAdmin4 from the [official website](https://www.pgadmin.org/download/).
   
2. **Create a PostgreSQL Database:**
   - Open pgAdmin4 and create a new database. Note the database name, user, password, host, and port.

3. **Create a `.ini` Configuration File:**
   - In the `api/database` directory, create a file named `config.ini` with the following content:
     ```ini
     [postgresql]
     host=your_host
     dbname=your_dbname
     user=your_user
     password=your_password
     port=your_port
     ```
   - Replace `your_host`, `your_dbname`, `your_user`, `your_password`, and `your_port` with your database connection details.

4. **Run the `schema.sql` File:**
   - In pgAdmin4, open the Query Tool and load the `schema.sql` file in the `api/database` directory.
   - Execute the script to create the necessary database schema.

### Executing program

<!-- * How to run the program
* Step-by-step bullets
```
code blocks for commands
``` -->
To run the project locally, you must start both the backend and frontend servers. Follow these steps to execute the program:

#### Step 1: Start the Backend Server

1. **Open a new terminal window.**
2. **Navigate to the API directory:**
   ```sh
   cd api
   ```
3. **Run the backend server:**
   ```sh
   python main.py
   ```
   This will start the Flask server and make the backend API available.

#### Step 2: Start the Frontend Server

1. **Open another new terminal window.**
2. **Navigate to the app directory:**
   ```sh
   cd app
   ```
3. **Run the frontend server:**
   ```sh
   npm start
   ```
   This will start the React application and open it in your default web browser.

## Architecture

### Overview

The project uses a classic client/server architecture that consists of a frontend, backend, and database. The frontend uses React, the backend is built using Flask, and the database is PostgreSQL. The frontend interacts with the backend through RESTful API calls, and the backend communicates with the database to fetch and store data.

### Components

#### Frontend

- **Technology Stack**: React, npm
- **Key Libraries**: React Router, Axios
- **Purpose**: The frontend provides the user interface and handles user interactions.

#### Backend

- **Technology Stack**: Flask, Python
- **Key Libraries**: Flask, Flask-Cors, psycopg2
- **Purpose**: The backend provides the API endpoints and handles job searching logic and account authentication and authorization.

#### Database

- **Technology Stack**: PostgreSQL
- **Purpose**: The database stores all persistent data, including account information and resumes.

### Data Flow

1. The user interacts with the frontend through the web browser.
2. The frontend sends requests to the backend via RESTful API calls.
3. The backend processes these requests, interacts with the database if necessary, and sends responses back to the frontend.
4. The frontend updates the UI based on the responses from the backend.

### Key Features

**User Registration and Login**

- Users can create a new account by providing their email address and setting a password.

- Existing users can log in to their accounts using their credentials.

**User Profile Creation**

- After logging in, users can create a detailed profile by providing information about their skills.

- Users can upload their resumes in PDF format, which will be used to enhance job recommendations by using work experience and keywords.
  
**Job Search**

- Users can search for job listings by entering specific keywords, choosing a city, setting a search radius, and specifying a salary range.
  
- The tool integrates with the Jooble API to fetch relevant job listings from various sources.
  
**Personalized Job Recommendations**
  
- The tool provides personalized job recommendations based on the user's profile and search criteria.
  
**Job Card Display**
  
- Search results are presented as job cards, offering a concise overview of each job listing.
  
- Each job card includes the job title, company name, location, and a brief description.
  
- Users can click on a job card to view more details and access the original job listing on the external site.
  
**User Authentication and Security**
  
- The tool implements a secure user authentication system to ensure only authorized users can access their accounts and personal information.
  
- User passwords are securely hashed and stored in the database.

## Design Decisions

### Overview

In this section, we detail the key design decisions made during the development of our project. Our decisions were guided by a combination of our existing knowledge, adherence to industry standards, and the ambition to learn new technologies and methodologies to better prepare ourselves for our careers. Understanding these decisions provides insight into the rationale behind our technology choices, architectural patterns, and implementation strategies. This transparency helps viewers understand the thought process and trade-offs considered to achieve the project’s objectives.

### Technology Stack

**Frontend**

- We chose React because we needed to improve our frontend development skills and wanted to use a framework we were already somewhat familiar with. React’s component-based architecture and strong ecosystem also made it an ideal choice for building a scalable and maintainable user interface.

**Backend**

- For the backend API there are a lot more options with languages and frameworks. Since the project required some form of machine learning, we knew we must use Python. That leaves us with using either Django or Flask for our API framework. Ultimately, we decided to use Flask due to its lightweight nature and flexibility. Django provides great built-in features such as an ORM, but we felt the learning curve was too steep for the time allotted and that we wouldn't be able to fully utilize these features.

**Database**

- Our team has experience using MySQL through previous coursework. For this project, we decided to experiment with using PostgreSQL to further broaden our skill set. 

### UI/UX Design

- Our goal was to keep our website as lightweight as possible. The problem this website is trying to solve is the time-consuming nature of job applications. Thus, by keeping user flows as short as possible, we can improve the time efficiency of users' job searching process.

- Our website only consists of four pages: login, create an account, search jobs, and account settings. We keep the site free of any unnecessary buttons or links. We want users to be able to access the website and find results quickly.

### API Design

- Our backend consists of a small amount of endpoints for the frontend to send requests to. This includes CRUD operations on user accounts, verifying login credentials, and searching for jobs.

- It is not intended for other developers to make use of this API at this time.

### Security

- The decisions we made involving security were crucial. Since users intend to store resumes in our database that contain sensitive information, we must properly implement authentication and authorization.

- We decided to use JWTs (JSON Web Tokens) for our API security. When a user creates an account or logs in, a JWT is generated containing their user ID and is sent to their client. For subsequent requests involving actions such as updating their account or searching for jobs, the client sends the JWT back to the API. The API decodes the JWT to identify the user, ensuring that the correct account is used to update the database or retrieve information.

### Machine Learning

### Scalability

- Deploying our API on a cloud platform such as GCP allows us to scale the software horizontally if needed by creating more instances to handle larger loads. 

### Testing

**API Testing**

- Our API was tested using a postman. We wrote several requests to test the functionality of job searching, token authentication, and crud operations on user accounts

**UI/UX Testing**

- Throughout the development of our frontend, we reached out to friends and family and walked them through the user journey to receive feedback on our design choices.

- While time did not allow for automating frontend testing using libraries such as Selenium web driver, we did manual testing of the front end throughout to ensure all cases were covered.

### Development Workflow

- Our team leveraged GitHub's collaboration features to develop a functional and maintainable program.

- We locked the main branch to prevent accidental commits that could break the code and instituted mandatory code reviews for all pull requests. This ensured that multiple team members scrutinized each change, reducing the likelihood of errors and maintaining code quality.

## Deployment Information

Certainly! Here's a section on the deployment design decisions, explaining how you used AWS and GCP to learn the fundamentals of cloud application development:

---

## Deployment Design Decisions

### Overview

In our project, we aimed to gain a comprehensive understanding of cloud application development by utilizing both AWS and GCP. This approach allowed us to familiarize ourselves with different cloud platforms and their respective services, equipping us with versatile skills for future projects. This dual-cloud approach provided valuable insights into the strengths and capabilities of both platforms, preparing us for future projects that may require cloud-based solutions.

### Frontend: AWS S3

- We deployed our frontend on AWS S3, taking advantage of its static website hosting capabilities. AWS S3 provided a scalable and cost-effective solution for hosting our React application, allowing us to serve our front end with high availability and performance. This experience helped us understand the fundamentals of deploying static websites on the cloud, including configuring bucket policies, setting up custom domains, and managing access permissions.

### Backend: GCP Google Compute Engine

- For the backend, we utilized Google Compute Engine (GCE) on GCP. We created a virtual machine (VM) instance using Docker to containerize our Flask application. This decision allowed us to gain hands-on experience with containerization and orchestration. By deploying our backend on GCE, we learned how to set up and manage VM instances, configure firewalls, and handle network settings. This also provided insights into the benefits of using containers for consistent deployment environments and simplified scalability.

### Database: AWS PostgreSQL RDS

- Our database was deployed on AWS PostgreSQL RDS (Relational Database Service). AWS RDS offered a managed database service, handling routine database tasks such as backups, patching, and scaling, which allowed us to focus on application development. By using PostgreSQL RDS, we gained experience in setting up and configuring managed database instances, understanding the importance of automated backups, and implementing best practices for database security and performance.

## Help

While we were able to put systems in place to prevent deletion of the test user account, we were not able to prevent changing the password on the account page. If you do use this account please refrain from changing the password so that others may use it. 

If the password does get changed, feel free to contact any of the team members listed below, or create an account with a throwaway email address and no resume to test the functionality of our website.

## Authors

Jomar Malpica  
email: malpicaj@oregonstate.edu  
github: [jmalp](https://github.com/jmalp)  

Alejandro Grau  
email: graua@oregonstate.edu  
github: [graua-git](https://github.com/graua-git)  

Gabriele Narmontaite  
email: narmontg@oregonstate.edu  
github: [GabbyNorth](https://github.com/GabbyNorth)  

## Version History

* 1.0
    * Initial Release

## Acknowledgments

* [Gates Bolton Analytics](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2)
* [awesome-readme](https://github.com/matiassingers/awesome-readme)
