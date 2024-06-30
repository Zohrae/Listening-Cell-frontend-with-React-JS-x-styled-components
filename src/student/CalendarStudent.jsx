import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title as ChartTitle, CategoryScale } from 'chart.js';
ChartJS.register(LineElement, PointElement, LinearScale, ChartTitle, CategoryScale);

const CalendarStudent = () => {
    const username = sessionStorage.getItem('username');
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
    const navigate = useNavigate();
    const [student, setStudent] = useState(null);
    const etudiantId = sessionStorage.getItem('etudiantId');
    const [selectedDate, setSelectedDate] = useState(new Date());

    const toggleSidebar = () => {
        if (window.innerWidth >= 800) {
            setIsSidebarCollapsed(!isSidebarCollapsed);
        }
    };

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

    const avatars = [
        'woman.png', 'man.png', 'fox.png', 'ghost.png', 'rabbit.png', 'user.png', 'wolf.png', 'man (5).png',
        'man (1).png', 'man (3).png', 'man (2).png', 'man (4).png', 'ninja.png', 'man.png', 'owl.png', 'panda.png',
        'arab-woman.png', 'bird.png', 'avatar.png', 'bear.png', 'beauty.png', 'butterfly.png', 'dragon.png',
        'dog.png', 'deer.png', 'girl.png', 'human.png', 'buddy.png', 'buddy (2).png', 'woman (1).png', 'woman (2).png',
        'woman (3).png', 'woman (4).png', 'woman (5).png', 'narwhal.png', '1.png', '2.png', '3.png', '4.png', '5.png'
    ];

    useEffect(() => {
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
    }, [etudiantId]);

    const handleNavigation = (url) => {
        navigate(url);
    };

    const handleLogout = () => {
        sessionStorage.clear();
        navigate('/getin');
    };

    return (
        <Container>
            <style>
                {`
                @import url('https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css');
                `}
            </style>
            <Navbar collapsed={isSidebarCollapsed}>
                <NavIcons>
                    <i className="bx bx-menu" style={{ color: 'grey' }} onClick={toggleSidebar}></i>
                </NavIcons>
                <SearchBarDash>
                    <input type="text" placeholder="Search..." />
                    <i className="bx bx-search"></i>
                </SearchBarDash>
                <NavIcons>
                    <i onClick={() => handleNavigation('/mindCare/chat')} className="bx bxs-chat" style={{ color: 'var(--secondary-color)' }}></i>
                    <i className="bx bxs-bell" style={{ color: 'grey' }}></i>
                    {student && student.image ? (
                        <ProfileImage src={student.image} alt={`${student.Nom} ${student.Prenom}`} />
                    ) : (
                        <i className="bx bxs-user" style={{ color: 'var(--secondary-color)' }} ></i>
                    )}
                </NavIcons>
            </Navbar>
            <Sidebar collapsed={isSidebarCollapsed}>
                <ul>
                    <li className="activo" onClick={() => handleNavigation('/mindCare')}><i className="bx bxs-dashboard"></i><span>Dashboard</span></li>
                    <li onClick={() => handleNavigation('/mindCare/chat')}><i className="bx bxs-chat"></i><span>Messagerie</span></li>
                    <li onClick={() => handleNavigation('/mindCare/myfeedback')}><i className="bx bxs-comment"></i><span>Mes Feedback</span></li>
                    <li  className="activo" onClick={() => handleNavigation('/mindCare/myAppointments')}><i className="bx bxs-folder"></i><span>Mes Consultations</span></li>
                    <li onClick={handleLogout}><i className="bx bxs-log-out"></i><span>Déconnexion</span></li>
                </ul>
            </Sidebar>

            <Content isSidebarCollapsed={isSidebarCollapsed}>
                <HeaderContainer>
                    <Title>Bonjour !</Title>
                    <Breadcrumb>
                        Dashboard <BreadcrumbSeparator>|</BreadcrumbSeparator> <span>Feedback</span>
                    </Breadcrumb>
                </HeaderContainer>
                <StyledCalendarContainer>
                    <StyledCalendar
                        onChange={setSelectedDate}
                        value={selectedDate}
                    />
                </StyledCalendarContainer>
            </Content>
        </Container>
    );
};

export default CalendarStudent;

const customStyles = {
    content: {
        top: '50%',
        left: '60%',
        width: '500px',
        height: '400px',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        padding: '20px',
        borderRadius: '10px',
    },
};

const Container = styled.div`
    display: flex;
    height: 100vh;
    width: calc(100vw - 115px);
    overflow: auto;
`;

const Navbar = styled.nav`
  position: fixed;
  top: 0;
  right: 0;
  width: calc(100% - ${props => (props.collapsed ? '60px' : '27px')});
  height: 60px;
  background-color: var(--shade11);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  z-index: 1000;
  border-radius: 25px;
  transition: width 0.3s ease;

  @media (max-width: 800px) {
    width: calc(100% - 60px); // Adjust width when sidebar is collapsed
  }
`;

const SearchBarDash = styled.div`
    position: relative;
    left: 20%;
    padding: 5px;

    input {
        padding: 8px 60px;
        border-radius: 75px;
        border: none;
        background-color: var(--shade10);
        outline: none;
    }
    i {
        position: absolute;
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
        color: var(--secondary-color);
    }
`;

const NavIcons = styled.div`
    display: flex;
    gap: 15px;
    color: var(--pshade5);
    i {
        font-size: 26px;
        cursor: pointer;
        &:hover {
            color: var(--shade3);
        }
    }
`;

const Sidebar = styled.div`
  position: fixed;
  top: 70px;
  left: 30px;
  bottom: 20px;
  width: ${props => (props.collapsed ? '60px' : '200px')};
  height: calc(100% - 110px);
  background-color: var(--dark-grey);
  color: black;
  padding: 20px 0;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  z-index: 999;
  border-radius: 25px;

  @media (max-width: 800px) {
    width: 60px;
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
        display: ${props => (props.collapsed ? 'none' : 'inline')};
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
  margin-left: ${props => (props.isSidebarCollapsed ? '70px' : '200px')}; // Updated sidebar width
  width: calc(100% - ${props => (props.isSidebarCollapsed ? '90px' : '230px')}); // Adjust content width accordingly
  height: calc(100% - 60px);
  overflow-y: auto;
  padding: 20px;
`;

const ProfileImage = styled.img`
    width: 26px;
    height: 26px;
    border-radius: 50%;
    cursor: pointer;
`;

const HeaderContainer = styled.div`
  margin-bottom: 20px;
  text-align: left;
  margin-top: 4%; // Updated margin-top to align vertically
    display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Title = styled.h2`
  font-size: 30px;
  color: black;
  margin-bottom: 10px;

  @media (max-width: 800px) {
    font-size: 24px;
  }
`;

const Breadcrumb = styled.div`
  font-size: 19px;
  color: var(--shade2);
  margin-bottom: 20px;

  @media (max-width: 800px) {
    font-size: 16px;
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

const StyledCalendarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5%;
`;

const StyledCalendar = styled(Calendar)`
  width: 100%;
  height: auto;
  background-color: var(--shade10);
  border-radius: 10px;
  
`;
