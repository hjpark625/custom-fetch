import Link from 'next/link';

export default function NotFoundPage() {
  // const headersList = headers();
  // const domain = headersList.get('host');
  // headersList.forEach((value, key) => {
  //   console.log(`${key}: ${value}`);
  // });
  return (
    <div>
      <h1>404 NOT FOUND</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <p>
        Go back to the <Link href="/">homepage</Link>
      </p>
    </div>
  );
}
