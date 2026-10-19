import FirstNav from "../FirstNav/FirstNav";
import MainNav from "../MainNav/MainNav";
import { getAllCategories } from "@/services/categories";
import { Category } from "@/types/categories";

export default async function Navbar() {
  const categories: Category[] = await getAllCategories();
  return (
    <>
      <FirstNav />
      <MainNav categories={categories} />
    </>
  );
}
