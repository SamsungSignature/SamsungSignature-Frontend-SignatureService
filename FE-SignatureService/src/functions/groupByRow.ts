const groupByRow = <T>(array: T[], columns: number) => {
  let result: T[][] = [];
  let position = 0;

  while (position < array.length) {
    let group = array.slice(position, position + columns);
    result.push(group);
    position += columns;
  }

  return result;
};

export default groupByRow;
