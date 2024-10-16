import Image from "next/image";
import { GitHub } from "../svgs/General";
import asset from "/public/assets/aku-image.svg";
import Link from "next/link";

export const Header = () => {
  return (
    <div className="flex items-baseline gap-2">
      <Image
        src={asset}
        alt="main_logo"
        width={80}
        priority
        className="object-contain h-auto"
      />
      <GitHub className="w-5 h-5" />
    </div>
  );
};
