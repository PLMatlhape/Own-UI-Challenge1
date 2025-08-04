import React from 'react';
import { Link, NewLinkForm } from './Types';
import './linkForm.css';

type LinkFormProps = {
  newLink: NewLinkForm;
  editingLink: Link | null;
  onFormChange: (field: keyof NewLinkForm, value: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

export const LinkForm: React.FC<LinkFormProps> = ({
  newLink,
  editingLink,
  onFormChange,
  onSubmit,
  onCancel
}) => {
  return (
    <div className="form-container">
      <h2 className="form-title">
        {editingLink ? 'Edit Link' : 'Add New Link'}
      </h2>
      <div className="form-grid">
        <input
          type="text"
          placeholder="Link Title"
          value={newLink.title}
          onChange={(e) => onFormChange('title', e.target.value)}
          className="form-input"
        />
        <input
          type="url"
          placeholder="URL"
          value={newLink.url}
          onChange={(e) => onFormChange('url', e.target.value)}
          className="form-input"
        />
        <input
          type="text"
          placeholder="Description"
          value={newLink.description}
          onChange={(e) => onFormChange('description', e.target.value)}
          className="form-input"
        />
        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={newLink.tags}
          onChange={(e) => onFormChange('tags', e.target.value)}
          className="form-input"
        />
        <select
          value={newLink.category}
          onChange={(e) => onFormChange('category', e.target.value)}
          className="form-input"
        >
          <option value="General">General</option>
          <option value="Development">Development</option>
          <option value="Design">Design</option>
          <option value="Tools">Tools</option>
          <option value="Learning">Learning</option>
          <option value="Entertainment">Entertainment</option>
        </select>
      </div>
      <div className="form-buttons">
        <button
          onClick={onSubmit}
          className="form-button primary"
        >
          {editingLink ? 'Update Link' : 'Add Link'}
        </button>
        <button
          onClick={onCancel}
          className="form-button secondary"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};