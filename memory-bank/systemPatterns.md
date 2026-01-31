# System Patterns - Baklava Nights

## System Architecture
The Baklava Nights website is a static single-page application (SPA) built with vanilla HTML, CSS, and JavaScript. It follows a client-side rendering approach with no backend server, relying entirely on frontend technologies for functionality.

### Architectural Overview
- **Frontend Only**: Pure client-side implementation with no server-side processing
- **Static Hosting**: Designed for deployment on platforms like Netlify or similar CDN services
- **Progressive Enhancement**: Core functionality works without JavaScript, but enhanced with JS for better UX

## Key Technical Decisions
1. **Multi-language Support**: Implemented client-side with JavaScript translations and localStorage persistence
2. **SEO Optimization**: Comprehensive meta tags, Open Graph, and structured data for search engine visibility
3. **Analytics Integration**: Facebook Pixel and Google Analytics with GDPR-compliant opt-in consent
4. **Responsive Design**: Mobile-first CSS approach with specific breakpoints for various devices
5. **Asset Optimization**: SVG logos and preloaded critical resources for performance

## Design Patterns in Use
### Client-Side Translation Pattern
- Uses JavaScript object-based translation system
- localStorage for language preference persistence
- URL path-based language detection (/en, /tr, /bg, /ar)
- Data attributes (data-translate) for markup integration

### Analytics Tracking Pattern
- Facebook Pixel integration with event tracking
- Google Analytics with consent management
- UTM parameter tracking for campaign attribution
- Consent-based data collection with cookie consent library

### Responsive Design Pattern
- Mobile-first CSS media queries
- Fluid typography and flexible layouts
- Device-specific optimizations (iPhone, tablet, desktop)
- SVG assets for resolution independence

### Event Handling Pattern
- Centralized event listeners for language switching
- Analytics event tracking on user interactions
- External link handling with noopener/noreferrer for security

## Component Relationships
### Core Components
1. **Header Section**: Logo, motto, and language switcher
2. **Event Information**: Date, time, venue details
3. **Call-to-Action**: Ticket purchase button and early bird text
4. **Ticket Information**: Event details and FAQs
5. **Social Section**: Partner logos and social media links
6. **Footer**: Terms of service link
7. **Background Elements**: Particle effects and overlay

### Data Flow
- Language selection → localStorage update → DOM translation update
- User interaction → Analytics event tracking → External services
- Page load → UTM parameter detection → Analytics tracking
- Cookie consent → Analytics storage permission update

## Critical Implementation Paths
### Page Load Sequence
1. HTML and CSS load immediately
2. Critical resources preloaded (background image, logos)
3. JavaScript executes DOMContentLoaded event
4. Language initialization (URL → localStorage → browser default → English)
5. Particle effects generation
6. UTM parameter tracking
7. Cookie consent initialization

### Language Switching Flow
1. User clicks language option
2. JavaScript updates localStorage preference
3. URL updated via history.replaceState
4. DOM elements updated with translated text
5. Analytics event logged for language change

### Analytics Consent Flow
1. Cookie consent dialog displayed on first visit
2. User accepts or rejects analytics tracking
3. Consent status stored and applied to analytics services
4. Future visits respect stored preference

## Performance Considerations
- **Critical Path**: Preloading background image and logos
- **JavaScript Execution**: Non-blocking async scripts where possible
- **CSS Optimization**: Minimal repaints and efficient selectors
- **Asset Delivery**: CDN hosting for fast global access

## Security Patterns
- External links use rel="noopener noreferrer"
- Cookie consent compliance with GDPR
- Analytics data anonymization where possible
- Secure meta tags for social sharing

## Maintenance Patterns
- Centralized translation object for easy content updates
- Structured data markup for SEO maintenance
- Modular CSS for style management
- Clear separation of concerns in JavaScript functions
