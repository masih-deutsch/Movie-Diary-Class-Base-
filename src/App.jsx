import { Component } from 'react'
import { Routes, Route } from 'react-router-dom';
import "./Style.css"
import '@fortawesome/fontawesome-free/css/all.min.css';

import Header from "./Component/header.jsx";
import Moviecards from "./Component/cards.jsx";
import Journal from "./Component/journal.jsx";
import Page from './Component/page.jsx';



class App extends Component {

  state = {
    searchResults: [],
    page: 1
  }

  render() {
    return (
      <>
        <Header onSearchSubmit={data => this.setState({ searchResults: data })} />

        <Routes>
          <Route path='/' element={
            <>
              <div className="flex flex-wrap justify-between mx-auto gap-x-6 gap-y-10 p-6 rounded-2xl">
                <Moviecards searchData={this.state.searchResults} currentPage={this.state.page} />
              </div>
              <Page pageData={data => this.setState({ page: data })} />
            </>
          }></Route>
          <Route path='/journal' element={

            <>
              <div className="flex flex-col w-300 justify-center items-center mx-auto gap-6 p-6 rounded-2xl">
                <Journal />
              </div>
            </>

          }></Route>

        </Routes>
      </>
    );
  }
}


export default App;