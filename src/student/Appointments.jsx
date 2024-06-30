import React, { useState, useEffect } from 'react';
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

const TableContainer = styled.div`
  width: calc(100vw - ${props => (props.collapsed ? '60px' : '200px')});
  margin-left: ${props => (props.collapsed ? '60px' : '200px')};
  padding: 20px;
  margin-top: 40px;
  overflow-x: auto;
 
`;
const DataTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  color: black;
  padding: 10px;
  border-bottom: 1px solid #eee; /* Ajoute uniquement une bordure horizontale en bas */
  border-left: none; /* Supprime la bordure gauche */
  border-right: none; /* Supprime la bordure droite */

`;

const TableCell = styled.td`
  border-top: 1px solid #eee; /* Ajoute uniquement une bordure horizontale en haut */
  border-bottom: 1px solid #eee; /* Ajoute uniquement une bordure horizontale en bas */
  padding: 7px;
  transition: background-color 0.3s;

  &:first-child {
    border-left: 1px solid #eee; /* Ajoute une bordure gauche à la première cellule */
  }
  &:last-child {
    border-right: 1px solid #eee; /* Ajoute une bordure droite à la dernière cellule */
  }
`;

const zoomAnimation = keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(0.99);
  }
`;

const TableRow = styled.tr`
  &:hover {
    background-color: #fbf6f3;
    animation: ${zoomAnimation} 0.3s ease forwards; /* Applique l'animation de zoom au survol */
  }
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  margin-right: 10px;
`;

const HiddenTableHeader = styled.th`
  background-color: var(--shade1); /* Même couleur que les autres en-têtes pour la cohérence */
  padding: 10px;
  visibility: hidden; /* Masque visuellement la cellule */
`;

const SearchBarStudent = styled.input`
  width: 200px;
  padding: 5px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  float: right;
//   box-shadow: 0 1px 2px var(--primary-color);
  transition: all 0.3s ease;
  &:focus {
    border-color: var(--primary-color);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    outline: none;
  }

  @media (max-width: 800px) {
    width: 150px; /* Decrease width for smaller screens */
    margin-bottom: 5px; /* Adjust margin-bottom for smaller screens */
  }

  @media (max-width: 500px) {
    width: 100px; /* Decrease width for smaller screens */
    padding: 2px;

  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`;

const StudentButton = styled.button`
  padding: 5px 13px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: var(--shade10);
  cursor: pointer;
  transition: background-color 0.3s;
  border: none;
  transition: transform 0.3s ease; 


  &:hover {
    background-color: var(--shade8);
    transform: scale(1.1); 

  }
  @media (max-width: 800px) {
    padding: 3px 10px; /* Adjust padding for smaller screens */
  }

  @media (max-width: 500px) {
    padding: 5px 10px; /* Adjust padding for smaller screens */
    width: 70px;
    font-size: 13px;

  }
`;

const ExportButton = styled(StudentButton)`
  background-color: var(--pshade1);
  color: white;


  &:hover {
    background-color: var(--pshade2); 
  }
`;

const ImportButton = styled(StudentButton)`
  background-color: var(--shade1);
  color: white;

  &:hover {
    background-color: var(--shade2); /* Assurez-vous d'avoir une nuance plus foncée de la couleur secondaire */
  }
`;


const HeaderContainer = styled.div`
  padding-bottom: 30px;
  margin-right: 70%;

  @media (max-width: 800px) {
    margin-right: 70%; 
  }
  @media (max-width: 1200px) {
    margin-right: 70%; 
  }

  @media (max-width: 550px) {
    margin-right: 60%;
  }
`;

const Title = styled.h2`
  font-size: 30px;
  color: BLACK;
  margin-bottom: 10px;
  margin-right: 207px;

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
  margin-right: 40px;


  @media (max-width: 1200px) {
    font-size: 16px; 
    margin-right: 10px; 
  }

  
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

  

  span {
    color: var(--pshade2);
    font-weight: bold;
  }
`;

const BreadcrumbSeparator = styled.span`
  margin: 0 10px;
  color: var(--pshade5);
`;


const ActionStudentButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  &:hover {
    opacity: 0.7;
  }
`;

const StudentActionIcon = styled.img`
  width: 20px; /* Ajustez la taille selon vos besoins */
  height: 20px; /* Ajustez la taille selon vos besoins */
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

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PageNumber = styled.button`
  border: none;
  background-color: ${({ active }) => (active ? '#b2744c' : '#fff')};
  color: ${({ active }) => (active ? '#fff' : '#000')};
  cursor: pointer;
  margin: 0 10px;
  padding: 1px 10px;
  border-radius: 50%;

  &:hover {
    background-color: #f5c5a5;
    color: #000;
  }

`;

const customModalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '380px', // Ajustez la largeur au besoin
    height: '380px',

  },
};

const CloseButtonStudent = styled.button`
  position: absolute;
  top: 0px;
  right: 10px;
  border: none;
  background: none;
  cursor: pointer;
`;

const TextAreaFieldStudent = styled.textarea`
  width: 100%;
  height: 100px; /* Ajustez la hauteur au besoin */
  border: 1px solid var(--pshade12); /* Utilisez la couleur bleue pour la bordure */
  border-radius: 5px;
  margin-bottom: 10px; /* Ajoutez de l'espace entre les champs */
  padding: 10px; /* Ajoutez du remplissage à l'intérieur du textarea */
  font-size: 16px;
  outline: none;
  resize: vertical; /* Autorise le redimensionnement vertical */
  
  @media (max-width: 600px) {
    height: 80px; /* Ajustez la hauteur pour les petits écrans */
    font-size: 14px; /* Ajustez la taille de la police pour les petits écrans */
  }
`;

const SelectFieldStudent = styled.select`
  width: 100%;
  height: 40px;
  border: 1px solid var(--pshade12); /* Utilisez la couleur bleue pour la bordure */
  border-radius: 5px;
  margin-bottom: 10px; /* Ajoutez de l'espace entre les champs */
  padding: 0 10px;
  font-size: 16px;
  outline: none;
  background-color: #f9f9f9; /* Couleur de fond claire */
  color: #333; /* Couleur du texte */
  
  @media (max-width: 600px) {
    height: 30px; /* Ajustez la hauteur pour les petits écrans */
    font-size: 14px; /* Ajustez la taille de la police pour les petits écrans */
  }
`;

const FormTitle = styled.h2`
  margin-top: 20px;
  text-align: center;
  color: var(--primary-color); /* Utilisez la couleur bleue pour le titre */
  
  @media (max-width: 600px) {
    font-size: 20px; /* Ajustez la taille du titre pour les petits écrans */
  }
`;


const Appointments = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [demandes, setDemandes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(4);
    const [conseillers, setConseillers] = useState([]);
    const navigate = useNavigate();
    const [selectedDemande, setSelectedDemande] = useState(null);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  
    const etudiantId = localStorage.getItem('etudiantId');
  
    useEffect(() => {
      const fetchConseillers = async () => {
        const response = await fetch('http://localhost:8000/api/conseillers/');
        const data = await response.json();
        setConseillers(data);
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
      if (!etudiantId) {
        navigate('/getin');
        return; 
      }
      const fetchDemandes = async () => {
        const response = await fetch(`http://localhost:8000/api/demandes/?etudiant=${etudiantId}`);
        const data = await response.json();
        const demandesWithNames = await Promise.all(
          data.map(async (demande) => {
            const studentResponse = await fetch(`http://localhost:8000/api/etudiants/${demande.etudiant}/`);
            const studentData = await studentResponse.json();
            const counselorResponse = await fetch(`http://localhost:8000/api/conseillers/${demande.conseiller}/`);
            const counselorData = await counselorResponse.json();
            return { ...demande, etudiantNom: studentData.Prenom, conseillerNom: counselorData.Nom };
          })
        );
        setDemandes(demandesWithNames);
      };
  
      if (etudiantId) {
        fetchDemandes();
      }
    }, [etudiantId]);
  
    const totalPages = Math.ceil(demandes.length / pageSize);
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  
    const handleClickPage = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
  
    const handleSearch = (event) => {
      setSearchQuery(event.target.value);
      setCurrentPage(1);
    };
  
    const filteredData = demandes
      .filter((row) => row.description.toLowerCase().includes(searchQuery.toLowerCase()))
      .slice((currentPage - 1) * pageSize, currentPage * pageSize);
  
    const handleDeleteDemande = (demandeId) => {
      const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer cette demande?");
  
      if (confirmDelete) {
        fetch(`http://localhost:8000/api/demandes/${demandeId}/`, {
          method: 'DELETE',
        })
          .then((response) => {
            if (response.ok) {
              setDemandes((prevDemandes) => prevDemandes.filter((demande) => demande.id !== demandeId));
            } else {
              console.error('Failed to delete demande');
            }
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      }
    };
  
    const handleButtonClick = () => {
      navigate('/mindCare/demander');
    };
  
    const handleOpenUpdateModal = (demande) => {
      setSelectedDemande(demande);
      setIsUpdateModalOpen(true);
    };
  
    const handleUpdateDemande = (e, demandeId) => {
      e.preventDefault();
  
      const updatedDemande = {
        ...selectedDemande,
        description: e.target.description.value,
        conseiller: e.target.conseiller.value
      };
  
      fetch(`http://localhost:8000/api/demandes/${demandeId}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedDemande),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Failed to update demande');
        })
        .then((data) => {
          setDemandes((prevDemandes) =>
            prevDemandes.map((demande) => (demande.id === demandeId ? data : demande))
          );
          setIsUpdateModalOpen(false);
          setSelectedDemande(null);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
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
                <li onClick={() => handleNavigation('/mindCare/chat')}><i className="bx bxs-chat"></i><span>Messagerie</span></li>
                <li onClick={() => handleNavigation('/mindCare/myfeedback')}><i className="bx bxs-comment"></i><span>Mes Feedback</span></li>
                <li  className="activo" onClick={() => handleNavigation('/mindCare/myAppointments')}><i className="bx bxs-folder"></i><span>Mes Consultations</span></li>
                <li onClick={handleLogout}><i className="bx bxs-log-out" style={{color: '#b03d33'}}></i><span>Déconnexion</span></li>
            </ul>
          </Sidebar>
          <TableContainer collapsed={isSidebarCollapsed}>
            <HeaderContainer collapsed={isSidebarCollapsed}>
              <Title>Bonjour !</Title>
              <Breadcrumb>
                Dashboard <BreadcrumbSeparator>|</BreadcrumbSeparator> <span>Consultations</span>
              </Breadcrumb>
            </HeaderContainer>
            <SearchBarStudent
              type="text"
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={handleSearch}
            />
            <ButtonContainer>
              <ExportButton>Exporter</ExportButton>
              <ImportButton onClick={handleButtonClick}>Ajouter</ImportButton>
            </ButtonContainer>
            <DataTable>
              <thead>
                <tr>
                  <HiddenTableHeader></HiddenTableHeader>
                  <TableHeader>Conseiller</TableHeader>
                  <TableHeader>Description</TableHeader>
                  <TableHeader>Actions</TableHeader>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell><Checkbox /></TableCell>
                    <TableCell>{row.conseillerNom}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell>
                      <ActionStudentButton
                        onClick={() => handleDeleteDemande(row.id)}
                        disabled={row.etat !== 'En attente'}
                        style={{
                          backgroundColor: row.etat !== 'En attente' ? 'transparent' : 'initial',
                          cursor: row.etat !== 'En attente' ? 'not-allowed' : 'pointer',
                          pointerEvents: row.etat !== 'En attente' ? 'none' : 'auto'
                        }}
                      >
                        <StudentActionIcon
                          src="/img/remove.png"
                          alt="Remove"
                          style={{
                            opacity: row.etat !== 'En attente' ? 0.5 : 1 // Transparence de l'icône
                          }}
                        />
                      </ActionStudentButton>
                      <ActionStudentButton
                        onClick={() => handleOpenUpdateModal(row)}
                        disabled={row.etat !== 'En attente'}
                        style={{
                          backgroundColor: row.etat !== 'En attente' ? 'transparent' : 'initial',
                          cursor: row.etat !== 'En attente' ? 'not-allowed' : 'pointer',
                          pointerEvents: row.etat !== 'En attente' ? 'none' : 'auto'
                        }}
                      >
                        <StudentActionIcon
                          src="/img/pen.png"
                          alt="Update"
                          style={{
                            opacity: row.etat !== 'En attente' ? 0.5 : 1 // Transparence de l'icône
                          }}
                        />
                      </ActionStudentButton>
                    </TableCell>


                  </TableRow>
                ))}
              </tbody>
            </DataTable>
            <PaginationContainer>
              <PageNumber onClick={() => handleClickPage(currentPage - 1)} disabled={currentPage === 1}>
              </PageNumber>
              {pages.map((page) => (
                <PageNumber key={page} onClick={() => handleClickPage(page)} active={currentPage === page}>
                  {page}
                </PageNumber>
              ))}
              <PageNumber onClick={() => handleClickPage(currentPage + 1)} disabled={currentPage === totalPages}>
              </PageNumber>
            </PaginationContainer>
          </TableContainer>
        </Container>
        <Modal
          isOpen={isUpdateModalOpen}
          onRequestClose={() => setIsUpdateModalOpen(false)}
          style={customModalStyles}
          contentLabel="Update Demande Modal"
        >
          <CloseButtonStudent onClick={() => setIsUpdateModalOpen(false)}>
            <img src="/img/x.png" alt="Close" width={'20px'} />
          </CloseButtonStudent>
          {selectedDemande && (
            <form onSubmit={(e) => handleUpdateDemande(e, selectedDemande.id)}>
              <FormTitle>Modifier votre Demande</FormTitle>
              <TextAreaFieldStudent
                name="description"
                value={selectedDemande.description}
                onChange={(e) => setSelectedDemande({ ...selectedDemande, description: e.target.value })}
                placeholder="Entrez votre demande ici..."
              />
              <div style={{ marginBottom: '10px' }}>
                <SelectFieldStudent
                  name="conseiller"
                  value={selectedDemande.conseiller}
                  onChange={(e) => setSelectedDemande({ ...selectedDemande, conseiller: e.target.value })}
                >
                  <option value="">Select a counselor</option>
                  {conseillers.map((conseiller) => (
                    <option key={conseiller.id} value={conseiller.id}>
                      {conseiller.Nom}
                    </option>
                  ))}
                </SelectFieldStudent>
              </div>
              <div>
                <button type="submit">Modifier</button>
              </div>
            </form>
          )}
        </Modal>
      </GlobalStyles>
    );
  };
  
export default Appointments;