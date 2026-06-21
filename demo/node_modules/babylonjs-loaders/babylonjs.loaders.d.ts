
declare module BABYLON {


    /**
     * Registers the async plugin factories for all built-in loaders.
     * Loaders will be dynamically imported on demand, only when a SceneLoader load operation needs each respective loader.
     */
    export function registerBuiltInLoaders(): void;




    /**
     * Configuration for glTF validation
     */
    export interface IGLTFValidationConfiguration {
        /**
         * The url of the glTF validator.
         */
        url: string;
    }
    /**
     * glTF validation
     */
    export class GLTFValidation {
        /**
         * The configuration. Defaults to `{ url: "https://cdn.babylonjs.com/gltf_validator.js" }`.
         */
        static Configuration: IGLTFValidationConfiguration;
        private static _LoadScriptPromise;
        /**
         * The most recent validation results.
         * @internal - Used for back-compat in Sandbox with Inspector V2.
         */
        static _LastResults: Nullable<GLTF2.IGLTFValidationResults>;
        /**
         * Validate a glTF asset using the glTF-Validator.
         * @param data The JSON of a glTF or the array buffer of a binary glTF
         * @param rootUrl The root url for the glTF
         * @param fileName The file name for the glTF
         * @param getExternalResource The callback to get external resources for the glTF validator
         * @returns A promise that resolves with the glTF validation results once complete
         */
        static ValidateAsync(data: string | Uint8Array, rootUrl: string, fileName: string, getExternalResource: (uri: string) => Promise<Uint8Array>): Promise<GLTF2.IGLTFValidationResults>;
    }


    export const GLTFMagicBase64Encoded = "Z2xURg";
    export var GLTFFileLoaderMetadata: {
        readonly name: "gltf";
        readonly extensions: {
            readonly ".gltf": {
                readonly isBinary: false;
                readonly mimeType: "model/gltf+json";
            };
            readonly ".glb": {
                readonly isBinary: true;
                readonly mimeType: "model/gltf-binary";
            };
        };
        readonly canDirectLoad: (data: string) => boolean;
    };


    /**
     * Defines options for glTF loader extensions. This interface is extended by specific extensions.
     */
    export interface GLTFLoaderExtensionOptions extends Record<string, Record<string, unknown> | undefined> {
    }
        interface SceneLoaderPluginOptions {
            /**
             * Defines options for the glTF loader.
             */
            [GLTFFileLoaderMetadata.name]: Partial<GLTFLoaderOptions>;
        }
    /**
     * Mode that determines the coordinate system to use.
     */
    export enum GLTFLoaderCoordinateSystemMode {
        /**
         * Automatically convert the glTF right-handed data to the appropriate system based on the current coordinate system mode of the scene.
         */
        AUTO = 0,
        /**
         * Sets the useRightHandedSystem flag on the scene.
         */
        FORCE_RIGHT_HANDED = 1
    }
    /**
     * Mode that determines what animations will start.
     */
    export enum GLTFLoaderAnimationStartMode {
        /**
         * No animation will start.
         */
        NONE = 0,
        /**
         * The first animation will start.
         */
        FIRST = 1,
        /**
         * All animations will start.
         */
        ALL = 2
    }
    /**
     * Interface that contains the data for the glTF asset.
     */
    export interface IGLTFLoaderData {
        /**
         * The object that represents the glTF JSON.
         */
        json: object;
        /**
         * The BIN chunk of a binary glTF.
         */
        bin: Nullable<IDataBuffer>;
    }
    /**
     * Interface for extending the loader.
     */
    export interface IGLTFLoaderExtension {
        /**
         * The name of this extension.
         */
        readonly name: string;
        /**
         * Defines whether this extension is enabled.
         */
        enabled: boolean;
        /**
         * Defines the order of this extension.
         * The loader sorts the extensions using these values when loading.
         */
        order?: number;
    }
    /**
     * Loader state.
     */
    export enum GLTFLoaderState {
        /**
         * The asset is loading.
         */
        LOADING = 0,
        /**
         * The asset is ready for rendering.
         */
        READY = 1,
        /**
         * The asset is completely loaded.
         */
        COMPLETE = 2
    }
    /** @internal */
    export interface IGLTFLoader extends IDisposable {
        importMeshAsync: (meshesNames: string | readonly string[] | null | undefined, scene: Scene, container: Nullable<AssetContainer>, data: IGLTFLoaderData, rootUrl: string, onProgress?: (event: ISceneLoaderProgressEvent) => void, fileName?: string) => Promise<ISceneLoaderAsyncResult>;
        loadAsync: (scene: Scene, data: IGLTFLoaderData, rootUrl: string, onProgress?: (event: ISceneLoaderProgressEvent) => void, fileName?: string) => Promise<void>;
    }
    /**
     * Adds default/implicit options to extension specific options.
     */
    type DefaultExtensionOptions<BaseExtensionOptions> = {
        /**
         * Defines if the extension is enabled
         */
        enabled?: boolean;
    } & BaseExtensionOptions;
    /**
     * This class contains all the concrete (not abstract) glTF options, excluding callbacks.
     * The purpose of this class is to make it easy to provide a way to mutate the default
     * loader options (see the GLTFLoaderDefaultOptions instance below) without duplicating
     * all the options in yet another object. Since this class is instantiated for the default
     * options object, abstract properties and callbacks are not included, it's more just
     * flag-type options.
     */
    class GLTFLoaderBaseOptions {
        /**
         * Defines if the loader should always compute the bounding boxes of meshes and not use the min/max values from the position accessor. Defaults to false.
         */
        alwaysComputeBoundingBox: boolean;
        /**
         * Defines if the loader should always compute the nearest common ancestor of the skeleton joints instead of using `skin.skeleton`. Defaults to false.
         * Set this to true if loading assets with invalid `skin.skeleton` values.
         */
        alwaysComputeSkeletonRootNode: boolean;
        /**
         * The animation start mode. Defaults to FIRST.
         */
        animationStartMode: GLTFLoaderAnimationStartMode;
        /**
         * Defines if the loader should compile materials before raising the success callback. Defaults to false.
         */
        compileMaterials: boolean;
        /**
         * Defines if the loader should compile shadow generators before raising the success callback. Defaults to false.
         */
        compileShadowGenerators: boolean;
        /**
         * The coordinate system mode. Defaults to AUTO.
         */
        coordinateSystemMode: GLTFLoaderCoordinateSystemMode;
        /**
         * Defines if the loader should create instances when multiple glTF nodes point to the same glTF mesh. Defaults to true.
         */
        createInstances: boolean;
        /**
         * If true, load all materials defined in the file, even if not used by any mesh. Defaults to false.
         */
        loadAllMaterials: boolean;
        /**
         * Defines if the loader should load morph targets. Defaults to true.
         */
        loadMorphTargets: boolean;
        /**
         * Defines if the loader should load node animations. Defaults to true.
         * NOTE: The animation of this node will still load if the node is also a joint of a skin and `loadSkins` is true.
         */
        loadNodeAnimations: boolean;
        /**
         * If true, load only the materials defined in the file. Defaults to false.
         */
        loadOnlyMaterials: boolean;
        /**
         * Defines if the loader should load skins. Defaults to true.
         */
        loadSkins: boolean;
        /**
         * If true, do not load any materials defined in the file. Defaults to false.
         */
        skipMaterials: boolean;
        /**
         * When loading glTF animations, which are defined in seconds, target them to this FPS. Defaults to 60.
         */
        targetFps: number;
        /**
         * Defines if the Alpha blended materials are only applied as coverage.
         * If false, (default) The luminance of each pixel will reduce its opacity to simulate the behaviour of most physical materials.
         * If true, no extra effects are applied to transparent pixels.
         */
        transparencyAsCoverage: boolean;
        /**
         * Defines if the loader should also compile materials with clip planes. Defaults to false.
         */
        useClipPlane: boolean;
        /**
         * If true, the loader will derive the name for Babylon textures from the glTF texture name, image name, or image url. Defaults to false.
         * Note that it is possible for multiple Babylon textures to share the same name when the Babylon textures load from the same glTF texture or image.
         */
        useGltfTextureNames: boolean;
        /**
         * Defines if the loader should use range requests when load binary glTF files from HTTP.
         * Enabling will disable offline support and glTF validator.
         * Defaults to false.
         */
        useRangeRequests: boolean;
        /**
         * If true, load the color (gamma encoded) textures into sRGB buffers (if supported by the GPU), which will yield more accurate results when sampling the texture. Defaults to true.
         */
        useSRGBBuffers: boolean;
        /**
         * Defines if the loader should validate the asset.
         */
        validate: boolean;
        /**
         * Load the glTF files using the OpenPBR material.
         * @experimental
         */
        useOpenPBR: boolean;
        /**
         * If true, the loader will not use the transmission helper when loading materials with transmission.
         */
        dontUseTransmissionHelper: boolean;
    }
    /**
     * The default GLTF loader options.
     * Override the properties of this object to globally change the default loader options.
     * To specify options for a specific load call, pass those options into the associated load function.
     */
    export var GLTFLoaderDefaultOptions: GLTFLoaderBaseOptions;
    abstract class GLTFLoaderOptions extends GLTFLoaderBaseOptions {
        protected copyFrom(options?: Partial<Readonly<GLTFLoaderOptions>>): void;
        /**
         * Raised when the asset has been parsed
         */
        abstract onParsed?: ((loaderData: IGLTFLoaderData) => void) | undefined;
        /**
         * Defines if the loader should capture performance counters.
         */
        abstract capturePerformanceCounters: boolean;
        /**
         * Defines the node to use as the root of the hierarchy when loading the scene (default: undefined). If not defined, a root node will be automatically created.
         * You can also pass null if you don't want a root node to be created.
         */
        customRootNode?: Nullable<TransformNode>;
        /**
         * Defines options for glTF extensions.
         */
        extensionOptions: {
            [Extension in keyof GLTFLoaderExtensionOptions]?: {
                [Option in keyof DefaultExtensionOptions<GLTFLoaderExtensionOptions[Extension]>]: DefaultExtensionOptions<GLTFLoaderExtensionOptions[Extension]>[Option];
            };
        };
        /**
         * If true, enable logging for the loader. Defaults to false.
         */
        abstract loggingEnabled: boolean;
        /**
         * Callback raised when the loader creates a camera after parsing the glTF properties of the camera.
         */
        abstract onCameraLoaded?: (camera: Camera) => void;
        /**
         * Callback raised when the loader creates a material after parsing the glTF properties of the material.
         */
        abstract onMaterialLoaded?: (material: Material) => void;
        /**
         * Callback raised when the loader creates a mesh after parsing the glTF properties of the mesh.
         * Note that the callback is called as soon as the mesh object is created, meaning some data may not have been setup yet for this mesh (vertex data, morph targets, material, ...)
         */
        abstract onMeshLoaded?: (mesh: AbstractMesh) => void;
        /**
         * Callback raised when the loader creates a skin after parsing the glTF properties of the skin node.
         * @see https://doc.babylonjs.com/features/featuresDeepDive/importers/glTF/glTFSkinning#ignoring-the-transform-of-the-skinned-mesh
         */
        abstract onSkinLoaded?: (node: TransformNode, skinnedNode: TransformNode) => void;
        /**
         * Callback raised when the loader creates a texture after parsing the glTF properties of the texture.
         */
        abstract onTextureLoaded?: (texture: BaseTexture) => void;
        /**
         * Callback raised after the asset is validated.
         */
        abstract onValidated?: (results: GLTF2.IGLTFValidationResults) => void;
        /**
         * Function called before loading a url referenced by the asset.
         * @param url url referenced by the asset
         * @returns Async url to load
         */
        preprocessUrlAsync: (url: string) => Promise<string>;
    }
    /**
     * File loader for loading glTF files into a scene.
     */
    export class GLTFFileLoader extends GLTFLoaderOptions implements IDisposable, ISceneLoaderPluginAsync, ISceneLoaderPluginFactory {
        /** @internal */
        static _CreateGLTF1Loader: (parent: GLTFFileLoader) => IGLTFLoader;
        /** @internal */
        static _CreateGLTF2Loader: (parent: GLTFFileLoader) => IGLTFLoader;
        /**
         * Creates a new glTF file loader.
         * @param options The options for the loader
         */
        constructor(options?: Partial<Readonly<GLTFLoaderOptions>>);
        /**
         * Raised when the asset has been parsed
         */
        onParsedObservable: Observable<IGLTFLoaderData>;
        private _onParsedObserver;
        /**
         * Raised when the asset has been parsed
         */
        set onParsed(callback: ((loaderData: IGLTFLoaderData) => void) | undefined);
        /**
         * Set this property to false to disable incremental loading which delays the loader from calling the success callback until after loading the meshes and shaders.
         * Textures always loads asynchronously. For example, the success callback can compute the bounding information of the loaded meshes when incremental loading is disabled.
         * Defaults to true.
         * @internal
         */
        static IncrementalLoading: boolean;
        /**
         * Set this property to true in order to work with homogeneous coordinates, available with some converters and exporters.
         * Defaults to false. See https://en.wikipedia.org/wiki/Homogeneous_coordinates.
         * @internal
         */
        static HomogeneousCoordinates: boolean;
        /**
         * Observable raised when the loader creates a mesh after parsing the glTF properties of the mesh.
         * Note that the observable is raised as soon as the mesh object is created, meaning some data may not have been setup yet for this mesh (vertex data, morph targets, material, ...)
         */
        readonly onMeshLoadedObservable: Observable<AbstractMesh>;
        private _onMeshLoadedObserver;
        /**
         * Callback raised when the loader creates a mesh after parsing the glTF properties of the mesh.
         * Note that the callback is called as soon as the mesh object is created, meaning some data may not have been setup yet for this mesh (vertex data, morph targets, material, ...)
         */
        set onMeshLoaded(callback: ((mesh: AbstractMesh) => void) | undefined);
        /**
         * Observable raised when the loader creates a skin after parsing the glTF properties of the skin node.
         * @see https://doc.babylonjs.com/features/featuresDeepDive/importers/glTF/glTFSkinning#ignoring-the-transform-of-the-skinned-mesh
         * @param node - the transform node that corresponds to the original glTF skin node used for animations
         * @param skinnedNode - the transform node that is the skinned mesh itself or the parent of the skinned meshes
         */
        readonly onSkinLoadedObservable: Observable<{
            node: TransformNode;
            skinnedNode: TransformNode;
        }>;
        private _onSkinLoadedObserver;
        /**
         * Callback raised when the loader creates a skin after parsing the glTF properties of the skin node.
         * @see https://doc.babylonjs.com/features/featuresDeepDive/importers/glTF/glTFSkinning#ignoring-the-transform-of-the-skinned-mesh
         */
        set onSkinLoaded(callback: ((node: TransformNode, skinnedNode: TransformNode) => void) | undefined);
        /**
         * Observable raised when the loader creates a texture after parsing the glTF properties of the texture.
         */
        readonly onTextureLoadedObservable: Observable<BaseTexture>;
        private _onTextureLoadedObserver;
        /**
         * Callback raised when the loader creates a texture after parsing the glTF properties of the texture.
         */
        set onTextureLoaded(callback: ((texture: BaseTexture) => void) | undefined);
        /**
         * Observable raised when the loader creates a material after parsing the glTF properties of the material.
         */
        readonly onMaterialLoadedObservable: Observable<Material>;
        private _onMaterialLoadedObserver;
        /**
         * Callback raised when the loader creates a material after parsing the glTF properties of the material.
         */
        set onMaterialLoaded(callback: ((material: Material) => void) | undefined);
        /**
         * Observable raised when the loader creates a camera after parsing the glTF properties of the camera.
         */
        readonly onCameraLoadedObservable: Observable<Camera>;
        private _onCameraLoadedObserver;
        /**
         * Callback raised when the loader creates a camera after parsing the glTF properties of the camera.
         */
        set onCameraLoaded(callback: ((camera: Camera) => void) | undefined);
        /**
         * Observable raised when the asset is completely loaded, immediately before the loader is disposed.
         * For assets with LODs, raised when all of the LODs are complete.
         * For assets without LODs, raised when the model is complete, immediately after the loader resolves the returned promise.
         */
        readonly onCompleteObservable: Observable<void>;
        private _onCompleteObserver;
        /**
         * Callback raised when the asset is completely loaded, immediately before the loader is disposed.
         * For assets with LODs, raised when all of the LODs are complete.
         * For assets without LODs, raised when the model is complete, immediately after the loader resolves the returned promise.
         */
        set onComplete(callback: () => void);
        /**
         * Observable raised when an error occurs.
         */
        readonly onErrorObservable: Observable<any>;
        private _onErrorObserver;
        /**
         * Callback raised when an error occurs.
         */
        set onError(callback: (reason: any) => void);
        /**
         * Observable raised after the loader is disposed.
         */
        readonly onDisposeObservable: Observable<void>;
        private _onDisposeObserver;
        /**
         * Callback raised after the loader is disposed.
         */
        set onDispose(callback: () => void);
        /**
         * Observable raised after a loader extension is created.
         * Set additional options for a loader extension in this event.
         */
        readonly onExtensionLoadedObservable: Observable<IGLTFLoaderExtension>;
        private _onExtensionLoadedObserver;
        /**
         * Callback raised after a loader extension is created.
         */
        set onExtensionLoaded(callback: (extension: IGLTFLoaderExtension) => void);
        /**
         * Defines if the loader logging is enabled.
         */
        get loggingEnabled(): boolean;
        set loggingEnabled(value: boolean);
        /**
         * Defines if the loader should capture performance counters.
         */
        get capturePerformanceCounters(): boolean;
        set capturePerformanceCounters(value: boolean);
        /**
         * Observable raised after validation when validate is set to true. The event data is the result of the validation.
         */
        readonly onValidatedObservable: Observable<GLTF2.IGLTFValidationResults>;
        private _onValidatedObserver;
        /**
         * Callback raised after the asset is validated.
         */
        set onValidated(callback: (results: GLTF2.IGLTFValidationResults) => void);
        private _loader;
        private _state;
        private _progressCallback?;
        private _requests;
        /**
         * Name of the loader ("gltf")
         */
        readonly name: "gltf";
        /** @internal */
        readonly extensions: {
            readonly ".gltf": {
                readonly isBinary: false;
                readonly mimeType: "model/gltf+json";
            };
            readonly ".glb": {
                readonly isBinary: true;
                readonly mimeType: "model/gltf-binary";
            };
        };
        /**
         * Disposes the loader, releases resources during load, and cancels any outstanding requests.
         */
        dispose(): void;
        /**
         * @internal
         */
        loadFile(scene: Scene, fileOrUrl: File | string | ArrayBufferView, rootUrl: string, onSuccess: (data: unknown, responseURL?: string) => void, onProgress?: (ev: ISceneLoaderProgressEvent) => void, useArrayBuffer?: boolean, onError?: (request?: WebRequest, exception?: LoadFileError) => void, name?: string): Nullable<IFileRequest>;
        private _loadBinary;
        /**
         * @internal
         */
        importMeshAsync(meshesNames: string | readonly string[] | null | undefined, scene: Scene, data: IGLTFLoaderData, rootUrl: string, onProgress?: (event: ISceneLoaderProgressEvent) => void, fileName?: string): Promise<ISceneLoaderAsyncResult>;
        /**
         * @internal
         */
        loadAsync(scene: Scene, data: IGLTFLoaderData, rootUrl: string, onProgress?: (event: ISceneLoaderProgressEvent) => void, fileName?: string): Promise<void>;
        /**
         * @internal
         */
        loadAssetContainerAsync(scene: Scene, data: IGLTFLoaderData, rootUrl: string, onProgress?: (event: ISceneLoaderProgressEvent) => void, fileName?: string): Promise<AssetContainer>;
        /**
         * @internal
         */
        canDirectLoad(data: string): boolean;
        /**
         * @internal
         */
        directLoad(scene: Scene, data: string): Promise<object>;
        /**
         * The callback that allows custom handling of the root url based on the response url.
         * @param rootUrl the original root url
         * @param responseURL the response url if available
         * @returns the new root url
         */
        rewriteRootURL?(rootUrl: string, responseURL?: string): string;
        /** @internal */
        createPlugin(options: SceneLoaderPluginOptions): ISceneLoaderPluginAsync;
        /**
         * The loader state or null if the loader is not active.
         */
        get loaderState(): Nullable<GLTFLoaderState>;
        /**
         * Observable raised when the loader state changes.
         */
        onLoaderStateChangedObservable: Observable<Nullable<GLTFLoaderState>>;
        /**
         * Returns a promise that resolves when the asset is completely loaded.
         * @returns a promise that resolves when the asset is completely loaded.
         */
        whenCompleteAsync(): Promise<void>;
        /**
         * @internal
         */
        _setState(state: GLTFLoaderState): void;
        /**
         * @internal
         */
        _loadFile(scene: Scene, fileOrUrl: File | string, onSuccess: (data: string | ArrayBuffer) => void, useArrayBuffer?: boolean, onError?: (request?: WebRequest) => void, onOpened?: (request: WebRequest) => void): IFileRequest;
        private _onProgress;
        private _validate;
        private _getLoader;
        private _parseJson;
        private _unpackBinaryAsync;
        private _unpackBinaryV1Async;
        private _unpackBinaryV2Async;
        private static _parseVersion;
        private static _compareVersion;
        private static readonly _logSpaces;
        private _logIndentLevel;
        private _loggingEnabled;
        /** @internal */
        _log: (message: string) => void;
        /**
         * @internal
         */
        _logOpen(message: string): void;
        /** @internal */
        _logClose(): void;
        private _logEnabled;
        private _logDisabled;
        private _capturePerformanceCounters;
        /** @internal */
        _startPerformanceCounter: (counterName: string) => void;
        /** @internal */
        _endPerformanceCounter: (counterName: string) => void;
        private _startPerformanceCounterEnabled;
        private _startPerformanceCounterDisabled;
        private _endPerformanceCounterEnabled;
        private _endPerformanceCounterDisabled;
    }



}
declare module BABYLON.GLTF2 {
        /**
     * Material Loading Adapter for PBR materials that provides a unified OpenPBR-like interface.
     */
    export class PBRMaterialLoadingAdapter implements BABYLON.GLTF2.IMaterialLoadingAdapter {
        private _material;
        private _extinctionCoefficient;
        /**
         * Creates a new instance of the PBRMaterialLoadingAdapter.
         * @param material - The PBR material to adapt.
         */
        constructor(material: Material);
        /**
         * Gets the underlying material
         */
        get material(): PBRMaterial;
        /**
         * Whether the material should be treated as unlit
         */
        get isUnlit(): boolean;
        /**
         * Sets whether the material should be treated as unlit
         */
        set isUnlit(value: boolean);
        /**
         * Sets whether back face culling is enabled.
         * @param value True to enable back face culling
         */
        set backFaceCulling(value: boolean);
        /**
         * Gets whether back face culling is enabled.
         * @returns True if back face culling is enabled
         */
        get backFaceCulling(): boolean;
        /**
         * Sets whether two-sided lighting is enabled.
         * @param value True to enable two-sided lighting
         */
        set twoSidedLighting(value: boolean);
        /**
         * Gets whether two-sided lighting is enabled.
         * @returns True if two-sided lighting is enabled
         */
        get twoSidedLighting(): boolean;
        /**
         * Sets the alpha cutoff value for alpha testing.
         * @param value The alpha cutoff threshold (0-1)
         */
        set alphaCutOff(value: number);
        /**
         * Gets the alpha cutoff value.
         * @returns The alpha cutoff threshold (0-1)
         */
        get alphaCutOff(): number;
        /**
         * Sets whether to use alpha from the albedo texture.
         * @param value True to use alpha from albedo texture
         */
        set useAlphaFromBaseColorTexture(value: boolean);
        /**
         * Gets whether alpha is used from the albedo texture.
         * @returns True if using alpha from albedo texture
         */
        get useAlphaFromBaseColorTexture(): boolean;
        /**
         * Gets whether the transparency is treated as alpha coverage.
         */
        get transparencyAsAlphaCoverage(): boolean;
        /**
         * Sets/Gets whether the transparency is treated as alpha coverage
         */
        set transparencyAsAlphaCoverage(value: boolean);
        /**
         * Sets the base color of the material (mapped to PBR albedoColor).
         * @param value The base color as a Color3
         */
        set baseColor(value: Color3);
        /**
         * Gets the base color of the material.
         * @returns The base color as a Color3
         */
        get baseColor(): Color3;
        /**
         * Sets the base color texture of the material (mapped to PBR albedoTexture).
         * @param value The base color texture or null
         */
        set baseColorTexture(value: Nullable<BaseTexture>);
        /**
         * Gets the base color texture of the material.
         * @returns The base color texture or null
         */
        get baseColorTexture(): Nullable<BaseTexture>;
        /**
         * Sets the base diffuse roughness of the material.
         * @param value The diffuse roughness value (0-1)
         */
        set baseDiffuseRoughness(value: number);
        /**
         * Gets the base diffuse roughness of the material.
         * @returns The diffuse roughness value (0-1), defaults to 0 if not set
         */
        get baseDiffuseRoughness(): number;
        /**
         * Sets the base diffuse roughness texture of the material.
         * @param value The diffuse roughness texture or null
         */
        set baseDiffuseRoughnessTexture(value: Nullable<BaseTexture>);
        /**
         * Gets the base diffuse roughness texture of the material.
         * @returns The diffuse roughness texture or null
         */
        get baseDiffuseRoughnessTexture(): Nullable<BaseTexture>;
        /**
         * Sets the base metalness value of the material (mapped to PBR metallic).
         * @param value The metalness value (0-1)
         */
        set baseMetalness(value: number);
        /**
         * Gets the base metalness value of the material.
         * @returns The metalness value (0-1), defaults to 1 if not set
         */
        get baseMetalness(): number;
        /**
         * Sets the base metalness texture of the material (mapped to PBR metallicTexture).
         * @param value The metalness texture or null
         */
        set baseMetalnessTexture(value: Nullable<BaseTexture>);
        /**
         * Gets the base metalness texture of the material.
         * @returns The metalness texture or null
         */
        get baseMetalnessTexture(): Nullable<BaseTexture>;
        /**
         * Sets whether to use roughness from the metallic texture's green channel.
         * Also disables using roughness from the alpha channel when enabled.
         * @param value True to use green channel for roughness
         */
        set useRoughnessFromMetallicTextureGreen(value: boolean);
        /**
         * Sets whether to use metalness from the metallic texture's blue channel.
         * @param value True to use blue channel for metalness
         */
        set useMetallicFromMetallicTextureBlue(value: boolean);
        /**
         * Configures specular properties and optionally enables OpenPBR BRDF model for edge color support.
         * @param enableEdgeColor Whether to enable OpenPBR BRDF models for edge color support
         */
        enableSpecularEdgeColor(enableEdgeColor?: boolean): void;
        /**
         * Sets the specular weight (mapped to PBR metallicF0Factor).
         * @param value The specular weight value
         */
        set specularWeight(value: number);
        /**
         * Gets the specular weight.
         * @returns The specular weight value, defaults to 1 if not set
         */
        get specularWeight(): number;
        /**
         * Sets the specular weight texture (mapped to PBR metallicReflectanceTexture).
         * Configures the material to use only metalness from this texture when set.
         * @param value The specular weight texture or null
         */
        set specularWeightTexture(value: Nullable<BaseTexture>);
        /**
         * Gets the specular weight texture.
         * @returns The specular weight texture or null
         */
        get specularWeightTexture(): Nullable<BaseTexture>;
        /**
         * Sets the specular color (mapped to PBR metallicReflectanceColor).
         * @param value The specular color as a Color3
         */
        set specularColor(value: Color3);
        /**
         * Gets the specular color.
         * @returns The specular color as a Color3
         */
        get specularColor(): Color3;
        /**
         * Sets the specular color texture (mapped to PBR reflectanceTexture).
         * @param value The specular color texture or null
         */
        set specularColorTexture(value: Nullable<BaseTexture>);
        /**
         * Gets the specular color texture.
         * @returns The specular color texture or null
         */
        get specularColorTexture(): Nullable<BaseTexture>;
        /**
         * Sets the specular roughness (mapped to PBR roughness).
         * @param value The roughness value (0-1)
         */
        set specularRoughness(value: number);
        /**
         * Gets the specular roughness.
         * @returns The roughness value (0-1), defaults to 1 if not set
         */
        get specularRoughness(): number;
        /**
         * Sets the specular roughness texture.
         * Note: PBR uses the same texture for both metallic and roughness,
         * so this only sets the texture if no base metalness texture exists.
         * @param value The roughness texture or null
         */
        set specularRoughnessTexture(value: Nullable<BaseTexture>);
        /**
         * Gets the specular roughness texture.
         * @returns The roughness texture (same as metallic texture for PBR) or null
         */
        get specularRoughnessTexture(): Nullable<BaseTexture>;
        /**
         * Sets the specular index of refraction (mapped to PBR indexOfRefraction).
         * @param value The IOR value
         */
        set specularIor(value: number);
        /**
         * Gets the specular index of refraction.
         * @returns The IOR value
         */
        get specularIor(): number;
        /**
         * Sets the emission color (mapped to PBR emissiveColor).
         * @param value The emission color as a Color3
         */
        set emissionColor(value: Color3);
        /**
         * Gets the emission color.
         * @returns The emission color as a Color3
         */
        get emissionColor(): Color3;
        /**
         * Sets the emission luminance/intensity (mapped to PBR emissiveIntensity).
         * @param value The emission intensity value
         */
        set emissionLuminance(value: number);
        /**
         * Gets the emission luminance/intensity.
         * @returns The emission intensity value
         */
        get emissionLuminance(): number;
        /**
         * Sets the emission color texture (mapped to PBR emissiveTexture).
         * @param value The emission texture or null
         */
        set emissionColorTexture(value: Nullable<BaseTexture>);
        /**
         * Gets the emission color texture.
         * @returns The emission texture or null
         */
        get emissionColorTexture(): Nullable<BaseTexture>;
        /**
         * Sets the ambient occlusion texture (mapped to PBR ambientTexture).
         * Automatically enables grayscale mode when set.
         * @param value The ambient occlusion texture or null
         */
        set ambientOcclusionTexture(value: Nullable<BaseTexture>);
        /**
         * Gets the ambient occlusion texture.
         * @returns The ambient occlusion texture or null
         */
        get ambientOcclusionTexture(): Nullable<BaseTexture>;
        /**
         * Sets the ambient occlusion texture strength.
         * @param value The strength value (typically 0-1)
         */
        set ambientOcclusionTextureStrength(value: number);
        /**
         * Gets the ambient occlusion texture strength.
         * @returns The strength value, defaults to 1.0 if not set
         */
        get ambientOcclusionTextureStrength(): number;
        /**
         * Configures clear coat for PBR material.
         * Enables clear coat and sets up proper configuration.
         */
        configureCoat(): void;
        /**
         * Sets the coat weight (mapped to PBR clearCoat.intensity).
         * Automatically enables clear coat.
         * @param value The coat weight value (0-1)
         */
        set coatWeight(value: number);
        /**
         * Gets the coat weight.
         * @returns The coat weight value
         */
        get coatWeight(): number;
        /**
         * Sets the coat weight texture (mapped to PBR clearCoat.texture).
         * Automatically enables clear coat.
         * @param value The coat weight texture or null
         */
        set coatWeightTexture(value: Nullable<BaseTexture>);
        /**
         * Gets the coat weight texture.
         * @returns The coat weight texture or null
         */
        get coatWeightTexture(): Nullable<BaseTexture>;
        /**
         * Sets the coat color (mapped to PBR clearCoat.tintColor).
         * @param value The coat tint color as a Color3
         */
        set coatColor(value: Color3);
        /**
         * Sets the coat color texture (mapped to PBR clearCoat.tintTexture).
         * @param value The coat color texture or null
         */
        set coatColorTexture(value: Nullable<BaseTexture>);
        /**
         * Sets the coat roughness (mapped to PBR clearCoat.roughness).
         * Automatically enables clear coat.
         * @param value The coat roughness value (0-1)
         */
        set coatRoughness(value: number);
        /**
         * Gets the coat roughness.
         * @returns The coat roughness value, defaults to 0 if not set
         */
        get coatRoughness(): number;
        /**
         * Sets the coat roughness texture (mapped to PBR clearCoat.textureRoughness).
         * Automatically enables clear coat and disables using roughness from main texture.
         * @param value The coat roughness texture or null
         */
        set coatRoughnessTexture(value: Nullable<BaseTexture>);
        /**
         * Gets the coat roughness texture.
         * @returns The coat roughness texture or null
         */
        get coatRoughnessTexture(): Nullable<BaseTexture>;
        /**
         * Sets the coat index of refraction (IOR).
         */
        set coatIor(value: number);
        /**
         * Sets the coat darkening value.
         * Note: PBR doesn't have a direct coat darkening property, so this is a no-op.
         * @param value The coat darkening value (ignored for PBR)
         */
        set coatDarkening(value: number);
        /**
         * Sets the coat darkening texture
         * @param value The coat darkening texture or null
         */
        set coatDarkeningTexture(value: Nullable<BaseTexture>);
        /**
         * Sets the coat roughness anisotropy.
         * Note: PBR clearCoat doesn't support anisotropy yet, so this is a placeholder.
         * @param value The coat anisotropy intensity value (currently ignored)
         */
        set coatRoughnessAnisotropy(value: number);
        /**
         * Gets the coat roughness anisotropy.
         * Note: PBR clearCoat doesn't support anisotropy yet, so this returns 0.
         * @returns Currently returns 0 as clearCoat anisotropy is not yet available
         */
        get coatRoughnessAnisotropy(): number;
        /**
         * Sets the coat tangent angle for anisotropy.
         * Note: PBR clearCoat doesn't support anisotropy yet, so this is a placeholder.
         * @param value The coat anisotropy rotation angle in radians (currently ignored)
         */
        set geometryCoatTangentAngle(value: number);
        /**
         * Sets the coat tangent texture for anisotropy.
         * Note: PBR clearCoat doesn't support anisotropy textures yet, so this is a placeholder.
         * @param value The coat anisotropy texture (currently ignored)
         */
        set geometryCoatTangentTexture(value: Nullable<BaseTexture>);
        /**
         * Gets the coat tangent texture for anisotropy.
         * Note: PBR clearCoat doesn't support anisotropy textures yet, so this returns null.
         * @returns Currently returns null as clearCoat anisotropy is not yet available
         */
        get geometryCoatTangentTexture(): Nullable<BaseTexture>;
        /**
         * Sets the transmission weight (mapped to PBR subSurface.refractionIntensity).
         * Enables refraction when value \> 0.
         * @param value The transmission weight value (0-1)
         */
        set transmissionWeight(value: number);
        /**
         * Gets the transmission weight.
         * @returns The transmission weight value
         */
        get transmissionWeight(): number;
        /**
         * Sets the transmission weight texture (mapped to PBR subSurface.refractionIntensityTexture).
         * Automatically enables refraction and glTF-style textures.
         * @param value The transmission weight texture or null
         */
        set transmissionWeightTexture(value: Nullable<BaseTexture>);
        /**
         * Sets the attenuation distance for volume.
         * @param value The attenuation distance value
         */
        set transmissionDepth(value: number);
        /**
         * Gets the attenuation distance for volume.
         * @returns The attenuation distance value
         */
        get transmissionDepth(): number;
        /**
         * Sets the attenuation color (mapped to PBR subSurface.tintColor).
         * @param value The attenuation color as a Color3
         */
        set transmissionColor(value: Color3);
        /**
         * Sets the attenuation color (mapped to PBR subSurface.tintColor).
         * @returns The attenuation color as a Color3
         */
        get transmissionColor(): Color3;
        /**
         * Sets the transmission scatter coefficient.
         * @param value The scatter coefficient as a Color3
         */
        set transmissionScatter(value: Color3);
        /**
         * Sets the transmission scatter coefficient.
         * @returns The scatter coefficient as a Color3
         */
        get transmissionScatter(): Color3;
        /**
         * Sets the transmission scattering anisotropy.
         * @param value The anisotropy intensity value (-1 to 1)
         */
        set transmissionScatterAnisotropy(value: number);
        /**
         * Sets the transmission dispersion Abbe number.
         * @param value The Abbe number value
         */
        set transmissionDispersionAbbeNumber(value: number);
        /**
         * Sets the transmission dispersion scale.
         * @param value The dispersion scale value
         */
        set transmissionDispersionScale(value: number);
        /**
         * Gets the refraction background texture
         * @returns The refraction background texture or null
         */
        get refractionBackgroundTexture(): Nullable<BaseTexture>;
        /**
         * Sets the refraction background texture
         * @param value The refraction background texture or null
         */
        set refractionBackgroundTexture(value: Nullable<BaseTexture>);
        /**
         * Configures transmission for thin-surface transmission (KHR_materials_transmission).
         * Sets up the material for proper thin-surface transmission behavior.
         */
        configureTransmission(): void;
        /**
         * Sets the thickness texture (mapped to PBR subSurface.thicknessTexture).
         * Automatically enables refraction.
         * @param value The thickness texture or null
         */
        set volumeThicknessTexture(value: Nullable<BaseTexture>);
        /**
         * Sets the thickness factor (mapped to PBR subSurface.maximumThickness).
         * Automatically enables refraction.
         * @param value The thickness value
         */
        set volumeThickness(value: number);
        /**
         * Configures subsurface properties for PBR material
         */
        configureSubsurface(): void;
        /**
         * Sets the extinction coefficient of the volume.
         * @param value The extinction coefficient as a Vector3
         */
        set extinctionCoefficient(value: Vector3);
        /**
         * Gets the extinction coefficient of the volume.
         */
        get extinctionCoefficient(): Vector3;
        /**
         * Sets the subsurface weight
         */
        set subsurfaceWeight(value: number);
        /**
         * Gets the subsurface weight
         * @returns The subsurface weight value
         */
        get subsurfaceWeight(): number;
        /**
         * Sets the subsurface weight texture
         */
        set subsurfaceWeightTexture(value: Nullable<BaseTexture>);
        /**
         * Sets the subsurface color.
         * @param value The subsurface tint color as a Color3
         */
        set subsurfaceColor(value: Color3);
        /**
         * Sets the subsurface color texture.
         * @param value The subsurface tint texture or null
         */
        set subsurfaceColorTexture(value: Nullable<BaseTexture>);
        /**
         * Sets the surface tint of the material (when using subsurface scattering)
         */
        set subsurfaceConstantTint(value: Color3);
        /**
         * Gets the subsurface constant tint (when using subsurface scattering)
         * @returns The subsurface constant tint as a Color3
         */
        get subsurfaceConstantTint(): Color3;
        /**
         * Sets the subsurface constant tint texture (when using subsurface scattering)
         * @param value The subsurface constant tint texture or null
         */
        set subsurfaceConstantTintTexture(value: Nullable<BaseTexture>);
        /**
         * Gets the subsurface radius (used for subsurface scattering)
         * subsurfaceRadiusScale * subsurfaceRadius gives the mean free path per color channel.
         * @returns The subsurface radius as a Color3
         */
        get subsurfaceRadius(): number;
        /**
         * Sets the subsurface radius (used for subsurface scattering)
         * subsurfaceRadiusScale * subsurfaceRadius gives the mean free path per color channel.
         * @param value The subsurface radius as a number
         */
        set subsurfaceRadius(value: number);
        /**
         * Gets the subsurface radius scale (used for subsurface scattering)
         * subsurfaceRadiusScale * subsurfaceRadius gives the mean free path per color channel.
         * @returns The subsurface radius scale as a Color3
         */
        get subsurfaceRadiusScale(): Color3;
        /**
         * Sets the subsurface radius scale (used for subsurface scattering)
         * subsurfaceRadiusScale * subsurfaceRadius gives the mean free path per color channel.
         * @param value The subsurface radius scale as a Color3
         */
        set subsurfaceRadiusScale(value: Color3);
        /**
         * Sets the subsurface scattering anisotropy.
         * Note: PBRMaterial does not have a direct equivalent, so this is a no-op.
         * @param value The anisotropy intensity value (ignored for PBR)
         */
        set subsurfaceScatterAnisotropy(value: number);
        /**
         * Configures sheen for PBR material.
         * Enables sheen and sets up proper configuration.
         */
        configureFuzz(): void;
        /**
         * Sets the sheen weight (mapped to PBR sheen.intensity).
         * Automatically enables sheen.
         * @param value The sheen weight value
         */
        set fuzzWeight(value: number);
        /**
         * Sets the fuzz weight texture.
         * @param value The fuzz weight texture or null
         */
        set fuzzWeightTexture(value: Nullable<BaseTexture>);
        /**
         * Sets the sheen color (mapped to PBR sheen.color).
         * Automatically enables sheen.
         * @param value The sheen color as a Color3
         */
        set fuzzColor(value: Color3);
        /**
         * Sets the sheen color texture (mapped to PBR sheen.texture).
         * Automatically enables sheen.
         * @param value The sheen color texture or null
         */
        set fuzzColorTexture(value: Nullable<BaseTexture>);
        /**
         * Sets the sheen roughness (mapped to PBR sheen.roughness).
         * Automatically enables sheen.
         * @param value The sheen roughness value (0-1)
         */
        set fuzzRoughness(value: number);
        /**
         * Sets the sheen roughness texture (mapped to PBR sheen.textureRoughness).
         * Automatically enables sheen.
         * @param value The sheen roughness texture or null
         */
        set fuzzRoughnessTexture(value: Nullable<BaseTexture>);
        /**
         * Sets the specular roughness anisotropy (mapped to PBR anisotropy.intensity).
         * Automatically enables anisotropy.
         * @param value The anisotropy intensity value
         */
        set specularRoughnessAnisotropy(value: number);
        /**
         * Gets the specular roughness anisotropy.
         * @returns The anisotropy intensity value
         */
        get specularRoughnessAnisotropy(): number;
        /**
         * Sets the anisotropy rotation (mapped to PBR anisotropy.angle).
         * Automatically enables anisotropy.
         * @param value The anisotropy rotation angle in radians
         */
        set geometryTangentAngle(value: number);
        /**
         * Sets the geometry tangent texture (mapped to PBR anisotropy.texture).
         * Automatically enables anisotropy.
         * @param value The anisotropy texture or null
         */
        set geometryTangentTexture(value: Nullable<BaseTexture>);
        /**
         * Gets the geometry tangent texture.
         * @returns The anisotropy texture or null
         */
        get geometryTangentTexture(): Nullable<BaseTexture>;
        /**
         * Configures glTF-style anisotropy for the material.
         * Note: PBR materials don't need this configuration, so this is a no-op.
         * @param useGltfStyle Whether to use glTF-style anisotropy (ignored for PBR)
         */
        configureGltfStyleAnisotropy(useGltfStyle?: boolean): void;
        /**
         * Sets the iridescence weight (mapped to PBR iridescence.intensity).
         * Automatically enables iridescence.
         * @param value The iridescence intensity value
         */
        set thinFilmWeight(value: number);
        /**
         * Sets the iridescence IOR (mapped to PBR iridescence.indexOfRefraction).
         * @param value The iridescence IOR value
         */
        set thinFilmIor(value: number);
        /**
         * Sets the iridescence thickness minimum (mapped to PBR iridescence.minimumThickness).
         * @param value The minimum thickness value in nanometers
         */
        set thinFilmThicknessMinimum(value: number);
        /**
         * Sets the iridescence thickness maximum (mapped to PBR iridescence.maximumThickness).
         * @param value The maximum thickness value in nanometers
         */
        set thinFilmThicknessMaximum(value: number);
        /**
         * Sets the thin film weight texture (mapped to PBR iridescence.texture).
         * @param value The thin film weight texture or null
         */
        set thinFilmWeightTexture(value: Nullable<BaseTexture>);
        /**
         * Sets the iridescence thickness texture (mapped to PBR iridescence.thicknessTexture).
         * @param value The iridescence thickness texture or null
         */
        set thinFilmThicknessTexture(value: Nullable<BaseTexture>);
        /**
         * Sets whether the material is unlit.
         * @param value True to make the material unlit
         */
        set unlit(value: boolean);
        /**
         * Sets the geometry opacity (mapped to PBR alpha).
         * @param value The opacity value (0-1)
         */
        set geometryOpacity(value: number);
        /**
         * Gets the geometry opacity.
         * @returns The opacity value (0-1)
         */
        get geometryOpacity(): number;
        /**
         * Sets the geometry normal texture (mapped to PBR bumpTexture).
         * Also forces irradiance computation in fragment shader for better lighting.
         * @param value The normal texture or null
         */
        set geometryNormalTexture(value: Nullable<BaseTexture>);
        /**
         * Gets the geometry normal texture.
         * @returns The normal texture or null
         */
        get geometryNormalTexture(): Nullable<BaseTexture>;
        /**
         * Sets the normal map inversions for the material.
         * @param invertX Whether to invert the normal map on the X axis
         * @param invertY Whether to invert the normal map on the Y axis
         */
        setNormalMapInversions(invertX: boolean, invertY: boolean): void;
        /**
         * Sets the geometry coat normal texture (mapped to PBR clearCoat.bumpTexture).
         * Automatically enables clear coat.
         * @param value The coat normal texture or null
         */
        set geometryCoatNormalTexture(value: Nullable<BaseTexture>);
        /**
         * Gets the geometry coat normal texture.
         * @returns The coat normal texture or null
         */
        get geometryCoatNormalTexture(): Nullable<BaseTexture>;
        /**
         * Sets the geometry coat normal texture scale.
         * @param value The scale value for the coat normal texture
         */
        set geometryCoatNormalTextureScale(value: number);
    }



}
declare module BABYLON {


}
declare module BABYLON.GLTF2 {
        /**
     * Material Loading Adapter for OpenPBR materials that provides a unified OpenPBR-like interface.
     */
    export class OpenPBRMaterialLoadingAdapter implements BABYLON.GLTF2.IMaterialLoadingAdapter {
        private _material;
        private _extinctionCoefficient;
        /**
         * Creates a new instance of the OpenPBRMaterialLoadingAdapter.
         * @param material - The OpenPBR material to adapt.
         */
        constructor(material: Material);
        /**
         * Gets the underlying material
         */
        get material(): OpenPBRMaterial;
        /**
         * Whether the material should be treated as unlit
         */
        get isUnlit(): boolean;
        /**
         * Sets whether the material should be treated as unlit
         */
        set isUnlit(value: boolean);
        /**
         * Sets whether back face culling is enabled.
         * @param value True to enable back face culling
         */
        set backFaceCulling(value: boolean);
        /**
         * Gets whether back face culling is enabled.
         * @returns True if back face culling is enabled
         */
        get backFaceCulling(): boolean;
        /**
         * Sets whether two-sided lighting is enabled.
         * @param value True to enable two-sided lighting
         */
        set twoSidedLighting(value: boolean);
        /**
         * Gets whether two-sided lighting is enabled.
         * @returns True if two-sided lighting is enabled
         */
        get twoSidedLighting(): boolean;
        /**
         * Sets the alpha cutoff value for alpha testing.
         * Note: OpenPBR doesn't have a direct equivalent, so this is a no-op.
         * @param value The alpha cutoff threshold (ignored for OpenPBR)
         */
        set alphaCutOff(value: number);
        /**
         * Gets the alpha cutoff value.
         * @returns Default value of 0.5 (OpenPBR doesn't support this directly)
         */
        get alphaCutOff(): number;
        /**
         * Sets whether to use alpha from the base color texture.
         * Note: OpenPBR handles this differently through the baseColorTexture alpha channel.
         * @param value True to use alpha from base color texture (handled automatically in OpenPBR)
         */
        set useAlphaFromBaseColorTexture(value: boolean);
        /**
         * Gets whether alpha is used from the base color texture.
         * @returns Always false for OpenPBR as it's handled automatically
         */
        get useAlphaFromBaseColorTexture(): boolean;
        /**
         * Gets whether the transparency is treated as alpha coverage.
         */
        get transparencyAsAlphaCoverage(): boolean;
        /**
         * Sets/Gets whether the transparency is treated as alpha coverage
         */
        set transparencyAsAlphaCoverage(value: boolean);
        /**
         * Sets the base color of the OpenPBR material.
         * @param value The base color as a Color3
         */
        set baseColor(value: Color3);
        /**
         * Gets the base color of the OpenPBR material.
         * @returns The base color as a Color3
         */
        get baseColor(): Color3;
        /**
         * Sets the base color texture of the OpenPBR material.
         * @param value The base color texture or null
         */
        set baseColorTexture(value: Nullable<BaseTexture>);
        /**
         * Gets the base color texture of the OpenPBR material.
         * @returns The base color texture or null
         */
        get baseColorTexture(): Nullable<BaseTexture>;
        /**
         * Sets the base diffuse roughness of the OpenPBR material.
         * @param value The diffuse roughness value (0-1)
         */
        set baseDiffuseRoughness(value: number);
        /**
         * Gets the base diffuse roughness of the OpenPBR material.
         * @returns The diffuse roughness value (0-1)
         */
        get baseDiffuseRoughness(): number;
        /**
         * Sets the base diffuse roughness texture of the OpenPBR material.
         * @param value The diffuse roughness texture or null
         */
        set baseDiffuseRoughnessTexture(value: Nullable<BaseTexture>);
        /**
         * Gets the base diffuse roughness texture of the OpenPBR material.
         * @returns The diffuse roughness texture or null
         */
        get baseDiffuseRoughnessTexture(): Nullable<BaseTexture>;
        /**
         * Sets the base metalness value of the OpenPBR material.
         * @param value The metalness value (0-1)
         */
        set baseMetalness(value: number);
        /**
         * Gets the base metalness value of the OpenPBR material.
         * @returns The metalness value (0-1)
         */
        get baseMetalness(): number;
        /**
         * Sets the base metalness texture of the OpenPBR material.
         * @param value The metalness texture or null
         */
        set baseMetalnessTexture(value: Nullable<BaseTexture>);
        /**
         * Gets the base metalness texture of the OpenPBR material.
         * @returns The metalness texture or null
         */
        get baseMetalnessTexture(): Nullable<BaseTexture>;
        /**
         * Sets whether to use roughness from the metallic texture's green channel.
         * @param value True to use green channel for roughness
         */
        set useRoughnessFromMetallicTextureGreen(value: boolean);
        /**
         * Sets whether to use metalness from the metallic texture's blue channel.
         * @param value True to use blue channel for metalness
         */
        set useMetallicFromMetallicTextureBlue(value: boolean);
        /**
         * Configures specular properties for OpenPBR material.
         * @param _enableEdgeColor Whether to enable edge color support (ignored for OpenPBR)
         */
        enableSpecularEdgeColor(_enableEdgeColor?: boolean): void;
        /**
         * Sets the specular weight of the OpenPBR material.
         * @param value The specular weight value (0-1)
         */
        set specularWeight(value: number);
        /**
         * Gets the specular weight of the OpenPBR material.
         * @returns The specular weight value (0-1)
         */
        get specularWeight(): number;
        /**
         * Sets the specular weight texture of the OpenPBR material.
         * If the same texture is used for specular color, optimizes by using alpha channel for weight.
         * @param value The specular weight texture or null
         */
        set specularWeightTexture(value: Nullable<BaseTexture>);
        /**
         * Gets the specular weight texture of the OpenPBR material.
         * @returns The specular weight texture or null
         */
        get specularWeightTexture(): Nullable<BaseTexture>;
        /**
         * Sets the specular color of the OpenPBR material.
         * @param value The specular color as a Color3
         */
        set specularColor(value: Color3);
        /**
         * Gets the specular color of the OpenPBR material.
         * @returns The specular color as a Color3
         */
        get specularColor(): Color3;
        /**
         * Sets the specular color texture of the OpenPBR material.
         * If the same texture is used for specular weight, optimizes by using alpha channel for weight.
         * @param value The specular color texture or null
         */
        set specularColorTexture(value: Nullable<BaseTexture>);
        /**
         * Gets the specular color texture of the OpenPBR material.
         * @returns The specular color texture or null
         */
        get specularColorTexture(): Nullable<BaseTexture>;
        /**
         * Sets the specular roughness of the OpenPBR material.
         * @param value The roughness value (0-1)
         */
        set specularRoughness(value: number);
        /**
         * Gets the specular roughness of the OpenPBR material.
         * @returns The roughness value (0-1)
         */
        get specularRoughness(): number;
        /**
         * Sets the specular roughness texture of the OpenPBR material.
         * @param value The roughness texture or null
         */
        set specularRoughnessTexture(value: Nullable<BaseTexture>);
        /**
         * Gets the specular roughness texture of the OpenPBR material.
         * @returns The roughness texture or null
         */
        get specularRoughnessTexture(): Nullable<BaseTexture>;
        /**
         * Sets the specular index of refraction (IOR) of the OpenPBR material.
         * @param value The IOR value
         */
        set specularIor(value: number);
        /**
         * Gets the specular index of refraction (IOR) of the OpenPBR material.
         * @returns The IOR value
         */
        get specularIor(): number;
        /**
         * Sets the emission color of the OpenPBR material.
         * @param value The emission color as a Color3
         */
        set emissionColor(value: Color3);
        /**
         * Gets the emission color of the OpenPBR material.
         * @returns The emission color as a Color3
         */
        get emissionColor(): Color3;
        /**
         * Sets the emission luminance of the OpenPBR material.
         * @param value The emission luminance value
         */
        set emissionLuminance(value: number);
        /**
         * Gets the emission luminance of the OpenPBR material.
         * @returns The emission luminance value
         */
        get emissionLuminance(): number;
        /**
         * Sets the emission color texture of the OpenPBR material.
         * @param value The emission texture or null
         */
        set emissionColorTexture(value: Nullable<BaseTexture>);
        /**
         * Gets the emission color texture of the OpenPBR material.
         * @returns The emission texture or null
         */
        get emissionColorTexture(): Nullable<BaseTexture>;
        /**
         * Sets the ambient occlusion texture of the OpenPBR material.
         * @param value The ambient occlusion texture or null
         */
        set ambientOcclusionTexture(value: Nullable<BaseTexture>);
        /**
         * Gets the ambient occlusion texture of the OpenPBR material.
         * @returns The ambient occlusion texture or null
         */
        get ambientOcclusionTexture(): Nullable<BaseTexture>;
        /**
         * Sets the ambient occlusion texture strength by modifying the texture's level.
         * @param value The strength value (typically 0-1)
         */
        set ambientOcclusionTextureStrength(value: number);
        /**
         * Gets the ambient occlusion texture strength from the texture's level property.
         * @returns The strength value, defaults to 1.0 if no texture or level is set
         */
        get ambientOcclusionTextureStrength(): number;
        /**
         * Configures coat parameters for OpenPBR material.
         * OpenPBR coat is already built-in, so no configuration is needed.
         */
        configureCoat(): void;
        /**
         * Sets the coat weight of the OpenPBR material.
         * @param value The coat weight value (0-1)
         */
        set coatWeight(value: number);
        /**
         * Gets the coat weight of the OpenPBR material.
         * @returns The coat weight value (0-1)
         */
        get coatWeight(): number;
        /**
         * Sets the coat weight texture of the OpenPBR material.
         * @param value The coat weight texture or null
         */
        set coatWeightTexture(value: Nullable<BaseTexture>);
        /**
         * Gets the coat weight texture of the OpenPBR material.
         * @returns The coat weight texture or null
         */
        get coatWeightTexture(): Nullable<BaseTexture>;
        /**
         * Sets the coat color of the OpenPBR material.
         * @param value The coat color as a Color3
         */
        set coatColor(value: Color3);
        /**
         * Sets the coat color texture of the OpenPBR material.
         * @param value The coat color texture or null
         */
        set coatColorTexture(value: Nullable<BaseTexture>);
        /**
         * Sets the coat roughness of the OpenPBR material.
         * @param value The coat roughness value (0-1)
         */
        set coatRoughness(value: number);
        /**
         * Gets the coat roughness of the OpenPBR material.
         * @returns The coat roughness value (0-1)
         */
        get coatRoughness(): number;
        /**
         * Sets the coat roughness texture of the OpenPBR material.
         * @param value The coat roughness texture or null
         */
        set coatRoughnessTexture(value: Nullable<BaseTexture>);
        /**
         * Gets the coat roughness texture of the OpenPBR material.
         * @returns The coat roughness texture or null
         */
        get coatRoughnessTexture(): Nullable<BaseTexture>;
        /**
         * Sets the coat index of refraction (IOR) of the OpenPBR material.
         */
        set coatIor(value: number);
        /**
         * Sets the coat darkening value of the OpenPBR material.
         * @param value The coat darkening value
         */
        set coatDarkening(value: number);
        /**
         * Sets the coat darkening texture (OpenPBR: coatDarkeningTexture, no PBR equivalent)
         */
        set coatDarkeningTexture(value: Nullable<BaseTexture>);
        /**
         * Sets the coat roughness anisotropy.
         * TODO: Implementation pending OpenPBR coat anisotropy feature availability.
         * @param value The coat anisotropy intensity value
         */
        set coatRoughnessAnisotropy(value: number);
        /**
         * Gets the coat roughness anisotropy.
         * TODO: Implementation pending OpenPBR coat anisotropy feature availability.
         * @returns Currently returns 0 as coat anisotropy is not yet available
         */
        get coatRoughnessAnisotropy(): number;
        /**
         * Sets the coat tangent angle for anisotropy.
         * TODO: Implementation pending OpenPBR coat anisotropy feature availability.
         * @param value The coat anisotropy rotation angle in radians
         */
        set geometryCoatTangentAngle(value: number);
        /**
         * Sets the coat tangent texture for anisotropy.
         * TODO: Implementation pending OpenPBR coat anisotropy feature availability.
         * @param value The coat anisotropy texture or null
         */
        set geometryCoatTangentTexture(value: Nullable<BaseTexture>);
        /**
         * Gets the coat tangent texture for anisotropy.
         * TODO: Implementation pending OpenPBR coat anisotropy feature availability.
         * @returns Currently returns null as coat anisotropy is not yet available
         */
        get geometryCoatTangentTexture(): Nullable<BaseTexture>;
        /**
         * Configures transmission for OpenPBR material.
         */
        configureTransmission(): void;
        /**
         * Sets the transmission weight.
         * @param value The transmission weight value (0-1)
         */
        set transmissionWeight(value: number);
        /**
         * Sets the transmission weight texture.
         * @param value The transmission weight texture or null
         */
        set transmissionWeightTexture(value: Nullable<BaseTexture>);
        /**
         * Gets the transmission weight.
         * @returns Currently returns 0 as transmission is not yet available
         */
        get transmissionWeight(): number;
        /**
         * Sets the transmission scatter coefficient.
         * @param value The scatter coefficient as a Vector3
         */
        set transmissionScatter(value: Color3);
        /**
         * Gets the transmission scatter coefficient.
         * @returns The scatter coefficient as a Vector3
         */
        get transmissionScatter(): Color3;
        set transmissionScatterTexture(value: Nullable<BaseTexture>);
        get transmissionScatterTexture(): Nullable<BaseTexture>;
        /**
         * Sets the transmission scattering anisotropy.
         * @param value The anisotropy intensity value (-1 to 1)
         */
        set transmissionScatterAnisotropy(value: number);
        /**
         * Sets the transmission dispersion Abbe number.
         * @param value The Abbe number value
         */
        set transmissionDispersionAbbeNumber(value: number);
        /**
         * Sets the transmission dispersion scale.
         * @param value The dispersion scale value
         */
        set transmissionDispersionScale(value: number);
        /**
         * Sets the attenuation distance.
         * @param value The attenuation distance value
         */
        set transmissionDepth(value: number);
        /**
         * Gets the attenuation distance.
         */
        get transmissionDepth(): number;
        /**
         * Sets the attenuation color.
         * @param value The attenuation color as a Color3
         */
        set transmissionColor(value: Color3);
        /**
         * Gets the attenuation color.
         */
        get transmissionColor(): Color3;
        /**
         * Gets the refraction background texture
         * @returns The refraction background texture or null
         */
        get refractionBackgroundTexture(): Nullable<BaseTexture>;
        /**
         * Sets the refraction background texture
         * @param value The refraction background texture or null
         */
        set refractionBackgroundTexture(value: Nullable<BaseTexture>);
        /**
         * Sets the thickness texture.
         * @param value The thickness texture or null
         */
        set volumeThicknessTexture(value: Nullable<BaseTexture>);
        /**
         * Sets the thickness factor.
         * @param value The thickness value
         */
        set volumeThickness(value: number);
        /**
         * Configures subsurface properties for PBR material
         */
        configureSubsurface(): void;
        /**
         * Sets the extinction coefficient of the volume.
         * @param value The extinction coefficient as a Vector3
         */
        set extinctionCoefficient(value: Vector3);
        /**
         * Gets the extinction coefficient of the volume.
         */
        get extinctionCoefficient(): Vector3;
        /**
         * Sets the subsurface weight
         */
        set subsurfaceWeight(value: number);
        get subsurfaceWeight(): number;
        /**
         * Sets the subsurface weight texture
         */
        set subsurfaceWeightTexture(value: Nullable<BaseTexture>);
        /**
         * Sets the subsurface color.
         * @param value The subsurface tint color as a Color3
         */
        set subsurfaceColor(value: Color3);
        /**
         * Sets the subsurface color texture.
         * @param value The subsurface tint texture or null
         */
        set subsurfaceColorTexture(value: Nullable<BaseTexture>);
        /**
         * Sets the surface tint of the material (when using subsurface scattering)
         */
        set subsurfaceConstantTint(value: Color3);
        /**
         * Gets the surface tint of the material (when using subsurface scattering)
         */
        get subsurfaceConstantTint(): Color3;
        /**
         * Sets the surface tint texture of the material (when using subsurface scattering)
         */
        set subsurfaceConstantTintTexture(value: Nullable<BaseTexture>);
        /**
         * Gets the subsurface radius for subsurface scattering.
         * subsurfaceRadiusScale * subsurfaceRadius gives the mean free path per color channel.
         */
        get subsurfaceRadius(): number;
        /**
         * Sets the subsurface radius for subsurface scattering.
         * subsurfaceRadiusScale * subsurfaceRadius gives the mean free path per color channel.
         * @param value The subsurface radius value
         */
        set subsurfaceRadius(value: number);
        /**
         * Gets the subsurface radius scale for subsurface scattering.
         * subsurfaceRadiusScale * subsurfaceRadius gives the mean free path per color channel.
         */
        get subsurfaceRadiusScale(): Color3;
        /**
         * Sets the subsurface radius scale for subsurface scattering.
         * subsurfaceRadiusScale * subsurfaceRadius gives the mean free path per color channel.
         * @param value The subsurface radius scale as a Color3
         */
        set subsurfaceRadiusScale(value: Color3);
        /**
         * Sets the subsurface scattering anisotropy.
         * @param value The anisotropy intensity value
         */
        set subsurfaceScatterAnisotropy(value: number);
        /**
         * Configures fuzz for OpenPBR.
         * Enables fuzz and sets up proper configuration.
         */
        configureFuzz(): void;
        /**
         * Sets the fuzz weight.
         * @param value The fuzz weight value
         */
        set fuzzWeight(value: number);
        /**
         * Sets the fuzz weight texture.
         * @param value The fuzz weight texture or null
         */
        set fuzzWeightTexture(value: Nullable<BaseTexture>);
        /**
         * Sets the fuzz color.
         * @param value The fuzz color as a Color3
         */
        set fuzzColor(value: Color3);
        /**
         * Sets the fuzz color texture.
         * @param value The fuzz color texture or null
         */
        set fuzzColorTexture(value: Nullable<BaseTexture>);
        /**
         * Sets the fuzz roughness.
         * @param value The fuzz roughness value (0-1)
         */
        set fuzzRoughness(value: number);
        /**
         * Sets the fuzz roughness texture.
         * @param value The fuzz roughness texture or null
         */
        set fuzzRoughnessTexture(value: Nullable<BaseTexture>);
        /**
         * Sets the specular roughness anisotropy of the OpenPBR material.
         * @param value The anisotropy intensity value
         */
        set specularRoughnessAnisotropy(value: number);
        /**
         * Gets the specular roughness anisotropy of the OpenPBR material.
         * @returns The anisotropy intensity value
         */
        get specularRoughnessAnisotropy(): number;
        /**
         * Sets the anisotropy rotation angle.
         * @param value The anisotropy rotation angle in radians
         */
        set geometryTangentAngle(value: number);
        /**
         * Sets the geometry tangent texture for anisotropy.
         * Automatically enables using anisotropy from the tangent texture.
         * @param value The anisotropy texture or null
         */
        set geometryTangentTexture(value: Nullable<BaseTexture>);
        /**
         * Gets the geometry tangent texture for anisotropy.
         * @returns The anisotropy texture or null
         */
        get geometryTangentTexture(): Nullable<BaseTexture>;
        /**
         * Configures glTF-style anisotropy for the OpenPBR material.
         * @param useGltfStyle Whether to use glTF-style anisotropy
         */
        configureGltfStyleAnisotropy(useGltfStyle?: boolean): void;
        /**
         * Sets the thin film weight.
         * @param value The thin film weight value
         */
        set thinFilmWeight(value: number);
        /**
         * Sets the thin film IOR.
         * @param value The thin film IOR value
         */
        set thinFilmIor(value: number);
        /**
         * Sets the thin film thickness minimum.
         * @param value The minimum thickness value in nanometers
         */
        set thinFilmThicknessMinimum(value: number);
        /**
         * Sets the thin film thickness maximum.
         * @param value The maximum thickness value in nanometers
         */
        set thinFilmThicknessMaximum(value: number);
        /**
         * Sets the thin film weight texture.
         * @param value The thin film weight texture or null
         */
        set thinFilmWeightTexture(value: Nullable<BaseTexture>);
        /**
         * Sets the thin film thickness texture.
         * @param value The thin film thickness texture or null
         */
        set thinFilmThicknessTexture(value: Nullable<BaseTexture>);
        /**
         * Sets whether the OpenPBR material is unlit.
         * @param value True to make the material unlit
         */
        set unlit(value: boolean);
        /**
         * Sets the geometry opacity of the OpenPBR material.
         * @param value The opacity value (0-1)
         */
        set geometryOpacity(value: number);
        /**
         * Gets the geometry opacity of the OpenPBR material.
         * @returns The opacity value (0-1)
         */
        get geometryOpacity(): number;
        /**
         * Sets the geometry normal texture of the OpenPBR material.
         * @param value The normal texture or null
         */
        set geometryNormalTexture(value: Nullable<BaseTexture>);
        /**
         * Gets the geometry normal texture of the OpenPBR material.
         * @returns The normal texture or null
         */
        get geometryNormalTexture(): Nullable<BaseTexture>;
        /**
         * Sets the normal map inversions for the OpenPBR material.
         * Note: OpenPBR may handle normal map inversions differently or may not need them.
         * @param invertX Whether to invert the normal map on the X axis (may be ignored)
         * @param invertY Whether to invert the normal map on the Y axis (may be ignored)
         */
        setNormalMapInversions(invertX: boolean, invertY: boolean): void;
        /**
         * Sets the geometry coat normal texture of the OpenPBR material.
         * @param value The coat normal texture or null
         */
        set geometryCoatNormalTexture(value: Nullable<BaseTexture>);
        /**
         * Gets the geometry coat normal texture of the OpenPBR material.
         * @returns The coat normal texture or null
         */
        get geometryCoatNormalTexture(): Nullable<BaseTexture>;
        /**
         * Sets the geometry coat normal texture scale.
         * @param value The scale value for the coat normal texture
         */
        set geometryCoatNormalTextureScale(value: number);
    }



}
declare module BABYLON {


}
declare module BABYLON.GLTF2 {
        /**
     * Interface for material loading adapters that provides a unified OpenPBR-like interface
     * for both OpenPBR and PBR materials, eliminating conditional branches in extensions.
     */
    export interface IMaterialLoadingAdapter {
        /**
         * Gets the underlying material
         */
        readonly material: Material;
        /**
         * Whether the material should be treated as unlit
         */
        isUnlit: boolean;
        /**
         * Sets/gets the back face culling
         */
        backFaceCulling: boolean;
        /**
         * Sets/gets the two sided lighting
         */
        twoSidedLighting: boolean;
        /**
         * Sets/gets the alpha cutoff value (used for alpha test mode)
         */
        alphaCutOff: number;
        /**
         * Sets/gets whether to use alpha from albedo/base color texture
         */
        useAlphaFromBaseColorTexture: boolean;
        /**
         * Sets/Gets whether the transparency is treated as alpha coverage
         */
        transparencyAsAlphaCoverage: boolean;
        /**
         * Sets/gets the base color
         */
        baseColor: Color3;
        /**
         * Sets/gets the base color texture
         */
        baseColorTexture: Nullable<BaseTexture>;
        /**
         * Sets/gets the base diffuse roughness
         */
        baseDiffuseRoughness: number;
        /**
         * Sets/gets the base diffuse roughness texture
         */
        baseDiffuseRoughnessTexture: Nullable<BaseTexture>;
        /**
         * Sets/gets the base metalness
         */
        baseMetalness: number;
        /**
         * Sets/gets the base metalness texture
         */
        baseMetalnessTexture: Nullable<BaseTexture>;
        /**
         * Sets whether to use roughness from metallic texture green channel
         */
        useRoughnessFromMetallicTextureGreen: boolean;
        /**
         * Sets whether to use metallic from metallic texture blue channel
         */
        useMetallicFromMetallicTextureBlue: boolean;
        /**
         * Configures specular properties and enables OpenPBR BRDF model for edge color support
         * @param enableEdgeColor - Whether to enable edge color support
         */
        enableSpecularEdgeColor(enableEdgeColor?: boolean): void;
        /**
         * Sets/gets the specular weight
         */
        specularWeight: number;
        /**
         * Sets/gets the specular weight texture
         */
        specularWeightTexture: Nullable<BaseTexture>;
        /**
         * Sets/gets the specular color
         */
        specularColor: Color3;
        /**
         * Sets/gets the specular color texture
         */
        specularColorTexture: Nullable<BaseTexture>;
        /**
         * Sets/gets the specular roughness
         */
        specularRoughness: number;
        /**
         * Sets/gets the specular roughness texture
         */
        specularRoughnessTexture: Nullable<BaseTexture>;
        /**
         * Sets/gets the specular IOR
         */
        specularIor: number;
        /**
         * Sets/gets the emissive color
         */
        emissionColor: Color3;
        /**
         * Sets/gets the emissive luminance
         */
        emissionLuminance: number;
        /**
         * Sets/gets the emissive texture
         */
        emissionColorTexture: Nullable<BaseTexture>;
        /**
         * Sets/gets the ambient occlusion texture
         */
        ambientOcclusionTexture: Nullable<BaseTexture>;
        /**
         * Sets/gets the ambient occlusion texture strength/level
         */
        ambientOcclusionTextureStrength: number;
        /**
         * Configures clear coat for PBR material
         */
        configureCoat(): void;
        /**
         * Sets/gets the coat weight
         */
        coatWeight: number;
        /**
         * Sets/gets the coat weight texture
         */
        coatWeightTexture: Nullable<BaseTexture>;
        /**
         * Sets the coat color
         */
        coatColor: Color3;
        /**
         * Sets the coat color texture
         */
        coatColorTexture: Nullable<BaseTexture>;
        /**
         * Sets/gets the coat roughness
         */
        coatRoughness: number;
        /**
         * Sets/gets the coat roughness texture
         */
        coatRoughnessTexture: Nullable<BaseTexture>;
        /**
         * Sets the coat index of refraction (IOR)
         */
        coatIor: number;
        /**
         * Sets the coat darkening
         */
        coatDarkening: number;
        /**
         * Sets the coat darkening texture
         */
        coatDarkeningTexture: Nullable<BaseTexture>;
        /**
         * Sets/gets the coat roughness anisotropy
         */
        coatRoughnessAnisotropy: number;
        /**
         * Sets the coat tangent angle for anisotropy
         */
        geometryCoatTangentAngle: number;
        /**
         * Sets the coat tangent texture for anisotropy
         */
        geometryCoatTangentTexture: Nullable<BaseTexture>;
        /**
         * Sets the transmission weight
         */
        transmissionWeight: number;
        /**
         * Sets the transmission weight texture
         */
        transmissionWeightTexture: Nullable<BaseTexture>;
        /**
         * Sets the attenuation distance
         */
        transmissionDepth: number;
        /**
         * Sets the attenuation color
         */
        transmissionColor: Color3;
        /**
         * Sets the scattering coefficient
         */
        transmissionScatter: Color3;
        /**
         * Sets the scattering anisotropy (-1 to 1)
         */
        transmissionScatterAnisotropy: number;
        /**
         * Sets the dispersion Abbe number
         */
        transmissionDispersionAbbeNumber: number;
        /**
         * Sets the dispersion scale
         */
        transmissionDispersionScale: number;
        /**
         * The refraction background texture
         */
        refractionBackgroundTexture: Nullable<BaseTexture>;
        /**
         * Configures transmission for thin-surface transmission (KHR_materials_transmission)
         */
        configureTransmission(): void;
        /**
         * Sets the thickness texture
         */
        volumeThicknessTexture: Nullable<BaseTexture>;
        /**
         * Sets the thickness factor
         */
        volumeThickness: number;
        /**
         * Configures subsurface properties
         */
        configureSubsurface(): void;
        /**
         * @internal
         * Sets/gets the extinction coefficient
         */
        extinctionCoefficient: Vector3;
        /**
         * Sets/gets the subsurface weight
         */
        subsurfaceWeight: number;
        /**
         * Sets/gets the subsurface weight texture
         */
        subsurfaceWeightTexture: Nullable<BaseTexture>;
        /**
         * Sets/gets the subsurface color
         */
        subsurfaceColor: Color3;
        /**
         * Sets/gets the subsurface color texture
         */
        subsurfaceColorTexture: Nullable<BaseTexture>;
        /**
         * Sets/gets the surface tint of the material (when using subsurface scattering)
         */
        subsurfaceConstantTint: Color3;
        /**
         * Sets/gets the surface tint texture of the material (when using subsurface scattering)
         */
        subsurfaceConstantTintTexture: Nullable<BaseTexture>;
        /**
         * Sets/gets the subsurface radius (used for subsurface scattering)
         */
        subsurfaceRadius: number;
        /**
         * Sets/gets the subsurface radius scale (used for subsurface scattering)
         */
        subsurfaceRadiusScale: Color3;
        /**
         * Sets/gets the subsurface scattering anisotropy
         */
        subsurfaceScatterAnisotropy: number;
        /**
         * Configures initial settings for fuzz for material.
         */
        configureFuzz(): void;
        /**
         * Sets the fuzz weight
         */
        fuzzWeight: number;
        /**
         * Sets the fuzz weight texture
         */
        fuzzWeightTexture: Nullable<BaseTexture>;
        /**
         * Sets the fuzz color
         */
        fuzzColor: Color3;
        /**
         * Sets the fuzz color texture
         */
        fuzzColorTexture: Nullable<BaseTexture>;
        /**
         * Sets the fuzz roughness
         */
        fuzzRoughness: number;
        /**
         * Sets the fuzz roughness texture
         */
        fuzzRoughnessTexture: Nullable<BaseTexture>;
        /**
         * Sets/gets the specular roughness anisotropy
         */
        specularRoughnessAnisotropy: number;
        /**
         * Sets the anisotropy rotation
         */
        geometryTangentAngle: number;
        /**
         * Sets/gets the anisotropy texture
         */
        geometryTangentTexture: Nullable<BaseTexture>;
        /**
         * Configures glTF-style anisotropy for OpenPBR materials
         * @param useGltfStyle - Whether to use glTF-style anisotropy (default: true)
         */
        configureGltfStyleAnisotropy(useGltfStyle?: boolean): void;
        /**
         * Sets the thin film weight
         */
        thinFilmWeight: number;
        /**
         * Sets the thin film IOR
         */
        thinFilmIor: number;
        /**
         * Sets the thin film thickness minimum
         */
        thinFilmThicknessMinimum: number;
        /**
         * Sets the thin film thickness maximum
         */
        thinFilmThicknessMaximum: number;
        /**
         * Sets the thin film iridescence texture
         */
        thinFilmWeightTexture: Nullable<BaseTexture>;
        /**
         * Sets the thin film thickness texture
         */
        thinFilmThicknessTexture: Nullable<BaseTexture>;
        /**
         * Sets the unlit flag
         */
        unlit: boolean;
        /**
         * Sets/gets the geometry opacity
         */
        geometryOpacity: number;
        /**
         * Sets/gets the geometry normal texture
         */
        geometryNormalTexture: Nullable<BaseTexture>;
        /**
         * Sets the normal map inversions for PBR material only
         * @param invertX - Whether to invert the normal map on the X axis
         * @param invertY - Whether to invert the normal map on the Y axis
         */
        setNormalMapInversions(invertX: boolean, invertY: boolean): void;
        /**
         * Sets/gets the coat normal texture
         */
        geometryCoatNormalTexture: Nullable<BaseTexture>;
        /**
         * Sets the coat normal texture scale
         */
        geometryCoatNormalTextureScale: number;
    }



}
declare module BABYLON {


}
declare module BABYLON.GLTF2 {
    


}
declare module BABYLON {


}
declare module BABYLON.GLTF2.Loader {
        /**
     * Loader interface with an index field.
     */
    export interface IArrayItem {
        /**
         * The index of this item in the array.
         */
        index: number;
    }
    /**
     * Loader interface with additional members.
     */
    export interface IAccessor extends GLTF2.IAccessor, IArrayItem {
        /** @internal */
        _data?: Promise<ArrayBufferView>;
        /** @internal */
        _babylonVertexBuffer?: {
            [kind: string]: Promise<VertexBuffer>;
        };
    }
    /**
     * Loader interface with additional members.
     */
    export interface IAnimationChannel extends GLTF2.IAnimationChannel, IArrayItem {
    }
    /** @internal */
    export interface _IAnimationSamplerData {
        /** @internal */
        input: Float32Array;
        /** @internal */
        interpolation: GLTF2.AnimationSamplerInterpolation;
        /** @internal */
        output: Float32Array;
    }
    /**
     * Loader interface with additional members.
     */
    export interface IAnimationSampler extends GLTF2.IAnimationSampler, IArrayItem {
        /** @internal */
        _data?: Promise<_IAnimationSamplerData>;
    }
    /**
     * Loader interface with additional members.
     */
    export interface IAnimation extends GLTF2.IAnimation, IArrayItem {
        /** @internal */
        channels: IAnimationChannel[];
        /** @internal */
        samplers: IAnimationSampler[];
        /** @internal */
        _babylonAnimationGroup?: AnimationGroup;
    }
    /**
     * Loader interface with additional members.
     */
    export interface IBuffer extends GLTF2.IBuffer, IArrayItem {
        /** @internal */
        _data?: Promise<ArrayBufferView>;
    }
    /**
     * Loader interface with additional members.
     */
    export interface IBufferView extends GLTF2.IBufferView, IArrayItem {
        /** @internal */
        _data?: Promise<ArrayBufferView>;
        /** @internal */
        _babylonBuffer?: Promise<Buffer>;
    }
    /**
     * Loader interface with additional members.
     */
    export interface ICamera extends GLTF2.ICamera, IArrayItem {
        /** @internal */
        _babylonCamera?: Camera;
    }
    /**
     * Loader interface with additional members.
     */
    export interface IImage extends GLTF2.IImage, IArrayItem {
        /** @internal */
        _data?: Promise<ArrayBufferView>;
    }
    /**
     * Loader interface with additional members.
     */
    export interface IMaterialNormalTextureInfo extends GLTF2.IMaterialNormalTextureInfo, ITextureInfo {
    }
    /**
     * Loader interface with additional members.
     */
    export interface IMaterialOcclusionTextureInfo extends GLTF2.IMaterialOcclusionTextureInfo, ITextureInfo {
    }
    /**
     * Loader interface with additional members.
     */
    export interface IMaterialPbrMetallicRoughness extends GLTF2.IMaterialPbrMetallicRoughness {
        /** @internal */
        baseColorTexture?: ITextureInfo;
        /** @internal */
        metallicRoughnessTexture?: ITextureInfo;
    }
    /**
     * Loader interface with additional members.
     */
    export interface IMaterial extends GLTF2.IMaterial, IArrayItem {
        /** @internal */
        pbrMetallicRoughness?: IMaterialPbrMetallicRoughness;
        /** @internal */
        normalTexture?: IMaterialNormalTextureInfo;
        /** @internal */
        occlusionTexture?: IMaterialOcclusionTextureInfo;
        /** @internal */
        emissiveTexture?: ITextureInfo;
        /** @internal */
        _data?: {
            [babylonDrawMode: number]: {
                babylonMaterial: Material;
                babylonMeshes: AbstractMesh[];
                promise: Promise<void>;
            };
        };
    }
    /**
     * Loader interface with additional members.
     */
    export interface IMesh extends GLTF2.IMesh, IArrayItem {
        /** @internal */
        primitives: IMeshPrimitive[];
    }
    /**
     * Loader interface with additional members.
     */
    export interface IMeshPrimitive extends GLTF2.IMeshPrimitive, IArrayItem {
        /** @internal */
        _instanceData?: {
            babylonSourceMesh: Mesh;
            promise: Promise<any>;
        };
    }
    /**
     * Loader interface with additional members.
     */
    export interface INode extends GLTF2.INode, IArrayItem {
        /** @internal */
        parent?: INode;
        /** @internal */
        _babylonTransformNode?: TransformNode;
        /** @internal */
        _babylonTransformNodeForSkin?: TransformNode;
        /** @internal */
        _primitiveBabylonMeshes?: AbstractMesh[];
        /** @internal */
        _numMorphTargets?: number;
        /** @internal */
        _isJoint?: boolean;
    }
    /** @internal */
    export interface _ISamplerData {
        /** @internal */
        noMipMaps: boolean;
        /** @internal */
        samplingMode: number;
        /** @internal */
        wrapU: number;
        /** @internal */
        wrapV: number;
    }
    /**
     * Loader interface with additional members.
     */
    export interface ISampler extends GLTF2.ISampler, IArrayItem {
        /** @internal */
        _data?: _ISamplerData;
    }
    /**
     * Loader interface with additional members.
     */
    export interface IScene extends GLTF2.IScene, IArrayItem {
    }
    /**
     * Loader interface with additional members.
     */
    export interface ISkin extends GLTF2.ISkin, IArrayItem {
        /** @internal */
        _data?: {
            babylonSkeleton: Skeleton;
            promise: Promise<void>;
        };
    }
    /**
     * Loader interface with additional members.
     */
    export interface ITexture extends GLTF2.ITexture, IArrayItem {
        /** @internal */
        _textureInfo: ITextureInfo;
    }
    /**
     * Loader interface with additional members.
     */
    export interface ITextureInfo extends GLTF2.ITextureInfo {
        /** false or undefined if the texture holds color data (true if data are roughness, normal, ...) */
        nonColorData?: boolean;
    }
    /**
     * Loader interface with additional members.
     */
    export interface IGLTF extends GLTF2.IGLTF {
        /** @internal */
        accessors?: IAccessor[];
        /** @internal */
        animations?: IAnimation[];
        /** @internal */
        buffers?: IBuffer[];
        /** @internal */
        bufferViews?: IBufferView[];
        /** @internal */
        cameras?: ICamera[];
        /** @internal */
        images?: IImage[];
        /** @internal */
        materials?: IMaterial[];
        /** @internal */
        meshes?: IMesh[];
        /** @internal */
        nodes?: INode[];
        /** @internal */
        samplers?: ISampler[];
        /** @internal */
        scenes?: IScene[];
        /** @internal */
        skins?: ISkin[];
        /** @internal */
        textures?: ITexture[];
    }
    /**
     * Loader interface with additional members.
     */
    /** @internal */
    export interface IKHRLightsPunctual_Light extends GLTF2.IKHRLightsPunctual_Light, IArrayItem {
        /** @hidden */
        _babylonLight?: Light;
    }
    /** @internal */
    export interface IEXTLightsIES_Light extends GLTF2.IEXTLightsIES_Light, IArrayItem {
        /** @hidden */
        _babylonLight?: Light;
    }
    /** @internal */
    export interface IEXTLightsArea_Light extends GLTF2.IEXTLightsArea_Light, IArrayItem {
        /** @hidden */
        _babylonLight?: Light;
    }



}
declare module BABYLON {


}
declare module BABYLON.GLTF2 {
        interface IRegisteredGLTFExtension {
        isGLTFExtension: boolean;
        factory: GLTFExtensionFactory;
    }
    export type GLTFExtensionFactory = (loader: BABYLON.GLTF2.GLTFLoader) => BABYLON.GLTF2.IGLTFLoaderExtension | Promise<BABYLON.GLTF2.IGLTFLoaderExtension>;
    /**
     * All currently registered glTF 2.0 loader extensions.
     */
    export var registeredGLTFExtensions: ReadonlyMap<string, Readonly<IRegisteredGLTFExtension>>;
    /**
     * Registers a loader extension.
     * @param name The name of the loader extension.
     * @param isGLTFExtension If the loader extension is a glTF extension, then it will only be used for glTF files that use the corresponding glTF extension. Otherwise, it will be used for all loaded glTF files.
     * @param factory The factory function that creates the loader extension.
     */
    export function registerGLTFExtension(name: string, isGLTFExtension: boolean, factory: GLTFExtensionFactory): void;
    /**
     * Unregisters a loader extension.
     * @param name The name of the loader extension.
     * @returns A boolean indicating whether the extension has been unregistered
     */
    export function unregisterGLTFExtension(name: string): boolean;



}
declare module BABYLON {


}
declare module BABYLON.GLTF2 {
        /**
     * Interface for a glTF loader extension.
     */
    export interface IGLTFLoaderExtension extends BABYLON.IGLTFLoaderExtension, IDisposable {
        /**
         * Called after the loader state changes to LOADING.
         */
        onLoading?(): void;
        /**
         * Called after the loader state changes to READY.
         */
        onReady?(): void;
        /**
         * Define this method to modify the default behavior when loading scenes.
         * @param context The context when loading the asset
         * @param scene The glTF scene property
         * @returns A promise that resolves when the load is complete or null if not handled
         */
        loadSceneAsync?(context: string, scene: BABYLON.GLTF2.Loader.IScene): Nullable<Promise<void>>;
        /**
         * Define this method to modify the default behavior when loading nodes.
         * @param context The context when loading the asset
         * @param node The glTF node property
         * @param assign A function called synchronously after parsing the glTF properties
         * @returns A promise that resolves with the loaded Babylon transform node when the load is complete or null if not handled
         */
        loadNodeAsync?(context: string, node: BABYLON.GLTF2.Loader.INode, assign: (babylonMesh: TransformNode) => void): Nullable<Promise<TransformNode>>;
        /**
         * Define this method to modify the default behavior when loading cameras.
         * @param context The context when loading the asset
         * @param camera The glTF camera property
         * @param assign A function called synchronously after parsing the glTF properties
         * @returns A promise that resolves with the loaded Babylon camera when the load is complete or null if not handled
         */
        loadCameraAsync?(context: string, camera: BABYLON.GLTF2.Loader.ICamera, assign: (babylonCamera: Camera) => void): Nullable<Promise<Camera>>;
        /**
         * @internal
         * Define this method to modify the default behavior when loading vertex data for mesh primitives.
         * @param context The context when loading the asset
         * @param primitive The glTF mesh primitive property
         * @returns A promise that resolves with the loaded geometry when the load is complete or null if not handled
         */
        _loadVertexDataAsync?(context: string, primitive: BABYLON.GLTF2.Loader.IMeshPrimitive, babylonMesh: Mesh): Nullable<Promise<Geometry>>;
        /**
         * @internal
         * Define this method to modify the default behavior when loading data for mesh primitives.
         * @param context The context when loading the asset
         * @param name The mesh name when loading the asset
         * @param node The glTF node when loading the asset
         * @param mesh The glTF mesh when loading the asset
         * @param primitive The glTF mesh primitive property
         * @param assign A function called synchronously after parsing the glTF properties
         * @returns A promise that resolves with the loaded mesh when the load is complete or null if not handled
         */
        _loadMeshPrimitiveAsync?(context: string, name: string, node: BABYLON.GLTF2.Loader.INode, mesh: BABYLON.GLTF2.Loader.IMesh, primitive: BABYLON.GLTF2.Loader.IMeshPrimitive, assign: (babylonMesh: AbstractMesh) => void): Nullable<Promise<AbstractMesh>>;
        /**
         * @internal
         * Define this method to modify the default behavior when loading materials. Load material creates the material and then loads material properties.
         * @param context The context when loading the asset
         * @param material The glTF material property
         * @param assign A function called synchronously after parsing the glTF properties
         * @returns A promise that resolves with the loaded Babylon material when the load is complete or null if not handled
         */
        _loadMaterialAsync?(context: string, material: BABYLON.GLTF2.Loader.IMaterial, babylonMesh: Nullable<Mesh>, babylonDrawMode: number, assign: (babylonMaterial: Material) => void): Nullable<Promise<Material>>;
        /**
         * Define this method to modify the default behavior when creating materials.
         * @param context The context when loading the asset
         * @param material The glTF material property
         * @param babylonDrawMode The draw mode for the Babylon material
         * @returns The Babylon material or null if not handled
         */
        createMaterial?(context: string, material: BABYLON.GLTF2.Loader.IMaterial, babylonDrawMode: number): Nullable<Material>;
        /**
         * Define this method to modify the default behavior when loading material properties.
         * @param context The context when loading the asset
         * @param material The glTF material property
         * @param babylonMaterial The Babylon material
         * @returns A promise that resolves when the load is complete or null if not handled
         */
        loadMaterialPropertiesAsync?(context: string, material: BABYLON.GLTF2.Loader.IMaterial, babylonMaterial: Material): Nullable<Promise<void>>;
        /**
         * Define this method to modify the default behavior when loading texture infos.
         * @param context The context when loading the asset
         * @param textureInfo The glTF texture info property
         * @param assign A function called synchronously after parsing the glTF properties
         * @returns A promise that resolves with the loaded Babylon texture when the load is complete or null if not handled
         */
        loadTextureInfoAsync?(context: string, textureInfo: BABYLON.GLTF2.Loader.ITextureInfo, assign: (babylonTexture: BaseTexture) => void): Nullable<Promise<BaseTexture>>;
        /**
         * @internal
         * Define this method to modify the default behavior when loading textures.
         * @param context The context when loading the asset
         * @param texture The glTF texture property
         * @param assign A function called synchronously after parsing the glTF properties
         * @returns A promise that resolves with the loaded Babylon texture when the load is complete or null if not handled
         */
        _loadTextureAsync?(context: string, texture: BABYLON.GLTF2.Loader.ITexture, assign: (babylonTexture: BaseTexture) => void): Nullable<Promise<BaseTexture>>;
        /**
         * Define this method to modify the default behavior when loading animations.
         * @param context The context when loading the asset
         * @param animation The glTF animation property
         * @returns A promise that resolves with the loaded Babylon animation group when the load is complete or null if not handled
         */
        loadAnimationAsync?(context: string, animation: BABYLON.GLTF2.Loader.IAnimation): Nullable<Promise<AnimationGroup>>;
        /**
         * @internal
         * Define this method to modify the default behvaior when loading animation channels.
         * @param context The context when loading the asset
         * @param animationContext The context of the animation when loading the asset
         * @param animation The glTF animation property
         * @param channel The glTF animation channel property
         * @param onLoad Called for each animation loaded
         * @returns A void promise that resolves when the load is complete or null if not handled
         */
        _loadAnimationChannelAsync?(context: string, animationContext: string, animation: BABYLON.GLTF2.Loader.IAnimation, channel: BABYLON.GLTF2.Loader.IAnimationChannel, onLoad: (babylonAnimatable: IAnimatable, babylonAnimation: Animation) => void): Nullable<Promise<void>>;
        /**
         * @internal
         * Define this method to modify the default behavior when loading skins.
         * @param context The context when loading the asset
         * @param node The glTF node property
         * @param skin The glTF skin property
         * @returns A promise that resolves when the load is complete or null if not handled
         */
        _loadSkinAsync?(context: string, node: BABYLON.GLTF2.Loader.INode, skin: BABYLON.GLTF2.Loader.ISkin): Nullable<Promise<void>>;
        /**
         * @internal
         * Define this method to modify the default behavior when loading uris.
         * @param context The context when loading the asset
         * @param property The glTF property associated with the uri
         * @param uri The uri to load
         * @returns A promise that resolves with the loaded data when the load is complete or null if not handled
         */
        _loadUriAsync?(context: string, property: BABYLON.GLTF2.IProperty, uri: string): Nullable<Promise<ArrayBufferView>>;
        /**
         * Define this method to modify the default behavior when loading buffer views.
         * @param context The context when loading the asset
         * @param bufferView The glTF buffer view property
         * @returns A promise that resolves with the loaded data when the load is complete or null if not handled
         */
        loadBufferViewAsync?(context: string, bufferView: BABYLON.GLTF2.Loader.IBufferView): Nullable<Promise<ArrayBufferView>>;
        /**
         * Define this method to modify the default behavior when loading buffers.
         * @param context The context when loading the asset
         * @param buffer The glTF buffer property
         * @param byteOffset The byte offset to load
         * @param byteLength The byte length to load
         * @returns A promise that resolves with the loaded data when the load is complete or null if not handled
         */
        loadBufferAsync?(context: string, buffer: BABYLON.GLTF2.Loader.IBuffer, byteOffset: number, byteLength: number): Nullable<Promise<ArrayBufferView>>;
    }



}
declare module BABYLON {


}
declare module BABYLON.GLTF2 {
        /** @internal */
    export type GetValueFn = (target: any, source: Float32Array, offset: number, scale: number) => any;
    /** @internal */
    export function getVector3(_target: any, source: Float32Array, offset: number, scale: number): Vector3;
    /** @internal */
    export function getQuaternion(_target: any, source: Float32Array, offset: number, scale: number): Quaternion;
    /** @internal */
    export function getWeights(target: BABYLON.GLTF2.Loader.INode, source: Float32Array, offset: number, scale: number): Array<number>;
    /** @internal */
    export abstract class AnimationPropertyInfo {
        readonly type: number;
        readonly name: string;
        readonly getValue: GetValueFn;
        readonly getStride: (target: any) => number;
        /** @internal */
        constructor(type: number, name: string, getValue: GetValueFn, getStride: (target: any) => number);
        protected _buildAnimation(name: string, fps: number, keys: any[]): Animation;
        /** @internal */
        abstract buildAnimations(target: any, name: string, fps: number, keys: any[]): {
            babylonAnimatable: IAnimatable;
            babylonAnimation: Animation;
        }[];
    }
    /** @internal */
    export class TransformNodeAnimationPropertyInfo extends AnimationPropertyInfo {
        /** @internal */
        buildAnimations(target: BABYLON.GLTF2.Loader.INode, name: string, fps: number, keys: any[]): {
            babylonAnimatable: IAnimatable;
            babylonAnimation: Animation;
        }[];
    }
    /** @internal */
    export class WeightAnimationPropertyInfo extends AnimationPropertyInfo {
        buildAnimations(target: BABYLON.GLTF2.Loader.INode, name: string, fps: number, keys: any[]): {
            babylonAnimatable: IAnimatable;
            babylonAnimation: Animation;
        }[];
    }



}
declare module BABYLON {


}
declare module BABYLON.GLTF2 {
        interface IWithMetadata {
        metadata: any;
        _internalMetadata: any;
    }
    /**
     * Helper class for working with arrays when loading the glTF asset
     */
    export class ArrayItem {
        /**
         * Gets an item from the given array.
         * @param context The context when loading the asset
         * @param array The array to get the item from
         * @param index The index to the array
         * @returns The array item
         */
        static Get<T>(context: string, array: ArrayLike<T> | undefined, index: number | undefined): T;
        /**
         * Gets an item from the given array or returns null if not available.
         * @param array The array to get the item from
         * @param index The index to the array
         * @returns The array item or null
         */
        static TryGet<T>(array: ArrayLike<T> | undefined, index: number | undefined): Nullable<T>;
        /**
         * Assign an `index` field to each item of the given array.
         * @param array The array of items
         */
        static Assign(array?: BABYLON.GLTF2.Loader.IArrayItem[]): void;
    }
    /** @internal */
    export interface IAnimationTargetInfo {
        /** @internal */
        target: unknown;
        /** @internal */
        properties: Array<BABYLON.GLTF2.AnimationPropertyInfo>;
    }
    /** @internal */
    export function LoadBoundingInfoFromPositionAccessor(accessor: BABYLON.GLTF2.Loader.IAccessor): Nullable<BoundingInfo>;
    type PBRMaterialImplementation = {
        materialClass: typeof Material;
        adapterClass: new (material: Material) => BABYLON.GLTF2.IMaterialLoadingAdapter;
    };
    /**
     * The glTF 2.0 loader
     */
    export class GLTFLoader implements IGLTFLoader {
        /** @internal */
        readonly _completePromises: Promise<unknown>[];
        /** @internal */
        _assetContainer: Nullable<AssetContainer>;
        /** Storage */
        _babylonLights: Light[];
        /** @internal */
        _disableInstancedMesh: number;
        /** @internal */
        _allMaterialsDirtyRequired: boolean;
        /** @internal */
        _skipStartAnimationStep: boolean;
        private readonly _parent;
        private readonly _extensions;
        private _disposed;
        private _rootUrl;
        private _fileName;
        private _uniqueRootUrl;
        private _gltf;
        private _bin;
        private _babylonScene;
        private _rootBabylonMesh;
        private _defaultBabylonMaterialData;
        private readonly _postSceneLoadActions;
        private readonly _materialAdapterCache;
        /** @internal */
        _pbrMaterialImpl: Nullable<Readonly<PBRMaterialImplementation>> | false;
        /**
         * Test if the given material is of the same type as the one used by the loader
         * @param material The material to test
         * @returns true if the material is of the same type, false otherwise
         */
        isMatchingMaterialType(material: Nullable<Material>): boolean;
        /**
         * The default glTF sampler.
         */
        static readonly DefaultSampler: BABYLON.GLTF2.Loader.ISampler;
        /**
         * Registers a loader extension.
         * @param name The name of the loader extension.
         * @param factory The factory function that creates the loader extension.
         * @deprecated Please use registerGLTFExtension instead.
         */
        static RegisterExtension(name: string, factory: BABYLON.GLTF2.GLTFExtensionFactory): void;
        /**
         * Unregisters a loader extension.
         * @param name The name of the loader extension.
         * @returns A boolean indicating whether the extension has been unregistered
         * @deprecated Please use unregisterGLTFExtension instead.
         */
        static UnregisterExtension(name: string): boolean;
        /**
         * The object that represents the glTF JSON.
         */
        get gltf(): BABYLON.GLTF2.Loader.IGLTF;
        /**
         * The BIN chunk of a binary glTF.
         */
        get bin(): Nullable<IDataBuffer>;
        /**
         * The parent file loader.
         */
        get parent(): GLTFFileLoader;
        /**
         * The Babylon scene when loading the asset.
         */
        get babylonScene(): Scene;
        /**
         * The root Babylon node when loading the asset.
         */
        get rootBabylonMesh(): Nullable<TransformNode>;
        /**
         * The root url when loading the asset.
         */
        get rootUrl(): Nullable<string>;
        /**
         * @internal
         */
        constructor(parent: GLTFFileLoader);
        /**
         * Creates or gets a cached material loading adapter with dynamic imports
         * @param material The material to adapt
         * @returns Promise that resolves to the appropriate adapter
         * @internal
         */
        _getOrCreateMaterialAdapter(material: Material): BABYLON.GLTF2.IMaterialLoadingAdapter;
        /** @internal */
        dispose(): void;
        /**
         * @internal
         */
        importMeshAsync(meshesNames: string | readonly string[] | null | undefined, scene: Scene, container: Nullable<AssetContainer>, data: IGLTFLoaderData, rootUrl: string, onProgress?: (event: ISceneLoaderProgressEvent) => void, fileName?: string): Promise<ISceneLoaderAsyncResult>;
        /**
         * @internal
         */
        loadAsync(scene: Scene, data: IGLTFLoaderData, rootUrl: string, onProgress?: (event: ISceneLoaderProgressEvent) => void, fileName?: string): Promise<void>;
        private _loadAsync;
        private _loadData;
        private _setupData;
        private _loadExtensionsAsync;
        private _createRootNode;
        /**
         * Loads a glTF scene.
         * @param context The context when loading the asset
         * @param scene The glTF scene property
         * @returns A promise that resolves when the load is complete
         */
        loadSceneAsync(context: string, scene: BABYLON.GLTF2.Loader.IScene): Promise<void>;
        private _forEachPrimitive;
        private _getGeometries;
        private _getMeshes;
        private _getTransformNodes;
        private _getSkeletons;
        private _getAnimationGroups;
        private _startAnimations;
        /**
         * Loads a glTF node.
         * @param context The context when loading the asset
         * @param node The glTF node property
         * @param assign A function called synchronously after parsing the glTF properties
         * @returns A promise that resolves with the loaded Babylon mesh when the load is complete
         */
        loadNodeAsync(context: string, node: BABYLON.GLTF2.Loader.INode, assign?: (babylonTransformNode: TransformNode) => void): Promise<TransformNode>;
        private _loadMeshAsync;
        /**
         * @internal Define this method to modify the default behavior when loading data for mesh primitives.
         * @param context The context when loading the asset
         * @param name The mesh name when loading the asset
         * @param node The glTF node when loading the asset
         * @param mesh The glTF mesh when loading the asset
         * @param primitive The glTF mesh primitive property
         * @param assign A function called synchronously after parsing the glTF properties
         * @returns A promise that resolves with the loaded mesh when the load is complete or null if not handled
         */
        _loadMeshPrimitiveAsync(context: string, name: string, node: BABYLON.GLTF2.Loader.INode, mesh: BABYLON.GLTF2.Loader.IMesh, primitive: BABYLON.GLTF2.Loader.IMeshPrimitive, assign: (babylonMesh: AbstractMesh) => void): Promise<AbstractMesh>;
        private _loadVertexDataAsync;
        private _createMorphTargets;
        private _loadMorphTargetsAsync;
        private _loadMorphTargetVertexDataAsync;
        private static _LoadTransform;
        private _loadSkinAsync;
        private _loadBones;
        private _findSkeletonRootNode;
        private _loadBone;
        private _loadSkinInverseBindMatricesDataAsync;
        private _updateBoneMatrices;
        private _getNodeMatrix;
        /**
         * Loads a glTF camera.
         * @param context The context when loading the asset
         * @param camera The glTF camera property
         * @param assign A function called synchronously after parsing the glTF properties
         * @returns A promise that resolves with the loaded Babylon camera when the load is complete
         */
        loadCameraAsync(context: string, camera: BABYLON.GLTF2.Loader.ICamera, assign?: (babylonCamera: Camera) => void): Promise<Camera>;
        private _loadAnimationsAsync;
        /**
         * Loads a glTF animation.
         * @param context The context when loading the asset
         * @param animation The glTF animation property
         * @returns A promise that resolves with the loaded Babylon animation group when the load is complete
         */
        loadAnimationAsync(context: string, animation: BABYLON.GLTF2.Loader.IAnimation): Promise<AnimationGroup>;
        /**
         * @hidden
         * Loads a glTF animation channel.
         * @param context The context when loading the asset
         * @param animationContext The context of the animation when loading the asset
         * @param animation The glTF animation property
         * @param channel The glTF animation channel property
         * @param onLoad Called for each animation loaded
         * @returns A void promise that resolves when the load is complete
         */
        _loadAnimationChannelAsync(context: string, animationContext: string, animation: BABYLON.GLTF2.Loader.IAnimation, channel: BABYLON.GLTF2.Loader.IAnimationChannel, onLoad: (babylonAnimatable: IAnimatable, babylonAnimation: Animation) => void): Promise<void>;
        /**
         * @hidden
         * Loads a glTF animation channel.
         * @param context The context when loading the asset
         * @param animationContext The context of the animation when loading the asset
         * @param animation The glTF animation property
         * @param channel The glTF animation channel property
         * @param targetInfo The glTF target and properties
         * @param onLoad Called for each animation loaded
         * @returns A void promise that resolves when the load is complete
         */
        _loadAnimationChannelFromTargetInfoAsync(context: string, animationContext: string, animation: BABYLON.GLTF2.Loader.IAnimation, channel: BABYLON.GLTF2.Loader.IAnimationChannel, targetInfo: IObjectInfo<IInterpolationPropertyInfo[]>, onLoad: (babylonAnimatable: IAnimatable, babylonAnimation: Animation) => void): Promise<void>;
        private _loadAnimationSamplerAsync;
        /**
         * Loads a glTF buffer.
         * @param context The context when loading the asset
         * @param buffer The glTF buffer property
         * @param byteOffset The byte offset to use
         * @param byteLength The byte length to use
         * @returns A promise that resolves with the loaded data when the load is complete
         */
        loadBufferAsync(context: string, buffer: BABYLON.GLTF2.Loader.IBuffer, byteOffset: number, byteLength: number): Promise<ArrayBufferView>;
        /**
         * Loads a glTF buffer view.
         * @param context The context when loading the asset
         * @param bufferView The glTF buffer view property
         * @returns A promise that resolves with the loaded data when the load is complete
         */
        loadBufferViewAsync(context: string, bufferView: BABYLON.GLTF2.Loader.IBufferView): Promise<ArrayBufferView>;
        private _loadAccessorAsync;
        /**
         * @internal
         */
        _loadFloatAccessorAsync(context: string, accessor: BABYLON.GLTF2.Loader.IAccessor): Promise<Float32Array>;
        /**
         * @internal
         */
        _loadIndicesAccessorAsync(context: string, accessor: BABYLON.GLTF2.Loader.IAccessor): Promise<IndicesArray>;
        /**
         * @internal
         */
        _loadVertexBufferViewAsync(bufferView: BABYLON.GLTF2.Loader.IBufferView): Promise<Buffer>;
        /**
         * @internal
         */
        _loadVertexAccessorAsync(context: string, accessor: BABYLON.GLTF2.Loader.IAccessor, kind: string): Promise<VertexBuffer>;
        private _loadMaterialMetallicRoughnessPropertiesAsync;
        /**
         * @internal
         */
        _loadMaterialAsync(context: string, material: BABYLON.GLTF2.Loader.IMaterial, babylonMesh: Nullable<Mesh>, babylonDrawMode: number, assign?: (babylonMaterial: Material) => void): Promise<Material>;
        private _createDefaultMaterial;
        /**
         * Creates a Babylon material from a glTF material.
         * @param context The context when loading the asset
         * @param material The glTF material property
         * @param babylonDrawMode The draw mode for the Babylon material
         * @returns The Babylon material
         */
        createMaterial(context: string, material: BABYLON.GLTF2.Loader.IMaterial, babylonDrawMode: number): Material;
        /**
         * Loads properties from a glTF material into a Babylon material.
         * @param context The context when loading the asset
         * @param material The glTF material property
         * @param babylonMaterial The Babylon material
         * @returns A promise that resolves when the load is complete
         */
        loadMaterialPropertiesAsync(context: string, material: BABYLON.GLTF2.Loader.IMaterial, babylonMaterial: Material): Promise<void>;
        /**
         * Loads the normal, occlusion, and emissive properties from a glTF material into a Babylon material.
         * @param context The context when loading the asset
         * @param material The glTF material property
         * @param babylonMaterial The Babylon material
         * @returns A promise that resolves when the load is complete
         */
        loadMaterialBasePropertiesAsync(context: string, material: BABYLON.GLTF2.Loader.IMaterial, babylonMaterial: Material): Promise<void>;
        /**
         * Loads the alpha properties from a glTF material into a Babylon material.
         * Must be called after the setting the albedo texture of the Babylon material when the material has an albedo texture.
         * @param context The context when loading the asset
         * @param material The glTF material property
         * @param babylonMaterial The Babylon material
         */
        loadMaterialAlphaProperties(context: string, material: BABYLON.GLTF2.Loader.IMaterial, babylonMaterial: Material): void;
        /**
         * Loads a glTF texture info.
         * @param context The context when loading the asset
         * @param textureInfo The glTF texture info property
         * @param assign A function called synchronously after parsing the glTF properties
         * @returns A promise that resolves with the loaded Babylon texture when the load is complete
         */
        loadTextureInfoAsync(context: string, textureInfo: BABYLON.GLTF2.Loader.ITextureInfo, assign?: (babylonTexture: BaseTexture) => void): Promise<BaseTexture>;
        /**
         * @internal
         */
        _loadTextureAsync(context: string, texture: BABYLON.GLTF2.Loader.ITexture, assign?: (babylonTexture: BaseTexture) => void): Promise<BaseTexture>;
        /**
         * @internal
         */
        _createTextureAsync(context: string, sampler: BABYLON.GLTF2.Loader.ISampler, image: BABYLON.GLTF2.Loader.IImage, assign?: (babylonTexture: BaseTexture) => void, textureLoaderOptions?: unknown, useSRGBBuffer?: boolean): Promise<BaseTexture>;
        private _loadSampler;
        /**
         * Loads a glTF image.
         * @param context The context when loading the asset
         * @param image The glTF image property
         * @returns A promise that resolves with the loaded data when the load is complete
         */
        loadImageAsync(context: string, image: BABYLON.GLTF2.Loader.IImage): Promise<ArrayBufferView>;
        /**
         * Loads a glTF uri.
         * @param context The context when loading the asset
         * @param property The glTF property associated with the uri
         * @param uri The base64 or relative uri
         * @returns A promise that resolves with the loaded data when the load is complete
         */
        loadUriAsync(context: string, property: BABYLON.GLTF2.IProperty, uri: string): Promise<ArrayBufferView>;
        /**
         * Adds a JSON pointer to the _internalMetadata of the Babylon object at `<object>._internalMetadata.gltf.pointers`.
         * @param babylonObject the Babylon object with _internalMetadata
         * @param pointer the JSON pointer
         */
        static AddPointerMetadata(babylonObject: IWithMetadata, pointer: string): void;
        private static _GetTextureWrapMode;
        private static _GetTextureSamplingMode;
        private static _GetTypedArrayConstructor;
        private static _GetTypedArray;
        private static _GetNumComponents;
        private static _ValidateUri;
        /**
         * @internal
         */
        static _GetDrawMode(context: string, mode: number | undefined): number;
        private _compileMaterialsAsync;
        private _compileShadowGeneratorsAsync;
        private _forEachExtensions;
        private _applyExtensions;
        private _extensionsOnLoading;
        private _extensionsOnReady;
        private _extensionsLoadSceneAsync;
        private _extensionsLoadNodeAsync;
        private _extensionsLoadCameraAsync;
        private _extensionsLoadVertexDataAsync;
        private _extensionsLoadMeshPrimitiveAsync;
        private _extensionsLoadMaterialAsync;
        private _extensionsCreateMaterial;
        private _extensionsLoadMaterialPropertiesAsync;
        private _extensionsLoadTextureInfoAsync;
        private _extensionsLoadTextureAsync;
        private _extensionsLoadAnimationAsync;
        private _extensionsLoadAnimationChannelAsync;
        private _extensionsLoadSkinAsync;
        private _extensionsLoadUriAsync;
        private _extensionsLoadBufferViewAsync;
        private _extensionsLoadBufferAsync;
        /**
         * Helper method called by a loader extension to load an glTF extension.
         * @param context The context when loading the asset
         * @param property The glTF property to load the extension from
         * @param extensionName The name of the extension to load
         * @param actionAsync The action to run
         * @returns The promise returned by actionAsync or null if the extension does not exist
         */
        static LoadExtensionAsync<TExtension = unknown, TResult = void>(context: string, property: BABYLON.GLTF2.IProperty, extensionName: string, actionAsync: (extensionContext: string, extension: TExtension) => Nullable<Promise<TResult>>): Nullable<Promise<TResult>>;
        /**
         * Helper method called by a loader extension to load a glTF extra.
         * @param context The context when loading the asset
         * @param property The glTF property to load the extra from
         * @param extensionName The name of the extension to load
         * @param actionAsync The action to run
         * @returns The promise returned by actionAsync or null if the extra does not exist
         */
        static LoadExtraAsync<TExtra = unknown, TResult = void>(context: string, property: BABYLON.GLTF2.IProperty, extensionName: string, actionAsync: (extraContext: string, extra: TExtra) => Nullable<Promise<TResult>>): Nullable<Promise<TResult>>;
        /**
         * Checks for presence of an extension.
         * @param name The name of the extension to check
         * @returns A boolean indicating the presence of the given extension name in `extensionsUsed`
         */
        isExtensionUsed(name: string): boolean;
        /**
         * Increments the indentation level and logs a message.
         * @param message The message to log
         */
        logOpen(message: string): void;
        /**
         * Decrements the indentation level.
         */
        logClose(): void;
        /**
         * Logs a message
         * @param message The message to log
         */
        log(message: string): void;
        /**
         * Starts a performance counter.
         * @param counterName The name of the performance counter
         */
        startPerformanceCounter(counterName: string): void;
        /**
         * Ends a performance counter.
         * @param counterName The name of the performance counter
         */
        endPerformanceCounter(counterName: string): void;
    }



}
declare module BABYLON {


}
declare module BABYLON.GLTF2.Loader.Extensions {
        export interface IGLTFObjectModelTree {
        cameras: IGLTFObjectModelTreeCamerasObject;
        nodes: IGLTFObjectModelTreeNodesObject;
        materials: IGLTFObjectModelTreeMaterialsObject;
        extensions: IGLTFObjectModelTreeExtensionsObject;
        animations: {
            length: IObjectAccessor<BABYLON.GLTF2.Loader.IAnimation[], AnimationGroup[], number>;
            __array__: {};
        };
        meshes: {
            length: IObjectAccessor<BABYLON.GLTF2.Loader.IMesh[], (Mesh | undefined)[], number>;
            __array__: {};
        };
    }
    export interface IGLTFObjectModelTreeNodesObject<GLTFTargetType = BABYLON.GLTF2.Loader.INode, BabylonTargetType = TransformNode> {
        length: IObjectAccessor<GLTFTargetType[], BabylonTargetType[], number>;
        __array__: {
            __target__: boolean;
            translation: IObjectAccessor<GLTFTargetType, BabylonTargetType, Vector3>;
            rotation: IObjectAccessor<GLTFTargetType, BabylonTargetType, Quaternion>;
            scale: IObjectAccessor<GLTFTargetType, BabylonTargetType, Vector3>;
            matrix: IObjectAccessor<GLTFTargetType, BabylonTargetType, Matrix>;
            globalMatrix: IObjectAccessor<GLTFTargetType, BabylonTargetType, Matrix>;
            weights: {
                length: IObjectAccessor<GLTFTargetType, BabylonTargetType, number>;
                __array__: {
                    __target__: boolean;
                } & IObjectAccessor<GLTFTargetType, BabylonTargetType, number>;
            } & IObjectAccessor<GLTFTargetType, BabylonTargetType, number[]>;
            extensions: {
                EXT_lights_ies?: {
                    multiplier: IObjectAccessor<BABYLON.GLTF2.Loader.INode, Light, number>;
                    color: IObjectAccessor<BABYLON.GLTF2.Loader.INode, Light, Color3>;
                };
                KHR_node_visibility?: {
                    visible: IObjectAccessor<BABYLON.GLTF2.Loader.INode, Mesh, boolean>;
                };
            };
        };
    }
    export interface IGLTFObjectModelTreeCamerasObject {
        __array__: {
            __target__: boolean;
            orthographic: {
                xmag: IObjectAccessor<BABYLON.GLTF2.Loader.ICamera, BABYLON.GLTF2.Loader.ICamera, Vector2>;
                ymag: IObjectAccessor<BABYLON.GLTF2.Loader.ICamera, BABYLON.GLTF2.Loader.ICamera, Vector2>;
                zfar: IObjectAccessor<BABYLON.GLTF2.Loader.ICamera, BABYLON.GLTF2.Loader.ICamera, number>;
                znear: IObjectAccessor<BABYLON.GLTF2.Loader.ICamera, BABYLON.GLTF2.Loader.ICamera, number>;
            };
            perspective: {
                yfov: IObjectAccessor<BABYLON.GLTF2.Loader.ICamera, BABYLON.GLTF2.Loader.ICamera, number>;
                zfar: IObjectAccessor<BABYLON.GLTF2.Loader.ICamera, BABYLON.GLTF2.Loader.ICamera, number>;
                znear: IObjectAccessor<BABYLON.GLTF2.Loader.ICamera, BABYLON.GLTF2.Loader.ICamera, number>;
                aspectRatio: IObjectAccessor<BABYLON.GLTF2.Loader.ICamera, BABYLON.GLTF2.Loader.ICamera, Nullable<number>>;
            };
        };
    }
    export interface IGLTFObjectModelTreeMaterialsObject {
        __array__: {
            __target__: boolean;
            pbrMetallicRoughness: {
                baseColorFactor: IObjectAccessor<BABYLON.GLTF2.Loader.IMaterial, PBRMaterial, Color4>;
                metallicFactor: IObjectAccessor<BABYLON.GLTF2.Loader.IMaterial, PBRMaterial, Nullable<number>>;
                roughnessFactor: IObjectAccessor<BABYLON.GLTF2.Loader.IMaterial, PBRMaterial, Nullable<number>>;
                baseColorTexture: {
                    extensions: {
                        KHR_texture_transform: ITextureDefinition;
                    };
                };
                metallicRoughnessTexture: {
                    extensions: {
                        KHR_texture_transform: ITextureDefinition;
                    };
                };
            };
            emissiveFactor: IObjectAccessor<BABYLON.GLTF2.Loader.IMaterial, PBRMaterial, Color3>;
            normalTexture: {
                scale: IObjectAccessor<BABYLON.GLTF2.Loader.IMaterial, PBRMaterial, number>;
                extensions: {
                    KHR_texture_transform: ITextureDefinition;
                };
            };
            occlusionTexture: {
                strength: IObjectAccessor<BABYLON.GLTF2.Loader.IMaterial, PBRMaterial, number>;
                extensions: {
                    KHR_texture_transform: ITextureDefinition;
                };
            };
            emissiveTexture: {
                extensions: {
                    KHR_texture_transform: ITextureDefinition;
                };
            };
            extensions: {
                KHR_materials_anisotropy: {
                    anisotropyStrength: IObjectAccessor<BABYLON.GLTF2.Loader.IMaterial, PBRMaterial, number>;
                    anisotropyRotation: IObjectAccessor<BABYLON.GLTF2.Loader.IMaterial, PBRMaterial, number>;
                    anisotropyTexture: {
                        extensions: {
                            KHR_texture_transform: ITextureDefinition;
                        };
                    };
                };
                KHR_materials_clearcoat: {
                    clearcoatFactor: IObjectAccessor<BABYLON.GLTF2.Loader.IMaterial, PBRMaterial, number>;
                    clearcoatRoughnessFactor: IObjectAccessor<BABYLON.GLTF2.Loader.IMaterial, PBRMaterial, number>;
                    clearcoatTexture: {
                        extensions: {
                            KHR_texture_transform: ITextureDefinition;
                        };
                    };
                    clearcoatNormalTexture: {
                        scale: IObjectAccessor<BABYLON.GLTF2.Loader.IMaterial, PBRMaterial, number>;
                        extensions: {
                            KHR_texture_transform: ITextureDefinition;
                        };
                    };
                    clearcoatRoughnessTexture: {
                        extensions: {
                            KHR_texture_transform: ITextureDefinition;
                        };
                    };
                };
                KHR_materials_dispersion: {
                    dispersion: IObjectAccessor<BABYLON.GLTF2.Loader.IMaterial, PBRMaterial, number>;
                };
                KHR_materials_emissive_strength: {
                    emissiveStrength: IObjectAccessor<BABYLON.GLTF2.Loader.IMaterial, PBRMaterial, number>;
                };
                KHR_materials_ior: {
                    ior: IObjectAccessor<BABYLON.GLTF2.Loader.IMaterial, PBRMaterial, number>;
                };
                KHR_materials_iridescence: {
                    iridescenceFactor: IObjectAccessor<BABYLON.GLTF2.Loader.IMaterial, PBRMaterial, number>;
                    iridescenceIor: IObjectAccessor<BABYLON.GLTF2.Loader.IMaterial, PBRMaterial, number>;
                    iridescenceThicknessMinimum: IObjectAccessor<BABYLON.GLTF2.Loader.IMaterial, PBRMaterial, number>;
                    iridescenceThicknessMaximum: IObjectAccessor<BABYLON.GLTF2.Loader.IMaterial, PBRMaterial, number>;
                    iridescenceTexture: {
                        extensions: {
                            KHR_texture_transform: ITextureDefinition;
                        };
                    };
                    iridescenceThicknessTexture: {
                        extensions: {
                            KHR_texture_transform: ITextureDefinition;
                        };
                    };
                };
                KHR_materials_sheen: {
                    sheenColorFactor: IObjectAccessor<BABYLON.GLTF2.Loader.IMaterial, PBRMaterial, Color3>;
                    sheenRoughnessFactor: IObjectAccessor<BABYLON.GLTF2.Loader.IMaterial, PBRMaterial, number>;
                    sheenColorTexture: {
                        extensions: {
                            KHR_texture_transform: ITextureDefinition;
                        };
                    };
                    sheenRoughnessTexture: {
                        extensions: {
                            KHR_texture_transform: ITextureDefinition;
                        };
                    };
                };
                KHR_materials_specular: {
                    specularFactor: IObjectAccessor<BABYLON.GLTF2.Loader.IMaterial, PBRMaterial, number>;
                    specularColorFactor: IObjectAccessor<BABYLON.GLTF2.Loader.IMaterial, PBRMaterial, Color3>;
                    specularTexture: {
                        extensions: {
                            KHR_texture_transform: ITextureDefinition;
                        };
                    };
                    specularColorTexture: {
                        extensions: {
                            KHR_texture_transform: ITextureDefinition;
                        };
                    };
                };
                KHR_materials_transmission: {
                    transmissionFactor: IObjectAccessor<BABYLON.GLTF2.Loader.IMaterial, PBRMaterial, number>;
                    transmissionTexture: {
                        extensions: {
                            KHR_texture_transform: ITextureDefinition;
                        };
                    };
                };
                KHR_materials_diffuse_transmission: {
                    diffuseTransmissionFactor: IObjectAccessor<BABYLON.GLTF2.Loader.IMaterial, PBRMaterial, number>;
                    diffuseTransmissionTexture: {
                        extensions: {
                            KHR_texture_transform: ITextureDefinition;
                        };
                    };
                    diffuseTransmissionColorFactor: IObjectAccessor<BABYLON.GLTF2.Loader.IMaterial, PBRMaterial, Nullable<Color3>>;
                    diffuseTransmissionColorTexture: {
                        extensions: {
                            KHR_texture_transform: ITextureDefinition;
                        };
                    };
                };
                KHR_materials_volume: {
                    thicknessFactor: IObjectAccessor<BABYLON.GLTF2.Loader.IMaterial, PBRMaterial, number>;
                    attenuationColor: IObjectAccessor<BABYLON.GLTF2.Loader.IMaterial, PBRMaterial, Color3>;
                    attenuationDistance: IObjectAccessor<BABYLON.GLTF2.Loader.IMaterial, PBRMaterial, number>;
                    thicknessTexture: {
                        extensions: {
                            KHR_texture_transform: ITextureDefinition;
                        };
                    };
                };
            };
        };
    }
    interface ITextureDefinition {
        offset: IObjectAccessor<BABYLON.GLTF2.Loader.IMaterial, PBRMaterial, Vector2>;
        rotation: IObjectAccessor<BABYLON.GLTF2.Loader.IMaterial, PBRMaterial, number>;
        scale: IObjectAccessor<BABYLON.GLTF2.Loader.IMaterial, PBRMaterial, Vector2>;
    }
    export interface IGLTFObjectModelTreeMeshesObject {
    }
    export interface IGLTFObjectModelTreeExtensionsObject {
        KHR_lights_punctual: {
            lights: {
                length: IObjectAccessor<BABYLON.GLTF2.Loader.IKHRLightsPunctual_Light[], Light[], number>;
                __array__: {
                    __target__: boolean;
                    color: IObjectAccessor<BABYLON.GLTF2.Loader.IKHRLightsPunctual_Light, Light, Color3>;
                    intensity: IObjectAccessor<BABYLON.GLTF2.Loader.IKHRLightsPunctual_Light, Light, number>;
                    range: IObjectAccessor<BABYLON.GLTF2.Loader.IKHRLightsPunctual_Light, Light, number>;
                    spot: {
                        innerConeAngle: IObjectAccessor<BABYLON.GLTF2.Loader.IKHRLightsPunctual_Light, Light, number>;
                        outerConeAngle: IObjectAccessor<BABYLON.GLTF2.Loader.IKHRLightsPunctual_Light, Light, number>;
                    };
                };
            };
        };
        EXT_lights_area: {
            lights: {
                length: IObjectAccessor<BABYLON.GLTF2.Loader.IEXTLightsArea_Light[], Light[], number>;
                __array__: {
                    __target__: boolean;
                    color: IObjectAccessor<BABYLON.GLTF2.Loader.IEXTLightsArea_Light, Light, Color3>;
                    intensity: IObjectAccessor<BABYLON.GLTF2.Loader.IEXTLightsArea_Light, Light, number>;
                    size: IObjectAccessor<BABYLON.GLTF2.Loader.IEXTLightsArea_Light, Light, number>;
                    rect: {
                        aspect: IObjectAccessor<BABYLON.GLTF2.Loader.IEXTLightsArea_Light, Light, number>;
                    };
                };
            };
        };
        EXT_lights_ies: {
            lights: {
                length: IObjectAccessor<BABYLON.GLTF2.Loader.IKHRLightsPunctual_Light[], Light[], number>;
            };
        };
        EXT_lights_image_based: {
            lights: {
                __array__: {
                    __target__: boolean;
                    intensity: IObjectAccessor<BABYLON.GLTF2.IEXTLightsImageBased_LightImageBased, BaseTexture, number>;
                    rotation: IObjectAccessor<BABYLON.GLTF2.IEXTLightsImageBased_LightImageBased, BaseTexture, Quaternion>;
                };
                length: IObjectAccessor<BABYLON.GLTF2.IEXTLightsImageBased_LightImageBased[], BaseTexture[], number>;
            };
        };
    }
    /**
     * get a path-to-object converter for the given glTF tree
     * @param gltf the glTF tree to use
     * @returns a path-to-object converter for the given glTF tree
     */
    export function GetPathToObjectConverter(gltf: BABYLON.GLTF2.Loader.IGLTF): BABYLON.GLTF2.Loader.Extensions.GLTFPathToObjectConverter<unknown, unknown, unknown>;
    /**
     * This function will return the object accessor for the given key in the object model
     * If the key is not found, it will return undefined
     * @param key the key to get the mapping for, for example /materials/\{\}/emissiveFactor
     * @returns an object accessor for the given key, or undefined if the key is not found
     */
    export function GetMappingForKey(key: string): IObjectAccessor | undefined;
    /**
     * Set interpolation for a specific key in the object model
     * @param key the key to set, for example /materials/\{\}/emissiveFactor
     * @param interpolation the interpolation elements array
     */
    export function SetInterpolationForKey(key: string, interpolation?: IInterpolationPropertyInfo[]): void;
    /**
     * This will ad a new object accessor in the object model at the given key.
     * Note that this will NOT change the typescript types. To do that you will need to change the interface itself (extending it in the module that uses it)
     * @param key the key to add the object accessor at. For example /cameras/\{\}/perspective/aspectRatio
     * @param accessor the object accessor to add
     */
    export function AddObjectAccessorToKey<GLTFTargetType = any, BabylonTargetType = any, BabylonValueType = any>(key: string, accessor: IObjectAccessor<GLTFTargetType, BabylonTargetType, BabylonValueType>): void;



}
declare module BABYLON {


}
declare module BABYLON.GLTF2.Loader.Extensions {
    


}
declare module BABYLON {


}
declare module BABYLON.GLTF2.Loader.Extensions {
        /**
     * Adding an exception here will break traversing through the glTF object tree.
     * This is used for properties that might not be in the glTF object model, but are optional and have a default value.
     * For example, the path /nodes/\{\}/extensions/KHR_node_visibility/visible is optional - the object can be deferred without the object fully existing.
     */
    export var OptionalPathExceptionsList: {
        regex: RegExp;
    }[];
    /**
     * A converter that takes a glTF Object Model JSON Pointer
     * and transforms it into an ObjectAccessorContainer, allowing
     * objects referenced in the glTF to be associated with their
     * respective Babylon.js objects.
     */
    export class GLTFPathToObjectConverter<T, BabylonType, BabylonValue> implements IPathToObjectConverter<IObjectAccessor<T, BabylonType, BabylonValue>> {
        private _gltf;
        private _infoTree;
        constructor(_gltf: BABYLON.GLTF2.Loader.IGLTF, _infoTree: any);
        /**
         * The pointer string is represented by a [JSON pointer](https://datatracker.ietf.org/doc/html/rfc6901).
         * See also https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/ObjectModel.adoc#core-pointers
         * <animationPointer> := /<rootNode>/<assetIndex>/<propertyPath>
         * <rootNode> := "nodes" | "materials" | "meshes" | "cameras" | "extensions"
         * <assetIndex> := <digit> | <name>
         * <propertyPath> := <extensionPath> | <standardPath>
         * <extensionPath> := "extensions"/<name>/<standardPath>
         * <standardPath> := <name> | <name>/<standardPath>
         * <name> := W+
         * <digit> := D+
         *
         * Examples:
         *  - "/nodes/0/rotation"
         * - "/nodes.length"
         *  - "/materials/2/emissiveFactor"
         *  - "/materials/2/pbrMetallicRoughness/baseColorFactor"
         *  - "/materials/2/extensions/KHR_materials_emissive_strength/emissiveStrength"
         *
         * @param path The path to convert
         * @returns The object and info associated with the path
         */
        convert(path: string): IObjectInfo<IObjectAccessor<T, BabylonType, BabylonValue>>;
    }



}
declare module BABYLON {


}
declare module BABYLON.GLTF2.Loader.Extensions {
        /**
     * Registers the built-in glTF 2.0 extension async factories, which dynamically imports and loads each glTF extension on demand (e.g. only when a glTF model uses the extension).
     */
    export function registerBuiltInGLTFExtensions(): void;



}
declare module BABYLON {


}
declare module BABYLON.GLTF2.Loader.Extensions {
        /** @internal */
    export class MSFT_sRGBFactors implements BABYLON.GLTF2.IGLTFLoaderExtension {
        /** @internal */
        readonly name = "MSFT_sRGBFactors";
        /** @internal */
        enabled: boolean;
        private _loader;
        /** @internal */
        constructor(loader: BABYLON.GLTF2.GLTFLoader);
        /** @internal */
        dispose(): void;
        /** @internal*/
        loadMaterialPropertiesAsync(context: string, material: BABYLON.GLTF2.Loader.IMaterial, babylonMaterial: Material): Nullable<Promise<void>>;
    }



}
declare module BABYLON {
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the MSFT_sRGBFactors extension.
         */
        ["MSFT_sRGBFactors"]: {};
    }

}
declare module BABYLON.GLTF2.Loader.Extensions {
        /** @internal */
    export class MSFT_minecraftMesh implements BABYLON.GLTF2.IGLTFLoaderExtension {
        /** @internal */
        readonly name = "MSFT_minecraftMesh";
        /** @internal */
        enabled: boolean;
        private _loader;
        /** @internal */
        constructor(loader: BABYLON.GLTF2.GLTFLoader);
        /** @internal */
        dispose(): void;
        /** @internal */
        loadMaterialPropertiesAsync(context: string, material: BABYLON.GLTF2.Loader.IMaterial, babylonMaterial: Material): Nullable<Promise<void>>;
    }



}
declare module BABYLON {
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the MSFT_minecraftMesh extension.
         */
        ["MSFT_minecraftMesh"]: {};
    }

}
declare module BABYLON.GLTF2.Loader.Extensions {
        /**
     * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Vendor/MSFT_lod/README.md)
     */
    export class MSFT_lod implements BABYLON.GLTF2.IGLTFLoaderExtension {
        /**
         * The name of this extension.
         */
        readonly name = "MSFT_lod";
        /**
         * Defines whether this extension is enabled.
         */
        enabled: boolean;
        /**
         * Defines a number that determines the order the extensions are applied.
         */
        order: number;
        /**
         * Maximum number of LODs to load, starting from the lowest LOD.
         */
        maxLODsToLoad: number;
        /**
         * Observable raised when all node LODs of one level are loaded.
         * The event data is the index of the loaded LOD starting from zero.
         * Dispose the loader to cancel the loading of the next level of LODs.
         */
        onNodeLODsLoadedObservable: Observable<number>;
        /**
         * Observable raised when all material LODs of one level are loaded.
         * The event data is the index of the loaded LOD starting from zero.
         * Dispose the loader to cancel the loading of the next level of LODs.
         */
        onMaterialLODsLoadedObservable: Observable<number>;
        private _loader;
        private _bufferLODs;
        private _nodeIndexLOD;
        private _nodeSignalLODs;
        private _nodePromiseLODs;
        private _nodeBufferLODs;
        private _materialIndexLOD;
        private _materialSignalLODs;
        private _materialPromiseLODs;
        private _materialBufferLODs;
        /**
         * @internal
         */
        constructor(loader: BABYLON.GLTF2.GLTFLoader);
        /** @internal */
        dispose(): void;
        /** @internal */
        onReady(): void;
        /**
         * @internal
         */
        loadSceneAsync(context: string, scene: BABYLON.GLTF2.Loader.IScene): Nullable<Promise<void>>;
        /**
         * @internal
         */
        loadNodeAsync(context: string, node: BABYLON.GLTF2.Loader.INode, assign: (babylonTransformNode: TransformNode) => void): Nullable<Promise<TransformNode>>;
        /**
         * @internal
         */
        _loadMaterialAsync(context: string, material: BABYLON.GLTF2.Loader.IMaterial, babylonMesh: Nullable<Mesh>, babylonDrawMode: number, assign: (babylonMaterial: Material) => void): Nullable<Promise<Material>>;
        /**
         * @internal
         */
        _loadUriAsync(context: string, property: BABYLON.GLTF2.IProperty, uri: string): Nullable<Promise<ArrayBufferView>>;
        /**
         * @internal
         */
        loadBufferAsync(context: string, buffer: BABYLON.GLTF2.Loader.IBuffer, byteOffset: number, byteLength: number): Nullable<Promise<ArrayBufferView>>;
        private _loadBufferLOD;
        /**
         * @returns an array of LOD properties from lowest to highest.
         * @param context
         * @param property
         * @param array
         * @param ids
         */
        private _getLODs;
        private _disposeTransformNode;
        private _disposeMaterials;
    }



}
declare module BABYLON {
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the MSFT_lod extension.
         */
        ["MSFT_lod"]: Partial<{
            /**
             * Maximum number of LODs to load, starting from the lowest LOD.
             */
            maxLODsToLoad: number;
        }>;
    }

}
declare module BABYLON.GLTF2.Loader.Extensions {
        /**
     * [Specification](https://github.com/najadojo/glTF/blob/MSFT_audio_emitter/extensions/2.0/Vendor/MSFT_audio_emitter/README.md)
     * !!! Experimental Extension Subject to Changes !!!
     */
    export class MSFT_audio_emitter implements BABYLON.GLTF2.IGLTFLoaderExtension {
        /**
         * The name of this extension.
         */
        readonly name = "MSFT_audio_emitter";
        /**
         * Defines whether this extension is enabled.
         */
        enabled: boolean;
        private _loader;
        private _clips;
        private _emitters;
        /**
         * @internal
         */
        constructor(loader: BABYLON.GLTF2.GLTFLoader);
        /** @internal */
        dispose(): void;
        /** @internal */
        onLoading(): void;
        /**
         * @internal
         */
        loadSceneAsync(context: string, scene: BABYLON.GLTF2.Loader.IScene): Nullable<Promise<void>>;
        /**
         * @internal
         */
        loadNodeAsync(context: string, node: BABYLON.GLTF2.Loader.INode, assign: (babylonTransformNode: TransformNode) => void): Nullable<Promise<TransformNode>>;
        /**
         * @internal
         */
        loadAnimationAsync(context: string, animation: BABYLON.GLTF2.Loader.IAnimation): Nullable<Promise<AnimationGroup>>;
        private _loadClipAsync;
        private _loadEmitterAsync;
        private _getEventAction;
        private _loadAnimationEventAsync;
    }



}
declare module BABYLON {
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the MSFT_audio_emitter extension.
         */
        ["MSFT_audio_emitter"]: {};
    }

}
declare module BABYLON.GLTF2.Loader.Extensions {
        /**
     * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_xmp_json_ld/README.md)
     * @since 5.0.0
     */
    export class KHR_xmp_json_ld implements BABYLON.GLTF2.IGLTFLoaderExtension {
        /**
         * The name of this extension.
         */
        readonly name = "KHR_xmp_json_ld";
        /**
         * Defines whether this extension is enabled.
         */
        enabled: boolean;
        /**
         * Defines a number that determines the order the extensions are applied.
         */
        order: number;
        private _loader;
        /**
         * @internal
         */
        constructor(loader: BABYLON.GLTF2.GLTFLoader);
        /** @internal */
        dispose(): void;
        /**
         * Called after the loader state changes to LOADING.
         */
        onLoading(): void;
    }



}
declare module BABYLON {
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the KHR_xmp_json_ld extension.
         */
        ["KHR_xmp_json_ld"]: {};
    }

}
declare module BABYLON.GLTF2.Loader.Extensions {
        /**
     * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_texture_transform/README.md)
     */
    export class KHR_texture_transform implements BABYLON.GLTF2.IGLTFLoaderExtension {
        /**
         * The name of this extension.
         */
        readonly name = "KHR_texture_transform";
        /**
         * Defines whether this extension is enabled.
         */
        enabled: boolean;
        private _loader;
        /**
         * @internal
         */
        constructor(loader: BABYLON.GLTF2.GLTFLoader);
        /** @internal */
        dispose(): void;
        /**
         * @internal
         */
        loadTextureInfoAsync(context: string, textureInfo: BABYLON.GLTF2.Loader.ITextureInfo, assign: (babylonTexture: BaseTexture) => void): Nullable<Promise<BaseTexture>>;
    }



}
declare module BABYLON {
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the KHR_texture_transform extension.
         */
        ["KHR_texture_transform"]: {};
    }

}
declare module BABYLON.GLTF2.Loader.Extensions {
        /**
     * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_texture_basisu/README.md)
     */
    export class KHR_texture_basisu implements BABYLON.GLTF2.IGLTFLoaderExtension {
        /** The name of this extension. */
        readonly name = "KHR_texture_basisu";
        /** Defines whether this extension is enabled. */
        enabled: boolean;
        private _loader;
        /**
         * @internal
         */
        constructor(loader: BABYLON.GLTF2.GLTFLoader);
        /** @internal */
        dispose(): void;
        /**
         * @internal
         */
        _loadTextureAsync(context: string, texture: BABYLON.GLTF2.Loader.ITexture, assign: (babylonTexture: BaseTexture) => void): Nullable<Promise<BaseTexture>>;
    }



}
declare module BABYLON {
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the KHR_texture_basisu extension.
         */
        ["KHR_texture_basisu"]: {};
    }

}
declare module BABYLON.GLTF2.Loader.Extensions {
        /**
     * Loader extension for KHR_node_visibility
     */
    export class KHR_node_visibility implements BABYLON.GLTF2.IGLTFLoaderExtension {
        /**
         * The name of this extension.
         */
        readonly name = "KHR_node_visibility";
        /**
         * Defines whether this extension is enabled.
         */
        enabled: boolean;
        private _loader?;
        /**
         * @internal
         */
        constructor(loader: BABYLON.GLTF2.GLTFLoader);
        onReady(): void;
        dispose(): void;
    }



}
declare module BABYLON {
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the KHR_node_visibility extension.
         */
        ["KHR_node_visibility"]: {};
    }

}
declare module BABYLON.GLTF2.Loader.Extensions {
        /**
     * Loader extension for KHR_selectability
     */
    export class KHR_node_selectability implements BABYLON.GLTF2.IGLTFLoaderExtension {
        /**
         * The name of this extension.
         */
        readonly name = "KHR_node_selectability";
        /**
         * Defines whether this extension is enabled.
         */
        enabled: boolean;
        private _loader;
        /**
         * @internal
         */
        constructor(loader: BABYLON.GLTF2.GLTFLoader);
        onReady(): Promise<void>;
        dispose(): void;
    }



}
declare module BABYLON {
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the KHR_selectability extension.
         */
        ["KHR_node_selectability"]: {};
    }

}
declare module BABYLON.GLTF2.Loader.Extensions {
        /**
     * Loader extension for KHR_node_hoverability
     * @see https://github.com/KhronosGroup/glTF/pull/2426
     */
    export class KHR_node_hoverability implements BABYLON.GLTF2.IGLTFLoaderExtension {
        /**
         * The name of this extension.
         */
        readonly name = "KHR_node_hoverability";
        /**
         * Defines whether this extension is enabled.
         */
        enabled: boolean;
        private _loader;
        /**
         * @internal
         */
        constructor(loader: BABYLON.GLTF2.GLTFLoader);
        onReady(): Promise<void>;
        dispose(): void;
    }



}
declare module BABYLON {
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the KHR_node_hoverability extension.
         */
        ["KHR_node_hoverability"]: {};
    }

}
declare module BABYLON.GLTF2.Loader.Extensions {
        /**
     * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_mesh_quantization/README.md)
     */
    export class KHR_mesh_quantization implements BABYLON.GLTF2.IGLTFLoaderExtension {
        /**
         * The name of this extension.
         */
        readonly name = "KHR_mesh_quantization";
        /**
         * Defines whether this extension is enabled.
         */
        enabled: boolean;
        /**
         * @internal
         */
        constructor(loader: BABYLON.GLTF2.GLTFLoader);
        /** @internal */
        dispose(): void;
    }



}
declare module BABYLON {
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the KHR_mesh_quantization extension.
         */
        ["KHR_mesh_quantization"]: {};
    }

}
declare module BABYLON.GLTF2.Loader.Extensions {
        /**
     * TODO: In-progress specification
     * [Specification](https://github.com/KhronosGroup/glTF/blob/7ea427ed55d44427e83c0a6d1c87068b1a4151c5/extensions/2.0/Khronos/KHR_materials_volume_scatter/README.md)
     * @experimental
     * @since 9.0.0
     */
    export class KHR_materials_volume_scatter implements BABYLON.GLTF2.IGLTFLoaderExtension {
        /**
         * The name of this extension.
         */
        readonly name = "KHR_materials_volume_scatter";
        /**
         * Defines whether this extension is enabled.
         */
        enabled: boolean;
        /**
         * Defines a number that determines the order the extensions are applied.
         */
        order: number;
        private _loader;
        /**
         * @internal
         */
        constructor(loader: BABYLON.GLTF2.GLTFLoader);
        /** @internal */
        dispose(): void;
        /**
         * @internal
         */
        loadMaterialPropertiesAsync(context: string, material: BABYLON.GLTF2.Loader.IMaterial, babylonMaterial: Material): Nullable<Promise<void>>;
        private _loadVolumePropertiesAsync;
    }



}
declare module BABYLON {
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the KHR_materials_volume_scatter extension.
         */
        ["KHR_materials_volume_scatter"]: {};
    }

}
declare module BABYLON.GLTF2.Loader.Extensions {
        /**
     * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_volume/README.md)
     * @since 5.0.0
     */
    export class KHR_materials_volume implements BABYLON.GLTF2.IGLTFLoaderExtension {
        /**
         * The name of this extension.
         */
        readonly name = "KHR_materials_volume";
        /**
         * Defines whether this extension is enabled.
         */
        enabled: boolean;
        /**
         * Defines a number that determines the order the extensions are applied.
         */
        order: number;
        private _loader;
        /**
         * @internal
         */
        constructor(loader: BABYLON.GLTF2.GLTFLoader);
        /** @internal */
        dispose(): void;
        /**
         * @internal
         */
        loadMaterialPropertiesAsync(context: string, material: BABYLON.GLTF2.Loader.IMaterial, babylonMaterial: Material): Nullable<Promise<void>>;
        private _loadVolumePropertiesAsync;
    }



}
declare module BABYLON {
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the KHR_materials_volume extension.
         */
        ["KHR_materials_volume"]: {};
    }

}
declare module BABYLON.GLTF2.Loader.Extensions {
        /**
     * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_variants/README.md)
     */
    export class KHR_materials_variants implements BABYLON.GLTF2.IGLTFLoaderExtension {
        /**
         * The name of this extension.
         */
        readonly name = "KHR_materials_variants";
        /**
         * Defines whether this extension is enabled.
         */
        enabled: boolean;
        private _loader;
        private _variants?;
        /**
         * @internal
         */
        constructor(loader: BABYLON.GLTF2.GLTFLoader);
        /** @internal */
        dispose(): void;
        /**
         * Gets the list of available variant names for this asset.
         * @param rootNode The glTF root node
         * @returns the list of all the variant names for this model
         */
        static GetAvailableVariants(rootNode: TransformNode): string[];
        /**
         * Gets the list of available variant names for this asset.
         * @param rootNode The glTF root node
         * @returns the list of all the variant names for this model
         */
        getAvailableVariants(rootNode: TransformNode): string[];
        /**
         * Select a variant given a variant name or a list of variant names.
         * @param rootNode The glTF root node
         * @param variantName The variant name(s) to select.
         */
        static SelectVariant(rootNode: TransformNode, variantName: string | string[]): void;
        /**
         * Select a variant given a variant name or a list of variant names.
         * @param rootNode The glTF root node
         * @param variantName The variant name(s) to select.
         */
        selectVariant(rootNode: TransformNode, variantName: string | string[]): void;
        /**
         * Reset back to the original before selecting a variant.
         * @param rootNode The glTF root node
         */
        static Reset(rootNode: TransformNode): void;
        /**
         * Reset back to the original before selecting a variant.
         * @param rootNode The glTF root node
         */
        reset(rootNode: TransformNode): void;
        /**
         * Gets the last selected variant name(s) or null if original.
         * @param rootNode The glTF root node
         * @returns The selected variant name(s).
         */
        static GetLastSelectedVariant(rootNode: TransformNode): Nullable<string | string[]>;
        /**
         * Gets the last selected variant name(s) or null if original.
         * @param rootNode The glTF root node
         * @returns The selected variant name(s).
         */
        getLastSelectedVariant(rootNode: TransformNode): Nullable<string | string[]>;
        private static _GetExtensionMetadata;
        /** @internal */
        onLoading(): void;
        /** @internal */
        onReady(): void;
        /**
         * @internal
         */
        _loadMeshPrimitiveAsync(context: string, name: string, node: BABYLON.GLTF2.Loader.INode, mesh: BABYLON.GLTF2.Loader.IMesh, primitive: BABYLON.GLTF2.Loader.IMeshPrimitive, assign: (babylonMesh: AbstractMesh) => void): Nullable<Promise<AbstractMesh>>;
    }



}
declare module BABYLON {
    type MaterialVariantsController = {
        /**
         * The list of available variant names for this asset.
         */
        readonly variants: readonly string[];
        /**
         * Gets or sets the selected variant.
         */
        selectedVariant: string;
    };
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the KHR_materials_variants extension.
         */
        ["KHR_materials_variants"]: Partial<{
            /**
             * Specifies the name of the variant that should be selected by default.
             */
            defaultVariant: string;
            /**
             * Defines a callback that will be called if material variants are loaded.
             * @experimental
             */
            onLoaded: (controller: MaterialVariantsController) => void;
        }>;
    }

}
declare module BABYLON.GLTF2.Loader.Extensions {
        /**
     * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_unlit/README.md)
     */
    export class KHR_materials_unlit implements BABYLON.GLTF2.IGLTFLoaderExtension {
        /**
         * The name of this extension.
         */
        readonly name = "KHR_materials_unlit";
        /**
         * Defines whether this extension is enabled.
         */
        enabled: boolean;
        /**
         * Defines a number that determines the order the extensions are applied.
         */
        order: number;
        private _loader;
        /**
         * @internal
         */
        constructor(loader: BABYLON.GLTF2.GLTFLoader);
        /** @internal */
        dispose(): void;
        /**
         * @internal
         */
        loadMaterialPropertiesAsync(context: string, material: BABYLON.GLTF2.Loader.IMaterial, babylonMaterial: Material): Nullable<Promise<void>>;
        private _loadUnlitPropertiesAsync;
    }



}
declare module BABYLON {
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the KHR_materials_unlit extension.
         */
        ["KHR_materials_unlit"]: {};
    }

}
declare module BABYLON.GLTF2.Loader.Extensions {
        /**
     * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_transmission/README.md)
     */
    export class KHR_materials_transmission implements BABYLON.GLTF2.IGLTFLoaderExtension {
        /**
         * The name of this extension.
         */
        readonly name = "KHR_materials_transmission";
        /**
         * Defines whether this extension is enabled.
         */
        enabled: boolean;
        /**
         * Defines a number that determines the order the extensions are applied.
         */
        order: number;
        private _loader;
        /**
         * @internal
         */
        constructor(loader: BABYLON.GLTF2.GLTFLoader);
        /** @internal */
        dispose(): void;
        /**
         * @internal
         */
        loadMaterialPropertiesAsync(context: string, material: BABYLON.GLTF2.Loader.IMaterial, babylonMaterial: Material): Nullable<Promise<void>>;
        private _loadTransparentPropertiesAsync;
    }



}
declare module BABYLON {
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the KHR_materials_transmission extension.
         */
        ["KHR_materials_transmission"]: {};
    }

}
declare module BABYLON.GLTF2.Loader.Extensions {
        /**
     * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_specular/README.md)
     */
    export class KHR_materials_specular implements BABYLON.GLTF2.IGLTFLoaderExtension {
        /**
         * The name of this extension.
         */
        readonly name = "KHR_materials_specular";
        /**
         * Defines whether this extension is enabled.
         */
        enabled: boolean;
        /**
         * Defines a number that determines the order the extensions are applied.
         */
        order: number;
        private _loader;
        /**
         * @internal
         */
        constructor(loader: BABYLON.GLTF2.GLTFLoader);
        /** @internal */
        dispose(): void;
        /**
         * @internal
         */
        loadMaterialPropertiesAsync(context: string, material: BABYLON.GLTF2.Loader.IMaterial, babylonMaterial: Material): Nullable<Promise<void>>;
        private _loadSpecularPropertiesAsync;
    }



}
declare module BABYLON {
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the KHR_materials_specular extension.
         */
        ["KHR_materials_specular"]: {};
    }

}
declare module BABYLON.GLTF2.Loader.Extensions {
        /**
     * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_sheen/README.md)
     * [Playground Sample](https://www.babylonjs-playground.com/frame.html#BNIZX6#4)
     */
    export class KHR_materials_sheen implements BABYLON.GLTF2.IGLTFLoaderExtension {
        /**
         * The name of this extension.
         */
        readonly name = "KHR_materials_sheen";
        /**
         * Defines whether this extension is enabled.
         */
        enabled: boolean;
        /**
         * Defines a number that determines the order the extensions are applied.
         */
        order: number;
        private _loader;
        /**
         * @internal
         */
        constructor(loader: BABYLON.GLTF2.GLTFLoader);
        /** @internal */
        dispose(): void;
        /**
         * @internal
         */
        loadMaterialPropertiesAsync(context: string, material: BABYLON.GLTF2.Loader.IMaterial, babylonMaterial: Material): Nullable<Promise<void>>;
        private _loadSheenPropertiesAsync;
    }



}
declare module BABYLON {
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the KHR_materials_sheen extension.
         */
        ["KHR_materials_sheen"]: {};
    }

}
declare module BABYLON.GLTF2.Loader.Extensions {
        /**
     * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Archived/KHR_materials_pbrSpecularGlossiness/README.md)
     */
    export class KHR_materials_pbrSpecularGlossiness implements BABYLON.GLTF2.IGLTFLoaderExtension {
        /**
         * The name of this extension.
         */
        readonly name = "KHR_materials_pbrSpecularGlossiness";
        /**
         * Defines whether this extension is enabled.
         */
        enabled: boolean;
        /**
         * Defines a number that determines the order the extensions are applied.
         */
        order: number;
        private _loader;
        /**
         * @internal
         */
        constructor(loader: BABYLON.GLTF2.GLTFLoader);
        /** @internal */
        dispose(): void;
        /**
         * @internal
         */
        loadMaterialPropertiesAsync(context: string, material: BABYLON.GLTF2.Loader.IMaterial, babylonMaterial: Material): Nullable<Promise<void>>;
        private _loadSpecularGlossinessPropertiesAsync;
    }



}
declare module BABYLON {
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the KHR_materials_pbrSpecularGlossiness extension.
         */
        ["KHR_materials_pbrSpecularGlossiness"]: {};
    }

}
declare module BABYLON.GLTF2.Loader.Extensions {
        /**
     * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_iridescence/README.md)
     */
    export class KHR_materials_iridescence implements BABYLON.GLTF2.IGLTFLoaderExtension {
        /**
         * The name of this extension.
         */
        readonly name = "KHR_materials_iridescence";
        /**
         * Defines whether this extension is enabled.
         */
        enabled: boolean;
        /**
         * Defines a number that determines the order the extensions are applied.
         */
        order: number;
        private _loader;
        /**
         * @internal
         */
        constructor(loader: BABYLON.GLTF2.GLTFLoader);
        /** @internal */
        dispose(): void;
        /**
         * @internal
         */
        loadMaterialPropertiesAsync(context: string, material: BABYLON.GLTF2.Loader.IMaterial, babylonMaterial: Material): Nullable<Promise<void>>;
        private _loadIridescencePropertiesAsync;
    }



}
declare module BABYLON {
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the KHR_materials_iridescence extension.
         */
        ["KHR_materials_iridescence"]: {};
    }

}
declare module BABYLON.GLTF2.Loader.Extensions {
        /**
     * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_ior/README.md)
     */
    export class KHR_materials_ior implements BABYLON.GLTF2.IGLTFLoaderExtension {
        /**
         * Default ior Value from the spec.
         */
        private static readonly _DEFAULT_IOR;
        /**
         * The name of this extension.
         */
        readonly name = "KHR_materials_ior";
        /**
         * Defines whether this extension is enabled.
         */
        enabled: boolean;
        /**
         * Defines a number that determines the order the extensions are applied.
         */
        order: number;
        private _loader;
        /**
         * @internal
         */
        constructor(loader: BABYLON.GLTF2.GLTFLoader);
        /** @internal */
        dispose(): void;
        /**
         * @internal
         */
        loadMaterialPropertiesAsync(context: string, material: BABYLON.GLTF2.Loader.IMaterial, babylonMaterial: Material): Nullable<Promise<void>>;
        private _loadIorPropertiesAsync;
    }



}
declare module BABYLON {
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the KHR_materials_ior extension.
         */
        ["KHR_materials_ior"]: {};
    }

}
declare module BABYLON.GLTF2.Loader.Extensions {
        /**
     * [Specification](https://github.com/KhronosGroup/glTF/blob/9734e44accd0dfb986ec5f376117aa00192745fe/extensions/2.0/Khronos/KHR_materials_fuzz/README.md)
     * @experimental
     */
    export class KHR_materials_fuzz implements BABYLON.GLTF2.IGLTFLoaderExtension {
        /**
         * The name of this extension.
         */
        readonly name = "KHR_materials_fuzz";
        /**
         * Defines whether this extension is enabled.
         */
        enabled: boolean;
        /**
         * Defines a number that determines the order the extensions are applied.
         */
        order: number;
        private _loader;
        /**
         * @internal
         */
        constructor(loader: BABYLON.GLTF2.GLTFLoader);
        /** @internal */
        dispose(): void;
        /**
         * @internal
         */
        loadMaterialPropertiesAsync(context: string, material: BABYLON.GLTF2.Loader.IMaterial, babylonMaterial: Material): Nullable<Promise<void>>;
        private _loadFuzzPropertiesAsync;
    }



}
declare module BABYLON {
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the KHR_materials_fuzz extension.
         */
        ["KHR_materials_fuzz"]: {};
    }

}
declare module BABYLON.GLTF2.Loader.Extensions {
        /**
     * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_emissive_strength/README.md)
     */
    export class KHR_materials_emissive_strength implements BABYLON.GLTF2.IGLTFLoaderExtension {
        /**
         * The name of this extension.
         */
        readonly name = "KHR_materials_emissive_strength";
        /**
         * Defines whether this extension is enabled.
         */
        enabled: boolean;
        /**
         * Defines a number that determines the order the extensions are applied.
         */
        order: number;
        private _loader;
        /**
         * @internal
         */
        constructor(loader: BABYLON.GLTF2.GLTFLoader);
        /** @internal */
        dispose(): void;
        /**
         * @internal
         */
        loadMaterialPropertiesAsync(context: string, material: BABYLON.GLTF2.Loader.IMaterial, babylonMaterial: Material): Nullable<Promise<void>>;
        private _loadEmissiveProperties;
    }



}
declare module BABYLON {
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the KHR_materials_emissive_strength extension.
         */
        ["KHR_materials_emissive_strength"]: {};
    }

}
declare module BABYLON.GLTF2.Loader.Extensions {
        /**
     * [Specification](https://github.com/KhronosGroup/glTF/blob/87bd64a7f5e23c84b6aef2e6082069583ed0ddb4/extensions/2.0/Khronos/KHR_materials_dispersion/README.md)
     * @experimental
     */
    export class KHR_materials_dispersion implements BABYLON.GLTF2.IGLTFLoaderExtension {
        /**
         * The name of this extension.
         */
        readonly name = "KHR_materials_dispersion";
        /**
         * Defines whether this extension is enabled.
         */
        enabled: boolean;
        /**
         * Defines a number that determines the order the extensions are applied.
         */
        order: number;
        private _loader;
        /**
         * @internal
         */
        constructor(loader: BABYLON.GLTF2.GLTFLoader);
        /** @internal */
        dispose(): void;
        /**
         * @internal
         */
        loadMaterialPropertiesAsync(context: string, material: BABYLON.GLTF2.Loader.IMaterial, babylonMaterial: Material): Nullable<Promise<void>>;
        private _loadDispersionPropertiesAsync;
    }



}
declare module BABYLON {
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the KHR_materials_dispersion extension.
         */
        ["KHR_materials_dispersion"]: {};
    }

}
declare module BABYLON.GLTF2.Loader.Extensions {
        /**
     * [Proposed Specification](https://github.com/KhronosGroup/glTF/pull/1825)
     * !!! Experimental Extension Subject to Changes !!!
     */
    export class KHR_materials_diffuse_transmission implements BABYLON.GLTF2.IGLTFLoaderExtension {
        /**
         * The name of this extension.
         */
        readonly name = "KHR_materials_diffuse_transmission";
        /**
         * Defines whether this extension is enabled.
         */
        enabled: boolean;
        /**
         * Defines a number that determines the order the extensions are applied.
         */
        order: number;
        private _loader;
        /**
         * @internal
         */
        constructor(loader: BABYLON.GLTF2.GLTFLoader);
        /** @internal */
        dispose(): void;
        /**
         * @internal
         */
        loadMaterialPropertiesAsync(context: string, material: BABYLON.GLTF2.Loader.IMaterial, babylonMaterial: Material): Nullable<Promise<void>>;
        private _loadTranslucentPropertiesAsync;
    }



}
declare module BABYLON {
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the KHR_materials_diffuse_transmission extension.
         */
        ["KHR_materials_diffuse_transmission"]: {};
    }

}
declare module BABYLON.GLTF2.Loader.Extensions {
        /**
     * [Specification](https://github.com/KhronosGroup/glTF/blob/b102d2d2b40d44a8776800bb2bf85e218853c17d/extensions/2.0/Khronos/KHR_materials_diffuse_roughness/README.md)
     * @experimental
     */
    export class KHR_materials_diffuse_roughness implements BABYLON.GLTF2.IGLTFLoaderExtension {
        /**
         * The name of this extension.
         */
        readonly name = "KHR_materials_diffuse_roughness";
        /**
         * Defines whether this extension is enabled.
         */
        enabled: boolean;
        /**
         * Defines a number that determines the order the extensions are applied.
         */
        order: number;
        private _loader;
        /**
         * @internal
         */
        constructor(loader: BABYLON.GLTF2.GLTFLoader);
        /** @internal */
        dispose(): void;
        /**
         * @internal
         */
        loadMaterialPropertiesAsync(context: string, material: BABYLON.GLTF2.Loader.IMaterial, babylonMaterial: Material): Nullable<Promise<void>>;
        private _loadDiffuseRoughnessPropertiesAsync;
    }



}
declare module BABYLON {
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the KHR_materials_diffuse_roughness extension.
         */
        ["KHR_materials_diffuse_roughness"]: {};
    }

}
declare module BABYLON.GLTF2.Loader.Extensions {
        /**
     * [Specification](https://github.com/KhronosGroup/glTF/blob/6cb2cb84b504c245c49cf2e9a8ae16d26f72ac97/extensions/2.0/Khronos/KHR_materials_coat/README.md)
     * @experimental
     */
    export class KHR_materials_coat implements BABYLON.GLTF2.IGLTFLoaderExtension {
        /**
         * The name of this extension.
         */
        readonly name = "KHR_materials_coat";
        /**
         * Defines whether this extension is enabled.
         */
        enabled: boolean;
        /**
         * Defines a number that determines the order the extensions are applied.
         */
        order: number;
        private _loader;
        /**
         * Defines whether the KHR_materials_openpbr extension is used, indicating that
         * the material should be interpreted as OpenPBR (for coat, this might be necessary
         * to interpret anisotropy correctly).
         */
        private useOpenPBR;
        /**
         * @internal
         */
        constructor(loader: BABYLON.GLTF2.GLTFLoader);
        /** @internal */
        dispose(): void;
        /**
         * @internal
         */
        loadMaterialPropertiesAsync(context: string, material: BABYLON.GLTF2.Loader.IMaterial, babylonMaterial: Material): Nullable<Promise<void>>;
        private _loadCoatPropertiesAsync;
    }



}
declare module BABYLON {
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the KHR_materials_coat extension.
         */
        ["KHR_materials_coat"]: {};
    }

}
declare module BABYLON.GLTF2.Loader.Extensions {
        /**
     * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_clearcoat/README.md)
     * [Playground Sample](https://www.babylonjs-playground.com/frame.html#7F7PN6#8)
     */
    export class KHR_materials_clearcoat implements BABYLON.GLTF2.IGLTFLoaderExtension {
        /**
         * The name of this extension.
         */
        readonly name = "KHR_materials_clearcoat";
        /**
         * Defines whether this extension is enabled.
         */
        enabled: boolean;
        /**
         * Defines a number that determines the order the extensions are applied.
         */
        order: number;
        private _loader;
        /**
         * @internal
         */
        constructor(loader: BABYLON.GLTF2.GLTFLoader);
        /** @internal */
        dispose(): void;
        /**
         * @internal
         */
        loadMaterialPropertiesAsync(context: string, material: BABYLON.GLTF2.Loader.IMaterial, babylonMaterial: Material): Nullable<Promise<void>>;
        private _loadClearCoatPropertiesAsync;
    }



}
declare module BABYLON {
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the KHR_materials_clearcoat extension.
         */
        ["KHR_materials_clearcoat"]: {};
    }

}
declare module BABYLON.GLTF2.Loader.Extensions {
        /**
     * [Specification](https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_anisotropy)
     */
    export class KHR_materials_anisotropy implements BABYLON.GLTF2.IGLTFLoaderExtension {
        /**
         * The name of this extension.
         */
        readonly name = "KHR_materials_anisotropy";
        /**
         * Defines whether this extension is enabled.
         */
        enabled: boolean;
        /**
         * Defines a number that determines the order the extensions are applied.
         */
        order: number;
        private _loader;
        /**
         * @internal
         */
        constructor(loader: BABYLON.GLTF2.GLTFLoader);
        /** @internal */
        dispose(): void;
        /**
         * @internal
         */
        loadMaterialPropertiesAsync(context: string, material: BABYLON.GLTF2.Loader.IMaterial, babylonMaterial: Material): Nullable<Promise<void>>;
        private _loadAnisotropyPropertiesAsync;
    }



}
declare module BABYLON {
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the KHR_materials_anisotropy extension.
         */
        ["KHR_materials_anisotropy"]: {};
    }

}
declare module BABYLON.GLTF2.Loader.Extensions {
        /**
     * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_lights_punctual/README.md)
     */
    export class KHR_lights implements BABYLON.GLTF2.IGLTFLoaderExtension {
        /**
         * The name of this extension.
         */
        readonly name = "KHR_lights_punctual";
        /**
         * Defines whether this extension is enabled.
         */
        enabled: boolean;
        /** hidden */
        private _loader;
        private _lights?;
        /**
         * @internal
         */
        constructor(loader: BABYLON.GLTF2.GLTFLoader);
        /** @internal */
        dispose(): void;
        /** @internal */
        onLoading(): void;
        /**
         * @internal
         */
        loadNodeAsync(context: string, node: BABYLON.GLTF2.Loader.INode, assign: (babylonTransformNode: TransformNode) => void): Nullable<Promise<TransformNode>>;
    }



}
declare module BABYLON {
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the KHR_lights_punctual extension.
         */
        ["KHR_lights_punctual"]: {};
    }

}
declare module BABYLON.GLTF2.Loader.Extensions {
        /**
     * Loader extension for KHR_interactivity
     */
    export class KHR_interactivity implements BABYLON.GLTF2.IGLTFLoaderExtension {
        private _loader;
        /**
         * The name of this extension.
         */
        readonly name = "KHR_interactivity";
        /**
         * Defines whether this extension is enabled.
         */
        enabled: boolean;
        private _pathConverter?;
        /**
         * @internal
         * @param _loader
         */
        constructor(_loader: BABYLON.GLTF2.GLTFLoader);
        dispose(): void;
        onReady(): Promise<void>;
    }
    /**
     * @internal
     * populates the object model with the interactivity extension
     */
    export function _AddInteractivityObjectModel(scene: Scene): void;



}
declare module BABYLON {
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the KHR_interactivity extension.
         */
        ["KHR_interactivity"]: {};
    }

}
declare module BABYLON.GLTF2.Loader.Extensions {
        /**
     * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_draco_mesh_compression/README.md)
     */
    export class KHR_draco_mesh_compression implements BABYLON.GLTF2.IGLTFLoaderExtension {
        /**
         * The name of this extension.
         */
        readonly name = "KHR_draco_mesh_compression";
        /**
         * The draco decoder used to decode vertex data or DracoDecoder.Default if not defined
         */
        dracoDecoder?: DracoDecoder;
        /**
         * Defines whether this extension is enabled.
         */
        enabled: boolean;
        /**
         * Defines whether to use the normalized flag from the glTF accessor instead of the Draco data. Defaults to true.
         */
        useNormalizedFlagFromAccessor: boolean;
        private _loader;
        /**
         * @internal
         */
        constructor(loader: BABYLON.GLTF2.GLTFLoader);
        /** @internal */
        dispose(): void;
        /**
         * @internal
         */
        _loadVertexDataAsync(context: string, primitive: BABYLON.GLTF2.Loader.IMeshPrimitive, babylonMesh: Mesh): Nullable<Promise<Geometry>>;
    }



}
declare module BABYLON {
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the KHR_draco_mesh_compression extension.
         */
        ["KHR_draco_mesh_compression"]: {};
    }

}
declare module BABYLON.GLTF2.Loader.Extensions {
    


}
declare module BABYLON {


}
declare module BABYLON.GLTF2.Loader.Extensions {
        /**
     * [Specification PR](https://github.com/KhronosGroup/glTF/pull/2147)
     * !!! Experimental Extension Subject to Changes !!!
     */
    export class KHR_animation_pointer implements BABYLON.GLTF2.IGLTFLoaderExtension {
        /**
         * The name of this extension.
         */
        readonly name = "KHR_animation_pointer";
        private _loader;
        private _pathToObjectConverter?;
        /**
         * @internal
         */
        constructor(loader: BABYLON.GLTF2.GLTFLoader);
        /**
         * Defines whether this extension is enabled.
         */
        get enabled(): boolean;
        /** @internal */
        dispose(): void;
        /**
         * Loads a glTF animation channel.
         * @param context The context when loading the asset
         * @param animationContext The context of the animation when loading the asset
         * @param animation The glTF animation property
         * @param channel The glTF animation channel property
         * @param onLoad Called for each animation loaded
         * @returns A void promise that resolves when the load is complete or null if not handled
         */
        _loadAnimationChannelAsync(context: string, animationContext: string, animation: BABYLON.GLTF2.Loader.IAnimation, channel: BABYLON.GLTF2.Loader.IAnimationChannel, onLoad: (babylonAnimatable: IAnimatable, babylonAnimation: Animation) => void): Nullable<Promise<void>>;
    }



}
declare module BABYLON {
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the KHR_animation_pointer extension.
         */
        ["KHR_animation_pointer"]: {};
    }

}
declare module BABYLON.GLTF2.Loader.Extensions {
        /**
     * Store glTF extras (if present) in BJS objects' metadata
     */
    export class ExtrasAsMetadata implements BABYLON.GLTF2.IGLTFLoaderExtension {
        /**
         * The name of this extension.
         */
        readonly name = "ExtrasAsMetadata";
        /**
         * Defines whether this extension is enabled.
         */
        enabled: boolean;
        private _loader;
        private _assignExtras;
        /**
         * @internal
         */
        constructor(loader: BABYLON.GLTF2.GLTFLoader);
        /** @internal */
        dispose(): void;
        /**
         * @internal
         */
        loadNodeAsync(context: string, node: BABYLON.GLTF2.Loader.INode, assign: (babylonTransformNode: TransformNode) => void): Nullable<Promise<TransformNode>>;
        /**
         * @internal
         */
        loadCameraAsync(context: string, camera: BABYLON.GLTF2.Loader.ICamera, assign: (babylonCamera: Camera) => void): Nullable<Promise<Camera>>;
        /**
         * @internal
         */
        createMaterial(context: string, material: BABYLON.GLTF2.Loader.IMaterial, babylonDrawMode: number): Nullable<Material>;
        /**
         * @internal
         */
        loadAnimationAsync(context: string, animation: BABYLON.GLTF2.Loader.IAnimation): Nullable<Promise<AnimationGroup>>;
    }



}
declare module BABYLON {
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the ExtrasAsMetadata extension.
         */
        ["ExtrasAsMetadata"]: {};
    }

}
declare module BABYLON.GLTF2.Loader.Extensions {
        /**
     * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Vendor/EXT_texture_webp/README.md)
     */
    export class EXT_texture_webp implements BABYLON.GLTF2.IGLTFLoaderExtension {
        /** The name of this extension. */
        readonly name = "EXT_texture_webp";
        /** Defines whether this extension is enabled. */
        enabled: boolean;
        private _loader;
        /**
         * @internal
         */
        constructor(loader: BABYLON.GLTF2.GLTFLoader);
        /** @internal */
        dispose(): void;
        /**
         * @internal
         */
        _loadTextureAsync(context: string, texture: BABYLON.GLTF2.Loader.ITexture, assign: (babylonTexture: BaseTexture) => void): Nullable<Promise<BaseTexture>>;
    }



}
declare module BABYLON {
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the EXT_texture_webp extension.
         */
        ["EXT_texture_webp"]: {};
    }

}
declare module BABYLON.GLTF2.Loader.Extensions {
        /**
     * [glTF PR](https://github.com/KhronosGroup/glTF/pull/2235)
     * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Vendor/EXT_texture_avif/README.md)
     */
    export class EXT_texture_avif implements BABYLON.GLTF2.IGLTFLoaderExtension {
        /** The name of this extension. */
        readonly name = "EXT_texture_avif";
        /** Defines whether this extension is enabled. */
        enabled: boolean;
        private _loader;
        /**
         * @internal
         */
        constructor(loader: BABYLON.GLTF2.GLTFLoader);
        /** @internal */
        dispose(): void;
        /**
         * @internal
         */
        _loadTextureAsync(context: string, texture: BABYLON.GLTF2.Loader.ITexture, assign: (babylonTexture: BaseTexture) => void): Nullable<Promise<BaseTexture>>;
    }



}
declare module BABYLON {
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the EXT_texture_avif extension.
         */
        ["EXT_texture_avif"]: {};
    }

}
declare module BABYLON.GLTF2.Loader.Extensions {
        /**
     * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Vendor/EXT_meshopt_compression/README.md)
     *
     * This extension uses a WebAssembly decoder module from https://github.com/zeux/meshoptimizer/tree/master/js
     * @since 5.0.0
     */
    export class EXT_meshopt_compression implements BABYLON.GLTF2.IGLTFLoaderExtension {
        /**
         * The name of this extension.
         */
        readonly name = "EXT_meshopt_compression";
        /**
         * Defines whether this extension is enabled.
         */
        enabled: boolean;
        private _loader;
        /**
         * @internal
         */
        constructor(loader: BABYLON.GLTF2.GLTFLoader);
        /** @internal */
        dispose(): void;
        /**
         * @internal
         */
        loadBufferViewAsync(context: string, bufferView: BABYLON.GLTF2.Loader.IBufferView): Nullable<Promise<ArrayBufferView>>;
    }



}
declare module BABYLON {
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the EXT_meshopt_compression extension.
         */
        ["EXT_meshopt_compression"]: {};
    }

}
declare module BABYLON.GLTF2.Loader.Extensions {
        /**
     * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Vendor/EXT_mesh_gpu_instancing/README.md)
     * [Playground Sample](https://playground.babylonjs.com/#QFIGLW#9)
     */
    export class EXT_mesh_gpu_instancing implements BABYLON.GLTF2.IGLTFLoaderExtension {
        /**
         * The name of this extension.
         */
        readonly name = "EXT_mesh_gpu_instancing";
        /**
         * Defines whether this extension is enabled.
         */
        enabled: boolean;
        private _loader;
        /**
         * @internal
         */
        constructor(loader: BABYLON.GLTF2.GLTFLoader);
        /** @internal */
        dispose(): void;
        /**
         * @internal
         */
        loadNodeAsync(context: string, node: BABYLON.GLTF2.Loader.INode, assign: (babylonTransformNode: TransformNode) => void): Nullable<Promise<TransformNode>>;
    }



}
declare module BABYLON {
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the EXT_mesh_gpu_instancing extension.
         */
        ["EXT_mesh_gpu_instancing"]: {};
    }

}
declare module BABYLON.GLTF2.Loader.Extensions {
            /** @internal */
        interface IEXTLightsImageBased_LightImageBased {
            _babylonTexture?: BaseTexture;
            _loaded?: Promise<void>;
        }
    /**
     * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Vendor/EXT_lights_image_based/README.md)
     */
    export class EXT_lights_image_based implements BABYLON.GLTF2.IGLTFLoaderExtension {
        /**
         * The name of this extension.
         */
        readonly name = "EXT_lights_image_based";
        /**
         * Defines whether this extension is enabled.
         */
        enabled: boolean;
        private _loader;
        private _lights?;
        /**
         * @internal
         */
        constructor(loader: BABYLON.GLTF2.GLTFLoader);
        /** @internal */
        dispose(): void;
        /** @internal */
        onLoading(): void;
        /**
         * @internal
         */
        loadSceneAsync(context: string, scene: BABYLON.GLTF2.Loader.IScene): Nullable<Promise<void>>;
        private _loadLightAsync;
    }



}
declare module BABYLON {
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the EXT_lights_image_based extension.
         */
        ["EXT_lights_image_based"]: {};
    }

}
declare module BABYLON.GLTF2.Loader.Extensions {
        /**
     * [Specification](https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Vendor/EXT_lights_ies)
     */
    export class EXT_lights_ies implements BABYLON.GLTF2.IGLTFLoaderExtension {
        /**
         * The name of this extension.
         */
        readonly name = "EXT_lights_ies";
        /**
         * Defines whether this extension is enabled.
         */
        enabled: boolean;
        /** hidden */
        private _loader;
        private _lights?;
        /**
         * @internal
         */
        constructor(loader: BABYLON.GLTF2.GLTFLoader);
        /** @internal */
        dispose(): void;
        /** @internal */
        onLoading(): void;
        /**
         * @internal
         */
        loadNodeAsync(context: string, node: BABYLON.GLTF2.Loader.INode, assign: (babylonTransformNode: TransformNode) => void): Nullable<Promise<TransformNode>>;
    }



}
declare module BABYLON {
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the EXT_lights_ies extension.
         */
        ["EXT_lights_ies"]: {};
    }

}
declare module BABYLON.GLTF2.Loader.Extensions {
        /**
     * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Vendor/EXT_lights_area/README.md)
     */
    export class EXT_lights_area implements BABYLON.GLTF2.IGLTFLoaderExtension {
        /**
         * The name of this extension.
         */
        readonly name = "EXT_lights_area";
        /**
         * Defines whether this extension is enabled.
         */
        enabled: boolean;
        /** hidden */
        private _loader;
        private _lights?;
        /**
         * @internal
         */
        constructor(loader: BABYLON.GLTF2.GLTFLoader);
        /** @internal */
        dispose(): void;
        /** @internal */
        onLoading(): void;
        /**
         * @internal
         */
        loadNodeAsync(context: string, node: BABYLON.GLTF2.Loader.INode, assign: (babylonTransformNode: TransformNode) => void): Nullable<Promise<TransformNode>>;
    }



}
declare module BABYLON {
    interface GLTFLoaderExtensionOptions {
        /**
         * Defines options for the EXT_lights_area extension.
         */
        ["EXT_lights_area"]: {};
    }

}
declare module BABYLON.GLTF2.Loader.Extensions {
        export interface InteractivityEvent {
        eventId: string;
        eventData?: {
            eventData: boolean;
            id: string;
            type: string;
            value?: any;
        }[];
    }
    export var gltfTypeToBabylonType: {
        [key: string]: {
            length: number;
            flowGraphType: FlowGraphTypes;
            elementType: "number" | "boolean";
        };
    };
    export class InteractivityGraphToFlowGraphParser {
        private _interactivityGraph;
        private _gltf;
        _animationTargetFps: number;
        /**
         * Note - the graph should be rejected if the same type is defined twice.
         * We currently don't validate that.
         */
        private _types;
        private _mappings;
        private _staticVariables;
        private _events;
        private _internalEventsCounter;
        private _nodes;
        constructor(_interactivityGraph: BABYLON.GLTF2.IKHRInteractivity_Graph, _gltf: BABYLON.GLTF2.Loader.IGLTF, _animationTargetFps?: number);
        get arrays(): {
            types: {
                length: number;
                flowGraphType: FlowGraphTypes;
                elementType: "number" | "boolean";
            }[];
            mappings: {
                flowGraphMapping: BABYLON.GLTF2.Loader.Extensions.IGLTFToFlowGraphMapping;
                fullOperationName: string;
            }[];
            staticVariables: {
                type: FlowGraphTypes;
                value: any[];
            }[];
            events: InteractivityEvent[];
            nodes: {
                blocks: ISerializedFlowGraphBlock[];
                fullOperationName: string;
            }[];
        };
        private _parseTypes;
        private _parseDeclarations;
        private _parseVariables;
        private _parseVariable;
        private _parseEvents;
        private _parseNodes;
        private _getEmptyBlock;
        private _parseNodeConfiguration;
        private _parseNodeConnections;
        private _createNewSocketConnection;
        private _connectFlowGraphNodes;
        getVariableName(index: number): string;
        serializeToFlowGraph(): ISerializedFlowGraph;
    }



}
declare module BABYLON {


}
declare module BABYLON.GLTF2.Loader.Extensions {
    


}
declare module BABYLON {


}
declare module BABYLON.GLTF2.Loader.Extensions {
        /**
     * a configuration interface for this block
     */
    export interface IFlowGraphGLTFDataProviderBlockConfiguration extends IFlowGraphBlockConfiguration {
        /**
         * the glTF object to provide data from
         */
        glTF: BABYLON.GLTF2.Loader.IGLTF;
    }
    /**
     * a glTF-based FlowGraph block that provides arrays with babylon object, based on the glTF tree
     * Can be used, for example, to get animation index from a glTF animation
     */
    export class FlowGraphGLTFDataProvider extends FlowGraphBlock {
        /**
         * Output: an array of animation groups
         * Corresponds directly to the glTF animations array
         */
        readonly animationGroups: FlowGraphDataConnection<AnimationGroup[]>;
        /**
         * Output an array of (Transform) nodes
         * Corresponds directly to the glTF nodes array
         */
        readonly nodes: FlowGraphDataConnection<TransformNode[]>;
        constructor(config: IFlowGraphGLTFDataProviderBlockConfiguration);
        getClassName(): string;
    }



}
declare module BABYLON {


}
declare module BABYLON.GLTF2.Loader.Extensions {
        interface IGLTFToFlowGraphMappingObject {
        /**
         * The name of the property in the FlowGraph block.
         */
        name: string;
        /**
         * The type of the property in the glTF specs.
         * If not provided will be inferred.
         */
        gltfType?: string;
        /**
         * The type of the property in the FlowGraph block.
         * If not defined it equals the glTF type.
         */
        flowGraphType?: string;
        /**
         * A function that transforms the data from the glTF to the FlowGraph block.
         */
        dataTransformer?: (data: any, parser: BABYLON.GLTF2.Loader.Extensions.InteractivityGraphToFlowGraphParser) => any;
        /**
         * If the property can contain multiple values.
         */
        isArray?: boolean;
        /**
         * If the property is in the options passed to the constructor of the block.
         */
        inOptions?: boolean;
        /**
         * If the property is an index to a value.
         * if defined this will be the name of the array to find the object in.
         */
        isVariable?: boolean;
        /**
         * the name of the class type this value will be mapped to.
         * This is used if we generate more than one block for a single glTF node.
         * Defaults to the first block in the mapping.
         */
        toBlock?: FlowGraphBlockNames;
        /**
         * Used in configuration values. If defined, this will be the default value, if no value is provided.
         */
        defaultValue?: any;
    }
    export interface IGLTFToFlowGraphMapping {
        /**
         * The type of the FlowGraph block(s).
         * Typically will be a single element in an array.
         * When adding blocks defined in this module use the KHR_interactivity prefix.
         */
        blocks: (FlowGraphBlockNames | string)[];
        /**
         * The inputs of the glTF node mapped to the FlowGraph block.
         */
        inputs?: {
            /**
             * The value inputs of the glTF node mapped to the FlowGraph block.
             */
            values?: {
                [originName: string]: IGLTFToFlowGraphMappingObject;
            };
            /**
             * The flow inputs of the glTF node mapped to the FlowGraph block.
             */
            flows?: {
                [originName: string]: IGLTFToFlowGraphMappingObject;
            };
        };
        /**
         * The outputs of the glTF node mapped to the FlowGraph block.
         */
        outputs?: {
            /**
             * The value outputs of the glTF node mapped to the FlowGraph block.
             */
            values?: {
                [originName: string]: IGLTFToFlowGraphMappingObject;
            };
            /**
             * The flow outputs of the glTF node mapped to the FlowGraph block.
             */
            flows?: {
                [originName: string]: IGLTFToFlowGraphMappingObject;
            };
        };
        /**
         * The configuration of the glTF node mapped to the FlowGraph block.
         * This information is usually passed to the constructor of the block.
         */
        configuration?: {
            [originName: string]: IGLTFToFlowGraphMappingObject;
        };
        /**
         * If we generate more than one block for a single glTF node, this mapping will be used to map
         * between the flowGraph classes.
         */
        typeToTypeMapping?: {
            [originName: string]: IGLTFToFlowGraphMappingObject;
        };
        /**
         * The connections between two or more blocks.
         * This is used to connect the blocks in the graph
         */
        interBlockConnectors?: {
            /**
             * The name of the input connection in the first block.
             */
            input: string;
            /**
             * The name of the output connection in the second block.
             */
            output: string;
            /**
             * The index of the block in the array of blocks that corresponds to the input.
             */
            inputBlockIndex: number;
            /**
             * The index of the block in the array of blocks that corresponds to the output.
             */
            outputBlockIndex: number;
            /**
             * If the connection is a variable connection or a flow connection.
             */
            isVariable?: boolean;
        }[];
        /**
         * This optional function will allow to validate the node, according to the glTF specs.
         * For example, if a node has a configuration object, it must be present and correct.
         * This is a basic node-based validation.
         * This function is expected to return false and log the error if the node is not valid.
         * Note that this function can also modify the node, if needed.
         *
         * @param gltfBlock the glTF node to validate
         * @param interactivityGraph the interactivity graph
         * @param glTFObject the glTF object
         * @returns true if validated, false if not.
         */
        validation?: (gltfBlock: BABYLON.GLTF2.IKHRInteractivity_Node, interactivityGraph: BABYLON.GLTF2.IKHRInteractivity_Graph, glTFObject?: BABYLON.GLTF2.Loader.IGLTF) => {
            valid: boolean;
            error?: string;
        };
        /**
         * This is used if we need extra information for the constructor/options that is not provided directly by the glTF node.
         * This function can return more than one node, if extra nodes are needed for this block to function correctly.
         * Returning more than one block will usually happen when a json pointer was provided.
         *
         * @param gltfBlock the glTF node
         * @param declaration the declaration object
         * @param mapping the mapping object
         * @param parser the interactivity graph parser
         * @param serializedObjects the serialized objects
         * @param context the serialized flow graph context
         * @param globalGLTF the global gltf object
         * @returns an array of serialized nodes that will be added to the graph.
         */
        extraProcessor?: (gltfBlock: BABYLON.GLTF2.IKHRInteractivity_Node, declaration: BABYLON.GLTF2.IKHRInteractivity_Declaration, mapping: IGLTFToFlowGraphMapping, parser: BABYLON.GLTF2.Loader.Extensions.InteractivityGraphToFlowGraphParser, serializedObjects: ISerializedFlowGraphBlock[], context: ISerializedFlowGraphContext, globalGLTF?: BABYLON.GLTF2.Loader.IGLTF) => ISerializedFlowGraphBlock[];
    }
    export function getMappingForFullOperationName(fullOperationName: string): IGLTFToFlowGraphMapping | undefined;
    export function getMappingForDeclaration(declaration: BABYLON.GLTF2.IKHRInteractivity_Declaration, returnNoOpIfNotAvailable?: boolean): IGLTFToFlowGraphMapping | undefined;
    /**
     * This function will add new mapping to glTF interactivity.
     * Other extensions can define new types of blocks, this is the way to let interactivity know how to parse them.
     * @param key the type of node, i.e. "variable/get"
     * @param extension the extension of the interactivity operation, i.e. "KHR_selectability"
     * @param mapping The mapping object. See documentation or examples below.
     */
    export function addNewInteractivityFlowGraphMapping(key: string, extension: string, mapping: IGLTFToFlowGraphMapping): void;
    export function getAllSupportedNativeNodeTypes(): string[];
    /**
     *
     * These are the nodes from the specs:
    ### Math Nodes
    1. **Constants**
       - E (`math/E`) FlowGraphBlockNames.E
       - Pi (`math/Pi`) FlowGraphBlockNames.PI
       - Infinity (`math/Inf`) FlowGraphBlockNames.Inf
       - Not a Number (`math/NaN`) FlowGraphBlockNames.NaN
    2. **Arithmetic Nodes**
       - Absolute Value (`math/abs`) FlowGraphBlockNames.Abs
       - Sign (`math/sign`) FlowGraphBlockNames.Sign
       - Truncate (`math/trunc`) FlowGraphBlockNames.Trunc
       - Floor (`math/floor`) FlowGraphBlockNames.Floor
       - Ceil (`math/ceil`) FlowGraphBlockNames.Ceil
       - Round (`math/round`)  FlowGraphBlockNames.Round
       - Fraction (`math/fract`) FlowGraphBlockNames.Fract
       - Negation (`math/neg`) FlowGraphBlockNames.Negation
       - Addition (`math/add`) FlowGraphBlockNames.Add
       - Subtraction (`math/sub`) FlowGraphBlockNames.Subtract
       - Multiplication (`math/mul`) FlowGraphBlockNames.Multiply
       - Division (`math/div`) FlowGraphBlockNames.Divide
       - Remainder (`math/rem`) FlowGraphBlockNames.Modulo
       - Minimum (`math/min`) FlowGraphBlockNames.Min
       - Maximum (`math/max`) FlowGraphBlockNames.Max
       - Clamp (`math/clamp`) FlowGraphBlockNames.Clamp
       - Saturate (`math/saturate`) FlowGraphBlockNames.Saturate
       - Interpolate (`math/mix`) FlowGraphBlockNames.MathInterpolation
    3. **Comparison Nodes**
       - Equality (`math/eq`) FlowGraphBlockNames.Equality
       - Less Than (`math/lt`) FlowGraphBlockNames.LessThan
       - Less Than Or Equal To (`math/le`) FlowGraphBlockNames.LessThanOrEqual
       - Greater Than (`math/gt`) FlowGraphBlockNames.GreaterThan
       - Greater Than Or Equal To (`math/ge`) FlowGraphBlockNames.GreaterThanOrEqual
    4. **Special Nodes**
       - Is Not a Number (`math/isNaN`) FlowGraphBlockNames.IsNaN
       - Is Infinity (`math/isInf`) FlowGraphBlockNames.IsInfinity
       - Select (`math/select`) FlowGraphBlockNames.Conditional
       - Switch (`math/switch`) FlowGraphBlockNames.DataSwitch
       - Random (`math/random`) FlowGraphBlockNames.Random
    5. **Angle and Trigonometry Nodes**
       - Degrees-To-Radians (`math/rad`) FlowGraphBlockNames.DegToRad
       - Radians-To-Degrees (`math/deg`) FlowGraphBlockNames.RadToDeg
       - Sine (`math/sin`)  FlowGraphBlockNames.Sin
       - Cosine (`math/cos`) FlowGraphBlockNames.Cos
       - Tangent (`math/tan`) FlowGraphBlockNames.Tan
       - Arcsine (`math/asin`) FlowGraphBlockNames.Asin
       - Arccosine (`math/acos`) FlowGraphBlockNames.Acos
       - Arctangent (`math/atan`) FlowGraphBlockNames.Atan
       - Arctangent 2 (`math/atan2`) FlowGraphBlockNames.Atan2
    6. **Hyperbolic Nodes**
       - Hyperbolic Sine (`math/sinh`) FlowGraphBlockNames.Sinh
       - Hyperbolic Cosine (`math/cosh`) FlowGraphBlockNames.Cosh
       - Hyperbolic Tangent (`math/tanh`) FlowGraphBlockNames.Tanh
       - Inverse Hyperbolic Sine (`math/asinh`) FlowGraphBlockNames.Asinh
       - Inverse Hyperbolic Cosine (`math/acosh`) FlowGraphBlockNames.Acosh
       - Inverse Hyperbolic Tangent (`math/atanh`) FlowGraphBlockNames.Atanh
    7. **Exponential Nodes**
       - Exponent (`math/exp`) FlowGraphBlockNames.Exponential
       - Natural Logarithm (`math/log`) FlowGraphBlockNames.Log
       - Base-2 Logarithm (`math/log2`) FlowGraphBlockNames.Log2
       - Base-10 Logarithm (`math/log10`) FlowGraphBlockNames.Log10
       - Square Root (`math/sqrt`) FlowGraphBlockNames.SquareRoot
       - Cube Root (`math/cbrt`) FlowGraphBlockNames.CubeRoot
       - Power (`math/pow`) FlowGraphBlockNames.Power
    8. **Vector Nodes**
       - Length (`math/length`) FlowGraphBlockNames.Length
       - Normalize (`math/normalize`) FlowGraphBlockNames.Normalize
       - Dot Product (`math/dot`) FlowGraphBlockNames.Dot
       - Cross Product (`math/cross`) FlowGraphBlockNames.Cross
       - Rotate 2D (`math/rotate2D`) FlowGraphBlockNames.Rotate2D
       - Rotate 3D (`math/rotate3D`) FlowGraphBlockNames.Rotate3D
       - Transform (`math/transform`) FlowGraphBlockNames.TransformVector
    9. **Matrix Nodes**
       - Transpose (`math/transpose`) FlowGraphBlockNames.Transpose
       - Determinant (`math/determinant`) FlowGraphBlockNames.Determinant
       - Inverse (`math/inverse`) FlowGraphBlockNames.InvertMatrix
       - Multiplication (`math/matMul`) FlowGraphBlockNames.MatrixMultiplication
       - Compose (`math/matCompose`) FlowGraphBlockNames.MatrixCompose
       - Decompose (`math/matDecompose`) FlowGraphBlockNames.MatrixDecompose
    10. **Quaternion Nodes**
        - Conjugate (`math/quatConjugate`) FlowGraphBlockNames.Conjugate
        - Multiplication (`math/quatMul`) FlowGraphBlockNames.Multiply
        - Angle Between Quaternions (`math/quatAngleBetween`) FlowGraphBlockNames.AngleBetween
        - Quaternion From Axis Angle (`math/quatFromAxisAngle`) FlowGraphBlockNames.QuaternionFromAxisAngle
        - Quaternion To Axis Angle (`math/quatToAxisAngle`) FlowGraphBlockNames.QuaternionToAxisAngle
        - Quaternion From Two Directional Vectors (`math/quatFromDirections`) FlowGraphBlockNames.QuaternionFromDirections
    11. **Swizzle Nodes**
        - Combine (`math/combine2`, `math/combine3`, `math/combine4`, `math/combine2x2`, `math/combine3x3`, `math/combine4x4`)
            FlowGraphBlockNames.CombineVector2, FlowGraphBlockNames.CombineVector3, FlowGraphBlockNames.CombineVector4
            FlowGraphBlockNames.CombineMatrix2D, FlowGraphBlockNames.CombineMatrix3D, FlowGraphBlockNames.CombineMatrix
        - Extract (`math/extract2`, `math/extract3`, `math/extract4`, `math/extract2x2`, `math/extract3x3`, `math/extract4x4`)
            FlowGraphBlockNames.ExtractVector2, FlowGraphBlockNames.ExtractVector3, FlowGraphBlockNames.ExtractVector4
            FlowGraphBlockNames.ExtractMatrix2D, FlowGraphBlockNames.ExtractMatrix3D, FlowGraphBlockNames.ExtractMatrix
    12. **Integer Arithmetic Nodes**
        - Absolute Value (`math/abs`) FlowGraphBlockNames.Abs
        - Sign (`math/sign`) FlowGraphBlockNames.Sign
        - Negation (`math/neg`) FlowGraphBlockNames.Negation
        - Addition (`math/add`) FlowGraphBlockNames.Add
        - Subtraction (`math/sub`) FlowGraphBlockNames.Subtract
        - Multiplication (`math/mul`) FlowGraphBlockNames.Multiply
        - Division (`math/div`) FlowGraphBlockNames.Divide
        - Remainder (`math/rem`) FlowGraphBlockNames.Modulo
        - Minimum (`math/min`) FlowGraphBlockNames.Min
        - Maximum (`math/max`) FlowGraphBlockNames.Max
        - Clamp (`math/clamp`) FlowGraphBlockNames.Clamp
    13. **Integer Comparison Nodes**
        - Equality (`math/eq`) FlowGraphBlockNames.Equality
        - Less Than (`math/lt`) FlowGraphBlockNames.LessThan
        - Less Than Or Equal To (`math/le`) FlowGraphBlockNames.LessThanOrEqual
        - Greater Than (`math/gt`) FlowGraphBlockNames.GreaterThan
        - Greater Than Or Equal To (`math/ge`) FlowGraphBlockNames.GreaterThanOrEqual
    14. **Integer Bitwise Nodes**
        - Bitwise NOT (`math/not`) FlowGraphBlockNames.BitwiseNot
        - Bitwise AND (`math/and`) FlowGraphBlockNames.BitwiseAnd
        - Bitwise OR (`math/or`) FlowGraphBlockNames.BitwiseOr
        - Bitwise XOR (`math/xor`) FlowGraphBlockNames.BitwiseXor
        - Right Shift (`math/asr`) FlowGraphBlockNames.BitwiseRightShift
        - Left Shift (`math/lsl`) FlowGraphBlockNames.BitwiseLeftShift
        - Count Leading Zeros (`math/clz`) FlowGraphBlockNames.LeadingZeros
        - Count Trailing Zeros (`math/ctz`) FlowGraphBlockNames.TrailingZeros
        - Count One Bits (`math/popcnt`) FlowGraphBlockNames.OneBitsCounter
    15. **Boolean Arithmetic Nodes**
        - Equality (`math/eq`) FlowGraphBlockNames.Equality
        - Boolean NOT (`math/not`) FlowGraphBlockNames.BitwiseNot
        - Boolean AND (`math/and`) FlowGraphBlockNames.BitwiseAnd
        - Boolean OR (`math/or`) FlowGraphBlockNames.BitwiseOr
        - Boolean XOR (`math/xor`) FlowGraphBlockNames.BitwiseXor
    ### Type Conversion Nodes
    1. **Boolean Conversion Nodes**
       - Boolean to Integer (`type/boolToInt`) FlowGraphBlockNames.BooleanToInt
       - Boolean to Float (`type/boolToFloat`) FlowGraphBlockNames.BooleanToFloat
    2. **Integer Conversion Nodes**
       - Integer to Boolean (`type/intToBool`) FlowGraphBlockNames.IntToBoolean
       - Integer to Float (`type/intToFloat`) FlowGraphBlockNames.IntToFloat
    3. **Float Conversion Nodes**
       - Float to Boolean (`type/floatToBool`) FlowGraphBlockNames.FloatToBoolean
       - Float to Integer (`type/floatToInt`) FlowGraphBlockNames.FloatToInt
    ### Control Flow Nodes
    1. **Sync Nodes**
       - Sequence (`flow/sequence`) FlowGraphBlockNames.Sequence
       - Branch (`flow/branch`) FlowGraphBlockNames.Branch
       - Switch (`flow/switch`) FlowGraphBlockNames.Switch
       - While Loop (`flow/while`) FlowGraphBlockNames.WhileLoop
       - For Loop (`flow/for`) FlowGraphBlockNames.ForLoop
       - Do N (`flow/doN`) FlowGraphBlockNames.DoN
       - Multi Gate (`flow/multiGate`) FlowGraphBlockNames.MultiGate
       - Wait All (`flow/waitAll`) FlowGraphBlockNames.WaitAll
       - Throttle (`flow/throttle`) FlowGraphBlockNames.Throttle
    2. **Delay Nodes**
       - Set Delay (`flow/setDelay`) FlowGraphBlockNames.SetDelay
       - Cancel Delay (`flow/cancelDelay`) FlowGraphBlockNames.CancelDelay
    ### State Manipulation Nodes
    1. **Custom Variable Access**
       - Variable Get (`variable/get`) FlowGraphBlockNames.GetVariable
       - Variable Set (`variable/set`) FlowGraphBlockNames.SetVariable
       - Variable Interpolate (`variable/interpolate`)
    2. **Object Model Access** // TODO fully test this!!!
       - JSON Pointer Template Parsing (`pointer/get`) [FlowGraphBlockNames.GetProperty, FlowGraphBlockNames.JsonPointerParser]
       - Effective JSON Pointer Generation (`pointer/set`) [FlowGraphBlockNames.SetProperty, FlowGraphBlockNames.JsonPointerParser]
       - Pointer Get (`pointer/get`) [FlowGraphBlockNames.GetProperty, FlowGraphBlockNames.JsonPointerParser]
       - Pointer Set (`pointer/set`) [FlowGraphBlockNames.SetProperty, FlowGraphBlockNames.JsonPointerParser]
       - Pointer Interpolate (`pointer/interpolate`) [FlowGraphBlockNames.ValueInterpolation, FlowGraphBlockNames.JsonPointerParser, FlowGraphBlockNames.PlayAnimation, FlowGraphBlockNames.Easing]
    ### Animation Control Nodes
    1. **Animation Play** (`animation/start`) FlowGraphBlockNames.PlayAnimation
    2. **Animation Stop** (`animation/stop`) FlowGraphBlockNames.StopAnimation
    3. **Animation Stop At** (`animation/stopAt`) FlowGraphBlockNames.StopAnimation
    ### Event Nodes
    1. **Lifecycle Event Nodes**
       - On Start (`event/onStart`) FlowGraphBlockNames.SceneReadyEvent
       - On Tick (`event/onTick`) FlowGraphBlockNames.SceneTickEvent
    2. **Custom Event Nodes**
       - Receive (`event/receive`) FlowGraphBlockNames.ReceiveCustomEvent
       - Send (`event/send`) FlowGraphBlockNames.SendCustomEvent
     */



}
declare module BABYLON {


}
declare module BABYLON.GLTF1 {
    


}
declare module BABYLON {


}
declare module BABYLON.GLTF1 {
        /**
     * @internal
     * @deprecated
     */
    export class GLTFMaterialsCommonExtension extends BABYLON.GLTF1.GLTFLoaderExtension {
        constructor();
        loadRuntimeExtensionsAsync(gltfRuntime: BABYLON.GLTF1.IGLTFRuntime): boolean;
        loadMaterialAsync(gltfRuntime: BABYLON.GLTF1.IGLTFRuntime, id: string, onSuccess: (material: Material) => void, onError: (message: string) => void): boolean;
        private _loadTexture;
    }



}
declare module BABYLON {


}
declare module BABYLON.GLTF1 {
        /**
     * Utils functions for GLTF
     * @internal
     * @deprecated
     */
    export class GLTFUtils {
        /**
         * Sets the given "parameter" matrix
         * @param scene the Scene object
         * @param source the source node where to pick the matrix
         * @param parameter the GLTF technique parameter
         * @param uniformName the name of the shader's uniform
         * @param shaderMaterial the shader material
         */
        static SetMatrix(scene: Scene, source: Node, parameter: BABYLON.GLTF1.IGLTFTechniqueParameter, uniformName: string, shaderMaterial: ShaderMaterial | Effect): void;
        /**
         * Sets the given "parameter" matrix
         * @param shaderMaterial the shader material
         * @param uniform the name of the shader's uniform
         * @param value the value of the uniform
         * @param type the uniform's type (EParameterType FLOAT, VEC2, VEC3 or VEC4)
         * @returns true if set, else false
         */
        static SetUniform(shaderMaterial: ShaderMaterial | Effect, uniform: string, value: any, type: number): boolean;
        /**
         * Returns the wrap mode of the texture
         * @param mode the mode value
         * @returns the wrap mode (TEXTURE_WRAP_ADDRESSMODE, MIRROR_ADDRESSMODE or CLAMP_ADDRESSMODE)
         */
        static GetWrapMode(mode: number): number;
        /**
         * Returns the byte stride giving an accessor
         * @param accessor the GLTF accessor objet
         * @returns the byte stride
         */
        static GetByteStrideFromType(accessor: BABYLON.GLTF1.IGLTFAccessor): number;
        /**
         * Returns the texture filter mode giving a mode value
         * @param mode the filter mode value
         * @returns the filter mode (TODO - needs to be a type?)
         */
        static GetTextureFilterMode(mode: number): number;
        static GetBufferFromBufferView(gltfRuntime: BABYLON.GLTF1.IGLTFRuntime, bufferView: BABYLON.GLTF1.IGLTFBufferView, byteOffset: number, byteLength: number, componentType: BABYLON.GLTF1.EComponentType): ArrayBufferView;
        /**
         * Returns a buffer from its accessor
         * @param gltfRuntime the GLTF runtime
         * @param accessor the GLTF accessor
         * @returns an array buffer view
         */
        static GetBufferFromAccessor(gltfRuntime: BABYLON.GLTF1.IGLTFRuntime, accessor: BABYLON.GLTF1.IGLTFAccessor): any;
        /**
         * Decodes a buffer view into a string
         * @param view the buffer view
         * @returns a string
         */
        static DecodeBufferToText(view: ArrayBufferView): string;
        /**
         * Returns the default material of gltf. Related to
         * https://github.com/KhronosGroup/glTF/tree/master/specification/1.0#appendix-a-default-material
         * @param scene the Babylon.js scene
         * @returns the default Babylon material
         */
        static GetDefaultMaterial(scene: Scene): ShaderMaterial;
        private static _DefaultMaterial;
    }



}
declare module BABYLON {


}
declare module BABYLON.GLTF1 {
        /**
     * Enums
     * @internal
     */
    export enum EComponentType {
        BYTE = 5120,
        UNSIGNED_BYTE = 5121,
        SHORT = 5122,
        UNSIGNED_SHORT = 5123,
        FLOAT = 5126
    }
    /** @internal */
    export enum EShaderType {
        FRAGMENT = 35632,
        VERTEX = 35633
    }
    /** @internal */
    export enum EParameterType {
        BYTE = 5120,
        UNSIGNED_BYTE = 5121,
        SHORT = 5122,
        UNSIGNED_SHORT = 5123,
        INT = 5124,
        UNSIGNED_INT = 5125,
        FLOAT = 5126,
        FLOAT_VEC2 = 35664,
        FLOAT_VEC3 = 35665,
        FLOAT_VEC4 = 35666,
        INT_VEC2 = 35667,
        INT_VEC3 = 35668,
        INT_VEC4 = 35669,
        BOOL = 35670,
        BOOL_VEC2 = 35671,
        BOOL_VEC3 = 35672,
        BOOL_VEC4 = 35673,
        FLOAT_MAT2 = 35674,
        FLOAT_MAT3 = 35675,
        FLOAT_MAT4 = 35676,
        SAMPLER_2D = 35678
    }
    /** @internal */
    export enum ETextureWrapMode {
        CLAMP_TO_EDGE = 33071,
        MIRRORED_REPEAT = 33648,
        REPEAT = 10497
    }
    /** @internal */
    export enum ETextureFilterType {
        NEAREST = 9728,
        LINEAR = 9728,
        NEAREST_MIPMAP_NEAREST = 9984,
        LINEAR_MIPMAP_NEAREST = 9985,
        NEAREST_MIPMAP_LINEAR = 9986,
        LINEAR_MIPMAP_LINEAR = 9987
    }
    /** @internal */
    export enum ETextureFormat {
        ALPHA = 6406,
        RGB = 6407,
        RGBA = 6408,
        LUMINANCE = 6409,
        LUMINANCE_ALPHA = 6410
    }
    /** @internal */
    export enum ECullingType {
        FRONT = 1028,
        BACK = 1029,
        FRONT_AND_BACK = 1032
    }
    /** @internal */
    export enum EBlendingFunction {
        ZERO = 0,
        ONE = 1,
        SRC_COLOR = 768,
        ONE_MINUS_SRC_COLOR = 769,
        DST_COLOR = 774,
        ONE_MINUS_DST_COLOR = 775,
        SRC_ALPHA = 770,
        ONE_MINUS_SRC_ALPHA = 771,
        DST_ALPHA = 772,
        ONE_MINUS_DST_ALPHA = 773,
        CONSTANT_COLOR = 32769,
        ONE_MINUS_CONSTANT_COLOR = 32770,
        CONSTANT_ALPHA = 32771,
        ONE_MINUS_CONSTANT_ALPHA = 32772,
        SRC_ALPHA_SATURATE = 776
    }
    /** @internal */
    export interface IGLTFProperty {
        extensions?: {
            [key: string]: any;
        };
        extras?: object;
    }
    /** @internal */
    export interface IGLTFChildRootProperty extends IGLTFProperty {
        name?: string;
    }
    /** @internal */
    export interface IGLTFAccessor extends IGLTFChildRootProperty {
        bufferView: string;
        byteOffset: number;
        byteStride: number;
        count: number;
        type: string;
        componentType: EComponentType;
        max?: number[];
        min?: number[];
        name?: string;
    }
    /** @internal */
    export interface IGLTFBufferView extends IGLTFChildRootProperty {
        buffer: string;
        byteOffset: number;
        byteLength: number;
        byteStride: number;
        target?: number;
    }
    /** @internal */
    export interface IGLTFBuffer extends IGLTFChildRootProperty {
        uri: string;
        byteLength?: number;
        type?: string;
    }
    /** @internal */
    export interface IGLTFShader extends IGLTFChildRootProperty {
        uri: string;
        type: EShaderType;
    }
    /** @internal */
    export interface IGLTFProgram extends IGLTFChildRootProperty {
        attributes: string[];
        fragmentShader: string;
        vertexShader: string;
    }
    /** @internal */
    export interface IGLTFTechniqueParameter {
        type: number;
        count?: number;
        semantic?: string;
        node?: string;
        value?: number | boolean | string | Array<any>;
        source?: string;
        babylonValue?: any;
    }
    /** @internal */
    export interface IGLTFTechniqueCommonProfile {
        lightingModel: string;
        texcoordBindings: object;
        parameters?: Array<any>;
    }
    /** @internal */
    export interface IGLTFTechniqueStatesFunctions {
        blendColor?: number[];
        blendEquationSeparate?: number[];
        blendFuncSeparate?: number[];
        colorMask: boolean[];
        cullFace: number[];
    }
    /** @internal */
    export interface IGLTFTechniqueStates {
        enable: number[];
        functions: IGLTFTechniqueStatesFunctions;
    }
    /** @internal */
    export interface IGLTFTechnique extends IGLTFChildRootProperty {
        parameters: {
            [key: string]: IGLTFTechniqueParameter;
        };
        program: string;
        attributes: {
            [key: string]: string;
        };
        uniforms: {
            [key: string]: string;
        };
        states: IGLTFTechniqueStates;
    }
    /** @internal */
    export interface IGLTFMaterial extends IGLTFChildRootProperty {
        technique?: string;
        values: string[];
    }
    /** @internal */
    export interface IGLTFMeshPrimitive extends IGLTFProperty {
        attributes: {
            [key: string]: string;
        };
        indices: string;
        material: string;
        mode?: number;
    }
    /** @internal */
    export interface IGLTFMesh extends IGLTFChildRootProperty {
        primitives: IGLTFMeshPrimitive[];
    }
    /** @internal */
    export interface IGLTFImage extends IGLTFChildRootProperty {
        uri: string;
    }
    /** @internal */
    export interface IGLTFSampler extends IGLTFChildRootProperty {
        magFilter?: number;
        minFilter?: number;
        wrapS?: number;
        wrapT?: number;
    }
    /** @internal */
    export interface IGLTFTexture extends IGLTFChildRootProperty {
        sampler: string;
        source: string;
        format?: ETextureFormat;
        internalFormat?: ETextureFormat;
        target?: number;
        type?: number;
        babylonTexture?: Texture;
    }
    /** @internal */
    export interface IGLTFAmbienLight {
        color?: number[];
    }
    /** @internal */
    export interface IGLTFDirectionalLight {
        color?: number[];
    }
    /** @internal */
    export interface IGLTFPointLight {
        color?: number[];
        constantAttenuation?: number;
        linearAttenuation?: number;
        quadraticAttenuation?: number;
    }
    /** @internal */
    export interface IGLTFSpotLight {
        color?: number[];
        constantAttenuation?: number;
        fallOfAngle?: number;
        fallOffExponent?: number;
        linearAttenuation?: number;
        quadraticAttenuation?: number;
    }
    /** @internal */
    export interface IGLTFLight extends IGLTFChildRootProperty {
        type: string;
    }
    /** @internal */
    export interface IGLTFCameraOrthographic {
        xmag: number;
        ymag: number;
        zfar: number;
        znear: number;
    }
    /** @internal */
    export interface IGLTFCameraPerspective {
        aspectRatio: number;
        yfov: number;
        zfar: number;
        znear: number;
    }
    /** @internal */
    export interface IGLTFCamera extends IGLTFChildRootProperty {
        type: string;
    }
    /** @internal */
    export interface IGLTFAnimationChannelTarget {
        id: string;
        path: string;
    }
    /** @internal */
    export interface IGLTFAnimationChannel {
        sampler: string;
        target: IGLTFAnimationChannelTarget;
    }
    /** @internal */
    export interface IGLTFAnimationSampler {
        input: string;
        output: string;
        interpolation?: string;
    }
    /** @internal */
    export interface IGLTFAnimation extends IGLTFChildRootProperty {
        channels?: IGLTFAnimationChannel[];
        parameters?: {
            [key: string]: string;
        };
        samplers?: {
            [key: string]: IGLTFAnimationSampler;
        };
    }
    /** @internal */
    export interface IGLTFNodeInstanceSkin {
        skeletons: string[];
        skin: string;
        meshes: string[];
    }
    /** @internal */
    export interface IGLTFSkins extends IGLTFChildRootProperty {
        bindShapeMatrix: number[];
        inverseBindMatrices: string;
        jointNames: string[];
        babylonSkeleton?: Skeleton;
    }
    /** @internal */
    export interface IGLTFNode extends IGLTFChildRootProperty {
        camera?: string;
        children: string[];
        skin?: string;
        jointName?: string;
        light?: string;
        matrix: number[];
        mesh?: string;
        meshes?: string[];
        rotation?: number[];
        scale?: number[];
        translation?: number[];
        babylonNode?: Node;
    }
    /** @internal */
    export interface IGLTFScene extends IGLTFChildRootProperty {
        nodes: string[];
    }
    /** @internal */
    export interface IGLTFRuntime {
        extensions: {
            [key: string]: any;
        };
        accessors: {
            [key: string]: IGLTFAccessor;
        };
        buffers: {
            [key: string]: IGLTFBuffer;
        };
        bufferViews: {
            [key: string]: IGLTFBufferView;
        };
        meshes: {
            [key: string]: IGLTFMesh;
        };
        lights: {
            [key: string]: IGLTFLight;
        };
        cameras: {
            [key: string]: IGLTFCamera;
        };
        nodes: {
            [key: string]: IGLTFNode;
        };
        images: {
            [key: string]: IGLTFImage;
        };
        textures: {
            [key: string]: IGLTFTexture;
        };
        shaders: {
            [key: string]: IGLTFShader;
        };
        programs: {
            [key: string]: IGLTFProgram;
        };
        samplers: {
            [key: string]: IGLTFSampler;
        };
        techniques: {
            [key: string]: IGLTFTechnique;
        };
        materials: {
            [key: string]: IGLTFMaterial;
        };
        animations: {
            [key: string]: IGLTFAnimation;
        };
        skins: {
            [key: string]: IGLTFSkins;
        };
        currentScene?: object;
        scenes: {
            [key: string]: IGLTFScene;
        };
        extensionsUsed: string[];
        extensionsRequired?: string[];
        buffersCount: number;
        shaderscount: number;
        scene: Scene;
        rootUrl: string;
        loadedBufferCount: number;
        loadedBufferViews: {
            [name: string]: ArrayBufferView;
        };
        loadedShaderCount: number;
        importOnlyMeshes: boolean;
        importMeshesNames?: string[];
        dummyNodes: Node[];
        assetContainer: Nullable<AssetContainer>;
    }
    /** @internal */
    export interface INodeToRoot {
        bone: Bone;
        node: IGLTFNode;
        id: string;
    }
    /** @internal */
    export interface IJointNode {
        node: IGLTFNode;
        id: string;
    }



}
declare module BABYLON {


}
declare module BABYLON.GLTF1 {
        /**
     * Implementation of the base glTF spec
     * @internal
     */
    export class GLTFLoaderBase {
        static CreateRuntime(parsedData: any, scene: Scene, rootUrl: string): BABYLON.GLTF1.IGLTFRuntime;
        static LoadBufferAsync(gltfRuntime: BABYLON.GLTF1.IGLTFRuntime, id: string, onSuccess: (buffer: ArrayBufferView) => void, onError: (message: string) => void, onProgress?: () => void): void;
        static LoadTextureBufferAsync(gltfRuntime: BABYLON.GLTF1.IGLTFRuntime, id: string, onSuccess: (buffer: Nullable<ArrayBufferView>) => void, onError: (message: string) => void): void;
        static CreateTextureAsync(gltfRuntime: BABYLON.GLTF1.IGLTFRuntime, id: string, buffer: Nullable<ArrayBufferView>, onSuccess: (texture: Texture) => void): void;
        static LoadShaderStringAsync(gltfRuntime: BABYLON.GLTF1.IGLTFRuntime, id: string, onSuccess: (shaderString: string | ArrayBuffer) => void, onError?: (message: string) => void): void;
        static LoadMaterialAsync(gltfRuntime: BABYLON.GLTF1.IGLTFRuntime, id: string, onSuccess: (material: Material) => void, onError: (message: string) => void): void;
    }
    /**
     * glTF V1 Loader
     * @internal
     * @deprecated
     */
    export class GLTFLoader implements IGLTFLoader {
        static Extensions: {
            [name: string]: GLTFLoaderExtension;
        };
        static RegisterExtension(extension: GLTFLoaderExtension): void;
        dispose(): void;
        private _importMeshAsync;
        /**
         * Imports one or more meshes from a loaded gltf file and adds them to the scene
         * @param meshesNames a string or array of strings of the mesh names that should be loaded from the file
         * @param scene the scene the meshes should be added to
         * @param assetContainer defines the asset container to use (can be null)
         * @param data gltf data containing information of the meshes in a loaded file
         * @param rootUrl root url to load from
         * @param onProgress event that fires when loading progress has occured
         * @returns a promise containg the loaded meshes, particles, skeletons and animations
         */
        importMeshAsync(meshesNames: any, scene: Scene, assetContainer: Nullable<AssetContainer>, data: IGLTFLoaderData, rootUrl: string, onProgress?: (event: ISceneLoaderProgressEvent) => void): Promise<ISceneLoaderAsyncResult>;
        private _loadAsync;
        /**
         * Imports all objects from a loaded gltf file and adds them to the scene
         * @param scene the scene the objects should be added to
         * @param data gltf data containing information of the meshes in a loaded file
         * @param rootUrl root url to load from
         * @param onProgress event that fires when loading progress has occured
         * @returns a promise which completes when objects have been loaded to the scene
         */
        loadAsync(scene: Scene, data: IGLTFLoaderData, rootUrl: string, onProgress?: (event: ISceneLoaderProgressEvent) => void): Promise<void>;
        private _loadShadersAsync;
        private _loadBuffersAsync;
        private _createNodes;
    }
    /** @internal */
    export abstract class GLTFLoaderExtension {
        private _name;
        constructor(name: string);
        get name(): string;
        /**
         * Defines an override for loading the runtime
         * Return true to stop further extensions from loading the runtime
         * @param scene
         * @param data
         * @param rootUrl
         * @param onSuccess
         * @param onError
         * @returns true to stop further extensions from loading the runtime
         */
        loadRuntimeAsync(scene: Scene, data: IGLTFLoaderData, rootUrl: string, onSuccess?: (gltfRuntime: BABYLON.GLTF1.IGLTFRuntime) => void, onError?: (message: string) => void): boolean;
        /**
         * Defines an onverride for creating gltf runtime
         * Return true to stop further extensions from creating the runtime
         * @param gltfRuntime
         * @param onSuccess
         * @param onError
         * @returns true to stop further extensions from creating the runtime
         */
        loadRuntimeExtensionsAsync(gltfRuntime: BABYLON.GLTF1.IGLTFRuntime, onSuccess: () => void, onError?: (message: string) => void): boolean;
        /**
         * Defines an override for loading buffers
         * Return true to stop further extensions from loading this buffer
         * @param gltfRuntime
         * @param id
         * @param onSuccess
         * @param onError
         * @param onProgress
         * @returns true to stop further extensions from loading this buffer
         */
        loadBufferAsync(gltfRuntime: BABYLON.GLTF1.IGLTFRuntime, id: string, onSuccess: (buffer: ArrayBufferView) => void, onError: (message: string) => void, onProgress?: () => void): boolean;
        /**
         * Defines an override for loading texture buffers
         * Return true to stop further extensions from loading this texture data
         * @param gltfRuntime
         * @param id
         * @param onSuccess
         * @param onError
         * @returns true to stop further extensions from loading this texture data
         */
        loadTextureBufferAsync(gltfRuntime: BABYLON.GLTF1.IGLTFRuntime, id: string, onSuccess: (buffer: ArrayBufferView) => void, onError: (message: string) => void): boolean;
        /**
         * Defines an override for creating textures
         * Return true to stop further extensions from loading this texture
         * @param gltfRuntime
         * @param id
         * @param buffer
         * @param onSuccess
         * @param onError
         * @returns true to stop further extensions from loading this texture
         */
        createTextureAsync(gltfRuntime: BABYLON.GLTF1.IGLTFRuntime, id: string, buffer: ArrayBufferView, onSuccess: (texture: Texture) => void, onError: (message: string) => void): boolean;
        /**
         * Defines an override for loading shader strings
         * Return true to stop further extensions from loading this shader data
         * @param gltfRuntime
         * @param id
         * @param onSuccess
         * @param onError
         * @returns true to stop further extensions from loading this shader data
         */
        loadShaderStringAsync(gltfRuntime: BABYLON.GLTF1.IGLTFRuntime, id: string, onSuccess: (shaderString: string) => void, onError: (message: string) => void): boolean;
        /**
         * Defines an override for loading materials
         * Return true to stop further extensions from loading this material
         * @param gltfRuntime
         * @param id
         * @param onSuccess
         * @param onError
         * @returns true to stop further extensions from loading this material
         */
        loadMaterialAsync(gltfRuntime: BABYLON.GLTF1.IGLTFRuntime, id: string, onSuccess: (material: Material) => void, onError: (message: string) => void): boolean;
        static LoadRuntimeAsync(scene: Scene, data: IGLTFLoaderData, rootUrl: string, onSuccess?: (gltfRuntime: BABYLON.GLTF1.IGLTFRuntime) => void, onError?: (message: string) => void): void;
        static LoadRuntimeExtensionsAsync(gltfRuntime: BABYLON.GLTF1.IGLTFRuntime, onSuccess: () => void, onError?: (message: string) => void): void;
        static LoadBufferAsync(gltfRuntime: BABYLON.GLTF1.IGLTFRuntime, id: string, onSuccess: (bufferView: ArrayBufferView) => void, onError: (message: string) => void, onProgress?: () => void): void;
        static LoadTextureAsync(gltfRuntime: BABYLON.GLTF1.IGLTFRuntime, id: string, onSuccess: (texture: Texture) => void, onError: (message: string) => void): void;
        static LoadShaderStringAsync(gltfRuntime: BABYLON.GLTF1.IGLTFRuntime, id: string, onSuccess: (shaderData: string | ArrayBuffer) => void, onError: (message: string) => void): void;
        static LoadMaterialAsync(gltfRuntime: BABYLON.GLTF1.IGLTFRuntime, id: string, onSuccess: (material: Material) => void, onError: (message: string) => void): void;
        private static _LoadTextureBufferAsync;
        private static _CreateTextureAsync;
        private static _ApplyExtensions;
    }



}
declare module BABYLON {


}
declare module BABYLON.GLTF1 {
        /**
     * @internal
     * @deprecated
     */
    export class GLTFBinaryExtension extends BABYLON.GLTF1.GLTFLoaderExtension {
        private _bin;
        constructor();
        loadRuntimeAsync(scene: Scene, data: IGLTFLoaderData, rootUrl: string, onSuccess: (gltfRuntime: BABYLON.GLTF1.IGLTFRuntime) => void): boolean;
        loadBufferAsync(gltfRuntime: BABYLON.GLTF1.IGLTFRuntime, id: string, onSuccess: (buffer: ArrayBufferView) => void, onError: (message: string) => void): boolean;
        loadTextureBufferAsync(gltfRuntime: BABYLON.GLTF1.IGLTFRuntime, id: string, onSuccess: (buffer: ArrayBufferView) => void): boolean;
        loadShaderStringAsync(gltfRuntime: BABYLON.GLTF1.IGLTFRuntime, id: string, onSuccess: (shaderString: string) => void): boolean;
    }



}
declare module BABYLON {

    export var STLFileLoaderMetadata: {
        readonly name: "stl";
        readonly extensions: {
            readonly ".stl": {
                readonly isBinary: true;
            };
        };
    };


        interface SceneLoaderPluginOptions {
            /**
             * Defines options for the stl loader.
             */
            [STLFileLoaderMetadata.name]: {};
        }
    /**
     * STL file type loader.
     * This is a babylon scene loader plugin.
     */
    export class STLFileLoader implements ISceneLoaderPlugin {
        /** @internal */
        solidPattern: RegExp;
        /** @internal */
        facetsPattern: RegExp;
        /** @internal */
        normalPattern: RegExp;
        /** @internal */
        vertexPattern: RegExp;
        /**
         * Defines the name of the plugin.
         */
        readonly name: "stl";
        /**
         * Defines the extensions the stl loader is able to load.
         * force data to come in as an ArrayBuffer
         * we'll convert to string if it looks like it's an ASCII .stl
         */
        readonly extensions: {
            readonly ".stl": {
                readonly isBinary: true;
            };
        };
        /**
         * Defines if Y and Z axes are swapped or not when loading an STL file.
         * The default is false to maintain backward compatibility. When set to
         * true, coordinates from the STL file are used without change.
         */
        static DO_NOT_ALTER_FILE_COORDINATES: boolean;
        /**
         * Import meshes into a scene.
         * @param meshesNames An array of mesh names, a single mesh name, or empty string for all meshes that filter what meshes are imported
         * @param scene The scene to import into
         * @param data The data to import
         * @param rootUrl The root url for scene and resources
         * @param meshes The meshes array to import into
         * @returns True if successful or false otherwise
         */
        importMesh(meshesNames: any, scene: Scene, data: any, rootUrl: string, meshes: Nullable<AbstractMesh[]>): boolean;
        /**
         * Load into a scene.
         * @param scene The scene to load into
         * @param data The data to import
         * @param rootUrl The root url for scene and resources
         * @returns true if successful or false otherwise
         */
        load(scene: Scene, data: any, rootUrl: string): boolean;
        /**
         * Load into an asset container.
         * @param scene The scene to load into
         * @param data The data to import
         * @param rootUrl The root url for scene and resources
         * @returns The loaded asset container
         */
        loadAssetContainer(scene: Scene, data: string, rootUrl: string): AssetContainer;
        private _isBinary;
        private _parseBinary;
        private _parseASCII;
    }




    /**
     * Parses SPZ data and returns a promise resolving to an IParsedPLY object.
     * @param data The ArrayBuffer containing SPZ data.
     * @param scene The Babylon.js scene.
     * @param loadingOptions Options for loading Gaussian Splatting files.
     * @returns A promise resolving to the parsed SPZ data.
     */
    export function ParseSpz(data: ArrayBuffer, scene: Scene, loadingOptions: SPLATLoadingOptions): Promise<IParsedSplat>;


    /**
     * Options for loading Gaussian Splatting and PLY files
     */
    export type SPLATLoadingOptions = {
        /**
         * Defines if buffers should be kept in memory for editing purposes
         */
        keepInRam?: boolean;
        /**
         * Spatial Y Flip for splat position and orientation
         */
        flipY?: boolean;
        /**
         * URL to load fflate from. If null or undefined, will load from unpkg.com
         * (https://unpkg.com/fflate/umd/index.js)
         */
        deflateURL?: string;
        /**
         * Instance of [fflate](https://github.com/101arrowz/fflate) to avoid
         * dynamically loading of the lib to global if needed, useful for bundler users.
         * @example import * as fflate from 'fflate';
         */
        fflate?: unknown;
        /**
         * Disable automatic camera limits from being applied if they exist in the splat file
         */
        disableAutoCameraLimits?: boolean;
        /**
         * Mesh that will be used to load data instead of creating a new one
         */
        gaussianSplattingMesh?: GaussianSplattingMesh;
    };


    export var SPLATFileLoaderMetadata: {
        readonly name: "splat";
        readonly extensions: {
            readonly ".splat": {
                readonly isBinary: true;
            };
            readonly ".ply": {
                readonly isBinary: true;
            };
            readonly ".spz": {
                readonly isBinary: true;
            };
            readonly ".json": {
                readonly isBinary: false;
            };
            readonly ".sog": {
                readonly isBinary: true;
            };
        };
    };


        interface SceneLoaderPluginOptions {
            /**
             * Defines options for the splat loader.
             */
            [SPLATFileLoaderMetadata.name]: Partial<SPLATLoadingOptions>;
        }
    /**
     * @experimental
     * SPLAT file type loader.
     * This is a babylon scene loader plugin.
     */
    export class SPLATFileLoader implements ISceneLoaderPluginAsync, ISceneLoaderPluginFactory {
        /**
         * Defines the name of the plugin.
         */
        readonly name: "splat";
        private _assetContainer;
        private readonly _loadingOptions;
        /**
         * Defines the extensions the splat loader is able to load.
         * force data to come in as an ArrayBuffer
         */
        readonly extensions: {
            readonly ".splat": {
                readonly isBinary: true;
            };
            readonly ".ply": {
                readonly isBinary: true;
            };
            readonly ".spz": {
                readonly isBinary: true;
            };
            readonly ".json": {
                readonly isBinary: false;
            };
            readonly ".sog": {
                readonly isBinary: true;
            };
        };
        /**
         * Creates loader for gaussian splatting files
         * @param loadingOptions options for loading and parsing splat and PLY files.
         */
        constructor(loadingOptions?: Partial<Readonly<SPLATLoadingOptions>>);
        private static readonly _DefaultLoadingOptions;
        /** @internal */
        createPlugin(options: SceneLoaderPluginOptions): ISceneLoaderPluginAsync;
        /**
         * Imports  from the loaded gaussian splatting data and adds them to the scene
         * @param meshesNames a string or array of strings of the mesh names that should be loaded from the file
         * @param scene the scene the meshes should be added to
         * @param data the gaussian splatting data to load
         * @param rootUrl root url to load from
         * @param _onProgress callback called while file is loading
         * @param _fileName Defines the name of the file to load
         * @returns a promise containing the loaded meshes, particles, skeletons and animations
         */
        importMeshAsync(meshesNames: any, scene: Scene, data: any, rootUrl: string, _onProgress?: (event: ISceneLoaderProgressEvent) => void, _fileName?: string): Promise<ISceneLoaderAsyncResult>;
        private static _BuildPointCloud;
        private static _BuildMesh;
        private _unzipWithFFlateAsync;
        private _parseAsync;
        /**
         * Applies camera limits based on parsed meta data
         * @param meta parsed splat meta data
         * @param scene
         */
        private applyAutoCameraLimits;
        /**
         * Load into an asset container.
         * @param scene The scene to load into
         * @param data The data to import
         * @param rootUrl The root url for scene and resources
         * @returns The loaded asset container
         */
        loadAssetContainerAsync(scene: Scene, data: string, rootUrl: string): Promise<AssetContainer>;
        /**
         * Imports all objects from the loaded OBJ data and adds them to the scene
         * @param scene the scene the objects should be added to
         * @param data the OBJ data to load
         * @param rootUrl root url to load from
         * @returns a promise which completes when objects have been loaded to the scene
         */
        loadAsync(scene: Scene, data: string, rootUrl: string): Promise<void>;
        /**
         * Code from https://github.com/dylanebert/gsplat.js/blob/main/src/loaders/PLYLoader.ts Under MIT license
         * Converts a .ply data array buffer to splat
         * if data array buffer is not ply, returns the original buffer
         * @param data the .ply data to load
         * @returns the loaded splat buffer
         */
        private static _ConvertPLYToSplat;
    }


    /**
     * Indicator of the parsed ply buffer. A standard ready to use splat or an array of positions for a point cloud
     */
    export enum Mode {
        Splat = 0,
        PointCloud = 1,
        Mesh = 2,
        Reject = 3
    }
    /**
     * A parsed buffer and how to use it
     */
    export interface IParsedSplat {
        data: ArrayBuffer;
        mode: Mode;
        faces?: number[];
        hasVertexColors?: boolean;
        sh?: Uint8Array[];
        trainedWithAntialiasing?: boolean;
        compressed?: boolean;
        rawSplat?: boolean;
        safeOrbitCameraRadiusMin?: number;
        safeOrbitCameraElevationMinMax?: [number, number];
        upAxis?: "X" | "Y" | "Z";
        chirality?: "LeftHanded" | "RightHanded";
    }


    /**
     * Definition of a SOG data file
     */
    export interface SOGDataFile {
        /**
         * index 0 is number of splats index 1 is number of components per splat (3 for vec3, 4 for vec4, etc.)
         */
        shape: number[];
        /**
         * type of components
         */
        dtype: string;
        /**
         * min range of data
         */
        mins?: number | number[];
        /**
         * max range of data
         */
        maxs?: number | number[];
        /**
         * palette for indexed data (quantized)
         */
        codebook?: number[];
        /**
         * type of encoding
         */
        encoding?: string;
        /**
         * number of bits for quantization (if any)
         */
        quantization?: number;
        /**
         * webp file names
         */
        files: string[];
        /**
         * SH band count (if applicable)
         */
        bands?: number;
    }
    /**
     * Definition of the root SOG data file
     */
    export interface SOGRootData {
        /**
         * version of the SOG format
         */
        version?: number;
        /**
         * mean positions of the splats
         */
        means: SOGDataFile;
        /**
         * scales of the splats
         */
        scales: SOGDataFile;
        /**
         * quaternions of the splats
         */
        quats: SOGDataFile;
        /**
         * SH0 coefficients of the splats (base color)
         */
        sh0: SOGDataFile;
        /**
         *  Optional higher order SH coefficients of the splats (lighting information)
         */
        shN?: SOGDataFile;
        /**
         * number of splats (optional, can be inferred from means.shape[0])
         */
        count?: number;
    }
    /**
     * Parse SOG data from either a SOGRootData object (with webp files loaded from rootUrl) or from a Map of filenames to Uint8Array file data (including meta.json)
     * @param dataOrFiles Either the SOGRootData or a Map of filenames to Uint8Array file data (including meta.json)
     * @param rootUrl Base URL to load webp files from (if dataOrFiles is SOGRootData)
     * @param scene The Babylon.js scene
     * @returns Parsed data
     */
    export function ParseSogMeta(dataOrFiles: SOGRootData | Map<string, Uint8Array>, rootUrl: string, scene: Scene): Promise<IParsedSplat>;




    /**
     * Class used to load mesh data from OBJ content
     */
    export class SolidParser {
        /** Object descriptor */
        static ObjectDescriptor: RegExp;
        /** Group descriptor */
        static GroupDescriptor: RegExp;
        /** Material lib descriptor */
        static MtlLibGroupDescriptor: RegExp;
        /** Use a material descriptor */
        static UseMtlDescriptor: RegExp;
        /** Smooth descriptor */
        static SmoothDescriptor: RegExp;
        /** Pattern used to detect a vertex */
        static VertexPattern: RegExp;
        /** Pattern used to detect a normal */
        static NormalPattern: RegExp;
        /** Pattern used to detect a UV set */
        static UVPattern: RegExp;
        /** Pattern used to detect a first kind of face (f vertex vertex vertex) */
        static FacePattern1: RegExp;
        /** Pattern used to detect a second kind of face (f vertex/uvs vertex/uvs vertex/uvs) */
        static FacePattern2: RegExp;
        /** Pattern used to detect a third kind of face (f vertex/uvs/normal vertex/uvs/normal vertex/uvs/normal) */
        static FacePattern3: RegExp;
        /** Pattern used to detect a fourth kind of face (f vertex//normal vertex//normal vertex//normal)*/
        static FacePattern4: RegExp;
        /** Pattern used to detect a fifth kind of face (f -vertex/-uvs/-normal -vertex/-uvs/-normal -vertex/-uvs/-normal) */
        static FacePattern5: RegExp;
        /** Pattern used to detect a line(l vertex vertex) */
        static LinePattern1: RegExp;
        /** Pattern used to detect a second kind of line (l vertex/uvs vertex/uvs) */
        static LinePattern2: RegExp;
        /** Pattern used to detect a third kind of line (l vertex/uvs/normal vertex/uvs/normal) */
        static LinePattern3: RegExp;
        private _loadingOptions;
        private _positions;
        private _normals;
        private _uvs;
        private _colors;
        private _extColors;
        private _meshesFromObj;
        private _handledMesh;
        private _indicesForBabylon;
        private _wrappedPositionForBabylon;
        private _wrappedUvsForBabylon;
        private _wrappedColorsForBabylon;
        private _wrappedNormalsForBabylon;
        private _tuplePosNorm;
        private _curPositionInIndices;
        private _hasMeshes;
        private _unwrappedPositionsForBabylon;
        private _unwrappedColorsForBabylon;
        private _unwrappedNormalsForBabylon;
        private _unwrappedUVForBabylon;
        private _triangles;
        private _materialNameFromObj;
        private _objMeshName;
        private _increment;
        private _isFirstMaterial;
        private _grayColor;
        private _materialToUse;
        private _babylonMeshesArray;
        private _pushTriangle;
        private _handednessSign;
        private _hasLineData;
        /**
         * Creates a new SolidParser
         * @param materialToUse defines the array to fill with the list of materials to use (it will be filled by the parse function)
         * @param babylonMeshesArray defines the array to fill with the list of loaded meshes (it will be filled by the parse function)
         * @param loadingOptions defines the loading options to use
         */
        constructor(materialToUse: string[], babylonMeshesArray: Array<Mesh>, loadingOptions: OBJLoadingOptions);
        /**
         * Search for obj in the given array.
         * This function is called to check if a couple of data already exists in an array.
         *
         * If found, returns the index of the founded tuple index. Returns -1 if not found
         * @param arr Array<{ normals: Array<number>, idx: Array<number> }>
         * @param obj Array<number>
         * @returns {boolean}
         */
        private _isInArray;
        private _isInArrayUV;
        /**
         * This function set the data for each triangle.
         * Data are position, normals and uvs
         * If a tuple of (position, normal) is not set, add the data into the corresponding array
         * If the tuple already exist, add only their indice
         *
         * @param data The vertex's data
         * * indicesPositionFromObj: The index in positions array
         * * indicesUvsFromObj: The index in uvs array
         * * indicesNormalFromObj: The index in normals array
         * * positionVectorFromOBJ: The value of position at index objIndice
         * * textureVectorFromOBJ: The value of uvs
         * * normalsVectorFromOBJ: The value of normals at index objNormale
         * * positionColorsFromOBJ: The value of color at index objIndice
         */
        private _setData;
        /**
         * Transform Vector() and BABYLON.Color() objects into numbers in an array
         */
        private _unwrapData;
        /**
         * Create triangles from polygons
         * It is important to notice that a triangle is a polygon
         * We get 5 patterns of face defined in OBJ File :
         * facePattern1 = ["1","2","3","4","5","6"]
         * facePattern2 = ["1/1","2/2","3/3","4/4","5/5","6/6"]
         * facePattern3 = ["1/1/1","2/2/2","3/3/3","4/4/4","5/5/5","6/6/6"]
         * facePattern4 = ["1//1","2//2","3//3","4//4","5//5","6//6"]
         * facePattern5 = ["-1/-1/-1","-2/-2/-2","-3/-3/-3","-4/-4/-4","-5/-5/-5","-6/-6/-6"]
         * Each pattern is divided by the same method
         * @param faces Array[String] The indices of elements
         * @param v Integer The variable to increment
         */
        private _getTriangles;
        /**
         * To get color between color and extension color
         * @param index Integer The index of the element in the array
         * @returns value of target color
         */
        private _getColor;
        /**
         * Create triangles and push the data for each polygon for the pattern 1
         * In this pattern we get vertice positions
         * @param face
         * @param v
         */
        private _setDataForCurrentFaceWithPattern1;
        /**
         * Create triangles and push the data for each polygon for the pattern 2
         * In this pattern we get vertice positions and uvs
         * @param face
         * @param v
         */
        private _setDataForCurrentFaceWithPattern2;
        /**
         * Create triangles and push the data for each polygon for the pattern 3
         * In this pattern we get vertice positions, uvs and normals
         * @param face
         * @param v
         */
        private _setDataForCurrentFaceWithPattern3;
        /**
         * Create triangles and push the data for each polygon for the pattern 4
         * In this pattern we get vertice positions and normals
         * @param face
         * @param v
         */
        private _setDataForCurrentFaceWithPattern4;
        private _setDataForCurrentFaceWithPattern5;
        private _addPreviousObjMesh;
        private _optimizeNormals;
        private static _IsLineElement;
        private static _IsObjectElement;
        private static _IsGroupElement;
        private static _GetZbrushMRGB;
        /**
         * Function used to parse an OBJ string
         * @param meshesNames defines the list of meshes to load (all if not defined)
         * @param data defines the OBJ string
         * @param scene defines the hosting scene
         * @param assetContainer defines the asset container to load data in
         * @param onFileToLoadFound defines a callback that will be called if a MTL file is found
         */
        parse(meshesNames: any, data: string, scene: Scene, assetContainer: Nullable<AssetContainer>, onFileToLoadFound: (fileToLoad: string) => void): void;
    }


    /**
     * Options for loading OBJ/MTL files
     */
    export type OBJLoadingOptions = {
        /**
         * Defines if UVs are optimized by default during load.
         */
        optimizeWithUV: boolean;
        /**
         * Defines custom scaling of UV coordinates of loaded meshes.
         */
        UVScaling: Vector2;
        /**
         * Invert model on y-axis (does a model scaling inversion)
         */
        invertY: boolean;
        /**
         * Invert Y-Axis of referenced textures on load
         */
        invertTextureY: boolean;
        /**
         * Include in meshes the vertex colors available in some OBJ files.  This is not part of OBJ standard.
         */
        importVertexColors: boolean;
        /**
         * Compute the normals for the model, even if normals are present in the file.
         */
        computeNormals: boolean;
        /**
         * Optimize the normals for the model. Lighting can be uneven if you use OptimizeWithUV = true because new vertices can be created for the same location if they pertain to different faces.
         * Using OptimizehNormals = true will help smoothing the lighting by averaging the normals of those vertices.
         */
        optimizeNormals: boolean;
        /**
         * Skip loading the materials even if defined in the OBJ file (materials are ignored).
         */
        skipMaterials: boolean;
        /**
         * When a material fails to load OBJ loader will silently fail and onSuccess() callback will be triggered.
         */
        materialLoadingFailsSilently: boolean;
        /**
         * Loads assets without handedness conversions. This flag is for compatibility. Use it only if absolutely required. Defaults to false.
         */
        useLegacyBehavior: boolean;
    };


    export var OBJFileLoaderMetadata: {
        readonly name: "obj";
        readonly extensions: ".obj";
    };


        interface SceneLoaderPluginOptions {
            /**
             * Defines options for the obj loader.
             */
            [OBJFileLoaderMetadata.name]: Partial<OBJLoadingOptions>;
        }
    /**
     * OBJ file type loader.
     * This is a babylon scene loader plugin.
     */
    export class OBJFileLoader implements ISceneLoaderPluginAsync, ISceneLoaderPluginFactory {
        /**
         * Defines if UVs are optimized by default during load.
         */
        static OPTIMIZE_WITH_UV: boolean;
        /**
         * Invert model on y-axis (does a model scaling inversion)
         */
        static INVERT_Y: boolean;
        /**
         * Invert Y-Axis of referenced textures on load
         */
        static get INVERT_TEXTURE_Y(): boolean;
        static set INVERT_TEXTURE_Y(value: boolean);
        /**
         * Include in meshes the vertex colors available in some OBJ files.  This is not part of OBJ standard.
         */
        static IMPORT_VERTEX_COLORS: boolean;
        /**
         * Compute the normals for the model, even if normals are present in the file.
         */
        static COMPUTE_NORMALS: boolean;
        /**
         * Optimize the normals for the model. Lighting can be uneven if you use OptimizeWithUV = true because new vertices can be created for the same location if they pertain to different faces.
         * Using OptimizehNormals = true will help smoothing the lighting by averaging the normals of those vertices.
         */
        static OPTIMIZE_NORMALS: boolean;
        /**
         * Defines custom scaling of UV coordinates of loaded meshes.
         */
        static UV_SCALING: Vector2;
        /**
         * Skip loading the materials even if defined in the OBJ file (materials are ignored).
         */
        static SKIP_MATERIALS: boolean;
        /**
         * When a material fails to load OBJ loader will silently fail and onSuccess() callback will be triggered.
         *
         * Defaults to true for backwards compatibility.
         */
        static MATERIAL_LOADING_FAILS_SILENTLY: boolean;
        /**
         * Loads assets without handedness conversions. This flag is for compatibility. Use it only if absolutely required. Defaults to false.
         */
        static USE_LEGACY_BEHAVIOR: boolean;
        /**
         * Defines the name of the plugin.
         */
        readonly name: "obj";
        /**
         * Defines the extension the plugin is able to load.
         */
        readonly extensions: ".obj";
        private _assetContainer;
        private _loadingOptions;
        /**
         * Creates loader for .OBJ files
         *
         * @param loadingOptions options for loading and parsing OBJ/MTL files.
         */
        constructor(loadingOptions?: Partial<Readonly<OBJLoadingOptions>>);
        private static get _DefaultLoadingOptions();
        /**
         * Calls synchronously the MTL file attached to this obj.
         * Load function or importMesh function don't enable to load 2 files in the same time asynchronously.
         * Without this function materials are not displayed in the first frame (but displayed after).
         * In consequence it is impossible to get material information in your HTML file
         *
         * @param url The URL of the MTL file
         * @param rootUrl defines where to load data from
         * @param onSuccess Callback function to be called when the MTL file is loaded
         * @param onFailure
         */
        private _loadMTL;
        /** @internal */
        createPlugin(options: SceneLoaderPluginOptions): ISceneLoaderPluginAsync | ISceneLoaderPlugin;
        /**
         * If the data string can be loaded directly.
         * @returns if the data can be loaded directly
         */
        canDirectLoad(): boolean;
        /**
         * Imports one or more meshes from the loaded OBJ data and adds them to the scene
         * @param meshesNames a string or array of strings of the mesh names that should be loaded from the file
         * @param scene the scene the meshes should be added to
         * @param data the OBJ data to load
         * @param rootUrl root url to load from
         * @returns a promise containing the loaded meshes, particles, skeletons and animations
         */
        importMeshAsync(meshesNames: any, scene: Scene, data: any, rootUrl: string): Promise<ISceneLoaderAsyncResult>;
        /**
         * Imports all objects from the loaded OBJ data and adds them to the scene
         * @param scene the scene the objects should be added to
         * @param data the OBJ data to load
         * @param rootUrl root url to load from
         * @returns a promise which completes when objects have been loaded to the scene
         */
        loadAsync(scene: Scene, data: string, rootUrl: string): Promise<void>;
        /**
         * Load into an asset container.
         * @param scene The scene to load into
         * @param data The data to import
         * @param rootUrl The root url for scene and resources
         * @returns The loaded asset container
         */
        loadAssetContainerAsync(scene: Scene, data: string, rootUrl: string): Promise<AssetContainer>;
        /**
         * Read the OBJ file and create an Array of meshes.
         * Each mesh contains all information given by the OBJ and the MTL file.
         * i.e. vertices positions and indices, optional normals values, optional UV values, optional material
         * @param meshesNames defines a string or array of strings of the mesh names that should be loaded from the file
         * @param scene defines the scene where are displayed the data
         * @param data defines the content of the obj file
         * @param rootUrl defines the path to the folder
         * @returns the list of loaded meshes
         */
        private _parseSolidAsync;
    }


    /**
     * Class reading and parsing the MTL file bundled with the obj file.
     */
    export class MTLFileLoader {
        /**
         * Invert Y-Axis of referenced textures on load
         */
        static INVERT_TEXTURE_Y: boolean;
        /**
         * All material loaded from the mtl will be set here
         */
        materials: StandardMaterial[];
        /**
         * This function will read the mtl file and create each material described inside
         * This function could be improve by adding :
         * -some component missing (Ni, Tf...)
         * -including the specific options available
         *
         * @param scene defines the scene the material will be created in
         * @param data defines the mtl data to parse
         * @param rootUrl defines the rooturl to use in order to load relative dependencies
         * @param assetContainer defines the asset container to store the material in (can be null)
         */
        parseMTL(scene: Scene, data: string | ArrayBuffer, rootUrl: string, assetContainer: Nullable<AssetContainer>): void;
        /**
         * Gets the texture for the material.
         *
         * If the material is imported from input file,
         * We sanitize the url to ensure it takes the texture from aside the material.
         *
         * @param rootUrl The root url to load from
         * @param value The value stored in the mtl
         * @param scene
         * @returns The Texture
         */
        private static _GetTexture;
    }






    /**
     * Options for loading BVH files
     */
    export type BVHLoadingOptions = {
        /**
         * Defines the loop mode of the animation to load.
         */
        loopMode: number;
    };


    /**
     * Reads a BVH file, returns a skeleton
     * @param text - The BVH file content
     * @param scene - The scene to add the skeleton to
     * @param assetContainer - The asset container to add the skeleton to
     * @param loadingOptions - The loading options
     * @returns The skeleton
     */
    export function ReadBvh(text: string, scene: Scene, assetContainer: Nullable<AssetContainer>, loadingOptions: BVHLoadingOptions): Skeleton;


    export var BVHFileLoaderMetadata: {
        readonly name: "bvh";
        readonly extensions: {
            readonly ".bvh": {
                readonly isBinary: false;
            };
        };
    };


        interface SceneLoaderPluginOptions {
            /**
             * Defines options for the bvh loader.
             */
            [BVHFileLoaderMetadata.name]: Partial<BVHLoadingOptions>;
        }
    /**
     * @experimental
     * BVH file type loader.
     * This is a babylon scene loader plugin.
     */
    export class BVHFileLoader implements ISceneLoaderPluginAsync, ISceneLoaderPluginFactory {
        /**
         * Name of the loader ("bvh")
         */
        readonly name: "bvh";
        /** @internal */
        readonly extensions: {
            readonly ".bvh": {
                readonly isBinary: false;
            };
        };
        private readonly _loadingOptions;
        /**
         * Creates loader for bvh motion files
         * @param loadingOptions - Options for the bvh loader
         */
        constructor(loadingOptions?: Partial<Readonly<BVHLoadingOptions>>);
        private static get _DefaultLoadingOptions();
        /** @internal */
        createPlugin(options: SceneLoaderPluginOptions): ISceneLoaderPluginAsync;
        /**
         * If the data string can be loaded directly.
         * @param data - direct load data
         * @returns if the data can be loaded directly
         */
        canDirectLoad(data: string): boolean;
        isBvhHeader(text: string): boolean;
        isNotBvhHeader(text: string): boolean;
        /**
         * Imports  from the loaded gaussian splatting data and adds them to the scene
         * @param _meshesNames a string or array of strings of the mesh names that should be loaded from the file
         * @param scene the scene the meshes should be added to
         * @param data the bvh data to load
         * @returns a promise containing the loaded skeletons and animations
         */
        importMeshAsync(_meshesNames: string | readonly string[] | null | undefined, scene: Scene, data: unknown): Promise<ISceneLoaderAsyncResult>;
        /**
         * Imports all objects from the loaded bvh data and adds them to the scene
         * @param scene the scene the objects should be added to
         * @param data the bvh data to load
         * @returns a promise which completes when objects have been loaded to the scene
         */
        loadAsync(scene: Scene, data: unknown): Promise<void>;
        /**
         * Load into an asset container.
         * @param scene The scene to load into
         * @param data The data to import
         * @returns The loaded asset container
         */
        loadAssetContainerAsync(scene: Scene, data: unknown): Promise<AssetContainer>;
    }



}


                