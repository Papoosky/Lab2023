import React, { useState } from 'react';
import { Button, Input } from "@nextui-org/react";
import { useFormContext,useForm } from "react-hook-form";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure,Checkbox,Popover, PopoverTrigger, PopoverContent,Select, SelectItem} from "@nextui-org/react";
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
    const [password, setPassword] = useState('');
    const [carrera, setCarrera] = useState('');
    const [ano, setAno] = useState(0);
    const [magister, setMagister] = useState(false);
    const [message, setMessage] = useState('');
    const [salida, setSalida] = useState('');
    const [entrada, setEntrada] = useState('');


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
    // const handleAction = () => {
    //     // setTimeout(function(){
    //     //     location.reload();
    //     // }, 1000);
    // };
    const carreras = [
        { value: "Ingeniería Civil Industrial", label: "Ingeniería Civil Industrial" },
        { value: "Ingeniería Civil Informática", label: "Ingeniería Civil Informática"},
        { value: "Ingeniería Civil", label: "Ingeniería Civil" },
        { value: "Ingeniería Civil en Bioingeniería", label: "Ingeniería Civil en Bioingeniería" },
        { value: "Ingeniería Civil en Energía", label: "Ingeniería Civil en Energía" },
        { value: "Ingeniería Civil Mecánica", label: "Ingeniería Civil Mecánica" },
        { value: "Ingeniería Civil en Minería", label: "Ingeniería Civil en Minería" },
    ];

    const [selectedKeys, setSelectedKeys] = React.useState(new Set(["text"]));
    const selectedValue = React.useMemo(
        () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
        [selectedKeys]
    );

    const handleAccount = (e) => {
        e.preventDefault();
        try {
            const response = axios.post('http://localhost:5000/post_data', {
                nombre,
                apellido,
                email,
                password,
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

        console.log("nombre: ",nombre);
        console.log("apellido: ", apellido);
        console.log("email: ",email);
        console.log("passw: ",password);
        console.log("carrera: ",carrera);
        console.log("ano: ",ano);
        console.log("magister: ",magister);
        
    }

    const inSubmit =  () => {
        try {
            const response = axios.post('http://localhost:5000/post_data_in', {
                entrada
            });
            console.log(response);
        } catch (error) {
            console.log(error);
        }
        console.log(entrada)
        }


    const outSubmit =  () => {
        try {
            const response = axios.post('http://localhost:5000/post_data_out', {
                salida
            });
            console.log(response);
        } catch (error) {
            console.log(error);
        }
        console.log(salida)
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
                        <form className='flex flex-col gap-4'>

                        <div className="flex w-full md:flex-nowrap gap-4">
                            <Input label="Nombre" isRequired className='text-white' value={nombre} onChange={(e) => setNombre(e.target.value)} style={{ textTransform: 'capitalize' }}/>
                            <Input label="Apellido" isRequired className='text-white' value={apellido} onChange={(e) => setApellido(e.target.value)} style={{ textTransform: 'capitalize' }}/>
                        </div>
                        <div className='flex flex-col gap-4'>
                            <Input type="email" label="Email" placeholder="Enter your email" isRequired className='text-white' value={email} onChange={(e) => setEmail(e.target.value)}/>
                            <Input type="password" label="Password" placeholder="Enter your password" isRequired className='text-white' value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <div className="flex w-full md:flex-nowrap gap-4">
                        <Select
                            items={carreras}
                            value={carrera}
                            label="Carrera"
                            placeholder="Selecciona carrera"
                            className=" text-white"
                            isRequired
                            onChange={(e) => setCarrera(e.target.value)}
                            
                            >
                            {(carrera) => <SelectItem key={carrera.value}>{carrera.label}</SelectItem>}
                        </Select>
                        </div>
                        <div className="flex w-full md:flex-nowrap gap-16">
                            <Input
                                className='text-white max-w-fit'
                                isRequired
                                type="number"
                                label="Selecciona tu año"
                                placeholder="0"
                                value={ano}
                                onChange={(e) => setAno(e.target.value)}
                                />
                            <Checkbox defaultSelected={magister} size="sm" onChange={() => setMagister(!magister)}>Magister</Checkbox>
                        </div>
                        </form>
                        
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onClick={onClose1}>
                            Close
                        </Button>

                        <Button onClick={handleAccount} onPress={onClose1}>Enviar</Button>
                        
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
                                label="Entrada"
                                placeholder="Escanee el código qr"
                                value={entrada}
                                onChange={(e) => setEntrada(e.target.value)}
                                />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onClick={onClose2}>
                            Close
                        </Button>
                        <Popover placement="right" color="success">
                            <PopoverTrigger>
                                <Button color="primary" className="capitalize" onClick={inSubmit} >
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
                            <Input isRequired label='Salida' className='text-white' placeholder="Escanee el código qr" onChange={(e) => setSalida(e.target.value)}/>
                        </div>
                        
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onClick={onClose3}>
                            Close
                        </Button>

                        <Popover placement="right" color="success">
                            <PopoverTrigger>
                                <Button color="primary" className="capitalize" onClick={outSubmit} >
                                    Enviar 
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent>
                                <div className="px-1 py-2">
                                <div className="text-large font-bold">Registro exitoso! </div>
                                </div>
                            </PopoverContent>
                            </Popover>
                        
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};
