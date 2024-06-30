import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title as ChartTitle, CategoryScale } from 'chart.js';
ChartJS.register(LineElement, PointElement, LinearScale, ChartTitle, CategoryScale);
import { useNavigate } from 'react-router-dom';



const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
  }

  li {
    list-style: none;
  }

  :root {
    --poppins: 'Poppins', sans-serif;
    --lato: 'Lato', sans-serif;

    --light: #F9F9F9;
    --blue: #3C91E6;
    --light-blue: #CFE8FF;
    --grey: #eee;
    --dark-grey: #AAAAAA;
    --dark: #342E37;
    --red: #DB504A;
    --yellow: #FFCE26;
    --light-yellow: #FFF2C6;
    --orange: #FD7238;
    --light-orange: #FFE0D3;
  }

  html {
    overflow-x: hidden;
  }

  body.dark {
    --light: #0C0C1E;
    --grey: #060714;
    --dark: #FBFBFB;
  }

  body {
    background: var(--grey);
    overflow-x: hidden;
  }
`;

const Sidebar = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  width: ${(props) => (props.open ? '240px' : '80px')}; /* Adjust width based on sidebarOpen state */
  height: 100%;
  background: var(--light);
  z-index: 2000;
  font-family: var(--lato);
  transition: .3s ease;
  overflow-x: hidden;
  scrollbar-width: none;

  @media screen and (max-width: 768px) {
    width: ${(props) => (props.open ? '240px' : '80px')}; /* Hide sidebar on small screens */
  }
`;

const SidebarTitle = styled.span`
  display: ${(props) => (props.show ? 'block' : 'none')};
`;

// Styled component for the brand link
const Brand = styled.a`
  font-size: 24px;
  font-weight: 700;
  height: 56px;
  display: flex;
  align-items: center;
  color: var(--blue);
  position: sticky;
  top: 0;
  left: 0;
  background: var(--light);
  z-index: 500;
  padding-bottom: 20px;
  box-sizing: content-box;
`;

// Styled component for the side menu
const SideMenu = styled.ul`
  width: 100%;
  margin-top: 48px;
`;

// Styled component for the side menu item
const SideMenuItem = styled.li`
  height: 48px;
  background: transparent;
  margin-left: 6px;
  border-radius: 48px 0 0 48px;
  padding: 4px;
`;

// Styled component for the active side menu item
const SideMenuItemActive = styled(SideMenuItem)`
  background: var(--grey);
  position: relative;
`;

// Styled component for the side menu link
const SideMenuItemLink = styled.a`
  width: 100%;
  height: 100%;
  background: var(--light);
  display: flex;
  align-items: center;
  border-radius: 48px;
  font-size: 16px;
  color: var(--dark);
  white-space: nowrap;
  overflow-x: hidden;
  &:hover {
    color: var(--primary-color); /* Change text color to primary color on hover */
  }
`;

const SideMenuItemIcon = styled.i`
  min-width: calc(60px  - ((4px + 6px) * 2));
  display: flex;
  justify-content: center;
  margin-top: 0px;
  margin-left: -13px;
`;

const TopNavbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--light);
  
  padding: 10px 20px;
  width: ${(props) => (props.open ? 'calc(100% - 240px)' : 'calc(100% - 60px)')}; /* Adjust width based on sidebarOpen state */
  position: fixed; /* Position the navbar at the top */
  top: 0; /* Align the navbar to the top */
  z-index: 2000; /* Ensure the navbar is above the sidebar */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Add shadow for better visibility */
  left: ${(props) => (props.open ? '240px' : '60px')}; /* Align the navbar to the right edge of the sidebar */
  flex-wrap: nowrap; /* Ensure items don't wrap to the next line */
  height: 60px;

  @media screen and (max-width: 768px) {
    width: ${(props) => (props.open ? '100%' : 'calc(100% - 60px)')};
  }
`;

const ContentContainer = styled.div`
  width: ${(props) => (props.open ? 'calc(100vw - 280px)' : 'calc(100vw - 60px)')}; /* Adjust width based on sidebarOpen state */
  margin-left: ${(props) => (props.open ? '280px' : '60px')}; /* Adjust margin to move content away from the sidebar */
  display: flex;
  justify-content: center; /* Center the content horizontally */
  align-items: center; /* Center the content vertically */
  margin-top: -150px;
`;
// Styled component for the search bar
const SearchBarContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center; /* Center items horizontally */
`;

// Styled component for the search bar
const SearchBar = styled.input`
  width: 300px;
  height: 40px;
  border-radius: 20px;
  border: 1px solid var(--blue);
  padding: 0 20px;
  font-size: 16px;
  transition: border-color 0.3s ease; /* Add transition for smooth hover effect */
  outline: none;
  &:hover {
    border-color: transparent; /* Remove border on hover */
  }


`;

const BlueLine = styled.div`
  position: fixed;
  top: 170px; /* Adjust this value as needed to position the line */
  right: 0;
  height: 1px; /* Height of the line */
  width: 18%; /* Width of the line */
  background-color: #b2744c; /* Use your blue color variable */
  z-index: 1000;

`;

const NotificationIcon = styled.i`
  font-size: 24px;
  color: var(--dark-grey);
  cursor: pointer;
  margin-left: 10px; /* Add margin to create space between elements */
`;

const ProfileIcon = styled.i`
  font-size: 24px;
  color: #4c8ab2; /* Change the color to blue */
  cursor: pointer;
  margin-left: 10px; /* Add margin to create space between elements */
`;


const Dropdown = styled.ul`
  position: absolute;
  top: 50px;
  right: 20px;
  background-color: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 10px;
  list-style-type: none;
`;

// Styled component for the dropdown item
const DropdownItem = styled.li`
  margin-bottom: 5px;
`;

const DataTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #ddd; /* Add border to the table */
  margin-top: 60px;
  border-radius: 10px !important; /* Add border radius */
  overflow-y: hidden; /* Supprimer le défilement vertical */


`;

// Styled component for the table header
const TableHeader = styled.th`
  padding: 12px;
  background-color: #f2f2f2;
  border: 1px solid #ddd;
  text-align: left;
`;

// Styled component pour les cellules de données
const TableData = styled.td`
  padding: 12px;
  border: 1px solid #ddd;
`;

const Title = styled.h2`
  margin-top: -65px;
  margin-bottom: 10px;
  position: fixed;
  top: 200px; /* Adjust this value as needed */
  right: 0;
  margin-right: 20px;
  font-weight: normal; /* Utiliser un poids de police normal */
  font-size: 24px; /* Ajuster la taille de la police au besoin */
  font-family: Helvetica, sans-serif;

`;

const StyledTitle = styled(Title)`
font-family: "Open Sans", sans-serif;
`;


const DataTableContainer = styled.div`
  overflow-x: auto;
  overflow-y: hidden; /* Enable vertical scrolling */
  max-height: 400px; /* Maximum height of the container */
  width: calc(100% - 60px);
  margin-top: 220px;
  @media screen and (max-width: 768px) {
    width: calc(100% - 100px);
  }
`;

const PaginationButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;

  @media screen and (max-width: 768px) {
    font-size: 14px;
    padding: 5px; /* Adjust padding for smaller screens */
  }
`;

const LargeTableData = styled(TableData)`
  padding: ${(props) => props.iconPadding || '12px'}; /* Adjust padding as needed */
  width: 1%; /* Set a fixed width for the table data */
  text-align: center; /* Center align the content horizontally */
  vertical-align: middle; /* Vertically center the content */
  button {
    max-width: 10px; /* Adjust the max-width as needed */
  }
`;


const DemandesButton = styled.button`
background-color: #b2744c;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 8px 10px;
  font-size: 16px;
  width: 150px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  position: absolute;
  top: 114px;
  left: ${(props) => (props.open ? '425px' : '105px')}; /* Adjust the left position based on sidebarOpen state */
  margin-left: ${(props) => (props.open ? '-70px' : '70px')};
  &:hover {
    background-color: var(--pshade2);
    color: white;
  }

  @media screen and (max-width: 768px) {
    left: 93px; /* Move the button to the left when screen is small */
    top: 108px; /* Adjust the top position as needed */
  }
`;

const MenuIcon = styled.i`
  font-size: 24px;
  color: var(--dark-grey);
  cursor: pointer;
  margin-right: 10px; /* Adjust margin to create space between elements */
`;

const MenuIconContainer = styled.div`
  width: 60px; /* Set a fixed width to ensure the icon remains visible */
`;

const StyledLink = styled(Link)`
  width: 100%;
  height: 100%;
  background: var(--light);
  display: flex;
  align-items: center;
  border-radius: 48px;
  font-size: 16px;
  color: var(--dark);
  white-space: nowrap;
  overflow-x: hidden;
  text-decoration: none; /* Add this to remove default underline from link */

  &:hover {
    color: var(--primary-color); /* Change text color to primary color on hover */
  }
`;

const ActionRecButton = styled.button`
  background-color: transparent; /* Remove background color */
  color: green; /* Set text color */
  border: none;
  border-radius: 10px;
  padding: 5px 10px;
  font-size: 14px;
  width: 30px;
  cursor: pointer;
  margin-right: 30px;
`;


const LirePlusButton = styled.button`
  background-color: transparent;
  color: var(--secondary-color);
  border: none;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;

  &:hover {
    // background-color: var(--shade10);
  }
`;

const ObservationItem = styled.li`
  border: 1px solid var(--primary-color);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 10px;
  margin-bottom: 10px;
  background-color: white;
  margin-left: -7%;
`;

const FeedbackList = styled.ul`
  list-style: none;
  padding: 0;
`;

const FeedbackItem = styled.li`
  margin-bottom: 20px;
  position: relative;
`;

const FeedbackBubble = styled.div`
  background-color: var(--shade10);
  border-radius: 15px;
  padding: 15px;
  max-width: 99%;
  word-wrap: break-word;
  margin-bottom: 10px;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    border: 10px solid transparent;
    border-top-color: #f1f1f1;
    left: 20px;
    bottom: -20px;
  }
`;

const FeedbackBubbleTail = styled.div`
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  border: 10px solid transparent;
  border-top-color: #f1f1f1;
  left: 30px;
  bottom: -20px;
`;

const FeedbackBubbleCircle = styled.div`
  content: '';
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #f1f1f1;
  left: 45px;
  bottom: -30px;
`;

const DemandeList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const DemandeItem = styled.li`
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 2px var(--pshade2);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  cursor: pointer;
  background-color: var(--shade11);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  p {
    margin: 0;
  }

  .date {
    font-style: italic;
    color: #777;
    font-size: 0.9em;
  }
`;


function Records() {
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [records, setRecords] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true); // Initialize sidebar as open
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sentimentData, setSentimentData] = useState([]);
  const [studentDetails, setStudentDetails] = useState({}); 
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
  const [demandes, setDemandes] = useState([]);
  const [selectedEtudiantId, setSelectedEtudiantId] = useState(null);
  const [showFullObservation, setShowFullObservation] = useState({});
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const [isRendeaVousModalOpen, setIsRendeaVousModalOpen] = useState(false);
  const [demandesModal, setDemandesModal] = useState([]);
  const navigate = useNavigate();



  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = records.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(records.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const id = localStorage.getItem('conseiller_id');
        if (!id) {
          navigate('/login');
          return; 
        }
        const response = await fetch(`http://localhost:8000/api/notifications/?conseiller=${id}&vu=false`);
        if (response.ok) {
          const data = await response.json();
          const unreadNotifications = data.filter(notification => !notification.vu);
          setNotifications(unreadNotifications);
          if (unreadNotifications.length > 0) {
            document.getElementById('notificationIcon').style.color = 'red';
          }
        } else {
          console.error('Failed to fetch notifications:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };
  
    fetchNotifications();
  }, []);
  
  const handleNotificationClick = async () => {
    setShowDropdown(!showDropdown);
    try {
      const id = localStorage.getItem('conseiller_id');
      if (!id) {
        navigate('/login');
        return; 
      }
      const response = await fetch(`http://localhost:8000/api/notifications/?conseiller=${id}`);
      if (response.ok) {
        const data = await response.json();
        data.forEach(async notification => {
          if (!notification.vu) {
            const updateResponse = await fetch(`http://localhost:8000/api/notifications/${notification.id}/`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ vu: true }), // Mettre à jour "vu" à true
            });
            if (updateResponse.ok) {
            } else {
              console.error('Failed to update notification:', updateResponse.statusText);
            }
          }
        });
        const hasUnreadNotifications = data.some(notification => !notification.vu);
        if (!hasUnreadNotifications) {
          document.getElementById('notificationIcon').style.color = 'var(--dark-grey)';
        }
      } else {
        console.error('Failed to fetch notifications:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };
  
  
  

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen); // Toggle sidebar state
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login'; 
  };

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/dossiers/');
        if (response.ok) {
          const data = await response.json();
          setRecords(data);
        } else {
          console.error('Failed to fetch records:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching records:', error);
      }
    };
  
    fetchRecords();
  }, []);


  useEffect(() => {
    const fetchStudentDetails = async () => {
      const studentIds = records.map(record => record.etudiant);
      const uniqueStudentIds = Array.from(new Set(studentIds)); // Get unique student IDs
      uniqueStudentIds.forEach(async studentId => {
        try {
          const response = await fetch(`http://localhost:8000/api/etudiants/${studentId}/`);
          if (response.ok) {
            const studentData = await response.json();
            setStudentDetails(prevState => ({
              ...prevState,
              [studentId]: studentData, 
            }));
          } else {
            console.error(`Failed to fetch student details for ID ${studentId}:`, response.statusText);
          }
        } catch (error) {
          console.error(`Error fetching student details for ID ${studentId}:`, error);
        }
      });
    };

    fetchStudentDetails();
  }, [records]);

    const openModal = (etudiant) => {
    setSentimentData([]); 
    fetch(`http://localhost:8000/api/feedbacks/analyze/?etudiant=${etudiant}`)
        .then(response => response.json())
        .then(data => {
            setSentimentData(data);
            setIsModalOpen(true);
        })
        .catch(error => console.error('Error fetching sentiment analysis:', error));
        };

        const closeModal = () => {
            setIsModalOpen(false);
            setSentimentData([]); // Clear sentiment data when modal is closed
        };


    const sentimentChartData = {
      labels: sentimentData.map((item, index) => `Feedback ${item.feedback_id}`),
      datasets: [{
          label: 'Sentiment Score',
          data: sentimentData.map(item => item.score),
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: true,
          tension: 0.4
      }]
  };
  
  const chartOptions = {
    responsive: true,
    scales: {
        y: {
            beginAtZero: true,
            min: -2, // Adjust min to fit negative sentiment scores
            max: 2   // Adjust max to fit positive sentiment scores
        }
    },
    animations: {
        tension: {
            duration: 1000,
            easing: 'easeInOutBounce',
            from: 1,
            to: 0,
            loop: true
        }
    }
  };

  const openFolderModal = (etudiantId) => {
    setSelectedEtudiantId(etudiantId);
    fetchDemandes(etudiantId);
  };

  const closeFolderModal = () => {
    setIsFolderModalOpen(false);
  };

  const fetchDemandes = async (etudiantId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/demandes/?etudiant=${etudiantId}`);
      if (response.ok) {
        const demandesData = await response.json();
  
        const demandesWithObservations = await Promise.all(demandesData.map(async demande => {
          const observationResponse = await fetch(`http://localhost:8000/api/observations/?demande=${demande.id}`);
          if (observationResponse.ok) {
            const observations = await observationResponse.json();
            return { ...demande, observations };
          } else {
            console.error('Failed to fetch observations:', observationResponse.statusText);
            return { ...demande, observations: [] };
          }
        }));
  
        setDemandes(demandesWithObservations);
        setIsFolderModalOpen(true);
      } else {
        console.error('Failed to fetch demandes:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching demandes:', error);
    }
  };
  
  const handleShowMore = (id) => {
    setShowFullObservation(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  const openFeedbackModal = async (etudiantId) => {
    try {
        const response = await fetch(`http://localhost:8000/api/feedbacks/?etudiant=${etudiantId}`);
        if (response.ok) {
            const data = await response.json();
            setFeedbacks(data);
            setIsFeedbackModalOpen(true);
        } else {
            console.error('Failed to fetch feedbacks:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching feedbacks:', error);
    }
};


  const closeFeedbackModal = () => {
      setIsFeedbackModalOpen(false);
  };

  const openRendeaVousModal = async (etudiantId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/demandes/?etudiant=${etudiantId}`);
      if (response.ok) {
        const demandesData = await response.json();
        setDemandesModal(demandesData);
        setIsRendeaVousModalOpen(true);
      } else {
        console.error('Failed to fetch demandes:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching demandes:', error);
    }
  };
  
  const closeRendeaVousModal = () => {
    setIsRendeaVousModalOpen(false);
  };
  
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link rel="stylesheet" href="https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css" />
        <GlobalStyles />

        <title>Vos Dossiers</title>
      </head>
      <body>
      <TopNavbar open={sidebarOpen}> {/* Pass the sidebarOpen state to adjust position */}
      <MenuIconContainer>
            <MenuIcon className={sidebarOpen ? 'bx bx-menu' : 'bx bx-menu-alt-right'} onClick={toggleSidebar} />
          </MenuIconContainer>
        <SearchBarContainer>
            <SearchBar type="text" placeholder="Search..." />
        </SearchBarContainer>      
        <NotificationIcon onClick={() => handleNavigation('/dashboard/chat')} className="bx bx-chat" style={{ color: 'var(--secondary-color)' }} />        
        <NotificationIcon id="notificationIcon" className="bx bx-bell" onClick={handleNotificationClick} />
          <ProfileIcon className="bx bx-user-circle" />
          {showDropdown && (
              <Dropdown>
                {notifications.length > 0 ? (
                  notifications.map(notification => (
                    <DropdownItem key={notification.id}>{notification.message}</DropdownItem>
                  ))
                ) : (
                  <DropdownItem>No notifications</DropdownItem>
                )}
              </Dropdown>
            )}
        </TopNavbar>
        {/* SIDEBAR */}
        <ContentContainer open={sidebarOpen}>

        <Sidebar id="sidebar" open={sidebarOpen}> {/* Pass the sidebarOpen state to adjust width */}
          <Brand href="#">
          <img
            src={sidebarOpen ? "/img/loo.png" : "/img/bee.png"} // Changer le chemin de l'image en fonction de l'état de la barre latérale
            alt=""
            width={sidebarOpen ? '145px' : '30px'} // Modifier la largeur de l'image en fonction de l'état de la barre latérale
            style={{ marginTop: '25px', marginLeft: sidebarOpen ? '30px' : '30px' }} // Ajouter une marge à gauche en fonction de l'état de la barre latérale
          />          
          </Brand>
          <SideMenu>
            <SideMenuItem className="active">
            <StyledLink to="/dashboard">
                <SideMenuItemIcon className='bx bxs-dashboard'></SideMenuItemIcon>
                <SidebarTitle show={sidebarOpen}>Dashboard</SidebarTitle>
              </StyledLink>
            </SideMenuItem>
            <SideMenuItem>
            <StyledLink to="/dashboard/students">
                <SideMenuItemIcon className='bx bxs-group'></SideMenuItemIcon>
                <SidebarTitle show={sidebarOpen}>Etudiants</SidebarTitle>
              </StyledLink>
            </SideMenuItem>
            <SideMenuItem>
            <StyledLink to="/dashboard/demandes">
              <SideMenuItemIcon  className='bx bxs-shopping-bag-alt'></SideMenuItemIcon>
                <SidebarTitle show={sidebarOpen} >Demandes</SidebarTitle>
              </StyledLink>
            </SideMenuItem>
            <SideMenuItem>
              <StyledLink to="/dashboard/rendezvous">
              <SideMenuItemIcon className='bx bxs-time'></SideMenuItemIcon>
                <SidebarTitle show={sidebarOpen}>Rendez-Vous</SidebarTitle>
              </StyledLink>
            </SideMenuItem>
            <SideMenuItemActive>
              <StyledLink to="/dashboard/records">
              <SideMenuItemIcon style={{ color: 'var(--secondary-color)' }} className='bx bxs-folder'></SideMenuItemIcon>
                <SidebarTitle show={sidebarOpen} style={{ color: 'var(--secondary-color)' }}>Dossiers</SidebarTitle>
              </StyledLink>
            </SideMenuItemActive>
            <SideMenuItem>
            <StyledLink to="/dashboard/calendar">
                <SideMenuItemIcon className='bx bxs-calendar'></SideMenuItemIcon>
                <SidebarTitle show={sidebarOpen}>Evénements</SidebarTitle>
              </StyledLink>
            </SideMenuItem>
            <SideMenuItem>
            <StyledLink to="/dashboard/feedbacks">
                <SideMenuItemIcon className='bx bxs-chat'></SideMenuItemIcon>
                <SidebarTitle show={sidebarOpen}>Feedback</SidebarTitle>
              </StyledLink>
            </SideMenuItem>
          </SideMenu>
          <SideMenu>
            <SideMenuItem>
            <SideMenuItemLink href="#" className="logout" onClick={handleLogout}>
              <SideMenuItemIcon className='bx bxs-log-out-circle' style={{ color: 'var(--red)' }}></SideMenuItemIcon> {/* Change color to red */}
                <SidebarTitle show={sidebarOpen}>Déconnexion</SidebarTitle>
              </SideMenuItemLink>
            </SideMenuItem>
          </SideMenu>
          </Sidebar>

          <DataTableContainer>
          <DemandesButton open={sidebarOpen}>Dossiers</DemandesButton>
          <StyledTitle id="uniqueTitleId">Liste des Dossiers</StyledTitle>
          <BlueLine />
          <DataTable>
            <thead>
              <tr>
                <TableHeader>Étudiant Conserné</TableHeader>
                <TableHeader>Actions</TableHeader>
              </tr>
            </thead>
            <tbody>
              {currentItems.map(record => (
                <tr key={record.id}>
                  <LargeTableData>{`${studentDetails[record.etudiant]?.Nom} ${studentDetails[record.etudiant]?.Prenom}`}</LargeTableData>
                  <LargeTableData iconPadding="8px">
                    <ActionRecButton onClick={() => openFeedbackModal(record.etudiant)}>
                        <img src="/img/feedback.png" alt="View Feedbacks" width={'30px'} />
                    </ActionRecButton>
                    <ActionRecButton onClick={() => openRendeaVousModal(record.etudiant)}>
                      <img src="/img/appoit.png" alt="Show Demandes" width={'30px'} />
                    </ActionRecButton>
                    <ActionRecButton onClick={() => openModal(record.etudiant)}>
                      <img src="/img/analys.png" alt="Analysis" width={'30px'} />
                    </ActionRecButton>
                    <ActionRecButton onClick={() => openFolderModal(record.etudiant)}>
                      <img src="/img/folder.png" alt="Folder" width={'30px'} />
                    </ActionRecButton>
                  </LargeTableData>
                </tr>
              ))}
            </tbody>
          </DataTable>
          <div>
            {pageNumbers.map((number) => (
              <PaginationButton key={number} onClick={() => handlePageChange(number)}>
                {number === currentPage ? (
                  <i className={number === currentPage ? 'bx bxs-circle' : 'bx bx-circle'} style={{ color: '#4c8ab2' }}></i>
                ) : (
                  <i className={number === currentPage ? 'bx bxs-circle' : 'bx bx-circle'} style={{ color: '#4c8ab2' }}></i>
                )}
              </PaginationButton>
            ))}
          </div>
        </DataTableContainer>
        <Modal
              isOpen={isModalOpen}
              onRequestClose={closeModal}
              contentLabel="Sentiment Analysis Modal"
              style={{
                  content: {
                      width: '45%',
                      height: '62%',
                      top: '50%',
                      left: '50%',
                      right: 'auto',
                      bottom: 'auto',
                      marginRight: '-50%',
                      transform: 'translate(-50%, -50%)',
                      position: 'relative', // Add this line
                  },
              }}
          >
              <button 
                  onClick={closeModal} 
                  style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                  }}
              >
                  <img src="/img/x.png" alt="Fermer" style={{ width: '20px', height: '20px' }} />
              </button>
              <h2>Analyse des Sentiments</h2>
              {sentimentData.length > 0 ? (
                  <Line data={sentimentChartData} options={chartOptions} />
              ) : (
                  <p>Il y a pas de commentaires!</p>
              )}
          </Modal>

          <Modal
            isOpen={isFolderModalOpen}
            onRequestClose={closeFolderModal}
            contentLabel="Folder Modal"
            style={{
              content: {
                width: '55%',
                height: '450px', 
                top: '50%',
                left: '52%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',
                position: 'relative',
              },
            }}
          >
            <button 
              onClick={closeFolderModal}
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
            <h2>Dossier de l'Etudiant</h2>
            {demandes.length > 0 ? (
              <ul>
              {demandes.map(demande => (
                <li key={demande.id}>
                  <p> Le {demande.date_heure}</p>
                  {demande.observations.length > 0 ? (
                    <ul>
                      {demande.observations.map(observation => (
                        <ObservationItem key={observation.id}>
                          {showFullObservation[observation.id] 
                            ? observation.observation 
                            : `${observation.observation.substring(0, 250)}...`}
                          {observation.observation.length > 120 && (
                            <LirePlusButton onClick={() => handleShowMore(observation.id)}>
                              {showFullObservation[observation.id] ? 'Lire moins' : 'Lire plus'}
                            </LirePlusButton>
                          )}
                        </ObservationItem>
                      ))}
                    </ul>
                  ) : (
                    <p>Aucune observation pour cette demande.</p>
                  )}
                </li>
              ))}
            </ul>
            ) : (
              <p>Pas de demandes pour cet étudiant.</p>
            )}
          </Modal>

          <Modal
            isOpen={isFeedbackModalOpen}
            onRequestClose={closeFeedbackModal}
            contentLabel="Feedback Modal"
            style={{
                content: {
                    width: '30%',
                    height: '50%',
                    top: '50%',
                    left: '55%',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)',
                    position: 'relative',
                },
            }}
        >
            <button 
                onClick={closeFeedbackModal} 
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
            <h2>Voila les retours de cet étudiant</h2>
            {feedbacks.length > 0 ? (
                <FeedbackList>
                    {feedbacks.map(feedback => (
                        <FeedbackItem key={feedback.id}>
                            <FeedbackBubble>
                                <p>{feedback.contenu}</p>
                                <FeedbackBubbleTail />
                                <FeedbackBubbleCircle />
                            </FeedbackBubble>
                        </FeedbackItem>
                    ))}
                </FeedbackList>
            ) : (
                <p>Pas de retours pour cet étudiant.</p>
            )}
        </Modal>

        <Modal
          isOpen={isRendeaVousModalOpen}
          onRequestClose={closeRendeaVousModal}
          contentLabel="RendeaVous Modal"
          style={{
            content: {
              width: '30%',
              height: '50%',
              top: '50%',
              left: '52%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)',
              position: 'relative',
            },
          }}
        >
          <button 
            onClick={closeRendeaVousModal}
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
          <h2>Liste des Demandes</h2>
          {demandesModal.length > 0 ? (
            <DemandeList>
            {demandesModal.map(demande => (
              <DemandeItem key={demande.id}>
                <p className="date">{demande.date_heure}</p>
                <p>{demande.description}</p>
              </DemandeItem>
            ))}
          </DemandeList>
          ) : (
            <p>Pas de demandes pour cet étudiant.</p>
          )}
        </Modal>


        </ContentContainer>
        
      </body>
    </html>
  );
}

export default Records;

