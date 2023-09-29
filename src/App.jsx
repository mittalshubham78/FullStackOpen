import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'
import Course from './components/Course'
import noteService from './services/notes'
import './index.css'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
//import './App.css'


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

const Display = ({counter}) => {
    return (
        <div>
            counter is {counter}
        </div>
    )
}

const Button = ({handleClick, text}) => {
    return (
        <button onClick = {handleClick}>{text}</button>
    )
}



const Hello = ({name, age}) => {
     // const {name, age} = props                                 // destructuring
    const bornYear = () => new Date().getFullYear() - age

    return (
        <div>
            <p>Hello from {name} age {age} born in {bornYear()}</p>
        </div>
    )
}



 const Statistics = ({good,neutral,bad}) => {
    if(good + neutral + bad!=0){
        return (
            <div>
                <h1>statistics</h1>
                <p>good = {good}</p>
                <p>neutral = {neutral}</p>
                <p>bad = {bad}</p>
                <p>all = {good + neutral + bad}</p>
                <p>positive = {(good / (good  + neutral + bad)) * 100} %</p>
            </div>
        )
    }

    return (
        <div>
            <h1>statistics</h1>
            <p>no feedback given</p>
        </div>
    )
 }

  const MaxVotedAnecdote = ({array1, array2, length}) => {
    let mostVotedanecdote = " ";
    let mostVotes = 0;
    for(let i = 0; i < length; i++) {
        if(mostVotes < array1[i]) {
            mostVotes = array1[i]
            mostVotedanecdote = array2[i]
        }
    }

    return (
        <div>
            <p>{mostVotedanecdote}</p>
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
      const [counter, setCounter] = useState(0)
      const [clicks, setClicks] = useState({
      left: 0,
      right: 0
      })

      const [good,setGood] = useState(0)
      const [neutral,setNeutral] = useState(0)
      const [bad,setBad] = useState(0)
      const [selected, setSelected] = useState(0)
      const [newNote, setNewNote] = useState('')
      const [showAll, setShowAll] = useState(true)

      const handleLeftClick = () => setClicks({...clicks,left: clicks.left + 1})
      const handleRightClick = () => setClicks({...clicks,right: clicks.right + 1})

      const [errorMessage, setErrorMessage] = useState('some error happened')


      const increaseByOne = () => setCounter(counter + 1)
      const reset = () => setCounter(0)
      const decreaseByOne = () => (counter - 1 < 0) ? counter : setCounter(counter -1)

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
//            console.log('note value', event.target.value)
            setNewNote(event.target.value)
      }

      const notesToShow = showAll ? notes : notes.filter(note => note.important)

      useEffect(() => {
            console.log('effect')
            noteService.getAll()
            .then(initialNotes => {
                console.log('promise fulfilled')
                setNotes(initialNotes)
            })
      },[])

      const toggleImportanceOf = id => {
            console.log(`importance of ${id} needs to be toggled`)
            const url = `http://localhost:3001/notes/${id}`
            const  searchedNote = notes.find(note => note.id == id)
            const changedNote = {
                ...searchedNote,
                important: !searchedNote.important,
            }
            noteService.update(id, changedNote)
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

//      console.log('render', notes.length, 'notes')
//        const anecdotes = [
//           'If it hurts, do it more often.',
//           'Adding manpower to a late software project makes it later!',
//           'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//           'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//           'Premature optimization is the root of all evil.',
//           'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
//           'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
//           'The only way to go fast, is to go well.'
//        ]
//
//        const [voteArr, setVoteArr] = useState(Array(anecdotes.length).fill(0))
//
//
//       const course = [
//       {
//             id: 1,
//             courseName: 'Half stack Application Development',
//             parts: [
//             {
//                 partName: 'Fundamentals of React',
//                 exercises: 10,
//                 id: 1
//             },
//             {
//                 partName:  'Using props to pass data',
//                 exercises: 7,
//                 id: 2
//             },
//             {
//                 partName:  'State of a component',
//                 exercises: 14,
//                 id: 3
//             },
//             {
//                 partName:   'Redux',
//                 exercises: 11,
//                 id: 4
//             }
//             ]
//       },
//       {
//             id: 2,
//             courseName: 'Node.js',
//             parts: [
//               {
//                 partName: 'Routing',
//                 exercises: 3,
//                 id: 1
//               },
//               {
//                 partName: 'Middlewares',
//                 exercises: 7,
//                 id: 2
//               }
//             ]
//       }
//       ]
//       const props = [
//             {
//                 name : 'Shubham Mittal',
//                 age  : '24'
//             },
//             {
//                 name : "Tarun Verma",
//                 age  : '25'
//             },
//             {
//                 name :   "Shreyansh Sinha",
//                 age  :   '25'
//             },
//       ]
//
//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
//     console.log('Hello world is here')

//     return (
//     <div>
//         <h1>Web Development Curriculum</h1>
//         <Course course = {course} />
//     </div>
//     )

//     return (
//     <div>
//         <Display counter = {counter} />
//         <Button handleClick = {increaseByOne} text = 'plus' />
//         <Button handleClick = {reset} text = 'zero'/>
//         <Button handleClick = {decreaseByOne} text = 'minus' />
//         <div>
//         {clicks.left}
//         <button onClick = {handleLeftClick}>
//         left
//         </button>
//         <button onClick = {handleRightClick}>
//         right
//         </button>
//         {clicks.right}
//         </div>
//     </div>
//     )

//        return (
//             <div>
//             <h1>give feedback</h1>
//             <div>
//                 <button onClick = {() => {setGood(good+1)}}> good </button>
//                 <button onClick = {() => {setNeutral(neutral+1)}}> neutral </button>
//                 <button onClick = {() => {setBad(bad + 1)}}> bad </button>
//                 <Statistics good = {good} neutral = {neutral} bad = {bad} />
//
//                 <h1>Anecdote of day</h1>
//                 <p>{anecdotes[selected]}</p>
//                 <button onClick = {() => {
//                      const newVotesDict = {...voteArr};
//                      newVotesDict[selected] += 1;
//                      setVoteArr(newVotesDict);
//                 }}>vote</button>
//                 <button onClick = {() => {setSelected((selected + 1) % anecdotes.length)}}>nextAnecdote</button>
//                 <h1>Anecdote with most vote</h1>
//                 <MaxVotedAnecdote array1 = {voteArr} array2 = {anecdotes} length = {anecdotes.length}/>
//             </div>
//             <div>
//                 <h1>Notes</h1>
//                 <ul>
//                     {notes.map(note => <Note key = {note.id} note = {note} />)}
//                 </ul>
//             </div>
//             </div>
//        )
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
                    <br />
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


