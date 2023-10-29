import React, { useState, useMemo } from 'react';
import { Button, Input } from "@nextui-org/react";
// import { useFormContext,useForm } from "react-hook-form";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure,Checkbox,Popover, PopoverTrigger, PopoverContent,Select, SelectItem} from "@nextui-org/react";
import axios from 'axios';

export const Boton = () => {
    const { isOpen: modal1Open, onOpen: onOpen1, onClose: onClose1 } = useDisclosure();
    const { isOpen: modal2Open, onOpen: onOpen2, onClose: onClose2 } = useDisclosure();
    const { isOpen: modal3Open, onOpen: onOpen3, onClose: onClose3 } = useDisclosure();
    // const { isOpen: modallikeOpen, onOpen: onOpenlike, onClose: onCloselike } = useDisclosure();

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
    const [value, setValue] = useState('');
    const [value2, setValue2] = useState('');
    

    const validateRegisterIn = (value) => value.match(/[.$].*[.$]/);
    const validateRegisterOut = (value2) => value2.match(/[.$].*[.$]/);

    const isInvalid = useMemo(() => {
    return !validateRegisterIn(value);
    }, [value]);
    const isInvalid2 = useMemo(() => {
    return !validateRegisterIn(value2);
    }, [value2]);

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
            setTimeout(function(){
            location.reload();
            }, 1000);
            
            
        } catch (error) {
            console.log(error);
            setMessage('Error en la solicitud');
            
        }
        
    }

    const inSubmit =  (e) => {
        e.preventDefault();
        if (!isInvalid) {
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
        else {
            window.alert("Inserte un valor valido");
        }
        }


    const outSubmit =  () => {
        e.preventDefault();
        if (!isInvalid2){

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
    }
    
    

    return (
        <>
            
            <Button color="primary" variant="ghost" size='lg' onClick={handleBoton1}>
                Crear cuenta
            </Button>
            <Modal isOpen={modal1Open} onClose={onClose1} isDismissable={false} className='dark'>
                <ModalContent color= '#131516'>
                    <ModalHeader className="flex flex-col gap-1 text-white">Cree su cuenta</ModalHeader>
                    <form className='flex flex-col gap-4' onSubmit={handleAccount}>
                    <ModalBody>

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
                                min="1"
                                max="12"
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

                        <Button type='submit' >Enviar</Button>
                        {/* onPress={onClose1} */}
                        
                    </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
            

            <Button color="primary" variant="ghost" size='lg' onClick={handleBoton2}>
                Registro de entrada
            </Button>

            <Modal isOpen={modal2Open} onClose={onClose2} isDismissable={false} className='dark'>
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1 text-white">Inserte el código</ModalHeader>
                    <form onSubmit={inSubmit}>

                    <ModalBody>
                        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                            <Input
                                className='text-white'
                                label="Entrada"
                                type='password'
                                placeholder="Escanee el código qr"
                                value={entrada}
                                variant="bordered"
                                isRequired
                                isInvalid={isInvalid}
                                color={isInvalid ? "default" : "success"}
                                onValueChange={setValue}
                                onChange={(e) => setEntrada(e.target.value)}
                                />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onClick={onClose2}>
                            Close
                        </Button>
                        <Button type='submit'>Enviar</Button>
                    </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>

            <Button color="primary" variant="ghost" size='lg' onClick={handleBoton3}>
                Registro de salida
            </Button>
            <Modal isOpen={modal3Open} onClose={onClose3} isDismissable={false} className='dark'>
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1 text-white">Inserte el código</ModalHeader>
                    
                    <form onSubmit={outSubmit}>
                    <ModalBody>
                        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                            <Input 
                            className='text-white'
                            label="Entrada"
                            type='password'
                            placeholder="Escanee el código qr"
                            value={salida}
                            variant="bordered"
                            isRequired
                            isInvalid={isInvalid2}
                            color={isInvalid2 ? "default" : "success"}
                            onValueChange={setValue2}
                            onChange={(e) => setSalida(e.target.value)}
                            />
                        </div>
                        
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onClick={onClose3}>
                            Close
                        </Button>

                        <Button>Enviar</Button>
                        
                    </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    );
};
