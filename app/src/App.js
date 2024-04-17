import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from "./components/Header";
import HomeRedirect from "./pages/HomeRedirect"
import LoginPage from "./pages/LoginPage";
import './App.css';
import FormPage from "./pages/FormPage";
import JobSearchingPage from "./pages/JobSearchingPage"
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <Router>
      <div className="App">
      <Header/>
        <Routes>
          <Route exact path="/" element={<HomeRedirect />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/form" element={<FormPage />} />
          <Route exact path="/search" element={<JobSearchingPage />} />
          <Route exact path="/settings" element={<SettingsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
