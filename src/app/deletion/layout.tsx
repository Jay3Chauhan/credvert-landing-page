import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Delete Your Account & Data',
  description:
    'Request permanent deletion of your credVert. account and all associated data under your right to erasure in the DPDP Act 2023. Records are purged within 24 hours.',
  alternates: { canonical: 'https://credvert.tech/deletion' },
};

export default function DeletionLayout({ children }: { children: React.ReactNode }) {
  return children;
}
