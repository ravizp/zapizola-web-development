import NavbarAfterLogin from "../../components/NavbarAfterLogin";

export default function ProductLayout({
  children,
}:{
  children: React.ReactNode;
}) {
  return (
        <section>
            <NavbarAfterLogin/>

            <main>{children}</main>
            
        </section>
  );
}


