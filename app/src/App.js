import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import JobViewingPage from "./pages/JobViewingPage";
import HomeRedirect from "./pages/HomeRedirect"
import LoginPage from "./pages/LoginPage";
import './App.css';
import FormPage from "./pages/FormPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<HomeRedirect />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/form" element={<FormPage />} />
          <Route exact path="/jobs" element={<JobViewingPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
