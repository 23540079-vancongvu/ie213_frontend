// import axios from "axios";

// class MovieDataService {
//   getAll(page = 0) {
//     return axios.get(`http://localhost:80/api/v1/movies?page=${page}`);
//   }
//   get(id) {
//     return axios.get(`http://localhost:80/api/v1/movies/id/${id}`);
//   }
//   findByTitle(title, page = 0) {
//     return axios.get(
//       `http://localhost:80/api/v1/movies?title=${title}&page=${page}`
//     );
//   }
//   findByRating(rating, page = 0) {
//     return axios.get(
//       `http://localhost:80/api/v1/movies?rated=${rating}&page=${page}`
//     );
//   }
//   createReview(data) {
//     return axios.post(`http://localhost:80/api/v1/movies/review`, data);
//   }
//   updateReview(data) {
//     return axios.put(`http://localhost:80/api/v1/movies/review`, data);
//   }
//   deleteReview(id, userId) {
//     return axios.delete(`http://localhost:80/api/v1/movies/review`, {
//       data: { review_id: id, user_id: userId },
//     });
//   }
//   getRatings() {
//     return axios.get(`http://localhost:80/api/v1/movies/ratings`);
//   }
// }

// export default new MovieDataService();

import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const MovieDataService = {
  getAll(page = 0) {
    return axios.get(`${API_URL}/api/v1/movies?page=${page}`);
  },

  get(id) {
    return axios.get(`${API_URL}/api/v1/movies/id/${id}`);
  },

  find(query, by = "title", page = 0) {
    return axios.get(`${API_URL}/api/v1/movies?${by}=${query}&page=${page}`);
  },

  createReview(data) {
    return axios.post(`${API_URL}/api/v1/movies/review`, data);
  },

  updateReview(data) {
    return axios.put(`${API_URL}/api/v1/movies/review`, data);
  },

  deleteReview(id, userId) {
    return axios.delete(`${API_URL}/api/v1/movies/review`, {
      data: {
        review_id: id,
        user_id: userId,
      },
    });
  },

  getRatings() {
    return axios.get(`${API_URL}/api/v1/movies/ratings`);
  },
};

export default MovieDataService;
