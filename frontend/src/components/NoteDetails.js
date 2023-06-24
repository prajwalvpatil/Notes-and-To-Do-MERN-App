import {useNotesContext} from '../hooks/useNotesContext'
// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useAuthContext} from '../hooks/useAuthContext'

const NoteDetails = ({ note }) => {
    const {dispatch} = useNotesContext()
    const {user} = useAuthContext()

    const handleClick = async () => {

        if(!user){
            return
        }
        
        const response = await fetch('/api/notes/' + note._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_NOTE', payload: json})
        }
    } 

    if (!note) {
        return <div>Loading...</div>; // or any other appropriate loading state
      }
    return ( 
        <div className="todo-details">
            <h2>{note.title}</h2>
            {note.description && <p><strong>Details: </strong>{note.description}</p>}            
            <p>{formatDistanceToNow(new Date(note.createdAt), { addSuffix: true })}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
     );
}
 
export default NoteDetails;