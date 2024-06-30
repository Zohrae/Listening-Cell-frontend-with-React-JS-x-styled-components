import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Link } from 'react-router-dom';
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

    /* Shades for primary color */
    --pshade1: #b97f63;
    --pshade2: #c28b71;
    --pshade3: #cc967f;
    --pshade4: #d6a08d;
    --pshade5: #e1ab9b;
    --pshade6: #ebb6a9;
    --pshade7: #f5c1b7;
    --pshade8: #ffccc6;
    --pshade9: #ffd6d4;
    --pshade10: #ffe1e2;
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

// Styled component for the sidebar

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

const SideMenu = styled.ul`
  width: 100%;
  margin-top: 48px;
`;

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
`;

// Styled component for the sidebar icon
const SideMenuItemIcon = styled.i`
  min-width: calc(60px  - ((4px + 6px) * 2));
  display: flex;
  justify-content: center;
  margin-top: 0px;
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
  width: ${(props) => (props.open ? 'calc(100vw - 240px)' : 'calc(100vw - 60px)')}; /* Adjust width based on sidebarOpen state */
  margin-left: ${(props) => (props.open ? '240px' : '60px')}; /* Adjust margin to move content away from the sidebar */
  display: flex;
  justify-content: center; /* Center the content horizontally */
  align-items: center; /* Center the content vertically */
  margin-top: -150px;

  @media screen and (max-width: 768px) {
    width: 100%;
    margin-left: 0;
    margin-top: 0;
  }
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
  
  &:hover {
    border-color: transparent; /* Remove border on hover */
  }


`;

const BlueLine = styled.div`
  position: fixed;
  top: 150px; /* Adjust this value as needed to position the line */
  right: 0;
  height: 1px; /* Height of the line */
  width: 23%; /* Width of the line */
  background-color: #b2744c; /* Use your blue color variable */
  z-index: 1000;

  @media screen and (max-width: 768px) {
    width: 36%;  }

`;

// Styled component for the notification icon
const NotificationIcon = styled.i`
  font-size: 24px;
  color: var(--dark-grey);
  cursor: pointer;
  margin-left: 10px; /* Add margin to create space between elements */
`;

// Styled component for the profile icon
const ProfileIcon = styled.i`
  font-size: 24px;
  color: #4c8ab2;
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
  margin-top: -95px;
  margin-bottom: 10px;
  position: fixed;
  top: 200px; /* Adjust this value as needed */
  right: 0;
  margin-right: 20px;
  font-weight: normal; /* Utiliser un poids de police normal */
  font-size: 24px; /* Ajuster la taille de la police au besoin */
  font-family: Helvetica, sans-serif;

  @media screen and (max-width: 768px) {
    margin-right: 0px; /* Move the button to the left when screen is small */
  }

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


const MenuIconContainer = styled.div`
  width: 60px; /* Set a fixed width to ensure the icon remains visible */
`;


const MenuIcon = styled.i`
  font-size: 24px;
  color: var(--dark-grey);
  cursor: pointer;
  margin-right: 10px; /* Adjust margin to create space between elements */
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


function Feedbacks() {
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]); 
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3); 
  const [studentDetails, setStudentDetails] = useState({}); 
  const navigate = useNavigate();


  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login'; 
  };
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setSidebarOpen(false);
      }
    };
  
    window.addEventListener('resize', handleResize);
  
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = feedbacks.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(feedbacks.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
          const response = await fetch(`http://localhost:8000/api/feedbacks/`);
          if (response.ok) {
            const data = await response.json();
            setFeedbacks(data);
          } else {
            console.error('Failed to fetch feedbacks:', response.statusText);
          }
        
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
      }
    };
  
    fetchFeedbacks();
  }, []);
  
  useEffect(() => {
    const fetchStudentDetails = async () => {
      const studentIds = feedbacks.map(feedback => feedback.etudiant);
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
  }, [feedbacks]);

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
    if (window.innerWidth <= 768) {
      setSidebarOpen(false); // Always close sidebar on small screens
    } else {
      setSidebarOpen(!sidebarOpen); // Toggle sidebar state on larger screens
    }
  };
  
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Boxicons */}
        <link rel="stylesheet" href="https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css" />
        {/* Global styles */}
        <GlobalStyles />

        <title>Liste des Feedback</title>
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
                <SidebarTitle show={sidebarOpen}>Étudiants</SidebarTitle>
              </StyledLink>
            </SideMenuItem>
            <SideMenuItem>
            <StyledLink to="/dashboard/demandes">
                <SideMenuItemIcon className='bx bxs-shopping-bag-alt'></SideMenuItemIcon>
                <SidebarTitle show={sidebarOpen}>Demandes</SidebarTitle>
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
            <SideMenuItemActive>
              <SideMenuItemLink href="#">
                <SideMenuItemIcon style={{ color: 'var(--secondary-color)' }} className='bx bxs-chat'></SideMenuItemIcon>
                <SidebarTitle show={sidebarOpen} style={{ color: 'var(--secondary-color)' }}>Feedback</SidebarTitle>
              </SideMenuItemLink>
            </SideMenuItemActive>
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
        <DemandesButton open={sidebarOpen}>Commentaires</DemandesButton>

        <StyledTitle id="uniqueTitleId">Liste des Commentaires</StyledTitle>
            <BlueLine />
            <DataTable>
              <thead>
                <tr>
                  <TableHeader>Étudiant</TableHeader>
                  <TableHeader>Contenu</TableHeader>
                </tr>
              </thead>
              <tbody>
              {currentItems.map(feedback => (
                    <tr key={feedback.id}>
                      <LargeTableData>{`${studentDetails[feedback.etudiant]?.Nom} ${studentDetails[feedback.etudiant]?.Prenom}`}</LargeTableData>
                      <LargeTableData>{feedback.contenu}</LargeTableData>
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

        {/* SIDEBAR */}
      </body>
    </html>
  );
}

export default Feedbacks;

