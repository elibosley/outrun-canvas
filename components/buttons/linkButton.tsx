import Link from "next/link";

export const LinkButton: React.FC<{ text: string; url: string }> = ({ text, url }) => {
  return (
    <Link
      className="link rounded-xl border-2 border-gray-200 border-solid hover:border-orange-500 p-2 text-gray-200 hover:text-orange-500  transition-colors flex justify-center align-center bg-slate-500 bg-opacity-10 hover:bg-opacity-90 px-12"
      href={url}
      target="_blank"
    >
      <h1 className="text-xl">{text}</h1>
    </Link>
  );
};
