import React from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux'; 
import axios from 'axios';

const DeletePost = ({close, data}) => {
    const dispatch = useDispatch();
    let history = useHistory();
    const handleDeletePost = async(id) => {
        try{
            const updatePosts = await axios.delete('http://localhost:5000', {data: {id}})
            dispatch({type: "DELETE", payload: id})
            console.log(updatePosts)
            close();
            history.push('/')
        }catch(err){
            console.log(err)
        }
    }
    return (
        <div className="modal-content">
            <div className="modal-header delete-modal-header">
                <h5 className="modal-title">Still want to delete?</h5>
            </div>
            <div className="modal-body">
                <h6>Please choose a button below.</h6>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={close}>Cancel</button>
                <button type="button" className="btn btn-primary" onClick={()=>handleDeletePost(data.id)}>Delete</button>
            </div>
        </div>   
    )
}

export default DeletePost;
