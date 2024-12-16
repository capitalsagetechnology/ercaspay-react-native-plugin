# react-native-ercaspay

#### React Native Expo Ercaspay Library
##### NB: This library currently works on react native expo, it has not yet been tested on react native cli. However, it should work on react native cli. Future updates would be tested on react native cli

######

This package lets you accept payments with Ercaspay in a snap! Just install, add your keys, and you’re good to go—no headaches here! Plus, it’s officially created at Ercaspay Hackaton 2024, so you know you’re in good hands. Payment processing has never been this easy! 


## Installation
Add `react-native-ercaspay` to your project by running;

```bash 
npm install react-native-ercaspay
```

## Usage
##### Basic Example

```js
import { View, StyleSheet } from 'react-native';
import PaymentForm from 'react-native-ercaspay';

const App = () => {
  const data = {
    amount: 100,
    paymentReference: 'REF-123', //create an algorithm to automatically generate a unique paymentReference for each transaction
    paymentMethods: 'card,bank-transfer,ussd,qrcode', //do not edit
    customerName: 'John Doe',
    customerEmail: 'johndoe@example.com',
    customerPhoneNumber: '09012345678',
    redirectUrl: 'https://example.com/success', //A url to direct the user to after payment is successful
    description: 'Test payment',
    currency: 'NGN', //do not edit. Other currencies Eg USD would be available in a future update
    feeBearer: 'customer',
    metadata: {
      firstname: 'John',
      lastname: 'Doe',
      email: 'johndoe@example.com',
    },
    secretKey: 'add-your-secret-key-here', //Your secret key(visit https://ercaspay.com/ to get yours)
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

## API Reference
| Name                | Description                                                                                                                                                                                                                                                                                                                               
|---------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
| `amount`            | Can be any number. - **`should not be less than 100Naira for NGN`**:                                                                                                                                                                                                                                                              
| `paymentReference`  | Must be unique  - **`create an algorithm to automatically generate a unique paymentReference for each transaction`**:                                                     
| `paymentMethods`    | Should be constant don't edit it **`card,bank-transfer,ussd,qrcode`**:                                                                                                                                                                                                                                                              
| `currency`          | **`Defaults to NGN`**:  USD and other currencies would be provided in future updates, please raise as issue if you need other currencies                                                                                                                                                                                                                                                                  
|  `redirectUrl`      | - **`A url to direct the user to after payment is successful`**:                                                                                                                                                                                                                                                                               
|  `feeBearer`        | - **`Defaults to Customer`**: Should be constant don't edit it, transaction fees would be added to customers.  please raise as issue if you want to incur the fee                                                                                                                                                                                                                                                                                       
|  `secretKey`        | - **`Your secret key(visit https://ercaspay.com/ to get yours)`**:                                                                                          
|                     |                                                                                                                                                                                                                                        


## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
