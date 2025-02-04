import { render, fireEvent, waitFor } from '@testing-library/react-native';
import PaymentForm from '../index'; // Adjust the import path as necessary

jest.mock('react-native-webview', () => {
  return {
    WebView: () => <></>, // Mock the WebView
  };
});

describe('PaymentForm', () => {
  const mockProps = {
    amount: 100,
    paymentReference: 'test-ref',
    paymentMethods: 'card,bank-transfer,ussd,qrcode',
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    customerPhoneNumber: '1234567890',
    redirectUrl: 'https://redirect.url',
    description: 'Test payment',
    currency: 'USD',
    feeBearer: 'payee',
    metadata: {
      firstname: 'John',
      lastname: 'Doe',
      email: 'john@example.com',
    },
    secretKey: 'test-secret-key',
  };

  it('renders correctly', () => {
    const { getByPlaceholderText } = render(<PaymentForm {...mockProps} />);

    expect(getByPlaceholderText('Firstname')).toBeTruthy();
    expect(getByPlaceholderText('Lastname')).toBeTruthy();
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Amount')).toBeTruthy();
  });

  it('submits the form and handles the response', async () => {
    const { getByPlaceholderText, getByText } = render(
      <PaymentForm {...mockProps} />
    );

    // Mock the fetch function
    global.fetch = jest.fn().mockResolvedValue({
      json: () =>
        Promise.resolve({
          requestSuccessful: true,
          responseBody: { checkoutUrl: 'https://checkout.url' },
        }),
    });

    fireEvent.changeText(getByPlaceholderText('Firstname'), 'Jane');
    fireEvent.changeText(getByPlaceholderText('Lastname'), 'Doe');
    fireEvent.changeText(getByPlaceholderText('Email'), 'jane@example.com');
    fireEvent.changeText(getByPlaceholderText('Amount'), '200');

    fireEvent.press(getByText('Pay'));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
      expect(fetch).toHaveBeenCalledWith(
        'https://api.merchant.staging.ercaspay.com/api/v1/payment/initiate',
        expect.objectContaining({
          method: 'POST',
          body: expect.any(String),
        })
      );
    });
  });

  it('handles loading state', async () => {
    const { getByText } = render(<PaymentForm {...mockProps} />);

    // Mock the fetch function to simulate loading
    global.fetch = jest.fn(() => new Promise(() => {})); // Never resolve

    fireEvent.press(getByText('Pay'));

    expect(getByText('Loading...')).toBeTruthy();
  });
});
