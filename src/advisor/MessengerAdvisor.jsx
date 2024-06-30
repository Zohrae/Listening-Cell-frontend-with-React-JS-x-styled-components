import { useEffect, useState, useRef } from 'react';
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

const Content = styled.div`
    display: flex;
    flex: 1;
    margin-left: ${props => (props.isSidebarCollapsed ? '0px' : '50px')}; /* Adjust based on sidebar state */
    transition: margin-left 0.3s ease;
    margin-top: 100px;
    border-radius: 25px; /* Pour arrondir les coins */
    border: 1px solid var(--shade19);
    width: 900px;
    height: 440px;
    background-color: #f5f5f5;
`;

const ChatList = styled.div`
  flex: 1;
  border-right: 1px solid #ddd;
  padding: 10px;
  overflow-y: auto;

  h2 {
    margin-top: 0;
  }

  ul {
    list-style-type: none;
    padding: 0;

    li {
      padding: 10px;
      cursor: pointer;
      display: flex; /* Utilisez flex pour aligner les éléments horizontalement */
      align-items: center; /* Alignez les éléments verticalement */
      &:hover {
        background-color: #f0f0f0;
        border-radius: 10px;
      }

      .avatar {
        width: 45px; /* Définissez la largeur de l'avatar */
        height: 45px;
        margin-right: 10px; /* Ajoutez un peu d'espace entre l'avatar et le nom */
        border-radius: 50%;
      }

      .online-dot {
        width: 10px;
        height: 10px;
        background-color: green;
        border-radius: 50%; /* Rendez-le rond */
        margin-left: auto; /* Alignez-le à droite */
      }

      /* Added styling for the message */
      .message-container {
        flex: 1; /* Use all available space */
        display: flex; /* Utilize flex to align items horizontally */
        flex-direction: column; /* Stack items vertically */
        overflow: hidden; /* Hide overflow */
        text-align: left; /* Align text to the left */

      }

      .message {
        color: #808080; /* Light grey color */
        overflow: hidden; /* Hide overflow */
        white-space: nowrap; /* Prevent text from wrapping */
        text-overflow: ellipsis; /* Display ellipsis (...) for overflow text */
        width: 100%; /* Ensure the message takes up the full width of the container */
      }

    }
  }
`;


const ChatWindow = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  padding: 10px;

  border-radius: 10px;
  margin-left: 10px;
  margin-RIGHT: 10px;
  margin-top: 10px;
  margin-bottom: 10px;

`;

const Messages = styled.div`
border-radius: 10px;
padding: 10px;
flex: 1;
overflow-y: auto; 

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    padding: 10px;
    margin: 10px 0;
    border-radius: 15px;
    max-width: 250px;
    word-wrap: break-word; /* Ajout de cette propriété */

  }
  .conseiller-message {
    background-color: #e0e0e0;
    color: black;
    text-align: left;
    margin-left: auto;
  }

  .student-message {
    background-color: #d0e7ff ; 
    color: black;
    text-align: left;
    margin-right: auto;
  }
`;

const SendMessageForm = styled.form`
  display: flex;

  input {
    flex: 1;
    padding: 10px;
    border-radius: 20px;
    border: 1px solid #ddd;
    outline: none;
  }

  button {
    padding: 0; /* Remove padding */
    border-radius: 20px;
    background: none; /* Remove background */
    border: none; /* Remove border */
    margin-left: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 30px; /* Adjust the size of the icon */
      height: 30px; /* Adjust the size of the icon */
    }

    &:hover {
      opacity: 0.7; /* Slight opacity change on hover for effect */
    }
  }
`;




function ChatAdvisor() {
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true); // Initialize sidebar as open
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [messages, setMessages] = useState([]);
  const conseillerId = localStorage.getItem('conseiller_id');
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
          // Filtrer les notifications non lues
          const unreadNotifications = data.filter(notification => !notification.vu);
          setNotifications(unreadNotifications);
          // Change la couleur de l'icône de notification si des notifications non lues sont disponibles
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
              body: JSON.stringify({ vu: true }), 
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
    const fetchStudents = async () => {
      const response = await fetch('http://localhost:8000/api/etudiants/');
      const data = await response.json();
      setStudents(data);
    };

    fetchStudents();
  }, []);


  const handleStudentClick = (student) => {
    setSelectedStudent(student);
  };

  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedStudent) {
        const responseSent = await fetch(`http://localhost:8000/api/messages/for_conseiller/?conseiller_id=${conseillerId}&etudiant_id=${selectedStudent.id}`);
        const responseReceived = await fetch(`http://localhost:8000/api/messages/for_etudiant/?etudiant_id=${selectedStudent.id}&conseiller_id=${conseillerId}`);
  
        const dataSent = await responseSent.json();
        const dataReceived = await responseReceived.json();
  
        const allMessages = [...dataSent, ...dataReceived];
  
        allMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  
        setMessages(allMessages);
      }
    };
  
    fetchMessages();
  
    const interval = setInterval(fetchMessages, 1000); 
  
    return () => clearInterval(interval); 
  }, [selectedStudent, conseillerId]);
  

  const handleSendMessage = async (messageContent) => {
    if (selectedStudent) {
      const response = await fetch('http://localhost:8000/api/messages/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sender_conseiller: conseillerId,
          receiver_etudiant: selectedStudent.id,
          content: messageContent,
        }),
      });

      if (response.ok) {
        const newMessage = await response.json();
        setMessages([...messages, newMessage]);
      }
    }
  };


  const handleFormSubmit = (e) => {
    e.preventDefault();
    const messageInput = e.target.elements.message;
    handleSendMessage(messageInput.value);
    messageInput.value = '';
  };

  const avatars = [
    'woman.png', 'man.png', 'fox.png', 'ghost.png', 'rabbit.png', 'user.png', 'wolf.png', 'man (5).png',
    'man (1).png', 'man (3).png', 'man (2).png', 'man (4).png', 'ninja.png', 'man.png', 'owl.png', 'panda.png',
    'arab-woman.png', 'bird.png', 'avatar.png', 'bear.png', 'beauty.png', 'butterfly.png', 'dragon.png',
    'dog.png', 'deer.png', 'girl.png', 'human.png', 'buddy.png', 'buddy (2).png', 'woman (1).png', 'woman (2).png',
    'woman (3).png', 'woman (4).png', 'woman (5).png', 'narwhal.png', '1.png', '2.png', '3.png', '4.png', '5.png'
  ];
  
  // Helper function to get a random avatar
  const getRandomAvatar = () => {
    const randomIndex = Math.floor(Math.random() * avatars.length);
    return avatars[randomIndex];
  };

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link rel="stylesheet" href="https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css" />
        {/* Global styles */}
        <GlobalStyles />

        <title>Messagerie</title>
      </head>
      <body>
      <TopNavbar open={sidebarOpen}> {/* Pass the sidebarOpen state to adjust position */}
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
          <Content isSidebarCollapsed={sidebarOpen}>
        <ChatList>
          <h2>Étudiants</h2>
          <ul>
            {students.map(student => (
              <li key={student.id} onClick={() => handleStudentClick(student)}>
                <img src={`/img/avatars/${getRandomAvatar()}`} alt={`Avatar for ${student.Nom}`} width="30" height="30" style={{ marginRight: '10px' }} />
                {student.Nom}
              </li>
            ))}
          </ul>
        </ChatList>
        <ChatWindow>
          {selectedStudent ? (
            <>
              <h2>Conversation avec {selectedStudent.Nom}</h2>
              <Messages>
                      <ul>
                        {messages.map((message, index) => (
                          <li
                            key={index}
                            className={
                              message.sender_conseiller === parseInt(conseillerId, 10)
                                ? 'conseiller-message'
                                : 'student-message'
                            }
                          >
                            {message.content}
                          </li>
                        ))}
                      </ul>
                    </Messages>
              <SendMessageForm onSubmit={handleFormSubmit}>
                <input type="text" name="message" placeholder="Ecrire votre message..." required />
                <button type="submit">
                  <img src="/img/send.png" alt="Send" />
                </button>
              </SendMessageForm>
            </>
          ) : (
            <p>Sélectionnez un étudiant pour commencer une conversation.</p>
          )}
        </ChatWindow>
      </Content>
        
          

        </ContentContainer>

        {/* SIDEBAR */}
      </body>
    </html>
  );
}

export default ChatAdvisor;

