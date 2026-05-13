// Format a number as USD currency

export const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', { precision: 2, style: 'currency', currency: 'USD' }).format(price);
}

// Format a date string as "Month DD, YYYY"

export const formatDate = ( dateString ) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options); 
}

// Basic email regex check - return Boolean

export const validateEmail = ( email ) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}


// Extract a human-readable error message from an Axios error or plain Error

export const getErrorMessage = (error) => {
    return (
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "An unexpected error occurred"
    );
};
// // Truncate text to maxLength chars and append "..."
export const truncateText = ( text, maxLength ) => {
    if (text.length <= maxLength) {
        return text;
    }
    return text.slice(0, maxLength) + '...';
}

