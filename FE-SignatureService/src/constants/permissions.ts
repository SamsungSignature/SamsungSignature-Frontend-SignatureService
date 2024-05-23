interface Permission {
  title: string;
  content: string;
  icon: string;
}

const APP_PERMISSIONS: Permission[] = [
  {
    title: '알림',
    content:
      '최신 소식, 거래 확인 알림 등을 푸시알림으로 받아보실 수 있습니다.',
    icon: 'alarm',
  },
  {
    title: '연락처',
    content:
      '연락처를 이용한 친구 관리로 더욱 편리한 앱 사용성을 경함할 수 있습니다.',
    icon: 'contact',
  },
  {
    title: '카메라',
    content: '카메라 사용을 허용하고 편리하게 카드와 상품권을 등록해 보세요!',
    icon: 'camera',
  },
];

export type {Permission};
export default APP_PERMISSIONS;
