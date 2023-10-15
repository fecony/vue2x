// @vitest-environment node
import moment from 'moment';
import { describe, expect, test } from 'vitest';
import { currentDateTime, formatDate, getDueDateDayDifference } from '../date';

test('currentDateTime returns current date with time set to 00:00', () => {
  const currentDate = moment().local();
  const formatedDate = currentDateTime();
  const date = currentDate.toString().split('T')[0];

  expect(formatedDate).toContain('T00:00');
  expect(formatedDate).toContain(date);
});

describe('formatDate', () => {
  describe('it displays past dates correctly', () => {
    test('it displays past day correctly', () => {
      const previousDay = moment().subtract(1, 'days');
      expect(formatDate(previousDay.toISOString())).toBe('a day ago');
    });

    test('it displays past few days correctly', () => {
      const previousDay = moment().subtract(5, 'days');
      expect(formatDate(previousDay.toISOString())).toBe('5 days ago');
    });

    test('it displays past days correctly', () => {
      const previousDay = moment().subtract(15, 'days');
      expect(formatDate(previousDay.toISOString())).toBe('15 days ago');
    });

    test('it displays past month correctly', () => {
      const previousDay = moment().subtract(1, 'month');
      expect(formatDate(previousDay.toISOString())).toBe('a month ago');
    });

    test('it displays past few month correctly', () => {
      const previousDay = moment().subtract(2, 'month');
      expect(formatDate(previousDay.toISOString())).toBe('2 months ago');
    });
  });

  describe('it displays future dates correctly', () => {
    test('it displays one day due correctly', () => {
      const previousDay = moment().add(1, 'days');
      expect(formatDate(previousDay.toISOString())).toBe('in a day');
    });

    test('it displays few days due correctly', () => {
      const previousDay = moment().add(5, 'days');
      expect(formatDate(previousDay.toISOString())).toBe('in 5 days');
    });

    test('it displays future days correctly', () => {
      const previousDay = moment().add(15, 'days');
      expect(formatDate(previousDay.toISOString())).toBe('in 15 days');
    });

    test('it displays due month correctly', () => {
      const previousDay = moment().add(1, 'month');
      expect(formatDate(previousDay.toISOString())).toBe('in a month');
    });

    test('it displays due few month correctly', () => {
      const previousDay = moment().add(2, 'month');
      expect(formatDate(previousDay.toISOString())).toBe('in 2 months');
    });
  });
});

describe('getDueDateDayDifference', () => {
  test('it displays correct day difference for same day task', () => {
    const sameDay = moment().local();
    expect(getDueDateDayDifference(sameDay.format('YYYY-MM-DDT00:00'))).toBe(0);
  });

  test('it displays correct day difference for upcomming days #1', () => {
    const days = 2;
    const upcommingDays = moment().local().add(days, 'days');
    expect(getDueDateDayDifference(upcommingDays.format('YYYY-MM-DDT00:00'))).toBe(
      days - 1,
    );
  });

  test('it displays correct day difference for upcomming days #2', () => {
    const days = 15;
    const upcommingDays = moment().local().add(days, 'days');
    expect(getDueDateDayDifference(upcommingDays.format('YYYY-MM-DDT00:00'))).toBe(
      days - 1,
    );
  });
});
