interface ImageGenerationResponse {
  description: string;
  image_data: string;
}

export const generateAlternativeImage = async (image: string, description: string): Promise<{ image: string; description: string }> => {
  try {
    const base64Image = image.split(',')[1];

    const formData = new URLSearchParams();
    formData.append('file', base64Image);
    formData.append('description', description);

    const response = await fetch('http://localhost:8000/generate_image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to generate alternative image: ${errorText}`);
    }

    const data: ImageGenerationResponse = await response.json();

    if (!data.image_data || !data.description) {
      throw new Error('Invalid response from server: missing image_data or description');
    }

    console.log('Received response:', {
      descriptionLength: data.description.length,
      imageDataLength: data.image_data.length,
    });

    return {
      image: data.image_data,
      description: data.description,
    };
  } catch (error) {
    console.error('Error generating alternative image:', error);
    throw error;
  }
};