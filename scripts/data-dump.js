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

const formatMovieResult = (id, { data: { data } }) => {
  const { images, countries, directors, actors } = data;
  const snapshot = `${getImageKitUrl(images.snapshot)}`;
  const snapshotLQ = `${snapshot}?tr=bl-30,q-50`;
  const offlineStream =
    data.view_options &&
    data.view_options.private &&
    data.view_options.private['offline_streams'];

  return {
    key: id,
    value: camelCaseKeys(
      {
        ...data,
        countries: countries.map((country) => country.name),
        images: {
          ribbons: images.ribbons,
          snapshot,
          snapshotBlur: snapshotLQ,
        },
        languages: {
          audio:
            offlineStream &&
            offlineStream[0]['audio_languages'].map(({ name }) => name),
          subtitles:
            offlineStream &&
            offlineStream[0]['subtitle_languages']
              .map(({ name }) => name)
              .join(', '),
        },
        cast: [
          ...directors.map(({ name, photo }) => ({
            name,
            photo: getImageKitUrl(photo),
            isDirector: true,
          })),
          ...actors.map(({ name, photo }) => ({
            name,
            photo: getImageKitUrl(photo),
            isDirector: false,
          })),
        ],
      },
      { deep: true }
    ),
  };
};

const formatShowResult = (id, { data: { data } }) => {
  const { episodes, images, directors, actors } = data;
  const snapshot = `${getImageKitUrl(images.snapshot)}`;
  const snapshotLQ = `${snapshot}?tr=bl-30,q-50`;
  const offlineStream =
    episodes[0] &&
    episodes[0].view_options &&
    episodes[0].view_options.private &&
    episodes[0].view_options.private['offline_streams'];

  return {
    key: id,
    value: camelCaseKeys(
      {
        ...data,
        images: {
          ribbons: images.ribbons,
          snapshot,
          snapshotBlur: snapshotLQ,
        },
        languages: {
          audio:
            offlineStream &&
            offlineStream[0]['audio_languages'].map(({ name }) => name),
          subtitles:
            offlineStream &&
            offlineStream[0]['subtitle_languages']
              .map(({ name }) => name)
              .join(', '),
        },
        cast: [
          ...directors.map(({ name, photo }) => ({
            name,
            photo: getImageKitUrl(photo),
            isDirector: true,
          })),
          ...actors.map(({ name, photo }) => ({
            name,
            photo: getImageKitUrl(photo),
            isDirector: false,
          })),
        ],
      },
      { deep: true }
    ),
  };
};

const defaultNormalize = ({ data: { lists, genres } }) => {
  const contentLists = lists.map(({ id, name, contents }) => ({
    id,
    name,
    content: contents.data.map((content) => {
      const { id, images, type } = content;
      const cover = `${getImageKitUrl(images.artwork)}?tr=w-224,h-auto`;
      const coverLQ = `${cover},bl-30,q-50`;

      const info = camelCaseKeys(
        {
          ...content,
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
    contentLists,
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
          .then((result) => formatMovieResult(id, result))
      )
    ).then((results) => helper({ results, fileName: 'movies' }));

    Promise.all(
      tvIds.map((id) =>
        axios
          .get(`${PREFIX}/seasons/${id}-1${SUFFIX}`)
          .then((result) => formatShowResult(id, result))
      )
    ).then((results) => helper({ results, fileName: 'shows' }));

    writeFile('lists', data.contentLists);
    writeFile('genres', data.movieGenres);
  });
