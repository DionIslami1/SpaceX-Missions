import React, { useEffect, useState } from 'react'
import './App.scss'
import Comment from './Comment'
import uuid from 'react-uuid'
import { useParams } from "react-router-dom";

function Sidebar() {
    let { urlid } = useParams();
    const [coments, setComents] = useState(JSON.parse(localStorage.coments) || []);
    const [activeComent, setActiveComent] = useState(false);

    useEffect(() => {
        localStorage.setItem("coments", JSON.stringify(coments));
    }, [coments]);

    const onAddComent = () => {
        const newComent = {
            id: uuid(),
            title: 'Write your Username',
            body: "",
            lastModified: Date.now(),
            urlid: urlid,
        }
        setComents([newComent, ...coments]);
    }

    const onDeleteComent = (idToDelete) => {
        setComents(coments.filter((coment) => coment.id !== idToDelete));
    }

    const getActiveComent = () => {
        return coments.find((coment) => coment.id === activeComent);
    }

    const onUpdateComent = (updatedComent) => {
        const updatedComentsArray = coments.map((coment) => {
            if (coment.id === activeComent) {
                return updatedComent;
            }

            return coment;
        })

        setComents(updatedComentsArray);
    }

    return (
        <div className='sidebar'>
            <div className='inner-sidebar'>
                <div className='sidebar-header'>
                    <h3>COMMENTS</h3>
                    <button onClick={onAddComent}>Add</button>
                </div>
                {coments.map((coment) => (
                    coment.urlid === urlid ?
                        <div className={`sidebar-comments ${coment.id === activeComent && "active"}`} onClick={() => setActiveComent(coment.id)}>
                            <div className='sidebar-comments-user'>
                                <strong>{coment.title}</strong>
                                <button onClick={() => onDeleteComent(coment.id)}>Delete</button>
                            </div>
                            <p>{coment.body}</p>
                            <small className='comments-meta'> Last Modified: {new Date(coment.lastModified).toLocaleDateString("en-GB", {
                                hour: '2-digit',
                                minute: "2-digit"
                            })}</small>
                        </div> : ''
                ))}

            </div>
            <Comment activeComent={getActiveComent()} onUpdateComent={onUpdateComent} />
        </div>
    )
}

export default Sidebar