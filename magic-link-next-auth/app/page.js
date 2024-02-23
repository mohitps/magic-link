'use client';
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

export default function Home(context) {
  const router = useRouter();
  const { data: session } = useSession(context);
  return (
    <main>
      <div className="container px-5 py-24 mx-auto flex flex-col justify-center items-center text-center">
        <h1>Homepage</h1>
        {session &&
          <>
            <div>
              <p>Signed in as {session.user.email}</p>
              <button onClick={signOut}>Sign Out</button>
            </div>

          </>}

        {!session &&
          <>
            <button onClick={() => router.push('/signin')}>Sign in with Email</button>
          </>
        }
      </div>
    </main>
  )
}

