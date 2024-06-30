import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components'; 
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import Calendar from 'react-calendar'; 
import Navbar from '../components/Navbar';

const DashboardStudent = () => {
    const username = localStorage.getItem('username');
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [calendarDate, setCalendarDate] = useState(new Date()); 
    const navigate = useNavigate();
    const [student, setStudent] = useState(null);
    const [randomQuote, setRandomQuote] = useState('');
    const etudiantId = localStorage.getItem('etudiantId');
    const [todos, setTodos] = useState([]);
    const [isDateModalOpen, setIsDateModalOpen] = useState(false);
    const [newTodo, setNewTodo] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false); // State for notification modal

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


      const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const avatars = [
        'woman.png', 'man.png', 'fox.png', 'ghost.png', 'rabbit.png', 'user.png', 'wolf.png', 'man (5).png',
        'man (1).png', 'man (3).png', 'man (2).png', 'man (4).png', 'ninja.png', 'man.png', 'owl.png', 'panda.png',
        'arab-woman.png', 'bird.png', 'avatar.png', 'bear.png', 'beauty.png', 'butterfly.png', 'dragon.png',
        'dog.png', 'deer.png', 'girl.png', 'human.png', 'buddy.png', 'buddy (2).png', 'woman (1).png', 'woman (2).png',
        'woman (3).png', 'woman (4).png', 'woman (5).png', 'narwhal.png', '1.png', '2.png', '3.png', '4.png', '5.png'
    ];

    useEffect(() => {
      if (!etudiantId) {
        navigate('/getin');
        return; 
      }
      const fetchStudent = async () => {
          try {
              const response = await fetch(`http://127.0.0.1:8000/api/etudiants/${etudiantId}/`);
              const data = await response.json();
              setStudent(data);  
          } catch (error) {
              console.error('Error fetching student data:', error);
          }
      };

      fetchStudent();

      const fetchTodos = async () => {
          try {
              const response = await fetch(`http://127.0.0.1:8000/api/todos/etudiant/${etudiantId}/`);
              const data = await response.json();
              setTodos(data);
          } catch (error) {
              console.error('Error fetching TODOs:', error);
          }
      };

      fetchTodos();
  }, [etudiantId]);


    const handleCalendarChange = date => {
        setCalendarDate(date);
    };


    const openDateModal = (date) => {
      const adjustedDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
      setSelectedDate(adjustedDate);
      setIsDateModalOpen(true);
  };
  
    
    const closeDateModal = () => {
        setIsDateModalOpen(false);
    };
  

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const response = await fetch('http://127.0.0.1:8000/api/todos/', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  TODO: newTodo,
                  DateAjoutTODO: selectedDate.toISOString(),
                  assignee_etudiant: etudiantId,
              }),
          });
          if (response.ok) {
              fetchTodos();
              setNewTodo('');
              closeDateModal();
          } else {
              console.error('Failed to add TODO');
          }
      } catch (error) {
          console.error('Error adding TODO:', error);
      }
  };

  const openNotificationModal = () => {
    setIsNotificationModalOpen(true);
  };

  const closeNotificationModal = () => {
      setIsNotificationModalOpen(false);
  };
  

  useEffect(() => {
      const fetchRandomQuote = async () => {
          try {
              const response = await fetch('http://127.0.0.1:8000/api/quotes/random_quote/');
              const data = await response.json();
              setRandomQuote(data.contenu);
          } catch (error) {
              console.error('Error fetching random quote:', error);
          }
      };

      fetchRandomQuote();
      const interval = setInterval(fetchRandomQuote, 24 * 60 * 60 * 1000); 

      return () => clearInterval(interval); 
  }, []);
  
    const handleNavigation = (url) => {
        navigate(url);
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/getin'); 
    };    
    
    return (
        <Container>
            <style>
                {`
                @import url('https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css');
                `}
            </style>
            <Navbar />

            
            <Sidebar collapsed={isSidebarCollapsed}>
            <ul>
                <li className="activo" onClick={() => handleNavigation('/mindCare')}><i className="bx bxs-dashboard"></i><span>Dashboard</span></li>
                <li onClick={() => handleNavigation('/mindCare/chat')}><i className="bx bxs-chat"></i><span>Messagerie</span></li>
                <li onClick={() => handleNavigation('/mindCare/myfeedback')}><i className="bx bxs-comment"></i><span>Mes Feedback</span></li>
                <li onClick={() => handleNavigation('/mindCare/myAppointments')}><i className="bx bxs-folder"></i><span>Mes Consultations</span></li>
                <li onClick={handleLogout}><i className="bx bxs-log-out" style={{color: '#b03d33'}}></i><span>Déconnexion</span></li>
            </ul>
            </Sidebar>
         

            <Content isSidebarCollapsed={isSidebarCollapsed}>

            <HeaderContainer>
            <NotificationIcon src='/img/notif/cat.png' alt="Notification" onClick={openNotificationModal} />
            
                <Title>Bonjour !</Title>
                <Breadcrumb>
                    Dashboard <BreadcrumbSeparator>|</BreadcrumbSeparator> <span>Messagerie</span>
                </Breadcrumb>
            </HeaderContainer>

            <RectangleContainer>
                <Rectangle color="rgb(254, 253, 252)">
                    <StyledForm>
                        <FormGroup>
                        <Label htmlFor="sujet">Sujet:</Label>
                        <Input type="text" id="sujet" name="sujet" placeholder="Entrez le sujet" />
                        </FormGroup>
                        <FormGroup>
                        <Label htmlFor="description">Description:</Label>
                        <Textarea id="description" name="description" placeholder="Entrez votre question"></Textarea>
                        </FormGroup>
                        <SubmitButton type="submit">Soumettre</SubmitButton>
                    </StyledForm>
                </Rectangle>

            
                    <Rectangle color="beige">
                    <Calendar
                          onChange={handleCalendarChange}
                          value={calendarDate}
                          tileContent={({ date, view }) => {
                              const adjustedDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
                              const dateString = adjustedDate.toISOString().split('T')[0];
                              const todosForDate = todos.filter(todo => new Date(todo.DateAjoutTODO).toISOString().split('T')[0] === dateString);
                              return (
                                  <div>
                                      {todosForDate.map(todo => (
                                          <div key={todo.id} style={{ color: 'var(--primary-color)' }}>{todo.TODO}</div>
                                      ))}
                                  </div>
                              );
                          }}
                          onClickDay={(value) => openDateModal(value)}
                      />

                    </Rectangle>                
                    
                    </RectangleContainer>
            </Content>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Profile Modal"
                style={customStyles}
            >
                <CloseButtonAvatar onClick={closeModal} src="/img/x.png" alt="Close" />
                <h2>Bonjour !</h2>
                <AvatarGrid>
                    {avatars.map((avatar, index) => (
                        <Avatar key={index} src={`/img/avatars/${avatar}`} alt={`Avatar ${index + 1}`} />
                    ))}
                </AvatarGrid>
            </Modal>

            <Modal
                isOpen={isNotificationModalOpen}
                onRequestClose={closeNotificationModal}
                contentLabel="Notification Modal"
                style={customStyles}
            >
                <CloseButtonAvatar onClick={closeNotificationModal} src="/img/x.png" alt="Close" />
                <h2>Motivation Modal</h2>
                <p>{randomQuote}</p>
            </Modal>

            <Modal
                  isOpen={isDateModalOpen}
                  onRequestClose={closeDateModal}
                  contentLabel="Date Modal"
                  style={customStyles}
              >
                  <CloseButtonAvatar onClick={closeDateModal} src="/img/x.png" alt="Close" />
                  <ModalTitle>Bonjour Ajouter votre TODO !</ModalTitle>
                  <Form onSubmit={handleSubmit}>
                    <InputField
                      type="text"
                      value={newTodo}
                      onChange={(e) => setNewTodo(e.target.value)}
                      placeholder="Enter your TODO"
                    />
                    <SubmitButton type="submit">Ajouter votre TODO</SubmitButton>
                  </Form>
              </Modal>
        </Container>
    );
};

export default DashboardStudent;

const customStyles = {
    content: {
        top: '30%',
        left: '70%',
        width: '500px',
        height: '200px',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        padding: '20px',
        borderRadius: '10px',
    },
};

const Container = styled.div`
    display: flex;
    height: 100%;
    width: calc(100vw - 100px);
    overflow: hidden;


    @media (max-width: 1061px) {
        flex-direction: column;
        width: calc(100vw - 5%);

    }

    @media (max-width: 800px) {
        flex-direction: column;
        width: calc(100vw - 5%);

    }
        
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


const Content = styled.div`
  margin-left: ${props => (props.isSidebarCollapsed ? '50px' : '16%')}; 
  width: ${props => (props.isSidebarCollapsed ? 'calc(100vw - 60px)' : 'calc(100vw - 130px)')};
  height: calc(100vh - 30px); 
  overflow-y: hidden;
  padding: 20px;
  

    h1 {
        font-size: 28px;
        margin-bottom: 20px;
    }


    @media (max-width: 1061px) {
        width: 100vw;
        padding: 10px;
        flex-direction: column;
        margin-left: ${props => (props.isSidebarCollapsed ? '4%' : '27%')}; 
        overflow: auto;
    }

    @media (max-width: 800px) {
        width: 100vw;
        padding: 10px;
        flex-direction: column;
        margin-left: ${props => (props.isSidebarCollapsed ? '11%' : '150px')}; 
        overflow: auto;

    }

    
  
`;


const AvatarGrid = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 20px;
`;

const Avatar = styled.img`
    width: 45px;
    height: 45px;
    cursor: pointer;
`;

const CloseButtonAvatar = styled.img`
    position: absolute;
    top: 10px;
    right: 10px;
    width: 25px;
    height: 25px;
    cursor: pointer;
    padding: 0;
    border: none;
    background: none;
    outline: none;
`;



const HeaderContainer = styled.div`
  margin-left: 0%;
  margin-right: auto;
  text-align: left;
    margin-top: 5%;
  @media (max-width: 800px) {
    margin-right: 0; 
    margin-top: 10%;
    overflow-x: hidden;

  }
  @media (max-width: 1200px) {
    margin-right: 0; 
    margin-top: 10%;
    overflow-x: hidden;
  }
  @media (max-width: 550px) {
    margin-right: 0;
    margin-top: 10%;
    overflow-x: hidden;
  }
`;

const Title = styled.h2`
  font-size: 30px;
  color: BLACK;

  @media (max-width: 800px) {
    font-size: 24px; 
  }

  @media (max-width: 1200px) {
    font-size: 24px; 
    margin-right: 10px; 
  }
`;

const Breadcrumb = styled.div`
  font-size: 19px;
  color: var(--shade2);
  margin-bottom: 20px;
  margin-right: 80px;

  @media (max-width: 800px) {
    font-size: 16px !important; 
    margin-right: -15px !important;
  }

  @media (max-width: 670px) {
    font-size: 16px !important; 
    margin-right: -30px !important;
  }

  @media (max-width: 650px) {
    font-size: 16px !important; 
    margin-right: -45px !important;
  }

  @media (max-width: 560px) {
    font-size: 16px !important; 
    margin-right: -50px !important;
  }

  @media (max-width: 1200px) {
    font-size: 16px; 
    margin-right: 10px; 
  }

  span {
    color: var(--pshade2);
    font-weight: bold;
  }
`;

const BreadcrumbSeparator = styled.span`
  margin: 0 10px;
  color: var(--pshade5);
`;

const RectangleContainer = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 20px;
    width: 100%;

   
    
    @media (max-width: 1061px) {
        flex-direction: column;
        align-items: center;
        width: 70%;
    }
    @media (max-width: 800px) {
        flex-direction: column;
        align-items: center;
        width: 85%;
    }
`;

const Rectangle = styled.div`
    position: relative; /* Add relative position */
    width: 580px;
    height: 350px;
    border-radius: 20px;
    background-color: ${props => props.color || 'black'};
    display: flex;
    justify-content: center;
    align-items: center;

    .react-calendar {
        width: 100%;
        max-width: 100%;
        height: 100%;
        max-height: 100%;
        border: 1px solid var(--primary-color);
        border-radius: 15px;

        .react-calendar__tile--now {
            position: relative;
            background: none !important;
            color: black !important;
            border-radius: 50%;
            animation: zoomInOut 2s infinite alternate; /* Add animation */
            
            &:after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 50%;
                transform: translateX(-50%);
                width: 30px;
                height: 5px;
                background-color: var(--secondary-color);
            }
        }
    }

    @keyframes zoomInOut {
        0% {
            transform: scale(1);
        }
        100% {
            transform: scale(1.2);
        }
    }

    

    @media (max-width: 1061px) {
        flex-direction: column;
        align-items: center;
        width: 90%;
    }

    @media (max-width: 800px) {
        flex-direction: column;
        align-items: center;
        width: 95%;
    }
`;



const zoomInOut = keyframes`
    0% {
        transform: scale(1);
    }
    100% {
        transform: scale(1.2);
    }
`;

const NotificationIcon = styled.img`
    width: 35px;
    height: auto;
    float: right;
    margin-right: 5%;
    cursor: pointer;
    animation: ${zoomInOut} 1s infinite alternate; // Apply animation to the icon
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Label = styled.label`
  font-size: 16px;
  color: var(--primary-color);
      text-align: left;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid var(--secondary-color);
  border-radius: 5px;
  outline: none;
  transition: box-shadow 0.3s ease;
  &:hover {
    box-shadow: 0 0 5px var(--secondary-color);
  }
  &:focus {
    box-shadow: 0 0 10px var(--secondary-color);
  }
`;

const Textarea = styled.textarea`
  padding: 10px;
  border: 1px solid var(--secondary-color);
  border-radius: 5px;
  outline: none;
  transition: box-shadow 0.3s ease;
  &:hover {
    box-shadow: 0 0 5px var(--secondary-color);
  }
  &:focus {
    box-shadow: 0 0 10px var(--secondary-color);
  }
  height: 130px;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: var(--primary-color);
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    background-color: var(--pshade1);
    box-shadow: 0 0 3px var(--pshade1);
  }
`;

const ModalTitle = styled.h2`
  color: #333; /* Adjust color as needed */
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputField = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #007bff; /* Primary color */
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); /* Primary color shadow */
  }
`;
