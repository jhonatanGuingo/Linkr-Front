import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AiOutlineHeart, AiFillHeart, AiOutlineComment } from 'react-icons/ai';
import { styled } from 'styled-components';

export default function Likes(props) {
    /// Preciso receber por props o userid e o Postid
    const [liked, setLiked] = useState(false);
    const [ballon, setBallon] = useState(false);
    const [data, setData] = useState([])
    const [comscount, setComscount] = useState('0')

    function handleClick(bool) {
        const config = {
            userid: props.userid,
            postid: props.postid,
            bool: bool
        }
        const promise = axios.post(`${process.env.REACT_APP_API_URL}likes/`, config)
            .then((resa) => {
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
            .catch((res) => {
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
        const coms = axios.get(`${process.env.REACT_APP_API_URL}${props.postid}`)
            .then((res) => {
                setComscount(res.data)
            })
            .catch((res) => {
                alert(res);
            })
    }, [])

    return (
        <Container >
            <HeartIconWrapper onMouseEnter={() => setBallon(true)} onMouseLeave={() => setBallon(false)}>
                <HeartIcon liked={liked}>
                    {liked ? (
                        <AiFillHeart onClick={() => handleClick(false)} data-test="like-btn" />
                    ) : (
                        <AiOutlineHeart onClick={() => handleClick(true)} data-test="like-btn" />
                    )}
                </HeartIcon>
                {ballon && (
                    <Ballon data-test="tooltip">
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
            <p data-test="counter">{data.count} likes</p>
            <HeartIconWrapper onClick={() => props.setShowComments(!props.showComments)} data-test="comment-btn">
                <CommentIcon showComments={props.showComments} />
            </HeartIconWrapper>
            <p data-test="comment-counter" >{comscount.length} comments</p>
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
    margin-top: 20px;
    height: 20px;
    display: flex;
`;


const Ballon = styled.div`
    position: absolute;
    top: 40px;
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

const CommentIcon = styled(AiOutlineComment)`
    color: ${props => props.showComments ? 'black' : 'white'};
    background-color: ${props => props.showComments ? 'white' : 'transparent'};
    border-radius: 30px;
    transition: color 0.6s ease, background-color 0.6s ease, border-radius 0.3s ease;

`;

const HeartIcon = styled.div`
    color: ${props => props.liked ? 'red' : 'white'};
    transition: color 0.6s ease;
`;