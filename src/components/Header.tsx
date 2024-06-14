import { Avatar, AvatarIcon } from "@nextui-org/react";
import React from "react";

function Header() {
  return (
    <div className="bg-white">
      <div className="flex items-center justify-end">
        <div className="p-2 px-5 bg-white flex flex-row items-center space-x-3">
          <Avatar
            icon={<AvatarIcon />}
            classNames={{
              base: "bg-gradient-to-br from-[#71717A] to-[#27272A]",
              icon: "text-white/80",
            }}
          />
          <div className="flex flex-col">
            <div className="font-bold text-xs">thang.ngo@sotatek.com</div>
            <div className="text-gray-500 text-sm">user</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
