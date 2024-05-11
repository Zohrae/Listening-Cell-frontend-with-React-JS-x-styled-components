import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';


// Global style for resetting and applying CSS variables
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

// Styled component for the sidebar
const Sidebar = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  width: 280px;
  height: 100%;
  background: var(--light);
  z-index: 2000;
  font-family: var(--lato);
  transition: .3s ease;
  overflow-x: hidden;
  scrollbar-width: none;
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
  width: calc(100% - 280px); /* Make the navbar full width minus the width of the sidebar */
  position: fixed; /* Position the navbar at the top */
  top: 0; /* Align the navbar to the top */
  z-index: 2000; /* Ensure the navbar is above the sidebar */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Add shadow for better visibility */
  left: 280px; /* Align the navbar to the right edge of the sidebar */
  flex-wrap: nowrap; /* Ensure items don't wrap to the next line */
  height: 60px;
`;


const ContentContainer = styled.div`
  width: calc(100vw - 280px); /* Set the width to span the full width of the screen minus the sidebar width */
  margin-left: 280px; /* Adjust margin to move content away from the sidebar */
  display: flex;
  justify-content: center; /* Center the content horizontally */
  align-items: center; /* Center the content vertically */
  margin-top: 0px;
`;

// Styled component for the search bar
const SearchBarContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center; /* Center items horizontally */
  margin-top: 10px;
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
  color: var(--dark-grey);
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
  margin-top: 20px;
  margin-bottom: 10px;
`;

const DataTableContainer = styled.div`
  overflow-x: auto; /* Add horizontal scrolling if needed */
  width: calc(100% - 60px); 
  
  margin-top: -60px;
`;

const LargeTableData = styled(TableData)`
  padding: 16px; /* Increase padding for larger spacing */
`;

const DemandesButton = styled.button`
  background-color: var(--blue);
  color: white;
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  font-size: 16px;
  width: 150px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  position: absolute;
  top: 100px;
  left: 350px; /* Adjust the left position as needed */

  &:hover {
    background-color: var(--dark-blue);
    color: black;

  }
`;

function AdminHub() {
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [demandes, setDemandes] = useState([]);


  useEffect(() => {
    const fetchDemandes = async () => {
      try {
        const id = sessionStorage.getItem('conseiller_id');
        if (id) {
          const response = await fetch(`http://localhost:8000/api/demandes/?conseiller=${id}`);
          if (response.ok) {
            const data = await response.json();
            setDemandes(data);
          } else {
            console.error('Failed to fetch demandes:', response.statusText);
          }
        } else {
          console.error('Conseiller ID not found in sessionStorage.');
        }
      } catch (error) {
        console.error('Error fetching demandes:', error);
      }
    };

    fetchDemandes();
  }, []);


  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const id = sessionStorage.getItem('conseiller_id');
        const response = await fetch(`http://localhost:8000/api/notifications/?conseiller=${id}`);
        if (response.ok) {
          const data = await response.json();
          setNotifications(data);
        } else {
          console.error('Failed to fetch notifications:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  const handleNotificationClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleAcceptDemande = async (demandeId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/demandes/${demandeId}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          etat: 'Acceptée',
        }),
      });
      if (response.ok) {
        fetchDemandes();
        const notificationResponse = await fetch(`http://localhost:8000/api/demandes/${demandeId}/`);
        if (notificationResponse.ok) {
          const demande = await notificationResponse.json();
          const message = `La demande "${demande.title}" a été acceptée.`;
          // Create a notification for the counselor
          const notificationConseiller = {
            conseiller: demande.conseiller,
            message: message,
          };
          await fetch('http://localhost:8000/api/notifications/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(notificationConseiller),
          });
          // Create a notification for the student
          const notificationEtudiant = {
            etudiant: demande.etudiant,
            message: `Votre demande "${demande.title}" a été acceptée.`,
          };
          await fetch('http://localhost:8000/api/notificationsEtudiant/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(notificationEtudiant),
          });
        } else {
          console.error('Failed to fetch demande:', notificationResponse.statusText);
        }
      } else {
        console.error('Failed to update demande:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating demande:', error);
    }
  };
  
  // Function to refuse a request
  const handleRefuseDemande = async (demandeId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/demandes/${demandeId}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          etat: 'Refusée',
        }),
      });
      if (response.ok) {
        // Refresh the list of requests after updating the state
        fetchDemandes();
        const notificationResponse = await fetch(`http://localhost:8000/api/demandes/${demandeId}/`);
        if (notificationResponse.ok) {
          const demande = await notificationResponse.json();
          const message = `La demande "${demande.title}" a été refusée.`;
          // Create a notification for the counselor
          const notificationConseiller = {
            conseiller: demande.conseiller,
            message: message,
          };
          await fetch('http://localhost:8000/api/notifications/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(notificationConseiller),
          });
          // Create a notification for the student
          const notificationEtudiant = {
            etudiant: demande.etudiant,
            message: `Votre demande "${demande.title}" a été refusée.`,
          };
          await fetch('http://localhost:8000/api/notificationsEtudiant/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(notificationEtudiant),
          });
        } else {
          console.error('Failed to fetch demande:', notificationResponse.statusText);
        }
      } else {
        console.error('Failed to update demande:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating demande:', error);
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

        <title>AdminHub</title>
      </head>
      <body>
      <TopNavbar>
        <SearchBarContainer>
            <SearchBar type="text" placeholder="Search..." />
        </SearchBarContainer>          
        <NotificationIcon className="bx bx-bell" onClick={handleNotificationClick} />
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
        <ContentContainer>

        <Sidebar id="sidebar">
          <Brand href="#">
          <img src="img/bee.png" alt="" width={'30px'} style={{ marginLeft: '100px' }} />
          </Brand>
          <SideMenu>
            <SideMenuItem className="active">
              <SideMenuItemLink href="#">
                <SideMenuItemIcon className='bx bxs-dashboard'></SideMenuItemIcon>
                <span className="text">Dashboard</span>
              </SideMenuItemLink>
            </SideMenuItem>
            <SideMenuItem>
              <SideMenuItemLink href="#">
                <SideMenuItemIcon className='bx bxs-shopping-bag-alt'></SideMenuItemIcon>
                <span className="text">My Store</span>
              </SideMenuItemLink>
            </SideMenuItem>
            <SideMenuItem>
              <SideMenuItemLink href="#">
                <SideMenuItemIcon className='bx bxs-doughnut-chart'></SideMenuItemIcon>
                <span className="text">Analytics</span>
              </SideMenuItemLink>
            </SideMenuItem>
            <SideMenuItem>
              <SideMenuItemLink href="#">
                <SideMenuItemIcon className='bx bxs-message-dots'></SideMenuItemIcon>
                <span className="text">Message</span>
              </SideMenuItemLink>
            </SideMenuItem>
            <SideMenuItem>
              <SideMenuItemLink href="#">
                <SideMenuItemIcon className='bx bxs-group'></SideMenuItemIcon>
                <span className="text">Team</span>
              </SideMenuItemLink>
            </SideMenuItem>
          </SideMenu>
          <SideMenu>
            <SideMenuItem>
              <SideMenuItemLink href="#">
                <SideMenuItemIcon className='bx bxs-cog'></SideMenuItemIcon>
                <span className="text">Settings</span>
              </SideMenuItemLink>
            </SideMenuItem>
            <SideMenuItem>
              <SideMenuItemLink href="#" className="logout">
                <SideMenuItemIcon className='bx bxs-log-out-circle'></SideMenuItemIcon>
                <span className="text">Logout</span>
              </SideMenuItemLink>
            </SideMenuItem>
          </SideMenu>
        </Sidebar>
        <DataTableContainer>
        <DemandesButton>Demandes</DemandesButton>

            <Title>List of Requests</Title>
        <DataTable>
            <thead>
              <tr>
                <TableHeader>Title</TableHeader>
                <TableHeader>Conseiller</TableHeader>
                <TableHeader>Etudiant</TableHeader>
                <TableHeader>Description</TableHeader>
              </tr>
            </thead>
            <tbody>
            {demandes.map(demande => (
              <tr key={demande.id}>
                    <LargeTableData>{demande.title}</LargeTableData>
                    <LargeTableData>{demande.conseiller}</LargeTableData>
                    <LargeTableData>{demande.etudiant}</LargeTableData>
                    <LargeTableData>{demande.description}</LargeTableData>
                <TableData>
                  {/* Bouton pour accepter la demande */}
                  <button onClick={() => handleAcceptDemande(demande.id)}>
                    <i className="bx bxs-check-circle" style={{ color: 'green' }}></i>
                  </button>
                  {/* Bouton pour refuser la demande */}
                  <button onClick={() => handleRefuseDemande(demande.id)}>
                    <i className="bx bxs-x-circle" style={{ color: 'red' }}></i>
                  </button>
                </TableData>
              </tr>
            ))}
            </tbody>
          </DataTable>
          </DataTableContainer>

        </ContentContainer>

        {/* SIDEBAR */}
      </body>
    </html>
  );
}

export default AdminHub;














