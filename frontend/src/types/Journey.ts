export interface Position {
  x: number;
  y: number;
}

export interface Journey {
  id: string;
  position: Position;
  image: string;
  description: string;
  alternativeImage: string;
  alternativeDescription: string;
}