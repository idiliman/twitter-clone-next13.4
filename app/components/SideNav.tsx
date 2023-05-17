"use client";

import Link from "next/link";

import { signIn, signOut } from "next-auth/react";

import { type User } from "@prisma/client";

interface SideNavProps {
  currentUser?: {
    name: string;
    email: string;
    image: string;
    id: string;
  };
}

export default function SideNav({ currentUser }: SideNavProps) {
  console.log("🚀 ~ SideNav ~ currentUser:", currentUser);

  return (
    <nav className="sticky top-0 px-2 py-4">
      <ul className="flex flex-col items-start gap-2 whitespace-nowrap">
        <li>
          <Link href="/">Home</Link>
        </li>

        {currentUser && (
          <li>
            <Link href={`/profiles/`}>Profile</Link>
          </li>
        )}

        {!currentUser ? (
          <li>
            <button onClick={() => void signIn()}>Log In</button>
          </li>
        ) : (
          <li>
            <button onClick={() => void signOut()}>Log Out</button>
          </li>
        )}
      </ul>
    </nav>
  );
}
