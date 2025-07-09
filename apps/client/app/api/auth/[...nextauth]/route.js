import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { signIn } from "next-auth/react";

const genUsername = (base) => {
  const sanitized = base.toLowerCase().replace(/[^a-z0-9]/g, "")
  const suffix = Math.floor(Math.random() * 10000).toString().padStart(4, "0")
  return `${sanitized}${suffix}`
}

const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 3 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user }) {
      const base = user.name || user.email.split("@")[0]
      const username = genUsername(base)
      const res = await fetch("http://localhost:5000/api/auth/oauth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          username,
        }),
      })
      if (res.ok) {
        let data = await res.json()
        console.log(data)
        user.uuid = data.uuid
        user.username = data.username
        user.token = data.token
        return true
      } else {
        console.log(res)
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.uuid = user.uuid
        token.username = user.username
        token.jwtToken = user.token
      }

      return token
    },

    async session({ session, token }) {
      session.user.uuid = token.uuid
      session.user.username = token.username
      session.token = token.jwtToken;
      console.log(session.token)
      return session
    },
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
