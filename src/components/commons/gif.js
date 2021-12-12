import React, { useEffect, useState } from 'react';
import axios from 'axios';

function GIF({ url, callback }) {
  return (
    <div onClick={() => callback(url)} className="w-1/5 cursor-pointer">
      <img
        alt="gif"
        className="object-cover object-center w-full h-full"
        src={url}
      />
    </div>
  );
}

export default function Gif({ callback }) {
  const [search, setSearch] = useState('');
  const [gifs, setGifs] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    const fetchData = async () => {
      setLoading(true);
      const results = await axios('https://api.giphy.com/v1/gifs/search', {
        params: {
          api_key: 't9ZphMsTWeIQRFvqAb8UI4ONd0SEv4p0',
          q: search,
          limit: 25,
        },
      });
      setGifs(results.data.data);
      setLoading(false);
    };

    fetchData();
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const results = await axios('https://api.giphy.com/v1/gifs/trending', {
        params: {
          api_key: 't9ZphMsTWeIQRFvqAb8UI4ONd0SEv4p0',
          limit: 25,
        },
      });
      setGifs(results.data.data);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="p-4 w-4/5 rounded-md">
      <input
        aria-label="gifs"
        type="text"
        placeholder="search GIFs"
        className="px-2 mb-2 bg-gray-200 dark:bg-gray-900 text-sm dark:text-white w-full rounded-lg"
        onChange={({ target }) => setSearch(target.value)}
        value={search}
        onKeyPress={(event) => {
          if (event.key === 'Enter') {
            handleSearch();
          }
        }}
      />
      {loading && (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      )}
      <div className="w-full h-3/5 overflow-y-scroll">
        <div class="flex flex-wrap justify-around ">
          {gifs.length > 0
            ? gifs.map((gif) => {
                return (
                  <GIF
                    key={gif.id}
                    url={gif.images.fixed_height.url}
                    callback={callback}
                  />
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
}
