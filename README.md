# Link Vault - React + TypeScript Application

A modern, responsive link management system built with React, TypeScript, and Vite.

## Features

### ✅ Complete Implementation

- **Navigation & Routing**: Fully implemented filtering, sorting, and searching across all functions
- **Data Persistence**: JSON Server implementation for all data storage operations
- **CRUD Operations**: 
  - Create new links with validation
  - Read/View links in grid or list view
  - Update existing links with real-time feedback
  - Delete links with confirmation
- **Sorting**: Multiple sort options (Date Added, Title, Category)
- **Filtering**: Filter by category and tags
- **Search**: Real-time search across titles, descriptions, and tags
- **Responsiveness**: Fully responsive at all standard breakpoints with mobile hamburger menu

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Clone the repository
```bash
git clone <repository-url>
cd Own-UI-Challenge1
```

2. Install dependencies
```bash
npm install
```

## Running the Application

### Important: You need to run TWO terminals simultaneously

#### Terminal 1 - JSON Server (Backend)
```bash
npm run server
```
This will start the JSON Server on `http://localhost:3001`

#### Terminal 2 - React App (Frontend)
```bash
npm run dev
```
This will start the Vite dev server on `http://localhost:5173`

### Access the Application
Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start the development server
- `npm run server` - Start the JSON Server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/
│   ├── EmptyState.tsx      # Empty state when no links
│   ├── LinkCard.tsx        # Card view for links
│   ├── LinkForm.tsx        # Form for adding/editing links
│   ├── LinkRow.tsx         # List view for links
│   ├── MobileNav.tsx       # Mobile hamburger navigation
│   ├── SearchControls.tsx  # Search, filter, and sort controls
│   ├── Stats.tsx           # Statistics display
│   └── Types.ts            # TypeScript type definitions
├── hooks/
│   └── useLinkVault.tsx    # Custom hook for link management
├── utils/
│   ├── api.ts              # API calls to JSON Server
│   └── localStorage.ts     # Local storage utilities
├── App.tsx                 # Main application component
└── main.tsx               # Application entry point
```

## Features Details

### Filtering
- Filter by category (All, General, Work, Personal, etc.)
- Filter by tags
- Real-time search across all link properties

### Sorting
- Sort by Date Added (newest first)
- Sort by Title (alphabetical)
- Sort by Category (alphabetical)

### Responsive Design
- **Mobile (< 768px)**: Hamburger menu, single column layout
- **Tablet (768px - 1024px)**: Two column grid
- **Desktop (> 1024px)**: Three to four column grid

### Edit Functionality
- Click edit button on any link
- Form pre-populates with existing data
- Changes saved to JSON Server
- Visual feedback notification on save

## Technologies Used

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **JSON Server** - Mock REST API
- **Lucide React** - Icons
- **CSS3** - Styling with responsive design

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Create a new branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

MIT
