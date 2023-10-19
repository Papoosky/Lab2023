import React, { useState } from 'react';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link} from "@nextui-org/react";
import axios from 'axios';
import ReactDOM from 'react-dom';
import QRCode from 'react-qr-code';

export const Botonlogin = () => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [qrCodeComponent, setQRCodeComponent] = useState(null);

  const handleClick = async (event) => {
    try {
        const response = await axios.post('http://localhost:5000/login',
        { "email": email, "password": password },
        {
          headers: { 'Content-Type': 'application/json' }
        }
        );
        console.log(response); 
        const qrCodeData = response.data;
        
        setQRCodeComponent(qrCodeData);
        
    } catch (error) {
        console.log(error);
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
              <ModalHeader className="flex flex-col gap-1">Mostrar qr</ModalHeader>
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
              {qrCodeComponent && (
                    <QRCode
                        title="GeeksForGeeks"
                        value={qrCodeComponent}
                        size={300}
                        bgColor="#FFFFFF"
                        renderAs="svg"

                    />
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cerrar
                </Button>
                <Button color="primary" onClick={handleClick}>
                  Mostrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      
    </>
    );
}
