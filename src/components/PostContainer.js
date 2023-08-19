import axios from "axios"
import { useEffect, useState } from "react"
import { styled } from "styled-components"
import LinkContainer from "./LinkContainer"


export default function PostContainer(props){
    const {post} = props
    const [urlInfo, setUrlInfo] = useState('')

    useEffect(() => {
        const url = `https://jsonlink.io/api/extract?url=${post.link}`
        axios.get(url)
            .then(resp => {
                setUrlInfo(resp.data)
                
            })
            .catch(err => {
                console.log(err)
            })

            
    }, [])

    return(
        <>
        {urlInfo.length === 0 ? 
        ''
        :
        <PostContainerr>
            <img src={post.image}/>
            <div>
                <User>{post.userName}</User>
                <Description>{post.description}</Description>
                <LinkContainer urlInfo={urlInfo} setUrlInfo={setUrlInfo}/>
            </div>
        </PostContainerr>
        }
        </>   
    )
}

const PostContainerr = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    background-color: black;
    width: 611px;
    border-radius: 12px;
    padding: 15px;
    position: relative;
    margin-bottom: 10px;
    height: 100%;
    img{
        position: absolute;
        top: 15px;
        left: 15px;
        width: 55px;
        height: 55px;
        border-radius: 30px;
    }
    div{
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        //background-color: red;
        width: 540px;
        position: relative;
    }
`

const User = styled.p`
    font-size: 26px;
    margin: 6px 0px 12px 0px;
    font-family: 'Lato',sans-serif;
    font-weight: 600;
    color: white;
`

const Description = styled.p`
    font-size: 22px;
    margin: 6px 0px 12px 0px;
    font-family: 'Lato',sans-serif;
    font-weight: 400;
    color: #ced4da;
`

