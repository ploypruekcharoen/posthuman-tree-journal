import { useState } from 'react';
import { Journey, Position } from '../types/Journey';
import { generateAlternativeImage } from '../utils/api';

interface JourneyFormProps {
  position: Position;
  onSubmit: (journey: Omit<Journey, 'id'>) => void;
  onCancel: () => void;
}

const JourneyForm = ({ position, onSubmit, onCancel }: JourneyFormProps) => {
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    try {
      console.log('Starting journey submission...');
      console.log('Original image length:', image.length);

      // Generate alternative image
      const { image: alternativeImage, description: alternativeDescription } = await generateAlternativeImage(image, description);

      console.log('Alternative image generated:', {
        alternativeImageLength: alternativeImage.length,
        alternativeDescriptionLength: alternativeDescription.length,
      });

      const journeyData = {
        description,
        image,
        position,
        alternativeImage,
        alternativeDescription,
      };

      console.log('Submitting journey with data:', {
        hasAlternativeImage: !!alternativeImage,
        hasAlternativeDescription: !!alternativeDescription,
      });

      onSubmit(journeyData);
    } catch (error) {
      console.error('Failed to generate alternative image:', error);
      // Still submit the journey even if alternative generation fails
      onSubmit({
        description,
        image,
        position,
        alternativeImage: '',
        alternativeDescription: '',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="journey-form-overlay">
      <div className="journey-form">
        <h2>Add Journal Entry</h2>
        <form onSubmit={handleSubmit}>
          <div className="image-upload-container">
            <label htmlFor="image" className="image-upload-label">
              {image ? (
                <img 
                  src={image} 
                  alt="Uploaded preview" 
                  style={{ 
                    maxWidth: '100%', 
                    maxHeight: '200px', 
                    objectFit: 'contain',
                    cursor: 'pointer'
                  }} 
                />
              ) : (
                <div className="upload-placeholder" style={{ cursor: 'pointer'}}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  <div>Click to upload image</div>
                </div>
              )}
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              required
              style={{ display: 'none' }}
            />
          </div>
          <div>
            <label htmlFor="description">Note</label>
            <textarea
              id="description"
              placeholder={"Write something about your tree here..."}
              onChange={(e) => setDescription(e.target.value)}
              required
              style={{ fontFamily: 'Mynerve, sans-serif', backgroundColor: '#fffbf4', color: '#1b6c4c'}}
            />
          </div>
          <div className="button-group">
            <button type="button" onClick={onCancel}>Cancel</button>
            <button type="submit" disabled={isGenerating}>
              {isGenerating ? 'Generating...' : 'Save Entry'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JourneyForm;