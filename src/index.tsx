import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

type ArticleStyles = {
	font: string;
	fontSize: string;
	fontColor: string;
	backgroundColor: string;
	contentWidth: string;
};

const App = () => {
	const [appStyles, setAppStyles] = useState({
		font: defaultArticleState.fontFamilyOption.value,
		fontSize: defaultArticleState.fontSizeOption.value,
		fontColor: defaultArticleState.fontColor.value,
		backgroundColor: defaultArticleState.backgroundColor.value,
		contentWidth: defaultArticleState.contentWidth.value,
	});

	const updateAppStyles = (newStyles: ArticleStyles) => {
		setAppStyles((prev) => ({ ...prev, ...newStyles }));
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': appStyles.font,
					'--font-size': appStyles.fontSize,
					'--font-color': appStyles.fontColor,
					'--container-width': appStyles.contentWidth,
					'--bg-color': appStyles.backgroundColor,
				} as CSSProperties
			}>
			<ArticleParamsForm onApply={updateAppStyles} />
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
