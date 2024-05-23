import {useMutation, useQueryClient} from '@tanstack/react-query';
import {AxiosError, AxiosResponse} from 'axios';
import {Switch} from 'react-native';
import usePatchSwitch, {
  PatchSwitchData,
  PatchSwitchResponse,
} from '../../api/given/usePatchSwitch';
import {theme} from '../../assets/styles/theme';

type CardAuthorProps = {
  info: {
    id: number;
    validate: 'ON' | 'OFF';
  };
};

const CardAuthorSwitch = ({info}: CardAuthorProps) => {
  const {id, validate} = info;
  const queryClient = useQueryClient();
  const patchSwitch = usePatchSwitch();

  const data = {
    given_card_id: id,
    validate_type: validate,
  };

  const mutation = useMutation<
    AxiosResponse<PatchSwitchResponse>,
    AxiosError<BaseResponse<null>>,
    PatchSwitchData
  >({
    mutationKey: ['patch-switch'],
    mutationFn: () => patchSwitch(data),
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({queryKey: ['get-given-card']});
      }, 400);
    },
  });

  return (
    <Switch
      trackColor={{
        false: `${theme.colors.gray}`,
        true: `${theme.colors.samsungBlue}`,
      }}
      thumbColor={
        validate === 'ON'
          ? `${theme.colors.blue}`
          : `${theme.colors.background}`
      }
      onValueChange={() => {
        console.log(12, data);
        mutation.mutate(data);
      }}
      value={validate === 'ON'}
    />
  );
};

export default CardAuthorSwitch;
