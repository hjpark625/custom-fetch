import { getError } from '@/api/detail/server';

export default async function SomethingPage() {
  try {
    await getError();
    return <div>SomethingPage</div>;
  } catch (err) {
    throw err;
  }
}
