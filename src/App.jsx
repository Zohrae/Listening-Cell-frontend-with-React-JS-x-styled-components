
import './App.css'
import {
  createBrowserRouter,
  RouterProvider, 
  Route,
  Link,
  Form,
} from "react-router-dom"

import 'bootstrap/dist/css/bootstrap.min.css';

import '@popperjs/core/dist/umd/popper.min.js';


import Login from './advisor/login'
import Dashboard from './advisor/dashboard';
import LoginEtudiant from './student/login';
import DashboardStudent from './student/DashboardStudent';
import Demande from './student/Demande';
import Feedbacks from './advisor/feedbacksCon';
import Calendar from './advisor/calendar'
import RegisterEtudiant from './student/register';
import DemandesCon from './advisor/demandesCon';
import Connect from './admin/connect';
import Panel from './admin/panel';
import Events from './admin/events';
import Etudiants from './admin/etudiants';
import Website from './pages/Website';
import TestimonialCarousel from './components/Testimonial/Testimonial';
import Conseillers from './admin/advisors';
import Records from './advisor/records';
import MyFeedback from './student/myFeedback';
import ChatStudent from './student/MessengerEtudiant';
import ChatAdvisor from './advisor/MessengerAdvisor';
import FAQ from './pages/FAQ';
import FeedbackAdmin from './admin/feedback';
import Collaboration from './pages/Collaboration';
import Appointments from './student/Appointments';
import CalendarStudent from './student/CalendarStudent';
import RendezVous from './advisor/RendezVous';
import Mental from './pages/Mental';
import StudentsCon from './advisor/studentsCon';
import Collaborators from './admin/collaborators';


const router = createBrowserRouter([
  {
  path: "/login",
  element: <Login />
  },{
    path: "/dashboard",
    element: <Dashboard />
    },{
      path: "/getin",
      element: <LoginEtudiant />
    },{
      path: "/mindCare",
      element: <DashboardStudent />
    },{
      path: "/mindCare/demander",
      element: <Demande />
    },{
      path: "/mindCare/myfeedback",
      element: <MyFeedback />
    },{
      path: "/mindCare/chat",
      element: <ChatStudent />
    },{
      path: "/dashboard/feedbacks",
      element: <Feedbacks />
    },{
      path: "/dashboard/students",
      element: <StudentsCon />
    },{
      path: "/dashboard/chat",
      element: <ChatAdvisor />
    },{
      path: "/dashboard/calendar",
      element: <Calendar />
    },{
      path: "/dashboard/records",
      element: <Records />
    },{
      path: "/register",
      element: <RegisterEtudiant />
    },{
      path: "/dashboard/demandes",
      element: <DemandesCon/>
    },{
      path: "/dashboard/rendezvous",
      element: <RendezVous/>
    },{
      path: "/connect",
      element: <Connect />
    },{
      path: "/panel",
      element: <Panel />
    },{
      path: "/panel/events",
      element: <Events />
    },{
      path: "/panel/students",
      element: <Etudiants />
    },{
      path: "/panel/feedback",
      element: <FeedbackAdmin />
    },{
      path: "/panel/advisors",
      element: <Conseillers />
    },{
      path: "/panel/collaborators",
      element: <Collaborators />
    },{
      path: "/",
      element: <Website />
    },{
      path: "/test",
      element: <TestimonialCarousel />
    },{
      path: "/collaborate",
      element: <Collaboration />
    },{
      path: "/faq",
      element: <FAQ />
    },{
      path: "/mindCare/myAppointments",
      element: <Appointments />
    },{
      path: "/mindCare/myCalendar",
      element: <CalendarStudent />
    },{
      path: "/mental",
      element: <Mental />
    },


]);



function App(){
  return (
    <div className='App'>
    <RouterProvider router={router} />      
    </div>
  );
}


export default App;



