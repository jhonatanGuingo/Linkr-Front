import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Header from "../components/Header";
import SideBarHashtags from "../components/sideBarHashtag";

export default function TestPage() {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            alert("É necessário estar logado para prosseguir");
            navigate("/");
            return;
        }
    })

    return (
        <>
        <Header/>
        <SideBarHashtags/>

        </>)
}