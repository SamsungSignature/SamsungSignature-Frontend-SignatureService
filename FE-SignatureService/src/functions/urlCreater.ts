/*
[사용 예시]
API_PATH.COMMENT = '/api/v1/users/:userId/posts/:postId/comments'
const pathParams = { userId: 'user123', postId: 'post456' }; < 순서 중요!!
const resultUrl = buildUrl(API_PATH.COMMENT, pathParams, queryParams);
*/

const urlCreater = (baseUrl: string, pathParams?: object) => {
  let url = baseUrl;

  // 패스 변수 처리
  if (pathParams) {
    for (const [key, value] of Object.entries(pathParams)) {
      url = url.replace(`:${key}`, encodeURIComponent(value));
    }
  }

  return url;
};

export default urlCreater;
