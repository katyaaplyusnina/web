import React, { useEffect, useRef } from 'react'
import Header from './components/Header'
import AuthForm from './components/AuthForm'
import Footer from './components/Footer'
import './App.css'

function App() {
  const isPopCatOpen = useRef(false);
  const authFormRef = useRef(null);

  const CAT_CLOSED_URL = '/assets/cat-closed.png';
  const CAT_OPEN_URL = '/assets/cat-open.png';

  useEffect(() => {
    const handlePopCatClick = (e) => {
      if (authFormRef.current && authFormRef.current.contains(e.target)) {
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

        // Определяем, находится ли мышь над формой
        const isMouseOverForm = authFormRef.current && authFormRef.current.contains(e.target);

        if (isMouseOverForm) {
            hint.classList.add('hidden');
        } else {
            hint.classList.remove('hidden');
        }
    }

    document.addEventListener('click', handlePopCatClick);
    document.addEventListener('mousemove', handleHintVisibility);

    // Начальное состояние подсказки
    const hint = document.getElementById('pulsatingHint');
    if (hint) {
        hint.classList.remove('hidden');
    }

    return () => {
      document.removeEventListener('click', handlePopCatClick);
      document.removeEventListener('mousemove', handleHintVisibility);
    };
  }, []);

  return (
    <div className="App">
      <Header />
      <main className="main">
        <div className="container" ref={authFormRef}>
          <AuthForm />
        </div>
      </main>
      <Footer />
      <div className="pulsating-hint" id="pulsatingHint">Кликни в любом месте!</div>
    </div>
  )
}

export default App 