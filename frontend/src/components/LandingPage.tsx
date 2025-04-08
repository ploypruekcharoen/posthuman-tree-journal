import { RefObject } from 'react';

interface LandingPageProps {
  mapRef: RefObject<HTMLDivElement>;
}

const LandingPage = ({ mapRef }: LandingPageProps) => {
  const scrollToMap = () => {
    mapRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="landing-page" style={{
      width: '100vw',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      backgroundColor: '#fffbf4',
      padding: '5rem 3rem 2rem 2rem',
      scrollSnapAlign: 'start',
    }}>
      <section className="flex items-start h-screen">
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <div className="container">
            <h1>
              Posthuman<br />
              Tree Journal
            </h1>
            <div><p className="hashtag"># Keep trees in your archive</p></div>
            <div><p className="hashtag"># Co-speculate posthuman tree with AI</p></div>
          </div>
          <div className="image-container" style={{ maxWidth: '70%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img 
              src="/src/assets/instruction.png" 
              alt="Instruction" 
              style={{ 
                maxWidth: '80%', 
                height: 'auto',
                objectFit: 'contain'
              }} 
            />
          </div>
        </div>
      </section>
      
      <div className="scroll-down-button">
        <button
          onClick={scrollToMap}
        >
          Scroll down to start planting journals 🌱
        </button>
      </div>
      {/* <div style={{
        maxWidth: '800px',
        padding: '2rem',
      }}>
        <h1 style={{
          fontSize: '3rem',
          margin: '0 0 1rem 0',
          color: '#333',
        }}>
          Posthuman Journeys
        </h1>
        <p style={{
          fontSize: '1.2rem',
          margin: '0 0 2rem 0',
          color: '#666',
          lineHeight: '1.6',
        }}>
          Explore and document your journeys through a posthuman lens.
          Discover new perspectives and share your experiences with others.
        </p>
        <button
          onClick={scrollToMap}
          style={{
            padding: '1rem 2rem',
            fontSize: '1.1rem',
            backgroundColor: '#8B4513',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            margin: 0,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          Begin Your Journey
        </button>
      </div> */}
    </div>
  );
};

export default LandingPage;