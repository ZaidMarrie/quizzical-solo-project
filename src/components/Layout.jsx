import styles from "@/styles/Layout.module.css";

function Layout({ children }) {
	return (
		<main className={styles.container}>
			<h1>Quizzical</h1>
			{children}
		</main>
	);
}

export default Layout;
