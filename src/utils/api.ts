import type { Link } from "../components/Types";

const API_URL = 'http://localhost:3001/links';

export const fetchLinks = async (): Promise<Link[]> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch links');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching links:', error);
    return [];
  }
};

export const addLinkAPI = async (link: Link): Promise<Link | null> => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(link),
    });
    if (!response.ok) {
      throw new Error('Failed to add link');
    }
    return await response.json();
  } catch (error) {
    console.error('Error adding link:', error);
    return null;
  }
};

export const updateLinkAPI = async (link: Link): Promise<Link | null> => {
  try {
    const response = await fetch(`${API_URL}/${link.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(link),
    });
    if (!response.ok) {
      throw new Error('Failed to update link');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating link:', error);
    return null;
  }
};

export const deleteLinkAPI = async (id: number): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete link');
    }
    return true;
  } catch (error) {
    console.error('Error deleting link:', error);
    return false;
  }
};
