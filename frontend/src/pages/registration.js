import React, { useContext, useState, useEffect } from "react";
import { Card, Container, Form, Button, Col } from 'react-bootstrap'
import { AUTH_ROUTE } from "../utils/consts";
import { NavLink, useNavigate } from "react-router-dom";
import { registration } from "../http/userApi";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import fon from '../files/fon.png'

const Registration = observer(() => {
    const { user } = useContext(Context);
    const navigate = useNavigate();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [secretKey, setSecretKey] = useState('');

    useEffect(() => {
        document.body.style.backgroundImage = `url(${fon})`;
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
        document.body.style.backgroundAttachment = "fixed";
        document.body.style.backgroundRepeat = "no-repeat";
        
        return () => {
            document.body.style.backgroundImage = "";
            document.body.style.backgroundSize = "";
            document.body.style.backgroundPosition = "";
            document.body.style.backgroundAttachment = "";
            document.body.style.backgroundRepeat = "";
        };
    }, []);

    const click = async () => {
        try {
            const response = await registration(login, password, email, secretKey);
            user.setUser();
            user.setIsAuth(true);
        }
        catch (e) {
            alert(e.response.data.message);
        }
    }

    return (
        <Container
            className='d-flex justify-content-center align-items-center'
            style={{
                height: window.innerHeight - 54,
                fontFamily: '"Press Start 2P", cursive'
            }}>
            <Card style={{ width: '900px', height: '722px', borderRadius: '100px', padding: '60px 40px' }} className="p-5">
                <h2 style={{
                    color: '#2FDBBC', fontSize: '48px', textAlign: 'center', marginBottom: '60px'
                }}>Регистрация</h2>

                <Form className="d-flex flex-column align-items-center">
                    <Form.Control
                        style={{ width: '600px', height: '80px', borderRadius: '70px', border: "1px solid #D7D7D7", backgroundColor: '#D7D7D7', color: '#B4B4B4', fontSize: '20px', marginBottom: '20px', padding: '0 30px' }}
                        placeholder="Введите логин..."
                        value={login}
                        onChange={e => setLogin(e.target.value)}
                    />

                    <Form.Control
                        style={{ width: '600px', height: '80px', borderRadius: '70px', border: "1px solid #D7D7D7", backgroundColor: '#D7D7D7', color: '#B4B4B4', fontSize: '20px', marginBottom: '20px', padding: '0 30px' }}
                        placeholder="Введите пароль..."
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />

                    <Form.Control
                        style={{
                            width: '600px', height: '80px', borderRadius: '70px', border: "1px solid #D7D7D7", backgroundColor: '#D7D7D7', color: '#B4B4B4', fontSize: '20px', marginBottom: '20px', padding: '0 30px'
                        }}
                        placeholder="Введите почту..."
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        type="email"
                    />

                    <Form.Control
                        style={{
                            width: '600px', height: '80px', borderRadius: '70px', border: "1px solid #D7D7D7", backgroundColor: '#D7D7D7', color: '#B4B4B4', fontSize: '20px', marginBottom: '40px', padding: '0 30px'
                        }}
                        placeholder="Секретный ключ (если есть)"
                        value={secretKey}
                        onChange={e => setSecretKey(e.target.value)}
                    />

                    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '40px', justifyContent: 'space-between', marginRight: '522px' }}>
                        <p style={{ color: 'black', fontSize: '16px', marginBottom: '10px' }}>
                            Есть аккаунт?
                        </p>
                        <NavLink to={AUTH_ROUTE}
                            style={{ color: 'black', fontSize: '16px', textDecoration: 'underline' }}>
                            Войти
                        </NavLink>
                    </div>

                    <Button
                        style={{
                            borderRadius: '40px', height: '77px', width: '537px', fontSize: '26px', marginTop: '60px', backgroundColor: '#2FDBBC', borderColor: '#2FDBBC', color: 'white'
                        }}
                        onClick={click}>
                        Зарегистрироваться
                    </Button>
                </Form>
            </Card>
        </Container>
    );
});

export default Registration;