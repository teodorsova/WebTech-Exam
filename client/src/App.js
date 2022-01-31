import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import EntitiesStore from './components/Store/EntitiesStore'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap'
import Navigation from './components/Navigation/Navigation';
import FeedWithLists from './components/Feed/FeedWithLists'
import AddList from './components/Add/AddList';
import AddVideo from './components/Add/AddVideo';

function App() {

  const [lists, setLists] = useState([])

  useEffect(() => {
    EntitiesStore.getLists();
    EntitiesStore.emitter.addListener('GET_LISTS_SUCCESS', () => {
      setLists(EntitiesStore.data)
    })
  }, [])

  return (
    <div className ="body">
      <Navigation />
      <Container>
        <Router>
          <Routes>
            <Route path = "/" element = {<FeedWithLists/>}/>
            <Route path = "/addList" element = {<AddList/>}/>
            <Route path = "/addVideo" element = {<AddVideo data = {lists}/>}/>
            {/*RUTE DINAMICE*/}
          </Routes>
        </Router>
      </Container>
    </div>
  );
}

export default App;
