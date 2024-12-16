# react-native-ercaspay

react native expo ercaspay library

## Installation

```sh
npm install react-native-ercaspay
```

## Usage


```js
import { View, StyleSheet } from 'react-native';
import PaymentForm from 'react-native-ercaspay';

const App = () => {
  const data = {
    amount: 100,
    paymentReference: 'REF-123',
    paymentMethods: 'card,bank-transfer,ussd,qrcode',
    customerName: 'John Doe',
    customerEmail: 'johndoe@example.com',
    customerPhoneNumber: '09012345678',
    redirectUrl: 'https://example.com/success',
    description: 'Test payment',
    currency: 'NGN', //USD, NGN etc
    feeBearer: 'customer',
    metadata: {
      firstname: 'John',
      lastname: 'Doe',
      email: 'johndoe@example.com',
    },
    secretKey: 'add-your-secret-key-here',
  };

  return (
    <View style={styles.container}>
      <PaymentForm
        amount={data.amount}
        paymentReference={data.paymentReference}
        paymentMethods={data.paymentMethods}
        customerName={data.customerName}
        customerEmail={data.customerEmail}
        customerPhoneNumber={data.customerPhoneNumber}
        redirectUrl={data.redirectUrl}
        description={data.description}
        currency={data.currency}
        feeBearer={data.feeBearer}
        metadata={data.metadata}
        secretKey={data.secretKey}
      />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
  },
});

```


## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
