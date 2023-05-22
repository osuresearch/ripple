"use strict";(self.webpackChunk_osuresearch_ripple=self.webpackChunk_osuresearch_ripple||[]).push([[343],{"./src/components/AutolayoutPage/AutolayoutPage.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Example:()=>Example,MissingDefinition:()=>MissingDefinition,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});__webpack_require__("./node_modules/react/index.js");var _AutolayoutPage__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/AutolayoutPage/AutolayoutPage.tsx"),_mocks_simple__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/mocks/simple.ts"),_FormProvider__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/components/FormProvider/index.ts"),react_router_dom__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/react-router/dist/index.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Components/AutolayoutPage",component:_AutolayoutPage__WEBPACK_IMPORTED_MODULE_1__.S,argTypes:{}},Example={render:args=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_FormProvider__WEBPACK_IMPORTED_MODULE_3__.R,{form:_mocks_simple__WEBPACK_IMPORTED_MODULE_2__.N,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_AutolayoutPage__WEBPACK_IMPORTED_MODULE_1__.S,{...args,name:"Main"})}),args:{}},MissingDefinition={render:args=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_FormProvider__WEBPACK_IMPORTED_MODULE_3__.R,{form:_mocks_simple__WEBPACK_IMPORTED_MODULE_2__.N,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_5__.VA,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_AutolayoutPage__WEBPACK_IMPORTED_MODULE_1__.S,{...args,name:"BadPageName"})})}),args:{}};Example.parameters={...Example.parameters,docs:{...Example.parameters?.docs,source:{originalSource:'{\n  render: args => <FormProvider form={SimpleForm}>\n      <AutolayoutPage {...args} name="Main" />\n    </FormProvider>,\n  args: {}\n}',...Example.parameters?.docs?.source}}},MissingDefinition.parameters={...MissingDefinition.parameters,docs:{...MissingDefinition.parameters?.docs,source:{originalSource:'{\n  render: args => <FormProvider form={SimpleForm}>\n      <MemoryRouter>\n        <AutolayoutPage {...args} name="BadPageName" />\n      </MemoryRouter>\n    </FormProvider>,\n  args: {}\n}',...MissingDefinition.parameters?.docs?.source}}};const __namedExportsOrder=["Example","MissingDefinition"]},"./src/components/AutolayoutPage/AutolayoutPage.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{S:()=>AutolayoutPage});__webpack_require__("./node_modules/react/index.js");var _osuresearch_ui__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/@osuresearch/ui/dist/index.module.js"),_hooks_usePageContext__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/hooks/usePageContext.ts"),_Field__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/components/Field/index.ts"),_Page__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/components/Page/index.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/react/jsx-runtime.js");function Content(){const{page}=(0,_hooks_usePageContext__WEBPACK_IMPORTED_MODULE_1__.l)();return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_osuresearch_ui__WEBPACK_IMPORTED_MODULE_5__.Kq,{align:"stretch",gap:"xl",py:"lg",children:Object.keys(page.fields).map((name=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_Field__WEBPACK_IMPORTED_MODULE_2__.g,{name},name)))})}function AutolayoutPage({name}){return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_Page__WEBPACK_IMPORTED_MODULE_3__.T,{name,withHeader:!0,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(Content,{})})}Content.displayName="Content",AutolayoutPage.displayName="AutolayoutPage";try{AutolayoutPage.displayName="AutolayoutPage",AutolayoutPage.__docgenInfo={description:"",displayName:"AutolayoutPage",props:{name:{defaultValue:null,description:"",name:"name",required:!0,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/AutolayoutPage/AutolayoutPage.tsx#AutolayoutPage"]={docgenInfo:AutolayoutPage.__docgenInfo,name:"AutolayoutPage",path:"src/components/AutolayoutPage/AutolayoutPage.tsx#AutolayoutPage"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/Page/index.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{T:()=>Page});var index_module=__webpack_require__("./node_modules/@osuresearch/ui/dist/index.module.js"),styled_components_browser_esm=(__webpack_require__("./node_modules/react/index.js"),__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js")),useRippleContext=__webpack_require__("./src/hooks/useRippleContext.ts"),Conditional=__webpack_require__("./src/components/Conditional/index.ts"),usePageContext=__webpack_require__("./src/hooks/usePageContext.ts"),Debug=__webpack_require__("./src/components/Debug/index.ts"),Markdown=__webpack_require__("./src/components/Markdown/index.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function PageHeader({name,page,errors}){return(0,jsx_runtime.jsxs)(index_module.xu,{children:[(0,jsx_runtime.jsx)(index_module.X6,{level:2,children:(0,jsx_runtime.jsx)(index_module.fO,{id:"ripple-page-"+name,children:page.title})}),page.description&&(0,jsx_runtime.jsx)(index_module.Xk,{px:"lg",pt:"lg",pb:"sm",bgc:"light",shadow:"sm",withBorder:!0,children:(0,jsx_runtime.jsx)(Markdown.U,{text:page.description})}),(0,jsx_runtime.jsx)(index_module._o,{errorMessages:errors})]})}PageHeader.displayName="PageHeader";try{PageHeader.displayName="PageHeader",PageHeader.__docgenInfo={description:"View for page title, description, and error messages.\n\nThis is rendered automatically when using an `<AutolayoutPage>`\nor a `<Page>` with the header enabled.",displayName:"PageHeader",props:{name:{defaultValue:null,description:"",name:"name",required:!0,type:{name:"string"}},page:{defaultValue:null,description:"",name:"page",required:!0,type:{name:"PageDefinition"}},errors:{defaultValue:null,description:"",name:"errors",required:!1,type:{name:"ErrorList"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/PageHeader/PageHeader.tsx#PageHeader"]={docgenInfo:PageHeader.__docgenInfo,name:"PageHeader",path:"src/components/PageHeader/PageHeader.tsx#PageHeader"})}catch(__react_docgen_typescript_loader_error){}var hooks=__webpack_require__("./src/hooks/index.ts");function Pagination({current}){const{getPreviousPage,getNextPage}=(0,hooks.CO)(),prev=getPreviousPage(current),next=getNextPage(current);return(0,jsx_runtime.jsxs)(index_module.ZA,{justify:"apart",w:"100%",children:[!prev&&(0,jsx_runtime.jsx)(index_module.xu,{w:"100%"}),prev&&(0,jsx_runtime.jsx)(index_module.vt,{as:"a",href:"#/"+prev.name,direction:"previous",children:prev.definition.title}),next&&(0,jsx_runtime.jsx)(index_module.vt,{as:"a",href:"#/"+next.name,direction:"next",children:next.definition.title}),!next&&(0,jsx_runtime.jsx)(index_module.vt,{as:"a",href:"/submit",direction:"next",children:"Review & Submit"})]})}Pagination.displayName="Pagination";try{Pagination.displayName="Pagination",Pagination.__docgenInfo={description:"",displayName:"Pagination",props:{current:{defaultValue:null,description:"",name:"current",required:!0,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/Pagination/Pagination.tsx#Pagination"]={docgenInfo:Pagination.__docgenInfo,name:"Pagination",path:"src/components/Pagination/Pagination.tsx#Pagination"})}catch(__react_docgen_typescript_loader_error){}function Content({name,withHeader,children}){const{page}=(0,usePageContext.l)();return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[withHeader&&(0,jsx_runtime.jsx)(PageHeader,{name,page,errors:{}}),children,(0,jsx_runtime.jsx)(Pagination,{current:name})]})}const DebugWrapper=styled_components_browser_esm.ZP.div`
  position: absolute;
  left: calc(100% - 30px);
  white-space: nowrap;
`;function Page(props){const{form}=(0,useRippleContext.C)(),{name}=props,page=form.pages[name];return page?(0,jsx_runtime.jsx)(usePageContext.z.Provider,{value:{name,page},children:(0,jsx_runtime.jsxs)(Conditional.h,{name,condition:page.condition,children:[(0,jsx_runtime.jsx)(Debug.c,{children:(0,jsx_runtime.jsx)(DebugWrapper,{children:(0,jsx_runtime.jsxs)(index_module.Af,{variant:"indicator",c:"green",children:["page.name: ",name]})})}),(0,jsx_runtime.jsx)(Content,{...props})]})}):(0,jsx_runtime.jsxs)(index_module.bZ,{variant:"error",title:"Page not found",children:["Page missing from form definition: ",name]})}Page.displayName="Page";try{Page.displayName="Page",Page.__docgenInfo={description:"A page provides context for all child fields and handles\nautomatic layout rendering if `autolayout` is specified.\n\nPages control routing for nested collection fields that\nare displayed as sub-pages.\n\nIncludes route paths:\n- `/`: The current page\n- `:fieldName/*`: A collection instance sub-page",displayName:"Page",props:{name:{defaultValue:null,description:"",name:"name",required:!0,type:{name:"string"}},withHeader:{defaultValue:null,description:"",name:"withHeader",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/Page/Page.tsx#Page"]={docgenInfo:Page.__docgenInfo,name:"Page",path:"src/components/Page/Page.tsx#Page"})}catch(__react_docgen_typescript_loader_error){}},"./src/mocks/simple.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{N:()=>SimpleForm});const SimpleForm={title:"Simple test form",version:"1.0",pages:{Main:{title:"Main page",description:"\n    This page contains a set of simple fields using common data types\n  ",fields:{textField1:{type:"Text",label:"Text field 1",required:"You must fill out text field 1"},textField2:{type:"Text",label:"Text field 2"},booleanField:{type:"Boolean",label:"Boolean field",required:"You must specify yes or no"},dateField:{type:"Date",label:"Date field"},keyField:{type:"Key",label:"Key field",required:"You must select either A, B, or C",choices:{a:"Choice A",b:"Choice B",c:"Choice C"}}}}}}}}]);
//# sourceMappingURL=components-AutolayoutPage-AutolayoutPage-stories.b37911b9.iframe.bundle.js.map