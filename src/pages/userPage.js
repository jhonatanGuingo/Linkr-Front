import { styled } from "styled-components"
import Header from "../components/Header"
import PostContainer from "../components/PostContainer"
import { useEffect, useState } from "react"
import SideBarHashtags from "../components/sideBarHashtag";


export default function UserPage() {

    const [posts, setPosts] = useState([]);
    const [user , setUser ] = useState([])

    useEffect(() => { setPosts(['post']) }, [])


    return (
        <Page>
            <Header />
            <TimelineContainer>
                <h1>{user && user.name}</h1>
                {posts.map(post => (
                    <PostContainer post={post} />)
                )}
            </TimelineContainer>
            <SideBarHashtags />
        </Page>
    )
}


const Page = styled.div`
    width:100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    margin-top: 55px;
`

const TimelineContainer = styled.div`
    //background-color: pink;
    padding: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 920px;
    margin-top: 72px;
    h1{
        font-family: 'Oswald';
        //background-color: blue;
        width: 100%;
        font-weight: 700;
        font-size: 43px;
        color: white;
        margin: 60px 0px 45px 0px;
    }
`


const UserIcon = styled.img`
    border-radius: 1000px;
    height: 50px;
`