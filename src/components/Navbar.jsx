import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './navbar.css'



const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleMouseEnter = () => {
        setIsDropdownOpen(true);
    };

    const handleMouseLeave = () => {
        setIsDropdownOpen(false);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
            <div className="container-fluid">
            <a className="navbar-brand" href="#">
                    <img src="/img/bee.png" alt="Bee Icon" style={{ width: '35px', marginRight: '10px' }} />
                </a>                
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#" style={{ color: 'black' }}>Home</a>
                        </li>
                        <li className="nav-item dropdown" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}> {/* Add event handlers for mouse enter and leave */}
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle={isDropdownOpen ? "dropdown" : ""} aria-expanded={isDropdownOpen} style={{ color: 'black' }}> {/* Conditional rendering of data-bs-toggle and aria-expanded */}
                                Features
                            </a>
                            <ul className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`} aria-labelledby="navbarDropdown"> {/* Conditional rendering of dropdown menu based on isDropdownOpen state */}
                                <li><a className="dropdown-item" href="#">Mental Health Services</a></li>
                                <li><a className="dropdown-item" href="#">Accompagnement Services</a></li>
                                <li><a className="dropdown-item" href="#">Para-University Activities</a></li>
                                {/* Add more dropdown items as needed */}
                            </ul>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#" style={{ color: 'black' }}>Pricing</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#" style={{ color: 'black' }}>Contact Us</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#" style={{ color: 'black' }}>Sign Up</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#" style={{ color: 'black' }}>Let's Collaborate</a>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                    <li className="nav-item" style={{ marginRight: '80px' }}>
                    <Link to="/login" className="nav-link btn btn-primary" style={{ color: 'white', backgroundColor: '#b2744c' }}>Se Connecter</Link> {/* Use Link component for navigation */}
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#" style={{ color: 'black' }}>
                            <img src="/img/phone.png" alt="Phone Icon" style={{ width: '30px', marginRight: '5px' }} />
                                +212642388045
                            </a>
                        </li>
                        
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;





// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import styled, { keyframes } from 'styled-components';

// const NavAnimation = keyframes`
//     0% {
//         transform: scale(1);
//     }
//     50% {
//         transform: scale(1.1);
//     }
//     100% {
//         transform: scale(1);
//     }
// `;

// const NavbarWrapper = styled.nav`
//     .navbar-nav .nav-link {
//         border-radius: 10px;
//         padding: 10px 20px;
//         position: relative;
//     }

//     .navbar-nav .nav-link:hover {
//         background-color: var(--shade10);
//         animation: ${NavAnimation} 0.5s ease-in-out;
//     }

//     .navbar-nav .nav-link::after {
//         content: '';
//         position: absolute;
//         bottom: -5px;
//         left: 0;
//         right: 20px;
//         width: 100%;
//         height: 2px;
//         background-color: var(--shade1);
//         z-index: -1;
//         visibility: hidden;
//         transition: visibility 0s, opacity 0.5s linear;
//         opacity: 0;
//     }

//     .navbar-nav .nav-link:hover::after {
//         visibility: visible;
//         opacity: 1;
//     }

//     .navbar {
//         justify-content: flex-start;
//         padding-left: 20px;
//         padding-right: 0;
//     }

//     .navbar-nav {
//         margin-left: auto;
//     }
// `;

// const Navbar = () => {
//     const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//     const handleMouseEnter = () => {
//         setIsDropdownOpen(true);
//     };

//     const handleMouseLeave = () => {
//         setIsDropdownOpen(false);
//     };

//     return (
//         <NavbarWrapper className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
//             <div className="container-fluid">
//                 <a className="navbar-brand" href="#">
//                     <img src="/img/bee.png" alt="Bee Icon" style={{ width: '35px', marginRight: '10px' }} />
//                 </a>
//                 <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//                     <span className="navbar-toggler-icon"></span>
//                 </button>
//                 <div className="collapse navbar-collapse" id="navbarNav">
//                     <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//                         <li className="nav-item">
//                             <a className="nav-link active" aria-current="page" href="#" style={{ color: 'black' }}>Home</a>
//                         </li>
//                         <li className="nav-item dropdown" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
//                             <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle={isDropdownOpen ? "dropdown" : ""} aria-expanded={isDropdownOpen} style={{ color: 'black' }}>
//                                 Features
//                             </a>
//                             <ul className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`} aria-labelledby="navbarDropdown">
//                                 <li><a className="dropdown-item" href="#">Mental Health Services</a></li>
//                                 <li><a className="dropdown-item" href="#">Accompagnement Services</a></li>
//                                 <li><a className="dropdown-item" href="#">Para-University Activities</a></li>
//                             </ul>
//                         </li>
//                         <li className="nav-item">
//                             <a className="nav-link" href="#" style={{ color: 'black' }}>Pricing</a>
//                         </li>
//                         <li className="nav-item">
//                             <a className="nav-link" href="#" style={{ color: 'black' }}>Contact Us</a>
//                         </li>
//                         <li className="nav-item">
//                             <a className="nav-link" href="#" style={{ color: 'black' }}>Sign Up</a>
//                         </li>
//                         <li className="nav-item">
//                             <a className="nav-link" href="#" style={{ color: 'black' }}>Let's Collaborate</a>
//                         </li>
//                     </ul>
//                     <ul className="navbar-nav">
//                         <li className="nav-item" style={{ marginRight: '80px' }}>
//                             <Link to="/login" className="nav-link btn btn-primary" style={{ color: 'white', backgroundColor: '#b2744c' }}>Se Connecter</Link>
//                         </li>
//                         <li className="nav-item">
//                             <a className="nav-link" href="#" style={{ color: 'black' }}>
//                                 <img src="/img/phone.png" alt="Phone Icon" style={{ width: '30px', marginRight: '5px' }} />
//                                 +212642388045
//                             </a>
//                         </li>
//                     </ul>
//                 </div>
//             </div>
//         </NavbarWrapper>
//     );
// };

// export default Navbar;
