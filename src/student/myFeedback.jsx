import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import Modal from 'react-modal';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';


const GlobalStyles = styled.div`
  :root {
    --primary-color: #b2744c;
    --secondary-color: #4c8ab2;
    
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


const SubmitFeedbackButton = styled(StudentButton)`
  background-color: var(--pshade2);
  color: white;
  border-radius: 23px;

  &:hover {
    background-color: var(--pshade3); /* Assurez-vous d'avoir une nuance plus foncée de la couleur secondaire */
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
    width: '380px', 
    height: '320px',

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



const MyFeedback = () => {

    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [feedbacks, setFeedbacks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(4); 
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [feedbackContent, setFeedbackContent] = useState('');
    const [valideParEtudiant, setValideParEtudiant] = useState(false); // Declare the state for valideParEtudiant
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedFeedback, setSelectedFeedback] = useState(null);
    const navigate = useNavigate();

    const etudiantId = localStorage.getItem('etudiantId');


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
      const etudiantId = localStorage.getItem('etudiantId');
    
      if (!etudiantId) {
        navigate('/getin');
        return; // Exit useEffect early
      }
    
      const fetchFeedbacks = async () => {
        const response = await fetch(`http://localhost:8000/api/feedbacks/?etudiant=${etudiantId}`);
        const data = await response.json();
        const feedbacksWithNames = await Promise.all(
          data.map(async (feedback) => {
            const studentResponse = await fetch(`http://localhost:8000/api/etudiants/${feedback.etudiant}/`);
            const studentData = await studentResponse.json();
            return { ...feedback, etudiantNom: studentData.Prenom };
          })
        );
        setFeedbacks(feedbacksWithNames);
      };
    
      fetchFeedbacks(); 
    }, []); 
    

    const totalPages = Math.ceil(feedbacks.length / pageSize);
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    const handleClickPage = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
  
    const handleSearch = (event) => {
      setSearchQuery(event.target.value);
      setCurrentPage(1); 
    };


      const filteredData = feedbacks
    .filter((row) => row.contenu.toLowerCase().includes(searchQuery.toLowerCase()))
    .slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const handleOpenModal = () => {
      setIsModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };

    
    const handleSubmit = (e) => {
      e.preventDefault();
  
      if (!feedbackContent) {
        alert("Veuillez saisir le contenu du feedback");
        return;
      }
  
      const formData = {
        etudiant: etudiantId,
        contenu: feedbackContent,
        valide_par_etudiant: valideParEtudiant,
        valide_par_admin: false, // Par défaut, le feedback n'est pas encore validé par l'administrateur
      };
  
      fetch('http://localhost:8000/api/feedbacks/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          setFeedbackContent('');
          setValideParEtudiant(false);
          setIsModalOpen(false);
          fetchFeedbacks();
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    };

    const handleDeleteFeedback = (feedbackId) => {
      const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer ce feedback?");
      
      if (confirmDelete) {
        fetch(`http://localhost:8000/api/feedbacks/${feedbackId}/`, {
          method: 'DELETE',
        })
          .then((response) => {
            if (response.ok) {
              setFeedbacks((prevFeedbacks) => prevFeedbacks.filter(feedback => feedback.id !== feedbackId));
            } else {
              console.error('Failed to delete feedback');
            }
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      }
    };


    const handleOpenUpdateModal = (feedback) => {
      setSelectedFeedback(feedback);
      setIsUpdateModalOpen(true);
    };

    const handleUpdateFeedback = (e, feedbackId) => {
      e.preventDefault();
    
      fetch(`http://localhost:8000/api/feedbacks/${feedbackId}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedFeedback),
      })
        .then((response) => response.json())
        .then((data) => {
          setFeedbacks((prevFeedbacks) =>
            prevFeedbacks.map((feedback) => (feedback.id === feedbackId ? data : feedback))
          );
          setIsUpdateModalOpen(false);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    };
    
    const handleLogout = () => {
      localStorage.clear();
      navigate('/getin');
  };

  const handleNavigation = (url) => {
    navigate(url);
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
                <li className="activo" onClick={() => handleNavigation('/mindCare/myfeedback')}><i className="bx bxs-comment"></i><span>Mes Feedback</span></li>
                <li onClick={() => handleNavigation('/mindCare/myAppointments')}><i className="bx bxs-folder"></i><span>Mes Consultations</span></li>
                <li onClick={handleLogout}><i className="bx bxs-log-out" style={{color: '#b03d33'}}></i><span>Déconnexion</span></li>
            </ul>
            </Sidebar>

            <TableContainer collapsed={isSidebarCollapsed}>
            <HeaderContainer collapsed={isSidebarCollapsed}>
                <Title>Bonjour !</Title>
                <Breadcrumb>
                    Dashboard <BreadcrumbSeparator>|</BreadcrumbSeparator> <span>Feedback</span>
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
                    <ImportButton onClick={handleOpenModal}>Ajouter</ImportButton> {/* Open modal on click */}
                </ButtonContainer>
            <DataTable>
                
                <thead>
                  <tr>
                  <HiddenTableHeader></HiddenTableHeader> 
                  <TableHeader>Date</TableHeader>
                  <TableHeader>Contenu</TableHeader>
                  <TableHeader>Actions</TableHeader>
                </tr>
                </thead>
                <tbody>
                    {filteredData.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell><Checkbox /></TableCell> 
                        <TableCell>{new Date(row.date_ajout_feedback).toLocaleDateString()}</TableCell> 
                        <TableCell>{row.contenu}</TableCell>
                        <TableCell>
                        <ActionStudentButton onClick={() => handleDeleteFeedback(row.id)}>
                          <StudentActionIcon src="/img/remove.png" alt="Remove" />
                        </ActionStudentButton>
                        <ActionStudentButton 
                          onClick={() => handleOpenUpdateModal(row)}
                          disabled={row.valide_par_admin}
                          style={{ opacity: row.valide_par_admin ? 0.5 : 1, pointerEvents: row.valide_par_admin ? 'none' : 'auto' }}
                        >
                          <StudentActionIcon src="/img/pen.png" alt="Update" />
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
              isOpen={isModalOpen}
              onRequestClose={handleCloseModal}
              style={customModalStyles}
              contentLabel="Add Feedback Modal"
            >
              <CloseButtonStudent onClick={handleCloseModal}>
                <img src="/img/x.png" alt="Close" width={'20px'} />
              </CloseButtonStudent>
              <form onSubmit={handleSubmit}>
              <FormTitle>Ajouter un Commentaire</FormTitle>

                <div style={{ marginTop: '30px' }}>
                  <TextAreaFieldStudent
                    type="text"
                    value={feedbackContent}
                    onChange={(e) => setFeedbackContent(e.target.value)}
                    placeholder="Entrez votre feedback ici..."
                  />
                  </div>
                  <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                    <Checkbox
                      checked={valideParEtudiant}
                      onChange={(e) => setValideParEtudiant(e.target.checked)}
                    />
                    <label htmlFor="valideParEtudiant" style={{ marginLeft: '5px' }}>Valider le feedback</label>
                  </div>
                  <div>
                    <SubmitFeedbackButton type="submit">Ajouter</SubmitFeedbackButton>
                  </div>
                </form>

            </Modal>

            <Modal
                isOpen={isUpdateModalOpen}
                onRequestClose={() => setIsUpdateModalOpen(false)}
                style={customModalStyles}
                contentLabel="Update Feedback Modal"
              >
                <CloseButtonStudent onClick={() => setIsUpdateModalOpen(false)}>
                  <img src="/img/x.png" alt="Close" width={'20px'} />
                </CloseButtonStudent>
                {selectedFeedback && (
                  <form onSubmit={(e) => handleUpdateFeedback(e, selectedFeedback.id)}>
                    <FormTitle>Modifier votre Commentaire</FormTitle>

                    <TextAreaFieldStudent style={{ marginTop: '20px' }}
                      value={selectedFeedback.contenu}
                      onChange={(e) => setSelectedFeedback({ ...selectedFeedback, contenu: e.target.value })}
                      placeholder="Entrez votre feedback ici..."
                    />
                    <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                      <Checkbox
                        checked={selectedFeedback.valide_par_etudiant}
                        onChange={(e) => setSelectedFeedback({ ...selectedFeedback, valide_par_etudiant: e.target.checked })}
                      />
                      <label htmlFor="valideParEtudiant" style={{ marginLeft: '5px' }}>Valider le feedback</label>
                    </div>
                    <div>
                      <SubmitFeedbackButton type="submit">Modifier</SubmitFeedbackButton>
                    </div>
                  </form>
                )}
              </Modal>
        </GlobalStyles>
      );
    };
    

export default MyFeedback;
