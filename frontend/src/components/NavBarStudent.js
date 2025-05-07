import React, { useContext, useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import { observer } from "mobx-react-lite";
import Container from "react-bootstrap/Container";
import { useNavigate } from 'react-router-dom';
import { Context } from "../index";
import { Button } from "react-bootstrap";
import { TECHNICALSUPPORTSTUDENT_ROUTE } from "../utils/consts";
import logo from '../files/logotip.png';
import profileIcon from '../files/user.png';

const NavBarStudent = observer(() => {
    const navigate = useNavigate();
    const { student } = useContext(Context);
    const [students, setStudents] = useState([]);
    const [groups, setGroups] = useState([]);
    const [ratings, setRatings] = useState({
        groupRating: 0,
        generalRating: 0,
        totalStudents: 0
    });

    // useEffect(() => {
    //     fetchStudents().then(data => setStudents(data));
    //     fetchGroups().then(data => setGroups(data));
    // }, []);

    // const calculateGroupRating = (groupId) => {
    //     if (!students.length || !groups.length) return 0;
        
    //     const groupStudents = students.filter(s => s.id_group === groupId);
    //     if (!groupStudents.length) return 0;
        
    //     const groupAverage = groupStudents.reduce((sum, student) => {
    //         return sum + (student.average_grade || 0);
    //     }, 0) / groupStudents.length;
        
    //     return Math.min(5, Math.max(1, Math.round(groupAverage)));
    // };

    // const calculateGeneralRating = (studentId) => {
    //     if (!students.length) return { position: 0, total: 0 };
        
    //     const sortedStudents = [...students].sort((a, b) => 
    //         (b.average_grade || 0) - (a.average_grade || 0));
        
    //     const position = sortedStudents.findIndex(s => s.id === studentId) + 1;
        
    //     return {
    //         position,
    //         total: students.length
    //     };
    // };

    // useEffect(() => {
    //     if (student.isAuth && student.student.id_group && student.student.id) {
    //         const generalRating = calculateGeneralRating(student.student.id);
    //         setRatings({
    //             groupRating: calculateGroupRating(student.student.id_group),
    //             generalRating: generalRating.position,
    //             totalStudents: generalRating.total
    //         });
    //     }
    // }, [student.isAuth, students, groups]);


    const goToSupport = () => {
        navigate(TECHNICALSUPPORTSTUDENT_ROUTE);
    };

    return (
        <Navbar style={{ height: '100px', backgroundColor: 'white', width: '100vw', padding: '0 60px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }} fixed='top'>
            <Container fluid style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '130px' }}>
                    <img src={logo} alt="МКИТ" style={{ width: '160px', height: '70px', objectFit: 'contain' }} />
                    <input
                        type="text"
                        placeholder="Поиск..."
                        style={{ width: '550px', height: '45px', borderRadius: '40px', border: 'none', backgroundColor: '#2FDBBC', padding: '0 20px', fontSize: '16px', color: '#000', outline: 'none' }} />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '50px', marginLeft: '40px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '16px', fontWeight: '500', width: '110px' }}>
                            Общий рейтинг
                        </span>
                        <div style={{ width: '80px', height: '40px', color: '#2FDBBC', backgroundColor: '#D7D7D7', borderRadius: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 'bold' }}>
                            {/* {calculateGeneralRating()} */}
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '16px', fontWeight: '500', width: '110px' }}>
                            Рейтинг группы
                        </span>
                        <div style={{ width: '80px', height: '40px', color: '#2FDBBC', backgroundColor: '#D7D7D7', borderRadius: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 'bold' }}>
                            {/* {calculateGroupRating()} */}
                        </div>
                    </div>

                    <Button
                        variant="link"
                        style={{ color: '#000', textDecoration: 'none', fontSize: '16px', fontWeight: '500', padding: '8px 16px', borderRadius: '20px', transition: 'all 0.3s', ':hover': { backgroundColor: '#2FDBBC', color: '#fff' } }}
                        onClick={goToSupport}>
                        Тех. поддержка
                    </Button>
                    <div style={{ width: '120px', height: '80px', borderRadius: '50%', backgroundColor: '#2FDBBC', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: '60px', overflow: 'hidden' }}>
                        <img
                            src={profileIcon}
                            alt="Профиль"
                            style={{ width: '60px', height: '60px', objectFit: 'cover' }} />
                    </div>
                </div>
            </Container>
        </Navbar>
    );
});

export default NavBarStudent;