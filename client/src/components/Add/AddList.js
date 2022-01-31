import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import EntitiesStore from '../Store/EntitiesStore'
import { useState } from 'react'

function AddList() {
    const [Description, setDescription] = useState("")

    function addList() {
        EntitiesStore.addList({ Description: Description, Date: new Date() });
        EntitiesStore.emitter.addListener('INSERT_LIST_SUCCESS', () => {
            alert('List successfully inserted')
        })
    }

    return (<>
        <Container>
            <Row>
                <Col lg="4"></Col>
                <Col lg="4">
                    <h1 className = "mt-3">Add List</h1>
                    <Form>
                        <Form.Group className="mb-3 mt-3" controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" placeholder="Enter description" value={Description} onChange={(e) => setDescription(e.target.value)} />
                            <Form.Text>The creation date will be automatically added.</Form.Text>
                        </Form.Group>

                        <Button variant="primary" type="submit" onClick={addList}>
                            Add list
                        </Button>
                    </Form>
                </Col>
                <Col lg="4"></Col>
            </Row>
        </Container>
    </>)
}

export default AddList;