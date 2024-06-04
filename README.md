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

Certainly! The architecture section of a README file provides an overview of the structure and components of your project. This helps users and developers understand how different parts of the system interact and how the overall system is designed. Here's a breakdown of what you might want to include in the architecture section:

### Architecture Section

1. **Overview**:
   - Provide a high-level overview of the project architecture. Mention the main components such as frontend, backend, and database, and how they interact with each other.

2. **Components**:
   - **Frontend**: Describe the technology stack used for the frontend (e.g., React, npm). Mention any important libraries or frameworks.
   - **Backend**: Describe the technology stack used for the backend (e.g., Flask, Python). Mention key libraries and frameworks.
   - **Database**: Describe the database technology used (e.g., PostgreSQL). Mention any important schemas or tables.
   
3. **Data Flow**:
   - Explain how data flows between the frontend, backend, and database. You might want to include a diagram to illustrate this.

4. **Key Features**:
   - Highlight any key features or components in your architecture, such as authentication, API endpoints, data processing, etc.

5. **Interaction**:
   - Describe how the frontend and backend communicate (e.g., RESTful API calls). Mention any protocols or data formats used (e.g., JSON).

6. **Deployment**:
   - Provide an overview of how the application is deployed. Mention any services or platforms used for deployment (e.g., Heroku, AWS).

7. **Directory Structure**:
   - Provide a brief explanation of the project's directory structure. Mention the purpose of key directories and files.

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

### Interaction

- **Communication**: The frontend and backend communicate using HTTP/HTTPS and JSON data format.
- **API Documentation**: API endpoints are documented using Swagger.

### Deployment

- **Platform**: The application is deployed on Heroku.
- **Services**: The frontend and backend are deployed as separate services, and the database is managed using Heroku Postgres.

## Design Decisions

## Deployment Information

## Help

<!-- Any advise for common problems or issues.
```
command to run if program contains helper info
``` -->

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

<!-- * 0.2
    * Various bug fixes and optimizations
    * See [commit change]() or See [release history]() -->
* 0.1
    * Initial Release

## Acknowledgments

* [Gates Bolton Analytics](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2)
* [awesome-readme](https://github.com/matiassingers/awesome-readme)
