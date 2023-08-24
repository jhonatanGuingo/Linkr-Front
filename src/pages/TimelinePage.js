import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import SideBarHashtags from "../components/sideBarHashtag";
import { styled } from "styled-components";
import PublishContainer from "../components/PublishContainer";
import PostContainer from "../components/PostContainer";
import axios from "axios";
import Overlay from "../components/Overlay";
import { DeleteContext } from "../context/DeleteContext";
import { EditContext } from "../context/EditContext";
import NewPostsConatiner from "../components/NewPostsContainer";
import dayjs from "dayjs";

export default function TimelinePage() {
    const token = localStorage.getItem("token");
    const image = localStorage.getItem("image");
    const navigate = useNavigate();
    const [postId, setPostId] = useState('');
    const [posts, setPosts] = useState([])
    const [postPosted, setPostPosted] = useState(false)
    const [link, setLink] = useState('')
    const [description, setDescription] = useState('')
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [hashtagsEncontradas, setHashtagsEncontradas] = useState();
    const {deleted, setDeleted, deleteButtonClicked, setDeleteButtonClicked} = useContext(DeleteContext)
    const {edited, setEdited, newPost, setNewPost} = useContext(EditContext)

    const [timestamp, setTimestamp] = useState('')
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        if (!token) {
            alert("É necessário estar logado para prosseguir");
            navigate("/");
            return;
        }
        const url = `${process.env.REACT_APP_API_URL}posts/${page}`
        axios.get(url)
            .then(resp => {
                console.log(resp.data)
                console.log(Date.now())
                setTimestamp(Date.now())
                setPosts(resp.data)
                verificarHashtagsNaPostagem()
            })
            .catch(err => {
                console.log(err)
            })
    }, [postPosted, deleted, edited, refresh])

    function verificarHashtags(texto) {

       
        const regex = /#\w+/g;
        const hashtags = texto.match(regex);
        if (hashtags) {
           
          return hashtags.map(hashtag => ({nameHashtag: hashtag.slice(1),
        postId: postId.id}));
           // Remover o caractere '#'
        }
        return [];
      }

    function verificarHashtagsNaPostagem() {
       
        if(newPost.description != null ){
           
            const texto = newPost.description;
            //const postId = newPost.id;
            const hashtags = verificarHashtags(texto);
            setHashtagsEncontradas(hashtags);
            handleAddHashtags(hashtags);
        }
    
            
            
        }
    

        function handleAddHashtags(hashtags){
            const url = `${process.env.REACT_APP_API_URL}hashtag`
            axios.post(url, hashtags)
            .then(resp => {
                console.log(resp.data)
                setPostId('');
            })
            .catch(err => {
                console.log(err)
            })
          }

      
    
    return (
        <>
        <TimelinePageContainer>
            <Header/>
            { posts.length === 0 ? 
            <TimelineContainer>
                <h1>timeline</h1>
                 
                 <PublishContainer 
                     link={link} 
                     setLink={setLink} 
                     description={description} 
                     setDescription={setDescription}
                     postPosted={postPosted} 
                     setPostPosted={setPostPosted}
                     setNewPost = {setNewPost}
                     setPostId = {setPostId}
                 />
                <Mensagem data-test = "message">There are no posts yet</Mensagem>
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
                    setNewPost = {setNewPost}
                    setPostId = {setPostId}
                />

                <NewPostsConatiner timestamp={timestamp} setTimestamp={setTimestamp} refresh={refresh} setRefresh={setRefresh} /> 
                
                {posts.map(post => (
                <PostContainer key= {post.postId} post={post} posts={posts}/>)
                )}
                <SideBarHashtags newPost = {newPost} postPosted = {postPosted} deleted =  {deleted} edited = {edited} /> 
                
                
            </TimelineContainer >
            
            }
        </TimelinePageContainer>
        {deleteButtonClicked ? <Overlay/> : ''}  
        </>
        )
}

const TimelinePageContainer = styled.div`
    //background-color: red;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    height: 100vh;
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
    position: relative;
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

