export interface FAQEntry {
  id: string;
  question: string;
  answer: string;
}

/** Shared by the FAQ section and the FAQPage JSON-LD in the root layout. */
export const FAQ_ITEMS: FAQEntry[] = [
  {
    id: 'pick',
    question: 'How does credVert. pick the best card for a purchase?',
    answer:
      'It keeps a catalogue of each card’s reward rules — portal multipliers like SmartBuy 5X–10X, category exclusions such as fuel and rent, monthly caps and point values. For every spend it computes the net return in rupees, including forex markup and 18% GST when you’re paying abroad, then ranks your cards.',
  },
  {
    id: 'free',
    question: 'Is credVert. free?',
    answer:
      'Yes. The app and every feature on this page are free. We don’t sell your data and we don’t take referral fees to rank one card above another.',
  },
  {
    id: 'sms',
    question: 'Is granting SMS permission safe?',
    answer:
      'Yes. SMS alerts are parsed by a local engine on your phone. Full card numbers, OTPs and the raw message text are discarded by design; only the amount, merchant and card suffix are kept, encrypted on-device. No SMS content is ever sent to a server.',
  },
  {
    id: 'forex',
    question: 'How is the forex markup calculated?',
    answer:
      'Most Indian banks charge 2.0%–3.5% markup on foreign-currency spends, plus 18% GST on that fee — so 3.5% becomes 4.13%. credVert. subtracts that from the card’s reward rate so you see the true net return. Cards with low markup, like IDFC FIRST Wealth, stay worthwhile abroad.',
  },
  {
    id: 'ios',
    question: 'What about iPhone? iOS doesn’t allow apps to read SMS.',
    answer:
      'On iOS you copy a bank alert and tap “Parse clipboard”. Parsing still happens entirely on your phone with the same guarantees. You can also log spends manually.',
  },
  {
    id: 'banks',
    question: 'Which banks and cards are supported?',
    answer:
      'Popular cards from HDFC Bank, SBI Card, Axis Bank, ICICI Bank, IDFC FIRST, American Express and co-branded cards like Tata Neu are supported today, across Visa, Mastercard, RuPay and Diners Club. New cards are added every month.',
  },
  {
    id: 'delete',
    question: 'Can I delete my account and all my data?',
    answer:
      'Yes, unconditionally. Under the DPDP Act 2023 you have the right to erasure. Use Account → Delete account in the app, or the online deletion portal at credvert.tech/deletion. All records and fingerprints are purged within 24 hours.',
  },
];
