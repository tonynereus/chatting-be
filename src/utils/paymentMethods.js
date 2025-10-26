export const PAYMENT_METHODS= [
  {
    id: 'bank_transfer',
    name: 'Direct Bank Transfer',
    icon: '🏦',
    type: 'bank_transfer',
    details: {
      bankName: 'First National Bank',
      accountNumber: '1234567890',
      routingNumber: '021000021',
      additionalInfo: 'Please include your account ID in the memo'
    }
  },
  {
    id: 'wire_transfer',
    name: 'Wire Transfer',
    icon: '💸',
    type: 'wire_transfer',
    details: {
      bankName: 'International Transfer Bank',
      accountNumber: '9876543210',
      routingNumber: '011000015',
      swiftCode: 'WIREBNKXXX',
      additionalInfo: 'SWIFT transfer - allow 1-3 business days'
    }
  },
  {
    id: 'paypal',
    name: 'PayPal',
    icon: '💳',
    type: 'paypal',
    details: {
      paypalEmail: 'deposits@yourcompany.com',
      additionalInfo: 'Send as Friends & Family to avoid fees'
    }
  },
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    icon: '₿',
    type: 'bitcoin',
    details: {
      bitcoinAddress: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
      additionalInfo: 'Send exact amount - overpayments will not be refunded'
    }
  },
  {
    id: 'zelle',
    name: 'Zelle',
    icon: '📱',
    type: 'zelle',
    details: {
      zelleInfo: 'deposits@yourcompany.com',
      additionalInfo: 'Use Zelle app or your banking app'
    }
  }
];

// Mock API functions
export const mockDepositAPI = {
  submitDeposit: async (depositData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      success: true,
      depositId: 'dep_' + Date.now()
    };
  },
  
  getPendingDeposits: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [];
  },
  
  approveDeposit: async (depositId, adminNotes) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true };
  },
  
  rejectDeposit: async (depositId, reason) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true };
  }
};