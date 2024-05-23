import {StyleSheet} from 'react-native';
import imagePath from '../../assets/imagePath';
import {ParsedHistoryDetailData} from '../../functions/parseHistoryDetailData';
import * as S from './Detail.style';

interface DetailProps {
  parsedData: ParsedHistoryDetailData;
}

const Detail = ({parsedData}: DetailProps) => {
  return (
    <S.Wrapper style={styles.shadow}>
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

export default Detail;
