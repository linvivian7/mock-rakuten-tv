const axios = require('axios');
const camelCaseKeys = require('camelcase-keys');
const fs = require('fs');
const Path = require('path');

const FILE_DIR = './static/data';

const TOP_URL =
  'https://gizmo.rakuten.tv/v3/gardens/default?classification_id=5&device_identifier=web&locale=es&market_code=es&user_status=visitor';

const defaultNormalize = ({ data: { lists, genres } }) => {
  const movieLists = lists.map(({ id, name, contents }) => ({
    id,
    name,
    movies: contents.data.map((movie) => {
      const artwork =
        movie.images.artwork &&
        `https://ik.imagekit.io/hqe2xslcea/${
          movie.images.artwork.split('system/')[1]
        }?tr=w-224,h-auto`;
      const lofi =
        movie.images.artwork &&
        `https://ik.imagekit.io/hqe2xslcea/${
          movie.images.artwork.split('system/')[1]
        }?tr=w-224,h-auto,bl-30,q-50`;
      const snapshot =
        movie.images.snapshot &&
        `https://ik.imagekit.io/hqe2xslcea/${
          movie.images.snapshot.split('system/')[1]
        }`;

      return camelCaseKeys(
        {
          ...movie,
          images: {
            ...movie.images,
            originalArtwork: movie.images.artwork,
            cover: artwork,
            coverBlur: lofi,
            snapshot,
          },
        },
        { deep: true }
      );
    }),
  }));

  const movieGenres = genres.data.map((genre) => camelCaseKeys(genre));

  return {
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

    writeFile('lists', data.movieLists);
    writeFile('genres', data.movieGenres);
  });
