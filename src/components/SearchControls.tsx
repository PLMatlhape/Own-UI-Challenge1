import React from 'react';
import { Search, Plus, Grid, List } from 'lucide-react';
import './searchControls.css';
import type { ViewMode } from './Types';

type SearchControlsProps = {
  searchTerm: string;
  selectedCategory: string;
  selectedTag: string;
  viewMode: ViewMode;
  categories: string[];
  allTags: string[];
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onTagChange: (value: string) => void;
  onViewModeChange: (mode: ViewMode) => void;
  onAddLink: () => void;
}

export const SearchControls: React.FC<SearchControlsProps> = ({
  searchTerm,
  selectedCategory,
  selectedTag,
  viewMode,
  categories,
  allTags,
  onSearchChange,
  onCategoryChange,
  onTagChange,
  onViewModeChange,
  onAddLink
}) => {
  return (
    <div className="search-container">
      <div className="search-content">
        <div className="search-input-wrapper">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Search links, descriptions, or tags..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="controls-group">
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="select-input"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>

          <select
            value={selectedTag}
            onChange={(e) => onTagChange(e.target.value)}
            className="select-input"
          >
            <option value="">All Tags</option>
            {allTags.map(tag => (
              <option key={tag} value={tag}>#{tag}</option>
            ))}
          </select>

          <div className="view-toggle">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`view-button ${viewMode === 'grid' ? 'active' : ''}`}
            >
              <Grid className="view-button-icon" />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={`view-button ${viewMode === 'list' ? 'active' : ''}`}
            >
              <List className="view-button-icon" />
            </button>
          </div>

          <button
            onClick={onAddLink}
            className="add-button"
          >
            <Plus className="add-button-icon" />
            <span>Add Link</span>
          </button>
        </div>
      </div>
    </div>
  );
};