import Link from 'next/link';
import { ForgotPasswordForm } from './_components/ForgotPassword';

export default async function ForgotPasswordPage() {
  return (
    <div>
      <h1>Mot de passe oublié</h1>

      <ForgotPasswordForm />
      <p>
        <Link href="/login">Go to login</Link>
      </p>
    </div>
  );
}

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
