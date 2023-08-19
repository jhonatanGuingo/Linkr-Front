import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import SideBarHashtags from "../components/sideBarHashtag";
import { styled } from "styled-components";
import PublishContainer from "../components/PublishContainer";
import PostContainer from "../components/PostContainer";
import axios from "axios";

export default function TimelinePage() {
    const token = localStorage.getItem("token");
    const image = localStorage.getItem("image");
    const navigate = useNavigate();

    const [posts, setPosts] = useState([])
    const [postPosted, setPostPosted] = useState(false)
    const [link, setLink] = useState('')
    const [description, setDescription] = useState('')
    

    useEffect(() => {
        if (!token) {
            alert("É necessário estar logado para prosseguir");
            navigate("/");
            return;
        }
        const url = `${process.env.REACT_APP_API_URL}posts/1`
        axios.get(url)
            .then(resp => {
                console.log(resp.data)
                setPosts(resp.data)
                
            })
            .catch(err => {
                console.log(err)
            })
            
            
    }, [postPosted])
    

      
    
    return (
        <TimelinePageContainer>
            <Header/>
            { posts.length === 0 ? 
            <TimelineContainer>
                <Mensagem>Ainda não tem posts</Mensagem>
            </TimelineContainer>
            :
            
            <TimelineContainer>  

                <h1>timeline</h1>
                 
                <PublishContainer 
                    link={link} 
                    setLink={setLink} 
                    description={description} 
                    setDescription={setDescription}
                    postPosted={postPosted} 
                    setPostPosted={setPostPosted}
                />
                
                {posts.map(post => (
                <PostContainer post={post}/>)
                )}
                
                
            </TimelineContainer>
            
            }
            <SideBarHashtags/> 
        </TimelinePageContainer>)
}
const TimelinePageContainer = styled.div`
    //background-color: red;
    display: flex;
    justify-content: center;
    align-items: flex-start;
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
const Mensagem = styled.p`
    font-family: 'Oswald';
    margin-top: 260px;
    font-size: 30px;
    text-align: center;
    color: white;
`

