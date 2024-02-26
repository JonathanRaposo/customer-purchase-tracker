
import HomePage from "./pages/HomePage.jsx";
import { Routes, Route } from 'react-router-dom';
import SignupPage from "./pages/SignupPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import Customers from './pages/Customers.jsx';
import Customer from "./pages/Customer.jsx";
import PurchaseHistory from './pages/PurchaseHistory.jsx';
import AddCustomer from './pages/AddCustomer.jsx';
import Header from "./components/Header.jsx";
import UpdateCustomer from "./pages/UpdateCustomer.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import Footer from "./components/Footer.jsx";
import IsPrivate from "./components/isPrivate.jsx";


const App = () => {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/addCustomer" element={<IsPrivate><AddCustomer /></IsPrivate>} />
        <Route path="/dashboard" element={<IsPrivate><Customers /></IsPrivate>} />
        <Route path="/customers/:id" element={<IsPrivate><Customer /></IsPrivate>} />
        <Route path="/PurchaseHistory/:id" element={<IsPrivate><PurchaseHistory /></IsPrivate>} />
        <Route path="/customers/:id/update" element={<IsPrivate><UpdateCustomer /></IsPrivate>} />
        <Route path="*" element={<ErrorPage />} />

      </Routes>
      <Footer />
    </>
  )
}

export default App
