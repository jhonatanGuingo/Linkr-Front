import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { FiSend } from "react-icons/fi"
import axios from "axios";


export default function CommentContainer(props) {

    const [text, setText] = useState('');
    const [data, setData] = useState([]);
    const [image , setImage] = useState('');


    useEffect(()=>{
        getCom(props.postid);
        const hold = localStorage.getItem('image');
        setImage(hold);
    },[])

    function getCom(postid){
        const promisse = axios.get(`${process.env.REACT_APP_API_URL}${postid}`)
        .then((res)=>{
            console.log(res.data)
            setData(res.data)
        })
        .catch((res)=>{
            alert(res);
        })
    }

    function handleSubmit(){
        const promisse = axios.post(`${process.env.REACT_APP_API_URL}${props.postid}/${props.userid}`,{text})
        .then((res) => {
            getCom(props.postid);
            setText('');
        })
        .catch((res)=>{
            console.log(res);
        })

    }

    return (<>
    {data && data.map((comment) => (
        <Comment key={comment.id}>
            <ProfileImg src={comment.image} />
            <TextCont>
                <h2>{comment.name}</h2>
                <p>{comment.comment}</p>
            </TextCont>
        </Comment>
    ))}
        {/* Postar comentário */}
        <Comment>
            <ProfileImg src={image} />
            <WriteComment>
                <TextInput placeholder='write a comment' value={text} onChange={(e) => setText(e.target.value)} />
                <Send onClick={handleSubmit}><FiSend /></Send>
            </WriteComment>
        </Comment>
    </>
    )
}

const Comment = styled.div`
    background-color: #1E1E1E;
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    border-bottom: 2px solid #353535;
    padding: 5px;
`;

const ProfileImg = styled.img`
    width: 39px;
    height: 39px;
    border-radius: 30px;
    margin-right: 20px;
`;

const TextCont = styled.div`
    width: 70%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 14px;
    h2{
        font-family: 'Lato', sans-serif;
        font-weight: 700;
        letter-spacing: 0em;
        color: white;
    };

    p{
        font-family: 'Lato', sans-serif; 
        font-weight: 400;
        letter-spacing: 0em;
        color: white;
    }
`;

const TextInput = styled.input`
    width: 90%;
    height: 100%;
    background-color: transparent;
    border: none;
    color: white;
    padding-left: 2%;
`;

const WriteComment = styled.div`
    width: 87%;
    height: 39px;
    background-color: #252525;
    display: flex;
    border-radius: 12px;
    outline: 0px solid rgba(0, 0, 0, 0);
    box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
    transition: box-shadow 0.3s ease;
    &:focus-within {
        box-shadow: 0px 0px 5px rgba(255, 255, 255, 1);
    }
`

const Send = styled.button`
    width: 8%;
    background-color: transparent;
    height: 100%;
    border: none;
    color: white;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    :hover{
        cursor: pointer;
    }
`