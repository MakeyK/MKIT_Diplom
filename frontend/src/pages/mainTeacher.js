import React, { useState } from "react";
import { Card, Container, Form, Button, Modal, Col, Row, Table } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
import NavBarTeacher from '../components/NavBarInstruktor'
import { ADDOCHENKATEACHER_ROUTE, MAINTEACHER_ROUTE, PROFILETEACHER_ROUTE } from '../utils/consts'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

const MainTeacher = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const students = [
        {
            id: 1,
            discipline: 'Веб-дизайн и разработка',
            name: 'Саулина Юлия Викторовна',
            group: '9 ГД-321',
            semester: '1 (2024)',
            remarks: 'Отсутствуют',
            grade: '5'
        },
        {
            id: 2,
            discipline: 'Веб-дизайн и разработка',
            name: 'Макеев Владимир Николаевич',
            group: '9 ИС-223',
            semester: '2 (2025)',
            remarks: 'Отсутствуют',
            grade: '4'
        }
    ];

    return (
        <div style={{ display: 'flex', minHeight: '100vh', fontFamily: '"Press Start 2P", cursive', backgroundColor: '#2D2D2D' }}>
            <div style={{ width: '300px', backgroundColor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px 0' }}>
                <Button
                    variant={"light"}
                    style={{ width: '236px', height: '70px', marginTop: '188px', borderRadius: '40px', color: 'black', fontSize: '20px', backgroundColor: '#2FDBBC' }}
                    onClick={() => navigate(MAINTEACHER_ROUTE)}>
                    Главная
                </Button>
                <Button
                    variant={"light"}
                    style={{ width: '236px', height: '70px', borderRadius: '40px', color: 'black', fontSize: '20px', marginTop: '50px' }}
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
                        {[DropdownButton].map((DropdownType, idx) => (
                            <DropdownType
                                style={{ fontSize: '20px', backgroundColor: '#2FDBBC', border: 'none', marginLeft: '20px' }}
                                as={ButtonGroup}
                                key={idx}
                                variant="#2FDBBC"
                                id={`dropdown-button-drop-${idx}`}
                                size="lg"
                                title="Группа">
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
                        <div style={{ width: 1401, height: 192, position: 'relative', borderRadius: 40, marginTop: '80px' }}>
                            <Button
                                style={{ width: 132, height: 46, left: 1205, top: 27, position: 'absolute', background: '#2FDBBC', borderRadius: 40, textAlign: 'center', color: 'black', fontSize: 12, border: 'none', fontWeight: '400', wordWrap: 'break-word' }}
                                onClick={() => setShowModal(true)}>
                                Изменить оценку
                            </Button>
                            <div style={{ width: 1401, height: 5, left: 0, top: 82, position: 'absolute', background: 'white', borderRadius: 40 }} />
                            <div style={{ width: 1401, height: 5, left: 0, top: 187, position: 'absolute', background: 'white', borderRadius: 40 }} />
                            <div style={{ width: 200, height: 34, left: 44, top: 15, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 16, fontFamily: 'Press Start 2P', fontWeight: '400', wordWrap: 'break-word' }}>Веб-дизайн и разработкка</div>
                            <div style={{ width: 197, height: 34, left: 287, top: 15, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 16, fontFamily: 'Press Start 2P', fontWeight: '400', wordWrap: 'break-word' }}>Саулина Юлия Викторовна</div>
                            <div style={{ width: 133, height: 16, left: 522, top: 24, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 16, fontFamily: 'Press Start 2P', fontWeight: '400', wordWrap: 'break-word' }}>9 ГД-321</div>
                            <div style={{ width: 129, height: 16, left: 724, top: 24, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 16, fontFamily: 'Press Start 2P', fontWeight: '400', wordWrap: 'break-word' }}>1 (2024)</div>
                            <div style={{ width: 179, height: 16, left: 946, top: 24, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 16, fontFamily: 'Press Start 2P', fontWeight: '400', wordWrap: 'break-word' }}>Отсутствуют</div>
                            <div style={{ width: 31, height: 16, left: 1258, top: 0, position: 'absolute', textAlign: 'center', color: '#FF4242', fontSize: 16, fontFamily: 'Press Start 2P', fontWeight: '400', wordWrap: 'break-word' }}>5</div>
                            <div style={{ width: 200, height: 34, left: 44, top: 120, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 16, fontFamily: 'Press Start 2P', fontWeight: '400', wordWrap: 'break-word' }}>Веб-дизайн и разработкка</div>
                            <div style={{ width: 197, height: 48, left: 287, top: 120, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 16, fontFamily: 'Press Start 2P', fontWeight: '400', wordWrap: 'break-word' }}>Макеев Владимир Николаевич</div>
                            <div style={{ width: 133, height: 16, left: 522, top: 129, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 16, fontFamily: 'Press Start 2P', fontWeight: '400', wordWrap: 'break-word' }}>9 ИС-223</div>
                            <div style={{ width: 130, height: 16, left: 723, top: 125, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 16, fontFamily: 'Press Start 2P', fontWeight: '400', wordWrap: 'break-word' }}>2 (2025)</div>
                            <div style={{ width: 179, height: 16, left: 946, top: 129, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 16, fontFamily: 'Press Start 2P', fontWeight: '400', wordWrap: 'break-word' }}>Отсутствуют</div>
                            <div style={{ width: 31, height: 16, left: 1258, top: 105, position: 'absolute', textAlign: 'center', color: '#FF4242', fontSize: 16, fontFamily: 'Press Start 2P', fontWeight: '400', wordWrap: 'break-word' }}>4<br /></div>
                            <Button
                                style={{ width: 132, height: 46, left: 1205, top: 132, position: 'absolute', background: '#2FDBBC', borderRadius: 40, textAlign: 'center', color: 'black', fontSize: 12, border: 'none', fontWeight: '400', wordWrap: 'break-word' }}
                                onClick={() => setShowModal(true)}>
                                Изменить оценку
                            </Button>
                        </div>

                        <Modal
                            style={{ fontFamily: '"Press Start 2P", cursive', }}
                            show={showModal} onHide={() => setShowModal(false)}>
                            <Modal.Header closeButton>
                                <Modal.Title>Изменение оценки</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {[DropdownButton].map((DropdownType, idx) => (
                                    <DropdownType
                                        style={{ fontSize: '12px', border: 'none', float: 'left', backgroundColor: '#D7D7D7' }}
                                        as={ButtonGroup}
                                        key={idx}
                                        variant="#D7D7D7"
                                        id={`dropdown-button-drop-${idx}`}
                                        size="lg"
                                        title="Выберите оценку">
                                        <Dropdown.Item style={{ fontSize: '12px', border: 'none', backgroundColor: '#D7D7D7' }} eventKey="1">5</Dropdown.Item>
                                        <Dropdown.Item style={{ fontSize: '12px', border: 'none', backgroundColor: '#D7D7D7' }} eventKey="2">4</Dropdown.Item>
                                        <Dropdown.Item style={{ fontSize: '12px', border: 'none', backgroundColor: '#D7D7D7' }} eventKey="2">3</Dropdown.Item>
                                        <Dropdown.Item style={{ fontSize: '12px', border: 'none', backgroundColor: '#D7D7D7' }} eventKey="2">2</Dropdown.Item>
                                    </DropdownType>
                                ))}
                            </Modal.Body>
                            <Modal.Footer>
                                <Button
                                    style={{ borderRadius: '40px', color: 'black', fontSize: '12px', backgroundColor: '#2FDBBC', border: 'none' }}
                                    onClick={() => setShowModal(false)}>
                                    Отмена
                                </Button>
                                <Button
                                    style={{ borderRadius: '40px', color: 'black', fontSize: '12px', backgroundColor: '#2FDBBC', border: 'none' }}
                                    onClick={() => setShowModal(false)}>
                                    Изменить оценку
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </Card>
            </Container>
            <NavBarTeacher />
        </div>
    );
};

export default MainTeacher;