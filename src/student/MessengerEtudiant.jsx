import { useEffect, useState, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import Modal from 'react-modal';
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



const GlobalSearchBar = styled.input`
  width: 240px;
  padding: 5px;
  border-radius: 20px;
  border: 1px solid #ddd;
  box-shadow: 0 1px 1px var(--secondary-color);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    border-color: var(--secondary-color);
  }

  &:focus {
    outline: none;
    border-color: var(--secondary-color);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;




const Content = styled.div`
  display: flex;
  flex: 1;
  margin-left: ${props => (props.isSidebarCollapsed ? '60px' : '200px')}; /* Adjust based on sidebar state */
  transition: margin-left 0.3s ease;
  margin-top: 70px;
  border-radius: 25px; /* Pour arrondir les coins */
  border: 1px solid var(--pshade9);
  width: 990px;
  height: 460px;
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

  .student-message {
    background-color: #f0f0f0;
    color: black;
    text-align: left;
    margin-left: auto;
  }

  .conseiller-message {
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



const ChatStudent = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [conseillers, setConseillers] = useState([]);
  const [selectedConseiller, setSelectedConseiller] = useState(null);
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();
  const etudiantId = localStorage.getItem('etudiantId');

  useEffect(() => {

    if (!etudiantId) {
      navigate('/getin');
      return; 
    }
    const fetchConseillers = async () => {
      const response = await fetch('http://localhost:8000/api/conseillers/');
      const data = await response.json();
      const conseillersWithLastMessage = await Promise.all(data.map(async (conseiller) => {
        const responseSent = await fetch(`http://localhost:8000/api/messages/for_etudiant/?etudiant_id=${etudiantId}&conseiller_id=${conseiller.id}`);
        const responseReceived = await fetch(`http://localhost:8000/api/messages/for_conseiller/?conseiller_id=${conseiller.id}&etudiant_id=${etudiantId}`);
        const dataSent = await responseSent.json();
        const dataReceived = await responseReceived.json();
        const allMessages = [...dataSent, ...dataReceived];
        allMessages.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        const lastMessage = allMessages[0]; // Get the last message
        return { ...conseiller, lastMessage };
      }));
      setConseillers(conseillersWithLastMessage);
    };
  
    fetchConseillers();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 800) {
        setIsSidebarCollapsed(true);
      } else {
        setIsSidebarCollapsed(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedConseiller) {
        const responseSent = await fetch(`http://localhost:8000/api/messages/for_etudiant/?etudiant_id=${etudiantId}&conseiller_id=${selectedConseiller.id}`);
        const responseReceived = await fetch(`http://localhost:8000/api/messages/for_conseiller/?conseiller_id=${selectedConseiller.id}&etudiant_id=${etudiantId}`);
        const dataSent = await responseSent.json();
        const dataReceived = await responseReceived.json();
        const allMessages = [...dataSent, ...dataReceived];
        allMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        setMessages(allMessages);
      }
    };
  
    fetchMessages();
  
    const interval = setInterval(fetchMessages,   1000); 
  
    return () => clearInterval(interval); 
  }, [selectedConseiller, etudiantId]);
  

  const handleConseillerClick = (conseiller) => {
    setSelectedConseiller(conseiller);
  };

  const handleSendMessage = async (messageContent) => {
    if (selectedConseiller) {
      const response = await fetch('http://localhost:8000/api/messages/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sender_etudiant: etudiantId,
          receiver_conseiller: selectedConseiller.id,
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


  const handleNavigation = (url) => {
    navigate(url);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/getin'); 
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
                <li className="activo"  onClick={() => handleNavigation('/mindCare/chat')}><i className="bx bxs-chat"></i><span>Messagerie</span></li>
                <li onClick={() => handleNavigation('/mindCare/myfeedback')}><i className="bx bxs-comment"></i><span>Mes Feedback</span></li>
                <li onClick={() => handleNavigation('/mindCare/myAppointments')}><i className="bx bxs-folder"></i><span>Mes Consultations</span></li>
                <li onClick={handleLogout}><i className="bx bxs-log-out" style={{color: '#b03d33'}}></i><span>Déconnexion</span></li>
            </ul>
    </Sidebar>
    <Content isSidebarCollapsed={isSidebarCollapsed}>
      <ChatList>
        <h2>Conseillers</h2>
        <ul>
              {conseillers.map(conseiller => (
                <li key={conseiller.id} onClick={() => handleConseillerClick(conseiller)}>
                      {conseiller.image && (
                        <img
                          src={conseiller.image}
                          alt="Avatar"
                          className="avatar"
                        />
                      )}
            <div className="message-container">
              <div>{conseiller.Nom}</div>
              <div className="message">{conseiller.lastMessage ? conseiller.lastMessage.content : 'Commencer une Conversation'}</div>
            </div>
            {conseiller.est_connecte && <div className="online-dot"></div>}
          </li>
        ))}
      </ul>

      </ChatList>
      <ChatWindow>
        {selectedConseiller ? (
          <>
            <h2>Conversation avec {selectedConseiller.Nom}</h2>
            <Messages>
                <ul>
                  {messages.map(message => (
                    <li
                      key={message.id}
                      className={
                        message.sender_etudiant === parseInt(etudiantId, 10)
                          ? 'student-message'
                          : 'conseiller-message'
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
          <p>Select a conseiller to start a conversation.</p>
        )}
      </ChatWindow>
    </Content>
  </Container>
</GlobalStyles>
);
};

export default ChatStudent;