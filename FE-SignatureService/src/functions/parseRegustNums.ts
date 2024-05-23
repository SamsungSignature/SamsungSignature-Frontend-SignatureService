const parseRegistNums = (registNums: string) => {
  const century = registNums[6];
  const yearBack = registNums.slice(0, 2);
  let year = '';
  if (century in ['1', '2']) {
    year = '19' + yearBack;
  } else if (century in ['3', '4']) {
    year = '20' + yearBack;
  } else {
    year = '18' + yearBack;
  }

  const month = registNums.slice(2, 4);
  const day = registNums.slice(4, 6);

  return {year, month, day};
};

export default parseRegistNums;
