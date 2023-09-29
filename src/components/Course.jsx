const Course = ({course}) => {
    const abc = course.map(function(singleCourse){
        return (
            <div>
            <Header courseName = {singleCourse.courseName} />
            <Content parts = {singleCourse.parts} />
            </div>
        )
    })
    return (
    <div>
        {abc}
    </div>
    )
}

const Header = ({courseName}) => {
    return (
        <h2>{courseName}</h2>
    )
}

const Content = ({parts}) => {
    const diffParts = parts.map(function(part) {
        return <p key = {part.id} > {part.partName} = {part.exercises}</p>
    })
    return (
    <div>
        {diffParts}
        <Total parts = {parts} />
    </div>
    )
}

const Part = ({partName, partExercise}) => {
    return (
        <p>{partName} = {partExercise}</p>
    )
}



const Total = ({parts}) => {
    const total = parts.reduce((s, p) => s+=p.exercises,0)

    return (
        <b>total of {total} exercises </b>
    )
}

export default Course