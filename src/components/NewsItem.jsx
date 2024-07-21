import React from 'react';
import { FaRegClock } from 'react-icons/fa';

const NewsItem = ({ title, url, date }) => {
  return (
    <div className="card-bg rounded-lg shadow-md overflow-hidden m-4 transition-colors duration-300 flex flex-col justify-between h-full">
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <a href={url} target="_blank" rel="noopener noreferrer" className="block text-lg font-semibold mb-2 truncate-3-lines">
            {title}
          </a>
        </div>
        <div className="text-sm text-light dark:text-dark flex items-center mt-4">
          <FaRegClock className="mr-2" />
          <span>{new Date(date).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
