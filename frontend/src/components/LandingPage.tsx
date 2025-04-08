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
              src="./src/assets/instruction.png" 
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
    </div>
  );
};

export default LandingPage;