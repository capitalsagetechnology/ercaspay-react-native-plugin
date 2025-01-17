import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { WebView } from 'react-native-webview';
import type { PaymentFormProps } from './types/types';
import { paymentFormStyles as styles } from './styles/style';

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
  const [firstname, setFirstname] = useState(metadata?.firstname ?? '');
  const [lastname, setLastname] = useState(metadata?.lastname ?? '');
  const [email, setEmail] = useState(metadata?.email ?? '');
  const [amountValue, setAmountValue] = useState(amount?.toString() ?? '');
  const [loading, setLoading] = useState(false);
  const [responseUrl, setResponseUrl] = useState('');

  const handleFormSubmit = async () => {
    setLoading(true);
    try {
      const data = await initiatePayment();
      if (data.requestSuccessful) {
        setResponseUrl(data.responseBody.checkoutUrl);
      } else {
        console.error('Payment failed:', data);
      }
    } finally {
      setLoading(false);
    }
  };

  const initiatePayment = async () => {
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

      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

  const handleLoad = () => console.log('Webview Loaded');

  const webViewSource = useMemo(() => {
    if (responseUrl !== '') {
      return { uri: responseUrl };
    }
    return null;
  }, [responseUrl]);

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text>Secured by Ercaspay</Text>
        <TextInput
          value={firstname}
          onChangeText={setFirstname}
          placeholder="Firstname"
          style={styles.textInput}
        />
        <TextInput
          value={lastname}
          onChangeText={setLastname}
          placeholder="Lastname"
          style={styles.textInput}
        />
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          style={styles.textInput}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          value={amountValue}
          onChangeText={setAmountValue}
          placeholder="Amount"
          style={styles.textInput}
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
              size="large"
              color="orange"
              style={styles.container}
            />
          </View>
        )}
        {webViewSource && (
          <WebView
            source={webViewSource}
            onLoad={handleLoad}
            style={styles.webView}
            scalesPageToFit={true}
            injectJavaScript={`
              const meta = document.createElement('meta');
              meta.setAttribute('name', 'viewport');
              meta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
              document.getElementsByTagName('head')[0].appendChild(meta);
            `}
          />
        )}
      </View>
    </View>
  );
};

export default PaymentForm;
