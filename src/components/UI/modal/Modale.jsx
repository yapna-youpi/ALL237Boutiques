import React from 'react'
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

const Modale = ({children,modal,toggle}) => {
  return (
    <div>
       <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
          {children}
          <h2>les way forts du modal</h2>
        </ModalBody>
        {/* <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Do Something
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter> */}
      </Modal>
    </div>
  )
}

export default Modale
