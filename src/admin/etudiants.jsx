import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Link } from 'react-router-dom';

import ReactModal from 'react-modal';



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

const ActionButton = styled.button`
  background-color: transparent; /* Remove background color */
  color: green; /* Set text color */
  border: none;
  border-radius: 10px;
  padding: 5px 10px;
  font-size: 14px;
  width: 30px;
  cursor: pointer;
  margin-right: 20px;
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
  background: var(--shade10);
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

// Styled component for the sidebar icon
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
  outline: none; /* Remove default focus outline */

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
  width: 18%; /* Width of the line */
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

const ChatIcon = styled.i`
  font-size: 24px;
  color: #4c8ab2;
  cursor: pointer;
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
  overflow-y: auto; /* Enable vertical scrolling */
  max-height: 400px; /* Maximum height of the container */
  width: calc(100% - 40px);
  margin-top: 190px;
  @media screen and (max-width: 768px) {
    width: calc(100% - 110px);
    overflow-x: auto;
    overflow-y: auto;
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

const EtudiantButton = styled.button`
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
  top: 104px;
  left: ${(props) => (props.open ? '362px' : '105px')}; 
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


const ModalContent = styled.div`
  padding: 20px;
`;

// Styled component for the input fields
const InputField = styled.input`
  width: 100%;
  height: 40px;
  border: 1px solid var(--blue); /* Use blue color for border */
  border-radius: 5px;
  margin-bottom: 10px; /* Add space between inputs */
  padding: 0 10px;
  font-size: 16px;
  outline: none;
`;


const SecondSearchBar = styled.input`
  width: 200px;
  height: 34px;
  border-radius: 20px;
  border: 1px solid var(--secondary-color);
  padding: 0 20px;
  font-size: 16px;
  outline: none;
  float: left; /* Align to the left */
  transition: border-color 0.3s ease; /* Add transition for smooth hover effect */
  margin-top:   15px;
  &:hover {
    border-color: var(--secondary-color); /* Remove border on hover */
  }
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


function Etudiants() {
  const [alerts, setAlerts] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [students, setStudents] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true); // Initialize sidebar as open
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4); // Set the number of items per page
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [editedStudent, setEditedStudent] = useState(null);
  const [isEtudiantModalOpen, setIsEtudiantModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');


  const openEtudiantModal = () => {
    setIsEtudiantModalOpen(true);
  };

  const closeEtudiantModal = () => {
    setIsEtudiantModalOpen(false);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = '/connect'; 
  };
  

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
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
  const currentItems = students.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(students.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
  const fetchStudents = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/etudiants/`);
      if (response.ok) {
        const data = await response.json();
        // Filter data based on search query
        const filteredStudents = data.filter(student =>
          student.Nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
          student.Prenom.toLowerCase().includes(searchQuery.toLowerCase()) ||
          student.major.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setStudents(filteredStudents);
      } else {
        console.error('Failed to fetch students:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  fetchStudents();
}, [searchQuery]);
  

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
            body: JSON.stringify({ vu: true }), 
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

  


  const toggleSidebar = () => {
    if (window.innerWidth <= 768) {
      setSidebarOpen(false); // Always close sidebar on small screens
    } else {
      setSidebarOpen(!sidebarOpen); // Toggle sidebar state on larger screens
    }
  };

  const handleRemove = async (studentId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/etudiants/${studentId}/`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Remove the student from the state
        setStudents(students.filter(student => student.id !== studentId));
        // Optionally, show a success message or perform other actions
      } else {
        console.error('Failed to delete student:', response.statusText);
        // Optionally, show an error message or perform other actions
      }
    } catch (error) {
      console.error('Error deleting student:', error);
      // Optionally, show an error message or perform other actions
    }
  };


  const handleRemoveWithConfirmation = (studentId) => {
    const confirmDelete = window.confirm("Voulez-vous vraiment supprimer cet étudiant ?");
    if (confirmDelete) {
      handleRemove(studentId);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleModify = async (studentId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/etudiants/${studentId}/`);
      if (response.ok) {
        const data = await response.json();
        // Set the selected student details
        setSelectedStudent(data);
        // Open the modal
        openModal();
      } else {
        console.error('Failed to fetch student details:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching student details:', error);
    }
  };

  const handleUpdateStudent = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/etudiants/${selectedStudent.id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedStudent),
      });
      if (response.ok) {
        // Mettre à jour les données de l'étudiant dans l'état local
        setStudents(students.map(student => student.id === selectedStudent.id ? editedStudent : student));
        // Fermer le formulaire modal
        closeModal();
        window.location.reload();

      } else {
        console.error('Failed to update student:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };
  

  const handleAddStudent = async (newStudent) => {
    try {
      const response = await fetch('http://localhost:8000/api/etudiants/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newStudent),
      });
      if (response.ok) {
        const addedStudent = await response.json();
        setStudents([...students, addedStudent]);
        closeEtudiantModal();
      } else {
        console.error('Failed to add student:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  const [newStudent, setNewStudent] = useState({
    nomUtilisateur: '',
    motDePasse: '',
    email: '',
    phoneNumber: '',
    Nom: '',
    Prenom: '',
    major: '',
    age: '',
  });
  
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
      <ReactModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Student Details Modal"
          style={{
            content: {
              width: '35%',
              height: '52%',
              margin: 'auto',
              marginLeft: '38%',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              border: '1px solid var(--primary-color)',
              borderRadius: '10px',
              overflow: 'auto',
            },
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            },
          }}
        >
          <img
              src="/img/x.png"
              alt="Close"
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                cursor: 'pointer',
                width: '25px',
                height: '25px',
              }}
            />
          <ModalContent>
            <h2>Student Details</h2>
            <InputField
              type="text"
              placeholder="Email"
              value={selectedStudent ? selectedStudent.email : ''}
              readOnly
            />
            <InputField
                type="text"
                placeholder="Nom"
                value={editedStudent ? editedStudent.Nom : (selectedStudent ? selectedStudent.Nom : '')}
                onChange={(e) => setEditedStudent({ ...editedStudent, Nom: e.target.value })}
                />
                <InputField
                type="text"
                placeholder="Prénom"
                value={editedStudent ? editedStudent.Prenom : (selectedStudent ? selectedStudent.Prenom : '')}
                onChange={(e) => setEditedStudent({ ...editedStudent, Prenom: e.target.value })}
                />

            <ValiderButton onClick={handleUpdateStudent}>Modifier</ValiderButton>
          </ModalContent>
        </ReactModal>

        <ReactModal
            isOpen={isEtudiantModalOpen}
            onRequestClose={closeEtudiantModal}
            contentLabel="Ajouter un étudiant"
            style={{
              content: {
                width: '500px',
                height: '370px',
                margin: 'auto',
                marginLeft: '38%',
                backgroundColor: '#f2f2f2',
                borderRadius: '8px',
                padding: '20px',
                overflow: 'auto',
              },
              overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
              },
            }}
          >

          <img
              src="/img/x.png"
              alt="Close"
              onClick={closeEtudiantModal}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                cursor: 'pointer',
                width: '25px',
                height: '25px',
              }}
            />
      <ModalContent>
        <h2>Ajouter un nouvel étudiant</h2>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', marginRight: '10px' }}>
            <InputField
              type="text"
              value={newStudent.nomUtilisateur}
              onChange={(e) => setNewStudent({ ...newStudent, nomUtilisateur: e.target.value })}
              placeholder="Nom d'utilisateur"
            />
            <InputField
              type="password"
              value={newStudent.motDePasse}
              onChange={(e) => setNewStudent({ ...newStudent, motDePasse: e.target.value })}
              placeholder="Mot de passe"
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <InputField
              type="email"
              value={newStudent.email}
              onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
              placeholder="Email"
            />
            <InputField
              type="text"
              value={newStudent.phoneNumber}
              onChange={(e) => setNewStudent({ ...newStudent, phoneNumber: e.target.value })}
              placeholder="Numéro de téléphone"
            />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', marginRight: '10px' }}>
            <InputField
              type="text"
              value={newStudent.Nom}
              onChange={(e) => setNewStudent({ ...newStudent, Nom: e.target.value })}
              placeholder="Nom"
            />
            <InputField
              type="text"
              value={newStudent.Prenom}
              onChange={(e) => setNewStudent({ ...newStudent, Prenom: e.target.value })}
              placeholder="Prénom"
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <InputField
              type="text"
              value={newStudent.major}
              onChange={(e) => setNewStudent({ ...newStudent, major: e.target.value })}
              placeholder="Major"
            />
            <InputField
              type="number"
              value={newStudent.age}
              onChange={(e) => setNewStudent({ ...newStudent, age: e.target.value })}
              placeholder="Age"
            />
          </div>
        </div>
        <div style={{ display: 'flex', marginLeft: '10px' }}>
          <ValiderButton primary onClick={() => handleAddStudent(newStudent)}>Ajouter</ValiderButton>
          <div style={{ marginLeft: '14px' }}>
          </div>
        </div>


      </ModalContent>
</ReactModal>


      <TopNavbar open={sidebarOpen}> {/* Pass the sidebarOpen state to adjust position */}
      <MenuIconContainer>
            <MenuIcon className={sidebarOpen ? 'bx bx-menu' : 'bx bx-menu-alt-right'} onClick={toggleSidebar} />
          </MenuIconContainer>
        <SearchBarContainer>
            <SearchBar type="text" placeholder="Search..." />
        </SearchBarContainer>         
        <ChatIcon className="bx bx-chat" /> 
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
        {/* SIDEBAR */}
        <ContentContainer open={sidebarOpen}>

        <Sidebar id="sidebar" open={sidebarOpen}> 
          <Brand href="#">
          <img
            src={sidebarOpen ? "/img/loo.png" : "/img/bee.png"} 
            alt=""
            width={sidebarOpen ? '145px' : '30px'} 
            style={{ marginTop: '25px', marginLeft: sidebarOpen ? '30px' : '30px' }} 
          />
        </Brand>
        <SideMenu>
            <SideMenuItem>
            <StyledLink to="/panel">
                <SideMenuItemIcon className='bx bxs-dashboard'></SideMenuItemIcon>
                <SidebarTitle show={sidebarOpen}>Dashboard</SidebarTitle>
                </StyledLink>
            </SideMenuItem>
            <SideMenuItem>
            <StyledLink to="/panel/advisors">
                <SideMenuItemIcon className='bx bxs-group'></SideMenuItemIcon>
                <SidebarTitle show={sidebarOpen}>Conseillers</SidebarTitle>
                </StyledLink>
            </SideMenuItem>
            <SideMenuItemActive>
              <SideMenuItemLink href="#">
                <SideMenuItemIcon style={{ color: 'var(--secondary-color)' }} className='bx bxs-group'></SideMenuItemIcon>
                <SidebarTitle show={sidebarOpen} style={{ color: 'var(--secondary-color)' }}>Étudiants</SidebarTitle> 
              </SideMenuItemLink>
            </SideMenuItemActive>
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
                <SideMenuItemIcon className='bx bxs-comment'></SideMenuItemIcon>
                <SidebarTitle show={sidebarOpen}>Feedback</SidebarTitle>
              </StyledLink>
            </SideMenuItem>
          </SideMenu>
          <SideMenu>
            <SideMenuItem>
              <SideMenuItemLink href="#">
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


        <DataTableContainer>
        <SecondSearchBar 
        placeholder="Search..." 
        value={searchQuery}
        onChange={handleSearch} />

          
        <EtudiantButton open={sidebarOpen} onClick={openEtudiantModal}>
            Ajouter
          </EtudiantButton>
        <StyledTitle id="uniqueTitleId">Liste des Étudiants</StyledTitle>
            <BlueLine />
            
            <DataTable>
              <thead>
              <tr>
                <TableHeader>Email</TableHeader>
                <TableHeader>Nom</TableHeader>
                <TableHeader>Prénom</TableHeader>
                <TableHeader>Filière</TableHeader>

                <TableHeader>Actions</TableHeader>

              </tr>
              </thead>
              <tbody>
              {currentItems.map(student => (
                <tr key={student.id}>
                  <LargeTableData>{student.email}</LargeTableData>
                  <LargeTableData>{student.Nom}</LargeTableData>
                  <LargeTableData>{student.Prenom}</LargeTableData>
                  <LargeTableData>{student.major}</LargeTableData>

                  <LargeTableData>
                  <ActionButton onClick={() => handleRemoveWithConfirmation(student.id)}>
                <img src="/img/delete.png" alt="Supprimer" width="22px" />
                </ActionButton>
                    <ActionButton onClick={() => handleModify(student.id)}>
                        <img src="/img/modify.png" alt="Modifier" width="22px" />
                    </ActionButton>
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
          

        </ContentContainer>

      </body>
    </html>
  );
}

export default Etudiants;

