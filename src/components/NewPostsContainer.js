import { styled } from "styled-components"
import { TfiReload } from "react-icons/tfi"
import { useEffect, useState } from "react"
import axios from "axios"
import dayjs from "dayjs"


export default function NewPostsConatiner(props){

    const {timestamp, setTimestamp, refresh, setRefresh} = props

    console.log(dayjs(Number(timestamp)).format('YYYY-MM-DD HH:mm:ss'))

    const userId = localStorage.getItem("userId")

    const [newPosts, setNewPosts] = useState(0)

    
    useEffect(() => {
        const url = `${process.env.REACT_APP_API_URL}newposts/${timestamp}/${userId}`
        axios.get(url)
            .then(resp => {
                console.log(resp.data)
                setNewPosts(resp.data.numNewPosts)
            })
            .catch(err => {
                 console.log(err)
            })
        const interval = setInterval(() => {
            const url = `${process.env.REACT_APP_API_URL}newposts/${timestamp}/${userId}`
            console.log(dayjs(Number(timestamp)).format('YYYY-MM-DD HH:mm:ss'))//não muda com a variável de estado
            axios.get(url)
                .then(resp => {
                    console.log(resp.data)
                    setNewPosts(resp.data.numNewPosts)
                })
                .catch(err => {
                    console.log(err)
                })
        }, 5000);

        return () => clearInterval(interval);
    },[timestamp])

    function loadMore(){
        const aux = !refresh
        setRefresh(aux)
    }

    return(
        <>
        {newPosts > 0 ?
        <NotificationContainer onClick={loadMore}>
            {newPosts} new posts, load more!
            <TfiReload style={reloadStyle}/>
        </NotificationContainer>
        :
        ''}
        </>
    )
}

const NotificationContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: blue;
    width: 602px;
    height: 100%;
    padding: 20px;
    margin-bottom: 15px;
    margin-top: 10px;
    border-radius: 12px;
    color: white;
    font-family: 'Lato',sans-serif;
    font-weight: 400;
    font-size: 16px;
    cursor: pointer;
`

const reloadStyle = {
    fontSize: "16px",
    fill: 'white',
    marginLeft: "10px",
}