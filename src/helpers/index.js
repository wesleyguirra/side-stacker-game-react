/**
 *
 * @param bArray
 * @param rows
 * @param columns
 * @param maxScore
 * @return {*}
 */
export const checkHorizontal = (bArray, rows, columns, maxScore, cb) => {
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < columns - (columns - maxScore); y++) {
      if (bArray[x][y]) {
        const results = []
        for (let s = 0; s < maxScore - 1; s++) {
          results[s] = bArray[x][y + s] === bArray[x][y + s + 1]
        }
        if (results.every(result => result === true)) {
          cb(bArray[x][y])
        }
      }
    }
  }
}

/**
 *
 * @param bArray
 * @param rows
 * @param columns
 * @param maxScore
 * @return {*}
 */
export const checkVertical = (bArray, rows, columns, maxScore, cb) => {
  for (let y = 0; y < columns; y++) {
    for (let x = 0; x < rows - (rows - maxScore); x++) {
      if (bArray[x][y]) {
        const results = []
        for (let s = 0; s < maxScore - 1; s++) {
          results[s] = bArray[x + s][y] === bArray[x + s + 1][y]
        }
        if (results.every(result => result === true)) {
          cb(bArray[x][y])
        }
      }
    }
  }
}

/**
 *
 * @param bArray
 * @param rows
 * @param columns
 * @param maxScore
 * @return {*}
 */
export const checkDiagonal = (bArray, rows, columns, maxScore, cb) => {
  for (let x = 0; x < rows - (rows - maxScore); x++) {
    for (let y = 0; y < columns - (columns - maxScore); y++) {
      if (bArray[x][y]) {
        const results = []
        for (let s = 0; s < maxScore - 1; s++) {
          results[s] = bArray[x + s][y + s] === bArray[x + s + 1][y + s + 1]
        }
        if (results.every(result => result === true)) {
          cb(bArray[x][y])
        }
      }
    }
  }
}

/**
 *
 * @param bArray
 * @param rows
 * @param columns
 * @param maxScore
 * @return {*}
 */
export const checkDiagonalForward = (bArray, rows, columns, maxScore, cb) => {
  const results = []
  for (let x = rows - maxScore; x < rows; x++) {
    for (let y = 0; y < columns - maxScore; y++) {
      if (bArray[x][y]) {
        for (let s = 0; s < maxScore - 1; s++) {
          results[s] = bArray[x - s][y + s] === bArray[x - s - 1][y + s + 1]
        }
        if (results.every(result => result === true)) {
          cb(bArray[x][y])
        }
      }
    }
  }
}