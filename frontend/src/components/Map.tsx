import { useState, useRef, useEffect } from 'react';
import mapImage from '../assets/map-light.png';
import mapDarkImage from '../assets/map-dark.png';
import JourneyForm from './JourneyForm';
import JourneyCard from './JourneyCard';
import WorldToggle from './WorldToggle';
import { Journey, Position } from '../types/Journey';
import flowerButton from '../assets/button-flower.svg';
import LandingPage from './LandingPage';

const Map = () => {
  const [journeys, setJourneys] = useState<Journey[]>([]);
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
  const [isAddingJourney, setIsAddingJourney] = useState(false);
  const [hoveredJourney, setHoveredJourney] = useState<Journey | null>(null);
  const [selectedJourney, setSelectedJourney] = useState<Journey | null>(null);
  const [isDarkWorld, setIsDarkWorld] = useState(false);
  const [showToggle, setShowToggle] = useState(false);
  const mapRef = useRef<HTMLImageElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (mapContainerRef.current && scrollContainerRef.current) {
        const mapRect = mapContainerRef.current.getBoundingClientRect();
        const isMapVisible = mapRect.top <= window.innerHeight && mapRect.bottom >= 0;
        setShowToggle(isMapVisible);
      }
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      handleScroll();
      return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const handleMapClick = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!isAddingJourney) return;

    const rect = mapRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setSelectedPosition({ x, y });
  };

  const handleJourneySubmit = (journeyData: Omit<Journey, 'id'>) => {
    console.log('Submitting journey:', journeyData);
    const newJourney: Journey = {
      ...journeyData,
      id: Date.now().toString(),
    };
    setJourneys([...journeys, newJourney]);
    setIsAddingJourney(false);
    setSelectedPosition(null);
  };

  const handleToggleWorld = () => {
    console.log('Toggling world, current state:', isDarkWorld);
    setIsDarkWorld(!isDarkWorld);
  };

  const handleJourneyClick = (journey: Journey) => {
    setSelectedJourney(journey);
  };

  const closeJourneyDetail = () => {
    setSelectedJourney(null);
  };

  return (
    <div
      ref={scrollContainerRef}
      className="scroll-container"
      style={{
        width: '100vw',
        height: '100vh',
        overflowX: 'hidden',
        overflowY: 'auto',
        margin: 0,
        padding: 0,
        position: 'fixed',
        top: 0,
        left: 0,
        scrollSnapType: 'y mandatory',
        scrollBehavior: 'smooth',
      }}
    >
      <LandingPage mapRef={mapContainerRef as React.RefObject<HTMLDivElement>} />
      <div ref={mapContainerRef} style={{
        width: '100vw',
        height: '100vh',
        margin: 0,
        padding: 0,
        scrollSnapAlign: 'start',
      }}>
        <div className="map-container" style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#fffbf4',
          margin: 0,
          padding: '2rem',
          boxSizing: 'border-box',
        }}>
          {showToggle && (
            <div style={{ position: 'fixed', top: '2rem', right: '2rem', zIndex: 1000 }}>
              <WorldToggle isDarkWorld={isDarkWorld} onToggle={handleToggleWorld} />
            </div>
          )}
          <div style={{
            position: 'relative',
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: 0,
            padding: 0,
            width: '100%',
            height: '100%',
            borderRadius: '1rem',
            overflow: 'hidden',
          }}>
            {isAddingJourney && (
              <div
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.2)', // Very subtle black overlay
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  zIndex: 999,
                  pointerEvents: 'none',
                  cursor: 'crosshair',
                }}
              >
                <div
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    color: 'white',
                    padding: '0.6rem 1.4rem',
                    borderRadius: '999px',
                    textAlign: 'center',
                    pointerEvents: 'none',
                    fontSize: '1.4rem',
                  }}
                >
                  Click to place a pin
                </div>
              </div>
            )}

            <img
              ref={mapRef}
              src={isDarkWorld ? mapDarkImage : mapImage}
              alt="Campus Map"
              onClick={handleMapClick}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
                cursor: isAddingJourney ? 'crosshair' : 'default',
                position: 'relative',
                zIndex: 1,
              }}
            />

            {journeys.map((journey) => {
              const displayImage = isDarkWorld && journey.alternativeImage 
                ? journey.alternativeImage 
                : journey.image;
                
              return (
                <div
                  key={journey.id}
                  style={{
                    position: 'absolute',
                    left: `${journey.position.x}%`,
                    top: `${journey.position.y}%`,
                    transform: 'translate(-50%, -50%)',
                    zIndex: 10,
                    transition: 'transform 0.2s ease',
                    cursor: 'pointer',
                    width: '80px',
                    height: 'auto',
                    transformOrigin: 'center',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.1)';
                    setHoveredJourney(journey);
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translate(-50%, -50%)';
                    setHoveredJourney(null);
                  }}
                  onClick={() => handleJourneyClick(journey)}
                >
                  <img 
                    src={displayImage}
                    alt="Journey thumbnail"
                    style={{
                      width: '100%',
                      height: 'auto',
                      objectFit: 'cover',
                      borderRadius: '4px',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                    }}
                  />
                </div>
              );
            })}

            {showToggle && (
              <button
                onClick={() => setIsAddingJourney(!isAddingJourney)}
                style={{
                  position: 'fixed',
                  bottom: '2rem',
                  right: '2rem',
                  width: '60px',
                  height: '60px',
                  padding: 0,
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 1000,
                  transition: 'transform 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <img
                  src={flowerButton}
                  alt="Add Journey"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                  }}
                />
              </button>
            )}
          </div>

          {selectedPosition && (
            <JourneyForm
              position={selectedPosition}
              onSubmit={handleJourneySubmit}
              onCancel={() => {
                setSelectedPosition(null);
                setIsAddingJourney(false);
              }}
            />
          )}

          {selectedJourney && (
            <div 
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1100,
              }}
              onClick={closeJourneyDetail}
            >
              <div 
                style={{
                  backgroundColor: isDarkWorld ? '#333' : '#fff',
                  color: isDarkWorld ? '#fff' : '#333',
                  padding: '4rem 2rem 2rem 2rem',
                  borderRadius: '8px',
                  maxWidth: '50%',
                  maxHeight: '80%',
                  overflow: 'auto',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                  position: 'relative',
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={closeJourneyDetail}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: isDarkWorld ? '#555' : '#efefef',
                    color: isDarkWorld ? '#fff' : '#333',
                    border: 'none',
                    borderRadius: '999px',
                    cursor: 'pointer',
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  x
                </button>
                <img 
                  src={isDarkWorld && selectedJourney.alternativeImage ? selectedJourney.alternativeImage : selectedJourney.image}
                  alt="Journey"
                  style={{
                    width: '100%',
                    maxHeight: '60vh',
                    objectFit: 'contain',
                    marginBottom: '1rem',
                  }}
                />
                {isDarkWorld && selectedJourney.alternativeDescription ? (
                  <p style={{ 
                    fontFamily: 'Mynerve, sans-serif',
                    fontSize: '1.1rem',
                    lineHeight: '1.6',
                    whiteSpace: 'pre-wrap',
                  }}>
                    {selectedJourney.alternativeDescription}
                  </p>
                ) : (
                  <p style={{ 
                    fontFamily: 'Mynerve, sans-serif',
                    fontSize: '1.1rem',
                    lineHeight: '1.6',
                    whiteSpace: 'pre-wrap',
                  }}>
                    {selectedJourney.description}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Map;