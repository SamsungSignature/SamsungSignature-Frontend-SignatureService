import {Buffer} from 'buffer';

const decodeData = <T>(encodedData: any): T => {
  return JSON.parse(
    decodeURIComponent(Buffer.from(encodedData, 'base64').toString()),
  );
};

export default decodeData;
