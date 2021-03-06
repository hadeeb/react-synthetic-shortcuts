const { NODE_ENV, BABEL_ENV } = process.env;
const cjs = NODE_ENV === "test" || BABEL_ENV === "commonjs";
const loose = true;

module.exports = {
  presets: [
    ["@babel/preset-env", { loose, modules: false }],
    ["@babel/preset-typescript", { loose, modules: false }]
  ],
  plugins: [
    ["@babel/plugin-proposal-class-properties", { loose }],
    ["@babel/proposal-object-rest-spread", { loose }],
    "@babel/transform-react-jsx",
    cjs && ["@babel/transform-modules-commonjs", { loose }],
    ["@babel/transform-runtime", { useESModules: !cjs }]
  ].filter(Boolean)
};
