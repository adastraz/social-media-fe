import React, { useState } from 'react'
import { connect } from 'react-redux'
import { editProfile, fetchUser } from '../../actions'

const About = props => {
    const [editingBio, setEditingBio] = useState(false)
    const [editingEdu, setEditingEdu] = useState(false)
    const [editingLoc, setEditingLoc] = useState(false)
    const [editingNick, setEditingNick] = useState(false)
    const [editingPhone, setEditingPhone] = useState(false)
    const [editingRel, setEditingRel] = useState(false)
    const [editingProf, setEditingProf] = useState(false)
    const [editingCov, setEditingCov] = useState(false)

    // const [editUser, setEditUser] = useState({
    //     bio: '',
    //     birthday: '',
    //     coverimg: '',
    //     education: '',
    //     location: '',
    //     nickname: '',
    //     phone_number: '',
    //     profileimg: '',
    //     relationship: '',
    //     workplace: ''
    // })

    const [editUserBio, setEditUserBio] = useState({
        bio: ''
    })

    const handleChangesBio = e => {
        setEditUserBio({
            ...editUserBio,
            [e.target.name]: e.target.value
        })
    }

    const [editUserEdu, setEditUserEdu] = useState({
        education: ''
    })

    const handleChangesEdu = e => {
        setEditUserEdu({
            ...editUserEdu,
            [e.target.name]: e.target.value
        })
    }

    const allEditingDoneBio = e => {
        e.preventDefault()
        props.editProfile(props.user.id, editUserBio)
        props.fetchUser(props.user.id)
        setEditingBio(false)
        setEditUserBio({ bio: '' })
    }

    const allEditingDoneEdu = e => {
        e.preventDefault()
        props.editProfile(props.user.id, editUserEdu)
        props.fetchUser(props.user.id)
        setEditingEdu(false)
        setEditUserEdu({ education: '' })
    }

    const cancelEditing = () => {
        setEditingBio(false)
        setEditingEdu(false)
    }

    return (
        <>
            <h1>{props.user.username}</h1>
            {props.user.bio == null || props.user.bio == '' && editingBio == false ? 
                <>
                    <p onClick={() => setEditingBio(!editingBio)}>Add a bio</p>
                </> :
                editingBio == true ? 
                <>
                    <input
                        id='bio'
                        type='text'
                        name='bio'
                        value={editUserBio.bio}
                        placeholder={props.user.bio}
                        onChange={handleChangesBio}
                    />
                    <button onClick={allEditingDoneBio}>Done</button>
                    <button onClick={cancelEditing}>Cancel</button>
                </> :
                <>
                    <p>{props.user.bio}</p>
                    <button onClick={() => setEditingBio(!editingBio)}>edit</button>
                </>
            }
            {props.user.education == null || props.user.education == '' && editingEdu == false ? 
                <>
                    <p onClick={() => setEditingEdu(!editingEdu)}>Add a Education</p>
                </> :
                editingEdu == true ? 
                <>
                    <input
                        id='education'
                        type='text'
                        name='education'
                        value={editUserEdu.education}
                        placeholder={props.user.education}
                        onChange={handleChangesEdu}
                    />
                    <button onClick={allEditingDoneEdu}>Done</button>
                    <button onClick={cancelEditing}>Cancel</button>
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

export default connect(mapStateToProps, { editProfile, fetchUser })(About)