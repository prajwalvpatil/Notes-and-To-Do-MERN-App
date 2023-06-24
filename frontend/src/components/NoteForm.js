import { useState } from "react";
import {useNotesContext} from '../hooks/useNotesContext'
import { useAuthContext} from '../hooks/useAuthContext'

const NoteForm = () => {
    const {dispatch} = useNotesContext()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
    const {user} = useAuthContext()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!user) {
            setError('You must be logged in')
            return
        }

        const note = {title,description}

        const reponse = await fetch('/api/notes', {
            method: 'POST',
            body: JSON.stringify(note),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await reponse.json()

        if (!reponse.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (reponse.ok) {
            setTitle('')
            setDescription('')
            setError(null)
            setEmptyFields([])
            console.log("New Note added")
            dispatch({type: 'CREATE_NOTE', payload: json})
        }
    }

    return ( 
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a new Note</h3>
            <br />
            <label>Title: </label>
            <input 
            type="text"
            onChange={(e) => setTitle(e.target.value)} 
            value={title}
            className={emptyFields.includes('description') ? 'error': ''}
            />

            <label>Description: </label>
            <input 
            type="text"
            onChange={(e) => setDescription(e.target.value)} 
            value={description}
            className={emptyFields.includes('description') ? 'error': ''}
            />

            <button>Add</button> 
            {error && <div className="error">{error}</div>}
        </form>
    );
}
 
export default NoteForm;