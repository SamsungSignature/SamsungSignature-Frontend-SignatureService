import {Buffer} from 'buffer';

const encodeData = (data: any) => {
  return Buffer.from(encodeURIComponent(JSON.stringify(data))).toString(
    'base64',
  );
};

export default encodeData;
