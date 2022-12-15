import { signIn, signOut, useSession } from 'next-auth/react'
import { Container } from './Container'

export function LoggedOutBanner() {

    const { data: session } = useSession()

    if (session) {
        return null
    }

    return (
      <div className="fixed bottom-0 w-full bg-primary p-4">
        <Container classNames="bg-transparent flex justify-between">
          <p className='text-white'>Don't wanna miss out on what&apos;s going on? <br /> Create an account for free or sign in.</p>
          <div className="">
            <button className='text-white shadow-md px-4 py-2' type="submit" onClick={() => signIn()}>
              Login
            </button>
          </div>
        </Container>
      </div>
    );
}