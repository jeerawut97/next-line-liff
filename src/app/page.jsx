"use client"

import { useEffect, useState } from 'react';
import liff from '@line/liff';
import Head from 'next/head';

const liffId = process.env.NEXT_PUBLIC_LIFF_ID;

const getProfile = async () => {
  try {
    await liff.init({
      liffId: liffId, // Use own liffId
      withLoginOnExternalBrowser: true, // Enable automatic login process
    });
    await liff.ready
    return liff.getProfile()
  } catch (err) {
    console.error(err);
  }
};

export default function Home() {
  const [profile, setProfile] = useState({})

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setProfile(getProfile());
      console.log('if')
    } else {
      console.log('else')
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section>
      <Head>
        <title>My Profile</title>
      </Head>
      <h1>Profile</h1>
      <div>
        {profile.pictureUrl && <Image
          src={profile.pictureUrl}
          alt={profile.displayName}
          width={500}
          height={500}
        />}
        <div>Name: {profile.displayName}</div>
      </div>
    </section>
    </main>
  );
}
