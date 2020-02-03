module.exports = {
  extends: [
    // Use the Standard config as the base.
    'stylelint-config-standard',
    // Enforce a standard order for CSS properties.
    'stylelint-config-recess-order',
    // Override rules that would interfere with Prettier.
    'stylelint-config-prettier',
  ],
};
