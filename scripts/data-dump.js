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

const formatResult = ({ data: { data } }) => {
  const { id, images } = data;
  const snapshot = `${getImageKitUrl(images.snapshot)}`;
  const snapshotLQ = `${snapshot}?tr=bl-30,q-50`;

  return {
    key: id,
    value: camelCaseKeys(
      {
        ...data,
        countries: data.countries.map((country) => country.name),
        images: {
          ribbons: images.ribbons,
          snapshot,
          snapshotBlur: snapshotLQ,
        },
      },
      { deep: true }
    ),
  };
};

const defaultNormalize = ({ data: { lists, genres } }) => {
  const movieLists = lists.map(({ id, name, contents }) => ({
    id,
    name,
    movies: contents.data.map((movie) => {
      const { id, images, type } = movie;
      const cover = `${getImageKitUrl(images.artwork)}?tr=w-224,h-auto`;
      const coverLQ = `${cover},bl-30,q-50`;

      const info = camelCaseKeys(
        {
          ...movie,
          images: {
            ribbons: images.ribbons,
            cover,
            coverBlur: coverLQ,
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
          .then((result) => formatResult(result))
      )
    ).then((results) => helper({ results, fileName: 'movies' }));

    Promise.all(
      tvIds.map((id) =>
        axios
          .get(`${PREFIX}/tv_shows/${id}${SUFFIX}`)
          .then((result) => formatResult(result))
      )
    ).then((results) => helper({ results, fileName: 'shows' }));

    writeFile('lists', data.movieLists);
    writeFile('genres', data.movieGenres);
  });
