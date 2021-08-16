import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Background from '~/components/Background';

import DateInput from '~/components/DateInput';
import api from '~/services/api';

import { Container, HourList, Hour, Title } from './styles';

const SelectDateTime = ({ navigation }) => {
  const [date, setDate] = useState(new Date());
  const [appointmentsTime, setAppointmentsTime] = useState([]);

  const provider = navigation.getParam('provider');

  useEffect(() => {
    async function loadAvailableAppointments() {
      const response = await api.get(`providers/${provider.id}/available`, {
        params: {
          date: date.getTime(),
        },
      });
      setAppointmentsTime(response.data);
    }
    loadAvailableAppointments();
  }, [date, provider.id]);

  function handleSetDate(event, value) {
    setDate(new Date(value));
  }

  function handleSelectAppointmentHour(time) {
    navigation.navigate('Confirm', {
      provider,
      time,
    });
  }

  return (
    <Background>
      <Container>
        <DateInput date={date} onChange={handleSetDate} />
        <HourList
          data={appointmentsTime}
          keyExtractor={(item) => item.time}
          renderItem={({ item }) => (
            <Hour
              onPress={() => handleSelectAppointmentHour(item.value)}
              enabled={item.available}
            >
              <Title>{item.time}</Title>
            </Hour>
          )}
        />
      </Container>
    </Background>
  );
};

SelectDateTime.navigationOptions = ({ navigation }) => ({
  title: 'Select an time',
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

export default SelectDateTime;
