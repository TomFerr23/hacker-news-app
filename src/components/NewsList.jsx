import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewsItem from './NewsItem';

const NewsList = ({ searchTerm }) => {
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const HN_API_BASE_URL = import.meta.env.VITE_HN_API_BASE_URL;

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const { data: ids } = await axios.get(`${HN_API_BASE_URL}/newstories.json`);
        const newsPromises = ids.slice(0, 12 * page).map(id =>
          axios.get(`${HN_API_BASE_URL}/item/${id}.json`)
        );
        const newsData = await Promise.all(newsPromises);
        setNews(newsData.map(({ data }) => data));
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [page, searchTerm]);

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const filteredNews = news.filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredNews.map(item => (
          <NewsItem key={item.id} title={item.title} url={item.url} date={item.time * 1000} />
        ))}
      </div>
      {loading && <p>Loading...</p>}
      {!loading && (
        <div className="flex justify-center mt-12">
          <button onClick={loadMore} className="p-2 bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded">
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default NewsList;
