"use client"

import { useEffect, useState } from 'react';
import Image from 'next/image'
import liff from '@line/liff';

const liffId = process.env.NEXT_PUBLIC_LIFF_ID;

export default function Home() {
  const [profile, setProfile] = useState();
  const [token, setToken] = useState();

  useEffect( async () => {
    if (typeof window !== 'undefined') {
      try {
        await liff.init({
          liffId: liffId,
          withLoginOnExternalBrowser: true,
        })

        await liff.getProfile()
        .then((profile) => {
          setProfile(profile);
        })

        if (!liff.isLoggedIn()) {
          liff.login()
        }

        await liff.init({
          liffId: liffId,
        }).then(() => {
          setToken(liff.getDecodedIDToken());
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
      {!profile && <div><p>Hi!</p></div>}
      {profile && <><div>
        <p>Hi!</p>
        <Image
          src={profile.pictureUrl}
          alt={profile.displayName}
          width={0}
          height={0}
          sizes="200vw"
          style={{ width: '100%' }}
          priority
        />
        <div>UserId: {profile.userId}</div>
        <div>Email: {token?.email?? "-"}</div>
        <div>DisplayName: {profile.displayName}</div>
        <div>StatusMessage: {profile.statusMessage}</div>
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