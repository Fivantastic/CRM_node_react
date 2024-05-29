import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/Home/HomePage.jsx';
import { NotFoundPage } from './pages/Others/NotFoundPage.jsx';
import { LoginPage } from './pages/Auth/LoginPage.jsx';
import { ValidationPage } from './pages/Auth/ValidationPage.jsx';
import { ForgotPassword } from './pages/Auth/ForgotPassword.jsx';
import { ResetPassword } from './pages/Auth/ResetPassword.jsx';
import { SalesPage } from './pages/Sales/SalesPage.jsx';
import { Visitpage } from './pages/Customer/Visitpage.jsx';
import { DeliveryNotePage } from './pages/Sales/DeliveryNotePage.jsx';
import { InvoicePage } from './pages/Sales/InvoicePage.jsx';
import { PaymentPage } from './pages/Sales/PaymentPage.jsx';
import { ShipmentPage } from './pages/Sales/ShipmentPage.jsx';
import { AboutPage } from './pages/About/AboutPage.jsx';
import { InitialPage } from './pages/Others/InitialPage.jsx';
import { UserPage } from './pages/UserPage.jsx';
import { CustomerPage } from './pages/Customer/CustomerPage.jsx';
import { ProfilePage } from './pages/Others/ProfilePage.jsx';
import { ProductPage } from './pages/Sales/ProductPage.jsx';
import { RatingVisit } from './pages/Auth/RatingVisit.jsx';
import { RatingShipment } from './pages/Auth/RatingShipment.jsx';
import { RoutesPage } from './components/PagesComponents/Route/RoutesPage.jsx';
import './Styles/Pages/GeneralFroms.css';
import './App.css';


function App() {
  return (
    <Routes>
      <Route path="/" element={<InitialPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/Profile" element={<ProfilePage />} />
      <Route path="/user" element={<UserPage />} />
      <Route path="/customer" element={<CustomerPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route
        path="/user/reset-password/:registration_code"
        element={<ResetPassword />}
      />
      <Route
        path="/visit/rating-valoration/:ref_VT"
        element={<RatingVisit />}
      />
      <Route
        path="/shipment/feedback/:ref_SH"
        element={<RatingShipment />} 
      />
      <Route
        path="/validation/:registration_code"
        element={<ValidationPage />}
      />
      <Route path="/user/reset-password/:registration_code" element={<ResetPassword />}/>
      <Route path="/visit/rating-valoration/:ref_VT" element={<RatingVisit />}  />
      <Route path="/shipment/feedback/:ref_SH" element={<RatingVisit />}  />
      <Route path="/validation/:registration_code" element={<ValidationPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/product" element={<ProductPage />} />
      <Route path="/sale" element={<SalesPage />} />
      <Route path="/visit" element={<Visitpage />} />
      <Route path="/deliveryNote" element={<DeliveryNotePage />} />
      <Route path="/invoice" element={<InvoicePage />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/shipment" element={<ShipmentPage />} />
      <Route path="/route" element={<RoutesPage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
