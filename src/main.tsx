import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

// Remove the pre-React boot splash (if present)
const splash = document.getElementById('boot-splash');
if (splash) {
	splash.classList.add('boot-splash--hide');
	window.setTimeout(() => {
		splash.remove();
		// The boot splash CSS intentionally disables scroll; restore it once the app is visible.
		document.body.style.overflowY = 'auto';
		document.body.style.overflowX = 'hidden';
	}, 380);
}

// Safety: ensure scroll is enabled even if the splash isn't present.
document.body.style.overflowY = document.body.style.overflowY || 'auto';
document.body.style.overflowX = document.body.style.overflowX || 'hidden';
