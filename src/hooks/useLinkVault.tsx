import { useState, useEffect } from 'react';
import { fetchLinks, addLinkAPI, updateLinkAPI, deleteLinkAPI } from '../utils/api';
import type { Link, NewLinkForm, ViewMode } from '../components/Types';

export type SortOption = 'dateAdded' | 'title' | 'category' | 'none';

export const useLinkVault = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [editingLink, setEditingLink] = useState<Link | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<SortOption>('none');
  const [notification, setNotification] = useState<string>('');

  const [newLink, setNewLink] = useState<NewLinkForm>({
    title: '',
    url: '',
    description: '',
    tags: '',
    category: 'General'
  });

  
  useEffect(() => {
    const loadData = async () => {
      try {
        console.log('Loading links from API...');
        const fetchedLinks = await fetchLinks();
        console.log('Loaded links:', fetchedLinks);
        setLinks(fetchedLinks);
      } catch (error) {
        console.error('Error loading links:', error);
        setLinks([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  
  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(''), 3000);
  };

  
  const categories: string[] = links.length > 0 
    ? ['all', ...Array.from(new Set(links.map(link => link.category)))]
    : ['all'];

  
  const allTags: string[] = links.length > 0 
    ? Array.from(new Set(links.flatMap(link => link.tags)))
    : [];

  
  const filteredLinks = links.filter((link) => {
    const matchesSearch = 
      link.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || link.category === selectedCategory;
    const matchesTag = !selectedTag || link.tags.includes(selectedTag);
    
    return matchesSearch && matchesCategory && matchesTag;
  });

  
  const sortedLinks = [...filteredLinks].sort((a, b) => {
    if (sortBy === 'none') return 0;
    
    if (sortBy === 'dateAdded') {
      return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
    }
    
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    }
    
    if (sortBy === 'category') {
      return a.category.localeCompare(b.category);
    }
    
    return 0;
  });

  const addLink = async (): Promise<void> => {
    if (newLink.title.trim() && newLink.url.trim()) {
      const link: Link = {
        id: Date.now(),
        title: newLink.title.trim(),
        url: newLink.url.trim(),
        description: newLink.description.trim(),
        tags: newLink.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        category: newLink.category,
        isFavorite: false,
        dateAdded: new Date().toISOString().split('T')[0],
        lastVisited: null
      };
      
      console.log('Adding new link:', link);
      const addedLink = await addLinkAPI(link);
      if (addedLink) {
        setLinks(prevLinks => [...prevLinks, addedLink]);
        showNotification('Link added successfully!');
        resetForm();
      }
    }
  };

  const updateLink = async (): Promise<void> => {
    if (newLink.title.trim() && newLink.url.trim() && editingLink) {
      const updatedLink: Link = {
        ...editingLink,
        title: newLink.title.trim(),
        url: newLink.url.trim(),
        description: newLink.description.trim(),
        tags: newLink.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        category: newLink.category
      };
      
      console.log('Updating link:', updatedLink);
      const result = await updateLinkAPI(updatedLink);
      if (result) {
        setLinks(prevLinks => 
          prevLinks.map(link => 
            link.id === editingLink.id ? updatedLink : link
          )
        );
        showNotification('Link updated successfully!');
        resetForm();
      }
    }
  };

  const deleteLink = async (id: number): Promise<void> => {
    console.log('Deleting link with id:', id);
    const success = await deleteLinkAPI(id);
    if (success) {
      setLinks(prevLinks => prevLinks.filter(link => link.id !== id));
      showNotification('Link deleted successfully!');
    }
  };

  const editLink = (link: Link): void => {
    console.log('Editing link:', link);
    setEditingLink(link);
    setNewLink({
      title: link.title,
      url: link.url,
      description: link.description,
      tags: link.tags.join(', '),
      category: link.category
    });
    setShowAddForm(true);
  };

  const toggleFavorite = async (id: number): Promise<void> => {
    console.log('Toggling favorite for id:', id);
    const link = links.find(l => l.id === id);
    if (link) {
      const updatedLink = { ...link, isFavorite: !link.isFavorite };
      const result = await updateLinkAPI(updatedLink);
      if (result) {
        setLinks(prevLinks => 
          prevLinks.map(l => 
            l.id === id ? updatedLink : l
          )
        );
      }
    }
  };

  const copyToClipboard = async (text: string, id: number): Promise<void> => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const resetForm = (): void => {
    setNewLink({ 
      title: '', 
      url: '', 
      description: '', 
      tags: '', 
      category: 'General' 
    });
    setShowAddForm(false);
    setEditingLink(null);
  };

  const handleFormChange = (field: keyof NewLinkForm, value: string): void => {
    setNewLink(prevLink => ({ ...prevLink, [field]: value }));
  };

  return {
    links,
    filteredLinks: sortedLinks,
    searchTerm,
    selectedCategory,
    selectedTag,
    viewMode,
    showAddForm,
    editingLink,
    copiedId,
    newLink,
    categories,
    allTags,
    isLoading,
    sortBy,
    notification,
    addLink,
    updateLink,
    deleteLink,
    editLink,
    toggleFavorite,
    copyToClipboard,
    resetForm,
    handleFormChange,
    setSearchTerm,
    setSelectedCategory,
    setSelectedTag,
    setViewMode,
    setShowAddForm,
    setSortBy
  };
};
