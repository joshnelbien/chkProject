function Footer() {
  return (
    <footer className="ml-64 h-16 bg-white shadow flex items-center justify-between px-6 fixed bottom-0 left-0 right-0 z-10">
      {/* Left side */}
      <p className="text-sm text-gray-600">
        © {new Date().getFullYear()} Pamantasan ng Lungsod ng San Pablo - College of Human Kinetics
      </p>

      {/* Right side */}
      <p className="text-sm text-gray-600">All Rights Reserved</p>
    </footer>
  );
}

export default Footer;
