import { NavLink } from 'react-router-dom';
import { Component } from 'react'

const API_KEY = "b4e4703e22e4a12760c693ae49366f0c";
const BASE_URL = "https://api.themoviedb.org/3";

class Header extends Component {
    state = {
        searchQuery: "",
        searchData: []
    }

    render() {
        return (
            <>
                <nav className="navbar w-[95%] sticky mx-auto top-10 opacity-90 z-10 bg-base-300 shadow-sm rounded-xl">
                    <div className="navbar-start gap-1">
                        <span className="text-rotate rounded-4xl">
                            <span>
                                <span className="bg-teal-400 px-2"><i className="fa-solid fa-film"></i></span>
                                <span className="bg-red-400 px-2"><i className="fa-solid fa-video"></i></span>
                                <span className="bg-blue-400 px-2"><i className="fa-regular fa-circle-play"></i></span>
                            </span>
                        </span>
                        <span className="font-extrabold">Movie Diary</span>
                    </div>

                    <div className="navbar-center tabs">
                        <NavLink
                            to="/"
                            className={({ isActive }) => `tab pb-1 ${isActive ? "tab-active font-extrabold border-b-4 border-primary" : ""}`}>Home
                        </NavLink>

                        <NavLink
                            to="/journal"
                            className={({ isActive }) => `tab pb-1 ${isActive ? "tab-active font-extrabold border-b-4 border-primary" : ""}`}>Journal
                        </NavLink>
                    </div>


                    <div className="navbar-end gap-2 mr-2">
                        <div className="relative ml-3 items-center">
                            <i className="absolute z-10 self-center ml-3 text-[#8D8629] fa-solid fa-magnifying-glass"></i>
                            <input
                                onChange={(e) => this.setState({ searchQuery: e.target.value })}
                                onKeyDown={(e) => { if (e.key === 'Enter') this.handleSearchClick(); }}
                                value={this.state.searchQuery}
                                type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto rounded-md pl-10" />
                        </div>
                        <button onClick={this.handleSearchClick.bind(this)} className="btn btn-primary rounded-md">Search</button>
                    </div>
                </nav>

                {/* <div className="flex justify-center ">
                    <div className="mockup-browser border-4 border-base-200 w-3/4 mt-23 shadow-2xl rounded-lg">
                        <div className="mockup-browser-toolbar ">
                            <div className="urlHolder input w-3/4"></div>
                        </div>
                    </div>
                </div> */}

                <h1 className="text-center font-extrabold text-accent text-5xl mb-10 mt-18">
                    Popular Movies This Week
                </h1>
            </>
        );
    }

    async handleSearchClick() {
        if (this.state.searchQuery.trim() !== "") {
            const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${this.state.searchQuery.trim()}`)
            if (res.ok) {
                const data = await res.json();
                if (this.props.onSearchSubmit) {
                    this.props.onSearchSubmit(data.results);
                }
            } else {
                throw new Error(`${res.status}, Data Not Founded`);
            }
        }
    }

}

export default Header;
