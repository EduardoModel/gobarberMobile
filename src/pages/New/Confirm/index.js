import React, { useMemo } from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import { formatRelative, parseISO } from 'date-fns';
import en from 'date-fns/locale/en-US';

import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import Background from '~/components/Background';
import { Container, Avatar, Name, Time, SubmitButton } from './styles';

const Confirm = ({ navigation }) => {
  const provider = navigation.getParam('provider');
  const time = navigation.getParam('time');

  const timeFormatted = useMemo(
    () => formatRelative(parseISO(time), new Date(), { locale: en }),
    [time]
  );

  async function handleConfirmAppointment() {
    await api.post('appointments', {
      provider_id: provider.id,
      date: time,
    });

    Alert.alert('The appointment was sucessfully created');

    navigation.navigate('Dashboard');
  }

  return (
    <Background>
      <Container>
        <Avatar
          source={{
            uri: provider.avatar
              ? provider.avatar.url
              : `https://i.pravatar.cc/120?img${provider.id}`,
          }}
        />
        <Name>{provider.name}</Name>

        <Time>{timeFormatted}</Time>

        <SubmitButton onPress={handleConfirmAppointment}>
          Confirm appointment
        </SubmitButton>
      </Container>
    </Background>
  );
};

Confirm.navigationOptions = ({ navigation }) => ({
  title: 'Confirm your appointment',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('SelectProvider');
      }}
    >
      <Icon name="chevron-left" size={20} color="#fff" />
    </TouchableOpacity>
  ),
});

export default Confirm;
