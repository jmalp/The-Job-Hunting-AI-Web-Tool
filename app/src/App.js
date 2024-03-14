import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import HomeRedirect from "./pages/HomeRedirect"
import LoginPage from "./pages/LoginPage";
import './App.css';
import FormPage from "./pages/FormPage";
import JobSearchingPage from "./pages/JobSearchingPage"

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<HomeRedirect />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/form" element={<FormPage />} />
          <Route exact path="/search" element={<JobSearchingPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
