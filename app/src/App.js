import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import JobViewingPage from "./pages/JobViewingPage";
import HomeRedirect from "./pages/HomeRedirect"
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<HomeRedirect />} />
          <Route exact path="/jobs" element={<JobViewingPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
