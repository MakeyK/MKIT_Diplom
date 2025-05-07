import React from 'react';
import { useNavigate } from 'react-router-dom';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';

const ListCurator = () => {
  const students = [
    {
      discipline: 'Веб-дизайн и разработка',
      name: 'Иестеров Вясевич Константинович',
      group: '9 ИС–321',
      semester: '1 (2024)',
      remarks: 'Отсутствует',
      grade: '5'
    },
    {
      discipline: 'Веб-дизайн и разработка',
      name: 'Герасимова Дары Алексейна',
      group: '9 ИС–321',
      semester: '2 (2025)',
      remarks: 'Отсутствует',
      grade: '4'
    }
  ];

  return (
    <TableContainer component={Paper} sx={{ marginTop: 2, backgroundColor: '#f5f5f5' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Дисциплина</TableCell>
            <TableCell>Студент</TableCell>
            <TableCell>Группа</TableCell>
            <TableCell>Семестр</TableCell>
            <TableCell>Замечания</TableCell>
            <TableCell>Оценка</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((student, index) => (
            <TableRow key={index}>
              <TableCell>{student.discipline}</TableCell>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.group}</TableCell>
              <TableCell>{student.semester}</TableCell>
              <TableCell>{student.remarks}</TableCell>
              <TableCell>{student.grade}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const StudentProfilePage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Навигационная панель */}
      <div style={{ width: 240, backgroundColor: '#1976d2', color: 'white', padding: '16px' }}>
        <Typography variant="h6" sx={{ padding: '16px', fontWeight: 'bold' }}>Меню</Typography>
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{ color: 'white' }}>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Главная" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{ color: 'white' }}>
                <SchoolIcon />
              </ListItemIcon>
              <ListItemText primary="Дисциплина" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate('/PROFILEKURATOR_ROUTE')}>
              <ListItemIcon sx={{ color: 'white' }}>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Профиль студента" />
            </ListItemButton>
          </ListItem>
        </List>
      </div>

      {/* Основное содержимое */}
      <div style={{ flex: 1, padding: '24px' }}>
        <Typography variant="h4" gutterBottom>Профиль студента</Typography>
        <ListCurator />
      </div>
    </div>
  );
};

export default StudentProfilePage;