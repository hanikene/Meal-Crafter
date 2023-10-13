import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="px-5 py-4 h-20">
      <Link href="/" className="flex items-center gap-2 w-fit">
        <Image src="/logo.png" alt="logo.png" width={50} height={50} />
        <h3 className="text-xl font-semibold">Meal Crafter</h3>
      </Link>
    </nav>
  );
};

export default Navbar;
