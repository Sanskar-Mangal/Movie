import React,{useEffect, useState} from "react";
import { Link } from 'react-router-dom'; 
import Card from "./Card";
let API_Key="&api_key=925bb50dd3e0d3df6a97e207db0c54b3"
let base_url="https://api.themoviedb.org/3"
let url=base_url+"/discover/movie?sort_by=popularity.desc"+API_Key;
let arr=["Popular","Kids","Drama","Comedie"];


const Main =() =>{
    const [movieData, setData] = useState([]);
    //fetching data from the api
    const [url_set,setUrl]=useState(url);
    const [search,setSearch]=useState();

    useEffect(()=>{
        fetch(url_set)
            .then((res)=> res.json())
            .then((data)=>{
                setData(data.results);
            });
    },[url_set])
    const getData=(movieType)=>{
        if(movieType=="Popular"){
            url=base_url+`/discover/movie?sort_by=popularity.desc`+API_Key;
        }
        if(movieType=="Kids"){
            url=base_url+`/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc`+API_Key
        }
        if(movieType=="Drama"){
            url=base_url+`/discover/movie?with_genres=18&sort_by=popularity.desc`+API_Key;
        }
        if(movieType=="Comedie"){
            url=base_url+ `/discover/tv?with_networks=213&language=en-US&page=1`+API_Key;
        }
        setUrl(url);
    }
    const searchMovie = (evt) => {
        if (evt.key === "Enter") {
            evt.preventDefault();
            url=base_url+"/search/movie?api_key=925bb50dd3e0d3df6a97e207db0c54b3&query="+search;
            setUrl(url);
            setSearch("");
        }
    };
    
    return(
        <>
            <div className="header">
                <nav>
                    <ul>
                    {
                        arr.map((value,pos)=>{
                            return(
                               <li><Link to="#" key={pos} name={value} onClick={(e) => { getData(e.target.name) }}>{value}</Link></li>
                            )
                        })
                    }
                    </ul>
                </nav>
                <form >
                <label>
                        <div className="search-btn">
                            <input type="text" placeholder="Enter Movie Name" className="inputText"
                            onChange={(e)=>{setSearch(e.target.value)}} value={search} onKeyDown={searchMovie}></input>
                            <button><i className="fa-solid fa-magnifying-glass"></i></button>
                        </div>
                </label>        
                </form>
            </div>
            <div className="container">
            {
                (movieData.length==0) ? <p className="notfound">No Movie Found</p>: 
                movieData.map((res,pos)=>{
                    return(
                        <Card info={res} key={pos}/>
                    )
                }    
                )
            }
            </div>
        </>
    );
}

export default Main;