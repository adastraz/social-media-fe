import React, { useState } from 'react'
import { connect } from 'react-redux'

const About = props => {
    const [editingBio, setEditingBio] = useState(false)
    const [editingEdu, setEditingEdu] = useState(false)
    const [editingLoc, setEditingLoc] = useState(false)
    const [editingNick, setEditingNick] = useState(false)
    const [editingPhone, setEditingPhone] = useState(false)
    const [editingRel, setEditingRel] = useState(false)
    const [editingProf, setEditingProf] = useState(false)
    const [editingCov, setEditingCov] = useState(false)

    const [editUser, setEditUser] = useState({
        bio: '',
        birthday: '',
        coverimg: '',
        education: '',
        location: '',
        nickname: '',
        phone_number: '',
        profileimg: '',
        relationship: '',
        workplace: ''
    })

    const handleChanges = e => {
        setEditUser({
            ...editUser,
            [e.target.name]: e.target.value
        })
    }

    return (
        <>
            <h1>{props.user.username}</h1>
            {props.user.bio == null && editingBio == false ? 
                <>
                    <p onClick={() => setEditingBio(!editingBio)}>Add a bio</p>
                </> :
                editingBio == true ? 
                <>
                    <input
                        id='bio'
                        type='text'
                        name='bio'
                        value={editUser.bio}
                        placeholder={props.user.bio}
                        onChange={handleChanges}
                    />
                    <button onClick={() => setEditingBio(!editingBio)}>Done</button>
                </> :
                <>
                    <p>{props.user.bio}</p>
                </>
            }
            {props.user.education == null && editingEdu == false ? 
                <>
                    <p onClick={() => setEditingEdu(!editingEdu)}>Add a Education</p>
                </> :
                editingEdu == true ? 
                <>
                    <input
                        id='education'
                        type='text'
                        name='education'
                        value={editUser.education}
                        placeholder={props.user.education}
                        onChange={handleChanges}
                    />
                    <button onClick={() => setEditingEdu(!editingEdu)}>Done</button>
                </> :
                <>
                    <p>{props.user.education}</p>
                    <button onClick={() => setEditingEdu(!editingEdu)}>edit</button>
                </>
            }
        </>
    )
}

const mapStateToProps = state => {
    return {
        isLoading: state.isLoading,
        error: state.error,
        users: state.users,
        user: state.user,
        following: state.following
    }
}

export default connect(mapStateToProps, { })(About)