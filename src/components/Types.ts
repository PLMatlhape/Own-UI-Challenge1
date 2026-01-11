export type Link = {
  id: number;           
  title: string;        
  url: string;          
  description: string;  
  tags: string[];       
  category: string;     
  isFavorite: boolean;  
  dateAdded: string;    
  lastVisited: string | null; 
};


export type NewLinkForm = {
  title: string;
  url: string;
  description: string;
  tags: string;        
  category: string;
};


export type ViewMode = 'grid' | 'list';