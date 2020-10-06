import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { editProfile, fetchUser } from '../../actions'
import Edit from '../../styles/img/edit.svg'
import Check from '../../styles/img/check.svg'
import Close from '../../styles/img/close.svg'

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
    //     birthdate: '',
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
        <div className='aboutcont'>
            <h1>About</h1>
            {props.user.bio == null && editingBio == false ? 
                <>
                    <p onClick={() => setEditingBio(!editingBio)}>Add a bio</p>
                </> :
                editingBio == true ? 
                <>
                    <label htmlFor='bio'>Bio</label>
                    <input
                        id='bio'
                        type='text'
                        name='bio'
                        value={editUserBio.bio}
                        placeholder={props.user.bio}
                        onChange={handleChangesBio}
                    />
                    <img src={Check} onClick={allEditingDoneBio} />
                    <img src={Close} onClick={cancelEditing} />
                </> :
                <>
                    <p>Bio</p>
                    <p>{props.user.bio}</p>
                    <img src={Edit} onClick={() => setEditingBio(!editingBio)} />
                </>
            }
            {props.user.education == null && editingEdu == false ? 
                <>
                    <p onClick={() => setEditingEdu(!editingEdu)}>Add a Education</p>
                </> :
                editingEdu == true ? 
                <>
                    <label htmlFor='education'>Education</label>
                    <input
                        id='education'
                        type='text'
                        name='education'
                        value={editUserEdu.education}
                        placeholder={props.user.education}
                        onChange={handleChangesEdu}
                    />
                    <img src={Check} onClick={allEditingDoneEdu} />
                    <img src={Close} onClick={cancelEditing} />
                </> :
                <>  
                    <p>Education</p>
                    <p>{props.user.education}</p>
                    <img src={Edit} onClick={() => setEditingEdu(!editingEdu)} />
                </>
            }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        isLoading: state.isLoading,
        error: state.error,
        users: state.users,
        user: state.user,
        following: state.following,
        posts: state.posts
    }
}

export default connect(mapStateToProps, { editProfile, fetchUser })(About)