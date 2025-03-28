// Theme definitions for the application

export interface ThemeColors {
  dark: string;
  accent: string;
  primary: string;
  secondary: string;
  light: string;
  highlight: string;
}

export interface Theme {
  id: string;
  name: string;
  colors: ThemeColors;
}

export const themes: Theme[] = [
  {
    id: 'solo-leveling',
    name: 'Solo Leveling',
    colors: {
      dark: '#120011',
      accent: '#854F6C',
      primary: '#522B5B',
      secondary: '#382039',
      light: '#F6F6F6',
      highlight: '#E6BCCD'
    }
  },
  {
    id: 'naruto',
    name: 'Naruto',
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
    id: 'dragon-ball',
    name: 'Dragon Ball',
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
    id: 'black-clover',
    name: 'Black Clover',
    colors: {
      dark: '#1E1E1E',
      accent: '#FFD700',
      primary: '#4B0082',
      secondary: '#32CD32',
      light: '#F0F8FF',
      highlight: '#FF4500'
    }
  },
  {
    id: 'jujutsu-kaisen',
    name: 'Jujutsu Kaisen',
    colors: {
      dark: '#1C1C1C',
      accent: '#0077B6',
      primary: '#9B59B6',
      secondary: '#D2B4DE',
      light: '#ECF0F1',
      highlight: '#FFFFFF'
    }
  },
  {
    id: 'attack-on-titan',
    name: 'Attack on Titan',
    colors: {
      dark: '#1A1A1A',
      accent: '#8B0000',
      primary: '#2F4F4F',
      secondary: '#CD853F',
      light: '#E8E8E8',
      highlight: '#FFD700'
    }
  },
  {
    id: 'baki',
    name: 'Baki',
    colors: {
      dark: '#101010',
      accent: '#D32F2F',
      primary: '#FF7043',
      secondary: '#FFCCBC',
      light: '#E0E0E0',
      highlight: '#FFFFFF'
    }
  },
  {
    id: 'one-punch',
    name: 'One Punch Man',
    colors: {
      dark: '#1A1A1A',
      accent: '#F9D342',
      primary: '#FF4500',
      secondary: '#EFEFEF',
      light: '#FFFFFF',
      highlight: '#DC143C'
    }
  }
];

export default themes; 