import React from 'react';
import { BookmarkPlus, Star, Tag, Filter } from 'lucide-react';
import { Link } from './Types';
import './stats.css';

type StatsProps = {
  links: Link[];
  allTags: string[];
  categories: string[];
};

export const Stats: React.FC<StatsProps> = ({ links, allTags, categories }) => {
  const favoriteCount = links.filter(link => link.isFavorite).length;
  const categoryCount = categories.filter(cat => cat !== 'all').length;

  return (
    <div className="stats-container">
      <div className="stats-card">
        <div className="stats-content">
          <BookmarkPlus className="stats-icon blue" />
          <div>
            <p className="stats-number">{links.length}</p>
            <p className="stats-label">Total Links</p>
          </div>
        </div>
      </div>
      <div className="stats-card">
        <div className="stats-content">
          <Star className="stats-icon yellow" />
          <div>
            <p className="stats-number">{favoriteCount}</p>
            <p className="stats-label">Favorites</p>
          </div>
        </div>
      </div>
      <div className="stats-card">
        <div className="stats-content">
          <Tag className="stats-icon green" />
          <div>
            <p className="stats-number">{allTags.length}</p>
            <p className="stats-label">Unique Tags</p>
          </div>
        </div>
      </div>
      <div className="stats-card">
        <div className="stats-content">
          <Filter className="stats-icon purple" />
          <div>
            <p className="stats-number">{categoryCount}</p>
            <p className="stats-label">Categories</p>
          </div>
        </div>
      </div>
    </div>
  );
};