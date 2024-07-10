import { useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  DropdownItem,
  AvatarIcon,
} from "@nextui-org/react";
import { NavLink, useNavigate } from "react-router-dom";
import { PAGE } from "src/constants/router";
import { ReduxAuth } from "src/store";
import axiosRequest from "src/axiosManager/axiosRequest";
import { toast } from "sonner";

export default function NavBar() {
  const [email, setEmail] = useState<string>();

  const fetchProfileUser = async () => {
    await axiosRequest
      .get("/auth/get-profile")
      .then((response) => {
        setEmail(response.data.email);
      })
      .catch((error) => {
        toast.error("Get profile user failed !!!");
      });
  };

  useEffect(() => {
    fetchProfileUser();
  }, []);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const logout = () => {
    ReduxAuth.logout();
    navigate(PAGE.LOGIN);
  };
  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand className="space-x-1">
          <p className="font-bold text-2xl">ChatBot</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            className="size-8 stroke-black"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
            />
          </svg>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "text-black font-bold"
                : "text-slate-400 hover:text-black"
            }
            to={PAGE.SITE_MAP}
            aria-current="page"
          >
            SiteMap
          </NavLink>
        </NavbarItem>
        <NavbarItem>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "text-black font-bold"
                : "text-slate-400 hover:text-black "
            }
            to={PAGE.CRAWL_DATA}
          >
            Crawl Data
          </NavLink>
        </NavbarItem>
        <NavbarItem>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "text-black font-bold"
                : "text-slate-400 hover:text-black"
            }
            to={PAGE.CHAT_BOT}
            aria-current="page"
          >
            ChatBot
          </NavLink>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              as="button"
              className="transition-transform"
              icon={<AvatarIcon />}
              size="md"
              classNames={{
                base: "bg-gradient-to-br from-[#71717A] to-[#27272A]",
                icon: "text-white/80",
              }}
            />
          </DropdownTrigger>

          <DropdownMenu variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{email}</p>
            </DropdownItem>
            <DropdownItem key="logout" color="danger" onClick={() => logout()}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>

      <NavbarMenu>
        <NavbarMenuItem className="space-y-2">
          <NavbarItem>
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-black font-bold" : "text-slate-400 font-bold"
              }
              to={PAGE.SITE_MAP}
            >
              Site Map
            </NavLink>
          </NavbarItem>
          <NavbarItem>
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-black font-bold" : "text-slate-400 font-bold"
              }
              to={PAGE.CRAWL_DATA}
            >
              Crawl Data
            </NavLink>
          </NavbarItem>
          <NavbarItem>
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-black font-bold" : "text-slate-400 font-bold"
              }
              to={PAGE.CHAT_BOT}
            >
              Chat Bot
            </NavLink>
          </NavbarItem>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
