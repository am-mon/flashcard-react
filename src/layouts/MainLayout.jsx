import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="px-4 py-10 md:py-20">
      <Outlet />
      <footer className="text-center text-zinc-700 mt-10">
        © 2025 Mon. Learned React.
      </footer>
    </div>
  );
}
