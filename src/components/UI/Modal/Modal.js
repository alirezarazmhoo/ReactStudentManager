import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

class MModal extends Component {

  render() {
    return (
      <>

        <div
          className="d-flex align-items-center justify-content-center"
          style={{ height: "100vh" }} 
        >

        </div>
        <Modal show={this.props.modalShow}  >
          <Modal.Header onClick={this.props.closeModal} closeButton>

          </Modal.Header>
          <Modal.Body><p className="text-right">? آیا مایل به ادامه عملیات هستید</p></Modal.Body>
          <Modal.Footer>
            <Button  className="btn-danger" variant="secondary" onClick={this.props.closeModal}>
              خیر
            </Button>
              <Button className="btn-success" variant="secondary" onClick={this.props.remove}>
              بله
            </Button>
          </Modal.Footer>
        </Modal>
        
      </>
    );
  }
}

export default MModal;
