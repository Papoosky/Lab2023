import React, { useState } from 'react';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link} from "@nextui-org/react";
import axios from 'axios';

export const Botonlogin = () => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleClick = async () => {
    try {
        const response = await axios.post('http://localhost:5000/login',
        { "email": email, "password": password },
        {
          headers: { 'Content-Type': 'application/json' }
        }
        );
        setMessage('Solicitud exitosa');
        console.log(response);
        
        
    } catch (error) {
        console.log(error);
        setMessage('Error en la solicitud');
        
    }
  }

  return (
    <>
      <Button onPress={onOpen} color="primary" variant="ghost" size='lg'>Mostrar QR</Button>
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="top-center"
        className='dark text-white'
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Email"
                  placeholder="Enter your email"
                  variant="bordered"
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}

                />
                <Input
                  
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  variant="bordered"
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose} onClick={handleClick}>
                  Sign in
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
    );
}
