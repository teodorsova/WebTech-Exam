import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import EntitiesStore from '../Store/EntitiesStore'
import { useState } from 'react'

function AddVideo(props) {
    const { data } = props;
    const [Description, setDescription] = useState("")
    const [Title, setTitle] = useState("")
    const [URL, setURL] = useState("")
    const [selectedItem, setSelectedItem] = useState("")


    function addVideo() {
        var list = data.find(listing => listing.Description === selectedItem)
        var listID = list.ListID;

        EntitiesStore.insertVideo(listID, { Description: Description, Title: Title, URL: URL });
        EntitiesStore.emitter.addListener('INSERT_VIDEO_SUCCESS', () => {
            alert('Video successfully inserted')
        })
    }

    return (<>
        <Container>
            <Row>
                <Col lg="4"></Col>
                <Col lg="4">
                    <h1 className="mt-3">Add Video</h1>
                    <Form>
                        <Form.Group className="mb-3 mt-3">
                            <Form.Label>Choose a list:</Form.Label>
                            <Form.Select onChange={(e) => { setSelectedItem(e.target.value) }}>
                                {data.map((list) => <option id={list.ListID}>{list.Description}</option>)}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formDescription">
                            <Form.Label>Description:</Form.Label>
                            <Form.Control type="text" placeholder="Enter description" value={Description} onChange={(e) => setDescription(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formTitle">
                            <Form.Label>Video title:</Form.Label>
                            <Form.Control type="text" placeholder="Enter title" value={Title} onChange={(e) => setTitle(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formURL">
                            <Form.Label>URL:</Form.Label>
                            <Form.Control type="text" placeholder="Enter video URL" value={URL} onChange={(e) => setURL(e.target.value)} />
                            <Form.Text>{"Eg. https://www.youtube.com/watch?v=jSHwbn4XI-w&ab_channel=FunnyCatsHD"}</Form.Text>
                        </Form.Group>


                        <Button variant="primary" type="submit" onClick={addVideo}>
                            Add video
                        </Button>
                    </Form>
                </Col>
                <Col lg="4"></Col>
            </Row>
        </Container>
    </>)
}

export default AddVideo;