import styles from "@/styles/Layout.module.css";

function Layout({ children }) {
	return (
		<div className={styles.container}>
			<h1>Quizzical</h1>
			{children}
		</div>
	);
}

export default Layout;
