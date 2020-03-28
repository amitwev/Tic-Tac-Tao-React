import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function SettingsModal({show , handleOnChangeAgainstRandom, handleOnChangeWhoStart, handleCloseModal, isAgainstRandom, isPlayerFirst }) {
    console.log("inside modal  is against random player= ", isAgainstRandom, "is player start = ", isPlayerFirst);
    return (
      <Modal
        show={show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
    >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Game Settings
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Computer Settings */}
            <Form>
                <div>
                  {'Computer: '}
                  <Form.Check inline 
                              label="Random" 
                              type={'radio'} 
                              name={'computer'} 
                              id={'randomComputer'}
                              checked={isAgainstRandom ? true : false}
                              onChange={handleOnChangeAgainstRandom}/>
                  <Form.Check inline 
                              label="AI" 
                              type={'radio'} 
                              name={'computer'} 
                              id={'AIComputer'}
                              checked={isAgainstRandom ? false : true }
                              onChange={handleOnChangeAgainstRandom}/>
                </div>
                <br/>
                <div>
                  {/* {'Who Start: '}
                  <Form.Check inline 
                              label="Computer" 
                              type={'radio'} 
                              name={'isPlayerFirst'} 
                              id={'startComputer'}
                              checked={isPlayerFirst ? false : true}
                              onChange={handleOnChangeWhoStart}
                              value={false}/>
                  <Form.Check inline 
                              label="Me" 
                              type={'radio'} 
                              name={'isPlayerFirst'} 
                              id={'startMe'}
                              checked={isPlayerFirst ? true : false }
                              onChange={handleOnChangeWhoStart}
                              value={true}/> */}
                </div>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCloseModal}>Save</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  