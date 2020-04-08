const axios = require('axios');
const camelCaseKeys = require('camelcase-keys');
const fs = require('fs');

const FILE_DIR = './static/data';
const PREFIX = 'https://gizmo.rakuten.tv/v3';
const SUFFIX =
  '?classification_id=5&device_identifier=web&locale=es&market_code=es&user_status=visitor';
const TOP_URL = `${PREFIX}/gardens/default${SUFFIX}`;

const getImageKitUrl = (url) =>
  url && `https://ik.imagekit.io/hqe2xslcea/${url.split('system/')[1]}`;

const movieIds = [];
const tvIds = [];

const writeFile = (filename, data) => {
  fs.writeFile(`${FILE_DIR}/${filename}.json`, JSON.stringify(data), (err) => {
    if (err) {
      throw new Error(err);
    }

    console.log(`${filename} JSON file saved.`);
  });
};

const helper = ({ results, fileName }) => {
  const raw = {};

  results.forEach((result) => {
    raw[result.key] = result.value;
  });

  writeFile(fileName, raw);
};

const formatResult = (id, result) => ({ key: id, value: result.data.data });

const defaultNormalize = ({ data: { lists, genres } }) => {
  const movieLists = lists.map(({ id, name, contents }) => ({
    id,
    name,
    movies: contents.data.map((movie) => {
      const { id, images, type } = movie;
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

      if (type === 'movies') {
        movieIds.push(id);
      } else if (type === 'tv_shows') {
        tvIds.push(id);
      }

      return info;
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
    try {
      fs.mkdirSync(FILE_DIR);
      console.log(`${FILE_DIR} folder created.`);
    } catch (error) {
      console.log(`${FILE_DIR} folder existed.`);
    }

    Promise.all(
      movieIds.map((id) =>
        axios
          .get(`${PREFIX}/movies/${id}${SUFFIX}`)
          .then((result) => formatResult(id, result))
      )
    ).then((results) => helper({ results, fileName: 'movies' }));

    Promise.all(
      tvIds.map((id) =>
        axios
          .get(`${PREFIX}/tv_shows/${id}${SUFFIX}`)
          .then((result) => formatResult(id, result))
      )
    ).then((results) => helper({ results, fileName: 'shows' }));

    writeFile('lists', data.movieLists);
    writeFile('genres', data.movieGenres);
  });
