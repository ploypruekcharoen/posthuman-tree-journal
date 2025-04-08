import { Journey } from '../types/Journey';

interface JourneyCardProps {
  journey: Journey;
  isDarkWorld: boolean;
}

const JourneyCard = ({ journey, isDarkWorld }: JourneyCardProps) => {
  console.log('JourneyCard render:', {
    isDarkWorld,
    hasAlternativeImage: !!journey.alternativeImage,
    imageLength: journey.image.length,
    alternativeImageLength: journey.alternativeImage?.length,
    hasAlternativeDescription: !!journey.alternativeDescription,
    description: journey.description,
    alternativeDescription: journey.alternativeDescription,
  });

  // The normal image should already be a complete data URL from the file input
  const normalImage = journey.image;

  // The alternative image should already include the data URL prefix from the backend
  const alternativeImage = journey.alternativeImage || '';

  const displayImage = isDarkWorld && alternativeImage ? alternativeImage : normalImage;
  const displayDescription = isDarkWorld && journey.alternativeDescription
    ? journey.alternativeDescription
    : journey.description;

  console.log('Displaying:', {
    isDarkWorld,
    displayDescription,
    usingAlternative: isDarkWorld && journey.alternativeDescription,
  });

  return (
    <div className="journey-card" style={{
      backgroundColor: isDarkWorld ? '#333' : '#fff',
      color: isDarkWorld ? '#fff' : '#333',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      width: '300px',
    }}>
      <img
        src={displayImage}
        alt="Journey"
        style={{
          width: '100%',
          height: '200px',
          objectFit: 'cover',
          display: 'block',
        }}
        onError={(e) => {
          console.error('Error loading image:', displayImage.slice(0, 100) + '...');
          e.currentTarget.src = normalImage;
        }}
      />
      <p style={{
        padding: '1rem',
        margin: 0,
        fontSize: '0.9rem',
        lineHeight: '1.5',
        color: isDarkWorld ? '#fff' : '#333',
      }}>
        {displayDescription}
      </p>
    </div>
  );
};

export default JourneyCard;