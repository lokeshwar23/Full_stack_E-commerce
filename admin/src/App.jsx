import { BrowserRouter } from "react-router-dom";
import Footer from "./Components/Footer/Footer.jsx";
import Navbar from "./Components/Navbar/Navbar.jsx";
import Admin from "./Pages/Admin.jsx";

export const backend_url = 'https://full-stack-e-commerce-4-2uw6.onrender.com';
export const currency = '₹';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Admin />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
