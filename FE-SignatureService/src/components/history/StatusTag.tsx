import {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {theme} from '../../assets/styles/theme';

type Status = {
  status: string;
};

const StatusTag = (props: Status) => {
  const {status} = props;
  const [statusContent, setStatusContent] = useState<string>('');
  const [color, setColor] = useState<string>('');

  useEffect(() => {
    if (status === 'APPROVED') {
      setStatusContent('승인');
      setColor(theme.colors.blue);
    } else if (status === 'INPROGRESS') {
      setStatusContent('진행중');
      setColor(theme.colors.limeGreen);
    } else if (status === 'REJECTED') {
      setStatusContent('거절');
      setColor(theme.colors.red);
    }
  }, [status]);

  const Box = styled.View`
    background-color: ${color};
    border-radius: ${theme.radii.button};
    width: 50px;
    height: 25px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  `;

  const StatusName = styled.Text`
    font-family: ${theme.fonts.samsungR};
    color: ${theme.colors.white};
    font-size: 12px;
  `;

  return (
    <Box>
      <StatusName>{statusContent}</StatusName>
    </Box>
  );
};

export default StatusTag;
