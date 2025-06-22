import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import ReactGA from "react-ga4";
import Home from "./pages/Home";
import QuizPage from "./pages/QuizPage";

const TRACKING_ID = "G-94GW5V8X1Q";

function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: location.pathname + location.search,
    });
  }, [location]);

  return null;
}

function App() {
  useEffect(() => {
    ReactGA.initialize(TRACKING_ID);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz/:categories" element={<QuizPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
