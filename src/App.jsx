import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'
import Course from './components/Course'
import noteService from './services/notes'
import './index.css'

const Notification = ({message}) => {
    if(message == null){
        return null
    }
    return (
        <div className = 'error'>
            {message}
        </div>
    )
}

const Footer = () => {
    const footerStyle = {
        color: 'green',
        fontStyle: 'italic',
        fontSize: 30
    }
    return (
        <div style = {footerStyle} >
            <br />
            <em>Note app, Department of Computer Science, University of Helsinki 2023</em>
        </div>
    )
}

const App = () => {

      const [notes, setNotes] = useState([])
      const [newNote, setNewNote] = useState('')
      const [showAll, setShowAll] = useState(true)
      const [errorMessage, setErrorMessage] = useState('currently no error')

      const addNote = (event) => {
        event.preventDefault()
        const noteObject = {
            content: newNote,
            important: Math.random() < 0.5,
        }
        noteService.create(noteObject)
            .then(returnedNote => {
                setNotes(notes.concat(returnedNote))
                setNewNote('')
            })
      }

      const handleNoteChange = (event) => {
        setNewNote(event.target.value)
      }

      const notesToShow = showAll ? notes : notes.filter(note => note.important)

      useEffect(() => {
            noteService.getAll()
            .then(initialNotes => {
                console.log('promise fulfilled')
                setNotes(initialNotes)
            })
      },[])

      const toggleImportanceOf = id => {
            console.log(`importance of ${id} needs to be toggled`)
            const  searchedNote = notes.find(note => note.id == id)
            const changedNote = {
                ...searchedNote,
                important: !searchedNote.important,
            }
            noteService.update(changedNote)
            .then(returnedNote => {
                setNotes(notes.map(note => note.id!=id ? note : returnedNote))
            })
            .catch((error) =>  {
                setErrorMessage(
                    `Note ${changedNote.content} already deleted from server`
                )
                setTimeout(() => {
                    setErrorMessage(null)
                },5000)
                setNotes(notes.filter(note => note.id!=id))
            })
      }

      if(!notes){
        return null
      }

      return (
        <div>
            <h1 className = 'noteHeading' >Notes</h1>
            <Notification message = {errorMessage} />
            <ul>
                {notesToShow.map(noteToShow => <Note key = {noteToShow.id} note = {noteToShow} toggleImportance = {() => toggleImportanceOf(noteToShow.id)} />)}
            </ul>
            <div>
                <button onClick = {() => {setShowAll(!showAll)}}>
                    show {showAll ? 'important' : 'all'}
                </button>
            </div>
            <form onSubmit = {addNote} >
                <input value = {newNote} onChange = {handleNoteChange} />
                <button type = "submit">save</button>
            </form>
            <Footer />
        </div>
      )
}

export default App


