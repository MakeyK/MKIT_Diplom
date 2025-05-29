import React, { useState } from "react";
import { Card, Container, Form, Button } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
import NavBarAdmin from '../components/NavBarAdmin'
import { ADDOCHENKATEACHER_ROUTE, ADMINPANEL_ROUTE, MAINTEACHER_ROUTE, PROFILETEACHER_ROUTE } from '../utils/consts'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

const Admin = () => {
    const navigate = useNavigate();
    const feedbackData = {
        date: "27.03.2025",
        title: "Загрузка сайта",
        topic: "Ответ от сайта",
        message: "У меня с интернетом все хорошо, но сайт почему-то очень долго прогружается",
        sender: "Королёв Валентин С."
    };
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
                <Button
                    variant={"light"}
                    style={{ width: '236px', height: '70px', borderRadius: '40px', color: 'black', fontSize: '20px', marginTop: '50px', backgroundColor: '#2FDBBC' }}
                    onClick={() => navigate(ADMINPANEL_ROUTE)}>
                    Просмотр обращений
                </Button>
            </div>

            <Container
                style={{ height: window.innerHeight - 54, position: 'absolute', marginLeft: '331px' }}>
                <Card style={{ height: '830px', marginTop: '120px', width: '1538px' }}>
                    <div style={{ marginTop: '64px', marginLeft: "40px" }}>
                        {[DropdownButton].map((DropdownType, idx) => (
                            <DropdownType
                                style={{ fontSize: '20px', backgroundColor: '#2FDBBC', border: 'none', marginLeft: '20px' }}
                                as={ButtonGroup}
                                key={idx}
                                variant="#2FDBBC"
                                id={`dropdown-button-drop-${idx}`}
                                size="lg"
                                title="Сортировка">
                                <Dropdown.Item eventKey="1">Новые</Dropdown.Item>
                                <Dropdown.Item eventKey="2">Старые</Dropdown.Item>
                            </DropdownType>
                        ))}
                    </div>
                    <div style={{ backgroundColor: '#D7D7D7', height: '630px', width: '1477px', marginLeft: '32px', borderRadius: '40px', marginTop: '45px', position: 'relative' }}>
                        {/* Карточка обращения */}
                        <div style={{ width: '1395px', height: '265px', background: 'white', borderRadius: '20px', margin: '0 auto', position: 'relative', padding: '20px', marginTop: '37px' }}>
                            {/* Заголовки */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
                                <div style={{ width: '251px', textAlign: 'center' }}>
                                    <div style={{ color: 'black', fontSize: '20px', marginBottom: '10px' }}>Дата обращения</div>
                                    <div style={{ color: '#2FDBBC', fontSize: '24px' }}>{feedbackData.date}</div>
                                </div>

                                <div style={{ width: '183px', textAlign: 'center' }}>
                                    <div style={{ color: 'black', fontSize: '20px', marginBottom: '10px' }}>Заголовок</div>
                                    <div style={{ color: '#2FDBBC', fontSize: '20px' }}>{feedbackData.title}</div>
                                </div>

                                <div style={{ width: '229px', textAlign: 'center' }}>
                                    <div style={{ color: 'black', fontSize: '20px', marginBottom: '10px' }}>Тема обращения</div>
                                    <div style={{ color: '#2FDBBC', fontSize: '20px' }}>{feedbackData.topic}</div>
                                </div>

                                <div style={{ width: '454px', textAlign: 'center' }}>
                                    <div style={{ color: 'black', fontSize: '20px', marginBottom: '10px' }}>Текст</div>
                                    <div style={{ color: '#2FDBBC', fontSize: '16px' }}>{feedbackData.message}</div>
                                </div>
                            </div>

                            {/* Отправитель */}
                            <div style={{ position: 'absolute', bottom: '20px', left: '20px' }}>
                                <div style={{ color: 'black', fontSize: '20px', marginBottom: '10px' }}>Отправитель</div>
                                <div style={{ color: '#2FDBBC', fontSize: '20px', width:'224px' }}>{feedbackData.sender}</div>
                            </div>

                            {/* Разделительная линия */}
                            <div style={{ position: 'absolute', right: '20px', top: '60px', height: '170px', width: '5px', background: '#D7D7D7', borderRadius: '40px' }} />
                            
                        </div>
                    </div>
                </Card>
            </Container>
            <NavBarAdmin />
        </div>
    );
};

export default Admin;