import axios from "axios"
import { useContext, useState } from "react"
import { styled } from "styled-components"
import { DeleteContext } from "../context/DeleteContext"
import { MutatingDots } from "react-loader-spinner"


export default function Overlay(){
    const {deleteButtonClicked, setDeleteButtonClicked, postToDelete, setPostToDelete, deleted, setDeleted} = useContext(DeleteContext)
    const token = localStorage.getItem("token");
    const [loading, setLoading] = useState(false)
    function goBack(event){
        event.preventDefault()
        const aux = !deleteButtonClicked
        setDeleteButtonClicked(aux)
    }
    function deletePost(event){
        setLoading(true)
        event.preventDefault()
        const url = `${process.env.REACT_APP_API_URL}posts/${postToDelete}`
        const config = {headers: {'Authorization': `Bearer ${token}`}};
        axios.delete(url, config)
            .then(resp => {
                const aux = !deleteButtonClicked
                const auxx = !deleted
                setDeleteButtonClicked(aux)
                setDeleted(auxx)
                setPostToDelete('')
                setLoading(false)
            })
            .catch(err => {
                const aux = !deleteButtonClicked
                setDeleteButtonClicked(aux)
                setPostToDelete('')
                alert('Não foi possível excluir o post')
            })
    }
    return(
        <Overlayy>
            {loading ? 
            <MutatingDots 
            height="100"
            width="100"
            color="#333333"
            secondaryColor= '#333333'
            radius='12.5'
            ariaLabel="mutating-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            />
            :
            <PopUpContainer>
                <Mensagem>Are you sure you want to delete this post?</Mensagem>
                <ButtonsContainer>
                    <ButtonNo onClick={goBack} data-test = "cancel">No, go back</ButtonNo>
                    <ButtonYes onClick={deletePost} data-test = "confirm">Yes, delete it</ButtonYes>
                </ButtonsContainer>
            </PopUpContainer>}
        </Overlayy>
    )
}

const Overlayy = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(255, 255, 255, 0.85);
    z-index: 10000;
`

const PopUpContainer = styled.div`
    box-sizing: border-box;
    background-color: #333333;
    border-radius: 45px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 500px;
    padding: 50px 100px 50px 100px;
`

const Mensagem = styled.p`
    color: white;
    font-family: 'Lato', sans-serif;
    font-weight: 600;
    font-size: 28px;
    text-align: center;
    line-height: 35px;
    margin-bottom: 30px;
`

const ButtonsContainer = styled.div`
    //background-color: red;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 40px;
`

const ButtonNo = styled.button`
    outline: none;
    border: none;
    border-radius: 5px;
    background-color: white;
    font-size: 16px;
    font-weight: 600;
    color: blue;
    cursor: pointer;
    width: 45%;
    height: 40px;
`

const ButtonYes = styled.button`
    outline: none;
    border: none;
    border-radius: 5px;
    background-color: blue;
    font-size: 16px;
    font-weight: 600;
    color: white;
    cursor: pointer;
    width: 45%;
    height: 40px;
`