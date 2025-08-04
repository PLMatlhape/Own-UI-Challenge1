import type { Link } from "../components/Types";

const STORAGE_KEY = 'link-vault-links';

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