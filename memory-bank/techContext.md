# Tech Context - Baklava Nights

## Technologies Used
### Core Technologies
- **HTML5**: Semantic markup with modern web standards
- **CSS3**: Advanced styling with flexbox, grid, and responsive design
- **Vanilla JavaScript**: Client-side functionality without frameworks
- **SVG**: Vector graphics for logos and icons
- **PNG**: Raster background image

### External Services and Libraries
- **Facebook Pixel**: Meta analytics and conversion tracking (ID: 1099694521779646)
- **Google Analytics**: Google analytics with consent management (ID: G-MEFR1RGKXK)
- **Cookie Consent**: cookieconsent@3 library for GDPR compliance
- **Google Apps Script**: Consent logging backend (via fetch API)

### Deployment and Hosting
- **Netlify**: Static site hosting and deployment platform
- **CDN**: Content delivery network for global asset distribution
- **Custom Domain**: baklavanights.com

## Development Setup
### Local Development
- No build process required - direct file editing
- Live server recommended for local testing
- Browser developer tools for debugging

### File Structure
```
├── index.html              # Main website page
├── robots.txt              # Search engine directives
├── sitemap.xml             # SEO sitemap
├── assets/                 # Static assets directory
│   ├── background.png      # Background image
│   ├── baklavanightslogo.svg # Main logo
│   ├── favicon.ico         # Browser favicon
│   ├── KUPE.svg            # Venue partner logo
│   └── sobaklava.svg       # Food partner logo
├── memory-bank/            # Project documentation
├── terms-of-service-and-privacy-policy/ # Legal documents
└── .netlify/              # Netlify configuration
    └── netlify.toml       # Deployment configuration
```

### Development Dependencies
- No package.json or node_modules required
- External libraries loaded via CDN:
  - cookieconsent@3 (from jsDelivr CDN)
  - Facebook Pixel SDK (from Facebook CDN)
  - Google Analytics (from Google CDN)

## Technical Constraints
### Browser Support
- Modern browsers with ES6+ JavaScript support
- CSS Grid and Flexbox compatibility required
- SVG support essential for logos
- localStorage for language preference persistence

### Performance Constraints
- No backend server for dynamic content
- External API calls limited to analytics and consent logging
- All assets must be optimized for fast loading
- Client-side translation adds minimal JavaScript overhead

### Privacy Constraints
- GDPR compliance required for EU visitors
- Cookie consent mandatory before analytics tracking
- Data anonymization where possible
- Clear privacy policy access

## Tool Usage Patterns
### Code Editing
- Direct HTML/CSS/JS file editing
- No transpilation or compilation needed
- Inline JavaScript and CSS for simplicity

### Testing
- Cross-browser testing required
- Mobile device testing essential
- Analytics and pixel testing
- Multi-language functionality testing

### Deployment
- Netlify continuous deployment from repository
- No build process - direct file serving
- CDN for global asset distribution

## Integration Points
### External Services
1. **Ticketing Platform**: tickets.baklavanights.com (external redirect)
2. **Social Media**: Instagram profiles for event and partners
3. **Analytics**: Facebook Pixel and Google Analytics
4. **Consent Management**: cookieconsent library + Google Apps Script

### APIs and Web Services
- Facebook Pixel API for event tracking
- Google Analytics Measurement Protocol
- Google Apps Script web app for consent logging
- No custom backend APIs

## Development Best Practices
### Code Organization
- Semantic HTML structure
- Modular CSS with clear class naming
- JavaScript functions with clear responsibilities
- Centralized translation system

### Performance Optimization
- Critical resource preloading
- SVG optimization for fast rendering
- Minimal JavaScript execution
- Efficient CSS selectors

### SEO Best Practices
- Comprehensive meta tags
- Open Graph and Twitter Card support
- Structured data (Schema.org)
- XML sitemap and robots.txt

## Monitoring and Analytics
### Key Metrics Tracked
- Page views and user engagement
- Language preference usage
- Ticket purchase conversions
- UTM campaign performance
- Consent acceptance rates

### Error Handling
- Graceful degradation without JavaScript
- Fallback language support
- External service failure handling
- Mobile device compatibility

## Security Considerations
- External link security (noopener/noreferrer)
- XSS prevention through safe DOM manipulation
- HTTPS enforcement via hosting platform
- Data privacy compliance
