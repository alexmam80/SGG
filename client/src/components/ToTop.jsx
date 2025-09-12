import React, { useEffect, useState } from 'react';

export default function ToTop(){
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // inițial
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const goTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <button
      className={`toTop ${show ? 'show' : ''}`}
      aria-label="Înapoi sus"
      title="Înapoi sus"
      onClick={goTop}
    >
      <i className="bi bi-chevron-up" style={{ fontSize: 20 }} />
    </button>
  );
}
