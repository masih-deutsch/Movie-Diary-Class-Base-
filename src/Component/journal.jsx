import { Component } from 'react';
import notifyMe from './notifyMe.js';

const IMG_URL = "https://image.tmdb.org/t/p/w500";

export default class Journal extends Component {
    state = {
        myFav: [],
        note: ""
    }

    componentDidMount() {
        this.setState({ myFav: JSON.parse(localStorage.getItem("myFav")) || [] })
        notifyMe("info", "In Your Journal", `${JSON.parse(localStorage.getItem("myFav")).length} Movie(s)`)
    }
    render() {
        return (
            <>
                {this.state.myFav.map(movie => {
                    return (
                        <div key={movie.id} id={movie.id} className="movie-card bg-base-300 rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-5 shadow-xl transition hover:scale-105">
                            <div className="md:col-span-1 h-64 md:h-auto">
                                <img className="w-45 h-auto object-cover" src={`${IMG_URL}${movie.poster_path}`} alt="movie poster" />
                            </div>

                            <div className="md:col-span-2 p-6 flex flex-col gap-3 relative">
                                <h2 className="text-2xl font-bold line-clamp-1">{movie.title}</h2>
                                <div className="flex items-center gap-2">
                                    <i className="fa-solid fa-star text-sm"></i>
                                    <span className="font-bold">{movie.vote_average.toFixed(1)}</span>
                                </div>
                                <p className="text-sm leading-relaxed line-clamp-4">{movie.overview}</p>
                                <button onClick={this.removeCard.bind(this, movie.id, movie.title)}
                                    className="btn-remove btn btn-dash btn-error w-50 rounded-xl self-center absolute z-10 bottom-4">
                                    <i className="fa-solid fa-trash-can"></i>Remove fromJournal
                                </button>
                            </div>

                            <div className="md:col-span-2 p-6 flex flex-col gap-4">
                                <textarea onChange={(e) => this.setState({ note: e.target.value })} placeholder="What are your thoughts on this movie?" defaultValue={movie.note || ""}
                                    className="textarea textarea-accent w-100 h-30 resize-none transition rounded-2xl">
                                </textarea>
                                <button onClick={this.saveNote.bind(this, movie.id, movie.title)}
                                    className="btn-note btn btn-secondary rounded-xl w-30 self-center">Save Note</button>
                            </div>
                        </div>
                    )
                })}
            </>
        );
    }
    removeCard(id, name) {
        const newFav = this.state.myFav.filter(movie => movie.id != id)
        this.setState({ myFav: newFav })
        localStorage.setItem("myFav", JSON.stringify(newFav))
        notifyMe("warning", `${name}`, "Successfully Removed")
    }
    saveNote(id, name) {
        const newFav = this.state.myFav.map(movie => (movie.id == id) ? { ...movie, note: this.state.note } : movie)
        this.setState({ myFav: newFav })
        localStorage.setItem("myFav", JSON.stringify(newFav))
        notifyMe("info", `Your note fot ${name}`, `Successfully Saved`)
    }
}
