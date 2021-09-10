import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import axios from 'axios';
import Post from './Post';

const Posts = () => {
    const {userId} = useSelector(state => state)
    const [data, setData] = useState([]);
    useEffect(() => {
        try{
            const postList = async() => {
                const list = await axios.get('http://localhost:5000');
                setData(list.data)
            }
            postList();
        }catch(err){
            console.log(err)
        }
    }, [userId])
    return (
        <div className="row center">
            {data.map((singleData)=>(
                <Post data={singleData} key={singleData._id}/>
            ))}
        </div>
    )
}

export default Posts;
