import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Context } from '../index';
import { observer } from 'mobx-react-lite';
import {
  adminRoutes,
  kuratorRoutes,
  studentRoutes,
  teacherRouter,
  publicRoutes
} from '../routes';

const AppRouter = observer(() => {
  const { user } = useContext(Context);

  return (
    <Routes>
      {/* Публичные маршруты (доступны всем) */}
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={Component} />
      ))}

      {/* Защищенные маршруты для администратора */}
      {user.isAuth && user.user.role === 'ADMIN' &&
        adminRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={Component} />
        ))}

      {/* Защищенные маршруты для куратора */}
      {user.isAuth && user.user.role === 'KURATOR' &&
        kuratorRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={Component} />
        ))}

      {/* Защищенные маршруты для студента */}
      {user.isAuth && user.user.role === 'STUDENT' &&
        studentRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={Component} />
        ))}

      {/* Защищенные маршруты для преподавателя */}
      {user.isAuth && user.user.role === 'TEACHER' &&
        teacherRouter.map(({ path, Component }) => (
          <Route key={path} path={path} element={Component} />
        ))}

      {/* Редирект для авторизованных пользователей в зависимости от роли */}
      {user.isAuth ? (
        <Route
          path="*"
          element={
            user.user.role === 'ADMIN' ? (
              <Navigate to={adminRoutes[0].path} />
            ) : user.user.role === 'KURATOR' ? (
              <Navigate to={kuratorRoutes[0].path} />
            ) : user.user.role === 'TEACHER' ? (
              <Navigate to={teacherRouter[0].path} />
            ) : (
              <Navigate to={studentRoutes[0].path} />
            )
          }
        />
      ) : (
        // Редирект для неавторизованных пользователей
        <Route path="*" element={<Navigate to="/auth" />} />
      )}
    </Routes>
  );
});

export default AppRouter;