// const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

// /**
//  * Metro configuration
//  * https://reactnative.dev/docs/metro
//  *
//  * @type {import('metro-config').MetroConfig}
//  */
// const config = {};

// module.exports = mergeConfig(getDefaultConfig(__dirname), config);
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

// 이전 기본 설정을 가져오기
const defaultConfig = getDefaultConfig(__dirname);

// SVG Transformer 설정 추가
const svgTransformer = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    assetExts: defaultConfig.resolver.assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...defaultConfig.resolver.sourceExts, 'svg'],
  },
};

// 기본 설정과 새로운 SVG Transformer 설정 병합
module.exports = mergeConfig(defaultConfig, svgTransformer);
