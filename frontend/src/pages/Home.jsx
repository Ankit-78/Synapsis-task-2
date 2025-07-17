import { useEffect } from 'react';
import '../styles/Home.css';

export function Home() {
  useEffect(() => {
    const handleScroll = () => {
      const reveal = document.querySelector('.cool-stuff');
      if (reveal && window.scrollY > 100) {
        reveal.classList.add('visible');
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      <div className="hero">
        <div className="hero-text">
          <h1>Welcome to Cool Notes App 📝</h1>
          <p>Create, manage, and access your documents anywhere, anytime!</p>
        </div>
        <img
          src="https://img.freepik.com/free-vector/notes-concept-illustration_114360-2591.jpg"
          alt="Notes Illustration"
          className="hero-img"
        />
      </div>

      <div className="cool-stuff">
        <h2>🚀 Cool Features Just for You</h2>
        <div className="cards">
          <div className="card">
            <h3>✨ Smart Organization</h3>
            <p>Your notes sorted automatically using smart folders.</p>
          </div>
          <div className="card">
            <h3>📱 Access Anywhere</h3>
            <p>Use it on any device, anytime. No limits!</p>
          </div>
          <div className="card">
            <h3>🔒 100% Secure</h3>
            <p>Your data is encrypted and safe with us.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
