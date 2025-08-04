import React from 'react';
import { Link2, Star, Copy, Check, Edit2, Trash2, ExternalLink, Clock } from 'lucide-react';
import { Link } from './Types';
import './linkCard.css';

type LinkCardProps = {
  link: Link;
  copiedId: number | null;
  onToggleFavorite: (id: number) => void;
  onCopyToClipboard: (text: string, id: number) => void;
  onEdit: (link: Link) => void;
  onDelete: (id: number) => void;
}

export const LinkCard: React.FC<LinkCardProps> = ({
  link,
  copiedId,
  onToggleFavorite,
  onCopyToClipboard,
  onEdit,
  onDelete
}) => {
  return (
    <div className="link-card">
      <div className="card-content">
        <div className="card-header">
          <div className="title-section">
            <Link2 className="card-icon" />
            <h3 className="card-title">
              {link.title}
            </h3>
          </div>
          <div className="action-buttons">
            <button
              onClick={() => onToggleFavorite(link.id)}
              className={`action-btn ${link.isFavorite ? 'favorite' : ''}`}
            >
              <Star className={`icon ${link.isFavorite ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={() => onCopyToClipboard(link.url, link.id)}
              className="action-btn"
            >
              {copiedId === link.id ? <Check className="icon" /> : <Copy className="icon" />}
            </button>
            <button
              onClick={() => onEdit(link)}
              className="action-btn"
            >
              <Edit2 className="icon" />
            </button>
            <button
              onClick={() => onDelete(link.id)}
              className="action-btn delete"
            >
              <Trash2 className="icon" />
            </button>
          </div>
        </div>
        
        <p className="card-description">{link.description}</p>
        
        <div className="tags-container">
          {link.tags.map(tag => (
            <span key={tag} className="tag">
              #{tag}
            </span>
          ))}
        </div>
        
        <div className="card-meta">
          <span className="date-info">
            <Clock className="date-icon" />
            Added {link.dateAdded}
          </span>
          <span className="category-badge">{link.category}</span>
        </div>
        
        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="visit-link"
        >
          Visit Link
          <ExternalLink className="external-icon" />
        </a>
      </div>
    </div>
  );
};