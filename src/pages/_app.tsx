import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { LoggedOutBanner } from "../components/LoggedOutBanner";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import { Container } from "../components/Container";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Container>
        <main>
          <Component {...pageProps} />
        </main>
      </Container>
      <LoggedOutBanner />
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
