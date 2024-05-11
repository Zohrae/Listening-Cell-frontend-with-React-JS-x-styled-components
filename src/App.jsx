
import './App.css'
import {
  createBrowserRouter,
  RouterProvider, 
  Route,
  Link,
} from "react-router-dom"

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import '@popperjs/core/dist/umd/popper.min.js';


import Website from './pages/Website';
import Login from './advisor/login'
import Dashboard from './advisor/dashboard';
import LoginEtudiant from './student/login';
import DashboardStudent from './student/DashboardStudent';
import Demande from './student/Demande';



const router = createBrowserRouter([
  {
  path: "/",
  element: <Website />,
  },
  {
  path: "/login",
  element: <Login />
  },
  {
    path: "/dashboard",
    element: <Dashboard />
    },

  {
      path: "/getin",
      element: <LoginEtudiant />
    },

    {
      path: "/mindCare",
      element: <DashboardStudent />
    },

  {
      path: "/mindCare/demander",
      element: <Demande />
    },

    // {
    //   path: "/demandesConseiller",
    //   element: <DemandeC />
    // },

]);



function App(){
  return (
    <div className='App'>
    <RouterProvider router={router} />      
    </div>
  );
}



// function App() {
//   return (
//     <div>

//       <Dashboard /> 


//     </div>
//   );
// }



export default App;



