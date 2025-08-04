import React from 'react';
import { Link2, Star, Copy, Check, Edit2, Trash2, ExternalLink } from 'lucide-react';
import { Link } from './Types';
import './LinkRow.css';

type LinkRowProps = {
  link: Link;
  copiedId: number | null;
  onToggleFavorite: (id: number) => void;
  onCopyToClipboard: (text: string, id: number) => void;
  onEdit: (link: Link) => void;
  onDelete: (id: number) => void;
}

export const LinkRow: React.FC<LinkRowProps> = ({
  link,
  copiedId,
  onToggleFavorite,
  onCopyToClipboard,
  onEdit,
  onDelete
}) => {
  return (
    <div className="link-row">
      <div className="row-content">
        <div className="row-main">
          <div className="row-icons">
            <Link2 className="row-link-icon" />
            <button
              onClick={() => onToggleFavorite(link.id)}
              className={`favorite-btn ${link.isFavorite ? 'active' : ''}`}
            >
              <Star className={`icon ${link.isFavorite ? 'fill-current' : ''}`} />
            </button>
          </div>
          
          <div className="row-info">
            <h3 className="row-title">
              {link.title}
            </h3>
            <p className="row-description">{link.description}</p>
          </div>
          
          <div className="row-tags">
            {link.tags.slice(0, 3).map(tag => (
              <span key={tag} className="row-tag">
                #{tag}
              </span>
            ))}
            {link.tags.length > 3 && (
              <span className="row-tag more">
                +{link.tags.length - 3}
              </span>
            )}
          </div>
          
          <span className="row-category">
            {link.category}
          </span>
        </div>
        
        <div className="row-actions">
          <button
            onClick={() => onCopyToClipboard(link.url, link.id)}
            className="row-action-btn"
          >
            {copiedId === link.id ? <Check className="icon" /> : <Copy className="icon" />}
          </button>
          <button
            onClick={() => onEdit(link)}
            className="row-action-btn"
          >
            <Edit2 className="icon" />
          </button>
          <button
            onClick={() => onDelete(link.id)}
            className="row-action-btn delete"
          >
            <Trash2 className="icon" />
          </button>
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="row-visit-link"
          >
            <ExternalLink className="icon" />
          </a>
        </div>
      </div>
    </div>
  );
};