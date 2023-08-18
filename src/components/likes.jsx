import React, { useEffect, useState } from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { styled } from 'styled-components';

export default function Likes(props) {

    const [liked, setLiked] = useState(false);
    const [ballon, setBallon] = useState(false);
    const [data, setData] = useState([])

    function handleClick(bool) {
        setLiked(bool);
    }

    useEffect(() => {
        //aqui vai ficar o axios pra pegar setar o numero de pessoas
        setData({ count: 5, names: ['igor', 'walter'], clicked: true });
        setLiked(true);
        setBallon(true)
    }, [])

    return (
        <Container>
        <HeartIconWrapper onMouseEnter={() => setBallon(true)} onMouseLeave={() => setBallon(false)} >
            {liked ? (
                <AiFillHeart style={{ color: 'red' }} onClick={() => handleClick(false)} />
            ) : (
                <AiOutlineHeart onClick={() => handleClick(true)} />
            )}
            {ballon && (
                <Ballon>
                   {data && <p>{data.names[0]},{data.names[1]} e outras {data.count - 2 } pessoas</p>}
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

    }
`;
