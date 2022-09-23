import * as React from 'react';
import {
  Box, FormControl, FormControlLabel, Divider, RadioGroup, Radio,
} from '@mui/material';
import { useState } from 'react';

const deliveryOptions = [
  { value: 'home', label: 'Į namus' },
  { value: 'office', label: 'Į mūsų parduotuvę' },
  { value: 'post', label: 'Į paštomatą' },
];

const paymentOptions = [
  { value: 'card', label: 'Banko kortele' },
  { value: 'transfer', label: 'Mokėjimo pavedimu' },
  { value: 'paypal', label: 'PayPal' },
];

const RadioButtonSection = () => {
  const [delivery, setDelivery] = React.useState(null);
  const [payment, setPayment] = React.useState(null);
  const [show, setShow] = useState(false);

  return (
    <>
      <FormControl sx={{ width: '100%' }}>
        <Divider
          textAlign="left"
          sx={(theme) => ({ width: '100%', color: theme.palette.primary.main })}
        >
          PRISTATYMO BŪDAS
        </Divider>
        <RadioGroup
          name="delivery"
          value={delivery}
          onChange={(_, newDelivery) => setDelivery(newDelivery)}
        >
          {deliveryOptions.map(({ value, label }) => (
            <FormControlLabel key={value} value={value} control={<Radio />} label={label} />
          ))}
        </RadioGroup>
      </FormControl>
      <FormControl sx={{ width: '100%' }}>
        <Divider textAlign="left" sx={() => ({ width: '100%' })}>MOKĖJIMO BŪDAS</Divider>
        <RadioGroup
          sx={(theme) => ({ color: theme.palette.primary.main })}
          name="payment"
          value={payment}
          onChange={(_, newPayment) => { setPayment(newPayment); setShow((prev) => !prev); }}
        >
          {show && <Box>This is your component</Box>}
          {paymentOptions.map(({ value, label }) => (
            <FormControlLabel key={value} value={value} control={<Radio />} label={label} />
          ))}
        </RadioGroup>
      </FormControl>
    </>
  );
};

export default RadioButtonSection;
