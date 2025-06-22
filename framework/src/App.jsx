import React, { useEffect } from 'react'
import Header from './components/Header'
import AuthForm from './components/AuthForm'
import Footer from './components/Footer'
import './App.css'

function App() {
  const isPopCatOpen = { current: false }; // Используем простой объект вместо useRef для избежания лишних ре-рендеров

  const CAT_CLOSED_URL = '/assets/cat-closed.png';
  const CAT_OPEN_URL = '/assets/cat-open.png';

  useEffect(() => {
    const handlePopCatClick = (e) => {
      // Проверяем, был ли клик внутри контейнера формы
      if (e.target.closest('.form-container')) {
        return;
      }

      const catImage = document.createElement('img');
      catImage.className = 'pop-cat-image';
      
      isPopCatOpen.current = !isPopCatOpen.current;
      catImage.src = isPopCatOpen.current ? CAT_OPEN_URL : CAT_CLOSED_URL;

      catImage.style.left = `${e.pageX}px`;
      catImage.style.top = `${e.pageY}px`;

      document.body.appendChild(catImage);

      setTimeout(() => {
        catImage.remove();
      }, 700);
    };

    const handleHintVisibility = (e) => {
        const hint = document.getElementById('pulsatingHint');
        if (!hint) return;

        // Скрываем подсказку, если курсор над формой
        if (e.target.closest('.form-container')) {
            hint.classList.add('hidden');
        } else {
            hint.classList.remove('hidden');
        }
    }

    document.addEventListener('click', handlePopCatClick);
    document.addEventListener('mousemove', handleHintVisibility);

    return () => {
      document.removeEventListener('click', handlePopCatClick);
      document.removeEventListener('mousemove', handleHintVisibility);
    };
  }, []);

  return (
    <div className="App">
      <Header />
      <main className="main">
        <div className="container">
          <AuthForm />
        </div>
      </main>
      <Footer />
      <div className="pulsating-hint" id="pulsatingHint">Кликни в любом месте!</div>
    </div>
  )
}

export default App 