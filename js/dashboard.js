/* ==========================================
   LUCIDE ICONS
========================================== */

if (typeof lucide !== "undefined") {
    lucide.createIcons();
}

/* ==========================================
   DASHBOARD SIDEBAR TOGGLE
========================================== */

const dashboardSidebar = document.getElementById("dashboardSidebar");
const dashboardMenuToggle = document.getElementById("dashboardMenuToggle");
const dashboardSidebarOverlay = document.getElementById("dashboardSidebarOverlay");
const dashboardSidebarClose = document.querySelector(".unitutor-sidebar-close");

/* Move the existing header actions into the sidebar on phone widths only. */
const dashboardHeaderRight = document.querySelector(".unitutor-dashboard-header-right");
const dashboardLogoutArea = document.querySelector(".unitutor-dashboard-logout");
const mobileSidebarActions = document.createElement("div");
mobileSidebarActions.className = "unitutor-mobile-sidebar-actions";

const mobileSidebarActionItems = dashboardHeaderRight ? [
    dashboardHeaderRight.querySelector(".notification-btn"),
    dashboardHeaderRight.querySelector('button[aria-label="Settings"]'),
    dashboardHeaderRight.querySelector(".unitutor-dashboard-profile")
].filter(Boolean) : [];

const mobileSidebarActionAnchors = mobileSidebarActionItems.map((item) => {
    const anchor = document.createComment("header action position");
    item.parentNode.insertBefore(anchor, item);
    return { item, anchor };
});

if (dashboardSidebar && dashboardLogoutArea && mobileSidebarActionItems.length) {
    dashboardSidebar.insertBefore(mobileSidebarActions, dashboardLogoutArea);
}

function updateMobileSidebarActions() {
    if (!dashboardSidebar || !dashboardHeaderRight || !mobileSidebarActionItems.length) return;

    if (window.matchMedia("(max-width: 767px)").matches) {
        mobileSidebarActionItems.forEach((item) => mobileSidebarActions.appendChild(item));
    } else {
        mobileSidebarActionAnchors.forEach(({ item, anchor }) => {
            if (anchor.parentNode) anchor.parentNode.insertBefore(item, anchor.nextSibling);
        });
    }
}

updateMobileSidebarActions();
window.addEventListener("resize", updateMobileSidebarActions);


if (dashboardSidebarClose) {

    dashboardSidebarClose.addEventListener("click", () => {

        if (dashboardSidebar) {
            dashboardSidebar.classList.remove("open");
        }

        if (dashboardSidebarOverlay) {
            dashboardSidebarOverlay.classList.remove("active");
        }

        if (dashboardMenuToggle) {
            dashboardMenuToggle.setAttribute("aria-expanded", "false");
        }

    });

}

if (dashboardSidebar && dashboardMenuToggle) {

    dashboardMenuToggle.addEventListener("click", () => {

        const isOpen = dashboardSidebar.classList.toggle("open");

        if (dashboardSidebarOverlay) {
            dashboardSidebarOverlay.classList.toggle("active", isOpen);
        }

        dashboardMenuToggle.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

    });

}


/* Close sidebar when overlay is clicked */

if (dashboardSidebarOverlay) {

    dashboardSidebarOverlay.addEventListener("click", () => {

        dashboardSidebar.classList.remove("open");
        dashboardSidebarOverlay.classList.remove("active");

        if (dashboardMenuToggle) {
            dashboardMenuToggle.setAttribute("aria-expanded", "false");
        }

    });

}


/* Close sidebar when a navigation link is clicked */

if (dashboardSidebar) {

    const dashboardNavLinks =
        dashboardSidebar.querySelectorAll(".unitutor-dashboard-nav a");

    dashboardNavLinks.forEach((link) => {

        link.addEventListener("click", () => {

            dashboardSidebar.classList.remove("open");

            if (dashboardSidebarOverlay) {
                dashboardSidebarOverlay.classList.remove("active");
            }

            if (dashboardMenuToggle) {
                dashboardMenuToggle.setAttribute("aria-expanded", "false");
            }

        });

    });

}

/* ==========================================
   DASHBOARD DARK MODE
========================================== */

const dashboardThemeToggle =
    document.getElementById("dashboardThemeToggle");

if (dashboardThemeToggle) {

    const savedTheme = localStorage.getItem("unitutor-theme");

    if (savedTheme === "dark") {
        document.documentElement.classList.add("dark-mode");
    }

    const updateDashboardThemeIcon = () => {
        const isDark =
            document.documentElement.classList.contains("dark-mode");

        dashboardThemeToggle.innerHTML = isDark
            ? '<i data-lucide="sun"></i>'
            : '<i data-lucide="moon"></i>';

        if (typeof lucide !== "undefined") {
            lucide.createIcons();
        }
    };

    // Match the icon to the restored theme on every dashboard page load.
    updateDashboardThemeIcon();

    dashboardThemeToggle.addEventListener("click", () => {

        document.documentElement.classList.toggle("dark-mode");

        const isDark =
            document.documentElement.classList.contains("dark-mode");

        localStorage.setItem(
            "unitutor-theme",
            isDark ? "dark" : "light"
        );

        updateDashboardThemeIcon();

    });

}

/* ==========================================
   DASHBOARD RTL TOGGLE
========================================== */

const dashboardRtlToggle =
    document.getElementById("dashboardRtlToggle");

if (dashboardRtlToggle) {

    const savedDirection =
        localStorage.getItem("unitutor-direction");

    if (savedDirection === "rtl") {
        document.documentElement.setAttribute("dir", "rtl");
    }

    dashboardRtlToggle.addEventListener("click", () => {

        const currentDirection =
            document.documentElement.getAttribute("dir");

        const newDirection =
            currentDirection === "rtl" ? "ltr" : "rtl";

        document.documentElement.setAttribute(
            "dir",
            newDirection
        );

        localStorage.setItem(
            "unitutor-direction",
            newDirection
        );

    });

}

/* ==========================================
   LOGOUT CONFIRMATION
========================================== */

const dashboardLogoutBtn =
    document.getElementById("dashboardLogoutBtn");

const dashboardLogoutModal =
    document.getElementById("dashboardLogoutModal");

const logoutNoBtn =
    document.getElementById("logoutNoBtn");

const logoutYesBtn =
    document.getElementById("logoutYesBtn");

const logoutModalClose =
    document.getElementById("logoutModalClose");

const logoutModalOverlay =
    document.getElementById("logoutModalOverlay");


function openLogoutModal() {

    if (!dashboardLogoutModal) return;

    dashboardLogoutModal.classList.add("active");
    dashboardLogoutModal.setAttribute("aria-hidden", "false");

}


function closeLogoutModal() {

    if (!dashboardLogoutModal) return;

    dashboardLogoutModal.classList.remove("active");
    dashboardLogoutModal.setAttribute("aria-hidden", "true");

}


if (dashboardLogoutBtn) {

    dashboardLogoutBtn.addEventListener("click", () => {
        openLogoutModal();
    });

}


if (logoutNoBtn) {

    logoutNoBtn.addEventListener("click", () => {
        closeLogoutModal();
    });

}

/* Move logout modal outside transformed sidebar */
if (
    dashboardLogoutModal &&
    dashboardLogoutModal.parentElement !== document.body
) {
    document.body.appendChild(dashboardLogoutModal);
}

if (logoutModalClose) {

    logoutModalClose.addEventListener("click", () => {
        closeLogoutModal();
    });

}


if (logoutModalOverlay) {

    logoutModalOverlay.addEventListener("click", () => {
        closeLogoutModal();
    });

}


if (logoutYesBtn) {

    logoutYesBtn.addEventListener("click", () => {
        window.location.href = "login.html";
    });

}


/* Close popup with Escape */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
        closeLogoutModal();
    }

});
