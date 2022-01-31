import { useState, useEffect } from 'react'
import { Table, Col, Row, Form, Button } from 'react-bootstrap'
import FavouritesList from './FavouritesList'
import EntitiesStore from '../Store/EntitiesStore'
import Video from './Video'
import './FavouritesList.css'

function FeedWithLists() {
    const [lists, setLists] = useState([])
    const [videos, setVideos] = useState([])
    const [sort, setSort] = useState("Descending order");
    const [filter, setFilter] = useState("");

    useEffect(() => {
        if (sort === "Descending order") {
            EntitiesStore.getLists();
        } else {
            EntitiesStore.getListsAsc();
        }
        EntitiesStore.emitter.addListener('GET_LISTS_SUCCESS', () => {
            setLists(EntitiesStore.data)
        })
    }, [sort])

    useEffect(() => {
        if (filter === "Lists from today") {

        }
    })



    function getVideoFromListByID(id) {
        EntitiesStore.getVideosFromList(id)
        EntitiesStore.emitter.addListener('GET_VIDEOS_SUCCESS', () => {
            setVideos(EntitiesStore.videos)
        })
    }

    function saveList(list, id) {
        EntitiesStore.updateList(list, id)
    }

    function deleteList(id) {
        EntitiesStore.deleteList(id)
    }

    function saveVideo(listID, videoID, video) {
        EntitiesStore.updateVideo(listID, videoID, video)
    }

    function deleteVideo(listID, videoID) {
        EntitiesStore.deleteVideo(listID, videoID);
    }

    function handleTableRowClick(event) {
        getVideoFromListByID(parseInt(event.target.textContent))
    }

    return (<>
        <Row>
            <Col lg="5">
                <h1>Lists</h1>
                <p>Click on the ID of any list to see its videos.</p>
                <Table responsive>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Desctiption</th>
                            <th>Created at</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {lists.map((list) => <FavouritesList key={list.ListID} item={list} onSave={saveList} onDelete={deleteList} onClickRow={handleTableRowClick} />)}
                    </tbody>
                </Table>
                <Form>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3 mt-3">
                                <Form.Label>Sort:</Form.Label>
                                <Form.Select onChange={(e) => { setSort(e.target.value) }}>
                                    <option>Descending order</option>
                                    <option>Ascending order</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Form.Group className="mb-3 mt-3">
                            <Form.Label>Show only:</Form.Label>
                            <Form.Select onChange={(e) => { setFilter(e.target.value) }}>
                                <option></option>
                                <option>Lists from today</option>
                                <option>Lists with ID lower than 10</option>
                            </Form.Select>
                        </Form.Group>
                        <Col>

                        </Col>
                    </Row>

                </Form>
            </Col>
            <Col lg="7">
                <h1>Videos</h1>
                <p>{videos.length === 0 ? "There are no videos in this list" : `You are viewing videos from "${(lists.find((list) => list.ListID === videos[0].ListID)).Description}" `}</p>
                <Table responsive>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Desctiption</th>
                            <th>Title</th>
                            <th>URL</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {videos.map((video) => <Video key={video.VideoID} item={video} onSave={saveVideo} onDelete={deleteVideo} />)}
                    </tbody>
                </Table>
            </Col>
        </Row>
        
        <button className="table-btn">Import</button>
        <button className="table-btn">Export</button>


    </>)
}

export default FeedWithLists;