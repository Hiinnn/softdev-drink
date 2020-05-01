import React from 'react';
import { Modal, Button } from 'react-bootstrap';

class CreateModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            head: this.props.head
        }
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.toggle}>

                <Modal.Header closeButton>
                    <Modal.Title>{this.props.head}</Modal.Title>
                </Modal.Header>

                <Modal.Body>{this.props.body}</Modal.Body>

                <Modal.Footer>
                    <Button variant={this.props.button || "secondary"} onClick={this.props.redirect}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default CreateModal;