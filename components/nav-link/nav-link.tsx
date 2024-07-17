"use client";

import Link from "next/link";
import styles from "./nav-link.module.css";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

export default function NavLink({
  to,
  children,
}: {
  to: string;
  children: ReactNode;
}) {
  const path = usePathname();
  return (
    <Link href={to} className={path.startsWith(to) ? styles.active : undefined}>
      {children}
    </Link>
  );
}
