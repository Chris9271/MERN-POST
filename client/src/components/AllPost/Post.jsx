import React, {useState} from 'react';
import Modal from 'react-modal';
import {useSelector} from 'react-redux';
import Map from '../Map/Map';
import EditPost from './EditPost';
import './Post.css';
import axios from 'axios';


const Posts = (props) => {
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)'
        },
    }
    const customStyles1 = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            height: '90%'
        },
    }
    Modal.setAppElement('#modal-root');

    const {isLogin} = useSelector(state => state)
    const [modalOpen, setModalOpen] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [picOpen, setPicOpen] = useState(false)
    const [postVal, setPostVal] = useState({
        id: props.data._id,
        title: props.data.title,
        location: props.data.location,
        imageUrl: props.data.imageUrl,
        description: props.data.description
    })

    const handleModalOpen = () => setModalOpen(true)
    const handleModalClose = () => setModalOpen(false)
    const handleDeletePost = async(id) => {
        try{
            const updatePosts = await axios.delete('http://localhost:5000', {data: {id}})
            console.log(updatePosts)
        }catch(err){
            console.log(err)
        }
    }
    const handleEditModalOpen = () => setEditModal(true);
    const handleEditModalClose = () => setEditModal(false);
    const handlePicModalOpen = () => setPicOpen(true)
    const handlePicModalClose = () => setPicOpen(false)
    return (
        <>
        <Modal
            isOpen={modalOpen}
            onRequestClose={handleModalClose}
            style={customStyles}
        >
            <Map coords={props.data.coords}/>
            <div className="modal-body">
                {props.data.location}
            </div>
            <div className="modal-footer">
                <button className="close-btn" onClick={handleModalClose}>Close</button>
            </div>
        </Modal>
        <Modal
            isOpen={editModal}
            onRequestClose={handleEditModalClose}
            style={customStyles}
        >
            <EditPost data={postVal} close={handleEditModalClose}/>
             {/* 不可動態更改props值, 須先存為state */}
        </Modal>
        <Modal
            isOpen={picOpen}
            onRequestClose={handlePicModalClose}
            style={customStyles1}
        >
            <img src={postVal.imageUrl} alt={postVal.title}/>
        </Modal>
        <div className="outside-wrapper">
            <div className="col s6 offset-s3">
                <div className="card">
                    <div className="card-image" onClick={handlePicModalOpen}>
                        <img src={props.data.imageUrl} alt={props.data.title}/>
                        <span className="card-title">{props.data.title}</span>
                    </div>
                    <div className="card-content">
                        <p>{props.data.description}</p>
                    </div>
                    <div className="card-action">
                        <div className="card-options">
                            <i className="material-icons" onClick={handleModalOpen}>location_on</i>
                            <span className="card-address" onClick={handleModalOpen}>{props.data.location}</span>
                        </div>
                        {isLogin ? 
                        <div className="card-options">
                            <i className="material-icons" onClick={handleEditModalOpen}>edit</i>
                            <i className="material-icons" onClick={() => handleDeletePost(props.data._id)}>delete</i>
                        </div>
                        : null}
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Posts;
