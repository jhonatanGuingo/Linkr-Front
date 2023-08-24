import {styled} from "styled-components"
import { useEffect, useState } from "react";
import axios from "axios";
import Trending from "./Trending";

export default function SideBarHashtags(props){
    const [trending, setTrending] = useState([]);
    const {newPost} = props;
    useEffect(() => {
        const url = `${process.env.REACT_APP_API_URL}/hashtag`
        axios.get(url)
                .then(resp => {
                    console.log(resp.data)
                    setTrending(resp.data);
                })
                .catch(err => {
                    console.log(process.env.REACT_APP_API_URL)
                    console.log(err)
                })
    }, [newPost])
  
    return(
        <>
       
        <ContainerSideBar data-test = "trending">
            <div>
                <h1>trending</h1>
            </div>
            {trending.length === 0 ? <a> loading</a> : 
            <>
            {trending.map(trend => ( <Trending  nameHashtag = {trend.nameHashtag}/>

            ))}
            </>
        }
        </ContainerSideBar>
        
        </>
    )
}

const ContainerSideBar = styled.div`
    height: 406px;
    width: 301px;
    display: flex;
    flex-direction: column;
    position: absolute;
    right: 40px;
    margin-top: 220px;
    background-color: #171717;
    border-radius: 16px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
   
    div{
        margin-bottom: 22px;
        height: 60px;
        width: 100%;
        border-bottom: 1px solid #484848;
        display: flex;
        align-items: center;
        h1{
            margin-left: 16px;
            color: #FFF;
            font-family: Oswald;
            font-size: 27px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;

        }
    }
`