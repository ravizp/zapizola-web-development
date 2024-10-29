import NavbarAfterLogin from "../../components/NavbarAfterLogin";
import ServerProtectedComponents from "../../components/ServerProtectedComponents";

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ServerProtectedComponents>
      <section>
        <NavbarAfterLogin />

        <main>{children}</main>
      </section>
    </ServerProtectedComponents>
  );
}
