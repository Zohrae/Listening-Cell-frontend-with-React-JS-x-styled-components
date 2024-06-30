import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom'; 
import { HashLink as Link } from 'react-router-hash-link'; 

import './navbar.css';

const Navbar = () => {
    const [etudiantId, setEtudiantId] = useState(null);
    const [student, setStudent] = useState(null);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

    useEffect(() => {
        const storedEtudiantId = localStorage.getItem('etudiantId'); // Changed to localStorage
        if (storedEtudiantId) {
            setEtudiantId(storedEtudiantId);
        }
    }, []);


    useEffect(() => {
        const fetchStudent = async () => {
            if (etudiantId) {
                try {
                    const response = await fetch(`http://127.0.0.1:8000/api/etudiants/${etudiantId}/`);
                    const data = await response.json();
                    setStudent(data);  
                } catch (error) {
                    console.error('Error fetching student data:', error);
                }
            }
        };

        fetchStudent();
    }, [etudiantId]);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleMouseEnter = () => {
        setIsDropdownOpen(true);
    };

    const handleMouseLeave = () => {
        setIsDropdownOpen(false);
    };

    const toggleUserDropdown = () => {
        setIsUserDropdownOpen(!isUserDropdownOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem('etudiantId');
        setEtudiantId(null);
        setIsUserDropdownOpen(false);
    };

    

    return (
        <nav id="navbar-section" className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
            <style>
                {`
                @import url('https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css');
                `}
            </style>
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    <img src="/img/loo.png" alt="Bee Icon" style={{ width: '90px', marginRight: '10px' }} />
                </a>                
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/" className="nav-link" style={{ color: 'black' }}>Accueil</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/mental" className="nav-link" style={{ color: 'black' }}>Bienfaits</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="#about" className="nav-link" style={{ color: 'black' }}>À Propos</Link>
                        </li>
                        <li className="nav-item">
                            <a 
                                className="nav-link" 
                                href={etudiantId ? "/" : "/faq"} 
                                style={{ color: 'black' }}
                            >
                                {etudiantId ? 'Nos Feedback' : 'FAQ'}
                            </a>
                        </li>
                        <li className="nav-item">
                            <a 
                                className="nav-link" 
                                href={etudiantId ? "/" : "/login"} 
                                style={{ color: 'black' }}
                            >
                                {etudiantId ? 'FAQ' : 'Se Connecter'}
                            </a>
                        </li>
                        <li className="nav-item">
                            <a 
                                className="nav-link" 
                                href={etudiantId ? "/" : "/collaborate"} 
                                style={{ color: 'black' }}
                            >
                                {etudiantId ? 'Événements' : 'Collaborer avec Nous'}
                            </a>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                    <li className="nav-item" style={{ marginRight: '80px' }}>
                            <Link 
                                to={etudiantId ? "/mindCare/demander" : "/getin"} 
                                className="nav-link btn btn-primary" 
                                style={{ color: 'white', backgroundColor: '#b2744c', borderColor: '#b2744c' }}
                            >
                                {etudiantId ? 'Commencer' : 'Rendez-Vous'}
                            </Link>
                        </li>
                        {etudiantId ? (
                            <li className="nav-item d-flex align-items-center">
                                <i className="bx bxs-bell" style={{ fontSize: '30px', marginRight: '15px', cursor: 'pointer', color: '#4c8ab2' }}></i>
                                {student && student.image ? (
                                    <img  src={student.image} 
                                    alt={`${student.Nom} ${student.Prenom}`} 
                                    style={{ width: '30px', height: '30px', borderRadius: '50%', cursor: 'pointer' }}
                                    onClick={toggleUserDropdown}/>
                                ) : (
                                    <i className="bx bxs-user" style={{ fontSize: '30px', cursor: 'pointer' }}></i>
                                )}
                                <ul className={`dropdown-menu ${isUserDropdownOpen ? "show" : ""}`} style={{ position: 'absolute', top: '100%', right: 0 }}>
                                    <li><Link className="dropdown-item" to="/mindCare">Dashboard</Link></li>
                                    <li><a className="dropdown-item" href="#" onClick={handleLogout}>Deconnexion</a></li>
                                </ul>
                            </li>
                        ) : (
                            <li className="nav-item">
                                <a className="nav-link" href="#" style={{ color: 'black' }}>
                                    <img src="/img/phone.png" alt="Phone Icon" style={{ width: '30px', marginRight: '5px' }} />
                                    +212642388045
                                </a>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;