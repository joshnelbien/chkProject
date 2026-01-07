function Footer() {
  return (
    <footer className="w-full h-16 bg-[#1E4620] shadow flex items-center justify-between px-6  mt-auto">
      {/* Left side */}
      <p className="text-sm text-white">
        © {new Date().getFullYear()} Pamantasan ng Lungsod ng San Pablo - Insitute of Human Kinetics
      </p>

      {/* Right side */}
      <p className="text-sm text-white">All Rights Reserved</p>
    </footer>
  );
}

export default Footer;