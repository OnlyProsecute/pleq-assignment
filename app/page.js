import Main from '@/components/Main';
import Link from 'next/link';
import Hero from '@/components/Hero';

export default function HomePage() {
  return (
    <Main>
        <Hero/>
        <Link href="/dashboard">
          <span>To dashboard</span>
        </Link>
    </Main>
  );
}
