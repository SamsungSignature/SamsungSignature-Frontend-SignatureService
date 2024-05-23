import {HistoryData} from '../api/history/useGetHistory';

interface HistoryDataItem {
  signature_detail_id: number;
  signature_name: string;
  permission_status: string;
  signature_date: string;
  limit_amount: number;
}

interface GroupDataProps {
  date: string;
  history: Array<HistoryDataItem>;
}

const groupDataByDate = (data: HistoryData) => {
  // set을 이용해 중복된 날짜를 삭제
  const set = new Set<string>();
  data.signature_history_list.forEach(historyData => {
    set.add(historyData.signature_date);
  });

  // 날짜를 담을 배열 + key값 설정
  const groupDataList: Array<GroupDataProps> = [];
  for (const date of set) {
    groupDataList.push({
      date,
      history: [],
    });
  }

  // 날짜별로 데이터 추가
  data.signature_history_list.forEach(historyData => {
    for (const item of groupDataList) {
      if (item.date === historyData.signature_date) {
        item.history.push(historyData); // 해당 날짜의 배열에 데이터 추가
      }
    }
  });
  return groupDataList;
};

export type {GroupDataProps, HistoryDataItem};
export default groupDataByDate;
