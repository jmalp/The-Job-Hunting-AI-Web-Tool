# The-Job-Hunting-AI-Web-Tool

The Job Hunting AI Web Tool

## Description

The complex landscape of online job searching often leaves job seekers overwhelmed by the vast options and unsure of the best opportunities aligning with their skills and preferences. Traditional job search methodologies rely heavily on manual filtration, leading to unsatisfying matches and inefficiencies for both the job seekers and the employers. This paper proposes a solution that takes advantage of AI techniques and statistical modeling to improve the job search process, offering real-time, curated job matching. 

## Getting Started

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

### Installing

<!-- * How/where to download your program
* Any modifications needed to be made to files/folders -->

### Executing program

<!-- * How to run the program
* Step-by-step bullets
```
code blocks for commands
``` -->

## Help

<!-- Any advise for common problems or issues.
```
command to run if program contains helper info
``` -->

## Authors

Jomar Malpica
<!-- contact info placeholder [@DomPizzie](https://twitter.com/dompizzie) -->
Alejandro Grau
<!-- contact info placeholder [@DomPizzie](https://twitter.com/dompizzie) -->
Gabriele Narmontaite
<!-- contact info placeholder [@DomPizzie](https://twitter.com/dompizzie) -->

## Version History

<!-- * 0.2
    * Various bug fixes and optimizations
    * See [commit change]() or See [release history]() -->
* 0.1
    * Initial Release

## License

<!-- This project is licensed under the [NAME HERE] License - see the LICENSE.md file for details -->

## Acknowledgments

* [Gates Bolton Analytics](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2)
* [awesome-readme](https://github.com/matiassingers/awesome-readme)
