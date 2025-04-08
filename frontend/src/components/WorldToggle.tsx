import toggleOn from '../assets/toggle-on.svg';
import toggleOff from '../assets/toggle-off.svg';

interface WorldToggleProps {
  isDarkWorld: boolean;
  onToggle: () => void;
}

const WorldToggle = ({ isDarkWorld, onToggle }: WorldToggleProps) => {
  return (
    <div style={{
      position: 'fixed',
      top: '1rem',
      right: '1rem',
      zIndex: 1000,
    }}>
      <div style={{
        position: 'relative',
        width: '96px',
        height: '48px',
        backgroundColor: isDarkWorld ? '#f2d1ff' : '#e5f7f0',
        borderRadius: '24px',
        border: `2px solid ${isDarkWorld ? '#69b9f1' : '#1b6c4c'}`,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      }} onClick={onToggle}>
        <div style={{
          position: 'absolute',
          top: '50%',
          transform: isDarkWorld ? 'translate(56px, -50%)' : 'translate(8px, -50%)',
          width: '32px',
          height: '32px',
          transition: 'transform 0.2s ease',
        }}>
          <img
            src={isDarkWorld ? toggleOn : toggleOff}
            alt="Toggle World"
            style={{
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default WorldToggle;