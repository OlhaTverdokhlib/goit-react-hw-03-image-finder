import axios from 'axios';

export const getPhotoByName = async (name = '', page = 1) => {
  const API_KEY = '31049389-607cc0a43899480929969a464';
  const {
    data: { hits },
  } = await axios.get(
    `https://pixabay.com/api/?q=${name}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&page=${page}&per_page=12`
      );
    
  return hits;
};
