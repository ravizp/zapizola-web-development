export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-4">
      <p className="text-sm text-center md:text-left">
        &copy; {new Date().getFullYear()} Zapizola. All rights reserved.
      </p>
    </footer>
  );
}
