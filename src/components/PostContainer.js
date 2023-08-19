import axios from "axios"
import { useEffect, useState } from "react"
import { styled } from "styled-components"
import Likes from "./likes"
import LinkContainer from "./LinkContainer"


export default function PostContainer(props){
    const {posts, post} = props
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
    }, [posts])
    return(
        <>
        {urlInfo.length === 0 ? 
        ''
        :
        <PostContainerr>
            <UserImgContainer>
                <ProfileImg src={post.image}/>
                {/* <Likes postId={post.postId} userId={post.userId}/> */}
            </UserImgContainer>
            <PostInfoContainer>
                <User>{post.userName}</User>
                <Description>{post.description}</Description>
                <LinkContainerr onClick={() => window.open(urlInfo.url, '_blank')}>
                    <LinkInfoContainer>
                        <Title>{urlInfo.title}</Title>
                        <Descriptionn>{urlInfo.description}</Descriptionn>
                        <Url>{urlInfo.url}</Url>
                    </LinkInfoContainer>
                    <UrlImg src={urlInfo.images[0]}/>
                </LinkContainerr>
            </PostInfoContainer>
        </PostContainerr>
        }
        </>   
    )
}

const PostContainerr = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    background-color: black;
    width: 611px;
    border-radius: 12px;
    padding: 15px;
    position: relative;
    margin-bottom: 10px;
    height: 100%;
`
const UserImgContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
`

const ProfileImg = styled.img`
    width: 55px;
    height: 55px;
    border-radius: 30px;
`

const PostInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 540px;
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
const LinkContainerr = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 160px;
    width: 540px;
    //background-color: red;
    
    border-radius: 12px;
    border: 1px solid #495057;
    border-right: none;
`
const LinkInfoContainer = styled.div`
    box-sizing: border-box;
    padding: 15px;
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    height: 100%;
    width: 65%;
`
const UrlImg = styled.img`
    height: 101%;
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
    width: 35%;
`
const Title = styled.p`
    font-size: 22px;
    margin: 6px 0px 12px 0px;
    font-family: 'Lato',sans-serif;
    font-weight: 600;
    color: #ced4da;
    line-height: 25px;
    margin: 0;
`

const Descriptionn = styled.p`
    font-size: 14px;
    margin: 6px 0px 12px 0px;
    font-family: 'Lato',sans-serif;
    font-weight: 400;
    color: #6c757d;
    line-height: 18px;
    margin: 0;
`

const Url = styled.p`
    font-size: 12px;
    margin: 6px 0px 12px 0px;
    font-family: 'Lato',sans-serif;
    font-weight: 400;
    color: #ced4da;
    margin: 0;
`
