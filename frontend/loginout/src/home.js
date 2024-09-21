import React, {useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function Home() {
    const username = localStorage.getItem('username');
    const navigate = useNavigate();
    const [notes,setNotes] = useState([]);
    const [note,setNote] = useState('');

    useEffect(()=>{
        fetch('http://localhost:8000/api/notes')
            .then(response => response.json())
            .then(data => setNotes(data))
            .catch(error => console.error('Error is ',error));
    },[]);

    const add = () => {
        if(note === ''){ return; }
        const newNote = {note}
        fetch('http://localhost:8000/api/add/',{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body : JSON.stringify(newNote)
        })
        .then(response => response.json())
        .then(data => {
            setNotes([...notes,data]);
            setNote('');
        })
        .catch(error => console.error('error is',error))
    };

    const handleLogout = () => {
        fetch('http://localhost:8000/logout/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        })
        .then(response => response.json())
        .then(data => {
            if (data.hehe) {
                localStorage.removeItem('username');
                navigate('/login');
            }
        });
    }

    return (
        <div>
            <h2>Welcome, {username}</h2>
            <input 
                type="text" 
                placeholder="write your note"
                onChange={(e)=>setNote(e.target.value)}
                value={note}
            />
            <button type="submit" onClick={add}>add</button>
            <h4>your notes:</h4>
            <ul>
                {notes.map(({id,note},index)=>(
                    <div key={id}>
                        <li>{note}</li>
                    </div>
                ))}
            </ul>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Home;
