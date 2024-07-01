"use client"

import { useEffect, useState } from 'react';
import liff from '@line/liff';

const liffId = process.env.NEXT_PUBLIC_LIFF_ID;

const initialLiff = async () => {
  try {
    await liff.init({
      liffId: liffId,
      withLoginOnExternalBrowser: true,
    });

    if (!liff.isLoggedIn()) {
      liff.login();
    }

    console.log(liff.getLanguage());
    console.log(liff.getVersion());
    console.log(liff.isInClient());
    console.log(liff.isLoggedIn());
    console.log(liff.getOS());
    console.log(liff.getLineVersion());

    await liff.init({
      liffId: liffId, // Use own liffId
    })
    .then(() => {
      const token = liff.getDecodedIDToken();
      console.log(token); // print decoded token object

      // const getAccessToken = liff.getAccessToken()
      // console.log(`getAccessToken: ${getAccessToken}`)

      // const profile = liff.getProfile()
      // console.log(`profile: ${profile}`)

      // const profilePlus = liff.getProfilePlus()
      // console.log(`profilePlus: ${profilePlus}`)
    });
  } catch (err) {
    console.error(err);
  }
};

export default function Home() {
  const [profile, setProfile] = useState({})

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setProfile(initialLiff().token)
    } else {
      console.log('window undefined')
    }
  }, []);

  console.log(`profile: ${profile}`)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Hi!

      <div>
        {profile.picture && <Image
          src={profile.picture}
          alt={profile.name}
          width={500}
          height={500}
        />}
        <div>Email: {profile.email}</div>
        <div>Name: {profile.name}</div>
      </div>
    </main>
  );
}
