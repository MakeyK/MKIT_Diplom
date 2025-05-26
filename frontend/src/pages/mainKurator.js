import React, { useState } from "react";
import { Card, Container, Form, Button } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
import NavBarKurator from '../components/NavBarCurator'
import { MAINKURATOR_ROUTE, PROFILEKURATOR_ROUTE } from '../utils/consts'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';


const MainKurator = () => {
    const navigate = useNavigate();

    return (
        <div style={{ display: 'flex', minHeight: '100vh', fontFamily: '"Press Start 2P", cursive', backgroundColor: '#2D2D2D' }}>
            <div style={{ width: '300px', backgroundColor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px 0' }}>
                <Button
                    variant={"light"}
                    style={{ width: '236px', height: '70px', marginTop: '188px', borderRadius: '40px', color: 'black', fontSize: '20px', backgroundColor: '#2FDBBC' }}
                    onClick={() => navigate(MAINKURATOR_ROUTE)}>
                    Главная
                </Button>
                <Button
                    variant={"light"}
                    style={{ width: '236px', height: '70px', borderRadius: '40px', color: 'black', fontSize: '20px', marginTop: '50px' }}
                    onClick={() => navigate(PROFILEKURATOR_ROUTE)}>
                    Профиль студента
                </Button>
            </div>

            <Container
                style={{ height: window.innerHeight - 54, position: 'absolute', marginLeft: '331px' }}>
                <Card style={{ height: '830px', marginTop: '120px', width: '1538px' }}>
                    <div style={{ marginTop: '64px', marginLeft: "40px" }}>
                        {[DropdownButton].map((DropdownType, idx) => (
                            <DropdownType
                                style={{ fontSize: '20px', backgroundColor: '#2FDBBC', border: 'none' }}
                                as={ButtonGroup}
                                key={idx}
                                variant="#2FDBBC"
                                id={`dropdown-button-drop-${idx}`}
                                size="lg"
                                title="Дисциплина">
                                <Dropdown.Item eventKey="1">Реализовать</Dropdown.Item>
                                <Dropdown.Item eventKey="2">Реализовать</Dropdown.Item>
                            </DropdownType>
                        ))}
                    </div>
                    <div style={{ backgroundColor: '#D7D7D7', height: '650px', width: '1488px', marginLeft: '32px', borderRadius: '40px', marginTop: '45px', position: 'relative' }}>
                        {[
                            { id: 1, text: 'Дисциплина', width: '207px', left: '30px' },
                            { id: 2, text: 'Студент', width: '155px', left: '333px' },
                            { id: 3, text: 'Группа', width: '130px', left: '548px' },
                            { id: 4, text: 'Семестр', width: '153px', left: '738px' },
                            { id: 5, text: 'Замечания', width: '183px', left: '971px' },
                            { id: 6, text: 'Оценка', width: '128px', left: '1234px' }
                        ].map(header => (
                            <div
                                key={header.id}
                                style={{ height: '20px', top: '28px', position: 'absolute', textAlign: 'center', color: 'black', fontSize: '20px', fontFamily: '"Press Start 2P"', fontWeight: '400', wordWrap: 'break-word', width: header.width, left: header.left }}
                            >
                                {header.text}
                            </div>
                        ))}

                        {/* Разделительная линия */}
                        <div style={{ width: '1491px', height: '5px', left: '12px', top: '58px', position: 'absolute', background: 'white', borderRadius: '40px' }} />
                    </div>
                </Card>
            </Container>
            <NavBarKurator />
        </div>
    );
};

export default MainKurator;