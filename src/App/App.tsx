import { CSSProperties, useState } from 'react';
import { ArticleParamsForm } from '../components/article-params-form';
import { defaultArticleState } from '../constants/articleProps';
import { Article } from '../components/article';
import styles from '../styles/index.module.scss';

type ArticleStyles = {
	font: string;
	fontSize: string;
	fontColor: string;
	backgroundColor: string;
	contentWidth: string;
};

export const App = () => {
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
			className={styles.main}
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
