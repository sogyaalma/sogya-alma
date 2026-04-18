import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phoneOrEmail: { label: "رقم الجوال أو البريد", type: "text", placeholder: "05x xxx xxxx" },
        password: { label: "كلمة المرور", type: "password" }
      },
      async authorize(credentials) {
        // Enterprise Standard: Centralized Identity Provider Mock
        // In a real system, this connects to Auth0, Keycloak, or Postgres
        
        if (credentials?.phoneOrEmail && credentials?.password) {
          // Accept any login for demo purposes
          return { id: "1", name: "فهد بن عبدالله", email: "user@sogyaalma.org.sa" };
        }
        return null;
      }
    })
  ],
  session: {
    strategy: "jwt", // Enterprise Standard: JWT for stateless auth
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/auth/login', // Use our custom login page
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
