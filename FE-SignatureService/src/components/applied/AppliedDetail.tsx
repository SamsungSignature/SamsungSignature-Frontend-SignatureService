import {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import imagePath from '../../assets/imagePath';
import {theme} from '../../assets/styles/theme';
import {ParsedHistoryDetailData} from '../../functions/parseHistoryDetailData';
import * as S from '../approve/Detail.style';
import ProgressStatus from './ProgressStatus';

const GuideWrapper = styled.View`
  align-items: center;
`;

const ApproveGuide = styled.Text`
  font-family: ${theme.fonts.samsungR};
  font-size: ${theme.fontSizes[4]};
  color: ${theme.colors.samsungBlue};
`;

const RejectGuide = styled(ApproveGuide)`
  color: ${theme.colors.red};
`;

interface DetailProps {
  parsedData: ParsedHistoryDetailData;
}

const AppliedDetail = ({parsedData}: DetailProps) => {
  const {permission_status, progress_status} = parsedData;
  const [guide, setGuide] = useState<string>('');

  const status = {permission_status, progress_status};

  useEffect(() => {
    if (permission_status === 'APPROVED') {
      setGuide('승인된 요청입니다.');
    } else if (permission_status === 'REJECTED') {
      setGuide('거절된 요청입니다.');
    }
  }, [permission_status]);

  return (
    <S.Wrapper style={styles.shadow}>
      <ProgressStatus status={status} />
      {permission_status !== 'INPROGRESS' && (
        <GuideWrapper>
          {permission_status === 'APPROVED' && (
            <ApproveGuide>{guide}</ApproveGuide>
          )}
          {permission_status === 'REJECTED' && (
            <RejectGuide>{guide}</RejectGuide>
          )}
        </GuideWrapper>
      )}
      <S.Title>요청 상세</S.Title>
      <S.ContentView>
        {parsedData.detail.map(([title, content], idx) => (
          <S.SubView key={idx}>
            <S.SubTitle>{title}</S.SubTitle>
            <S.SubContent>{content}</S.SubContent>
          </S.SubView>
        ))}
        {parsedData.item_image && (
          <>
            <S.SubTitle>상품 이미지</S.SubTitle>
            <S.ItemImage
              source={imagePath[parsedData.item_image]}
              resizeMode="contain"
            />
          </>
        )}
      </S.ContentView>
    </S.Wrapper>
  );
};

const styles = StyleSheet.create({
  shadow: {
    elevation: 2,
  },
});

export default AppliedDetail;
