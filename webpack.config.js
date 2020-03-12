const path = require("path");
const ExtractCSS = require("extract-text-webpack-plugin");
const autoprefixer = require("autoprefixer");

const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js");
const OUTPUT_DIR = path.join(__dirname, "static");
const MODE = process.env.WEBPACK_ENV;

const config = {
  entry: ["@babel/polyfill", ENTRY_FILE],
  mode: MODE,
  //모듈을 발견할때마다 이 규칙을 따르라는 의미
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      },
      {
        //scss로 긑나는 파일을 만나면 이 플러그인을 사용하라.
        test: /\.(scss)$/,
        //호환되고 순수한 css안에 있는 텍스트를 추출해서 어딘가로 보낸다.
        use: ExtractCSS.extract([
          //플러그인 안에 또 플러그인을 사용해서 scss파일을 css로 통역한다.
          {
            // webpack이 css를 잘 이해할 수 있게 한다.
            loader: "css-loader"
          },
          {
            // 받은 css를 변환, 인터넷 익스플로어(아래 플러그인)와 호환되게 만든다.
            loader: "postcss-loader",
            options: {
              plugins() {
                return [autoprefixer({ browsers: "cover 99.5%" })];
              }
            }
          },
          {
            //sass를 받아서 css파일로 바꿔줌
            loader: "sass-loader"
          }
        ])
      }
    ]
  },
  output: {
    path: OUTPUT_DIR,
    filename: "[name].js"
  },
  plugins: [new ExtractCSS("styles.css")]
};

module.exports = config;
