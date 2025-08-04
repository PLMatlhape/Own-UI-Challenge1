import React from 'react';
import { BookmarkPlus, Plus } from 'lucide-react';
import './EmptyState.css';

type EmptyStateProps = {
  hasFilters: boolean;
  onAddLink: () => void;
};

export const EmptyState: React.FC<EmptyStateProps> = ({ hasFilters, onAddLink }) => {
  return (
    <div className="empty-state">
      <BookmarkPlus className="empty-icon" />
      <h3 className="empty-title">No links found</h3>
      <p className="empty-description">
        {hasFilters
          ? 'Try adjusting your search or filters'
          : 'Get started by adding your first link'
        }
      </p>
      <button
        onClick={onAddLink}
        className="empty-button"
      >
        <Plus className="empty-button-icon" />
        <span>Add Link</span>
      </button>
    </div>
  );
};