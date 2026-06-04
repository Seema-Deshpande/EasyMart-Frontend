// Category colors and styles for professional product placeholders
const CATEGORY_STYLES = {
  Electronics: { color: '#2196F3', bgGradient: '#E3F2FD', icon: 'plug' },
  Clothing: { color: '#FF9800', bgGradient: '#FFF3E0', icon: 'shirt' },
  Books: { color: '#9C27B0', bgGradient: '#F3E5F5', icon: 'book' },
  Home: { color: '#4CAF50', bgGradient: '#E8F5E9', icon: 'home' },
  Sports: { color: '#F44336', bgGradient: '#FFEBEE', icon: 'ball' },
  Toys: { color: '#E91E63', bgGradient: '#FCE4EC', icon: 'game' },
  Other: { color: '#607D8B', bgGradient: '#ECEFF1', icon: 'box' }
};

// Generate SVG icons for categories
const getCategoryIconSVG = (iconType) => {
  const icons = {
    plug: '<path d="M7 12a2 2 0 1 1 4 0 2 2 0 0 1-4 0m7 0a2 2 0 1 1 4 0 2 2 0 0 1-4 0" stroke="currentColor" stroke-width="2" fill="none"/>',
    shirt: '<path d="M6 4h12v4l2 2v8H4v-8l2-2V4z" stroke="currentColor" stroke-width="2" fill="none"/>',
    book: '<path d="M4 19.5h12a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v14.5a1 1 0 0 0 1 1z" stroke="currentColor" stroke-width="2" fill="none"/><line x1="9" y1="4" x2="9" y2="18" stroke="currentColor" stroke-width="2"/>',
    home: '<path d="M3 12l9-9 9 9v6a2 2 0 0 1-2 2h-14a2 2 0 0 1-2-2z" stroke="currentColor" stroke-width="2" fill="none"/><path d="M9 22v-8h6v8" stroke="currentColor" stroke-width="2" fill="none"/>',
    ball: '<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2" fill="none"/><path d="M12 3c0 0 3 3 3 9s-3 9-3 9" stroke="currentColor" stroke-width="1.5" fill="none"/>',
    game: '<path d="M5 9a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2H5z" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="9" cy="14" r="1" fill="currentColor"/><circle cx="15" cy="12" r="1" fill="currentColor"/><circle cx="15" cy="14" r="1" fill="currentColor"/><circle cx="15" cy="16" r="1" fill="currentColor"/>',
    box: '<path d="M4 5h16v14H4z" stroke="currentColor" stroke-width="2" fill="none"/><path d="M4 5l8 6 8-6" stroke="currentColor" stroke-width="2" fill="none"/>'
  };
  return icons[iconType] || icons.box;
};

// Generate professional category-based placeholder image
export const generatePlaceholderImage = (productName = 'Product', category = 'Other') => {
  const style = CATEGORY_STYLES[category] || CATEGORY_STYLES.Other;
  const width = 300;
  const height = 300;
  
  // Create a visually appealing placeholder with category info
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${style.bgGradient};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${style.color};stop-opacity:0.1" />
        </linearGradient>
      </defs>
      
      <!-- Background gradient -->
      <rect width="${width}" height="${height}" fill="url(#grad)" />
      
      <!-- Decorative circles -->
      <circle cx="50" cy="50" r="30" fill="${style.color}" opacity="0.1" />
      <circle cx="250" cy="250" r="40" fill="${style.color}" opacity="0.08" />
      
      <!-- Icon container -->
      <g transform="translate(150, 80)" color="${style.color}">
        ${getCategoryIconSVG(style.icon)}
      </g>
      
      <!-- Category name background -->
      <rect x="30" y="180" width="240" height="50" fill="${style.color}" opacity="0.9" rx="8"/>
      
      <!-- Category name text -->
      <text 
        x="150" y="210" 
        font-size="16" 
        font-weight="bold"
        fill="white" 
        text-anchor="middle" 
        font-family="Arial, sans-serif"
      >${category}</text>
      
      <!-- Product name (truncated) -->
      <text 
        x="150" y="270" 
        font-size="11" 
        fill="${style.color}" 
        text-anchor="middle" 
        font-family="Arial, sans-serif"
        opacity="0.8"
      >${productName.substring(0, 22)}${productName.length > 22 ? '...' : ''}</text>
    </svg>
  `;
  return 'data:image/svg+xml;base64,' + btoa(svg);
};

// Validate if URL is accessible, with timeout
export const isValidImageUrl = async (url) => {
  if (!url || typeof url !== 'string') return false;
  
  // Don't validate data URIs
  if (url.startsWith('data:')) return true;
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second timeout
    
    const response = await fetch(url, { 
      method: 'HEAD',
      mode: 'no-cors',
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    return true;
  } catch (err) {
    return false;
  }
};

// Get best available image from product with intelligent fallback
export const getProductImage = (product) => {
  if (!product) {
    return generatePlaceholderImage('Product');
  }
  
  // Try direct image field first
  if (product.image && typeof product.image === 'string') {
    return product.image;
  }
  
  // Try images array
  if (product.images && Array.isArray(product.images) && product.images.length > 0) {
    const firstImage = product.images[0];
    if (typeof firstImage === 'string' && firstImage && !firstImage.includes('placeholder')) {
      return firstImage;
    }
  }
  
  // Fallback to generated category-based placeholder
  const productName = product.name || product.productName || 'Product';
  const category = product.category || 'Other';
  return generatePlaceholderImage(productName, category);
};
