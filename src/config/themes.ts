export interface Theme {
  id: string;
  name: string;
  colors: {
    dark: string;
    accent: string;
    primary: string;
    secondary: string;
    light: string;
    highlight: string;
  };
}

export const themes: Theme[] = [
  {
    id: 'solo-leveling',
    name: 'Solo Leveling',
    colors: {
      dark: '#0d0a12',
      accent: '#9333ea',
      primary: '#7e22ce',
      secondary: '#6b21a8',
      light: '#f5f3ff',
      highlight: '#a855f7'
    }
  },
  {
    id: 'dragon-ball',
    name: 'Dragon Ball',
    colors: {
      dark: '#1A1A1A',
      accent: '#F9D342',
      primary: '#FF4500',
      secondary: '#EFEFEF',
      light: '#FFFFFF',
      highlight: '#DC143C'
    }
  },
  {
    id: 'one-punch',
    name: 'One Punch',
    colors: {
      dark: '#0A0A23',
      accent: '#FF8C00',
      primary: '#E63946',
      secondary: '#FFC300',
      light: '#F1FAEE',
      highlight: '#457B9D'
    }
  },
  {
    id: 'baki',
    name: 'Baki',
    colors: {
      dark: '#0F0F0F',
      accent: '#8B0000',
      primary: '#B22222',
      secondary: '#696969',
      light: '#E0E0E0',
      highlight: '#A52A2A'
    }
  },
  {
    id: 'attack-on-titan',
    name: 'Attack on Titan',
    colors: {
      dark: '#0B0C10',
      accent: '#FF4136',
      primary: '#2980B9',
      secondary: '#FF851B',
      light: '#FFDC00',
      highlight: '#FDFEFE'
    }
  },
  {
    id: 'one-piece',
    name: 'One Piece',
    colors: {
      dark: '#001F3F',
      accent: '#27AE60',
      primary: '#E67E22',
      secondary: '#F39C12',
      light: '#FDFEFE',
      highlight: '#FFFFFF'
    }
  },
  {
    id: 'jujutsu-kaisen',
    name: 'Jujutsu Kaisen',
    colors: {
      dark: '#0D1117',
      accent: '#0366D6',
      primary: '#58A6FF',
      secondary: '#161B22',
      light: '#F0F6FC',
      highlight: '#1F6FEB'
    }
  },
  {
    id: 'black-clover',
    name: 'Black Clover',
    colors: {
      dark: '#121212',
      accent: '#FFC107',
      primary: '#673AB7',
      secondary: '#4CAF50',
      light: '#F5F5F5',
      highlight: '#E91E63'
    }
  },
  {
    id: 'naruto',
    name: 'Naruto',
    colors: {
      dark: '#094283',
      accent: '#690000',
      primary: '#2980B9',
      secondary: '#000000',
      light: '#F0F0F0',
      highlight: '#E74C3C'
    }
  }
]; 