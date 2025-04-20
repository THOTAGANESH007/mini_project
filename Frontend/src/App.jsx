import { useState } from "react";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/LandingPage/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import GovRepresentives from "./components/GovRepresentives";
import AllPlaces from "./components/AllPlaces";
import AuthPage from "./components/AuthPage";
import AboutPage from "./components/AboutPage";
import EventList from "./components/Events/EventList";
import EventDetail from "./components/Events/EventDetail";
import ComplaintsHome from "./components/complaints/ComplaintsHome";
import ScrollToTop from "./components/ScrollToTop";
import ComplaintForm from "./components/complaints/complaintForm";
import ComplaintHistory from "./components/complaints/ComplaintHistory";
import TenderForm from "./components/Admin/TenderForm";
import { store } from "./utils/Store";
import { Provider } from "react-redux";
import Profile from "./components/Profile";
import Bills from "./components/Bills/BillsHome";
import BillsHome from "./components/Bills/BillsHome";
import PaymentForm from "./components/Bills/PaymentForm";
import PaymentHistory from "./components/Bills/PaymentHistory";
import AppointmentsPage from "./components/Appointments/AppointmentsPage";
import ComplaintDetails from "./components/complaints/ComplaintDetails";
import AllAppointments from "./components/Appointments/AllAppointments";
import AddPlace from "./components/Admin/Places/AddPlace";
import ShowPlaces from "./components/Admin/Places/ShowPlaces";
import EditPlace from "./components/Admin/Places/EditPlace";
import AddEvent from "./components/Admin/Events/AddEvent";
import EditEvent from "./components/Admin/Events/EditEvent";
import ShowEvents from "./components/Admin/Events/ShowEvents";
import AddMember from "./components/Admin/AddMember";
import BillsPage from "./components/Admin/BillsPage";
import ComplaintsPage from "./components/Admin/ComplaintsPage";
import ComplaintsCards from "./components/User/ComplaintsCards";
import UpdateComplaintStatus from "./components/User/UpdateComplaintStatus";
import PlaceDetail from "./components/PlaceDetail";
import StripeWrapper from "./components/payment/StripeWrapper";
import Checkout from "./components/payment/Checkout";
import Success from "./components/payment/Success";
import Cancel from "./components/payment/Cancel";
import AppointmentsList from "./components/User/AppointmentsList";
import AppointmentDetails from "./components/User/AppointmentDetails";
import AdminLayout from "./components/Admin/AdminLayout";

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      <Provider store={store}>
        {!isAdminRoute && <Header />}
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<></>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/officials" element={<GovRepresentives />} />
          <Route path="/events" element={<EventList />} />
          <Route path="/event/:id" element={<EventDetail />} />
          <Route path="/places" element={<AllPlaces />} />
          <Route path="/places/:id" element={<PlaceDetail />} />

          <Route path="/complaints" element={<ComplaintsHome />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/auth/*" element={<AuthPage />} />
          <Route path="/complaints/add" element={<ComplaintForm />} />
          <Route path="/complaints/history" element={<ComplaintHistory />} />
          {/* <Route path="/admin/tenders" element={<TenderForm />} /> */}
          <Route path="/bills" element={<BillsHome />} />
          <Route path="/profile" element={<Profile />} />

          <Route path="/appointments" element={<AppointmentsPage />} />
          <Route path="/complaints/:id" element={<ComplaintDetails />} />
          <Route path="/appointments/all" element={<AllAppointments />} />
          <Route path="/bills/history" element={<PaymentHistory />} />
          {/* <Route path="/bills/pay" element={<PaymentForm />} /> */}
          {/* 
          
          <Route path="/admin/addPlace" element={<AddPlace />} />
          <Route path="/admin/allPlaces" element={<ShowPlaces />} />
          <Route path="/admin/place/edit/:id" element={<EditPlace />} />
          <Route path="/admin/addEvent" element={<AddEvent />} />
          <Route path="/admin/event/edit/:id" element={<EditEvent />} />
          <Route path="/admin/allEvents" element={<ShowEvents />} />
          <Route path="/admin/addRepresentative" element={<AddMember />} />
          <Route path="/admin/bills" element={<BillsPage />} />
          <Route path="/admin/complaints" element={<ComplaintsPage />} /> */}

          {/* Admin routes */}
          <Route path="/admin/*" element={<AdminLayout />} />
          <Route path="/user/complaints" element={<ComplaintsCards />} />
          <Route
            path="/user/complaints/:id"
            element={<UpdateComplaintStatus />}
          />

          {/* Stripe Checkout route wrapped in StripeWrapper */}
          <Route
            path="/bills/pay"
            element={
              <StripeWrapper>
                <Checkout />
              </StripeWrapper>
            }
          />

          {/* Success and Cancel routes don't need to be wrapped with StripeWrapper */}
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
        </Routes>
        <Footer />
      </Provider>
    </>
  );
}

export default App;
