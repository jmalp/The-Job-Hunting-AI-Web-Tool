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

[Deployed Website](https://placeholder-link.com)

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

To install all the required Python packages, you can use the `requirements.txt` file included in the API directory. Follow these steps to install the dependencies:

1. **Create a Virtual Environment (Optional but Recommended):**
   ```bash
   python -m venv venv
   source venv/bin/activate   # On Windows use `venv\Scripts\activate`
   ```

2. **Install the Dependencies:**
   ```bash
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
   - In pgAdmin4, open the Query Tool and load the `schema.sql` file located in the `api/database` directory.
   - Execute the script to create the necessary database schema.

### Executing program

<!-- * How to run the program
* Step-by-step bullets
```
code blocks for commands
``` -->
To run the project locally, you need to start both the backend and frontend servers. Follow these steps to execute the program:

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
