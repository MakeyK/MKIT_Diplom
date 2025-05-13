import React, { useState } from "react";
import { Card, Container, Form, Button } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
import NavBarStudent from '../components/NavBarStudent'
import { MAINSTUDENT_ROUTE } from '../utils/consts'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import SplitButton from 'react-bootstrap/SplitButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';


const MainStudent = () => {
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
                style={{ height: window.innerHeight - 54, position: 'absolute', marginLeft: '254px' }}>
                <Card style={{ height: '830px', marginTop: '120px', width: '1600px' }}>
                    <p style={{ color: 'black', fontSize: '20px', justifyContent: 'center', display: 'flex', textAlign: 'center' }}>
                        ФИО и группа
                        {/* Реализовать из базы данных */}
                    </p>
                    {[DropdownButton].map((DropdownType, idx) => (
                        <DropdownType
                            style={{ width: '265px', height: '49px', fontSize: '20px' }}
                            as={ButtonGroup}
                            key={idx}
                            id={`dropdown-button-drop-${idx}`}
                            size="lg"
                            title="Дисциплина">
                            <Dropdown.Item eventKey="1">Реализовать</Dropdown.Item>
                            <Dropdown.Item eventKey="2">Реализовать</Dropdown.Item>
                        </DropdownType>
                    ))}
                    {[DropdownButton].map((DropdownType, idx) => (
                        <DropdownType
                            style={{ width: '265px', height: '49px', fontSize: '20px' }}
                            as={ButtonGroup}
                            key={idx}
                            id={`dropdown-button-drop-${idx}`}
                            size="lg"
                            title="Преподаватель">
                            <Dropdown.Item eventKey="1">Реализовать</Dropdown.Item>
                            <Dropdown.Item eventKey="2">Реализовать</Dropdown.Item>
                        </DropdownType>
                    ))}
                    {[DropdownButton].map((DropdownType, idx) => (
                        <DropdownType
                            style={{ width: '265px', height: '49px', fontSize: '20px' }}
                            as={ButtonGroup}
                            key={idx}
                            id={`dropdown-button-drop-${idx}`}
                            size="lg"
                            title="Семестр">
                            <Dropdown.Item eventKey="1">Реализовать</Dropdown.Item>
                            <Dropdown.Item eventKey="2">Реализовать</Dropdown.Item>
                        </DropdownType>
                    ))}
                </Card>
            </Container>
            <NavBarStudent />
        </div>
    );
};

export default MainStudent;