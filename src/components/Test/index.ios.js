import React, { useState, useMemo } from 'react';
import DatePicker from 'react-native-datepicker';
import { format } from 'date-fns';
import en from 'date-fns/locale/en-US';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, DateButton, DateText } from './styles';

const DateInput = ({ date, onChange }) => {
  const [opened, setOpened] = useState(false);

  const dateFormatted = useMemo(
    () => format(date, "do 'of' MMMM Y", { locale: en }),
    [date]
  );

  return (
    <Container>
      <DateButton onPress={() => setOpened(!opened)}>
        <Icon name="event" size={20} color="#fff" />
        <DateText>{dateFormatted}</DateText>
      </DateButton>

      {opened && (
        <DatePicker
          date={date}
          onDateChange={onChange}
          minDate={new Date()}
          minuteInterval={60}
          locale="en"
          mode="date"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          useNativeDriver
        />
      )}
    </Container>
  );
};

export default DateInput;
