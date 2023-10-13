import Link from "next/link";

const Footer = () => {
  return (
    <footer className="flex justify-center items-center h-20 bg-stone-900">
      <p className="text-white">
        by{" "}
        <Link href="https://ikene.tech" target="_blank">
          Nassim Hani Ikene
        </Link>{" "}
        © 2023
      </p>
    </footer>
  );
};

export default Footer;
