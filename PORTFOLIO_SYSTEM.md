# Portfolio System Documentation

## Overview

This portfolio system integrates with the LivingTech Creative API to display portfolio projects dynamically. The system includes:

1. **API Integration** - Fetches portfolio data from `https://livingtech.anshoria.my.id/api`
2. **Portfolio Listing** - Shows all active portfolios with search and filtering
3. **Portfolio Details** - Individual project pages with comprehensive information
4. **Featured Portfolio Section** - Highlights featured projects on the main page

## API Endpoints

### Portfolio Data
- **GET** `/portofolios` - Get all portfolios
- **GET** `/portofolios/{id}` - Get specific portfolio by ID
- **GET** `/portofolio-tags/{id}` - Get tags for a specific portfolio

### Data Structure

```typescript
interface Portfolio {
  id: number
  title: string
  background: string
  client: string
  category: string
  start_date: string
  end_date: string
  duration_days: number
  problem: string
  goal: string
  conclution: string
  cover_image: string
  project_url: string
  display_order: number
  is_active: boolean
  is_featured: boolean
  created_at: string
  updated_at: string
}
```

## Components

### 1. API Service (`src/lib/api.ts`)
Handles all API communication with error handling and type safety.

**Key Methods:**
- `getPortfolios()` - Fetch all active portfolios
- `getPortfolio(id)` - Fetch specific portfolio
- `getFeaturedPortfolios()` - Fetch featured portfolios only
- `getPortfolioTags(portfolioId)` - Fetch tags for a portfolio

### 2. Portfolio Section (`src/components/portfolio-section.tsx`)
Displays featured portfolios on the main page.

**Features:**
- Shows only featured and active portfolios
- Limited to 4 projects
- Links to individual portfolio pages
- Loading states with skeleton UI

### 3. Portfolio Listing (`src/app/portofolio/page.tsx`)
Complete portfolio listing with search and filtering.

**Features:**
- Search functionality (title, description, tags)
- Category filtering
- Masonry grid layout
- Loading states
- Responsive design

### 4. Portfolio Details (`src/app/portofolio/[id]/page.tsx`)
Individual portfolio project page.

**Features:**
- Complete project information
- Project timeline and details
- Problem statement and goals
- Conclusion section
- Live project link (if available)
- Responsive layout with sidebar

## File Structure

```
src/
├── lib/
│   └── api.ts                    # API service
├── components/
│   ├── portfolio-section.tsx     # Featured portfolios
│   └── error-boundary.tsx        # Error handling
└── app/
    └── portofolio/
        ├── page.tsx              # Portfolio listing
        └── [id]/
            └── page.tsx          # Portfolio details
```

## Usage

### Adding to Main Page
The portfolio section is automatically included in the main page and shows featured projects.

### Navigation
- Main page portfolio section → `/portofolio` (all portfolios)
- Portfolio cards → `/portofolio/{id}` (individual project)
- "View all portfolio" link → `/portofolio`

### Customization

#### Styling
All components use Tailwind CSS classes and can be customized by modifying the className props.

#### API Configuration
Update the `API_BASE_URL` in `src/lib/api.ts` to point to your API endpoint.

#### Error Handling
The system includes:
- Loading states with skeleton UI
- Error boundaries for graceful error handling
- Fallback images for missing portfolio images
- Console logging for debugging

## Features

### Search & Filter
- **Search**: Searches through title, description, and tags
- **Filter**: Filter by category (Web Design, Web Development, etc.)
- **Real-time**: Updates as you type or change filters

### Responsive Design
- Mobile-first approach
- Masonry grid layout
- Responsive images and text
- Touch-friendly interactions

### Performance
- Lazy loading of images
- Efficient API calls
- Loading states to prevent layout shifts
- Error boundaries for stability

## Error Handling

The system handles various error scenarios:

1. **API Errors**: Graceful fallbacks with user-friendly messages
2. **Missing Data**: Default values and placeholder images
3. **Network Issues**: Retry mechanisms and offline states
4. **Invalid IDs**: 404 pages for non-existent portfolios

## Future Enhancements

Potential improvements:
- Tag system integration
- Portfolio image galleries
- Related projects
- Social sharing
- Analytics tracking
- Admin interface for content management
