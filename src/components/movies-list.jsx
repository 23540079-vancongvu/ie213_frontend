// import React, { useState, useEffect } from "react";
// import MovieDataService from "../services/movies";
// import { Link } from "react-router-dom";
// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
// import Card from "react-bootstrap/Card";

// const MoviesList = (props) => {
//   // 2.1 State
//   const [movies, setMovies] = useState([]);
//   const [searchTitle, setSearchTitle] = useState("");
//   const [searchRating, setSearchRating] = useState("");
//   const [ratings, setRatings] = useState(["All Ratings"]);

//   // 2.2 Lấy danh sách movie và danh sách rating
//   useEffect(() => {
//     retrieveMovies();
//     retrieveRatings();
//   }, []);

//   const retrieveMovies = () => {
//     MovieDataService.getAll()
//       .then((response) => {
//         console.log(response.data);
//         setMovies(response.data.movies);
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//   };

//   const retrieveRatings = () => {
//     MovieDataService.getRatings()
//       .then((response) => {
//         console.log(response.data);
//         //start with 'All ratings' if user doesn't specify any ratings
//         setRatings(["All Ratings"].concat(response.data));
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//   };
//   //2.3 Tạo search form
//   const onChangeSearchTitle = (e) => {
//     const searchTitle = e.target.value;
//     setSearchTitle(searchTitle);
//   };
//   const onChangeSearchRating = (e) => {
//     const searchRating = e.target.value;
//     setSearchRating(searchRating);
//   };

//   const findByTitle = () => {
//     MovieDataService.findByTitle(searchTitle)
//       .then((response) => {
//         setMovies(response.data.movies);
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//   };

//   const findByRating = () => {
//     if (searchRating === "All Ratings") {
//       retrieveMovies();
//     } else {
//       MovieDataService.findByRating(searchRating)
//         .then((response) => {
//           setMovies(response.data.movies);
//         })
//         .catch((e) => {
//           console.log(e);
//         });
//     }
//   };

//   return (
//     <div className="App">
//       <Container>
//         <Row className="mb-3">
//           {/* Search by title */}
//           <Col md={8}>
//             <Form.Group>
//               <Form.Control
//                 type="text"
//                 placeholder="Search by title"
//                 value={searchTitle}
//                 onChange={onChangeSearchTitle}
//               />

//               <Button
//                 variant="primary"
//                 className="mt-2 d-block"
//                 onClick={findByTitle}
//               >
//                 Search
//               </Button>
//             </Form.Group>
//           </Col>

//           {/* Search by rating */}
//           <Col md={4}>
//             <Form.Group>
//               <Form.Select value={searchRating} onChange={onChangeSearchRating}>
//                 {ratings.map((rating, index) => (
//                   <option key={index} value={rating}>
//                     {rating}
//                   </option>
//                 ))}
//               </Form.Select>

//               <Button
//                 variant="primary"
//                 className="mt-2 d-block"
//                 onClick={findByRating}
//               >
//                 Search
//               </Button>
//             </Form.Group>
//           </Col>
//         </Row>

//         {/* 2.4 Hiển thị các movie bằng của React-bootstrap */}
//         <Row>
//           {movies.map((movie) => (
//             <Col key={movie._id} md={4} className="mb-4">
//               <Card style={{ width: "18rem" }}>
//                 {/* Poster image (resize từ URL gốc) */}
//                 <Card.Img variant="top" src={movie.poster + "/100px180"} />

//                 <Card.Body>
//                   {/* Title */}
//                   <Card.Title>{movie.title}</Card.Title>

//                   {/* Rating */}
//                   <Card.Text>
//                     <strong>Rating:</strong> {movie.rated}
//                   </Card.Text>

//                   {/* Plot */}
//                   <Card.Text>{movie.plot}</Card.Text>

//                   {/* View Reviews link */}
//                   <Link to={"/movies/" + movie._id}>View Reviews</Link>
//                 </Card.Body>
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default MoviesList;

import { useEffect, useState } from "react";
import MovieDataService from "../services/movies";
import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchRating, setSearchRating] = useState("All Ratings");
  const [ratings, setRatings] = useState(["All Ratings"]);

  const [currentPage, setCurrentPage] = useState(0);
  const [entriesPerPage, setEntriesPerPage] = useState(0);

  const [appliedSearch, setAppliedSearch] = useState({
    mode: "",
    title: "",
    rating: "",
  });

  const retrieveMovies = async (page) => {
    try {
      const response = await MovieDataService.getAll(page);
      const data = response.data;

      setMovies(data.movies);
      setCurrentPage(data.page);
      setEntriesPerPage(data.entries_per_page);
    } catch (e) {
      console.error(e);
    }
  };

  const retrieveRatings = async () => {
    try {
      const response = await MovieDataService.getRating();
      setRatings(["All Ratings", ...response.data]);
    } catch (e) {
      console.error(e);
    }
  };

  const find = async (query, by, page) => {
    try {
      const response = await MovieDataService.find(query, by, page);
      const data = response.data;

      setMovies(data.movies);
      setCurrentPage(data.page);
      setEntriesPerPage(data.entries_per_page);
    } catch (e) {
      console.error(e);
    }
  };

  const findByTitle = async () => {
    setCurrentPage(0);
    setAppliedSearch({
      mode: "findByTitle",
      title: searchTitle,
      rating: "",
    });
    await find(searchTitle, "title", 0);
  };

  const findByRating = async () => {
    setCurrentPage(0);

    if (searchRating === "All Ratings") {
      setAppliedSearch({ mode: "", title: "", rating: "" });
      await retrieveMovies(0);
    } else {
      setAppliedSearch({
        mode: "findByRating",
        title: "",
        rating: searchRating,
      });
      await find(searchRating, "rated", 0);
    }
  };

  useEffect(() => {
    retrieveRatings();
  }, []);

  useEffect(() => {
    if (appliedSearch.mode === "findByTitle") {
      find(appliedSearch.title, "title", currentPage);
    } else if (appliedSearch.mode === "findByRating") {
      find(appliedSearch.rating, "rated", currentPage);
    } else {
      retrieveMovies(currentPage);
    }
  }, [currentPage, appliedSearch]);

  const onChangeSearchTitle = (e) => {
    setSearchTitle(e.target.value);
  };

  const onChangeSearchRating = (e) => {
    setSearchRating(e.target.value);
  };

  return (
    <div className="App">
      <Container>
        <h2 className="my-3">Movie Search</h2>

        <Form className="mb-4">
          <Row>
            <Col md={6}>
              <Form.Control
                type="text"
                placeholder="Search by title"
                value={searchTitle}
                onChange={onChangeSearchTitle}
              />
              <Button className="mt-2" onClick={findByTitle}>
                Search
              </Button>
            </Col>

            <Col md={6}>
              <Form.Select value={searchRating} onChange={onChangeSearchRating}>
                {ratings.map((rating) => (
                  <option key={rating} value={rating}>
                    {rating}
                  </option>
                ))}
              </Form.Select>
              <Button className="mt-2" onClick={findByRating}>
                Search
              </Button>
            </Col>
          </Row>
        </Form>

        <Row className="g-4">
          {movies.map((movie) => (
            <Col md={4} key={movie._id}>
              <Card>
                <Card.Img
                  variant="top"
                  src={movie.poster ? `${movie.poster}/100px180` : ""}
                  alt={movie.title}
                />
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                  <Card.Text>
                    <strong>Rating:</strong> {movie.rated || ""}
                  </Card.Text>
                  <Card.Text>{movie.plot || ""}</Card.Text>
                  <Link to={`/movies/${movie._id}`}>View Reviews</Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {movies.length > 0 && (
          <div className="mt-4 text-center">
            <p>Showing Page: {currentPage}</p>
            <Button variant="link" onClick={() => setCurrentPage((p) => p + 1)}>
              Get next {entriesPerPage} results
            </Button>
          </div>
        )}
      </Container>
    </div>
  );
};

export default MoviesList;
