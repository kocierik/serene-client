import "@tmikeladze/react-cmdk/dist/cmdk.css";
import CommandPalette, { filterItems, getItemIndex, useHandleOpenCommandPalette } from "@tmikeladze/react-cmdk";
import { useEffect, useState } from "react";

const SearchMenu = () => {
  const [page, setPage] = useState<"root" | "projects">("root");
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useHandleOpenCommandPalette(setIsOpen);
  
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
        if (e.key === 'm' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        e.stopPropagation();
  
        setIsOpen((currentValue) => {
          return !currentValue;
        });
      }
    }
  
    document.addEventListener("keydown", handleKeyDown);
  
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const filteredItems = filterItems(
    [
      {
        
        heading: "Music",
        id: "home",
        items: [
          {
            id: "home",
            children: "Home",
            icon: "HomeIcon",
            href: "#",
          },
          {
            id: "settings",
            children: "Settings",
            icon: "CogIcon",
            href: "#",
          },
          {
            id: "projects",
            children: "Projects",
            icon: "RectangleStackIcon",
            closeOnSelect: false,
            onClick: () => {
              setPage("projects");
            },
          },
        ],
      },
    ],
    search
  );

  return (
    <CommandPalette
      commandPaletteContentClassName="dark"
      onChangeSearch={setSearch}
      onChangeOpen={setIsOpen}
      search={search}
      isOpen={isOpen}
      page={page}
    >
      <CommandPalette.Page id="root">
        {filteredItems.length ? (
          filteredItems.map((list) => (
            <CommandPalette.List key={list.id} heading={list.heading}>
              {list.items.map(({ id, ...rest }) => (
                <CommandPalette.ListItem
                  key={id}
                  index={getItemIndex(filteredItems, id)}
                  {...rest}
                />
              ))}
            </CommandPalette.List>
          ))
        ) : (
          <CommandPalette.FreeSearchAction />
        )}
      </CommandPalette.Page>

      <CommandPalette.Page id="projects">
        {/* Projects page */}
      </CommandPalette.Page>
    </CommandPalette>
  );
};

export default SearchMenu;