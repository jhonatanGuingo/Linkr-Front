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

export default function TimelinePage() {
    const token = localStorage.getItem("token");
    const image = localStorage.getItem("image");
    const navigate = useNavigate();

    const [posts, setPosts] = useState([])
    const [postPosted, setPostPosted] = useState(false)
    const [link, setLink] = useState('')
    const [description, setDescription] = useState('')
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)

    const {deleted, setDeleted, deleteButtonClicked, setDeleteButtonClicked} = useContext(DeleteContext)
    const {edited, setEdited} = useContext(EditContext)

    useEffect(() => {
        if (!token) {
            alert("É necessário estar logado para prosseguir");
            navigate("/");
            return;
        }
        console.log(page)
        console.log(loading)
        const url = `${process.env.REACT_APP_API_URL}posts/${page}`
        axios.get(url)
            .then(resp => {
                console.log(resp.data)
                if(posts !== resp.data){
                    setPosts(resp.data)
                }
            })
            .catch(err => {
                console.log(err)
            })
        window.addEventListener('scroll', handleScroll)
        return () => {window.removeEventListener('scroll', handleScroll)}
    }, [postPosted, deleted, edited])


    function handleScroll(){
        if(window.innerHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight){
            setLoading(true)
            console.log('oi')
            const auxx = page + 1
            const url = `${process.env.REACT_APP_API_URL}posts/${auxx}`
            axios.get(url)
            .then(resp => {
                if(posts.length < resp.data.length){
                    setPosts(resp.data)
                    setPage(auxx)
                    setTimeout(()=>setLoading(false), 10000)
                }
            })
            .catch(err => {
                console.log(err)
            })
        }
    }

    return (
        <>
        <TimelinePageContainer>
            <Header/>
            { posts.length === 0 ? 
            <TimelineContainer>
                <Mensagem>There are no posts yet</Mensagem>
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
                <PostContainer key= {post.postId} post={post} posts={posts}/>)
                )}
                {/* <SideBarHashtags/> */}
                {loading ? <h1>Loading</h1> : ''}
            </TimelineContainer>
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
    position: relative;
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

