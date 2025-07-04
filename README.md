# Форма авторизации

### Проект по вебу! 🐈 


## Ответы на открытые вопросы ❓

### Accessibility (доступность)
- Атрибуты `aria-label` и `aria-describedby` для описания элементов
- Правильная структура заголовков (h1, h2, h3)
- Контрастные цвета для текста и фона

### Подход к верстке

Выбран **Flexbox** подход за интуитивность использования и легкость создания адаптивных макетов

### Media Queries и брейкпоинты
- **768px** - планшеты и мобильные устройства в альбомной ориентации
- **480px** - мобильные устройства в портретной ориентации

Выбор основан на стандартных размерах экранов устройств
### Хранение данных

Для хранения данных используется **localStorage**, так как для данной работы нам нужна простота. Локал Сторадж не требует серверной части и подходит для демонстрационных целей

### Стрелочные vs именованные функции

**Стрелочные функции** больше понравились для краткости синтаксиса

### Менеджер пакетов 
--npm как база

# Проект формы авторизации

Этот репозиторий содержит три версии реализации формы авторизации, выполненные в рамках демонстрационного проекта.

## Структура проекта

- **`/native`** - Реализация на нативных технологиях (HTML, CSS, JavaScript).
- **`/with-infrastructure`** - Нативные технологии с инфраструктурой на Node.js/Express.
- **`/framework`** - Разработка с использованием фреймворка React и Vite.

---

## Как запустить проекты

### 1. `native`

Для запуска просто откройте файл `native/index.html` в браузере.

### 2. `with-infrastructure`

Эта версия использует сервер на Express.js.

```bash

cd with-infrastructure

npm install

node server.js
```

После этого откройте в браузере [http://localhost:3000](http://localhost:3000).

### 3. `framework`

Версия, построенная на React с использованием Vite.

```bash
cd framework

npm install

npm run dev
```

В консоли адрес для доступа (обычно `http://localhost:5173`). Откройте его в браузере.

