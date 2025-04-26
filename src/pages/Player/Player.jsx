import React, { useEffect, useRef, useState } from "react";
import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import { useNavigate, useParams } from "react-router-dom";

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [videoData, setVideoData] = useState(null);
  const cardsRef = useRef();

  const fetchVideoData = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`,

          },
        }
      );

      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const trailer = data.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        setVideoData(trailer || data.results[0]); // fallback if no trailer found
      }
    } catch (error) {
      console.error("Failed to fetch trailer data:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchVideoData();
    }
  }, [id]);

  return (
    <div className="Player">
      <img
        src={back_arrow_icon}
        alt="Go Back"
        onClick={() => navigate(-1)}
        className="back-button"
      />
      {videoData ? (
        <iframe
          width="90%"
          height="90%"
          src={`https://www.youtube.com/embed/${videoData.key}`}
          title={videoData.name}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      ) : (
        <p>Loading trailer...</p>
      )}
      {videoData && (
        <div className="player-info">
          <p>Published: {videoData.published_at?.slice(0, 10)}</p>
          <p>Title: {videoData.name}</p>
          <p>Type: {videoData.type}</p>
        </div>
      )}
    </div>
  );
};

export default Player;
