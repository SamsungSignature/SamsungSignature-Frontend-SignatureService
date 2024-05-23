// import {Button} from '@react-native-material/core';
import {View, Button} from 'react-native';
import BackgroundService from 'react-native-background-actions';

const sleep = (time: number) =>
  new Promise<void>(resolve => setTimeout(() => resolve(), time));

const veryIntensiveTask = async (taskDataArguments: any) => {
  console.log('in intensive task');
  const {delay} = taskDataArguments;
  await new Promise(async resolve => {
    for (let i = 0; BackgroundService.isRunning(); i++) {
      console.log(i);
      await sleep(delay);
    }
  });
};
// const veryIntensiveTask = async (taskDataArguments: any) => {
//   console.log('in intensive task');
//   const {delay} = taskDataArguments;
//   for (let i = 0; i < 5; i++) {
//     // 예시로 5번 반복하도록 수정
//     console.log(i);
//     await sleep(delay);
//   }
// };

const options = {
  taskName: 'Example',
  taskTitle: 'ExampleTask title',
  taskDesc: 'ExampleTask description',
  taskIcon: {
    name: 'ic_launcher',
    type: 'mipmap',
  },
  color: '#ff00ff',
  parameters: {
    delay: 1000,
  },
};

export default function Background() {
  const startBackgroundJob = async () => {
    await BackgroundService.start(veryIntensiveTask, options);
    console.log('백그라운드 서비스 시작');
  };
  const updateBackgroundJob = async () => {
    await BackgroundService.updateNotification({
      taskDesc: 'New ExampleTask description',
    });
    console.log('background service updated');
  };
  const stopBackgroundJob = async () => {
    await BackgroundService.stop();
    console.log('백그라운드 서비스 종료');
  };
  return (
    <View>
      <Button title="start background job" onPress={startBackgroundJob} />
      <Button title="update background job" onPress={updateBackgroundJob} />
      <Button title="stop background job" onPress={stopBackgroundJob} />
    </View>
  );
}
