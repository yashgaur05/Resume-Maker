// Shared input styles for consistent appearance across all forms
export const inputStyles = {
  // Standard input field styling
  input: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 bg-white placeholder-gray-400",
  
  // Textarea styling
  textarea: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 bg-white placeholder-gray-400",
  
  // Select dropdown styling
  select: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 bg-white",
  
  // Label styling
  label: "block text-sm font-medium text-gray-700 mb-1",
  
  // Button styling
  button: {
    primary: "bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors",
    secondary: "bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors",
    danger: "bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors",
    success: "bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
  }
};

// Helper function to get input class with additional classes
export const getInputClass = (additionalClasses?: string) => {
  return additionalClasses ? `${inputStyles.input} ${additionalClasses}` : inputStyles.input;
};

// Helper function to get textarea class with additional classes
export const getTextareaClass = (additionalClasses?: string) => {
  return additionalClasses ? `${inputStyles.textarea} ${additionalClasses}` : inputStyles.textarea;
};

// Helper function to get select class with additional classes
export const getSelectClass = (additionalClasses?: string) => {
  return additionalClasses ? `${inputStyles.select} ${additionalClasses}` : inputStyles.select;
};
