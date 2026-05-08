import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar({ cart }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  /* RESPONSIVE CHECK */
  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreen();

    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  /* LOGOUT */
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  /* ACTIVE LINK */
  const isActive = (path) => location.pathname === path;

  /* CLOSE MOBILE MENU */
  const closeMenu = () => {
    if (isMobile) {
      setMenuOpen(false);
    }
  };

  /* HIDE NAVBAR ON LOGIN/REGISTER */
  const hiddenPages = ["/", "/register", "/admin"];

  if (
    hiddenPages.includes(location.pathname) ||
    location.pathname.startsWith("/admin")
  ) {
    return null;
  }

  return (
    <>
      <nav style={styles.navbar}>

        {/* TOP BAR */}
        <div style={styles.topBar}>
          <h1 style={styles.logo}>
            🧵 Pipe Cleaner Crafts
          </h1>

          {/* MOBILE MENU BUTTON */}
          {isMobile && (
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={styles.menuButton}
            >
              ☰
            </button>
          )}
        </div>

        {/* NAV LINKS */}
        <div
          style={{
            ...styles.links,
            flexDirection: isMobile ? "column" : "row",
            display: !isMobile || menuOpen ? "flex" : "none",
          }}
        >

          <NavItem
            to="/products"
            label="Products"
            active={isActive("/products")}
            onClick={closeMenu}
          />

          <NavItem
            to="/cart"
            label="Cart"
            badge={cart.length}
            active={isActive("/cart")}
            onClick={closeMenu}
          />

          <NavItem
            to="/checkout"
            label="Checkout"
            active={isActive("/checkout")}
            onClick={closeMenu}
          />

          <NavItem
            to="/history"
            label="My Orders"
            active={isActive("/history")}
            onClick={closeMenu}
          />

          <NavItem
            to="/custom"
            label="Custom Order"
            active={isActive("/custom")}
            onClick={closeMenu}
          />

          <NavItem
            to="/about"
            label="About Us"
            active={isActive("/about")}
            onClick={closeMenu}
          />

          {/* LOGOUT */}
          <button onClick={logout} style={styles.logout}>
            Logout 🔐
          </button>

        </div>
      </nav>

      {/* MOBILE OVERLAY */}
      {isMobile && menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          style={styles.overlay}
        />
      )}
    </>
  );
}

/* NAV ITEM */
function NavItem({ to, label, active, badge, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      style={{
        ...styles.link,
        background: active
          ? "rgba(255,255,255,0.25)"
          : "transparent",
      }}
    >
      {label}

      {badge > 0 && (
        <span style={styles.badge}>
          {badge}
        </span>
      )}
    </Link>
  );
}

/* STYLES */

const styles = {
  navbar: {
    position: "sticky",
    top: 0,
    zIndex: 1000,
    background: "linear-gradient(135deg, #6a1b9a, #ad1457)",
    padding: "12px 20px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
    color: "white",
  },

  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logo: {
    fontSize: "clamp(20px, 4vw, 34px)",
    fontWeight: "700",
    margin: 0,
  },

  menuButton: {
    fontSize: "28px",
    background: "transparent",
    border: "none",
    color: "white",
    cursor: "pointer",
  },

  links: {
    gap: "10px",
    marginTop: "12px",
    alignItems: "center",
    justifyContent: "flex-end",
  },

  link: {
    color: "white",
    textDecoration: "none",
    padding: "10px 14px",
    borderRadius: "12px",
    fontSize: "16px",
    transition: "0.3s",
    display: "flex",
    alignItems: "center",
  },

  badge: {
    marginLeft: "8px",
    background: "white",
    color: "#6a1b9a",
    borderRadius: "50%",
    padding: "2px 7px",
    fontSize: "12px",
    fontWeight: "bold",
  },

  logout: {
    background: "#ff1744",
    color: "white",
    border: "none",
    padding: "10px 16px",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "bold",
  },

  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.3)",
    zIndex: 999,
  },
};

export default Navbar;