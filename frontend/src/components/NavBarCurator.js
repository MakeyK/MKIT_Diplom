import React, { useContext, useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import { observer } from "mobx-react-lite";
import Container from "react-bootstrap/Container";
import { useNavigate } from 'react-router-dom';
import { Context } from "../index";
import { Button } from "react-bootstrap";
import { TECHNICALSUPPORTTEACHER_ROUTE } from "../utils/consts";
import logo from '../files/logotip.png';
import profileIcon from '../files/user.png';
import { getCuratorGroup } from "../http/userApi";
import { $authHost, $host } from "../http/index";

const NavBarCurator = observer(() => {
    const navigate = useNavigate();
    const [groupName, setGroupName] = useState("9ИБ-124");
    const { user } = useContext(Context);

    useEffect(() => {
        const loadGroup = async () => {
            try {
                console.log('[Frontend] Запрос группы...');
                const response = await $host.get('api/mkit/curator/my-group'); // Прямой запрос без обёртки
                console.log('[Frontend] Ответ:', response.data);
                setGroupName(response.data.groupName || 'Группа не указана');
            } catch (e) {
                console.error('[Frontend] Ошибка:', e.response?.data || e.message);
                setGroupName('Ошибка: ' + (e.response?.data?.message || e.message));
            }
        };
    
        if (user.isAuth) {
            console.log('[Frontend] Пользователь авторизован, id:', user.user?.id);
            loadGroup();
        }
    }, [user.isAuth]);
    const goToSupport = () => {
        navigate(TECHNICALSUPPORTTEACHER_ROUTE);
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '50px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                        <span style={{ fontSize: '16px', color: '#000', fontWeight: '500' }}>
                            Моя группа
                        </span>
                        <div style={{ width: '170px', height: '40px', backgroundColor: '#D7D7D7', borderRadius: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', color: '#2FDBBC' }}>
                            {/* 9ИС-321 */}
                            {groupName}
                        </div>
                    </div>
                    <Button
                        variant="link"
                        style={{ color: '#000', width: '160px', textDecoration: 'none', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '500', padding: '8px 16px', borderRadius: '20px', transition: 'all 0.3s', ':hover': { backgroundColor: '#2FDBBC', color: '#fff' } }}
                        onClick={goToSupport}>
                        Тех. поддержка
                    </Button>


                    <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#2FDBBC', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
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

export default NavBarCurator;