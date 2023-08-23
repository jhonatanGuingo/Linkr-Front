import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { styled } from 'styled-components';

export default function Likes(props) {
    /// Preciso receber por props o userid e o Postid
    const [liked, setLiked] = useState(false);
    const [ballon, setBallon] = useState(false);
    const [data, setData] = useState([])

    function handleClick(bool) {
        const config ={
            userid: props.userid,
            postid: props.postid,
            bool: bool
        }
        const promise = axios.post(`${process.env.REACT_APP_API_URL}likes/`,config)
        .then((resa)=>{
            console.log(resa)
            const likestatus = axios.get(`${process.env.REACT_APP_API_URL}likes/${props.postid}/${props.userid}`)
            .then((res) => {
                console.log(res.data)
                setData(res.data.likesNumber);
                setLiked(res.data.likeUsers);
            })
            .catch((res) => {
                console.log(res)
            })
        })
        .catch((res)=>{
            alert(res)
        })
    }

    useEffect(() => {
        const promise = axios.get(`${process.env.REACT_APP_API_URL}likes/${props.postid}/${props.userid}`)
            .then((res) => {
                setData(res.data.likesNumber);
                setLiked(res.data.likeUsers);
            })
            .catch((res) => {
                console.log(res)
            })
    }, [])

    return (
        <Container onMouseEnter={() => setBallon(true)} onMouseLeave={() => setBallon(false)}>
            <HeartIconWrapper >
                {liked ? (
                    <AiFillHeart style={{ color: 'red' }} onClick={() => handleClick(false)} />
                ) : (
                    <AiOutlineHeart style={{ color: 'white' }} onClick={() => handleClick(true)} />
                )}
                {ballon && (
                    <Ballon>
                        {
                            data && (
                                <p> Curtido por: 
                                    {liked
                                        ? data.count > 1 ? 
                                        `Eu e ${data.lastLikes[1].name}` : 'Eu'
                                        : data.count > 2
                                            ? ` ${data.lastLikes[0]}, ${data.lastLikes[1]} e outras ${data.count - 2
                                            } pessoas`
                                            : data.count == 0
                                                ? ` 0 pessoas`
                                                : ` ${data.lastLikes[0].name} ${data.lastLikes[1] ? `e ${data.lastLikes[1].name}` : ''}`}
                                </p>
                            )
                        }
                    </Ballon>
                )}
            </HeartIconWrapper>
            <p>{data.count} likes</p>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    font-size: 20px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 40px;
    border: 1px solid black;
    p{
        font-family: 'Lato', sans-serif;
        font-size: 11px;
        font-weight: 400;
        line-height: 13px;
        letter-spacing: 0em;
        text-align: center;
        color: white;
    }
`;

const HeartIconWrapper = styled.div`
    position: relative;
    cursor: pointer;
`;


const Ballon = styled.div`
    position: absolute;
    top: 70px;
    left: 50%;
    width: 169px;
    transform: translateX(-50%);
    background-color: white;
    color: black;
    border: 1px solid black;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 12px;
    display: flex;
    align-items: center;
    gap: 5px;
    z-index: 1;
    pointer-events: none;
    p{
        font-family: Lato;
        font-size: 11px;
        font-weight: 700;
        line-height: 13px;
        letter-spacing: 0em;
        text-align: left;
        color: black;

    }
`;
