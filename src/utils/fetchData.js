export const exerciseOptions = {
  method: 'GET',
  headers: {
    //'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
    //'X-RapidAPI-Key': '865f91b2aamsh0d9403b5afa9adcp1922e2jsnf1e6d597d54d',
    //'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
  },
};

export const youtubeOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com',
    'X-RapidAPI-Key': '865f91b2aamsh0d9403b5afa9adcp1922e2jsnf1e6d597d54d',
  },
};

export const fetchData = async (url, options) => {
  const res = await fetch(url, options);
  const data = await res.json();

  return data;
};

export const fetchBackednData = async (url) => {
  const res = await fetch(url);
  const data = await res.json();

  return data;
};
