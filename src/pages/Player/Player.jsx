import React, { useEffect, useRef, useState } from "react";
import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import { useNavigate, useParams } from "react-router-dom";

const Player = () => {
  const { id } = useParams();
const navigate = useNavigate();


  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: "",
  });
  const cardsRef = useRef();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YWI4NThjYzE4ZjgwYTk3OWIzZDk5YzRiYTViM2I4MiIsIm5iZiI6MTc0MjgwMjk3OC45ODU5OTk4LCJzdWIiOiI2N2UxMTAyMmU0YTljODY5MDYwODA5NmYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.36zppONffIHuff71WEJY5xyr2ws7_xv4nIodr1qUtmM",
    },
  };

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    if (id) {
      fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
        options
      )
        .then((res) => res.json())
        .then((res) => setApiData(res.results[0]))
        .catch((err) => console.error(err));
    }
  }, [id]);

  return (
    <div className="Player">
      <img src={back_arrow_icon} alt="" onClick={()=>{navigate(-2)}} />
      {apiData.key && (
        <iframe
          width="90%"
          height="90%"
          src={`https://www.youtube.com/embed/${apiData.key}`}
          title="trailer"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      )}
      <div className="player-info">
        <p>{apiData.published_at && apiData.published_at.slice(0, 10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  );
};

export default Player;


