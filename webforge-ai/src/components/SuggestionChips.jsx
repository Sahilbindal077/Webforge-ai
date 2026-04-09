export default function SuggestionChips({ onSelect }) {
  const suggestions = [
    "Portfolio for a photographer",
    "Modern SaaS landing page",
    "Minimalist e-commerce store",
    "Agency website with dark theme",
  ];

  return (
    <div className="flex flex-wrap gap-2 mt-4 justify-center">
      {suggestions.map((suggestion, index) => (
        <button
          key={index}
          onClick={() => onSelect(suggestion)}
          className="px-4 py-1.5 rounded-full text-sm font-medium bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-white/10 hover:border-indigo-200 dark:hover:border-white/20 transition-all duration-200"
        >
          {suggestion}
        </button>
      ))}
    </div>
  );
}
