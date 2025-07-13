/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/summarize-text/route";
exports.ids = ["app/api/summarize-text/route"];
exports.modules = {

/***/ "(rsc)/./app/api/summarize-text/route.ts":
/*!*****************************************!*\
  !*** ./app/api/summarize-text/route.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n\nasync function GET() {\n    try {\n        // Forward the request to Flask backend\n        const response = await fetch('http://localhost:5000/summarize-text', {\n            method: 'GET',\n            headers: {\n                'Content-Type': 'application/json'\n            }\n        });\n        // Get response body as JSON\n        const data = await response.json();\n        // If Flask returned an error code, handle it\n        if (!response.ok) {\n            console.error('Backend error:', data);\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: data.error || 'Failed to summarize text'\n            }, {\n                status: response.status\n            });\n        }\n        // Return the successful response\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(data);\n    } catch (error) {\n        console.error('Error connecting to backend:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'Failed to connect to summarization service'\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3N1bW1hcml6ZS10ZXh0L3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQTJDO0FBRXBDLGVBQWVDO0lBQ3BCLElBQUk7UUFDRix1Q0FBdUM7UUFDdkMsTUFBTUMsV0FBVyxNQUFNQyxNQUFNLHdDQUF3QztZQUNuRUMsUUFBUTtZQUNSQyxTQUFTO2dCQUNQLGdCQUFnQjtZQUNsQjtRQUNGO1FBRUEsNEJBQTRCO1FBQzVCLE1BQU1DLE9BQU8sTUFBTUosU0FBU0ssSUFBSTtRQUVoQyw2Q0FBNkM7UUFDN0MsSUFBSSxDQUFDTCxTQUFTTSxFQUFFLEVBQUU7WUFDaEJDLFFBQVFDLEtBQUssQ0FBQyxrQkFBa0JKO1lBQ2hDLE9BQU9OLHFEQUFZQSxDQUFDTyxJQUFJLENBQ3RCO2dCQUFFRyxPQUFPSixLQUFLSSxLQUFLLElBQUk7WUFBMkIsR0FDbEQ7Z0JBQUVDLFFBQVFULFNBQVNTLE1BQU07WUFBQztRQUU5QjtRQUVBLGlDQUFpQztRQUNqQyxPQUFPWCxxREFBWUEsQ0FBQ08sSUFBSSxDQUFDRDtJQUMzQixFQUFFLE9BQU9JLE9BQU87UUFDZEQsUUFBUUMsS0FBSyxDQUFDLGdDQUFnQ0E7UUFDOUMsT0FBT1YscURBQVlBLENBQUNPLElBQUksQ0FDdEI7WUFBRUcsT0FBTztRQUE2QyxHQUN0RDtZQUFFQyxRQUFRO1FBQUk7SUFFbEI7QUFDRiIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxhdmluYVxcRGVza3RvcFxcTWFpblxcY09PbnRlbnRcXENsaWVudFByb2plY3RzXFxTaHViaGFJc0NoZXd0aXlhXFxJbnZpc2lvbkVkXFxpbnZpc2lvbi1lZC1pbnRlcmZhY2VcXGFwcFxcYXBpXFxzdW1tYXJpemUtdGV4dFxccm91dGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSAnbmV4dC9zZXJ2ZXInO1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEdFVCgpIHtcclxuICB0cnkge1xyXG4gICAgLy8gRm9yd2FyZCB0aGUgcmVxdWVzdCB0byBGbGFzayBiYWNrZW5kXHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCdodHRwOi8vbG9jYWxob3N0OjUwMDAvc3VtbWFyaXplLXRleHQnLCB7XHJcbiAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcbiAgICBcclxuICAgIC8vIEdldCByZXNwb25zZSBib2R5IGFzIEpTT05cclxuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICBcclxuICAgIC8vIElmIEZsYXNrIHJldHVybmVkIGFuIGVycm9yIGNvZGUsIGhhbmRsZSBpdFxyXG4gICAgaWYgKCFyZXNwb25zZS5vaykge1xyXG4gICAgICBjb25zb2xlLmVycm9yKCdCYWNrZW5kIGVycm9yOicsIGRhdGEpO1xyXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXHJcbiAgICAgICAgeyBlcnJvcjogZGF0YS5lcnJvciB8fCAnRmFpbGVkIHRvIHN1bW1hcml6ZSB0ZXh0JyB9LFxyXG4gICAgICAgIHsgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMgfVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvLyBSZXR1cm4gdGhlIHN1Y2Nlc3NmdWwgcmVzcG9uc2VcclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihkYXRhKTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS5lcnJvcignRXJyb3IgY29ubmVjdGluZyB0byBiYWNrZW5kOicsIGVycm9yKTtcclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcclxuICAgICAgeyBlcnJvcjogJ0ZhaWxlZCB0byBjb25uZWN0IHRvIHN1bW1hcml6YXRpb24gc2VydmljZScgfSxcclxuICAgICAgeyBzdGF0dXM6IDUwMCB9XHJcbiAgICApO1xyXG4gIH1cclxufSJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJHRVQiLCJyZXNwb25zZSIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsImRhdGEiLCJqc29uIiwib2siLCJjb25zb2xlIiwiZXJyb3IiLCJzdGF0dXMiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/summarize-text/route.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fsummarize-text%2Froute&page=%2Fapi%2Fsummarize-text%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fsummarize-text%2Froute.ts&appDir=C%3A%5CUsers%5Cavina%5CDesktop%5CMain%5CcOOntent%5CClientProjects%5CShubhaIsChewtiya%5CInvisionEd%5Cinvision-ed-interface%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cavina%5CDesktop%5CMain%5CcOOntent%5CClientProjects%5CShubhaIsChewtiya%5CInvisionEd%5Cinvision-ed-interface&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fsummarize-text%2Froute&page=%2Fapi%2Fsummarize-text%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fsummarize-text%2Froute.ts&appDir=C%3A%5CUsers%5Cavina%5CDesktop%5CMain%5CcOOntent%5CClientProjects%5CShubhaIsChewtiya%5CInvisionEd%5Cinvision-ed-interface%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cavina%5CDesktop%5CMain%5CcOOntent%5CClientProjects%5CShubhaIsChewtiya%5CInvisionEd%5Cinvision-ed-interface&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_avina_Desktop_Main_cOOntent_ClientProjects_ShubhaIsChewtiya_InvisionEd_invision_ed_interface_app_api_summarize_text_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/summarize-text/route.ts */ \"(rsc)/./app/api/summarize-text/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/summarize-text/route\",\n        pathname: \"/api/summarize-text\",\n        filename: \"route\",\n        bundlePath: \"app/api/summarize-text/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\avina\\\\Desktop\\\\Main\\\\cOOntent\\\\ClientProjects\\\\ShubhaIsChewtiya\\\\InvisionEd\\\\invision-ed-interface\\\\app\\\\api\\\\summarize-text\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_avina_Desktop_Main_cOOntent_ClientProjects_ShubhaIsChewtiya_InvisionEd_invision_ed_interface_app_api_summarize_text_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZzdW1tYXJpemUtdGV4dCUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGc3VtbWFyaXplLXRleHQlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZzdW1tYXJpemUtdGV4dCUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNhdmluYSU1Q0Rlc2t0b3AlNUNNYWluJTVDY09PbnRlbnQlNUNDbGllbnRQcm9qZWN0cyU1Q1NodWJoYUlzQ2hld3RpeWElNUNJbnZpc2lvbkVkJTVDaW52aXNpb24tZWQtaW50ZXJmYWNlJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1DJTNBJTVDVXNlcnMlNUNhdmluYSU1Q0Rlc2t0b3AlNUNNYWluJTVDY09PbnRlbnQlNUNDbGllbnRQcm9qZWN0cyU1Q1NodWJoYUlzQ2hld3RpeWElNUNJbnZpc2lvbkVkJTVDaW52aXNpb24tZWQtaW50ZXJmYWNlJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUNrRztBQUMvSztBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcVXNlcnNcXFxcYXZpbmFcXFxcRGVza3RvcFxcXFxNYWluXFxcXGNPT250ZW50XFxcXENsaWVudFByb2plY3RzXFxcXFNodWJoYUlzQ2hld3RpeWFcXFxcSW52aXNpb25FZFxcXFxpbnZpc2lvbi1lZC1pbnRlcmZhY2VcXFxcYXBwXFxcXGFwaVxcXFxzdW1tYXJpemUtdGV4dFxcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvc3VtbWFyaXplLXRleHQvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9zdW1tYXJpemUtdGV4dFwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvc3VtbWFyaXplLXRleHQvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFxVc2Vyc1xcXFxhdmluYVxcXFxEZXNrdG9wXFxcXE1haW5cXFxcY09PbnRlbnRcXFxcQ2xpZW50UHJvamVjdHNcXFxcU2h1YmhhSXNDaGV3dGl5YVxcXFxJbnZpc2lvbkVkXFxcXGludmlzaW9uLWVkLWludGVyZmFjZVxcXFxhcHBcXFxcYXBpXFxcXHN1bW1hcml6ZS10ZXh0XFxcXHJvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fsummarize-text%2Froute&page=%2Fapi%2Fsummarize-text%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fsummarize-text%2Froute.ts&appDir=C%3A%5CUsers%5Cavina%5CDesktop%5CMain%5CcOOntent%5CClientProjects%5CShubhaIsChewtiya%5CInvisionEd%5Cinvision-ed-interface%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cavina%5CDesktop%5CMain%5CcOOntent%5CClientProjects%5CShubhaIsChewtiya%5CInvisionEd%5Cinvision-ed-interface&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fsummarize-text%2Froute&page=%2Fapi%2Fsummarize-text%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fsummarize-text%2Froute.ts&appDir=C%3A%5CUsers%5Cavina%5CDesktop%5CMain%5CcOOntent%5CClientProjects%5CShubhaIsChewtiya%5CInvisionEd%5Cinvision-ed-interface%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cavina%5CDesktop%5CMain%5CcOOntent%5CClientProjects%5CShubhaIsChewtiya%5CInvisionEd%5Cinvision-ed-interface&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();