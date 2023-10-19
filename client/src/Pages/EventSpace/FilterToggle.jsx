const { useState } = require("react");

const FilterToggle = ({ onChange }) => {
  const [sortByUpvotes, setSortByUpvotes] = useState(false);

  const handleToggleChange = () => {
    setSortByUpvotes(!sortByUpvotes);
    onChange(!sortByUpvotes); // Notify the parent component about the change.
  };

  return (
    <>
      <span className="mr-3 text-sm font-medium">Chronological</span>
      <label className="relative inline-flex cursor-pointer items-center">
        <input
          type="checkbox"
          value=""
          checked={sortByUpvotes}
          onChange={handleToggleChange}
          className="peer sr-only"
        />
        <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute  after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-orange-500 peer-checked:after:translate-x-full peer-checked:after:border-white dark:border-gray-600 dark:bg-gray-700"></div>
      </label>
      <span className="ml-3 text-sm font-medium">Up votes</span>
    </>
  );
};

export default FilterToggle;
