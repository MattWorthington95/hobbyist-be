const { Club } = require('../models/Club');

exports.getClubs = (req, res, next) => {
  const { day, price, level, ageGroup, clubType, time } = req.query;
  const validError = validateQueries({
    day,
    price,
    level,
    ageGroup,
    clubType,
    time
  });
  if (validError) return next(validError);

  const mongoQuery = {};

  for (let urlQuery in req.query) {
    if (urlQuery === 'day') {
      const str = `hours.${day}.open`;
      mongoQuery[str] = { $ne: null };
    } else if (urlQuery === 'time') {
      const str = `hours.${day}.open`;
      mongoQuery[str] = { $gte: time };
    } else {
      mongoQuery[urlQuery] = req.query[urlQuery];
    }
  }

  if (price) {
    mongoQuery.price = { $lte: price };
  }

  Club.find(mongoQuery)
    .then((clubs) => {
      res.status(200).send({ clubs });
    })
    .catch(next);
};

const validateQueries = ({ day, price, level, ageGroup, clubType, time }) => {
  const validDays = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday'
  ];
  const validClubTypes = ['music', 'art', 'sport', 'other'];
  const validAgeGroups = [
    'toddler',
    'pre-school',
    'primary-school',
    'secondary',
    'young adult',
    'adult'
  ];
  const validLevels = ['beginner', 'intermediate', 'advanced', 'all levels'];

  if (day && !validDays.includes(day))
    return { status: 400, msg: 'Invalid day value' };

  if (clubType && !validClubTypes.includes(clubType))
    return { status: 400, msg: 'Invalid club type' };

  if (price && price < 0) {
    return {
      status: 400,
      msg: 'Price cannot be a negative number'
    };
  }

  if (ageGroup && !validAgeGroups.includes(ageGroup))
    return { status: 400, msg: 'Invalid age group' };

  if (level && !validLevels.includes(level))
    return { status: 400, msg: 'Invalid level' };

  if (time) {
    if (!day) return { status: 400, msg: 'Must provide a day' };
    if (time < 0 || time > 24 || typeof +time !== 'number') {
      return { status: 400, msg: 'Invalid time' };
    }
  }
};
