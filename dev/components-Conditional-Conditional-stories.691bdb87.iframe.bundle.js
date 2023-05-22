"use strict";(self.webpackChunk_osuresearch_ripple=self.webpackChunk_osuresearch_ripple||[]).push([[170],{"./src/components/Conditional/Conditional.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Example:()=>Example,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});__webpack_require__("./node_modules/react/index.js");var _Conditional__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/Conditional/Conditional.tsx"),_osuresearch_ui__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./node_modules/@osuresearch/ui/dist/index.module.js"),_FormProvider__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/components/FormProvider/index.ts"),_hooks__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/hooks/index.ts"),react_redux__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/react-redux/es/index.js"),_features_settings__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./src/features/settings.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Components/Conditional",component:_Conditional__WEBPACK_IMPORTED_MODULE_1__.h,argTypes:{}};function ToggleShowConditionsButton(){const{selector}=(0,_hooks__WEBPACK_IMPORTED_MODULE_3__.CO)(),dispatch=(0,react_redux__WEBPACK_IMPORTED_MODULE_4__.I0)(),showConditions=selector((state=>state.settings.showConditions));return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_osuresearch_ui__WEBPACK_IMPORTED_MODULE_7__.zx,{onPress:()=>dispatch((0,_features_settings__WEBPACK_IMPORTED_MODULE_5__.Gh)(!showConditions)),children:[showConditions?"Hide":"Show"," condition info"]})}ToggleShowConditionsButton.displayName="ToggleShowConditionsButton";const Example={render:args=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_FormProvider__WEBPACK_IMPORTED_MODULE_2__.R,{form:{title:"",version:"",pages:{}},children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_Conditional__WEBPACK_IMPORTED_MODULE_1__.h,{...args,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_osuresearch_ui__WEBPACK_IMPORTED_MODULE_7__.xv,{as:"div",children:"I am conditionally visible!"})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(ToggleShowConditionsButton,{})]}),args:{name:"exampleCondition",condition:"true == true"}};Example.parameters={...Example.parameters,docs:{...Example.parameters?.docs,source:{originalSource:"{\n  render: args => <FormProvider form={{\n    title: '',\n    version: '',\n    pages: {}\n  }}>\n      <Conditional {...args}>\n        <Text as=\"div\">I am conditionally visible!</Text>\n      </Conditional>\n      <ToggleShowConditionsButton />\n    </FormProvider>,\n  args: {\n    name: 'exampleCondition',\n    condition: 'true == true'\n  }\n}",...Example.parameters?.docs?.source}}};const __namedExportsOrder=["Example"]}}]);