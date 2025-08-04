import { useState, useEffect } from 'react';
import { loadLinksFromStorage, saveLinksToStorage } from '../utils/localStorage';
import type { Link, NewLinkForm, ViewMode } from '../components/Types';

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
        console.log('Loading links from storage...');
        const savedLinks = loadLinksFromStorage();
        console.log('Loaded links:', savedLinks);
        
        
        setLinks(savedLinks);
      } catch (error) {
        console.error('Error loading links:', error);
        setLinks([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  
  useEffect(() => {
    if (!isLoading) {
      console.log('Saving links to storage:', links);
      saveLinksToStorage(links);
    }
  }, [links, isLoading]);

  
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

  const addLink = (): void => {
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
      setLinks(prevLinks => [...prevLinks, link]);
      resetForm();
    }
  };

  const updateLink = (): void => {
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
      setLinks(prevLinks => 
        prevLinks.map(link => 
          link.id === editingLink.id ? updatedLink : link
        )
      );
      resetForm();
    }
  };

  const deleteLink = (id: number): void => {
    console.log('Deleting link with id:', id);
    setLinks(prevLinks => prevLinks.filter(link => link.id !== id));
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

  const toggleFavorite = (id: number): void => {
    console.log('Toggling favorite for id:', id);
    setLinks(prevLinks => 
      prevLinks.map(link => 
        link.id === id ? { ...link, isFavorite: !link.isFavorite } : link
      )
    );
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
    filteredLinks,
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
    setShowAddForm
  };
};
