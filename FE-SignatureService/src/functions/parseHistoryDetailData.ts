import {GetHistoryDetailResponseData} from '../api/history/useGetHistoryDetail';

interface ParsedHistoryDetailData {
  detail: [string, string][];
  signature_detail_id: number;
  item_image?: string;
  permission_status: 'INPROGRESS' | 'APPROVED' | 'REJECTED';
  progress_status?:
    | 'INPROGRESS_SUBMIT'
    | 'INPROGRESS_CONSIDER'
    | 'INPROGRESS_PICKCARD';
}

const parseHistoryDetailData = (
  data: GetHistoryDetailResponseData,
): ParsedHistoryDetailData => {
  // 요청 상세
  let detail: [string, string][] = [];

  const whiteList: Record<string, any> = {
    limit_amount: '요청 금액',
    signature_date: '요청 날짜',
    limit_date: '요청 기한',
    market_name: '상호명',
    item: '상품명',
  };
  const date = ['signature_date', 'limit_date'];
  const blackList = [
    'signature_detail_id',
    'item_image',
    'permission_status',
    'signature_name',
    'progress_status',
  ];
  const amount = ['limit_amount'];

  const recordData = data as Record<string, any>;

  for (const datum in recordData) {
    if (
      Object.prototype.hasOwnProperty.call(data, datum) &&
      !blackList.includes(datum)
    ) {
      const title = whiteList[datum];
      let content = recordData[datum];

      // 날짜 변환
      if (date.includes(datum) && content) {
        content = new Date(content).toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
      }

      // 가격 변환
      if (amount.includes(datum) && content) {
        content = content.toLocaleString('ko-KR') + '원';
      }

      if (content) {
        detail.push([title, content]);
      }
    }
  }

  return {
    detail,
    signature_detail_id: data.signature_detail_id,
    item_image: data.item_image,
    permission_status: data.permission_status,
    progress_status: data.progress_status,
  };
};

export type {ParsedHistoryDetailData};
export default parseHistoryDetailData;
