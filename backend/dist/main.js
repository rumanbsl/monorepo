;require('/Users/ruman/Documents/dev/express-test/node_modules/source-map-support/source-map-support.js').install();
/******/ (function(modules) { // webpackBootstrap
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var chunk = require("./" + "" + chunkId + "." + hotCurrentHash + ".hot-update.js");
/******/ 		hotAddUpdateChunk(chunk.id, chunk.modules);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest() {
/******/ 		try {
/******/ 			var update = require("./" + "" + hotCurrentHash + ".hot-update.json");
/******/ 		} catch (e) {
/******/ 			return Promise.resolve();
/******/ 		}
/******/ 		return Promise.resolve(update);
/******/ 	}
/******/
/******/ 	//eslint-disable-next-line no-unused-vars
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "76bec3e83a922ce971f8";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "main";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/node-hot-loader/HmrClient.js":
/*!***************************************************!*\
  !*** ./node_modules/node-hot-loader/HmrClient.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.HmrClient = void 0;

var _LogColors = _interopRequireDefault(__webpack_require__(/*! ./LogColors */ "./node_modules/node-hot-loader/LogColors.js"));

var _Logger = _interopRequireDefault(__webpack_require__(/*! ./Logger */ "./node_modules/node-hot-loader/Logger.js"));

var _LogLevel = __webpack_require__(/*! ./LogLevel */ "./node_modules/node-hot-loader/LogLevel.js");

var _messageActionType = _interopRequireDefault(__webpack_require__(/*! ./messageActionType */ "./node_modules/node-hot-loader/messageActionType.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class HmrClient {
  constructor() {
    _defineProperty(this, "logger", new _Logger.default(_LogColors.default.cyan('[HMR]')));

    _defineProperty(this, "lastHash", '');

    _defineProperty(this, "logApplyResult", (logLevel, outdatedModules, renewedModules) => {
      const unacceptedModules = !renewedModules || !renewedModules.length ? outdatedModules : outdatedModules.filter(moduleId => renewedModules.indexOf(moduleId) < 0);

      if (unacceptedModules.length > 0 && logLevel >= _LogLevel.LogLevel.ERRORS) {
        this.logger.warn("The following modules couldn't be hot updated: (They would need to restart the application!)");
        unacceptedModules.forEach(moduleId => {
          this.logger.warn(` - ${moduleId}`);
        });
      }

      if (!renewedModules || !renewedModules.length) {
        if (logLevel >= _LogLevel.LogLevel.MINIMAL) {
          this.logger.info('Nothing hot updated.');
        }

        return;
      }

      if (logLevel >= _LogLevel.LogLevel.NORMAL) {
        this.logger.info('Updated modules:');
        renewedModules.forEach(moduleId => {
          this.logger.info(` - ${moduleId}`);
        });
        const numberIds = renewedModules.every(moduleId => typeof moduleId === 'number');

        if (numberIds) {
          this.logger.info('Consider using the NamedModulesPlugin for module names.');
        }
      }

      if (this.isUpToDate()) {
        this.logUpToDate(logLevel);
      }
    });

    _defineProperty(this, "logUpToDate", logLevel => {
      if (logLevel >= _LogLevel.LogLevel.MINIMAL) {
        this.logger.info('App is up to date.');
      }
    });

    _defineProperty(this, "defaultMessageListener", ({
      action,
      stats,
      logLevel
    }) => {
      // webpackHotUpdate
      if (action !== _messageActionType.default.CompilerDone) {
        return;
      }

      this.lastHash = stats.hash;

      if (!this.isUpToDate()) {
        const status = module.hot.status();

        if (status === 'idle') {
          if (logLevel >= _LogLevel.LogLevel.MINIMAL) {
            this.logger.info('Checking for updates...');
          }

          this.checkAndApplyUpdates(logLevel);
        } else if (['abort', 'fail'].indexOf(status) >= 0 && logLevel >= _LogLevel.LogLevel.ERRORS) {
          this.logger.warn(`Cannot apply update as a previous update ${status}ed. You need to restart the application!`);
        }
      } else {
        this.logUpToDate(logLevel);
      }
    });

    _defineProperty(this, "isUpToDate", () => this.lastHash.indexOf(__webpack_require__.h()) >= 0);

    _defineProperty(this, "checkAndApplyUpdates", logLevel => {
      module.hot.check().then(outdatedModules => {
        if (!outdatedModules) {
          if (logLevel >= _LogLevel.LogLevel.ERRORS) {
            this.logger.warn('Cannot find update. You need to restart the application!');
          }

          return Promise.resolve();
        }

        return module.hot.apply({
          ignoreUnaccepted: true,
          ignoreDeclined: true,
          ignoreErrored: true,
          // true - allows to restore state after errors.
          onUnaccepted: info => {
            if (logLevel >= _LogLevel.LogLevel.ERRORS) {
              this.logger.warn(`Ignored an update to unaccepted module ${info.chain.join(' -> ')}`);
            }
          },
          onDeclined: info => {
            if (logLevel >= _LogLevel.LogLevel.ERRORS) {
              this.logger.warn(`Ignored an update to declined module ${info.chain.join(' -> ')}`);
            }
          },
          onErrored: info => {
            if (logLevel >= _LogLevel.LogLevel.ERRORS) {
              this.logger.warn(`Ignored an error while updating module ${info.moduleId} (${info.type})`); // If ignoreErrored is true and throw info.error then module.hot.status() always
              // equals 'apply' and module.hot.check() will not work.

              this.logger.error(info.error);
            }
          }
        }).then(renewedModules => {
          if (!this.isUpToDate()) {
            this.checkAndApplyUpdates(logLevel);
          }

          this.logApplyResult(logLevel, outdatedModules, renewedModules);
        });
      }).catch(err => {
        if (logLevel >= _LogLevel.LogLevel.ERRORS) {
          if (['abort', 'fail'].indexOf(module.hot.status()) >= 0) {
            this.logger.error('Cannot check for update. You need to restart the application!');
            this.logger.error(err.stack || err.message);
          } else {
            this.logger.error(`Update check failed: ${err.stack}` || err.message);
          }
        }
      });
    });
  }

  run(messageListener = this.defaultMessageListener) {
    if (false) {}

    this.logger.info('Waiting for update signal from webpack...');
    process.on('message', messageListener);
    return this;
  }

}

exports.HmrClient = HmrClient;

var _default = new HmrClient().run();

exports.default = _default;

/***/ }),

/***/ "./node_modules/node-hot-loader/LogColors.js":
/*!***************************************************!*\
  !*** ./node_modules/node-hot-loader/LogColors.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class LogColors {} // Make functions from LogColors.defaultColors which apply string and surround it with color definition.


exports.default = LogColors;

_defineProperty(LogColors, "defaultColors", {
  bold: '\u001b[1m',
  yellow: '\u001b[1m\u001b[33m',
  red: '\u001b[1m\u001b[31m',
  green: '\u001b[1m\u001b[32m',
  cyan: '\u001b[1m\u001b[36m',
  magenta: '\u001b[1m\u001b[35m'
});

Object.keys(LogColors.defaultColors).forEach(color => {
  LogColors[color] = str => `${LogColors.defaultColors[color]}${str}\u001b[39m\u001b[22m`;
});

/***/ }),

/***/ "./node_modules/node-hot-loader/LogLevel.js":
/*!**************************************************!*\
  !*** ./node_modules/node-hot-loader/LogLevel.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseLogLevel = parseLogLevel;
exports.LogLevel = void 0;
// https://webpack.js.org/configuration/stats/#stats
const LogLevel = {
  NONE: 0,
  // none
  ERRORS: 1,
  // errors-only
  MINIMAL: 2,
  // minimal
  NORMAL: 3 // normal

};
exports.LogLevel = LogLevel;

function parseLogLevel(stats) {
  let level = LogLevel.NORMAL;
  level = stats === false ? LogLevel.NONE : level;
  level = stats === 'none' ? LogLevel.NONE : level;
  level = stats === 'errors-only' ? LogLevel.ERRORS : level;
  level = stats === 'minimal' ? LogLevel.MINIMAL : level;
  return level;
}

/***/ }),

/***/ "./node_modules/node-hot-loader/Logger.js":
/*!************************************************!*\
  !*** ./node_modules/node-hot-loader/Logger.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _LogColors = _interopRequireDefault(__webpack_require__(/*! ./LogColors */ "./node_modules/node-hot-loader/LogColors.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Logger {
  constructor(prefix) {
    _defineProperty(this, "prefix", void 0);

    this.prefix = prefix;
  }

  info(message, ...optionalParams) {
    console.log(this.prefix, message, ...optionalParams);
  }

  warn(message, ...optionalParams) {
    console.warn(this.prefix, _LogColors.default.yellow(message), ...optionalParams);
  }

  error(message, ...optionalParams) {
    const string = message.stack || message;
    console.error(this.prefix, _LogColors.default.red(string), ...optionalParams);
  }

}

exports.default = Logger;

/***/ }),

/***/ "./node_modules/node-hot-loader/messageActionType.js":
/*!***********************************************************!*\
  !*** ./node_modules/node-hot-loader/messageActionType.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const messageActionType = {
  CompilerStart: 'CompilerStart',
  CompilerDone: 'CompilerDone'
};
var _default = messageActionType;
exports.default = _default;

/***/ }),

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./routes */ "./src/routes/index.ts");


/**
 * @description Express Class
 * @export
 * @class App
 */
class App {
    /**
     *Creates an instance of App.
     * @param {Application} app
     * @memberof App
     */
    constructor() {
        this.app = express__WEBPACK_IMPORTED_MODULE_0___default()();
        this.addMiddleWares();
    }
    /**
     * @description
     * @memberof App
     */
    addMiddleWares() {
        this.app = Object(_routes__WEBPACK_IMPORTED_MODULE_1__["default"])(this.app);
    }
}
/* harmony default export */ __webpack_exports__["default"] = (() => { const { app } = new App(); return app; });


/***/ }),

/***/ "./src/graphql-api/resolvers/Mutation.ts":
/*!***********************************************!*\
  !*** ./src/graphql-api/resolvers/Mutation.ts ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
    signUpUser: async (_, { userInput }, { User }) => {
        const { userName, email, password } = userInput;
        const user = await User.findOne({ $or: [{ userName }, { email }] });
        if (user)
            throw new Error("User Already Exists");
        return new User({ userName, email, password }).save();
    },
    addPost: async (_, { postInput }, { Post, User }) => {
        const userExists = await User.findById(postInput.createdBy);
        if (!userExists)
            throw Error("User does not exists");
        const post = await new Post(postInput).save();
        return post;
    },
});


/***/ }),

/***/ "./src/graphql-api/resolvers/Query.ts":
/*!********************************************!*\
  !*** ./src/graphql-api/resolvers/Query.ts ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
    getPosts: async (_, __, { Post }) => {
        console.log("MOI");
        const posts = await Post.find()
            .sort({ createdDate: 1 })
            .populate({
            path: "createdBy",
            model: "User",
        });
        return posts;
    },
});


/***/ }),

/***/ "./src/graphql-api/resolvers/index.ts":
/*!********************************************!*\
  !*** ./src/graphql-api/resolvers/index.ts ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Query__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Query */ "./src/graphql-api/resolvers/Query.ts");
/* harmony import */ var _Mutation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Mutation */ "./src/graphql-api/resolvers/Mutation.ts");


/* harmony default export */ __webpack_exports__["default"] = ({
    Query: _Query__WEBPACK_IMPORTED_MODULE_0__["default"],
    Mutation: _Mutation__WEBPACK_IMPORTED_MODULE_1__["default"],
});


/***/ }),

/***/ "./src/graphql-api/typeDefs/Message.graphql":
/*!**************************************************!*\
  !*** ./src/graphql-api/typeDefs/Message.graphql ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {


    var doc = {"kind":"Document","definitions":[{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Message"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"_id"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"messageBody"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"messageDate"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"messageUser"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"User"}}},"directives":[]}]}],"loc":{"start":0,"end":92}};
    doc.loc.source = {"body":"type Message {\n  _id: ID\n  messageBody: String!\n  messageDate: String\n  messageUser: User!\n}","name":"GraphQL request","locationOffset":{"line":1,"column":1}};
  

    var names = {};
    function unique(defs) {
      return defs.filter(
        function(def) {
          if (def.kind !== 'FragmentDefinition') return true;
          var name = def.name.value
          if (names[name]) {
            return false;
          } else {
            names[name] = true;
            return true;
          }
        }
      )
    }
  

      module.exports = doc;
    


/***/ }),

/***/ "./src/graphql-api/typeDefs/Post.graphql":
/*!***********************************************!*\
  !*** ./src/graphql-api/typeDefs/Post.graphql ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {


    var doc = {"kind":"Document","definitions":[{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Post"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"id"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"title"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"imageUrl"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"catagories"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"description"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"createdDate"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"likes"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"createdBy"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"User"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"messages"},"arguments":[],"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Message"}}},"directives":[]}]}],"loc":{"start":0,"end":185}};
    doc.loc.source = {"body":"type Post {\n  id: ID\n  title: String!\n  imageUrl: String!\n  catagories: [String!]!\n  description: String!\n  createdDate: String\n  likes: Int!\n  createdBy: User!\n  messages: [Message]\n}\n","name":"GraphQL request","locationOffset":{"line":1,"column":1}};
  

    var names = {};
    function unique(defs) {
      return defs.filter(
        function(def) {
          if (def.kind !== 'FragmentDefinition') return true;
          var name = def.name.value
          if (names[name]) {
            return false;
          } else {
            names[name] = true;
            return true;
          }
        }
      )
    }
  

      module.exports = doc;
    


/***/ }),

/***/ "./src/graphql-api/typeDefs/User.graphql":
/*!***********************************************!*\
  !*** ./src/graphql-api/typeDefs/User.graphql ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {


    var doc = {"kind":"Document","definitions":[{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"User"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"id"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"userName"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"email"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"password"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"avatar"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"joinDate"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"favourites"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Post"}}}},"directives":[]}]}],"loc":{"start":0,"end":138}};
    doc.loc.source = {"body":"type User {\n  id: ID\n  userName: String!\n  email: String!\n  password: String!\n  avatar: String\n  joinDate: String\n  favourites: [Post]!\n}\n","name":"GraphQL request","locationOffset":{"line":1,"column":1}};
  

    var names = {};
    function unique(defs) {
      return defs.filter(
        function(def) {
          if (def.kind !== 'FragmentDefinition') return true;
          var name = def.name.value
          if (names[name]) {
            return false;
          } else {
            names[name] = true;
            return true;
          }
        }
      )
    }
  

      module.exports = doc;
    


/***/ }),

/***/ "./src/graphql-api/typeDefs/index.ts":
/*!*******************************************!*\
  !*** ./src/graphql-api/typeDefs/index.ts ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Message_graphql__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Message.graphql */ "./src/graphql-api/typeDefs/Message.graphql");
/* harmony import */ var _Message_graphql__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Message_graphql__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Post_graphql__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Post.graphql */ "./src/graphql-api/typeDefs/Post.graphql");
/* harmony import */ var _Post_graphql__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Post_graphql__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _root_graphql__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./root.graphql */ "./src/graphql-api/typeDefs/root.graphql");
/* harmony import */ var _root_graphql__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_root_graphql__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _User_graphql__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./User.graphql */ "./src/graphql-api/typeDefs/User.graphql");
/* harmony import */ var _User_graphql__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_User_graphql__WEBPACK_IMPORTED_MODULE_3__);




/* harmony default export */ __webpack_exports__["default"] = ([_root_graphql__WEBPACK_IMPORTED_MODULE_2___default.a, _User_graphql__WEBPACK_IMPORTED_MODULE_3___default.a, _Post_graphql__WEBPACK_IMPORTED_MODULE_1___default.a, _Message_graphql__WEBPACK_IMPORTED_MODULE_0___default.a]);


/***/ }),

/***/ "./src/graphql-api/typeDefs/root.graphql":
/*!***********************************************!*\
  !*** ./src/graphql-api/typeDefs/root.graphql ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {


    var doc = {"kind":"Document","definitions":[{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Query"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"getPosts"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Post"}}}},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Mutation"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"signUpUser"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"userInput"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"userInput"}},"directives":[]}],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"User"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"addPost"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"postInput"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"postInput"}},"directives":[]}],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Post"}}},"directives":[]}]},{"kind":"InputObjectTypeDefinition","name":{"kind":"Name","value":"userInput"},"directives":[],"fields":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"userName"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"email"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"password"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]}]},{"kind":"InputObjectTypeDefinition","name":{"kind":"Name","value":"postInput"},"directives":[],"fields":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"title"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"imageUrl"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"catagories"},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"description"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"createdBy"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]}]}],"loc":{"start":0,"end":332}};
    doc.loc.source = {"body":"type Query {\n  getPosts: [Post]!\n}\n\ntype Mutation {\n  signUpUser(userInput: userInput): User!\n  addPost(postInput: postInput): Post!\n}\n\ninput userInput {\n  userName: String!\n  email: String!\n  password: ID!\n}\n\ninput postInput {\n  title: String!\n  imageUrl: String!\n  catagories: [String!]!\n  description: String!\n  createdBy: ID!\n}\n","name":"GraphQL request","locationOffset":{"line":1,"column":1}};
  

    var names = {};
    function unique(defs) {
      return defs.filter(
        function(def) {
          if (def.kind !== 'FragmentDefinition') return true;
          var name = def.name.value
          if (names[name]) {
            return false;
          } else {
            names[name] = true;
            return true;
          }
        }
      )
    }
  

      module.exports = doc;
    


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! http */ "http");
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(http__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var chalk_console__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! chalk-console */ "chalk-console");
/* harmony import */ var chalk_console__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(chalk_console__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var apollo_server_express__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! apollo-server-express */ "apollo-server-express");
/* harmony import */ var apollo_server_express__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(apollo_server_express__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app */ "./src/app.ts");
/* harmony import */ var _src_graphql_api_resolvers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/src/graphql-api/resolvers */ "./src/graphql-api/resolvers/index.ts");
/* harmony import */ var _src_graphql_api_typeDefs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/src/graphql-api/typeDefs */ "./src/graphql-api/typeDefs/index.ts");
/* eslint-disable @typescript-eslint/no-explicit-any */






try {
    const PORT = process.env.PORT || 3000;
    const configureHttpServer = (httpServer) => {
        chalk_console__WEBPACK_IMPORTED_MODULE_1___default.a.info("Creating Express app");
        const app = Object(_app__WEBPACK_IMPORTED_MODULE_3__["default"])();
        chalk_console__WEBPACK_IMPORTED_MODULE_1___default.a.info("Creating Apollo server");
        const apolloServer = new apollo_server_express__WEBPACK_IMPORTED_MODULE_2__["ApolloServer"]({
            typeDefs: _src_graphql_api_typeDefs__WEBPACK_IMPORTED_MODULE_5__["default"],
            resolvers: _src_graphql_api_resolvers__WEBPACK_IMPORTED_MODULE_4__["default"],
        });
        apolloServer.applyMiddleware({ app });
        chalk_console__WEBPACK_IMPORTED_MODULE_1___default.a.info("Express app created with Apollo middleware");
        httpServer.on("request", app);
        apolloServer.installSubscriptionHandlers(httpServer);
    };
    if (!process.httpServer) {
        chalk_console__WEBPACK_IMPORTED_MODULE_1___default.a.info("Creating HTTP server");
        process.httpServer = http__WEBPACK_IMPORTED_MODULE_0___default.a.createServer();
        configureHttpServer(process.httpServer);
        process.httpServer.listen(PORT, () => {
            chalk_console__WEBPACK_IMPORTED_MODULE_1___default.a.info(`HTTP server ready at http://localhost:${PORT}`);
            chalk_console__WEBPACK_IMPORTED_MODULE_1___default.a.info(`Websocket server ready at ws://localhost:${PORT}`);
        });
    }
    else {
        chalk_console__WEBPACK_IMPORTED_MODULE_1___default.a.info("Reloading HTTP server");
        process.httpServer.removeAllListeners("upgrade");
        process.httpServer.removeAllListeners("request");
        configureHttpServer(process.httpServer);
        chalk_console__WEBPACK_IMPORTED_MODULE_1___default.a.info("HTTP server reloaded");
    }
}
catch (error) {
    chalk_console__WEBPACK_IMPORTED_MODULE_1___default.a.error(error);
}
if (true) {
    chalk_console__WEBPACK_IMPORTED_MODULE_1___default.a.info("HOT SWAPPING");
    module.hot.accept();
}


/***/ }),

/***/ "./src/routes/api.ts":
/*!***************************!*\
  !*** ./src/routes/api.ts ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
// ROUTE: "/api"

const apiRouter = express__WEBPACK_IMPORTED_MODULE_0___default.a.Router();
const restRouter = express__WEBPACK_IMPORTED_MODULE_0___default.a.Router();
restRouter.route("/rest").get((_, res) => res.json({ route: "/api/rest" }));
apiRouter.route("/").get((_, res) => res.json({ route: "/apiss" }));
apiRouter.use("/", restRouter);
/* harmony default export */ __webpack_exports__["default"] = (apiRouter);


/***/ }),

/***/ "./src/routes/index.ts":
/*!*****************************!*\
  !*** ./src/routes/index.ts ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api */ "./src/routes/api.ts");

/* harmony default export */ __webpack_exports__["default"] = ((app) => {
    app.use("/api", _api__WEBPACK_IMPORTED_MODULE_0__["default"]);
    // put all the routes above this line.
    // generic router in the end. Because Order matters
    app.get("/", (_, res) => res.json({ ok: "ok" }));
    app.get("*", (_, res) => res.redirect("/"));
    return app;
});


/***/ }),

/***/ 0:
/*!********************************************************************!*\
  !*** multi ./node_modules/node-hot-loader/HmrClient.js ./src/main ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /Users/ruman/Documents/dev/express-test/node_modules/node-hot-loader/HmrClient.js */"./node_modules/node-hot-loader/HmrClient.js");
module.exports = __webpack_require__(/*! /Users/ruman/Documents/dev/express-test/src/main */"./src/main.ts");


/***/ }),

/***/ "apollo-server-express":
/*!****************************************!*\
  !*** external "apollo-server-express" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("apollo-server-express");

/***/ }),

/***/ "chalk-console":
/*!********************************!*\
  !*** external "chalk-console" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("chalk-console");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ })

/******/ });
//# sourceMappingURL=main.js.map