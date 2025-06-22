const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:"],
        },
    },
}));

app.use(compression());
app.use(cors());
app.use(morgan('combined'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

app.post('/api/validate', (req, res) => {
    const { email, password } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    
    if (!email || (!emailRegex.test(email) && !phoneRegex.test(email))) {
        return res.status(400).json({
            success: false,
            errors: {
                email: 'Некорректный email или телефон'
            }
        });
    }
    
    if (!password || password.length < 8) {
        return res.status(400).json({
            success: false,
            errors: {
                password: 'Пароль должен содержать минимум 8 символов'
            }
        });
    }
    
    res.json({ success: true });
});

app.post('/api/auth', (req, res) => {
    const { email, password } = req.body;
    const VALID_EMAIL = 'test@example.com';
    const VALID_PASSWORD = 'Test123!@#';
    
    if (email === VALID_EMAIL && password === VALID_PASSWORD) {
        setTimeout(() => {
            res.json({
                success: true,
                message: 'Успешная авторизация',
                user: {
                    id: 1,
                    email: email,
                    name: 'Тестовый пользователь'
                }
            });
        }, 1000);
    } else {
        res.status(401).json({
            success: false,
            message: 'Неверный email или пароль'
        });
    }
});

app.post('/api/save-data', (req, res) => {
    const { email, remember } = req.body;
    
    if (remember) {
        res.json({
            success: true,
            message: 'Данные сохранены'
        });
    } else {
        res.json({
            success: true,
            message: 'Данные не сохранены'
        });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Страница не найдена'
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Внутренняя ошибка сервера'
    });
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
    console.log(`Откройте http://localhost:${PORT} в браузере`);
});

module.exports = app; 