"use client"

import { useEffect, useState } from 'react';
import liff from '@line/liff';

const liffId = process.env.NEXT_PUBLIC_LIFF_ID;

export default function Home() {
  const [profile, setProfile] = useState()

  useEffect( async () => {
    if (typeof window !== 'undefined') {
      try {
        await liff.init({
          liffId: liffId,
          withLoginOnExternalBrowser: true,
        }).then(() => {
          setProfile(liff.getDecodedIDToken());
        });
      } catch (err) {
        console.error(err);
      }
    } else {
      console.log('window undefined')
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {!profile && <p>Hi!</p>}
      {profile && <><div>
        <Image
          src={profile.picture}
          alt={profile.name}
          width={500}
          height={500}
        />
        <div>Email: {profile.email}</div>
        <div>Name: {profile.name}</div>
      </div></>}
    </main>
  );
}


// console.log(liff.getLanguage());
// console.log(liff.getVersion());
// console.log(liff.isInClient());
// console.log(liff.isLoggedIn());
// console.log(liff.getOS());
// console.log(liff.getLineVersion());

// const token = liff.getDecodedIDToken();
// console.log(token); // print decoded token object

// const getAccessToken = liff.getAccessToken()
// console.log(`getAccessToken: ${getAccessToken}`)

// const profile = liff.getProfile()
// console.log(`profile: ${profile}`)

// const profilePlus = liff.getProfilePlus()
// console.log(`profilePlus: ${profilePlus}`)