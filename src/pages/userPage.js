import { styled } from "styled-components"
import Header from "../components/Header"
import PostContainer from "../components/PostContainer"
import { useEffect, useState } from "react"
import SideBarHashtags from "../components/sideBarHashtag";
import axios from "axios";
import { useParams } from "react-router-dom";


export default function UserPage() {

    const [posts, setPosts] = useState([]);
    const [user , setUser ] = useState([])
    const userId = useParams('id');

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}userposts/${userId.id}`)
        .then((res)=>{
            setPosts(res.data);
            setUser({name:res.data[0].userName,image:res.data[0].image});
        })
        .catch((err)=>{
            console.log(err);
        })
     }, [])


    return (
        <Page>
            <Header />
            <TimelineContainer>
            <UserContainer><ProfileImg src={user.image} /> <h2>{user.name}'s posts</h2></UserContainer>
                
                {posts.map((post,index) => (
                    <PostContainer key={index} post={post} />)
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

const ProfileImg = styled.img`
    width: 55px;
    height: 55px;
    border-radius: 30px;
    margin-right: 10px;
`

const UserContainer = styled.div`
    display: flex;
    align-items: center;
    height: 55px;
    justify-content: start;
    margin-bottom: 60px;
   h2{
        font-family: 'Oswald';;
        font-weight: 700;
        font-size: 43px;
        color: white;
   }
`