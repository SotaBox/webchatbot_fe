import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/16/solid";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { PAGE } from "src/constants/router";
function NavBar() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate(PAGE.LOGIN);
  };
  return (
    <Navbar>
      <NavbarBrand className="flex gap-1">
        <p className="font-bold text-inherit">ChatBot</p>
        <ChatBubbleLeftEllipsisIcon className="size-5" />
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/sitemap">
            Sitemap
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/crawl-data" aria-current="page">
            Crawl Data
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/chatbot">
            ChatBot
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Button color="primary" onClick={logout}>
            Logout
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

export default NavBar;
