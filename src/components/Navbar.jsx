function Navbar() {
  return (
    <header style={{
      backgroundColor: "#fcebe5",
      padding: "10px 20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }}>
      <img
        src="/logo-snugglepaws.png"
        alt="SnugglePaws Logo"
        style={{ height: "50px" }}
      />
      <h2 style={{ margin: 0, color: "#7c4a36" }}>SnugglePaws</h2>
    </header>
  );
}

export default Navbar;
