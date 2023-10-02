import React, { useState } from 'react';
import { Button, Input } from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure,Checkbox } from "@nextui-org/react";

export const Boton = () => {
    const { isOpen: modal1Open, onOpen: onOpen1, onClose: onClose1 } = useDisclosure();
    const { isOpen: modal2Open, onOpen: onOpen2, onClose: onClose2 } = useDisclosure();
    const { isOpen: modal3Open, onOpen: onOpen3, onClose: onClose3 } = useDisclosure();

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [carrera, setCarrera] = useState('');
    const [ano, setAno] = useState(0);
    const [magister, setMagister] = useState(false);
    const [message, setMessage] = useState('');


    const handleBoton1 = () => {
        onOpen1();
    };

    const handleBoton2 = () => {
        onOpen2();
    };

    const handleBoton3 = () => {
        onOpen3();
    };

    const handlePostData = () => {
        Axios.post('http://localhost:3306', {
            nombre,
            apellido,
            email,
            carrera,
            ano,
            magister,
        })
        .then((response) => {
            // La solicitud se ha realizado con éxito, puedes manejar la respuesta aquí
            setMessage('Solicitud exitosa');
        })
        .catch((error) => {
            // Ha ocurrido un error en la solicitud, puedes manejar el error aquí
            setMessage('Error en la solicitud');
        });
    }

    return (
        <>
            <Button color="primary" variant="ghost" size='lg' onClick={handleBoton1}>
                Crear cuenta
            </Button>
            <Modal isOpen={modal1Open} onClose={onClose1} isDismissable={false} className='dark'>
                <ModalContent color= '#131516'>
                    <ModalHeader className="flex flex-col gap-1 text-white">Cree su cuenta</ModalHeader>
                    <ModalBody>
                        <div className="flex w-full md:flex-nowrap gap-4">
                            <Input label="Nombre" isRequired className='text-white' value={nombre} onChange={(e) => setNombre(e.target.value)}/>
                            <Input label="Apellido" isRequired className='text-white' value={apellido} onChange={(e) => setApellido(e.target.value)}/>
                        </div>
                        <div>
                            <Input type="email" label="Email" placeholder="Enter your email" isRequired className='text-white' value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className="flex w-full md:flex-nowrap gap-4">
                            <Input label="Carrera" placeholder="Enter your email" isRequired className='text-white' value={carrera} onChange={(e) => setCarrera(e.target.value)}/>
                            <Input
                                className='text-white'
                                type="number"
                                label="Año"
                                placeholder="0"
                                value={ano}
                                onChange={(e) => setAno(e.target.value)}
                                />
                            <Checkbox defaultSelected={magister} size="sm" onChange={() => setMagister(!magister)}>Magister</Checkbox>
                        </div>
                        

                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onClick={onClose1}>
                            Close
                        </Button>
                        <Button color="primary" onClick={onClose1} onClick={handlePostData}>
                            Action
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Button color="primary" variant="ghost" size='lg' onClick={handleBoton2}>
                Registro de entrada
            </Button>

            <Modal isOpen={modal2Open} onClose={onClose2} isDismissable={false} className='dark'>
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1 text-white">Inserte el código</ModalHeader>
                    <ModalBody>
                        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                            <Input isRequired className='text-white' />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onClick={onClose2}>
                            Close
                        </Button>
                        <Button color="primary" onClick={onClose2}>
                            Action
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Button color="primary" variant="ghost" size='lg' onClick={handleBoton3}>
                Registro de salida
            </Button>
            <Modal isOpen={modal3Open} onClose={onClose3} isDismissable={false} className='dark'>
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1 text-white">Inserte el código</ModalHeader>
                    <ModalBody>
                        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                            <Input isRequired className='text-white'/>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onClick={onClose3}>
                            Close
                        </Button>
                        <Button color="primary" onClick={onClose3}>
                            Action
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};
