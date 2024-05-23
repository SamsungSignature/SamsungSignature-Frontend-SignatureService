import {API_BASE} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Contacts from 'react-native-contacts';
import useAxios from '../api/interceptor';
import API_PATH from '../constants/apiPath';
import {Friends} from '../pages/giveCards/GiveCardPage';

const useSyncContacts = async (): Promise<Friends[]> => {
  const appAxios = useAxios();
  try {
    const fetchedContacts = await Contacts.getAll();

    const formattedContacts = fetchedContacts.map(contact => ({
      displayName: contact.displayName,
      phoneNumber: contact.phoneNumbers[0]?.number ?? '',
      thumbnailPath: contact.thumbnailPath ?? '',
    }));

    const response = await appAxios.post(`${API_BASE}${API_PATH.FRIEND.SYNC}`, {
      phone_number_list: formattedContacts,
    });
    await AsyncStorage.setItem(
      'friends_list',
      JSON.stringify(response.data.body.friends_list),
    );

    return response.data.body.friends_list;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default useSyncContacts;
