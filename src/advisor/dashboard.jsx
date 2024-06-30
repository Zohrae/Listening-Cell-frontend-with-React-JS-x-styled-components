import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Link } from 'react-router-dom';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, BarElement, PointElement, LinearScale, Title as ChartTitle, CategoryScale, ArcElement } from 'chart.js';
import { useNavigate } from 'react-router-dom';

ChartJS.register(LineElement, PointElement, BarElement, LinearScale, ChartTitle, CategoryScale, ArcElement);

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

const SideMenuItemActive = styled(SideMenuItem)`
  background: var(--grey);
  position: relative;
`;

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
  width: 60px; 
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

const MenuIcon = styled.i`
  font-size: 24px;
  color: var(--dark-grey);
  cursor: pointer;
  margin-right: 10px; 
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

const DoughnutContainer = styled.div`
  width: 430px; 
  padding: 20px;
  background-color: transparent;
  border-radius: 10px;
  // box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  // transition: transform 0.3s, opacity 0.3s;
  &:hover {
    // transform: translateY(-5px);
    opacity: 0.9;
  }
  height: 425px; 
  margin-top: -12%;
  margin-left: 40px;
`;

const LegendContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
  justify-content: center;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
`;

const BarLegendPoint = styled.span`
  width: 10px;
  height: 10px;
  display: inline-block;
  border-radius: 50%;
  margin-right: 5px;
`;

const BarLegendItem = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
  margin-right: 10px;

`;

// Container pour la légende de la barre
const BarLegendContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

function AdminHub() {
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true); 

  const [feedbackData, setFeedbackData] = useState([]);
  const navigate = useNavigate();


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
        // Mettre à jour l'état "vu" de chaque notification
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
              // Mise à jour réussie, effectuer les actions nécessaires (par exemple, afficher un message)
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
  
  const handleLogout = async () => {
    try {
      const id = localStorage.getItem('conseiller_id');
      const response = await fetch(`http://localhost:8000/api/conseillers/${id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ est_connecte: false }), // Mettre à jour "est_connecte" à false
      });

      if (response.ok) {
        console.log('Logout successful');
        localStorage.clear();
        window.location.href = '/login';
      } else {
        const errorDetail = await response.json();
        console.error('Failed to logout:', response.statusText, errorDetail);
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
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
      setSidebarOpen(false); // Always close sidebar on small screens
    } else {
      setSidebarOpen(!sidebarOpen); // Toggle sidebar state on larger screens
    }
  };
  
  
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
          text: 'Score de Sentiments'
        }
      }
    }
  };


  const [barData, setBarData] = useState({
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Dossiers',
        data: [],
        backgroundColor: '#6dabe4',
      },
      {
        label: 'Étudiants',
        data: [],
        backgroundColor: 'rgb(213, 163, 136)',
      },
    ],
  });

  const barOptions = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Nombre Etudiant x Dossiers', 
        },
      },
    },
    plugins: {
      legend: {
        display: false, 
      },
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseDossiers = await fetch('http://localhost:8000/api/dossiers/count_by_month/');
        const responseStudents = await fetch('http://localhost:8000/api/etudiants/count_by_month_2024/');
        if (responseDossiers.ok && responseStudents.ok) {
          const dataDossiers = await responseDossiers.json();
          const dataStudents = await responseStudents.json();
          const countsDossiers = Object.values(dataDossiers);
          const countsStudents = Object.values(dataStudents);
          setBarData({
            ...barData,
            labels: Object.keys(dataDossiers),
            datasets: [
              { ...barData.datasets[0], data: countsDossiers },
              { ...barData.datasets[1], data: countsStudents },
            ],
          });
        } else {
          console.error('Failed to fetch data:', responseDossiers.statusText, responseStudents.statusText);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const [doughnutData, setDoughnutData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Students by Major',
        data: [],
        backgroundColor: [],
        hoverOffset: 4,
      },
    ],
  });

  useEffect(() => {
    const fetchDoughnutData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/etudiants/count_by_major/');
        if (response.ok) {
          const data = await response.json();
          const labels = data.map(item => item.major);
          const counts = data.map(item => item.total);
          const backgroundColors = generateRandomColors(data.length);

          setDoughnutData({
            ...doughnutData,
            labels: labels,
            datasets: [
              {
                ...doughnutData.datasets[0],
                data: counts,
                backgroundColor: backgroundColors,
              },
            ],
          });
        } else {
          console.error('Failed to fetch doughnut data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching doughnut data:', error);
      }
    };

    fetchDoughnutData();
  }, []);

  const generateRandomColors = (numColors) => {
    const primaryColor = '#b2744c';
    const secondaryColor = '#4c8ab2';
    const colors = [];

    colors.push(primaryColor);
    colors.push(secondaryColor);

    for (let i = 2; i < numColors; i++) {
      colors.push(`rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.6)`);
    }

    return colors;
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

        <title>Dashboard</title>
      </head>
      <body>
      <TopNavbar open={sidebarOpen}> 
      <MenuIconContainer>
            <MenuIcon className={sidebarOpen ? 'bx bx-menu' : 'bx bx-menu-alt-right'} onClick={toggleSidebar} />
          </MenuIconContainer>
        <SearchBarContainer>
            <SearchBar type="text" placeholder="Rechercher..." />
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
            width={sidebarOpen ? '145px' : '30px'} // Modifier la largeur de l'image en fonction de l'état de la barre latérale
            style={{ marginTop: '25px', marginLeft: sidebarOpen ? '30px' : '30px' }} // Ajouter une marge à gauche en fonction de l'état de la barre latérale
          />
        </Brand>
          <SideMenu>
            <SideMenuItemActive>
            <StyledLink to="/dashboard">
                <SideMenuItemIcon className='bx bxs-dashboard' style={{ color: 'var(--secondary-color)' }}></SideMenuItemIcon>
                <SidebarTitle show={sidebarOpen} style={{ color: 'var(--secondary-color)' }}>Dashboard</SidebarTitle>
              </StyledLink>
            </SideMenuItemActive>
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

          <HorizontalContainer>
          <VerticalContainer>
            <Rectangle>
            <Line data={data} options={options} />
        
            </Rectangle>
            <Rectangle>
            <Bar data={barData} options={barOptions} />
              <BarLegendContainer>
                {barData.datasets.map((dataset, index) => (
                  <BarLegendItem key={index}>
                    <BarLegendPoint style={{ backgroundColor: dataset.backgroundColor }} />
                    <span>{dataset.label}</span>
                  </BarLegendItem>
                ))}
              </BarLegendContainer>
              </Rectangle>
            </VerticalContainer>


            <div>
              <DoughnutContainer>
                  <Doughnut data={doughnutData} />

                  {/* Legend for Doughnut Chart */}
                  <LegendContainer>
                    {doughnutData.labels.map((label, index) => (
                      <LegendItem key={label}>
                        <span style={{
                          width: '10px',
                          height: '10px',
                          backgroundColor: doughnutData.datasets[0].backgroundColor[index],
                          borderRadius: '50%',
                          display: 'inline-block',
                        }}></span>
                        <span>{label}: {doughnutData.datasets[0].data[index]}</span>
                      </LegendItem>
                    ))}
                  </LegendContainer>
                </DoughnutContainer>

               </div>
               
            </HorizontalContainer>
            
        </ContentContainer>


          </body>
    </html>
  );
}
export default AdminHub;

