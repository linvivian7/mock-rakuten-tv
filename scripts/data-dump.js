const axios = require('axios');
const camelCaseKeys = require('camelcase-keys');
const fs = require('fs');
const Path = require('path');

const FILE_DIR = './static/data';

const TOP_URL =
  'https://gizmo.rakuten.tv/v3/gardens/default?classification_id=5&device_identifier=web&locale=es&market_code=es&user_status=visitor';

const getImageKitUrl = (url) =>
  url && `https://ik.imagekit.io/hqe2xslcea/${url.split('system/')[1]}`;

const defaultNormalize = ({ data: { lists, genres } }) => {
  const allMovies = {};
  const movieLists = lists.map(({ id, name, contents }) => ({
    id,
    name,
    movies: contents.data.map((movie) => {
      const { id, images } = movie;
      const cover = `${getImageKitUrl(images.artwork)}?tr=w-224,h-auto`;
      const coverLQ = `${cover},bl-30,q-50`;
      const snapshot = `${getImageKitUrl(images.snapshot)}`;
      const snapshotLQ = `${getImageKitUrl(images.snapshot)}?tr=bl-30,q-50`;
      const info = camelCaseKeys(
        {
          ...movie,
          images: {
            ...movie.images,
            cover,
            coverBlur: coverLQ,
            snapshot,
            snapshotBlur: snapshotLQ,
          },
        },
        { deep: true }
      );

      allMovies[id] = info;

      return info;
    }),
  }));

  const movieGenres = genres.data.map((genre) => camelCaseKeys(genre));

  return {
    movies: allMovies,
    movieLists,
    movieGenres,
  };
};

axios
  .get(TOP_URL)
  .then((result) => defaultNormalize(result.data))
  .then((data) => {
    const writeFile = (filename, data) => {
      fs.writeFile(
        `${FILE_DIR}/${filename}.json`,
        JSON.stringify(data),
        (err) => {
          if (err) {
            throw new Error(err);
          }

          console.log(`${filename} JSON file saved.`);
        }
      );
    };

    try {
      fs.mkdirSync(FILE_DIR);
      console.log(`${FILE_DIR} folder created.`);
    } catch (error) {
      console.log(`${FILE_DIR} folder existed.`);
    }

    writeFile('movies', data.movies);
    writeFile('lists', data.movieLists);
    writeFile('genres', data.movieGenres);
  });
