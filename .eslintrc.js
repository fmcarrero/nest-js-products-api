module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
      'airbnb-base',
      'plugin:import/typescript',
      'plugin:@typescript-eslint/recommended',
      'prettier',
      'prettier/@typescript-eslint',
    ],
    settings: {
        "import/resolver": {
          node: {
            "paths": ["src"],
            extensions: [".js", ".jsx", ".ts", ".tsx"]
          }
        }
    },
    root: true,
    env: {
      node: true,
      jest: true,
    },
    rules: {
      'import/no-unresolved': false,
      'new-cap': 0,
      'import/no-extraneous-dependencies': [
        'error',
        { devDependencies: ['**/*spec.ts'] },
      ],
      'no-useless-constructor': 'off',
      '@typescript-eslint/no-useless-constructor': 'error',
      "import/extensions": [
        "error",
        "ignorePackages",
        {
          "js": "never",
          "jsx": "never",
          "ts": "never",
          "tsx": "never"
        }
     ]
    },
  };