import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const DropdownMenu = ({ selectedPage, setSelectedPage }) => {
  return (
    <Menu as="div" className="relative inline-block text-left w-full">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100">
          {selectedPage.charAt(0).toUpperCase() + selectedPage.slice(1)}
          <ChevronDownIcon
            aria-hidden="true"
            className="-mr-1 h-5 w-5 text-gray-400"
          />
        </MenuButton>
      </div>
      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-full origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5"
      >
        <MenuItem>
          {({ active }) => (
            <button
              onClick={() => setSelectedPage("computers")}
              className={`${
                active ? "bg-gray-100 text-gray-900" : "text-gray-700"
              } block px-4 py-2 text-sm w-full text-left`}
            >
              Computers
            </button>
          )}
        </MenuItem>
        <MenuItem>
          {({ active }) => (
            <button
              onClick={() => setSelectedPage("servers")}
              className={`${
                active ? "bg-gray-100 text-gray-900" : "text-gray-700"
              } block px-4 py-2 text-sm w-full text-left`}
            >
              Servers
            </button>
          )}
        </MenuItem>
        <MenuItem>
          {({ active }) => (
            <button
              onClick={() => setSelectedPage("monitors")}
              className={`${
                active ? "bg-gray-100 text-gray-900" : "text-gray-700"
              } block px-4 py-2 text-sm w-full text-left`}
            >
              Monitors
            </button>
          )}
        </MenuItem>
        <MenuItem>
          {({ active }) => (
            <button
              onClick={() => setSelectedPage("switches")}
              className={`${
                active ? "bg-gray-100 text-gray-900" : "text-gray-700"
              } block px-4 py-2 text-sm w-full text-left`}
            >
              Switches
            </button>
          )}
        </MenuItem>
        <MenuItem>
          {({ active }) => (
            <button
              onClick={() => setSelectedPage("ipads")}
              className={`${
                active ? "bg-gray-100 text-gray-900" : "text-gray-700"
              } block px-4 py-2 text-sm w-full text-left`}
            >
              iPads
            </button>
          )}
        </MenuItem>
        <MenuItem>
          {({ active }) => (
            <button
              onClick={() => setSelectedPage("gary")}
              className={`${
                active ? "bg-gray-100 text-gray-900" : "text-gray-700"
              } block px-4 py-2 text-sm w-full text-left`}
            >
              Gary
            </button>
          )}
        </MenuItem>
      </MenuItems>
    </Menu>
  );
};

export default DropdownMenu;
