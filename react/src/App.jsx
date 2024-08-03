import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Signin from "./components/Signin";
// import Register from "./components/Register";
import Register from "./components/register";
// /Users/jimmy/EXTRAS/swoc_react_v2/react/src/components/Register.jsx
import UserNotFound from "./components/UserNotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Default route pointing to Home component */}
          <Route index element={<Home />} />
          
          {/* Route for Signin page */}
          <Route path="signin" element={<Signin />} />
          
          {/* Route for Register page */}
          <Route path="register" element={<Register />} />
          
          {/* Catch-all route for undefined paths, showing UserNotFound component */}
          <Route path="*" element={<UserNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
