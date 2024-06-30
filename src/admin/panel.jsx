import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Modal from 'react-modal'; // Import the modal component

import { Link } from 'react-router-dom';
import { Line, Scatter } from 'react-chartjs-2'; // Importez Scatter en plus de Line
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title as ChartTitle, CategoryScale, ScatterController } from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, ChartTitle, CategoryScale, ScatterController);



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
  background: var(--shade10);
  position: relative;
`;

// Styled component for the side menu link
const SideMenuItemLink = styled.a`
  width: 100%;
  height: 100%;
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
  width: ${(props) => (props.open ? 'calc(100vw - 240px)' : 'calc(100vw - 60px)')}; /* Adjust width based on sidebarOpen state */
  margin-left: ${(props) => (props.open ? '240px' : '60px')}; /* Adjust margin to move content away from the sidebar */
  display: flex;
  justify-content: center; /* Center the content horizontally */
  align-items: center; /* Center the content vertically */

  @media screen and (max-width: 768px) {
    width: 100%;
    margin-left: 0;
    margin-top: 0;
  }
`;


const SearchBarContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center; /* Center items horizontally */
`;

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

  // margin-top: 16px;

  @media screen and (max-width: 768px) {
    width: 200px;
  }

`;


const NotificationIcon = styled.i`
  font-size: 24px;
  color: var(--dark-grey);
  cursor: pointer;
  margin-left: 10px; /* Add margin to create space between elements */
`;

const ProfileIcon = styled.i`
  font-size: 24px;
  color: #4c8ab2;
  cursor: pointer;
  margin-left: 10px; /* Add margin to create space between elements */
`;


const MenuIconContainer = styled.div`
  width: 60px; /* Set a fixed width to ensure the icon remains visible */
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



const MenuIcon = styled.i`
  font-size: 24px;
  color: var(--dark-grey);
  cursor: pointer;
  margin-right: 10px; /* Adjust margin to create space between elements */
`;



const StyledLink = styled(Link)`
  width: 100%;
  height: 100%;
  display: flex;
  background: var(--light);
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

const HorizontalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 200px; /* Adjust height as needed */
  
`;


const VerticalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 20px; /* Add margin to create space between rectangles */

`;

const Rectangle = styled.div`
  width: 500px; 
  height: 250px; 
  background-color: ${props => props.color};
`;


const CloseIcon = styled.img`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  cursor: pointer;
  background: none;
  width: 20px;
`;

const ModalContent = styled.div`
  padding: 20px;
`;

const ModalTitle = styled.h2`
  margin-bottom: 20px;
`;

const ProfileForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const ProfileInput = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;

  &:hover {
    // border-color: var(--secondary-color);
    box-shadow: 0 1.5px 2px var(--secondary-color);
  }
`;

const ValiderButton = styled.button`
  background-color: ${(props) => (props.primary ? 'var(--primary-color)' : 'var(--secondary-color)')};
  color: white;
  border: none;
  border-radius: 25px;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.primary ? 'var(--pshade2)' : 'var(--shade2)')};
  }
`;
const StatisticsContainer = styled.div`
  width: 430px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  height: 425px;
  margin-top: -12%;
  margin-left: 40px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const StatisticItem = styled.div`
  width: calc(50% - 10px);
  height: calc(50% - 10px);
  background-color: ${props => props.bgColor};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  padding: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s, opacity 0.3s;
  &:hover {
    transform: translateY(-5px);
    opacity: 0.9;
  }
`;

const Icon = styled.img`
  width: 50px; /* Adjust size as needed */
  height: 50px; /* Adjust size as needed */
  margin-bottom: 10px;
`;

function Panel() {
  const [alerts, setAlerts] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true); // Initialize sidebar as open
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  const [feedbackData, setFeedbackData] = useState([]);
  const [adminData, setAdminData] = useState({});
  const [feedbackCount, setFeedbackCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/feedbacks/analyzeAll/');
        if (response.ok) {
          const data = await response.json();
          setFeedbackData(data);
        } else {
          console.error('Failed to fetch feedback data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching feedback data:', error);
      }
    };

    fetchData();
  }, []);

  const sentimentScores = feedbackData.map((feedback, index) => ({
    x: index + 1,
    y: feedback.sentiment
  }));

  const data = {
    datasets: [
      {
        label: 'Sentiment Analysis',
        data: sentimentScores,
        fill: false,
        borderColor: '#669ecb',
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'linear',
        title: {
          display: true,
          text: 'Feedback Index'
        }
      },
      y: {
        type: 'linear',
        min: -2,
        max: 2,
        title: {
          display: true,
          text: 'Sentiment Score'
        }
      }
    }
  };




  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const id = sessionStorage.getItem('admin_id');
        const response = await fetch(`http://localhost:8000/api/alerts/?admin=${id}&vu=false`);
        if (response.ok) {
          const data = await response.json();
          const unreadNotifications = data.filter(alert => !alert.vu);
          setAlerts(unreadNotifications);
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
      const id = sessionStorage.getItem('admin_id');
      const response = await fetch(`http://localhost:8000/api/alerts/?admin=${id}`);
      if (response.ok) {
        const data = await response.json();
        data.forEach(async alert => {
          if (!alert.vu) {
            const updateResponse = await fetch(`http://localhost:8000/api/alerts/${alert.id}/`, {
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
        const hasUnreadNotifications = data.some(alert => !alert.vu);
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
  
  
  const handleLogout = () => {
    sessionStorage.clear();
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
  
  
  

  const toggleSidebar = () => {
    if (window.innerWidth <= 768) {
      setSidebarOpen(false); 
    } else {
      setSidebarOpen(!sidebarOpen); 
    }
  };
  

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen); // Toggle modal visibility
  };

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const id = sessionStorage.getItem('admin_id');
        const response = await fetch(`http://localhost:8000/api/administrateurs/${id}/`);
        if (response.ok) {
          const data = await response.json();
          setAdminData(data);
        } else {
          console.error('Failed to fetch admin data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching admin data:', error);
      }
    };
  
    fetchAdminData();
  }, []);

  const handleUpdatingAdmin = async (event) => {
    event.preventDefault();

  };

  const generateClusteredData = (count, center, spread) => {
    let data = [];
    for (let i = 0; i < count; i++) {
      data.push({
        x: center.x + (Math.random() - 0.5) * spread,
        y: center.y + (Math.random() - 0.5) * spread
      });
    }
    return data;
  };


  const scatterData = {
    datasets: [
      {
        label: 'Group 1',
        data: generateClusteredData(6, { x: 0, y: 0 }, 1.5),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'Group 2',
        data: generateClusteredData(7, { x: 5, y: 5 }, 1.8),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'Group 3',
        data: generateClusteredData(5, { x: 10, y: 10 }, 1.3),
        backgroundColor: 'rgba(255, 206, 86, 0.6)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1,
      },
      {
        label: 'Group 4',
        data: generateClusteredData(8, { x: 15, y: 15 }, 1.6),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Group 5',
        data: generateClusteredData(7, { x: 20, y: 20 }, 1.7),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      }
    ]
  };
  
  const scatterOptions = {
    scales: {
      x: {
        type: 'linear',
        title: {
          display: true,
          text: 'X-axis'
        }
      },
      y: {
        type: 'linear',
        title: {
          display: true,
          text: 'Y-axis'
        }
      }
    }
  };
  

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const feedbackResponse = await fetch('http://localhost:8000/api/feedbacks/count_feedback/');
        if (feedbackResponse.ok) {
          const feedbackData = await feedbackResponse.json();
          setFeedbackCount(feedbackData.feedback_count);
        } else {
          console.error('Failed to fetch feedback count:', feedbackResponse.statusText);
        }
  
        const studentResponse = await fetch('http://localhost:8000/api/etudiants/count_etudiants/');
        if (studentResponse.ok) {
          const studentData = await studentResponse.json();
          setStudentCount(studentData.student_count);
        } else {
          console.error('Failed to fetch student count:', studentResponse.statusText);
        }
      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    };
  
    fetchCounts();
  }, []);
  
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link rel="stylesheet" href="https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css" />
        <GlobalStyles />

        <title>Admin</title>
      </head>
      <body>
      <TopNavbar open={sidebarOpen}> 
      <MenuIconContainer>
            <MenuIcon className={sidebarOpen ? 'bx bx-menu' : 'bx bx-menu-alt-right'} onClick={toggleSidebar} />
          </MenuIconContainer>
        <SearchBarContainer>
            <SearchBar type="text" placeholder="Search..." />
        </SearchBarContainer>          
        <NotificationIcon id="notificationIcon" className="bx bx-bell" onClick={handleNotificationClick} />
          <ProfileIcon className="bx bx-user-circle" />
          {showDropdown && (
              <Dropdown>
                {alerts.length > 0 ? (
                  alerts.map(alert => (
                    <DropdownItem key={alert.id}>{alert.message}</DropdownItem>
                  ))
                ) : (
                  <DropdownItem>No notifications</DropdownItem>
                )}
              </Dropdown>
            )}
        </TopNavbar>
        <ContentContainer open={sidebarOpen}>

        <Sidebar id="sidebar" open={sidebarOpen}> {/* Pass the sidebarOpen state to adjust width */}
                <Brand href="#">
          <img
            src={sidebarOpen ? "/img/loo.png" : "/img/bee.png"} 
            alt=""
            width={sidebarOpen ? '145px' : '30px'} // Modifier la largeur de l'image en fonction de l'état de la barre latérale
            style={{ marginTop: '25px', marginLeft: sidebarOpen ? '30px' : '30px' }} // Ajouter une marge à gauche en fonction de l'état de la barre latérale
          />
        </Brand>
          <SideMenu>
            <SideMenuItemActive>
            <StyledLink to="/panel">
                <SideMenuItemIcon className='bx bxs-dashboard' style={{ color: 'var(--secondary-color)' }}></SideMenuItemIcon>
                <SidebarTitle show={sidebarOpen} style={{ color: 'var(--secondary-color)' }}>Dashboard</SidebarTitle>
              </StyledLink>
            </SideMenuItemActive>
            <SideMenuItem>
            <StyledLink to="/panel/advisors">
                <SideMenuItemIcon className='bx bxs-group'></SideMenuItemIcon>
                <SidebarTitle show={sidebarOpen}>Conseillers</SidebarTitle>
              </StyledLink>
            </SideMenuItem>
            <SideMenuItem>
            <StyledLink to="/panel/students">
                <SideMenuItemIcon className='bx bxs-group'></SideMenuItemIcon>
                <SidebarTitle show={sidebarOpen}>Étudiants</SidebarTitle>
              </StyledLink>
            </SideMenuItem>
            <SideMenuItem>
             <StyledLink to="/panel/collaborators">
              <SideMenuItemIcon className='bx bxs-group'></SideMenuItemIcon>
                <SidebarTitle show={sidebarOpen}>Collaborateurs</SidebarTitle>
              </StyledLink>
            </SideMenuItem>
            <SideMenuItem>
            <StyledLink to="/panel/events">
                <SideMenuItemIcon className='bx bxs-calendar'></SideMenuItemIcon>
                <SidebarTitle show={sidebarOpen}>Evénements</SidebarTitle>
              </StyledLink>
            </SideMenuItem>
            <SideMenuItem>
            <StyledLink to="/panel/feedback">
                <SideMenuItemIcon className='bx bxs-chat'></SideMenuItemIcon>
                <SidebarTitle show={sidebarOpen}>Feedback</SidebarTitle>
              </StyledLink>
            </SideMenuItem>
          </SideMenu>
          <SideMenu>
            <SideMenuItem>
              <SideMenuItemLink href="#" onClick={toggleModal}>
                <SideMenuItemIcon className='bx bxs-cog'></SideMenuItemIcon>
                <SidebarTitle show={sidebarOpen}>Paramètres</SidebarTitle>
              </SideMenuItemLink>
            </SideMenuItem>
            <SideMenuItem>
            <SideMenuItemLink href="#" className="logout" onClick={handleLogout}>
              <SideMenuItemIcon className='bx bxs-log-out-circle' style={{ color: 'var(--red)' }}></SideMenuItemIcon> {/* Change color to red */}
                <SidebarTitle show={sidebarOpen}>Déconnexion</SidebarTitle>
              </SideMenuItemLink>
            </SideMenuItem>
          </SideMenu>
          </Sidebar>

          <HorizontalContainer>
          <VerticalContainer>
            <Rectangle>
            <Line data={data} options={options} />
        
            </Rectangle>
            <Rectangle> 
            <Scatter data={scatterData} options={scatterOptions} />

              </Rectangle>
            </VerticalContainer>
            <div>
            <StatisticsContainer>
              <StatisticItem bgColor="#edf4fc">
                <Icon src="img/advisor.png" alt="Conseillers Icon" />
                <p>4 Conseillers</p>
              </StatisticItem>
              <StatisticItem bgColor="#eff6fc">
                <Icon src="img/visitor.png" alt="Visiteurs Icon" />
                <p>2 Visiteurs</p>
              </StatisticItem>
              <StatisticItem bgColor="#f8f4ea">
                <Icon src="img/student2.png" alt="Etudiants Icon" />
                <p>{studentCount} Étudiants</p>
              </StatisticItem>
              <StatisticItem bgColor="#fcf4e8">
                <Icon src="img/feedback.png" alt="Feedback Icon" />
                <p>{feedbackCount} Feedback</p>
              </StatisticItem>
            </StatisticsContainer>

               </div>
               
            </HorizontalContainer>
            <Modal
              isOpen={isModalOpen}
              onRequestClose={toggleModal}
              style={{
                content: {
                  width: '400px',
                  height: '360px', 
                  margin: 'auto',
                  borderRadius: '10px',
                }
              }}
            >
              <CloseIcon src='img/x.png' onClick={toggleModal} />
              <ModalContent>
                <ModalTitle>Modifer votre Profil</ModalTitle>
                <ProfileForm onSubmit={handleUpdatingAdmin}>
                  <ProfileInput
                    type="text"
                    placeholder="Name"
                    value={adminData.Nom}
                    onChange={(e) => setAdminData({ ...adminData, Nom: e.target.value })}
                  />
                  <ProfileInput
                    type="email"
                    placeholder="Email"
                    value={adminData.email}
                    onChange={(e) => setAdminData({ ...adminData, email: e.target.value })}
                  />
                  <ProfileInput
                    type="tel"
                    placeholder="Phone Number"
                    value={adminData.phoneNumber}
                    onChange={(e) => setAdminData({ ...adminData, phoneNumber: e.target.value })}
                  />
                  <ValiderButton type="submit">Valider</ValiderButton>
                </ProfileForm>
              </ModalContent>
            </Modal>
          
        </ContentContainer>

      </body>
    </html>
  );
}

export default Panel;

