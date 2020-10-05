import { boolean, text, withKnobs } from '@storybook/addon-knobs';
export default { 
	title: 'Button',
};

export const button = () => {
	const label = text('Button Label', 'Hello World');
	const disabled = boolean('Disabled', false)
	const block = boolean('Block', false)
	const inverse = boolean('Inverse', false)
	return `
		<button ${disabled ? 'disabled' : ''} class="btn ${block ? 'btn-block' : ''} ${inverse ? 'btn-inverse' : ''}">
			${label}
		</button>`;
};