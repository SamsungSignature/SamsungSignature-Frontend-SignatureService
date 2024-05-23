import LottieView from 'lottie-react-native';
import styled from 'styled-components/native';
import imagePath from '../../assets/imagePath';
import CardChoose from '../../assets/lotties/CardDelivery.json';
import Complete from '../../assets/lotties/Complete.json';
import Reject from '../../assets/lotties/Reject.json';
import RequestCheck from '../../assets/lotties/RequestCheck.json';
import Request from '../../assets/lotties/RequestTwo.json';

const ImageBox = styled.Image`
  width: 30px;
  height: 30px;
`;

const LottieImage = styled(LottieView)`
  width: 35px;
  height: 35px;
`;

interface ProgressProps {
  step: number;
  permission_status: 'INPROGRESS' | 'APPROVED' | 'REJECTED';
}

// 현재 스텝 내부 상태
const CurrentStep = (index: number, progress: ProgressProps) => {
  const {step, permission_status} = progress;
  switch (index) {
    case 0:
      if (index === step) {
        return <LottieImage source={Request} autoPlay loop />;
      } else {
        return <ImageBox source={imagePath.request} />;
      }
    case 1:
      if (index === step) {
        return <LottieImage source={RequestCheck} autoPlay loop />;
      } else {
        return <ImageBox source={imagePath.check} />;
      }
    case 2:
      if (index === step) {
        return <LottieImage source={CardChoose} autoPlay loop />;
      } else {
        return <ImageBox source={imagePath.choose} />;
      }
    case 3:
      if (index === step) {
        if (permission_status === 'REJECTED') {
          return <LottieImage source={Reject} autoPlay loop />;
        } else {
          return <LottieImage source={Complete} autoPlay loop />;
        }
      } else {
        return <ImageBox source={imagePath.complete} />;
      }
  }
};

export default CurrentStep;
