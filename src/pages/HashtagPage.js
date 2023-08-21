import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { styled } from "styled-components";
import Header from "../components/Header";
import PostContainer from "../components/PostContainer";
import { EditContext } from "../context/EditContext";
import SideBarHashtags from "../components/sideBarHashtag";

export default function HashtagPage() {
  const navigate = useNavigate();
  const params = useParams();
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem("token");
  const {newPost} = useContext(EditContext);
  const [loading, setLoading] = useState(false)
console.log(params);
  useEffect(() => {
    if (!token) {
      alert("É necessário estar logado para prosseguir");
      navigate("/");
      return;
    }
    const url = `${process.env.REACT_APP_API_URL}hashtag/${params.hashtag}`;
    axios
      .get(url)
      .then((resp) => {
        console.log(resp.data);
        if (posts !== resp.data) {
          setPosts(resp.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params]);

  
  return (
    <>
      <TimelinePageContainer>
        <Header />
        { posts.length === 0 ? 
          <TimelineContainer>
            <Mensagem>There are no posts yet</Mensagem>
          </TimelineContainer>
         : 
         <TimelineContainer>
          <h1>#{params.hashtag}</h1>
        

        {posts.map((post) => (
          <PostContainer key={post.postId} post={post} posts={posts} />
        ))}

    
        <SideBarHashtags
          newPost={newPost}
        />
    </TimelineContainer>
       }
        
      </TimelinePageContainer>
  
    </>
  );
}
const TimelinePageContainer = styled.div`
  //background-color: red;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  position: relative;
  height: 100vh;
  
`;
const Mensagem = styled.p`
  font-family: "Oswald";
  margin-top: 100px;
  font-size: 30px;
  text-align: center;
  color: white;
`;

const TimelineContainer = styled.div`
  //background-color: pink;
  padding: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 920px;
  margin-top: 72px;

  h1 {
    font-family: "Oswald";
    //background-color: blue;
    width: 100%;
    font-weight: 700;
    font-size: 43px;
    color: white;
    margin: 60px 0px 45px 0px;
  }
`;
