import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Container } from "react-bootstrap";

import Header from "./components/Header";
import Home from "./pages/Home";
import AllCandidates from "./pages/AllCandidates";

const App = () => {
  return (
    <Router>
      <div className="wrapper">
        <Header />
        <div className="content">
          <Container>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/all-candidates" element={<AllCandidates />} />
            </Routes>
          </Container>
        </div>
      </div>
    </Router>
  );
};

export default App;
