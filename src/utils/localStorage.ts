import { Link } from '../components/Types';

const STORAGE_KEY = 'link-vault-links';


const getSampleData = (): Link[] => [
  {
    id: 1,
    title: "React Documentation",
    url: "https://react.co.za"
    description: "Official React documentation and guides",
    tags: ["react", "documentation", "frontend"],
    category: "Development",
    isFavorite: true,
    dateAdded: "2025-01-15",
    lastVisited: "2025-01-20"
  },
  {
    id: 2,
    title: "Tailwind CSS",
    url: "https://react.co.za",
    description: "Utility-first CSS framework",
    tags: ["css", "framework", "design"],
    category: "Design",
    isFavorite: false,
    dateAdded: "2025-01-10",
    lastVisited: "2025-01-18"
  }
];

export const loadLinksFromStorage = (): Link[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    console.log('Raw stored data:', stored);
    
    if (stored) {
      const parsedLinks = JSON.parse(stored);
      console.log('Parsed links:', parsedLinks);
      
      
      return Array.isArray(parsedLinks) ? parsedLinks : [];
    }
    
    console.log('No stored data, returning empty array');
    return []; 
  } catch (error) {
    console.error('Error loading links from localStorage:', error);
    return []; 
  }
};

export const saveLinksToStorage = (links: Link[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(links));
  } catch (error) {
    console.error('Error saving links to localStorage:', error);
  }
};