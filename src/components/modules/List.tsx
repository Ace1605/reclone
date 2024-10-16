"use client";
import { SearchResult } from "@/types";
import clsx from "clsx";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface ListProps {
  user: SearchResult;
}

export const List = ({ user }: ListProps) => {
  const [avatarLoaded, setAvatarLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: 0.4,
      }}
      key={user.id}
      className={clsx(
        "flex justify-between py-2 768:py-3 px-3 768:px-5 bg-neutral-100 shadow-sm max-h-custom-dvh overflow-y-scroll items-center gap-2 my-3 rounded-[10px]"
      )}
    >
      <div className="flex items-center gap-4">
        <Image
          src={!avatarLoaded ? "/assets/fallback.png" : user.avatar_url}
          className="w-10 h-10 rounded-full border border-primary-main object-cover"
          alt={`${user.login} avatar`}
          onError={(e) => {
            e.currentTarget.src = "/assets/fallback.png";
          }}
          onLoad={() => {
            setAvatarLoaded(true);
          }}
        />
        <p className="text-base text-black capitalize font-medium">
          {user.login}
        </p>
      </div>
      <Link
        href={user?.repos_url}
        target="_blank"
        className="text-primary-main"
      >
        View repo
      </Link>
    </motion.div>
  );
};
