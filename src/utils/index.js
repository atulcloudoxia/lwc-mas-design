/**
 * Find row by id
 *
 * @param (Event) e
 */
const findRowById = (id, data) => {
  let ret = -1;

  data.some((row, index) => {
    if (row.id === id) {
      ret = index;
      return true;
    }
    return false;
  });
  return ret;
}

export { findRowById };
