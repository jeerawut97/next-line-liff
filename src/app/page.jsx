"use client"

import { useEffect, useState } from 'react';
import liff from '@line/liff';

const liffId = process.env.NEXT_PUBLIC_LIFF_ID;

const initialLiff = async () => {
  try {
    await liff.init({
      liffId: liffId, // Use own liffId
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
      const idToken = liff.getDecodedIDToken();
      console.log(idToken); // print decoded idToken object
    });
  } catch (err) {
    console.error(err);
  }
};

export default function Home() {
  // const [profile, setProfile] = useState({})

  useEffect(() => {
    if (typeof window !== 'undefined') {
      initialLiff()
    } else {
      console.log('window undefined')
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Hi!
    </main>
  );
}
