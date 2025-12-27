import { useState, useEffect, useRef } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';

import {
	fontFamilyOptions,
	fontSizeOptions,
	defaultArticleState,
	contentWidthArr,
	backgroundColors,
	fontColors,
} from 'src/constants/articleProps';
import { Separator } from 'src/ui/separator';
import { RadioGroup } from 'src/ui/radio-group';
import type { OptionType } from 'src/constants/articleProps';
import type { MouseEvent as ReactMouseEvent } from 'react';

import styles from './ArticleParamsForm.module.scss';

type ArticleStyles = {
	font: string;
	fontSize: string;
	fontColor: string;
	backgroundColor: string;
	contentWidth: string;
};

type ArticleParamsFormProps = {
	onApply: (styles: ArticleStyles) => void; // Функция, которую передал App
};

export const ArticleParamsForm = ({ onApply }: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [font, setFont] = useState<OptionType>(
		defaultArticleState.fontFamilyOption
	);
	const [fontSize, setFontSize] = useState<OptionType>(
		defaultArticleState.fontSizeOption
	);
	const [fontColor, setFontColor] = useState<OptionType>(
		defaultArticleState.fontColor
	);
	const [backgroundColor, setBackgroundColor] = useState<OptionType>(
		defaultArticleState.backgroundColor
	);
	const [contentWidth, setContentWidth] = useState<OptionType>(
		defaultArticleState.contentWidth
	);
	const refContainer = useRef<HTMLElement>(null);

	const handleClick = () => {
		setIsOpen(!isOpen);
	};

	const resetForm = (e?: ReactMouseEvent<HTMLButtonElement>) => {
		e?.preventDefault();
		const defaultFormData = {
			font: defaultArticleState.fontFamilyOption.value,
			fontSize: defaultArticleState.fontSizeOption.value,
			fontColor: defaultArticleState.fontColor.value,
			backgroundColor: defaultArticleState.backgroundColor.value,
			contentWidth: defaultArticleState.contentWidth.value,
		};

		setFont(defaultArticleState.fontFamilyOption);
		setFontSize(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setBackgroundColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);

		onApply(defaultFormData);
		setIsOpen(false);
	};

	const handleApply = (e?: ReactMouseEvent<HTMLButtonElement>) => {
		e?.preventDefault();

		const formData = {
			font: font.value,
			fontSize: fontSize.value,
			fontColor: fontColor.value,
			backgroundColor: backgroundColor.value,
			contentWidth: contentWidth.value,
		};

		onApply(formData);
		setIsOpen(false);
	};

	useEffect(() => {
		if (isOpen == true) {
			refContainer.current?.classList.add(styles.container_open);
		} else {
			refContainer.current?.classList.remove(styles.container_open);
		}
	}, [isOpen]);

	useEffect(() => {
		const handleClickOutside = (e: globalThis.MouseEvent) => {
			const target = e.target as Element | null;
			if (!target) return;

			if (target.closest('[data-ignore-outside]')) return;

			if (
				isOpen &&
				refContainer.current &&
				!refContainer.current.contains(target as Node)
			) {
				setIsOpen(false);
			}
		};

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleClick} />
			<aside className={styles.container} ref={refContainer}>
				<form className={styles.form} style={{ gap: 50 }}>
					<h1 className={styles.h1}>Задайте параметры</h1>
					<Select
						title={'шрифт'}
						selected={font}
						options={fontFamilyOptions}
						onChange={(selected) => {
							setFont(selected);
						}}></Select>
					<RadioGroup
						name={'fontSize'}
						options={fontSizeOptions}
						selected={fontSize}
						title={'Размер Шрифта'}
						onChange={(selected) => {
							setFontSize(selected);
						}}></RadioGroup>
					<Select
						title={'цвет шрифта'}
						selected={fontColor}
						options={fontColors}
						onChange={(selected) => {
							setFontColor(selected);
						}}></Select>
					<Separator></Separator>
					<Select
						title={'цвет фона'}
						selected={backgroundColor}
						options={backgroundColors}
						onChange={(selected) => {
							setBackgroundColor(selected);
						}}></Select>
					<Select
						title={'ширина контента'}
						selected={contentWidth}
						options={contentWidthArr}
						onChange={(selected) => {
							setContentWidth(selected);
						}}></Select>
					<div className={styles.bottomContainer}>
						<Button
							onClick={resetForm}
							title='Сбросить'
							htmlType='reset'
							type='clear'
						/>
						<Button
							onClick={handleApply}
							title='Применить'
							htmlType='submit'
							type='apply'
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
