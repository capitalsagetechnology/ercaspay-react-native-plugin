import { StyleSheet } from 'react-native';

export const paymentFormStyles = StyleSheet.create({
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
