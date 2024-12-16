import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { WebView } from 'react-native-webview';

// import Config from "react-native-config";

interface PaymentFormProps {
  amount: number;
  paymentReference: string;
  paymentMethods: string;
  customerName: string;
  customerEmail: string;
  customerPhoneNumber: string;
  redirectUrl: string;
  description: string;
  currency: string;
  feeBearer: string;
  metadata: {
    firstname: string;
    lastname: string;
    email: string;
  };
  secretKey: string;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  amount,
  paymentReference,
  paymentMethods,
  customerName,
  customerEmail,
  customerPhoneNumber,
  redirectUrl,
  description,
  currency,
  feeBearer,
  metadata,
  secretKey,
}) => {
  const [firstname, setFirstname] = useState(metadata.firstname);
  const [lastname, setLastname] = useState(metadata.lastname);
  const [email, setEmail] = useState(metadata.email);
  const [amountValue, setAmountValue] = useState(amount.toString());
  const [loading, setLoading] = useState(false);
  const [responseUrl, setResponseUrl] = useState('');

  const handleFormSubmit = async () => {
    setLoading(true);
    // Access environment variable
    // const apiURL = Config.API_URL;
    // console.log(apiURL);
    try {
      const response = await fetch(
        'https://api.merchant.staging.ercaspay.com/api/v1/payment/initiate',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${secretKey}`,
          },
          body: JSON.stringify({
            amount: amountValue,
            paymentReference,
            paymentMethods,
            customerName,
            customerEmail,
            customerPhoneNumber,
            redirectUrl,
            description,
            currency,
            feeBearer,
            metadata: {
              firstname,
              lastname,
              email,
            },
          }),
        }
      );

      const data = await response.json();
      if (data.requestSuccessful === true) {
        setLoading(false);
        console.log(data);
        console.log(data.responseBody.checkoutUrl);
        setResponseUrl(data.responseBody.checkoutUrl);
      } else {
        setLoading(false);
        console.error('Payment failed:', data);
      }
    } catch (error) {
      setLoading(false);
      console.error('Error:', error);
    }
  };

  const handleLoad = () => {
    console.log('Webview Loaded');
    console.log(responseUrl);
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text>Secured by Ercaspay</Text>
        <TextInput
          value={firstname}
          onChangeText={(text) => setFirstname(text)}
          placeholder="Firstname"
        />
        <TextInput
          value={lastname}
          onChangeText={(text) => setLastname(text)}
          placeholder="Lastname"
        />
        <TextInput
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="Email"
        />
        <TextInput
          value={amountValue}
          onChangeText={(text) => setAmountValue(text)}
          placeholder="Amount"
          keyboardType="numeric"
        />
        <TouchableOpacity
          style={styles.payBtn}
          onPress={handleFormSubmit}
          disabled={loading}
        >
          <Text style={styles.payText}>Pay</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.webViewContainer}>
        {loading && (
          <View style={styles.webViewLoading}>
            <Text style={styles.webViewTextLoading}>Loading...</Text>
            <ActivityIndicator
              style={styles.container}
              size="large"
              // color="#0000ff"
              color="orange"
            />
          </View>
        )}
        {responseUrl !== '' && (
          <WebView
            source={{ uri: responseUrl }}
            onLoad={handleLoad}
            style={styles.webView}
            scalesPageToFit={true}
            injectJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('name', 'viewport'); meta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'); document.getElementsByTagName('head')[0].appendChild(meta);`}
          />
        )}
      </View>
    </View>
  );
};

export default PaymentForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderColor: '#ddd',
    borderTopWidth: 1,
  },
  textInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  webViewContainer: {
    flex: 1,
  },
  webView: {
    flex: 1,
  },
  webViewLoading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  webViewTextLoading: {
    textAlign: 'center',
    marginTop: 30,
  },
  payBtn: {
    backgroundColor: '#FF9900', // deeper orange color
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 0,
  },
  payText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});
