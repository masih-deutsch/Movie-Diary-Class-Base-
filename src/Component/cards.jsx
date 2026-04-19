import { Component } from 'react'
import notifyMe from './notifyMe.js';


const API_KEY = "b4e4703e22e4a12760c693ae49366f0c";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500";


export default class Moviecards extends Component {


    state = {
        page: 1,
        moviesData: [],
        myFavID: [],
        bg: "btn-primary",
    }

    async componentDidMount() {
        this.fetchMovies();
    }

    async componentDidUpdate(prevProps) {
        if (this.props.currentPage !== prevProps.currentPage) {
            this.fetchMovies();
        }
    }

    async fetchMovies() {
        const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${this.props.currentPage}`)
        if (res.ok) {
            const data = await res.json()
            const savedFavs = JSON.parse(localStorage.getItem("myFav")) || [];
            this.setState({
                moviesData: data.results,
                myFavID: savedFavs.map(movie => movie.id)

            });
            notifyMe("success", "Connected to the server", "Movies will show successfully")
        } else {
            notifyMe("error", "Not Connected to the server", `${res.status}, Data Not Founded`)
        }

    }

    render() {
        const renderData = this.props.searchData && this.props.searchData.length > 0 ?
            this.props.searchData : this.state.moviesData;
        return (
            <>
                {renderData.map((movie) => {
                    return (
                        <div onClick={this.toggleMovie.bind(this, movie.id, movie.title)} key={movie.id} id={movie.id} className="hover-3d">
                            <figure className="max-w-96 rounded-2xl border-secondary border">
                                <div className="card bg-base-96 w-96 shadow-2xl relative">
                                    <figure className="max-h-96">
                                        <img className="w-96 object-cover" src={`${IMG_URL}${movie.poster_path}`} alt="Shoes" />
                                    </figure>
                                    <div className="card-body bg-base-300">
                                        <h2 className="card-title justify-center font-extrabold">{movie.title}</h2>
                                        <div className="stats shadow rounded-lg overflow-hidden">
                                            <div className="stat">
                                                <div className="stat-figure text-primary">
                                                    <i className="fa-solid fa-star fa-2x" style={{ color: "rgb(255, 179, 0)" }}></i>
                                                </div>
                                                <div className="stat-title">Movie Score</div>
                                                <div className="stat-value text-primary">{movie.vote_average.toFixed(1)}</div>
                                            </div>
                                            <div className="stat">
                                                <div className="stat-figure text-secondary">
                                                    <i className="fa-solid fa-eye fa-2x" style={{ color: "rgb(255, 179, 59)" }}></i>
                                                </div>
                                                <div className="stat-title">View Count</div>
                                                <div className="stat-value text-secondary">{movie.vote_count}</div>
                                            </div>
                                        </div>
                                        <p className="line-clamp-3 text-center">{movie.overview}
                                        </p>
                                        <div className="card-actions justify-center absolute top-91 z-10 self-center">
                                            <button className={`btn ${this.state.myFavID.includes(movie.id) ? "bg-green-500" : "bg-primary"} rounded-xl`}>
                                                <span className="text-rotate text-xl duration-6000">
                                                    <span className="justify-items-center">
                                                        {this.state.myFavID.includes(movie.id) ? (
                                                            "Added to my favorite"
                                                        ) : (
                                                            <>
                                                                <span>Add it to favorite</span>
                                                                <span className="font-bold italic">HERE👌 , FAST ▶︎▶︎</span>
                                                            </>
                                                        )}
                                                    </span>
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </figure>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    )
                })}
            </>
        );
    }

    toggleMovie(id, title) {
        let myFav = JSON.parse(localStorage.getItem("myFav")) || []

        if (myFav.map(movie => movie.id).includes(id)) {
            myFav = myFav.filter(movie => movie.id != id)
            localStorage.setItem("myFav", JSON.stringify(myFav))
            this.setState({ myFavID: [...myFav.map(x => x.id)] })
            notifyMe("warning", `${title}`, "From Your List Removed")
        }
        else {
            myFav.push(this.state.moviesData.find(movie => movie.id == id))
            localStorage.setItem("myFav", JSON.stringify(myFav))
            this.setState({ myFavID: myFav.map(movie => movie.id) });
            notifyMe("success", `${title}`, "Successfully Added")
        }
    }
}
