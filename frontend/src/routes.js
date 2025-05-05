import { Component } from "react"
import { ADMINPANEL_ROUTE, REGISTRATION_ROUTE, AUTH_ROUTE, MAINKURATOR_ROUTE, MAINSTUDENT_ROUTE, MAINTEACHER_ROUTE, PROFILEKURATOR_ROUTE, PROFILETEACHER_ROUTE, ADDOCHENKATEACHER_ROUTE, TECHNICALSUPPORTSTUDENT_ROUTE, TECHNICALSUPPORTTEACHER_ROUTE} from "./utils/consts"
import Adminpanel from './pages/adminpanel'
import Registration from './pages/registration'
import Auth from './pages/auth'
import MainKurator from './pages/mainKurator'
import MainStudent from './pages/mainStudent'
import MainTeacher from './pages/mainTeacher'
import ProfileKurator from './pages/profileKurator'
import ProfileTeacher from './pages/profileTeacher'
import AddOchenkaTeacher from './pages/addOchenkaTeacher'
import TehSupportStudent from './pages/TechnicalSupportStudent'
import TehSupportTeacher from './pages/TechnicalSupportTeacher'

export const adminRoutes = [
    {
        path: ADMINPANEL_ROUTE,
        Component: <Adminpanel/>
    }
]
export const kuratorRoutes = [
    {
        path: MAINKURATOR_ROUTE,
        Component: <MainKurator/>
    },
    {
        path: PROFILEKURATOR_ROUTE,
        Component: <ProfileKurator/>
    }
]
export const studentRoutes = [
    {
        path: MAINSTUDENT_ROUTE,
        Component: <MainStudent/>
    },
    {
        path: TECHNICALSUPPORTSTUDENT_ROUTE,
        Component: <TehSupportStudent/>
    }
]
export const teacherRouter =[
    {
        path: MAINTEACHER_ROUTE,
        Component: <MainTeacher/>
    },
    {
        path: PROFILETEACHER_ROUTE,
        Component: <ProfileTeacher/>
    },
    {
        path: ADDOCHENKATEACHER_ROUTE,
        Component: <AddOchenkaTeacher/>
    },
    {
        path: TECHNICALSUPPORTTEACHER_ROUTE,
        Component: <TehSupportTeacher/>
    }
]


export const publicRoutes = [
    {
        path: REGISTRATION_ROUTE,
        Component: <Registration/>
    },
    {
        path: AUTH_ROUTE,
        Component: <Auth/>
    }
]