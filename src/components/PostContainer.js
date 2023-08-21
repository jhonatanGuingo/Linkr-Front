import axios from "axios"
import { useContext, useEffect, useRef, useState } from "react"
import { styled } from "styled-components"
import Likes from "./likes"
import LinkContainer from "./LinkContainer"
import { MdEdit } from "react-icons/md"
import { RiDeleteBin7Fill } from "react-icons/ri"
import { DeleteContext } from "../context/DeleteContext"
import { EditContext } from "../context/EditContext"


export default function PostContainer(props){
    const {posts, post} = props
    const [urlInfo, setUrlInfo] = useState('')
    const userId = localStorage.getItem("userId");
    const {deleteButtonClicked, setDeleteButtonClicked, postToDelete, setPostToDelete} = useContext(DeleteContext)
    const {edited, setEdited} = useContext(EditContext)
    const [edit, setEdit] = useState(false)
    const [description, setDescription] = useState(post.description)
    const [disabled, setDisabled] = useState(false)
    const token = localStorage.getItem("token");

    const textAreaRef = useRef();
    console.log(post, 'informaçoes do post')
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
    function confirmDeletion(event){
        event.preventDefault();
        const aux = !deleteButtonClicked
        setDeleteButtonClicked(aux)
        setPostToDelete(post.postId)
    }
    function editt(event){
        event.preventDefault();
        const aux = !edit
        setEdit(aux)
        if(!edit){
            setTimeout(() => textAreaRef.current.focus(), 80)
        }
    }
    function handleTextareaKeyPress(event){
        if (event.key === 'Escape') {
            const aux = !edit
            setEdit(aux)
        }
        if (event.key === 'Enter') {
            setDisabled(true)
            const url = `${process.env.REACT_APP_API_URL}edit/${post.postId}`
            const body = {description: description}
            const config = {headers: {'Authorization': `Bearer ${token}`}}
            axios.put(url, body, config)
                .then(resp => {
                    const aux = !edited
                    setEdited(aux)
                    const auxx = !edit
                    setEdit(auxx)
                    setDisabled(false)
                })
                .catch(err => {
                    alert('Não foi possível editar a descrição deste post')
                    setDisabled(false)
                    console.log(err.response.data)
                })
        }
    }
    return(
        <>
        {urlInfo.length === 0 ? 
        ''
        :
        <PostContainerr>
            <UserImgContainer>
                <ProfileImg src={post.image}/>
                {/* <Likes postid={post.postId} userid={post.userId}/> */}
            </UserImgContainer>
            <PostInfoContainer>
                <Container>
                    <User>{post.userName}</User>
                    {Number(userId) === post.userId ? 
                    <div>
                        <MdEdit style={editStyle} onClick={editt}/>
                        <RiDeleteBin7Fill style={deleteStyle} onClick={confirmDeletion}/>
                    </div>
                    :
                    ''}
                </Container>
                {edit ? 
                <TextInput 
                    disabled={disabled}
                    ref={textAreaRef}
                    height='60px'
                    type='text'
                    placeholder="Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    onKeyUp={handleTextareaKeyPress}
                /> 
                :
                <Description>{post.description}</Description>}
                <LinkContainer 
                    onClick={() => window.open(urlInfo.url, '_blank')} 
                    urlInfo={urlInfo} 
                    setUrlInfo={setUrlInfo}
                />
            </PostInfoContainer>
        </PostContainerr>
        }
        </>   
    )
}

const TextInput = styled.textarea`
    background-color: #e7e6e6;
    border-radius: 5px;
    font-size: 20px;
    height: ${props => props.height};
    width: 96%;
    outline: none;
    border: none;
    padding: 10px;
    margin: 1px 1px 1px 1px;
    position: relative;
    margin-bottom: 15px;
    :focus{
        background-color: black;
    }
`

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
const editStyle = {
    fontSize: "25px",
    fontWeight: 'bold',
    //color: 'black',
    fill: 'white',
    //marginLeft: "5px",
    marginRight: "5px"
}

const deleteStyle = {
    fontSize: "25px",
    fontWeight: 'bold',
    //color: 'black',
    fill: 'white',
    marginLeft: "5px",
    //marginRight: "5px"
}

const Container = styled.div`
    //background-color: pink;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`