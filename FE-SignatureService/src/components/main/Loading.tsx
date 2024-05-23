import {Dimensions} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import styled from 'styled-components/native';
import {Title, Wrapper} from './Common.stlye';

const screen = Dimensions.get('screen');

const SkeletonView = styled.View`
  position: relative;
  width: ${screen.width}px;
  height: ${screen.width * 0.6}px;
`;

const Loading = () => {
  return (
    <Wrapper>
      <Title>받은 카드를 로딩중입니다</Title>
      <SkeletonView>
        <SkeletonPlaceholder>
          <SkeletonPlaceholder.Item
            top={7}
            alignSelf="center"
            width={screen.width * 0.82}
            height={screen.width * 0.6 * 0.9}
            borderRadius={10}
          />
        </SkeletonPlaceholder>
      </SkeletonView>
    </Wrapper>
  );
};

export default Loading;
