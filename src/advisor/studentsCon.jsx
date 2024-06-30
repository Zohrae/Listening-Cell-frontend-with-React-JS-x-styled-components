import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
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
  justify-content: center; 
`;

const SearchBar = styled.input`
  width: 300px;
  height: 40px;
  border-radius: 20px;
  border: 1px solid var(--blue);
  padding: 0 20px;
  font-size: 16px;
  transition: border-color 0.3s ease; 
  
  &:hover {
    border-color: transparent; 
  }
  
  outline: none;

`;

const BlueLine = styled.div`
  position: fixed;
  top: 170px; 
  right: 0;
  height: 1px; 
  width: 18.4%; 
  background-color: #b2744c; 
  z-index: 1000;

`;

const NotificationIcon = styled.i`
  font-size: 24px;
  color: var(--dark-grey);
  cursor: pointer;
  margin-left: 10px; 
`;

const ProfileIcon = styled.i`
  font-size: 24px;
  color: #4c8ab2; 
  cursor: pointer;
  margin-left: 10px; 
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

const DropdownItem = styled.li`
  margin-bottom: 5px;
`;

const DataTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #ddd; 
  margin-top: 60px;
  border-radius: 10px !important; /* Add border radius */
  overflow-y: hidden; /* Supprimer le défilement vertical */


`;

const TableHeader = styled.th`
  padding: 12px;
  background-color: #f2f2f2;
  border: 1px solid #ddd;
  text-align: left;
`;

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
  overflow-y: hidden; 
  max-height: 400px; 
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
    padding: 5px; 
  }
`;

const LargeTableData = styled(TableData)`
  padding: ${(props) => props.iconPadding || '12px'}; /* Adjust padding as needed */
  width: 1%; /* Set a fixed width for the table data */
  text-align: center; /* Center align the content horizontally */
  vertical-align: middle; /* Vertically center the content */
  button {
    max-width: 10px; 
  }
`;

const RefuseButton = styled.button`
  background-color: transparent; 
  border: none;
  border-radius: 10px;
  padding: 5px 10px;
  font-size: 14px;
  width: 30px;
  cursor: pointer;
  margin-right: 5px;
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


function StudentsCon() {
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [etudiants, setEtudiants] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true); 
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); 
  const id = localStorage.getItem('conseiller_id');
  const navigate = useNavigate();



  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = etudiants.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(etudiants.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    const fetchEtudiants = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/etudiants/with_requests/?conseiller_id=${id}`);
        if (response.ok) {
          const data = await response.json();
          setEtudiants(data);
        } else {
          console.error('Failed to fetch etudiants:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching etudiants:', error);
      }
    };

    fetchEtudiants();
  }, [id]);


  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const id = localStorage.getItem('conseiller_id');
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
        // Change l'icône en gris si toutes les notifications sont lues
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

  const handleNavigation = (url) => {
    navigate(url);
  };

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link rel="stylesheet" href="https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css" />
        <GlobalStyles />

        <title>Liste des Étudiants</title>
      </head>
      <body>
      <TopNavbar open={sidebarOpen}> 
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
        <ContentContainer open={sidebarOpen}>

        <Sidebar id="sidebar" open={sidebarOpen}> 
          <Brand href="#">
          <img
            src={sidebarOpen ? "/img/loo.png" : "/img/bee.png"} 
            alt=""
            width={sidebarOpen ? '145px' : '30px'} 
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
            <SideMenuItemActive>
            <StyledLink to="/dashboard/students">
                <SideMenuItemIcon style={{ color: 'var(--secondary-color)' }} className='bx bxs-group'></SideMenuItemIcon>
                <SidebarTitle show={sidebarOpen} style={{ color: 'var(--secondary-color)' }}>Étudiants</SidebarTitle>
              </StyledLink>
            </SideMenuItemActive>
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
            <SideMenuItem>
              <StyledLink to="/dashboard/records">
              <SideMenuItemIcon className='bx bxs-folder'></SideMenuItemIcon>
                <SidebarTitle show={sidebarOpen}>Dossiers</SidebarTitle>
              </StyledLink>
            </SideMenuItem>
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
        <DemandesButton open={sidebarOpen}>
            Étudiants
           </DemandesButton>

        <StyledTitle id="uniqueTitleId">Liste des Étudiants</StyledTitle>
            <BlueLine />

            <DataTable>
              <thead>
                <tr>
                  <TableHeader>Nom Complet</TableHeader>
                  <TableHeader>Filière</TableHeader>
                  <TableHeader>Age</TableHeader>
                  <TableHeader>Email</TableHeader>
                </tr>
              </thead>
              <tbody>
                {currentItems.map(etudiant => (
                  <tr key={etudiant.id}>
                    <LargeTableData>{etudiant.Nom} {etudiant.Prenom}</LargeTableData>
                    <LargeTableData>{etudiant.major}</LargeTableData>
                    <LargeTableData>{etudiant.age}</LargeTableData>
                    <LargeTableData>{etudiant.email}</LargeTableData>
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
          

        </ContentContainer>

      </body>
    </html>
  );
}

export default StudentsCon;

