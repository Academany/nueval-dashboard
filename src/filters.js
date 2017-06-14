import Vue from 'vue'


/**
 * Vue filter to truncate a string to the specified length.
 * @param {String} value The value string.
 */
export const Truncate = Vue.filter('truncate', function (value, length) {
  if (value.length < length) {
    return value;
  }

  length = length - 3;

  return value.substring(0, length) + '...';
});

