import React, { useState } from "react";
import { Card, Container, Form, Button } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
import NavBarStudent from '../components/NavBarStudent'
import { MAINSTUDENT_ROUTE } from '../utils/consts'

const TechnicalSupportStudent = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [subject, setSubject] = useState('');
    const [problem, setProblem] = useState('');

    return (
        <div style={{ display: 'flex', minHeight: '100vh', fontFamily: '"Press Start 2P", cursive', backgroundColor: '#2D2D2D' }}>
            <div style={{ width: '221px', backgroundColor: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0' }}>
                <Button
                    variant={"light"}
                    style={{ width: '180px', height: '58px', marginTop: '188px', borderRadius: '40px', color: 'black', fontSize: '20px' }}
                    onClick={() => navigate(MAINSTUDENT_ROUTE)}>
                    Главная
                </Button>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '50px' }}>
                    <span style={{ fontSize: '20px', marginBottom: '10px' }}>Куратор</span>
                    <div style={{ width: '200px', height: '44px', borderRadius: '40px', backgroundColor: '#D7D7D7', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '10px' }}>
                        <span style={{ color: '#2FDBBC', fontSize: '16px' }}>
                            Красавич Кристина С.
                            {/* Расчитать по таблице что за куратор */}
                        </span>
                    </div>
                </div>
            </div>

            <Container
                style={{ height: window.innerHeight - 54, position:'absolute', marginLeft: '254px' }}>
                <Card style={{ height: '830px', marginTop: '120px', width: '1600px' }} className="p-5">
                    <h2 style={{ color: '#2FDBBC', fontSize: '40px', textAlign: 'center', marginBottom: '60px' }}>
                        Создать обращение
                    </h2>

                    <Form className="d-flex flex-column align-items-center">
                        <Form.Control
                            style={{ width: '752px', height: '80px', borderRadius: '70px', border: "1px solid #D7D7D7", backgroundColor: '#D7D7D7', color: '#B4B4B4', fontSize: '20px', marginBottom: '20px', padding: '0 30px' }}
                            placeholder="Заголовок"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />

                        <Form.Control
                            style={{ width: '752px', height: '80px', borderRadius: '70px', border: "1px solid #D7D7D7", backgroundColor: '#D7D7D7', color: '#B4B4B4', fontSize: '20px', marginBottom: '20px', padding: '0 30px' }}
                            placeholder="Тема обращения"
                            value={subject}
                            onChange={e => setSubject(e.target.value)}
                        />

                        <Form.Control
                            as="textarea"
                            style={{ width: '752px', height: '285px', borderRadius: '30px', border: "1px solid #D7D7D7", backgroundColor: '#D7D7D7', color: '#B4B4B4', fontSize: '20px', marginBottom: '40px', padding: '30px', resize: 'none' }}
                            placeholder="Опишите проблему"
                            value={problem}
                            onChange={e => setProblem(e.target.value)}
                        />

                        <Button
                            style={{ borderRadius: '40px', height: '77px', width: '537px', fontSize: '26px', backgroundColor: '#2FDBBC', borderColor: '#2FDBBC', color: 'white' }}
                            onClick={() => {
                                alert('Обращение отправлено!');
                                navigate(-1);
                                // Реализовать отправку, запрос
                            }}>
                            Отправить
                        </Button>
                    </Form>
                </Card>
            </Container>
            <NavBarStudent />
        </div>
    );
};

export default TechnicalSupportStudent;