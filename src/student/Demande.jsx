import React, { useState, useEffect } from 'react';

const Demande = () => {
    const [title, setTitle] = useState('');
    const [conseiller, setConseiller] = useState('');
    const [etudiant, setEtudiant] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [conseillers, setConseillers] = useState([]);

    useEffect(() => {
        // Fetch Conseillers from the backend
        const fetchConseillers = async () => {
            const response = await fetch('http://localhost:8000/api/conseillers/');
            const data = await response.json();
            setConseillers(data);
        };

        fetchConseillers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/api/demandes/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: title,
                    conseiller: conseiller,
                    etudiant: sessionStorage.getItem('etudiantId'), // Get etudiant ID from session storage
                    description: description,
                }),
            });
    
            if (response.ok) {
                // Handle success
            } else {
                // Handle error
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An unexpected error occurred');
        }
    };

    return (
        <div>
            <h2>Demande</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label>Conseiller:</label>
                    <select value={conseiller} onChange={(e) => setConseiller(e.target.value)}>
                        <option value="">Select Conseiller</option>
                        {conseillers.map((conseiller) => (
                            <option key={conseiller.id} value={conseiller.id}>
                                {conseiller.Nom} {conseiller.Prenom}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Etudiant:</label>
                    <p>{sessionStorage.getItem('username')}</p> {/* Display the authenticated student's username */}
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <button type="submit">Demander</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};

export default Demande;
