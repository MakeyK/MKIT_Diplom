import React, { useState } from "react";
import { Card, Container, Form, Button, FormCheck } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
import NavBarTeacher from '../components/NavBarInstruktor'
import { ADDOCHENKATEACHER_ROUTE, MAINTEACHER_ROUTE, PROFILETEACHER_ROUTE } from '../utils/consts'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import SplitButton from 'react-bootstrap/SplitButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';


const Add = () => {
    const navigate = useNavigate();

    return (
        <div style={{ display: 'flex', minHeight: '100vh', fontFamily: '"Press Start 2P", cursive', backgroundColor: '#2D2D2D' }}>
            <div style={{ width: '300px', backgroundColor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px 0' }}>
                <Button
                    variant={"light"}
                    style={{ width: '236px', height: '70px', marginTop: '188px', borderRadius: '40px', color: 'black', fontSize: '20px' }}
                    onClick={() => navigate(MAINTEACHER_ROUTE)}>
                    Главная
                </Button>
                <Button
                    variant={"light"}
                    style={{ width: '236px', height: '70px', borderRadius: '40px', color: 'black', fontSize: '20px', marginTop: '50px', backgroundColor: '#2FDBBC' }}
                    onClick={() => navigate(ADDOCHENKATEACHER_ROUTE)}>
                    Добавить оценку
                </Button>
                <Button
                    variant={"light"}
                    style={{ width: '236px', height: '70px', borderRadius: '40px', color: 'black', fontSize: '20px', marginTop: '50px' }}
                    onClick={() => navigate(PROFILETEACHER_ROUTE)}>
                    Профиль студента
                </Button>
            </div>

            <Container
                style={{ height: window.innerHeight - 54, position: 'absolute', marginLeft: '331px' }}>
                <Card style={{ height: '830px', marginTop: '120px', width: '1538px' }}>
                    <div style={{ marginTop: '20px', marginLeft: "117px" }}>
                        {[DropdownButton].map((DropdownType, idx) => (
                            <DropdownType
                                style={{ fontSize: '20px', border: 'none', width: '614px', backgroundColor: '#D7D7D7' }}
                                as={ButtonGroup}
                                key={idx}
                                variant="#D7D7D7"
                                id={`dropdown-button-drop-${idx}`}
                                size="lg"
                                title="Выберите студента">
                                <Dropdown.Item eventKey="1">Реализовать</Dropdown.Item>
                                <Dropdown.Item eventKey="2">Реализовать</Dropdown.Item>
                            </DropdownType>
                        ))}

                        {[DropdownButton].map((DropdownType, idx) => (
                            <DropdownType
                                style={{ fontSize: '20px', border: 'none', float: 'right', marginRight: '93px', width: '614px', backgroundColor: '#D7D7D7'}}
                                as={ButtonGroup}
                                key={idx}
                                variant="#D7D7D7"
                                id={`dropdown-button-drop-${idx}`}
                                size="lg"
                                title="Выберите оценку">
                                <Dropdown.Item eventKey="1">Реализовать</Dropdown.Item>
                                <Dropdown.Item eventKey="2">Реализовать</Dropdown.Item>
                            </DropdownType>
                        ))}
                    </div>

                    <div style={{ marginTop: '20px', marginLeft: "117px" }}>
                        {[DropdownButton].map((DropdownType, idx) => (
                            <DropdownType
                                style={{ fontSize: '20px', border: 'none', width: '614px', marginTop: '123px', backgroundColor: '#D7D7D7' }}
                                as={ButtonGroup}
                                key={idx}
                                variant="#D7D7D7"
                                id={`dropdown-button-drop-${idx}`}
                                size="lg"
                                title="Выберите дисциплину">
                                <Dropdown.Item eventKey="1">Реализовать</Dropdown.Item>
                                <Dropdown.Item eventKey="2">Реализовать</Dropdown.Item>
                            </DropdownType>
                        ))}

                        {/* Поле для замечаний */}
                        <div style={{ position: 'relative', marginTop: '20px', float: 'right', marginRight: '100px', marginTop: '100px' }}>
                            <div style={{ color: 'black', fontSize: '16px', fontFamily: '"Press Start 2P"', fontWeight: '400', marginBottom: '10px', marginLeft: '29px' }}>
                                Замечания (Не обязательно)
                            </div>

                            <Form.Control
                                as="textarea"
                                style={{ width: '614px', height: '250px', backgroundColor: '#D7D7D7', border: 'none', borderRadius: '40px', padding: '20px', fontFamily: '"Press Start 2P"', fontSize: '14px' }}
                                placeholder="Введите ваши замечания..." />
                        </div>
                    </div>
                    <div style={{ marginLeft: "117px" }}>
                        {[DropdownButton].map((DropdownType, idx) => (
                            <DropdownType
                                style={{ fontSize: '20px', border: 'none', width: '614px', backgroundColor: '#D7D7D7' }}
                                as={ButtonGroup}
                                key={idx}
                                variant="#D7D7D7"
                                id={`dropdown-button-drop-${idx}`}
                                size="lg"
                                title="Выберите семестр">
                                <Dropdown.Item eventKey="1">Реализовать</Dropdown.Item>
                                <Dropdown.Item eventKey="2">Реализовать</Dropdown.Item>
                            </DropdownType>
                        ))}
                    </div> 
                        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '150px'}}>
                    <Button
                        variant={"light"}
                        style={{ width: '430px', height: '77px', borderRadius: '40px', color: 'white', fontSize: '26px', backgroundColor: '#2FDBBC' }}>
                        Добавить оценку
                    </Button></div>
                </Card>
            </Container>
            <NavBarTeacher />
        </div>
    );
};

export default Add;