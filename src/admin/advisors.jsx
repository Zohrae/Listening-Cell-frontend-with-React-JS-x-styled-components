import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
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

// Styled component for the active side menu item
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
  width: 20%; /* Width of the line */
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

const ConseillerButton = styled.button`
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
  top: 100px;
  left: ${(props) => (props.open ? '362px' : '105px')}; /* Adjust the left position based on sidebarOpen state */
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

const ValiderDispoButton = styled(ValiderButton)`
  margin-top: 20px;
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

const IconFerme = styled.img`
  position: absolute;
  // top: 10px;
  right: 20px;
  cursor: pointer;
  width: 30px;
`;

const DropdownContainerDispo = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButtonDispo = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
`;

const DropdownContentDispo = styled.div`
  display: ${(props) => (props.show ? 'block' : 'none')};
  position: absolute;
  background-color: white;
  min-width: 120px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  border-radius: 5px;
  overflow: hidden;
  left: -110px; /* Adjust this value as needed to control how far left the dropdown appears */

`;

const DropdownItemDispo = styled.div`
  color: black;
  padding: 10px;
  text-align: center;
  text-decoration: none;
  display: flex; /* Utiliser une disposition en ligne */
  align-items: center; /* Aligner les éléments verticalement au centre */
  cursor: pointer;

  &:hover {
    background-color: var(--shade11);
  }
`;

const DispoIconContainer = styled.div`
  margin-top: 4px;
  margin-right: 5px;
  
`;

const DispoIcon = styled.i`
    color: var(--secondary-color);
    width: 20px;
    height: 20px;
`;

const VoirModalContentDispo = styled.div`
  padding: 20px;
`;



const HighlightedTile = styled.div`
  background: var(--primary-color) !important;
  color: white;
`;

const TimeList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-top: 10px;
`;

const TimeListItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  background: #f3f4f6;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const TimeIcon = styled.i`
  margin-right: 10px;
  color: purple;
  font-size: 20px;
`;

const TimeText = styled.span`
  font-size: 16px;
  color: #333;
`;

const ErrorMessage = styled.p`
    color: red;
    font-size: 14px;
    margin-top: 5px;
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

function Conseillers() {
    const [alerts, setAlerts] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [conseillers, setConseillers] = useState([]); 
    const [sidebarOpen, setSidebarOpen] = useState(true); // Initialize sidebar as open
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(4); // Set the number of items per page
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedConseiller, setSelectedConseiller] = useState(null);
    const [editedConseiller, setEditedConseiller] = useState(null);
    const [isConseillerModalOpen, setIsConseillerModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isDispoConseillerOpen, setDispoConseillerOpen] = useState(false);
    const [dateHeure, setDateHeure] = useState('');
    const [showDropdownDispo, setShowDropdownDispo] = useState({});
    const [isVoirModalOpen, setIsVoirModalOpen] = useState(false);
    const [availabilityData, setAvailabilityData] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [dateError, setDateError] = useState('');
    const [adminData, setAdminData] = useState({});

  const openConseillerModal = () => {
    setIsConseillerModalOpen(true);
  };

  const closeConseillerModal = () => {
    setIsConseillerModalOpen(false);
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
  const currentConseillers = conseillers.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(conseillers.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    const fetchConseillers = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/conseillers/`);
        if (response.ok) {
          const data = await response.json();
          // Filter data based on search query
          const filteredConseillers = data.filter(conseiller =>
            conseiller.Nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
            conseiller.Prenom.toLowerCase().includes(searchQuery.toLowerCase()) ||
            conseiller.department.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setConseillers(filteredConseillers);
        } else {
          console.error('Failed to fetch conseillers:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching conseillers:', error);
      }
    };

    fetchConseillers();
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

  const handleRemoveConseiller = async (conseillerId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/conseillers/${conseillerId}/`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setConseillers(conseillers.filter(conseiller => conseiller.id !== conseillerId));
      } else {
        console.error('Failed to delete conseiller:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting conseiller:', error);
    }
  };


  const handleRemoveConseillerWithConfirmation = (conseillerId) => {
    const confirmDelete = window.confirm("Voulez-vous vraiment supprimer ce conseiller ?");
    if (confirmDelete) {
      handleRemoveConseiller(conseillerId);
    }
  };

  const openModifierModal = (conseiller) => {
    setSelectedConseiller(conseiller);
    setEditedConseiller(conseiller);
    setIsModalOpen(true);
  };


  const closeModierModal = () => {
    setIsModalOpen(false);
    setSelectedConseiller(null);
    setEditedConseiller(null);
  };

  const handleUpdateConseiller = async () => {
    try {
        // Prepare the editedConseiller object to ensure it matches the API requirements
        const updatedData = {
            email: editedConseiller.email, // Assuming email is part of the editedConseiller
            Nom: editedConseiller.Nom,
            Prenom: editedConseiller.Prenom,
            department: editedConseiller.department,
            // Include any other required fields here
        };

        const response = await fetch(`http://localhost:8000/api/conseillers/${selectedConseiller.id}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData), // Send only the prepared data
        });

        if (response.ok) {
            const updatedConseiller = await response.json();
            setConseillers(conseillers.map(conseiller => {
                if (conseiller.id === selectedConseiller.id) {
                    return { ...conseiller, ...updatedConseiller };
                }
                return conseiller;
            }));
            closeModierModal();
        } else {
            const errorData = await response.json();
            console.error('Failed to update conseiller:', response.statusText, errorData);
        }
    } catch (error) {
        console.error('Error updating conseiller:', error);
    }
};

  

  const handleAddConseiller = async (newConseiller) => {
    try {
      const response = await fetch('http://localhost:8000/api/conseillers/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newConseiller),
      });
      if (response.ok) {
        const addedConseiller = await response.json();
        setConseillers([...conseillers, addedConseiller]);
        setIsConseillerModalOpen(false); // Close the modal
      } else {
        console.error('Failed to add conseiller:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding conseiller:', error);
    }
  };

  const [newConseiller, setNewConseiller] = useState({
    nomUtilisateur: '',
    motDePasse: '',
    email: '',
    phoneNumber: '',
    Nom: '',
    Prenom: '',
    department: '',
    Instagram: '',
    Linkedin: '',
    Gmail: '',
  });


  const openDispoModal = (conseiller) => {
    setSelectedConseiller(conseiller); // Définir le conseiller sélectionné
    setDispoConseillerOpen(true); // Ouvrir le modal
    setShowDropdownDispo(prevState => ({
      ...prevState,
      [conseiller.id]: false
    }));
  };

  const closeDispoModal = () => {
    setDispoConseillerOpen(false);
  };

  const handleDateHeureChange = (e) => {
    setDateHeure(e.target.value);
  };

  const handleAddDisponibilite = async (e) => {
    e.preventDefault();
    const currentDateTime = new Date();
    const selectedDateTime = new Date(dateHeure);

    if (selectedDateTime < currentDateTime) {
        setDateError("La date choisie doit être postérieure à aujourd'hui.");
        return;
    }

    setDateError(''); 
    if (selectedConseiller && dateHeure) {
        const response = await fetch('http://localhost:8000/api/dispos/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                conseiller: selectedConseiller.id,
                date_heure: dateHeure,
            }),
        });

        if (response.ok) {
            closeDispoModal();
        } else {
            console.error('Erreur lors de l\'ajout de la disponibilité');
        }
    }
};



  const toggleDropdown = (conseillerId) => {
    setShowDropdownDispo(prevState => ({
      [conseillerId]: !prevState[conseillerId] 
    }));
  };
  

    useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container-dispo')) {
        setShowDropdownDispo({});
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  const handleVoirClick = async (conseiller) => {
    try {
      // Fetch availability data for the selected advisor
      const response = await fetch(`http://localhost:8000/api/dispos/?conseiller=${conseiller.id}`);
      if (response.ok) {
        const data = await response.json();
        // Update the state with availability data
        setAvailabilityData(data);
        // Open the modal
        setIsVoirModalOpen(true);
      } else {
        console.error('Failed to fetch availability data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching availability data:', error);
    } finally {
      setShowDropdownDispo(prevState => ({
        ...prevState,
        [conseiller.id]: false
      }));
    }
  };

  const closeVoirModal = () => {
    setIsVoirModalOpen(false);
  };
  

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const dateUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  
      const isAvailable = availabilityData.some(dispo => {
        const dispoDate = new Date(dispo.date_heure);
        return (
          dispoDate.getUTCFullYear() === dateUTC.getUTCFullYear() &&
          dispoDate.getUTCMonth() === dateUTC.getUTCMonth() &&
          dispoDate.getUTCDate() === dateUTC.getUTCDate()
        );
      });
  
      if (isAvailable) {
        return <HighlightedTile>{date.getDate()}</HighlightedTile>;
      }
    }
    return null;
  };
  

  const handleDateClick = (date) => {
    const filteredTimes = availabilityData
      .filter(dispo => {
        const dispoDate = new Date(dispo.date_heure);
        return (
          dispoDate.getUTCFullYear() === date.getFullYear() &&
          dispoDate.getUTCMonth() === date.getMonth() &&
          dispoDate.getUTCDate() === date.getDate()
        );
      })
      .map(dispo => {
        const localTime = new Date(dispo.date_heure);
        return localTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' });
      });
  
    setSelectedDate({ date, times: filteredTimes });
  };
  
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen); 
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


  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link rel="stylesheet" href="https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css" />
        <GlobalStyles />

        <title>Liste des Conseillers</title>
      </head>
      <body>
        <ReactModal
            isOpen={isModalOpen}
            onRequestClose={closeModierModal}
            contentLabel="Details de Conseiller"
            style={{
                content: {
                width: '40%',
                height: '60%',
                margin: 'auto',
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
              onClick={closeModierModal}
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
                <h2>Details</h2>
                <InputField
                type="text"
                placeholder="Email"
                value={selectedConseiller ? selectedConseiller.email : ''}
                readOnly
                />
                <InputField
                type="text"
                placeholder="Nom"
                value={editedConseiller ? editedConseiller.Nom : (selectedConseiller ? selectedConseiller.Nom : '')}
                onChange={(e) => setEditedConseiller({ ...editedConseiller, Nom: e.target.value })}
                />
                <InputField
                type="text"
                placeholder="Prénom"
                value={editedConseiller ? editedConseiller.Prenom : (selectedConseiller ? selectedConseiller.Prenom : '')}
                onChange={(e) => setEditedConseiller({ ...editedConseiller, Prenom: e.target.value })}
                />
                <InputField
                type="text"
                placeholder="Department"
                value={editedConseiller ? editedConseiller.department : (selectedConseiller ? selectedConseiller.department : '')}
                onChange={(e) => setEditedConseiller({ ...editedConseiller, department: e.target.value })}
                />
                <ValiderButton style={{marginLeft: ('10px')}} onClick={handleUpdateConseiller}>Modifier</ValiderButton>
            </ModalContent>
            </ReactModal>
            <ReactModal
                isOpen={isConseillerModalOpen}
                onRequestClose={closeConseillerModal}
                contentLabel="Ajouter un Conseiller"
                style={{
                    content: {
                    width: '500px',
                    height: '490px',
                    margin: 'auto',
                    backgroundColor: '#f2f2f2',
                    borderRadius: '8px',
                    padding: '20px',
                    overflow: 'hidden',
                    },
                    overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    },
                }}
                  >
                <ModalContent>
                  <h2>Ajouter un Nouveau Conseiller</h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ display: 'flex', gap: '20px' }}>
                      <InputField
                        type="text"
                        value={newConseiller.nomUtilisateur}
                        onChange={(e) => setNewConseiller({ ...newConseiller, nomUtilisateur: e.target.value })}
                        placeholder="Nom d'utilisateur"
                      />
                      <InputField
                        type="password"
                        value={newConseiller.motDePasse}
                        onChange={(e) => setNewConseiller({ ...newConseiller, motDePasse: e.target.value })}
                        placeholder="Mot de passe"
                      />
                    </div>
                    <div style={{ display: 'flex', gap: '20px' }}>
                      <InputField
                        type="email"
                        value={newConseiller.email}
                        onChange={(e) => setNewConseiller({ ...newConseiller, email: e.target.value })}
                        placeholder="Email"
                      />
                      <InputField
                        type="text"
                        value={newConseiller.phoneNumber}
                        onChange={(e) => setNewConseiller({ ...newConseiller, phoneNumber: e.target.value })}
                        placeholder="Numéro de téléphone"
                      />
                    </div>
                    <div style={{ display: 'flex', gap: '20px' }}>
                      <InputField
                        type="text"
                        value={newConseiller.Nom}
                        onChange={(e) => setNewConseiller({ ...newConseiller, Nom: e.target.value })}
                        placeholder="Nom"
                      />
                      <InputField
                        type="text"
                        value={newConseiller.Prenom}
                        onChange={(e) => setNewConseiller({ ...newConseiller, Prenom: e.target.value })}
                        placeholder="Prénom"
                      />
                    </div>
                    <div style={{ display: 'flex', gap: '20px' }}>
                      <InputField
                        type="text"
                        value={newConseiller.department}
                        onChange={(e) => setNewConseiller({ ...newConseiller, department: e.target.value })}
                        placeholder="Department"
                      />
                      <InputField
                        type="text"
                        value={newConseiller.Instagram}
                        onChange={(e) => setNewConseiller({ ...newConseiller, Instagram: e.target.value })}
                        placeholder="Instagram"
                      />
                    </div>
                    <div style={{ display: 'flex', gap: '20px' }}>
                      <InputField
                        type="text"
                        value={newConseiller.Linkedin}
                        onChange={(e) => setNewConseiller({ ...newConseiller, Linkedin: e.target.value })}
                        placeholder="Linkedin"
                      />
                      <InputField
                        type="text"
                        value={newConseiller.Gmail}
                        onChange={(e) => setNewConseiller({ ...newConseiller, Gmail: e.target.value })}
                        placeholder="Gmail"
                      />
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <ValiderButton primary onClick={() => handleAddConseiller(newConseiller)}>Ajouter</ValiderButton>
                    <div style={{ marginLeft: '14px' }}>
                      <ValiderButton onClick={closeConseillerModal}>Annuler</ValiderButton>
                    </div>
                  </div>
          </ModalContent>
      </ReactModal>

      <ReactModal 
        isOpen={isDispoConseillerOpen} 
        onRequestClose={closeDispoModal}
        style={{
          content: {
            width: '400px',
            height: '300px',
            margin: 'auto',
            marginTop: '100px',
            marginRight: '350px',
            backgroundColor: '#f2f2f2',
            borderRadius: '8px',
            padding: '20px',
            overflow: 'hidden',
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
        }}
      >
        <IconFerme
            src="/img/x.png"
            alt="Close"
            onClick={closeDispoModal}
          />
        <div style={{ position: 'relative' }}>
          
          
          <form onSubmit={handleAddDisponibilite} style={{ marginTop: '30px' }}>
          <h2>Ajouter une Disponibilité</h2>
          <p>Le conseiller sélectionné est {selectedConseiller ? selectedConseiller.Nom : ''}</p>
        
              <InputField
                type="datetime-local"
                value={dateHeure}
                onChange={handleDateHeureChange}
                required
              />
              {dateError && <ErrorMessage>{dateError}</ErrorMessage>}

            <ValiderDispoButton type="submit">Ajouter</ValiderDispoButton>
          </form>
        </div>
      </ReactModal>

      <ReactModal
        isOpen={isVoirModalOpen}
        onRequestClose={closeVoirModal}
        style={{
          content: {
            width: '450px',
            height: '480px',
            margin: 'auto',
            marginTop: '40px',
            marginRight: '350px',
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
        <VoirModalContentDispo>
          <img src="/img/x.png" alt="Close" width="20px" onClick={closeVoirModal} style={{ float: 'right', cursor: 'pointer', marginTop: '-20px' }} />
          <h2>Disponibilités</h2>
          <Calendar
            tileContent={tileContent}
            onClickDay={handleDateClick}
          />
          {selectedDate && (
            <div>
              <TimeList>
              {selectedDate.times.map((time, index) => (
                <TimeListItem key={index}>
                  <TimeIcon className="bx bx-time"></TimeIcon>
                  <TimeText>{time}</TimeText>
                </TimeListItem>
              ))}
            </TimeList>
            </div>
          )}
        </VoirModalContentDispo>
      </ReactModal>

      <TopNavbar open={sidebarOpen}> 
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
            <SideMenuItemActive>
              <SideMenuItemLink href="#">
              <SideMenuItemIcon style={{ color: 'var(--secondary-color)' }} className='bx bxs-group'></SideMenuItemIcon>
              <SidebarTitle show={sidebarOpen} style={{ color: 'var(--secondary-color)' }}>Conseillers</SidebarTitle> 
              </SideMenuItemLink>
              </SideMenuItemActive>
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


        <DataTableContainer>
        <SecondSearchBar 
        placeholder="Search..." 
        value={searchQuery}
        onChange={handleSearch} />

          
        <ConseillerButton open={sidebarOpen} onClick={openConseillerModal}>
            Ajouter
          </ConseillerButton>
        <StyledTitle id="uniqueTitleId">Liste des Conseillers</StyledTitle>
            <BlueLine />
            
            <DataTable>
              <thead>
              <tr>
              <TableHeader>Email</TableHeader>
              <TableHeader>Nom</TableHeader>
              <TableHeader>Prénom</TableHeader>
              <TableHeader>Département</TableHeader>
              <TableHeader>Actions</TableHeader>
            </tr>
              </thead>
              <tbody>
            {currentConseillers.map(conseiller => (
              <tr key={conseiller.id}>
                <LargeTableData>{conseiller.email}</LargeTableData>
                <LargeTableData>{conseiller.Nom}</LargeTableData>
                <LargeTableData>{conseiller.Prenom}</LargeTableData>
                <LargeTableData>{conseiller.department}</LargeTableData>
                <LargeTableData>

                  <ActionButton onClick={() => handleRemoveConseillerWithConfirmation(conseiller.id)}>
                    <img src="/img/delete.png" alt="Supprimer" width="22px" />
                  </ActionButton>
                  <ActionButton onClick={() => openModifierModal(conseiller)}>
                    <img src="/img/modify.png" alt="Modifier" width="22px" />
                    </ActionButton>
                    <DropdownContainerDispo className="dropdown-container-dispo">
                      <DropdownButtonDispo onClick={() => toggleDropdown(conseiller.id)}>
                        <img src="/img/adddispo.png" alt="Dispo" width="22px" />
                      </DropdownButtonDispo>
                      <DropdownContentDispo show={showDropdownDispo[conseiller.id]}>
                        <DropdownItemDispo onClick={() => openDispoModal(conseiller)}>
                          <DispoIconContainer>
                            <DispoIcon className="bx bx-plus-circle"></DispoIcon>
                          </DispoIconContainer> Ajouter
                        </DropdownItemDispo>
                        <DropdownItemDispo onClick={() => handleVoirClick(conseiller)}>
                          <DispoIconContainer>
                            <DispoIcon className="bx bx-show"></DispoIcon>
                          </DispoIconContainer> Voir
                        </DropdownItemDispo>
                      </DropdownContentDispo>
                    </DropdownContainerDispo>
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

export default Conseillers;

