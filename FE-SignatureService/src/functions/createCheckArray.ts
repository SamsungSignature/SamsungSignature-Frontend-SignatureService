const createCheckArray = (length: number, option?: {fillTrue?: true}) => {
  return Array(length).fill(option?.fillTrue ? true : false);
};

export default createCheckArray;
