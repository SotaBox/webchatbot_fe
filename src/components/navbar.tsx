import { NavLink, useNavigate } from "react-router-dom";
import { PAGE } from "src/constants/router";
import { authActions, useAppDispatch } from "src/store";
function NavBar() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const logout = () => {
    dispatch(authActions.logout());
    navigate(PAGE.LOGIN);
  };
  return (
    <>
      <div className="w-[290px] fixed top-0 bottom-0 lg:left-0 p-2 overflow-y-auto bg-white min-h-screen relative ">
        <div className="flex  flex-col">
          <div className="">
            <div className="flex flex-row items-center justify-center space-x-1 p-2">
              <div className="text-3xl text-black font-bold">ChatBot</div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                />
              </svg>
            </div>

            <div className="flex flex-col space-y-1 py-4 w-full font-bold">
              <NavLink
                to={PAGE.CRAWL_DATA}
                className={({ isActive }) =>
                  isActive
                    ? "flex flex-row space-x-3 bg-slate-800 text-white px-4 py-3 rounded-lg stroke-white"
                    : "flex flex-row space-x-3 bg-white px-4 py-3 rounded-lg hover:bg-slate-100 group text-gray-500 stroke-gray-500 "
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  className="size-6 group-hover:stroke-slate-900  "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
                  />
                </svg>
                <p className=" group-hover:text-black " aria-current="page">
                  Crawl Data
                </p>
              </NavLink>

              <NavLink
                to={PAGE.CHAT_BOT}
                className={({ isActive }) =>
                  isActive
                    ? "flex flex-row space-x-3 bg-slate-800 text-white px-4 py-3 rounded-lg stroke-white"
                    : "flex flex-row space-x-3 bg-white px-4 py-3 rounded-lg hover:bg-slate-100 group text-gray-500 stroke-gray-500 "
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  className="size-6 group-hover:stroke-slate-900 "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                  />
                </svg>
                <p className=" group-hover:text-black " aria-current="page">
                  ChatBot
                </p>
              </NavLink>
            </div>
          </div>

          <div
            onClick={() => logout()}
            className="bg-white px-4 py-3 absolute bottom-4 w-[230px]  rounded-lg hover:bg-slate-100 transition duration-500 group flex flex-row space-x-3 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="gray"
              className="size-6 group-hover:stroke-slate-900 transition duration-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
              />
            </svg>

            <div className="text-gray-500 group-hover:text-black transition duration-500 font-bold">
              Log Out
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBar;
