import Link from 'next/link';
import React from 'react'

const Landing = ({ user }) => {
  return <div>landing <Link href="/login">log in</Link></div>;
};

export default Landing;
