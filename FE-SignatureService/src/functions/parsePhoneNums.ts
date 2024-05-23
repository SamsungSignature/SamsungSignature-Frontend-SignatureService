const parsePhoneNums = (phoneNums: string) => {
  if (phoneNums.length !== 11) {
    throw new Error('휴대폰 번호 길이 오류');
  }
  const first = phoneNums.slice(0, 3);
  const middle = phoneNums.slice(3, 7);
  const last = phoneNums.slice(7, 11);
  return `${first}-${middle}-${last}`;
};

export default parsePhoneNums;
