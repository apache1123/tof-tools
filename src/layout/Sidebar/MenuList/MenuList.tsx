import { menuItems } from "./menu-items";
import { NavGroup } from "./NavGroup/NavGroup";

// This and related components referenced from https://github.com/codedthemes/berry-free-react-admin-template

export function MenuList() {
  return (
    <>
      {menuItems.map((navGroup) => (
        <NavGroup key={navGroup.id} item={navGroup}></NavGroup>
      ))}
    </>
  );
}
