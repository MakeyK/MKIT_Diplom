import React, { useState } from "react";
import { Card, Container, Form, Button } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
import NavBarKurator from '../components/NavBarCurator'
import { MAINKURATOR_ROUTE, PROFILEKURATOR_ROUTE } from '../utils/consts'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';


const ProfileKurator = () => {
    const navigate = useNavigate();
    const students = [
        { id: 1, name: 'Золотенков Даниил В.', rank: 4, avgScore: 4.8 },
        { id: 2, name: 'Федоров Захар К.', rank: 5, avgScore: 4.6 },
        { id: 3, name: 'Дацук Виктория С.', rank: 6, avgScore: 4.4 },
        { id: 4, name: 'Суслова Алина М.', rank: 7, avgScore: 4.1 },
        { id: 5, name: 'Купер Евгений Д.', rank: 8, avgScore: 3.8 }
    ];
    return (
        <div style={{ display: 'flex', minHeight: '100vh', fontFamily: '"Press Start 2P", cursive', backgroundColor: '#2D2D2D' }}>
            <div style={{ width: '300px', backgroundColor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px 0' }}>
                <Button
                    variant={"light"}
                    style={{ width: '236px', height: '70px', marginTop: '188px', borderRadius: '40px', color: 'black', fontSize: '20px' }}
                    onClick={() => navigate(MAINKURATOR_ROUTE)}>
                    Главная
                </Button>
                <Button
                    variant={"light"}
                    style={{ width: '236px', height: '70px', borderRadius: '40px', color: 'black', fontSize: '20px', marginTop: '50px', backgroundColor: '#2FDBBC' }}
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
                                style={{ fontSize: '20px', backgroundColor: '#D7D7D7', borderRadius: '40px', width: '1468px' }}
                                as={ButtonGroup}
                                key={idx}
                                variant="#2FDBBC"
                                id={`dropdown-button-drop-${idx}`}
                                size="lg"
                                title="Выберите студента">
                                <Dropdown.Item eventKey="1">Реализовать</Dropdown.Item>
                                <Dropdown.Item eventKey="2">Реализовать</Dropdown.Item>
                            </DropdownType>
                        ))}
                    </div>


                    <div style={{ backgroundColor: '#D7D7D7', height: '650px', width: '1468px', marginLeft: '32px', borderRadius: '40px', marginTop: '45px', position: 'relative', padding: '20px' }}>
                        <div style={{ width: '627px', margin: '0 auto', textAlign: 'center', color: 'black', fontSize: '24px', fontFamily: '"Press Start 2P"', fontWeight: '400', lineHeight: '35.32px', marginBottom: '40px' }}>
                            Дацук Виктория Станиславовна 9 ИС-321
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', marginLeft: '78px' }}>
                            <div style={{ width: '700px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>

                                {/* Карточка курса */}
                                <div style={{ background: 'white', borderRadius: '20px', padding: '20px', textAlign: 'center', width: '282px', height: '121px' }}>
                                    <div style={{ fontSize: '24px', marginBottom: '20px' }}>
                                        Курс
                                    </div>
                                    <div style={{ color: '#2FDBBC', fontSize: '24px' }}>
                                        3
                                    </div>
                                </div>

                                {/* Карточка куратора */}
                                <div style={{ background: 'white', borderRadius: '20px', padding: '20px', textAlign: 'center', width: '282px', height: '121px' }}>
                                    <div style={{ color: 'black', fontSize: '24px', marginBottom: '20px' }}>
                                        Куратор
                                    </div>
                                    <div style={{
                                        color: '#2FDBBC', fontSize: '22px'
                                    }}>
                                        Иванов В.С
                                    </div>
                                </div>

                                {/* Карточка общего рейтинга */}
                                <div style={{ background: 'white', borderRadius: '20px', textAlign: 'center', width: '282px', height: '121px' }}>
                                    <div style={{ color: 'black', fontSize: '20px', marginBottom: '20px', marginTop:'10px' }}>
                                        Общий рейтинг
                                    </div>
                                    <div style={{ color: '#2FDBBC', fontSize: '24px' }}>
                                        75
                                    </div>
                                </div>

                                {/* Карточка специальности */}
                                <div style={{ background: 'white', borderRadius: '20px', textAlign: 'center', width: '282px', height: '121px' }}>
                                    <div style={{ color: 'black', fontSize: '18px', marginBottom: '18px', marginTop:'10px' }}>
                                        Специальность
                                    </div>
                                    <div style={{ color: '#2FDBBC', fontSize: '14px' }}>
                                        Информационные системы и программирование
                                    </div>
                                </div>

                                {/* Карточка рейтинга группы */}
                                <div style={{ background: 'white', borderRadius: '20px', textAlign: 'center', width: '282px', height: '121px' }}>
                                    <div style={{ color: 'black', fontSize: '15px', marginTop:'10px', marginBottom: '20px' }}>
                                        Рейтинг своей группы
                                    </div>
                                    <div style={{
                                        color: '#2FDBBC', fontSize: '24px'
                                    }}>
                                        6
                                    </div>
                                </div>
                            </div>

                            {/* Правая часть - таблица рейтинга */}
                            <div style={{ width: '528px', background: 'white', borderRadius: '20px', padding: '20px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px', borderBottom: '2px solid #D7D7D7', paddingBottom: '10px' }}>
                                    <div style={{ width: '70px', textAlign: 'center', fontSize:'16px' }}>Ранг</div>
                                    <div style={{ width: '250px', textAlign: 'center', fontSize:'16px'  }}>ФИО</div>
                                    <div style={{ width: '113px', textAlign: 'center', fontSize:'16px'  }}>Средний балл</div>
                                </div>

                                {/* Список студентов */}
                                {students.map(student => (
                                    <div key={student.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid #D7D7D7' }}>
                                        <div style={{ width: '50px', textAlign: 'center', color: '#2FDBBC', fontSize: '20px' }}>
                                            {student.rank}
                                        </div>
                                        <div style={{ width: '250px', textAlign: 'center', color: 'black', fontSize: '12px' }}>
                                            {student.name}
                                        </div>
                                        <div style={{ width: '100px', textAlign: 'center', color: '#2FDBBC', fontSize: '20px' }}>
                                            {student.avgScore}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Card>
            </Container>
            <NavBarKurator />
        </div>
    );
};

export default ProfileKurator;