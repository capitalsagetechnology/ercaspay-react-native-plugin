export interface PaymentFormProps {
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
