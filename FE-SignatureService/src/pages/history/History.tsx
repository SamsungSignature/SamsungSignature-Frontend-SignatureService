import {RouteProp, useRoute} from '@react-navigation/native';
import {WhiteBackGround} from '../../assets/styles/common.style';
import HistoryContents from '../../components/history/HistoryContents';
import {TabParams} from '../../routes/HistoryTabNavigator';

const History = () => {
  const route = useRoute<
    | RouteProp<TabParams, 'AppliedContents'>
    | RouteProp<TabParams, 'ApprovedContents'>
  >();
  const {historyQuery} = route.params;

  return (
    <WhiteBackGround>
      <HistoryContents historyQuery={historyQuery} />
    </WhiteBackGround>
  );
};

export default History;
