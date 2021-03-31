import React from 'react'
import Header from './components/Header'
import Slider from './components/Slider'
import MovieList from './components/MovieList/MovieList'

//Redux
import { Provider } from 'react-redux'
import store from './store'

function App() {
  return (
    <div style={{overflowX: 'hidden'}}>
      <Provider store={store}>
      <Header className="hwrapper"/>
      <main className="hwrapper">
        <Slider />
        <MovieList />
      </main>
      </Provider>
    </div>
  );
}

export default App;
