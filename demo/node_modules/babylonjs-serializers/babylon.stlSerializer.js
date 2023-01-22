(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("babylonjs"));
	else if(typeof define === 'function' && define.amd)
		define("babylonjs-serializers", ["babylonjs"], factory);
	else if(typeof exports === 'object')
		exports["babylonjs-serializers"] = factory(require("babylonjs"));
	else
		root["SERIALIZERS"] = factory(root["BABYLON"]);
})((typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : this), (__WEBPACK_EXTERNAL_MODULE_core_Maths_math_vector__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../../../lts/serializers/dist/legacy/legacy-stlSerializer.js":
/*!********************************************************************!*\
  !*** ../../../lts/serializers/dist/legacy/legacy-stlSerializer.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "STLExport": () => (/* reexport safe */ _stl_index__WEBPACK_IMPORTED_MODULE_0__.STLExport)
/* harmony export */ });
/* harmony import */ var _stl_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../stl/index */ "../../../lts/serializers/dist/stl/index.js");
/* eslint-disable import/no-internal-modules */

/**
 * This is the entry point for the UMD module.
 * The entry point for a future ESM package should be index.ts
 */
var globalObject = typeof __webpack_require__.g !== "undefined" ? __webpack_require__.g : typeof window !== "undefined" ? window : undefined;
if (typeof globalObject !== "undefined") {
    for (var serializer in _stl_index__WEBPACK_IMPORTED_MODULE_0__) {
        globalObject.BABYLON[serializer] = _stl_index__WEBPACK_IMPORTED_MODULE_0__[serializer];
    }
}



/***/ }),

/***/ "../../../lts/serializers/dist/stl/index.js":
/*!**************************************************!*\
  !*** ../../../lts/serializers/dist/stl/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "STLExport": () => (/* reexport safe */ _stlSerializer__WEBPACK_IMPORTED_MODULE_0__.STLExport)
/* harmony export */ });
/* harmony import */ var _stlSerializer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./stlSerializer */ "../../../lts/serializers/dist/stl/stlSerializer.js");



/***/ }),

/***/ "../../../lts/serializers/dist/stl/stlSerializer.js":
/*!**********************************************************!*\
  !*** ../../../lts/serializers/dist/stl/stlSerializer.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "STLExport": () => (/* binding */ STLExport)
/* harmony export */ });
/* harmony import */ var core_Meshes_mesh__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core/Maths/math.vector */ "core/Maths/math.vector");
/* harmony import */ var core_Meshes_mesh__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_Meshes_mesh__WEBPACK_IMPORTED_MODULE_0__);




/**
 * Class for generating STL data from a Babylon scene.
 */
var STLExport = /** @class */ (function () {
    function STLExport() {
    }
    /**
     * Exports the geometry of a Mesh array in .STL file format (ASCII)
     * @param meshes list defines the mesh to serialize
     * @param download triggers the automatic download of the file.
     * @param fileName changes the downloads fileName.
     * @param binary changes the STL to a binary type.
     * @param isLittleEndian toggle for binary type exporter.
     * @param doNotBakeTransform toggle if meshes transforms should be baked or not.
     * @param supportInstancedMeshes toggle to export instanced Meshes. Enabling support for instanced meshes will override doNoBakeTransform as true
     * @returns the STL as UTF8 string
     */
    STLExport.CreateSTL = function (meshes, download, fileName, binary, isLittleEndian, doNotBakeTransform, supportInstancedMeshes) {
        //Binary support adapted from https://gist.github.com/paulkaplan/6d5f0ab2c7e8fdc68a61
        if (download === void 0) { download = true; }
        if (fileName === void 0) { fileName = "stlmesh"; }
        if (binary === void 0) { binary = false; }
        if (isLittleEndian === void 0) { isLittleEndian = true; }
        if (doNotBakeTransform === void 0) { doNotBakeTransform = false; }
        if (supportInstancedMeshes === void 0) { supportInstancedMeshes = false; }
        var getFaceData = function (indices, vertices, i) {
            var id = [indices[i] * 3, indices[i + 1] * 3, indices[i + 2] * 3];
            var v = [
                new core_Meshes_mesh__WEBPACK_IMPORTED_MODULE_0__.Vector3(vertices[id[0]], vertices[id[0] + 2], vertices[id[0] + 1]),
                new core_Meshes_mesh__WEBPACK_IMPORTED_MODULE_0__.Vector3(vertices[id[1]], vertices[id[1] + 2], vertices[id[1] + 1]),
                new core_Meshes_mesh__WEBPACK_IMPORTED_MODULE_0__.Vector3(vertices[id[2]], vertices[id[2] + 2], vertices[id[2] + 1]),
            ];
            var p1p2 = v[0].subtract(v[1]);
            var p3p2 = v[2].subtract(v[1]);
            var n = core_Meshes_mesh__WEBPACK_IMPORTED_MODULE_0__.Vector3.Cross(p3p2, p1p2).normalize();
            return { v: v, n: n };
        };
        var writeVector = function (dataview, offset, vector, isLittleEndian) {
            offset = writeFloat(dataview, offset, vector.x, isLittleEndian);
            offset = writeFloat(dataview, offset, vector.y, isLittleEndian);
            return writeFloat(dataview, offset, vector.z, isLittleEndian);
        };
        var writeFloat = function (dataview, offset, value, isLittleEndian) {
            dataview.setFloat32(offset, value, isLittleEndian);
            return offset + 4;
        };
        var getVerticesData = function (mesh) {
            if (supportInstancedMeshes) {
                var sourceMesh = mesh;
                if (mesh instanceof core_Meshes_mesh__WEBPACK_IMPORTED_MODULE_0__.InstancedMesh) {
                    sourceMesh = mesh.sourceMesh;
                }
                var data_1 = sourceMesh.getVerticesData(core_Meshes_mesh__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.PositionKind, true, true);
                if (!data_1)
                    return [];
                var temp = core_Meshes_mesh__WEBPACK_IMPORTED_MODULE_0__.Vector3.Zero();
                var index = void 0;
                for (index = 0; index < data_1.length; index += 3) {
                    core_Meshes_mesh__WEBPACK_IMPORTED_MODULE_0__.Vector3.TransformCoordinatesFromFloatsToRef(data_1[index], data_1[index + 1], data_1[index + 2], mesh.computeWorldMatrix(true), temp).toArray(data_1, index);
                }
                return data_1;
            }
            else {
                return mesh.getVerticesData(core_Meshes_mesh__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.PositionKind) || [];
            }
        };
        if (supportInstancedMeshes) {
            doNotBakeTransform = true;
        }
        var data;
        var faceCount = 0;
        var offset = 0;
        if (binary) {
            for (var i = 0; i < meshes.length; i++) {
                var mesh = meshes[i];
                var indices = mesh.getIndices();
                faceCount += indices ? indices.length / 3 : 0;
            }
            var bufferSize = 84 + 50 * faceCount;
            var buffer = new ArrayBuffer(bufferSize);
            data = new DataView(buffer);
            offset += 80;
            data.setUint32(offset, faceCount, isLittleEndian);
            offset += 4;
        }
        else {
            data = "solid stlmesh\r\n";
        }
        for (var i = 0; i < meshes.length; i++) {
            var mesh = meshes[i];
            if (!doNotBakeTransform && mesh instanceof core_Meshes_mesh__WEBPACK_IMPORTED_MODULE_0__.Mesh) {
                mesh.bakeCurrentTransformIntoVertices();
            }
            var vertices = getVerticesData(mesh);
            var indices = mesh.getIndices() || [];
            for (var i_1 = 0; i_1 < indices.length; i_1 += 3) {
                var fd = getFaceData(indices, vertices, i_1);
                if (binary) {
                    offset = writeVector(data, offset, fd.n, isLittleEndian);
                    offset = writeVector(data, offset, fd.v[0], isLittleEndian);
                    offset = writeVector(data, offset, fd.v[1], isLittleEndian);
                    offset = writeVector(data, offset, fd.v[2], isLittleEndian);
                    offset += 2;
                }
                else {
                    data += "facet normal " + fd.n.x + " " + fd.n.y + " " + fd.n.z + "\r\n";
                    data += "\touter loop\r\n";
                    data += "\t\tvertex " + fd.v[0].x + " " + fd.v[0].y + " " + fd.v[0].z + "\r\n";
                    data += "\t\tvertex " + fd.v[1].x + " " + fd.v[1].y + " " + fd.v[1].z + "\r\n";
                    data += "\t\tvertex " + fd.v[2].x + " " + fd.v[2].y + " " + fd.v[2].z + "\r\n";
                    data += "\tendloop\r\n";
                    data += "endfacet\r\n";
                }
            }
        }
        if (!binary) {
            data += "endsolid stlmesh";
        }
        if (download) {
            var a = document.createElement("a");
            var blob = new Blob([data], { type: "application/octet-stream" });
            a.href = window.URL.createObjectURL(blob);
            a.download = fileName + ".stl";
            a.click();
        }
        return data;
    };
    return STLExport;
}());



/***/ }),

/***/ "core/Maths/math.vector":
/*!****************************************************************************************************!*\
  !*** external {"root":"BABYLON","commonjs":"babylonjs","commonjs2":"babylonjs","amd":"babylonjs"} ***!
  \****************************************************************************************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE_core_Maths_math_vector__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./src/stl.ts ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "serializers": () => (/* reexport module object */ serializers_legacy_legacy_stlSerializer__WEBPACK_IMPORTED_MODULE_0__)
/* harmony export */ });
/* harmony import */ var serializers_legacy_legacy_stlSerializer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! serializers/legacy/legacy-stlSerializer */ "../../../lts/serializers/dist/legacy/legacy-stlSerializer.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (serializers_legacy_legacy_stlSerializer__WEBPACK_IMPORTED_MODULE_0__);

})();

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=babylon.stlSerializer.js.map