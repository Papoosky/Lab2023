import React, { useState } from 'react';
import { Button, Input } from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure,Checkbox,Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import like from "../assets/like.svg";
import axios from 'axios';

export const Boton = () => {
    const { isOpen: modal1Open, onOpen: onOpen1, onClose: onClose1 } = useDisclosure();
    const { isOpen: modal2Open, onOpen: onOpen2, onClose: onClose2 } = useDisclosure();
    const { isOpen: modal3Open, onOpen: onOpen3, onClose: onClose3 } = useDisclosure();
    const { isOpen: modallikeOpen, onOpen: onOpenlike, onClose: onCloselike } = useDisclosure();

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [carrera, setCarrera] = useState('');
    const [ano, setAno] = useState(0);
    const [magister, setMagister] = useState(false);
    const [message, setMessage] = useState('');
    const [transcript, setTranscript] = useState('');


    const handleCloseAll = () => {
        onClose1();
        onClose2();
        onClose3();
        onCloselike();
    };

    const handleBoton1 = () => {
        onOpen1();
    };

    const handleBoton2 = () => {
        onOpen2();
    };

    const handleBoton3 = () => {
        onOpen3();
    };
    const handleBotonlike = () => {
        onOpenlike();
    };
    // const handleAction = () => {
    //     // setTimeout(function(){
    //     //     location.reload();
    //     // }, 1000);


    // };

    const handleTest = () => {
        try {
            const response = axios.post('http://localhost:5000/post_data_test', {
                transcript
            });
            setMessage('Solicitud exitosa');
            console.log(response);
        } catch (error) {
            console.log(error);
            setMessage('Error en la solicitud');
        }
    }

    const handleAction = () => {
        try {
            const response = axios.post('http://localhost:5000/post_data', {
                nombre,
                apellido,
                email,
                carrera,
                ano,
                magister,
            });
            setMessage('Solicitud exitosa');
            console.log(response);
            
            
        } catch (error) {
            console.log(error);
            setMessage('Error en la solicitud');
            
        }

        console.log(nombre);
        console.log(apellido);
        console.log(email);
        console.log(carrera);
        console.log(ano);
        console.log(magister);
        
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



                        <button onClick={handleAction}>Enviar</button>
                        <Modal isOpen={modallikeOpen} onClose={onCloselike}  className='dark'>
                            <ModalContent>
                                <ModalHeader className="flex flex-col gap-1 text-white">Ha creado la wea con éxito</ModalHeader>
                                <img src = {like} alt="Mi SVG feliz"/>
                                {/* <ModalBody>
                                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                        <Input isRequired className='text-white' />
                                    </div>
                                </ModalBody> */}
                                {/* <ModalFooter>
                                    <Button color="danger" variant="light" onClick={onClose2}>
                                        Close
                                    </Button>
                                </ModalFooter> */}
                            </ModalContent>
                        </Modal>




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
                            {/* <Input isRequired className='text-white' /> */}
                            <Input
                                className='text-white'
                                label="Transcript"
                                placeholder="0"
                                value={transcript}
                                onChange={(e) => setTranscript(e.target.value)}
                                />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onClick={onClose2}>
                            Close
                        </Button>
                        <Popover placement="right" color="success">
                            <PopoverTrigger>
                                <Button color="primary" className="capitalize" onClick={handleTest} >
                                    Enviar 
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent>
                                <div className="px-1 py-2">
                                <div className="text-large font-bold">Cuenta creada con exito! 👍🏿🔥🥵🍆</div>
                                </div>
                            </PopoverContent>
                            </Popover>
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

                        <button onClick={handleBotonlike}>Enviarasdasd</button>
                        <Modal isOpen={modallikeOpen} onClose={handleCloseAll} onClick={handleCloseAll}  className='dark'>
                            <ModalContent>
                                <ModalHeader className="flex flex-col gap-1 text-white">Ha creado la wea con éxito</ModalHeader>
                                <img src = {like} alt="Mi SVG feliz" className='w-14'/>
                                <ModalBody>
                                    {/* <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                        <Input isRequired className='text-white' />
                                    </div> */}
                                </ModalBody>
                                {/* <ModalFooter>
                                    <Button color="danger" variant="light" onClick={onClose2}>
                                        Close
                                    </Button>
                                </ModalFooter> */}
                            </ModalContent>
                        </Modal>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};
