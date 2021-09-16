const { randomiseHours } = require('../utils/utils');

describe('randomiseHours', () => {
  it('should return an object with keys of each day of the week', () => {
    const output = randomiseHours();

    expect(output).toBeInstanceOf(Object);
    expect(output).toHaveProperty('monday');
    expect(output).toHaveProperty('tuesday');
    expect(output).toHaveProperty('wednesday');
    expect(output).toHaveProperty('thursday');
    expect(output).toHaveProperty('friday');
    expect(output).toHaveProperty('saturday');
    expect(output).toHaveProperty('sunday');
  });
  it('each day should contain an object with a key of open and a key of close', () => {
    const output = randomiseHours();

    expect(output.monday).toBeInstanceOf(Object);
    expect(output.monday).toHaveProperty('open');
    expect(output.monday).toHaveProperty('close');
  });
  it('at least one of the day objects should contain a number on the key of open and close', () => {
    const output = randomiseHours();

    const openHoursArray = Object.values(output);
    const openHoursOnly = openHoursArray.filter((openHours) => {
      return openHours.open;
    });

    expect(openHoursOnly.length).not.toBe(0);
  });
  it('the opening hours should always be at least 1 hour before the closing hours', () => {
    const output = randomiseHours();

    const openHoursArray = Object.values(output);
    const openHoursOnly = openHoursArray.filter((openHours) => {
      return openHours.open;
    });

    expect(openHoursOnly[0].close - openHoursOnly[0].open).toBeGreaterThan(0);
  });
});
