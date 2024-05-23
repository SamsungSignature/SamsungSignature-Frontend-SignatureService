const parseWithDefault = <T>(style?: T, defaultStyle?: T) => {
  let result = defaultStyle as T;

  for (let key in style) {
    if (style.hasOwnProperty(key)) {
      result[key as keyof T] = style[key as keyof T];
    }
  }

  return result;
};

export default parseWithDefault;
