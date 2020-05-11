import "../assets/scss/main.scss";
import "./storybook.scss";
import { addParameters, addDecorator } from '@storybook/html';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { withKnobs } from "@storybook/addon-knobs";
import { withA11y } from '@storybook/addon-a11y';

addParameters({
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
});

addDecorator(withKnobs);
addDecorator(withA11y);