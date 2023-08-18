import axios from "axios";
import { styled } from "styled-components";

export default function PublishContainer(props){
    const {link, setLink, description, setDescription, postPosted, setPostPosted} = props
    const image = localStorage.getItem("image");
    const token = localStorage.getItem("token")

    async function createPost(event){
        event.preventDefault();
        const url = `${process.env.REACT_APP_API_URL}addpost`
        const config = {headers: {'Authorization': `Bearer ${token}`}};
        let body;
        if(description){
            body = {link, description}
        }else{
            body = {link}
        }
        axios.post(url, body, config)
            .then(resp => {
                console.log(resp.data)
                const aux = !postPosted
                setPostPosted(aux)
                setLink('')
                setDescription('')
            })
            .catch(err => {
                alert(err.data)
            })
    }
    return(
        <PublishContainerr>
            <img src={image}/>
            <div>
            <p>What are you going to share today?</p>
            <PostForm onSubmit={createPost}>
                <PostInput height='25px'
                required
                type='text'
                placeholder="http://"
                value={link}
                onChange={e => setLink(e.target.value)}/>
                <PostInput height='75px'
                type='text'
                placeholder="Description"
                value={description}
                onChange={e => setDescription(e.target.value)}/>
                <PostButton type='submit'>Publish</PostButton>
            </PostForm>
            </div>
        </PublishContainerr>
    )
}

const PublishContainerr = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    background-color: white;
    height: 100%;
    width: 611px;
    border-radius: 12px;
    padding: 15px;
    position: relative;
    margin-bottom: 25px;
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
        height: 100%;
        width: 540px;
        position: relative;
        padding-bottom: 45px;
    }
    p{
        font-size: 26px;
        margin: 6px 0px 12px 0px;
        font-family: 'Lato',sans-serif;
        font-weight: 400;
        color: gray;
    }
`

const PostForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 5px;
    width: 100%;
    border-radius: 5px;
`
const PostInput = styled.input`
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
    ::placeholder{
        position: absolute;
        top: 0px; 
        left: 0px;
    }
`

const PostButton = styled.button`
    position: absolute;
    right: 0px;
    bottom: 0px;
    outline: none;
    border: none;
    border-radius: 5px;
    background-color: blue;
    font-size: 20px;
    font-weight: 600;
    color: white;
    cursor: pointer;
    width: 30%;
    height: 40px;
`