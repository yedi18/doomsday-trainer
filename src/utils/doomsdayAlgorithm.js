/**
 * Pure Doomsday Algorithm Implementation
 * Based on John Conway's method (1973)
 * No Date API usage - completely algorithmic
 */

// Day names mapping (0-6)
export const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const DAY_NAMES_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Alternative export name for compatibility
export const DAYS_OF_WEEK = DAY_NAMES;

/**
 * Check if a year is a leap year
 */
export function isLeapYear(year) {
  if (year % 400 === 0) return true;
  if (year % 100 === 0) return false;
  if (year % 4 === 0) return true;
  return false;
}

/**
 * Get the century anchor day for a given year
 * The pattern repeats every 400 years: Tuesday(2), Sunday(0), Friday(5), Wednesday(3)
 * 1600s=2, 1700s=0, 1800s=5, 1900s=3, 2000s=2, ...
 */
export function getCenturyAnchor(year) {
  const century = Math.floor(year / 100);
  const anchors = [2, 0, 5, 3]; // Tuesday, Sunday, Friday, Wednesday
  
  // Calculate position in 400-year cycle (relative to 1600)
  // 1600 is at position 0, 1700 at position 1, etc.
  let position = (century - 16) % 4;
  
  // Handle negative modulo in JavaScript
  if (position < 0) position += 4;
  
  return anchors[position];
}

/**
 * Calculate the Doomsday for a specific year
 * Using Conway's formula: a + b + c
 * where a = floor(y/12), b = y mod 12, c = floor(b/4)
 */
export function getYearDoomsday(year, centuryAnchor = null) {
  if (centuryAnchor === null) {
    centuryAnchor = getCenturyAnchor(year);
  }
  const y = year % 100; // Last two digits
  
  const a = Math.floor(y / 12);
  const b = y % 12;
  const c = Math.floor(b / 4);
  const d = (a + b + c) % 7;
  
  return (centuryAnchor + d) % 7;
}

/**
 * Get the Doomsday date for each month
 * Returns the day number that falls on Doomsday for that month
 */
export function getMonthDoomsday(month, isLeap) {
  const doomsdayDates = {
    1: isLeap ? 4 : 3,   // January: 3 (common), 4 (leap)
    2: isLeap ? 29 : 28, // February: 28 (common), 29 (leap) - always last day
    3: 7,  // March: 7 (or 0, 14, 21, 28)
    4: 4,  // April: 4/4
    5: 9,  // May: 9 (from "9-5 at 7-11")
    6: 6,  // June: 6/6
    7: 11, // July: 11 (from "9-5 at 7-11")
    8: 8,  // August: 8/8
    9: 5,  // September: 5 (from "9-5 at 7-11")
    10: 10, // October: 10/10
    11: 7,  // November: 7 (from "9-5 at 7-11")
    12: 12  // December: 12/12
  };
  
  return doomsdayDates[month];
}

/**
 * Calculate the day of week for any date
 * Returns 0-6 (Sunday-Saturday)
 */
export function getDayOfWeek(year, month, day) {
  const yearDoomsday = getYearDoomsday(year);
  const isLeap = isLeapYear(year);
  const monthDoomsday = getMonthDoomsday(month, isLeap);
  
  // Calculate distance from month's doomsday
  const distance = day - monthDoomsday;
  
  // Add to year's doomsday and take mod 7
  let result = (yearDoomsday + distance) % 7;
  
  // Handle negative results
  if (result < 0) result += 7;
  
  return result;
}

// Alternative name for compatibility
export function calculateDayOfWeek(day, month, year) {
  return getDayOfWeek(year, month, day);
}

/**
 * Get detailed step-by-step calculation for educational purposes
 */
export function getDetailedCalculation(year, month, day) {
  const isLeap = isLeapYear(year);
  const century = Math.floor(year / 100);
  const centuryAnchor = getCenturyAnchor(year);
  const y = year % 100;
  
  // Step 1: Century Anchor
  const step1 = {
    title: 'Step 1: Find Century Anchor',
    century: century,
    anchor: centuryAnchor,
    anchorDay: DAY_NAMES[centuryAnchor],
    explanation: `The ${century}00s have anchor day: ${DAY_NAMES[centuryAnchor]}`
  };
  
  // Step 2: Calculate Year Doomsday
  const a = Math.floor(y / 12);
  const b = y % 12;
  const c = Math.floor(b / 4);
  const d = (a + b + c) % 7;
  const yearDoomsday = (centuryAnchor + d) % 7;
  
  const step2 = {
    title: 'Step 2: Calculate Year Doomsday',
    y: y,
    a: a,
    b: b,
    c: c,
    d: d,
    yearDoomsday: yearDoomsday,
    yearDoomsdayName: DAY_NAMES[yearDoomsday],
    explanation: `For ${year}: y=${y}, a=⌊${y}/12⌋=${a}, b=${y}%12=${b}, c=⌊${b}/4⌋=${c}`,
    calculation: `(${centuryAnchor} + ${a} + ${b} + ${c}) % 7 = ${yearDoomsday} (${DAY_NAMES[yearDoomsday]})`
  };
  
  // Step 3: Find Month Doomsday
  const monthDoomsday = getMonthDoomsday(month, isLeap);
  const monthNames = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  let monthMnemonic = '';
  if (month === 1) monthMnemonic = isLeap ? 'Jan 4 (leap year)' : 'Jan 3 (common year)';
  else if (month === 2) monthMnemonic = isLeap ? 'Feb 29 (last day, leap)' : 'Feb 28 (last day)';
  else if ([4, 6, 8, 10, 12].includes(month)) monthMnemonic = `Double date ${month}/${month}`;
  else if ([5, 9, 7, 11].includes(month)) monthMnemonic = '"I work 9-5 at 7-11"';
  
  const step3 = {
    title: 'Step 3: Find Month Doomsday',
    month: monthNames[month],
    monthDoomsday: monthDoomsday,
    mnemonic: monthMnemonic,
    explanation: `${monthNames[month]} ${monthDoomsday} falls on ${DAY_NAMES[yearDoomsday]}`
  };
  
  // Step 4: Count to Target Date
  const distance = day - monthDoomsday;
  const result = (yearDoomsday + distance) % 7;
  const finalDay = result < 0 ? result + 7 : result;
  
  const step4 = {
    title: 'Step 4: Count to Target Date',
    targetDay: day,
    monthDoomsday: monthDoomsday,
    distance: distance,
    calculation: `${day} - ${monthDoomsday} = ${distance} days`,
    modulo: `(${yearDoomsday} + ${distance}) % 7 = ${finalDay}`,
    result: finalDay,
    resultDay: DAY_NAMES[finalDay],
    explanation: distance >= 0 
      ? `Count forward ${distance} days from ${DAY_NAMES[yearDoomsday]}`
      : `Count backward ${Math.abs(distance)} days from ${DAY_NAMES[yearDoomsday]}`
  };
  
  return {
    isLeapYear: isLeap,
    steps: [step1, step2, step3, step4],
    finalAnswer: finalDay,
    finalAnswerName: DAY_NAMES[finalDay]
  };
}

/**
 * Generate a random valid date within range
 */
export function generateRandomDate(minYear = 500, maxYear = 2000) {
  const year = Math.floor(Math.random() * (maxYear - minYear + 1)) + minYear;
  const month = Math.floor(Math.random() * 12) + 1;
  
  // Get valid days for the month
  let maxDay;
  if (month === 2) {
    maxDay = isLeapYear(year) ? 29 : 28;
  } else if ([4, 6, 9, 11].includes(month)) {
    maxDay = 30;
  } else {
    maxDay = 31;
  }
  
  const day = Math.floor(Math.random() * maxDay) + 1;
  
  return { year, month, day };
}

/**
 * Format date as string
 */
export function formatDate(year, month, day) {
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${monthNames[month - 1]} ${day}, ${year}`;
}

/**
 * Get Doomsday reference dates for a month (for educational purposes)
 */
export function getMonthDoomsdayInfo(month, isLeap) {
  const info = {
    1: {
      date: isLeap ? 4 : 3,
      mnemonic: isLeap ? 'January 4 in leap years' : 'January 3 in common years',
      tip: 'Remember: "3 years out of 4" → Jan 3, except leap year → Jan 4'
    },
    2: {
      date: isLeap ? 29 : 28,
      mnemonic: 'Last day of February',
      tip: 'Always the last day: Feb 28 or 29'
    },
    3: {
      date: 7,
      mnemonic: 'March 7 (or 0, 14, 21, 28)',
      tip: 'Any multiple of 7 works!'
    },
    4: {
      date: 4,
      mnemonic: '4/4 - Double date',
      tip: 'Easy even month: 4/4'
    },
    5: {
      date: 9,
      mnemonic: '9-5 at 7-11',
      tip: 'May 9 - from the mnemonic'
    },
    6: {
      date: 6,
      mnemonic: '6/6 - Double date',
      tip: 'Easy even month: 6/6'
    },
    7: {
      date: 11,
      mnemonic: '9-5 at 7-11',
      tip: 'July 11 - from the mnemonic'
    },
    8: {
      date: 8,
      mnemonic: '8/8 - Double date',
      tip: 'Easy even month: 8/8'
    },
    9: {
      date: 5,
      mnemonic: '9-5 at 7-11',
      tip: 'September 5 - from the mnemonic'
    },
    10: {
      date: 10,
      mnemonic: '10/10 - Double date',
      tip: 'Easy even month: 10/10'
    },
    11: {
      date: 7,
      mnemonic: '9-5 at 7-11',
      tip: 'November 7 - from the mnemonic'
    },
    12: {
      date: 12,
      mnemonic: '12/12 - Double date',
      tip: 'Easy even month: 12/12'
    }
  };
  
  return info[month];
}