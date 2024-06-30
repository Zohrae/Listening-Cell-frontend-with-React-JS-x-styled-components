import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';


const GlobalStyles = styled.div`
  :root {
    --primary-color: #b2744c;
    --secondary-color: #4c8ab2;
    
    /* Shades for secondary color */
    --shade1: #598dbf;
    --shade2: #669ecb;
    --shade3: #73aff8;
    --shade4: #80c0ff;
    --shade5: #8dd0ff;
    --shade6: #9ae0ff;
    --shade7: #a7f0ff;
    --shade8: #b4f9ff;
    --shade9: #c1ffff;
    --shade10: #e9f4f4;
    --shade11: #f5f9f9;

    /* Shades for primary color */
    --pshade1: #b97f63;
    --pshade12: #98705a;
    --pshade2: #c28b71;
    --pshade3: #cc967f;
    --pshade4: #d6a08d;
    --pshade5: #e1ab9b;
    --pshade6: #ebb6a9;
    --pshade7: #f5c1b7;
    --pshade8: #ffccc6;
    --pshade9: #ffd6d4;
    --pshade10: #ffe1e2;
    --pshade11: #f8f8f8;
    --pshade14: #f6f2f2;
    --pshade1: #f9f3f0;
  }
`;

// Define keyframes for animations
const hoverAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.05);
  }
`;


const FormImageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;  // Align elements to the bottom
  margin-left: ${props => (props.collapsed ? '60px' : '200px')};
  transition: margin-left 0.3s ease;

  @media (max-width: 800px) {
    flex-direction: column;
    margin-left: 0;
  }
`;


const Image = styled.img`
  width: 400px;  // Adjust size as needed
  height: 400px; // Adjust size as needed
  border-radius: 8px;
  margin-left: 90px; // Space between form and image
  margin-bottom: 20px; // Adjust bottom margin to position the image correctly

  @media (max-width: 800px) {
    display: none;
  }
`;

const FormContainer = styled.div`
  background-color: var(--shade11);
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 10px;
  width: 500px;
  margin: 90px auto;
  font-family: Arial, sans-serif;

  @media (max-width: 900px) {
    width: 540px; // Reduce width for smaller screens
    margin: 30px auto; 
    margin-left: 60px;
  }

  @media (max-width: 800px) {
    width: 500px; // Reduce width for smaller screens
    margin: 30px auto; 
    margin-top: 100px;
    margin-left: 90px;
  }

  @media (max-width: 700px) {
    width: 450px; // Reduce width for smaller screens
    margin: 30px auto; 
    margin-top: 100px;
    margin-left: 90px;
  }

  @media (max-width: 600px) {
    width: 350px; // Reduce width for smaller screens
    margin: 30px auto; 
    margin-top: 100px;
    margin-left: 80px;

  }

  @media (max-width: 500px) {
    width: 300px; // Reduce width for smaller screens
    margin: 30px auto; 
    margin-top: 100px;
    margin-left: 70px;

  }

  @media (max-width: 400px) {
    width: 200px; // Reduce width for smaller screens
    margin: 30px auto; 
    margin-top: 100px;
    margin-left: 80px;

  }



  @media (max-width: 300px) {
    width: 90%; // Reduce width for smaller screens
    margin: 20px auto; // Adjust margin as needed
  }

  h2 {
    color: var(--primary-color);
    text-align: center;
  }

  form {
    display: flex;
    flex-direction: column;

    div {
      margin-bottom: 15px;
    }

    div:last-child {
      margin-bottom: 0;
    }
    overflow-x: hidden;
    overflow-y: hidden;

    label {
      font-weight: bold;
      margin-bottom: 5px;
      display: block;
      text-align: left; /* Align labels to the left */
    }

    input, select, textarea {
      width: 100%;
      padding: 10px;
      border: 1px solid var(--secondary-color);
      border-radius: 4px;
      outline: none;
      transition: box-shadow 0.3s ease;

      &:hover {
        box-shadow: 0 0 5px var(--secondary-color);
      }
    }

    button {
      background-color: var(--primary-color);
      color: white;
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.3s ease;
      animation: ${hoverAnimation} 0.3s ease-in-out;

      &:hover {
        background-color: var(--pshade4);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      }
    }

    p {
      color: var(--secondary-color);
      font-weight: bold;
    }
  }
`;


const Container = styled.div`
    display: flex;
    height: 100vh;
    width: 100%;
    overflow: hidden;
`;


const Sidebar = styled.div`
  position: fixed;
  top: 70px; 
  left: 30px; 
  bottom: 20px; 
  width: ${props => (props.collapsed ? '60px' : '200px')}; /* Adjusted width */
  height: calc(100% - 110px); 
  background-color: var(--dark-grey);
  color: black;
  padding: 20px 0;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  z-index: 999; 
  border-radius: 25px;

  @media (max-width: 800px) {
    width: 60px; // Collapse sidebar by default
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    li {
      padding: 15px 20px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 10px;
      &:hover {
        background-color: var(--shade10);
        border-radius: 25px;
        padding: 6px 5px;
      }

      span {
        display: ${props => (props.collapsed ? 'none' : 'inline')}; /* Hide text when collapsed */
      }
      &.activo {
        color: var(--secondary-color);

        border-radius: 25px;
        padding: 3px 5x;
      
      }
    }
  }
`;









const Demande = () => {
    const [title, setTitle] = useState('');
    const [conseiller, setConseiller] = useState('');
    const [description, setDescription] = useState('');
    const [dateHeure, setDateHeure] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [disponibilites, setDisponibilites] = useState([]);
    const [selectedDateDetails, setSelectedDateDetails] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const etudiantId = localStorage.getItem('etudiantId');

    const navigate = useNavigate();


    const [error, setError] = useState('');
    const [conseillers, setConseillers] = useState([]);

    useEffect(() => {
      if (!etudiantId) {
        navigate('/getin');
        return; 
      }
        const fetchConseillers = async () => {
            const response = await fetch('http://localhost:8000/api/conseillers/');
            const data = await response.json();
            setConseillers(data);
        };

        fetchConseillers();
    }, []);

    const fetchDisponibilites = async (conseillerId) => {
      try {
        const response = await fetch(`http://localhost:8000/api/dispos/?conseiller=${conseillerId}`);
        const allDisponibilites = await response.json();
    
        const demandesResponse = await fetch(`http://localhost:8000/api/demandes/?conseiller=${conseillerId}&etat=En attente,Acceptée`);
        const demandes = await demandesResponse.json();
    
        const takenDates = demandes.map(demande => new Date(demande.date_heure).toISOString());
    
        const availableDisponibilites = allDisponibilites.filter(disponibilite => 
          !takenDates.includes(new Date(disponibilite.date_heure).toISOString())
        );
    
        setDisponibilites(availableDisponibilites);
      } catch (error) {
        console.error('Error fetching disponibilites:', error);
      }
    };
    

    const handleConseillerChange = (e) => {
      const conseillerId = e.target.value;
      setConseiller(conseillerId);
      fetchDisponibilites(conseillerId);
    };


    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const response = await fetch('http://localhost:8000/api/demandes/', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  title: title,
                  conseiller: conseiller,
                  etudiant: localStorage.getItem('etudiantId'), 
                  description: description,
                  date_heure: dateHeure,  
              }),
          });
  
          if (response.ok) {
              setTitle('');
              setConseiller('');
              setDescription('');
              setDateHeure('');
  
              window.alert('Demande ajoutée avec succès, attendez pour la réponse de votre conseiller');
          } else {
              setError('Failed to submit the demande');
          }
      } catch (error) {
          console.error('Error:', error);
          setError('An unexpected error occurred');
      }
  };  
  

    const openModal = () => {
      setModalIsOpen(true);
    };
  
    const closeModal = () => {
      setModalIsOpen(false);
    };

    const customStyles = {
      content: {
        width: '285px', 
        height: '410px', 
        margin: 'auto',  
      },
    };

  

    const handleDateSelect = (date) => {
      setSelectedDate(date);
      fetchDateDetails(date);
  };

const fetchDateDetails = (selectedDate) => {
  const dateDetails = disponibilites.filter(disponibilite => {
      const date = new Date(disponibilite.date_heure);
      return date.toDateString() === selectedDate.toDateString();
  });
  setSelectedDateDetails(dateDetails);
};

const handleSelectDateDetail = (dateDetail) => {
  const selectedDateTime = new Date(dateDetail.date_heure);
  const utcDateTime = new Date(selectedDateTime.getTime());
  const formattedDate = `${utcDateTime.toLocaleDateString()} ${utcDateTime.toLocaleTimeString()}`;
  setDateHeure(utcDateTime.toISOString()); 
  closeModal();
};

const availableDates = disponibilites.map(disponibilite => new Date(disponibilite.date_heure));

useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth < 800) {
      setIsSidebarCollapsed(true);
    } else {
      setIsSidebarCollapsed(false);
    }
  };

  window.addEventListener('resize', handleResize);
  handleResize(); // Initial check

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
      navigate('/getin'); 
  };

  const handleNavigation = (url) => {
    navigate(url);
  };  

    return (
        <GlobalStyles>
          <Container>
            <style>
              {`
                @import url('https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css');
              `}
            </style>
            <Navbar />
            <Sidebar collapsed={isSidebarCollapsed}>
            <ul>
                <li onClick={() => handleNavigation('/mindCare')}><i className="bx bxs-dashboard"></i><span>Dashboard</span></li>
                <li onClick={() => handleNavigation('/mindCare/chat')}><i className="bx bxs-chat"></i><span>Messagerie</span></li>
                <li onClick={() => handleNavigation('/mindCare/myfeedback')}><i className="bx bxs-comment"></i><span>Mes Feedback</span></li>
                <li  className="activo" onClick={() => handleNavigation('/mindCare/myAppointments')}><i className="bx bxs-folder"></i><span>Mes Consultations</span></li>
                <li onClick={handleLogout}><i className="bx bxs-log-out" style={{color: '#b03d33'}}></i><span>Déconnexion</span></li>
            </ul>
            </Sidebar>

            <FormImageContainer collapsed={isSidebarCollapsed}>
              <FormContainer>
                <h2>Rendez-Vous</h2>
                <form onSubmit={handleSubmit}>
                  <div>
                    <label>Titre:</label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div>
                  <label>Conseiller:</label>
                  <select value={conseiller} onChange={handleConseillerChange}>
                    <option value="">Choisissez un conseiller</option>
                    {conseillers.map((conseiller) => (
                      <option key={conseiller.id} value={conseiller.id}>
                        {conseiller.Nom} {conseiller.Prenom}
                      </option>
                    ))}
                  </select>
                </div>
                  <div>
                    <label>Description:</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div>
                  <label>Date et Heure:</label>
                  <input
                    type="text"
                    value={dateHeure}
                    onChange={(e) => setDateHeure(e.target.value)}
                    onClick={openModal}
                  />
                </div>
                      <button type="submit">Demander</button>
                    </form>
                    {error && <p>{error}</p>}
                  </FormContainer>
                <Image src="/img/accc.png" alt="Description of image" />
            </FormImageContainer>

          </Container>

          <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Disponibilités du Conseiller"
                style={customStyles}
            >
                <h2>Disponibilités</h2>
                <DatePicker
                    inline
                    selected={selectedDate}
                    includeDates={availableDates}
                    onChange={(date) => handleDateSelect(date)}
                />
                <ul>
                    {selectedDateDetails.map((disponibilite) => {
                        const utcDateTime = new Date(new Date(disponibilite.date_heure).getTime() + new Date(disponibilite.date_heure).getTimezoneOffset() * 60000);
                        return (
                            <li key={disponibilite.id} onClick={() => handleSelectDateDetail(disponibilite)}>
                                {utcDateTime.toLocaleTimeString()}
                            </li>
                        );
                    })}
                </ul>
                <button 
                  onClick={closeModal} 
                  style={{
                      position: 'absolute',
                      top: '0px',
                      right: '0px',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                  }}
              >
                  <img src="/img/x.png" alt="Fermer" style={{ width: '22px', height: '22px' }} />
              </button>
            </Modal>
        </GlobalStyles>
      );
    };
    

export default Demande;
