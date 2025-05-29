import React, { useState } from "react";
import { Card, Container, Form, Button } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
import NavBarStudent from '../components/NavBarStudent'
import { MAINSTUDENT_ROUTE } from '../utils/consts'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';


const MainStudent = () => {
    const navigate = useNavigate();

    return (
        <div style={{ display: 'flex', minHeight: '100vh', fontFamily: '"Press Start 2P", cursive', backgroundColor: '#2D2D2D' }}>
            <div style={{ width: '221px', backgroundColor: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0' }}>
                <Button
                    variant={"light"}
                    style={{ width: '180px', height: '58px', marginTop: '188px', borderRadius: '40px', color: 'black', fontSize: '20px', backgroundColor: '#2FDBBC' }}
                    onClick={() => navigate(MAINSTUDENT_ROUTE)}>
                    Главная
                </Button>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '50px' }}>
                    <span style={{ fontSize: '20px', marginBottom: '10px' }}>Куратор</span>
                    <div style={{ width: '200px', height: '44px', borderRadius: '40px', backgroundColor: '#D7D7D7', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '10px' }}>
                        <span style={{ color: '#2FDBBC', fontSize: '16px' }}>
                            Пономарев Михаил Б.
                            {/* Расчитать по таблице что за куратор */}
                        </span>
                    </div>
                </div>
            </div>

            <Container
                style={{ height: window.innerHeight - 54, position: 'absolute', marginLeft: '254px' }}>
                <Card style={{ height: '830px', marginTop: '120px', width: '1600px' }}>
                    <p style={{ color: 'black', fontSize: '20px', justifyContent: 'center', display: 'flex', textAlign: 'center' }}>
                        Потапов Алексей Дмитриевич 9ИС-321
                        {/* Реализовать из базы данных */}
                    </p>
                    <div style={{ marginTop: '20px', marginLeft: "40px" }}>
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
                        {[DropdownButton].map((DropdownType, idx) => (
                            <DropdownType
                                style={{ fontSize: '20px', backgroundColor: '#2FDBBC', border: 'none', marginLeft: '20px' }}
                                as={ButtonGroup}
                                key={idx}
                                variant="#2FDBBC"
                                id={`dropdown-button-drop-${idx}`}
                                size="lg"
                                title="Преподаватель">
                                <Dropdown.Item eventKey="1">Реализовать</Dropdown.Item>
                                <Dropdown.Item eventKey="2">Реализовать</Dropdown.Item>
                            </DropdownType>
                        ))}
                        {[DropdownButton].map((DropdownType, idx) => (
                            <DropdownType
                                style={{ fontSize: '20px', backgroundColor: '#2FDBBC', border: 'none', marginLeft: '20px' }}
                                as={ButtonGroup}
                                key={idx}
                                variant="#2FDBBC"
                                id={`dropdown-button-drop-${idx}`}
                                size="lg"
                                title="Семестр">
                                <Dropdown.Item eventKey="1">Реализовать</Dropdown.Item>
                                <Dropdown.Item eventKey="2">Реализовать</Dropdown.Item>
                            </DropdownType>
                        ))}
                    </div>
                    <div style={{ backgroundColor: '#D7D7D7', height: '650px', width: '1535px', marginLeft: '32px', borderRadius: '40px', marginTop: '45px', position: 'relative' }}>
                        {[
                            { id: 1, text: 'Дисциплина', width: '207px', left: '30px' },
                            { id: 2, text: 'Преподаватель', width: '265px', left: '344px' },
                            { id: 3, text: 'Семестр', width: '144px', left: '696px' },
                            { id: 4, text: 'Курс', width: '85px', left: '907px' },
                            { id: 5, text: 'Оценка', width: '128px', left: '1059px' },
                            { id: 6, text: 'Замечания', width: '190px', left: '1274px' }
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
                        <div style={{ width: 1491, height: 274, position: 'relative', borderRadius: 40, marginTop:'90px' }}>
                            <div style={{ width: 1491, height: 5, left: 0, top: 69, position: 'absolute', background: 'white', borderRadius: 40 }} />
                            <div style={{ width: 200, height: 34, left: 22, top: 0, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 16, fontFamily: 'Press Start 2P', fontWeight: '400', wordWrap: 'break-word' }}>Психология общения</div>
                            <div style={{ width: 197, height: 34, left: 365, top: 3, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 16, fontFamily: 'Press Start 2P', fontWeight: '400', wordWrap: 'break-word' }}>Саулина Юлия Викторовна</div>
                            <div style={{ width: 33, height: 16, left: 917, top: 11, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 16, fontFamily: 'Press Start 2P', fontWeight: '400', wordWrap: 'break-word' }}>3</div>
                            <div style={{ width: 129, height: 16, left: 693, top: 10, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 16, fontFamily: 'Press Start 2P', fontWeight: '400', wordWrap: 'break-word' }}>1 (2024)</div>
                            <div style={{ width: 179, height: 16, left: 1272, top: 11, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 16, fontFamily: 'Press Start 2P', fontWeight: '400', wordWrap: 'break-word' }}>Отсутствуют</div>
                            <div style={{ width: 31, height: 16, left: 1103, top: 10, position: 'absolute', textAlign: 'center', color: '#FF4242', fontSize: 16, fontFamily: 'Press Start 2P', fontWeight: '400', wordWrap: 'break-word' }}>5</div>
                            <div style={{ width: 1491, height: 5, left: 0, top: 168, position: 'absolute', background: 'white', borderRadius: 40 }} />
                            <div style={{ width: 200, height: 34, left: 22, top: 99, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 16, fontFamily: 'Press Start 2P', fontWeight: '400', wordWrap: 'break-word' }}>Теория вероятностей</div>
                            <div style={{ width: 255, height: 34, left: 334, top: 101, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 16, fontFamily: 'Press Start 2P', fontWeight: '400', wordWrap: 'break-word' }}>Демчук Валентин Евгеньевич</div>
                            <div style={{ width: 1491, height: 5, left: 0, top: 269, position: 'absolute', background: 'white', borderRadius: 40 }} />
                            <div style={{ width: 200, height: 34, left: 22, top: 200, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 16, fontFamily: 'Press Start 2P', fontWeight: '400', wordWrap: 'break-word' }}>Графический дизайн и мультимедиа</div>
                            <div style={{ width: 251, height: 34, left: 332, top: 201, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 16, fontFamily: 'Press Start 2P', fontWeight: '400', wordWrap: 'break-word' }}>Морозова Алина Григорьевна</div>
                            <div style={{ width: 33, height: 16, left: 917, top: 211, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 16, fontFamily: 'Press Start 2P', fontWeight: '400', wordWrap: 'break-word' }}>3</div>
                            <div style={{ width: 129, height: 16, left: 693, top: 210, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 16, fontFamily: 'Press Start 2P', fontWeight: '400', wordWrap: 'break-word' }}>1 (2024)</div>
                            <div style={{ width: 179, height: 16, left: 1272, top: 200, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 16, fontFamily: 'Press Start 2P', fontWeight: '400', wordWrap: 'break-word' }}>Переделай домашнее задание</div>
                            <div style={{ width: 31, height: 16, left: 1103, top: 210, position: 'absolute', textAlign: 'center', color: '#FF4242', fontSize: 16, fontFamily: 'Press Start 2P', fontWeight: '400', wordWrap: 'break-word' }}>3</div>
                            <div style={{ width: 33, height: 16, left: 917, top: 110, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 16, fontFamily: 'Press Start 2P', fontWeight: '400', wordWrap: 'break-word' }}>3</div>
                            <div style={{ width: 129, height: 16, left: 693, top: 109, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 16, fontFamily: 'Press Start 2P', fontWeight: '400', wordWrap: 'break-word' }}>1 (2024)</div>
                            <div style={{ width: 179, height: 16, left: 1272, top: 110, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 16, fontFamily: 'Press Start 2P', fontWeight: '400', wordWrap: 'break-word' }}>Отсутствуют</div>
                            <div style={{ width: 31, height: 16, left: 1103, top: 109, position: 'absolute', textAlign: 'center', color: '#FF4242', fontSize: 16, fontFamily: 'Press Start 2P', fontWeight: '400', wordWrap: 'break-word' }}>3</div>
                        </div>
                    </div>
                </Card>
            </Container>
            <NavBarStudent />
        </div>
    );
};

export default MainStudent;