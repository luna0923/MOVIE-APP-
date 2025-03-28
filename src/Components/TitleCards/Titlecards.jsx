import React, { useEffect, useRef, useState } from "react";
import "./TitleCards.css";
import cards_data from "../../assets/cards/Cards_data";
import { Link } from "react-router-dom";

const Titlecards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
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
    const scrollPosition =
      cardsRef.current.scrollLeft + event.deltaY;
    cardsRef.current.scrollLeft = scrollPosition;
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${
        category ? category : "popular"
      }?page=1`,
      options
    )
      .then((res) => res.json())
      .then((res) => setApiData(res.results))
      .catch((err) => console.error(err));

    const cardsContainer = cardsRef.current;
    cardsContainer.addEventListener("wheel", handleWheel);
    return () => {
      cardsContainer.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div className="Titlecards">
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.length > 0 &&
          apiData.map((card, index) => {
            return (
              <Link
                to={`/player/${card.id}`}
                className="card"
                key={index}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path}
                  alt=""
                />
                <p>{card.original_title}</p>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default Titlecards;
