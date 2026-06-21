
declare module ADDONS {


    /**
     * Recast injection type
     */
    export type RecastInjection = any;
    /**
     * Off-mesh connection data
     */
    export interface IOffMeshConnection {
        /**
         * The start position of the off-mesh connection.
         */
        startPosition: BABYLON.IVector3Like;
        /**
         * The end position of the off-mesh connection.
         */
        endPosition: BABYLON.IVector3Like;
        /**
         * The radius of the off-mesh connection.
         */
        radius: number;
        /**
         * The type of the off-mesh connection.
         */
        bidirectional: boolean;
        /**
         * The area type of the off-mesh connection.
         */
        area: number;
        /**
         * The flags of the off-mesh connection.
         */
        flags: number;
        /**
         * The user ID of the off-mesh connection.
         * @remarks This can be used to associate the off-mesh connection with a specific user
         */
        userId?: number;
    }
    /**
     * Result of a navigation mesh creation.
     */
    export type CreateNavMeshResult = BABYLON.Nullable<{
        /**
         * Navigation mesh
         */
        navMesh: any;
        /**
         * Navigation mesh query
         */
        navMeshQuery: any;
        /**
         * Intermediates generated during the any creation process.
         * @remarks This is only available if the `keepIntermediates` parameter is set to true in the `INavMeshParametersV2`.
         * It can be used for debugging or visualization purposes.
         */
        intermediates?: GeneratorIntermediates;
        /**
         * Tile cache generated during the any creation process.
         * @remarks This is only available if the `maxObstacles` parameter is set to a value greater than 0 in the `INavMeshParametersV2`. Defaults `maxObstacles` to 128.
         * It can be used for obstacle avoidance and dynamic navigation mesh updates.
         * @see {@link INavMeshParametersV2}
         */
        tileCache?: any;
    }>;
    /**
     * Agent parameters
     * For actual limits and default values check the recast-navigation-js docs.
     * @see https://docs.recast-navigation-js.isaacmason.com/types/index.CrowdAgentParams.html
     */
    export interface IAgentParametersV2 extends BABYLON.IAgentParameters {
        /**
         * Flags that impact steering behavior.
         */
        updateFlags: number;
        /**
         * The index of the avoidance configuration to use for the agent. [Limits: 0 to #DT_CROWD_MAX_OBSTAVOIDANCE_PARAMS inclusive]
         */
        obstacleAvoidanceType: number;
        /**
         * The index of the query filter used by this agent.
         */
        queryFilterType: number;
        /**
         * User defined data attached to the agent.
         */
        userData: unknown;
    }
    /**
     * any parameters
     * For actual limits and default values check the recast-navigation-js docs.
     * @see https://docs.recast-navigation-js.isaacmason.com/types/index.RecastConfig.html
     */
    export interface INavMeshParametersV2 extends BABYLON.INavMeshParameters {
        /**
         * OffMeshConnections - Teleports
         */
        offMeshConnections?: IOffMeshConnection[];
        /**
         * Whether to keep intermediate navigation mesh data for debug visualization. Default is false.
         */
        keepIntermediates?: boolean;
        /**
         * The maximum number of obstacles that can be added to the navigation mesh. Default is 32.
         * If this value is greater then 0, the navigation mesh will be generated with a tile cache.
         */
        maxObstacles?: number;
        /**
         * The size of each tile in the tiled navigation mesh. Default is 32.
         */
        expectedLayersPerTile?: number;
        /**
         * Function which is sets the polyAreas and polyFlags for the tile cache mesh. Defaults to a function that sets all areas to 0 and flags to 1.
         */
        tileCacheMeshProcess?: any;
        /**
         * Don't reverse indices of the source mesh
         */
        doNotReverseIndices?: boolean;
    }
    /**
     * Result of a steer target computation.
     */
    export type SteerTargetResult = {
        /**
         * Indicates whether the steering target computation was successful.
         */
        success: false;
    } | {
        /**
         * Indicates whether the steering target computation was successful.
         */
        success: true;
        /**
         * The position to steer towards.
         */
        steerPos: BABYLON.Vector3;
        /**
         * The flag indicating the type of steering position.
         */
        steerPosFlag: number;
        /**
         * The reference to the polygon that the steering position is associated with.
         */
        steerPosRef: number;
        /**
         * The points that make up the path to the steering position.
         */
        points: BABYLON.Vector3[];
    };
    /**
     * Error types for path computation.
     */
    export var ComputePathError: {
        START_NEAREST_POLY_FAILED: string;
        END_NEAREST_POLY_FAILED: string;
        FIND_PATH_FAILED: string;
        NO_POLYGON_PATH_FOUND: string;
        NO_CLOSEST_POINT_ON_LAST_POLYGON_FOUND: string;
    };
    export type ComputePathErrorType = (typeof ComputePathError)[keyof typeof ComputePathError];
    /**
     * Result of a path computation.
     */
    export type ComputePathResult = {
        /**
         * Indicates whether the path computation was successful.
         */
        success: boolean;
        /**
         * The error message if the path computation failed.
         */
        error?: {
            /**
             * A descriptive error message.
             */
            name?: string;
            /**
             * The type of error that occurred during path computation.
             * @remarks This will be one of the values from `ComputePathError`
             */
            type?: ComputePathErrorType;
            /**
             * Status describing the error.
             */
            status?: number;
        };
        /**
         * The computed path as an array of BABYLON.Vector3 points.
         */
        path: BABYLON.IVector3Like[];
    };
    /**
     * Intermediates generated during the any creation process.
     * @remarks This is only available if the `keepIntermediates` parameter is set to true in the `INavMeshParametersV2`.
     * It can be used for debugging or visualization purposes.
     */
    export type GeneratorIntermediates = any | any | any | null;




    /**
     * Generates a navigation mesh in a web worker.
     */
    export function GenerateNavMeshWorker(): void;




    /**
     * Navigation plugin for Babylon.js. It is a simple wrapper around the recast-navigation-js library. Not all features are implemented.
     * @remarks This plugin provides navigation mesh generation and pathfinding capabilities using the recast-navigation-js library
     * @remarks It supports both single-threaded and multi-threaded generation of navigation meshes.
     * @remarks The plugin can be used to create navigation meshes from meshes in a scene, compute paths, and manage crowd agents, etc.
     * @remarks It also provides methods for creating obstacles and querying the navigation mesh.
     * @see https://github.com/isaac-mason/recast-navigation-js
     */
    export class RecastNavigationJSPluginV2 implements BABYLON.INavigationEnginePlugin {
        /**
         *  Creates a navigation mesh - will be injected by the factory
         * @param meshes array of all the geometry used to compute the navigation mesh
         * @param parameters bunch of parameters used to filter geometry
         * @returns the created navmesh and navmesh query
         */
        createNavMeshImpl: (meshes: Array<BABYLON.Mesh>, parameters: INavMeshParametersV2) => CreateNavMeshResult;
        /**
         * Creates a navigation mesh - will be injected by the factory
         * @param meshes array of all the geometry used to compute the navigation mesh
         * @param parameters bunch of parameters used to filter geometry
         * @returns the created navmesh and navmesh query
         */
        createNavMeshAsyncImpl: (meshes: Array<BABYLON.Mesh>, parameters: INavMeshParametersV2) => Promise<CreateNavMeshResult>;
        /**
         * recast-navigation-js injection
         */
        bjsRECAST: RecastInjection;
        /**
         * plugin name
         */
        name: string;
        /**
         * the navmesh created
         */
        navMesh?: any;
        /**
         * The navmesh query created from the navmesh
         * @remarks This is used to query the navmesh for pathfinding and other navigation tasks
         */
        get navMeshQuery(): any;
        private _navMeshQuery;
        /**
         * Intermediates generated during the navmesh creation
         * @remarks This is used for debugging and visualization purposes.
         * @remarks You have access to vertices, indices and vertex colors to visualize the navmesh creation process.
         * @remarks This is only available if the `keepIntermediates` parameter is set
         * @remarks to true during navmesh generation.
         */
        private _intermediates?;
        /**
         * Gets the intermediates generated during the navmesh creation
         * @returns The generator intermediates, or undefined if not available
         */
        get intermediates(): GeneratorIntermediates | undefined;
        /**
         * Tile cache used for tiled navigation meshes
         * @remarks This is used to store and manage tiles of the navigation mesh for efficient path and when obstacles are used.
         */
        private _tileCache?;
        /**
         * Gets the tile cache used for tiled navigation meshes
         * @returns The tile cache instance, or undefined if not available
         */
        get tileCache(): any | undefined;
        private _maximumSubStepCount;
        private _timeStep;
        private _timeFactor;
        private _crowd?;
        /**
         * Creates a RecastNavigationJSPluginV2 instance
         * @param recastInjection The recast-navigation-js injection containing core and generators
         */
        constructor(recastInjection?: RecastInjection);
        /**
         * Set the time step of the navigation tick update.
         * Default is 1/60.
         * A value of 0 will disable fixed time update
         * @param newTimeStep the new timestep to apply to this world.
         */
        setTimeStep(newTimeStep?: number): void;
        /**
         * Get the time step of the navigation tick update.
         * @returns the current time step
         */
        getTimeStep(): number;
        /**
         * If delta time in navigation tick update is greater than the time step
         * a number of sub iterations are done. If more iterations are need to reach deltatime
         * they will be discarded.
         * A value of 0 will set to no maximum and update will use as many substeps as needed
         * @param newStepCount the maximum number of iterations
         */
        setMaximumSubStepCount(newStepCount?: number): void;
        /**
         * Get the maximum number of iterations per navigation tick update
         * @returns the maximum number of iterations
         */
        getMaximumSubStepCount(): number;
        /**
         * Time factor applied when updating crowd agents (default 1). A value of 0 will pause crowd updates.
         * @param value the time factor applied at update
         */
        set timeFactor(value: number);
        /**
         * Get the time factor used for crowd agent update
         * @returns the time factor
         */
        get timeFactor(): number;
        /**
         * Creates a navigation mesh - will be injected by the factory
         * @param meshes array of all the geometry used to compute the navigation mesh
         * @param parameters bunch of parameters used to filter geometry
         * @returns the created navmesh and navmesh query
         * @throws Error if the function is not injected yet or if the navmesh is not created
         */
        createNavMesh(meshes: Array<BABYLON.Mesh>, parameters: INavMeshParametersV2): CreateNavMeshResult;
        /**
         * Creates a navigation mesh asynchronously - will be injected by the factory
         * @param meshes array of all the geometry used to compute the navigation mesh
         * @param parameters bunch of parameters used to filter geometry
         * @returns the created navmesh and navmesh query
         * @throws Error if the function is not injected yet or if the navmesh is not created
         */
        createNavMeshAsync(meshes: Array<BABYLON.Mesh>, parameters: INavMeshParametersV2): Promise<CreateNavMeshResult>;
        /**
         * Create a navigation mesh debug mesh
         * @param scene is where the mesh will be added
         * @returns debug display mesh
         */
        createDebugNavMesh(scene: BABYLON.Scene): BABYLON.Mesh;
        /**
         * Get a navigation mesh constrained position, closest to the parameter position
         * @param position world position
         * @returns the closest point to position constrained by the navigation mesh
         */
        getClosestPoint(position: BABYLON.IVector3Like, options?: {
            /**
             * The polygon filter to apply to the query.
             */
            filter?: any;
            /**
             * Half extents for the search box
             */
            halfExtents?: BABYLON.IVector3Like;
        }): BABYLON.Vector3;
        /**
         * Get a navigation mesh constrained position, closest to the parameter position
         * @param position world position
         * @param result output the closest point to position constrained by the navigation mesh
         */
        getClosestPointToRef(position: BABYLON.IVector3Like, result: BABYLON.Vector3, options?: {
            /**
             * The polygon filter to apply to the query.
             */
            filter?: any;
            /**
             * Half extents for the search box
             */
            halfExtents?: BABYLON.IVector3Like;
        }): void;
        /**
         * Get a navigation mesh constrained position, within a particular radius
         * @param position world position
         * @param maxRadius the maximum distance to the constrained world position
         * @returns the closest point to position constrained by the navigation mesh
         */
        getRandomPointAround(position: BABYLON.IVector3Like, maxRadius: number, options?: {
            startRef?: number;
            /**
             * The polygon filter to apply to the query.
             */
            filter?: any;
            /**
             * Half extents for the search box
             */
            halfExtents?: BABYLON.IVector3Like;
        }): BABYLON.Vector3;
        /**
         * Get a navigation mesh constrained position, within a particular radius
         * @param position world position
         * @param maxRadius the maximum distance to the constrained world position
         * @param result output the closest point to position constrained by the navigation mesh
         */
        getRandomPointAroundToRef(position: BABYLON.IVector3Like, maxRadius: number, result: BABYLON.Vector3, options?: {
            startRef?: number;
            /**
             * The polygon filter to apply to the query.
             */
            filter?: any;
            /**
             * Half extents for the search box
             */
            halfExtents?: BABYLON.IVector3Like;
        }): void;
        /**
         * Compute the final position from a segment made of destination-position
         * @param position position to start from
         * @param destination position to go to
         * @param startRef the reference id of the start polygon
         * @param options options for the function
         * @returns the resulting point along the navmesh
         */
        moveAlong(position: BABYLON.IVector3Like, destination: BABYLON.IVector3Like, startRef?: number, options?: {
            /**
             * The polygon filter to apply to the query.
             */
            filter?: any;
            /**
             * The maximum number of polygons the output visited array can hold.
             */
            maxVisitedSize?: number;
        }): BABYLON.Vector3;
        /**
         * Compute the final position from a segment made of destination-position
         * @param position world position
         * @param destination world position
         * @param result output the resulting point along the navmesh
         * @param startRef the reference id of the start polygon.
         * @param options options for the function
         */
        moveAlongToRef(position: BABYLON.IVector3Like, destination: BABYLON.IVector3Like, result: BABYLON.Vector3, startRef?: number, options?: {
            /**
             * The polygon filter to apply to the query.
             */
            filter?: any;
            maxVisitedSize?: number;
        }): void;
        /**
         * Compute a navigation path from start to end. Returns an empty array if no path can be computed
         * Path is straight.
         * @param start world position
         * @param end world position
         * @param options options for the function
         * @returns array containing world position composing the path
         */
        computePath(start: BABYLON.IVector3Like, end: BABYLON.IVector3Like, options?: {
            /**
             * The polygon filter to apply to the query.
             */
            filter?: any;
            /**
             * Half extents for the search box
             */
            halfExtents?: BABYLON.IVector3Like;
            maxPathPolys?: number;
            maxStraightPathPoints?: number;
        }): BABYLON.Vector3[];
        /**
         * Compute a navigation path from start to end. Returns an empty array if no path can be computed.
         * Path follows navigation mesh geometry.
         * @param start world position
         * @param end world position
         * @param options options to configure the path computation
         * @returns array containing world position composing the path
         */
        computePathSmooth(start: BABYLON.Vector3, end: BABYLON.Vector3, options?: {
            /**
             * The polygon filter to apply to the query.
             */
            filter?: any;
            /**
             * Half extents for the search box
             */
            halfExtents?: BABYLON.IVector3Like;
            maxPathPolys?: number;
            maxSmoothPathPoints?: number;
            stepSize?: number;
            slop?: number;
        }): BABYLON.Vector3[];
        /**
         * Create a new Crowd so you can add agents
         * @param maxAgents the maximum agent count in the crowd
         * @param maxAgentRadius the maximum radius an agent can have
         * @param scene to attach the crowd to
         * @returns the crowd you can add agents to
         */
        createCrowd(maxAgents: number, maxAgentRadius: number, scene: BABYLON.Scene): BABYLON.ICrowd;
        /**
         * Set the Bounding box extent for doing spatial queries (getClosestPoint, getRandomPointAround, ...)
         * The queries will try to find a solution within those bounds
         * default is (1,1,1)
         * @param extent x,y,z value that define the extent around the queries point of reference
         */
        setDefaultQueryExtent(extent: BABYLON.IVector3Like): void;
        /**
         * Get the Bounding box extent specified by setDefaultQueryExtent
         * @returns the box extent values
         */
        getDefaultQueryExtent(): BABYLON.Vector3;
        /**
         * Get the Bounding box extent result specified by setDefaultQueryExtent
         * @param result output the box extent values
         */
        getDefaultQueryExtentToRef(result: BABYLON.Vector3): void;
        /**
         * build the navmesh from a previously saved state using getNavmeshData
         * @param data the Uint8Array returned by getNavmeshData
         */
        buildFromNavmeshData(data: Uint8Array): void;
        /**
         * returns the navmesh data that can be used later. The navmesh must be built before retrieving the data
         * @returns data the Uint8Array that can be saved and reused
         */
        getNavmeshData(): Uint8Array;
        /**
         * build the tile cache from a previously saved state using getTileCacheData
         * @param tileCacheData the data returned by getTileCacheData
         * @param tileCacheMeshProcess optional process to apply to each tile created
         */
        buildFromTileCacheData(tileCacheData: Uint8Array, tileCacheMeshProcess?: any): void;
        /**
         * returns the tile cache data that can be used later. The tile cache must be built before retrieving the data
         * @returns the tile cache data that can be used later. The tile cache must be built before retrieving the data
         * @throws Error if there is no any generated
         * @remarks The returned data can be used to rebuild the tile cache later using buildFromTileCacheData
         */
        getTileCacheData(): Uint8Array;
        /**
         * Disposes
         */
        dispose(): void;
        /**
         * Creates a cylinder obstacle and add it to the navigation
         * @param position world position
         * @param radius cylinder radius
         * @param height cylinder height
         * @param doNotWaitForCacheUpdate if true the function will not wait for the tile cache to be fully updated before returning
         * @returns the obstacle freshly created
         */
        addCylinderObstacle(position: BABYLON.IVector3Like, radius: number, height: number, doNotWaitForCacheUpdate?: boolean): BABYLON.Nullable<BABYLON.IObstacle>;
        /**
         * Creates an oriented box obstacle and add it to the navigation
         * @param position world position
         * @param extent box size
         * @param angle angle in radians of the box orientation on Y axis
         * @param doNotWaitForCacheUpdate if true the function will not wait for the tile cache to be fully updated before returning
         * @returns the obstacle freshly created
         */
        addBoxObstacle(position: BABYLON.IVector3Like, extent: BABYLON.IVector3Like, angle: number, doNotWaitForCacheUpdate?: boolean): BABYLON.Nullable<BABYLON.IObstacle>;
        /**
         * Removes an obstacle created by addCylinderObstacle or addBoxObstacle
         * @param obstacle obstacle to remove from the navigation
         * @param doNotWaitForCacheUpdate if true the function will not wait for the tile cache to be fully updated before returning
         *
         */
        removeObstacle(obstacle: BABYLON.IObstacle, doNotWaitForCacheUpdate?: boolean): void;
        /**
         * If this plugin is supported
         * @returns true if plugin is supported
         */
        isSupported(): boolean;
        /**
         * Returns the seed used for randomized functions like `getRandomPointAround`
         * @returns seed number
         */
        getRandomSeed(): number;
        /**
         * Set the seed used for randomized functions like `getRandomPointAround`
         * @param seed number used as seed for random functions
         */
        setRandomSeed(seed: number): void;
        /**
         * Perform a raycast on the navmesh
         * @param start start position
         * @param end end position
         * @returns if a direct path exists between start and end, and the hit point if any
         */
        raycast(start: BABYLON.IVector3Like, end: BABYLON.IVector3Like): {
            hit: boolean;
            hitPoint?: undefined;
        } | {
            hit: boolean;
            hitPoint: BABYLON.Vector3;
        };
        /**
         * Compute the final position from a segment made of destination-position, and return the height of the polygon
         * This is a more sophisticated version of moveAlong that will use the height of the polygon at the end position
         * @param position world position to start from
         * @param velocity velocity of the movement
         * @param options options for the function
         * @returns the resulting point along the navmesh, the polygon reference id and the height of the polygon
         */
        moveAlongWithVelocity(position: BABYLON.IVector3Like, velocity: BABYLON.IVector3Like, options?: {
            /**
             * The polygon filter to apply to the query.
             */
            filter?: any;
            /**
             * Half extents for the search box
             */
            halfExtents?: BABYLON.IVector3Like;
            /**
             * The maximum number of polygons the output visited array can hold.
             */
            maxVisitedSize?: number;
        }): {
            position: {
                x: number;
                y: number;
                z: number;
            };
            polyRef: number;
            height: number;
        };
        /**
         * Handles common post-processing and validation of navmesh creation results
         * @param result The partial result from navmesh creation
         * @returns The validated and complete CreateNavMeshresult
         */
        private _processNavMeshResult;
        private _preprocessParameters;
    }


    /**
     * Recast Detour crowd implementation
     * This class provides methods to manage a crowd of agents, allowing them to navigate a navigation mesh.
     * It supports adding agents, updating their parameters, moving them to destinations, and checking their states.
     * The crowd is updated in the scene's animation loop, and it notifies observers when agents reach their destinations.
     */
    export class RecastJSCrowd implements BABYLON.ICrowd {
        /**
         * Recast plugin
         */
        get navigationPlugin(): RecastNavigationJSPluginV2;
        /**
         * Link to the detour crowd
         */
        get recastCrowd(): any;
        /**
         * One transform per agent
         */
        get transforms(): BABYLON.TransformNode[];
        /**
         * All agents created
         */
        get agents(): readonly number[];
        /**
         * Agents reach radius
         */
        get reachRadii(): readonly number[];
        private _navigationPlugin;
        private _recastCrowd;
        private _transforms;
        private _agents;
        private _reachRadii;
        /**
         * true when a destination is active for an agent and notifier hasn't been notified of reach
         */
        private _agentDestinationArmed;
        /**
         * agent current target
         */
        private _agentDestination;
        /**
         * Link to the scene is kept to unregister the crowd from the scene
         */
        private _scene;
        private _engine;
        /**
         * Observer for crowd updates
         */
        private _onBeforeAnimationsObserver;
        /**
         * Fires each time an agent is in reach radius of its destination
         */
        onReachTargetObservable: BABYLON.Observable<{
            /**
             * The index of the agent that reached its target
             */
            agentIndex: number;
            /**
             * The destination that the agent reached
             */
            destination: BABYLON.Vector3;
        }>;
        /**
         * Constructor
         * @param plugin recastJS plugin
         * @param maxAgents the maximum agent count in the crowd
         * @param maxAgentRadius the maximum radius an agent can have
         * @param scene to attach the crowd to
         * @returns the crowd you can add agents to
         */
        constructor(plugin: RecastNavigationJSPluginV2, maxAgents: number, maxAgentRadius: number, scene: BABYLON.Scene);
        /**
         * Add a new agent to the crowd with the specified parameter a corresponding transformNode.
         * You can attach anything to that node. The node position is updated in the scene update tick.
         * @param pos world position that will be constrained by the navigation mesh
         * @param parameters agent parameters
         * @param transform hooked to the agent that will be update by the scene
         * @returns agent index
         */
        addAgent(pos: BABYLON.IVector3Like, parameters: IAgentParametersV2, transform: BABYLON.TransformNode): number;
        /**
         * Returns the agent position in world space
         * @param index agent index returned by addAgent
         * @returns world space position
         */
        getAgentPosition(index: number): BABYLON.Vector3;
        /**
         * Returns the agent position result in world space
         * @param index agent index returned by addAgent
         * @param result output world space position
         */
        getAgentPositionToRef(index: number, result: BABYLON.Vector3): void;
        /**
         * Returns the agent velocity in world space
         * @param index agent index returned by addAgent
         * @returns world space velocity
         */
        getAgentVelocity(index: number): BABYLON.Vector3;
        /**
         * Returns the agent velocity result in world space
         * @param index agent index returned by addAgent
         * @param result output world space velocity
         */
        getAgentVelocityToRef(index: number, result: BABYLON.Vector3): void;
        /**
         * Returns the agent next target point on the path
         * @param index agent index returned by addAgent
         * @returns world space position
         */
        getAgentNextTargetPath(index: number): BABYLON.Vector3;
        /**
         * Returns the agent next target point on the path
         * @param index agent index returned by addAgent
         * @param result output world space position
         */
        getAgentNextTargetPathToRef(index: number, result: BABYLON.Vector3): void;
        /**
         * Gets the agent state
         * @param index agent index returned by addAgent
         * @returns agent state, 0 = DT_CROWDAGENT_STATE_INVALID, 1 = DT_CROWDAGENT_STATE_WALKING, 2 = DT_CROWDAGENT_STATE_OFFMESH
         */
        getAgentState(index: number): number;
        /**
         * returns true if the agent in over an off mesh link connection
         * @param index agent index returned by addAgent
         * @returns true if over an off mesh link connection
         */
        overOffmeshConnection(index: number): boolean;
        /**
         * Asks a particular agent to go to a destination. That destination is constrained by the navigation mesh
         * @param index agent index returned by addAgent
         * @param destination targeted world position
         */
        agentGoto(index: number, destination: BABYLON.IVector3Like): void;
        /**
         * Teleport the agent to a new position
         * @param index agent index returned by addAgent
         * @param destination targeted world position
         */
        agentTeleport(index: number, destination: BABYLON.IVector3Like): void;
        /**
         * Update agent parameters
         * @param index agent index returned by addAgent
         * @param parameters agent parameters
         */
        updateAgentParameters(index: number, parameters: IAgentParametersV2): void;
        /**
         * remove a particular agent previously created
         * @param index agent index returned by addAgent
         */
        removeAgent(index: number): void;
        /**
         * get the list of all agents attached to this crowd
         * @returns list of agent indices
         */
        getAgents(): number[];
        /**
         * Tick update done by the BABYLON.Scene. Agent position/velocity/acceleration is updated by this function
         * @param deltaTime in seconds
         */
        update(deltaTime: number): void;
        /**
         * Set the Bounding box extent for doing spatial queries (getClosestPoint, getRandomPointAround, ...)
         * The queries will try to find a solution within those bounds
         * default is (1,1,1)
         * @param extent x,y,z value that define the extent around the queries point of reference
         */
        setDefaultQueryExtent(extent: BABYLON.IVector3Like): void;
        /**
         * Get the Bounding box extent specified by setDefaultQueryExtent
         * @returns the box extent values
         */
        getDefaultQueryExtent(): BABYLON.Vector3;
        /**
         * Get the Bounding box extent result specified by setDefaultQueryExtent
         * @param result output the box extent values
         */
        getDefaultQueryExtentToRef(result: BABYLON.Vector3): void;
        /**
         * Get the next corner points composing the path (max 4 points)
         * @param index agent index returned by addAgent
         * @returns array containing world position composing the path
         */
        getCorners(index: number): BABYLON.Vector3[];
        /**
         * Release all resources
         */
        dispose(): void;
    }


    /**
     * Injects the navigation mesh generation methods into the navigation plugin.
     * @param navigationPlugin The navigation plugin to inject the methods into.
     */
    export function InjectGenerators(navigationPlugin: RecastNavigationJSPluginV2): void;




    /**
     * IMPORTANT!
     * This file is still under construction and will change in the future.
     * Workers are not yet supported.
     * For more info visit: https://forum.babylonjs.com/t/replacing-recastjs-with-recast-navigation-js/56003/46
     */
    /**
     * Builds a any and any from meshes using provided parameters.
     * @param meshes The array of meshes used to create the any
     * @param parameters The parameters used to configure the any generation.
     * @param workerOptions Options for the worker, including a completion callback and the worker instance.
     * @throws Error if the any data is invalid or cannot be deserialized.
     */
    export function GenerateNavMeshWithWorker(meshes: Array<BABYLON.Mesh>, parameters: INavMeshParametersV2, workerOptions: {
        /**
         * Completion callback that is called when the any generation is complete.
         * @param navMesh The generated any
         * @param navMeshQuery The any associated with the generated any
         * @param tileCache Optional any if tile cache generation was used.
         */
        completion: (navMesh: any, navMeshQuery: any, tileCache?: any) => void;
        /**
         *  Worker instance used for asynchronous any generation.
         */
        worker: Worker;
    }): void;


    /**
     * Builds a NavMesh and NavMeshQuery from meshes using provided parameters.
     * @param meshes The array of meshes used to create the NavMesh.
     * @param parameters The parameters used to configure the NavMesh generation.
     * @returns An object containing the NavMesh and NavMeshQuery.
     * @remarks This function generates a NavMesh based on the provided meshes and parameters.
     * It supports different configurations such as solo, tiled, and tile cache nav meshes.
     * If you need obstacles, ensure that `maxObstacles` is set to a value greater than 0.
     * Recommended values for `tileSize` are between 32 and 64 when using obstacles/tile cache.
     * If you need a tiled nav mesh, ensure that `tileSize` is set to a value greater than 0.
     * @throws Error if the NavMesh data is invalid or cannot be deserialized.
     */
    export function GenerateNavMesh(meshes: Array<BABYLON.Mesh>, parameters: INavMeshParametersV2): {
        navMesh: any;
        intermediates: any;
        navMeshQuery: any;
        tileCache: any;
    };


    /**
     *  Builds a NavMesh and NavMeshQuery from serialized data.
     *  @param data The serialized NavMesh data.
     *  @returns An object containing the NavMesh and NavMeshQuery.
     *  @remarks This function deserializes the NavMesh data and creates a NavMeshQuery
     *  instance for querying the NavMesh.
     *  @throws Error if the NavMesh data is invalid or cannot be deserialized.
     */
    export function BuildFromNavmeshData(data: Uint8Array): {
        navMesh: any;
        navMeshQuery: any;
        tileCache: undefined;
    };
    /**
     * Builds a TileCache and NavMeshQuery from serialized data.
     * @param data The serialized TileCache data.
     * @param tileCacheMeshProcess Optional function to process the TileCache mesh.
     * @returns An object containing the TileCache, NavMesh, and NavMeshQuery.
     */
    export function BuildFromTileCacheData(data: Uint8Array, tileCacheMeshProcess: any): {
        navMesh: any;
        navMeshQuery: any;
        tileCache: any;
    };




    /**
     * Creates a navigation plugin for the given scene using a worker.
     * @returns A promise that resolves to the created navigation plugin.
     * @remarks This function initializes the Recast module and sets up the navigation plugin to use a worker.
     * The worker is used to handle the creation of the navigation mesh asynchronously.
     * The `createNavMesh` method is not supported in worker mode, use `createNavMeshAsync` instead.
     */
    export function CreateNavigationPluginWorkerAsync(): Promise<RecastNavigationJSPluginV2>;


    /**
     * Creates a navigation plugin for the given scene.
     * @returns A promise that resolves to the created navigation plugin.
     * @param options Optional configuration. options.version: The version of Recast to use. options.instance: A custom Recast instance to inject instead of loading one.
     * @remarks This function initializes the Recast module and sets up the navigation plugin.
     */
    export function CreateNavigationPluginAsync(options?: {
        version?: string;
        instance?: RecastInjection;
    }): Promise<RecastNavigationJSPluginV2>;


    /**
     * Gets the RecastInjection instance (reference to the recast-navigation-js library).
     * @returns The RecastInjection instance
     * @throws Error if Recast is not initialized
     */
    export function GetRecast(): RecastInjection;
    /**
     * Sets the RecastInjection instance (reference to the recast-navigation-js library).
     * @param recast The RecastInjection instance to set
     */
    export function SetRecast(recast: RecastInjection): void;
    /**
     * Initializes the Recast navigation library.
     *
     * @param options Optional configuration. options.version: The version of Recast to use. options.instance: A custom Recast instance to inject instead of loading one.
     * @returns A promise that resolves when initialization is complete.
     */
    export function InitRecast(options?: {
        version?: string;
        instance?: RecastInjection;
    }): Promise<void>;


    /**
     * Creates a debug mesh for visualizing a any in the scene.
     * @param navMesh The any to visualize.
     * @param scene The scene in which to create the debug mesh.
     * @param parent Optional parent node for the debug mesh.
     * @param flags Poly flags to filter by, defaults to undefined to include all polys
     * @returns The created debug mesh.
     */
    export function CreateDebugNavMesh(navMesh: any, scene: BABYLON.Scene, parent?: BABYLON.Node, flags?: number): BABYLON.Mesh;




    export var DebugLayerOption: {
        HEIGHTFIELD_SOLID: string;
        HEIGHTFIELD_WALKABLE: string;
        COMPACT_HEIGHTFIELD_SOLID: string;
        COMPACT_HEIGHTFIELD_REGIONS: string;
        COMPACT_HEIGHTFIELD_DISTANCE: string;
        RAW_CONTOURS: string;
        CONTOURS: string;
        POLY_MESH: string;
        POLY_MESH_DETAIL: string;
        NAVMESH: string;
        NAVMESH_BV_TREE: string;
    };
    export type DebugLayerOptions = (typeof DebugLayerOption)[keyof typeof DebugLayerOption];
    /**
     * NavigationDebugger is a utility class for visualizing navigation meshes and related data in a Babylon.js scene.
     * It provides methods to draw various navigation-related primitives such as points, lines, triangles, and quads.
     * It also supports drawing heightfields, compact heightfields, contours, poly meshes, and nav meshes.
     */
    export class NavigationDebugger {
        private _scene;
        /**
         *  The name of the debug mesh used for navigation debugging.
         *  This is used to group all navigation debug meshes under a single name for easier management
         */
        static NAV_MESH_DEBUG_NAME: string;
        /**
         * The name of the debug mesh used for visualization of the navigation mesh using points.
         */
        static NAV_MESH_DEBUG_NAME_POINTS: string;
        /**
         * The name of the debug mesh used for visualization of the navigation mesh using triangles.
         */
        static NAV_MESH_DEBUG_NAME_TRIS: string;
        /**
         * The name of the debug mesh used for visualization of the navigation mesh using quads.
         */
        static NAV_MESH_DEBUG_NAME_QUADS: string;
        /**
         * The name of the debug mesh used for visualization of the navigation mesh using lines.
         */
        static NAV_MESH_DEBUG_NAME_LINES: string;
        /**
         * The material used for rendering triangles in the navigation debug visualization.
         */
        triMaterial: BABYLON.StandardMaterial;
        /**
         * The material used for rendering points in the navigation debug visualization.
         */
        pointMaterial: BABYLON.StandardMaterial;
        /**
         * The list of line materials used in the navigation debug visualization.
         */
        lineMaterials: BABYLON.StandardMaterial[];
        /**
         * The parent node for the debug drawer.
         */
        debugDrawerParentNode: BABYLON.TransformNode;
        /**
         * * Gets or sets the primitive types to be drawn by the debug drawer.
         * * This allows you to control which types of primitives (points, lines, tris, quads) are rendered in the navigation debug visualization.
         * * The default value is `["points", "lines", "tris", "quads"]`.
         * * You can modify this property to include or exclude specific primitive types based on your debugging needs.
         * @returns An array of primitive types that the debug drawer will render.
         */
        get primitiveTypes(): any;
        set primitiveTypes(value: any);
        private _lineMaterialOptions;
        private _pointMesh;
        private _debugDrawerUtils;
        private _primitiveTypes;
        constructor(_scene: BABYLON.Scene, options?: {
            parent?: {
                node?: BABYLON.TransformNode | string;
            };
            primitiveTypes?: any;
            materials?: {
                triMaterial?: BABYLON.StandardMaterial;
                pointMaterial?: BABYLON.StandardMaterial;
                lineMaterialOptions: {
                    greasedLineMaterialOptions: Partial<BABYLON.GreasedLineMaterialOptions>;
                    greasedLineMeshOptions: Partial<BABYLON.GreasedLineMeshOptions>;
                };
            };
        });
        /**
         * Resets the debug drawer by disposing of all child meshes in the debug drawer parent node.
         * This is useful for clearing the debug visualization before drawing new primitives.
         */
        clear(): void;
        /**
         * Disposes of the debug drawer, including all meshes and materials used for rendering.
         * This method should be called when the debug drawer is no longer needed to free up resources.
         */
        dispose(): void;
        /**
         * This method iterates through the provided primitives and draws them based on their type.
         * It supports drawing points, lines, triangles, and quads, depending on the primitive type.
         * @param primitives An array of debug drawer primitives to be drawn.
         * @param options Optional parameters to control the drawing behavior, such as whether to join meshes.
         */
        drawPrimitives(primitives: any, options?: {
            joinMeshes?: boolean;
        }): void;
        /**
         * Draws a heightfield as solid using the debug drawer utilities.
         * @param hf The heightfield to draw as solid.
         */
        drawHeightfieldSolid(hf: any): void;
        /**
         * Draws a heightfield as walkable using the debug drawer utilities.
         * @param hf The heightfield to draw as walkable.
         */
        drawHeightfieldWalkable(hf: any): void;
        /**
         * Draws a compact heightfield as solid using the debug drawer utilities.
         * @param chf The compact heightfield to draw as solid.
         */
        drawCompactHeightfieldSolid(chf: any): void;
        /**
         * Draws the regions of a compact heightfield using the debug drawer utilities.
         * @param chf The compact heightfield to draw regions for.
         */
        drawCompactHeightfieldRegions(chf: any): void;
        /**
         * Draws the distance field of a compact heightfield using the debug drawer utilities.
         * @param chf The compact heightfield to draw the distance for.
         */
        drawCompactHeightfieldDistance(chf: any): void;
        /**
         * Draws a heightfield layer using the debug drawer utilities.
         * @param layer The heightfield layer to draw.
         * @param idx The index of the layer to draw.
         */
        drawHeightfieldLayer(layer: any, idx: number): void;
        /**
         * Draws the layers of a heightfield using the debug drawer utilities.
         * @param lset The heightfield layer set containing the layers to draw.
         */
        drawHeightfieldLayers(lset: any): void;
        /**
         * Draws the region connections of a any using the debug drawer utilities.
         * @param cset any to draw
         * @param alpha The alpha value for the drawn contours, default is 1.
         */
        drawRegionConnections(cset: any, alpha?: number): void;
        /**
         * Draws raw contours from a any using the debug drawer utilities.
         * @param cset any to draw
         * @param alpha The alpha value for the drawn contours, default is 1.
         */
        drawRawContours(cset: any, alpha?: number): void;
        /**
         * Draws contours from a any using the debug drawer utilities.
         * @param cset any to draw
         * @param alpha The alpha value for the drawn contours, default is 1.
         */
        drawContours(cset: any, alpha?: number): void;
        /**
         * Draws a poly mesh using the debug drawer utilities.
         * @param mesh any to draw
         */
        drawPolyMesh(mesh: any): void;
        /**
         * Draws a poly mesh detail using the debug drawer utilities.
         * @param dmesh any to draw
         */
        drawPolyMeshDetail(dmesh: any): void;
        /**
         * Draws a any using the debug drawer utilities.
         * @param mesh any to draw
         * @param flags Flags to control the drawing behavior, default is 0.
         */
        drawNavMesh(mesh: any, flags?: number): void;
        /**
         * Draws a any with closed list using the debug drawer utilities.
         * @param mesh any to draw
         * @param query any to use for drawing the closed list.
         * @param flags Flags to control the drawing behavior, default is 0.
         */
        drawNavMeshWithClosedList(mesh: any, query: any, flags?: number): void;
        /**
         * Draws the nodes of a any using the debug drawer utilities.
         * @param query any to use for drawing the nodes.
         */
        drawNavMeshNodes(query: any): void;
        /**
         * Draws the bounding volume tree of a any using the debug drawer utilities.
         * @param mesh any to draw the bounding volume tree for.
         */
        drawNavMeshBVTree(mesh: any): void;
        /**
         * Draws the portals of a any using the debug drawer utilities.
         * @param mesh any to draw the portals for.
         */
        drawNavMeshPortals(mesh: any): void;
        /**
         * Draws polygons of a any with specific flags using the debug drawer utilities.
         * @param mesh any to draw the polygons with specific flags.
         * @param flags The flags to filter the polygons to be drawn.
         * @param col The color to use for the drawn polygons, represented as a number.
         */
        drawNavMeshPolysWithFlags(mesh: any, flags: number, col: number): void;
        /**
         * Draws polygons of a any with specific reference and color using the debug drawer utilities.
         * @param mesh any to draw the polygons with specific reference and color.
         * @param ref The reference number of the polygons to be drawn.
         * @param col The color to use for the drawn polygons, represented as a number.
         */
        drawNavMeshPoly(mesh: any, ref: number, col: number): void;
        /**
         *  Get the intermediates from the generator
         *  @param intermediates - The generator intermediates
         *  @returns An object containing lists of heightfields, compact heightfields, contour sets
         */
        getIntermediates: (intermediates: GeneratorIntermediates) => {
            heightfieldList: any;
            compactHeightfieldList: any;
            contourSetList: any;
            polyMeshList: any;
            polyMeshDetailList: any;
        };
        /**
         *  Draw debug information based on the selected option
         *  @param navMesh - The navigation mesh to draw
         *  @param intermediates - The generator intermediates containing the data to draw
         *  @param scene - The scene to draw in
         *  @param option - The debug drawer option to use
         *  @remarks This method will reset the debug drawer before drawing.
         */
        draw(navMesh: any, intermediates: GeneratorIntermediates, scene: BABYLON.Scene, option: DebugLayerOptions): void;
        private _drawPoints;
        private _drawLines;
        private _drawTris;
        private _drawQuads;
        /**
         * Merge the debug meshes for better performance
         */
        private _joinDebugMeshes;
        private _convertUnindexedToIndexed;
    }


    /**
     * Utility function based on Chaikin's alogrithm for navigation path smoothing and segment generation.
     * @param points Array of points to be smoothed, where each point is an object with x, y, and z properties.
     * @param iterations Number of smoothing iterations to apply. Default 1.
     * @returns A new array of smoothed points after applying the Chaikin's algorithm.
     */
    export function GetChaikinSmoothPath(points: BABYLON.IVector3Like[], iterations?: number): BABYLON.IVector3Like[];
    /**
     *  Generates a series of points that create an L-shaped path between each pair of points in the input navigation segment.
     *  The path consists of a horizontal segment followed by a vertical segment, or vice versa,
     *  depending on the relative distances between the x and z coordinates of the points.
     * @param navSegment An array of BABYLON.Vector3 points representing the navigation segment.
     * @returns An array of BABYLON.Vector3 points representing the L-shaped path.
     */
    export function GetLShapedPath(navSegment: BABYLON.Vector3[]): BABYLON.Vector3[];


    /**
     * Creates a default tile cache mesh process function
     * @param offMeshConnections offMeshConnections
     * @param area the area to be set for each poly
     * @param flags the flags to be set for each poly
     * @returns the tile cache mesh process function
     */
    export function CreateDefaultTileCacheMeshProcess(offMeshConnections?: any, area?: number, flags?: number): any;
    /**
     * Waits until the tile cache is fully updated
     * @param navMesh The any
     * @param tileCache THe any
     */
    export function WaitForFullTileCacheUpdate(navMesh: any, tileCache: any): void;


    /**
     * Compute a smooth navigation path from start to end. Returns an empty array if no path can be computed
     * @param navMesh the navigation mesh to use
     * @param navmeshQuery the navigation mesh query to use
     * @param start world position
     * @param end world position
     * @param options options object
     * @returns array containing world position composing the path
     */
    export function ComputeSmoothPath(navMesh: any, navmeshQuery: any, start: BABYLON.IVector3Like, end: BABYLON.IVector3Like, options?: {
        filter?: any;
        halfExtents?: BABYLON.IVector3Like;
        /**
         * @default 256
         */
        maxPathPolys?: number;
        /**
         * @default 2048
         */
        maxSmoothPathPoints?: number;
        /**
         * @default 0.5
         */
        stepSize?: number;
        /**
         * @default 0.01
         */
        slop?: number;
    }): BABYLON.Vector3[];




    /**
     *  Extracts positions and indices from an array of meshes.
     *  @param meshes The array of meshes from which to extract positions and indices.
     *  @returns A tuple containing a Float32Array of positions and a Uint32Array of
     */
    export function GetPositionsAndIndices(meshes: BABYLON.Mesh[], options?: {
        doNotReverseIndices?: boolean;
    }): [positions: Float32Array, indices: Uint32Array];
    /**
     * Reverses the order of vertices in each triangle (3 indices per face) to ensure
     * that the winding order is consistent with the Recast Navigation requirements.
     * This is necessary because Recast Navigation expects the indices to be in a specific winding order.
     * @param meshOrIndices The mesh from which to extract indices or the indices themselves.
     * @returns Array of indices with reversed winding order.
     */
    export function GetReversedIndices(meshOrIndices: BABYLON.Mesh | Uint32Array | number[]): Uint32Array<ArrayBufferLike> | number[] | Int32Array<ArrayBufferLike> | Uint16Array<ArrayBufferLike> | null;


    /**
     *  Converts navigation path points to a BABYLON.Vector3 array.
     *  @param navPath The navigation path containing points and success status.
     *  @returns An array of BABYLON.Vector3 points representing the navigation path.
     */
    export function ConvertNavPathPoints(navPath: ComputePathResult): BABYLON.Vector3[];


    export const DefaultMaxObstacles = 128;
    /**
     * Creates a SoloNavMesh configuration based on the provided parameters.
     * @param parameters The parameters used to configure the SoloNavMesh generation.
     * @returns A configuration object for generating a SoloNavMesh.
     * @see https://docs.recast-navigation-js.isaacmason.com/types/index.RecastConfig.html
     */
    export function CreateSoloNavMeshConfig(parameters: INavMeshParametersV2): Partial<any>;
    /**
     * Creates a TiledNavMesh configuration based on the provided parameters.
     * @param parameters The parameters used to configure the TiledNavMesh generation.
     * @returns A configuration object for generating a TiledNavMesh.
     */
    export function CreateTiledNavMeshConfig(parameters: INavMeshParametersV2): Partial<any>;
    /**
     * Creates a TileCacheNavMesh configuration based on the provided parameters.
     * @param parameters The parameters used to configure the TileCacheNavMesh generation.
     * @returns A configuration object for generating a TileCacheNavMesh.
     */
    export function CreateTileCacheNavMeshConfig(parameters: INavMeshParametersV2): Partial<any>;
    /**
     * Convert INavMeshParametersV2 to any by filtering out undefined values.
     * @param config NavMesh parameters
     * @returns Recast solo nav mesh generator config
     */
    export function ToSoloNavMeshGeneratorConfig(config: INavMeshParametersV2): Partial<any>;
    /**
     * Convert IAgentParametersV2 to Recast any by filtering out undefined values.
     * @param agentParams Agent parameters
     * @returns Recast crowd agent parameters
     */
    export function ToCrowdAgentParams(agentParams: IAgentParametersV2): Partial<any>;


    /**
     * Abstract Node class from Babylon.js
     */
    export interface INodeLike {
        getWorldMatrix(): BABYLON.IMatrixLike;
    }
    /**
     * Class used to render text using MSDF (Multi-channel Signed Distance Field) technique
     * Thanks a lot to the work of Bhushan_Wagh and zb_sj for their amazing work on MSDF for Babylon.js
     * #6RLCWP#16
     * Star wars scroller: #6RLCWP#29
     * With metrics: #6RLCWP#35
     * Thickness: #IABMEZ#3
     * Solar system: #9YCDYC#9
     * Stroke: #6RLCWP#37
     */
    export class TextRenderer implements BABYLON.IDisposable {
        private readonly _useVAO;
        private _engine;
        private _shaderLanguage;
        private _vertexBuffers;
        private _spriteBuffer;
        private _worldBuffer;
        private _uvBuffer;
        private _drawWrapperBase;
        private _vertexArrayObject;
        private _font;
        private _charMatrices;
        private _charUvs;
        private _isDirty;
        private _baseLine;
        private _scalingMatrix;
        private _fontScaleMatrix;
        private _offsetMatrix;
        private _translationMatrix;
        private _baseMatrix;
        private _scaledMatrix;
        private _localMatrix;
        private _finalMatrix;
        private _lineMatrix;
        private _parentWorldMatrix;
        /**
         * Gets or sets the color of the text
         */
        color: BABYLON.IColor4Like;
        /**
         * Gets or sets the color of the stroke around the text
         */
        strokeColor: BABYLON.IColor4Like;
        /**
         * Gets or sets the width of the stroke around the text (inset)
         */
        strokeInsetWidth: number;
        /**
         * Gets or sets the width of the stroke around the text (outset)
         */
        strokeOutsetWidth: number;
        /**
         * Gets or sets the thickness of the text (0 means as defined in the font)
         * Value must be between -0.5 and 0.5
         */
        thicknessControl: number;
        private _parent;
        /**
         * Gets or sets the parent of the text renderer
         */
        get parent(): BABYLON.Nullable<INodeLike>;
        set parent(value: BABYLON.Nullable<INodeLike>);
        private _transformMatrix;
        /**
         * Gets or sets the transform matrix of the text renderer
         * It will be applied in that order:
         * parent x transform x paragraph world
         */
        get transformMatrix(): BABYLON.IMatrixLike;
        set transformMatrix(value: BABYLON.IMatrixLike);
        /**
         * Gets or sets if the text is billboarded
         */
        isBillboard: boolean;
        /**
         * Gets or sets if the text is screen projected
         * This will work only if the text is billboarded
         */
        isBillboardScreenProjected: boolean;
        /**
         * Gets the number of characters in the text renderer
         */
        get characterCount(): number;
        /**
         * Gets or sets if the text renderer should ignore the depth buffer
         * Default is false
         */
        ignoreDepthBuffer: boolean;
        private constructor();
        private _resizeBuffers;
        private _setShaders;
        /**
         * Add a paragraph of text to the renderer
         * @param text define the text to add
         * @param options define the options to use for the paragraph (optional)
         * @param worldMatrix define the world matrix to use for the paragraph (optional)
         */
        addParagraph(text: string, options?: Partial<ParagraphOptions>, worldMatrix?: BABYLON.IMatrixLike): void;
        /**
         * Render the text using the provided view and projection matrices
         * @param viewMatrix define the view matrix to use
         * @param projectionMatrix define the projection matrix to use
         */
        render(viewMatrix: BABYLON.IMatrixLike, projectionMatrix: BABYLON.IMatrixLike): void;
        /**
         * Release associated resources
         */
        dispose(): void;
        /**
         * Creates a new TextRenderer instance asynchronously
         * @param font define the font asset to use
         * @param engine define the engine to use
         * @returns a promise that resolves to the created TextRenderer instance
         */
        static CreateTextRendererAsync(font: FontAsset, engine: BABYLON.AbstractEngine): Promise<TextRenderer>;
    }


    export interface ISdfTextParagraphMetrics {
        /** @internal */
        readonly paragraph: string;
        /** @internal */
        readonly lines: SdfTextLine[];
        /** @internal */
        readonly width: number;
        /** @internal */
        readonly height: number;
        /** @internal */
        readonly glyphs: SdfGlyph[];
    }
    /** @internal */
    export type ParagraphOptions = {
        maxWidth: number;
        lineHeight: number;
        letterSpacing: number;
        tabSize: number;
        whiteSpace: "pre-line";
        textAlign: "left" | "right" | "center";
        translate: BABYLON.IVector2Like | undefined;
        customLayoutEngine?: (text: string, options: ParagraphOptions) => ISdfTextParagraphMetrics;
    };
    /** @internal */
    export var DefaultParagraphOptions: ParagraphOptions;




    /**
     * Class representing a font asset for SDF (Signed Distance Field) rendering.
     */
    export class FontAsset implements BABYLON.IDisposable {
        private readonly _chars;
        private readonly _charsRegex;
        private readonly _kernings;
        /** @internal */
        readonly _font: SdfFont;
        /**
         * Gets the font scale value
         */
        readonly scale: number;
        /**
         * Gets the list of used textures
         */
        readonly textures: BABYLON.Texture[];
        /**
         * Creates a new FontAsset instance.
         * @param definitionData defines the font data in JSON format.
         * @param textureUrl defines the url of the texture to use for the font.
         * @param scene defines the hosting scene.
         */
        constructor(definitionData: string, textureUrl: string, scene?: BABYLON.Scene);
        dispose(): void;
        private _updateFallbacks;
        /** @internal */
        _getChar(charCode: number): BMFontChar;
        /** @internal */
        _getKerning(first: number, second: number): number;
        /** @internal */
        _unsupportedChars(text: string): string;
    }


    /** @internal */
    export var msdfVertexShaderWGSL: {
        name: string;
        shader: string;
    };


    /** @internal */
    export var msdfPixelShaderWGSL: {
        name: string;
        shader: string;
    };


    /** @internal */
    export var msdfVertexShader: {
        name: string;
        shader: string;
    };


    /** @internal */
    export var msdfPixelShader: {
        name: string;
        shader: string;
    };


    /** @internal */
    export class SdfTextParagraph {
        readonly text: string;
        readonly fontAsset: FontAsset;
        readonly options: ParagraphOptions;
        get lineHeight(): number;
        readonly paragraph: string;
        readonly lines: SdfTextLine[];
        readonly width: number;
        readonly height: number;
        readonly glyphs: SdfGlyph[];
        constructor(text: string, fontAsset: FontAsset, options?: Partial<ParagraphOptions>);
        private _computeMetrics;
        private _breakLines;
        private _collapse;
        private _wrap;
    }


    /** @internal */
    export type SdfTextLine = {
        text: string;
        glyphs: SdfGlyph[];
        start: number;
        end: number;
        width: number;
    };




    /** @internal */
    export type SdfGlyph = {
        char: BMFontChar;
        /** index of the line */
        line: number;
        /** position within the line */
        position: number;
        x: number;
        y: number;
    };


    export type SdfFontDistanceField = {
        fieldType: "sdf" | "msdf";
        distanceRange: number;
    };
    export type SdfFont = BMFont & {
        distanceField: SdfFontDistanceField;
    };


    /**
     * Holds information on how the font was generated.
     */
    export type BMFontInfo = {
        /** The name of the font */
        face: string;
        /** The size of the font */
        size: number;
        /** The font is bold */
        bold: number;
        /** The font is italic */
        italic: number;
        /** The charset of the font */
        charset: string[];
        /** The charset is unicode  */
        unicode: number;
        /** The font height stretch in percentage. 100% means no stretch. */
        stretchH: number;
        /** Set to 1 if smoothing was turned on. */
        smooth: number;
        /** The supersampling level used. 1 means no supersampling was used. */
        aa: number;
        /** The padding for each character (up, right, down, left). */
        padding: [number, number, number, number];
        /** The spacing for each character (horizontal, vertical). */
        spacing: [number, number];
        /**
         * The outline thickness for the characters.
         *
         * @remark missing in msdf-bmfont-xml
         */
        outline?: number;
    };
    /**
     * Holds information common to all characters.
     */
    export type BMFontCommon = {
        /** Distance in pixels between each line of text */
        lineHeight: number;
        /** The number of pixels from the absolute top of the line to the base of the characters */
        base: number;
        /** The width of the texture, normally used to scale the x pos of the character image */
        scaleW: number;
        /** The height of the texture, normally used to scale the y pos of the character image */
        scaleH: number;
        /** The number of pages in the font */
        pages: number;
        /** Set to 1 if the monochrome characters have been packed into each of the texture channels. In this case alphaChnl describes what is stored in each channel. */
        packed: number;
        /** Set to 0 if the channel holds the glyph data, 1 if it holds the outline, 2 if it holds the glyph and the outline, 3 if its set to zero, and 4 if its set to one. */
        alphaChnl: number;
        /** Set to 0 if the channel holds the glyph data, 1 if it holds the outline, 2 if it holds the glyph and the outline, 3 if its set to zero, and 4 if its set to one. */
        redChnl: number;
        /** Set to 0 if the channel holds the glyph data, 1 if it holds the outline, 2 if it holds the glyph and the outline, 3 if its set to zero, and 4 if its set to one. */
        greenChnl: number;
        /** Set to 0 if the channel holds the glyph data, 1 if it holds the outline, 2 if it holds the glyph and the outline, 3 if its set to zero, and 4 if its set to one. */
        blueChnl: number;
    };
    /** Name of a texture file. There is one for each page in the font. */
    export type BMFontPages = {
        [id: number]: string;
    } & Array<string>;
    /**
     * Describes a single character in the font
     */
    export type BMFontChar = {
        /** Character id (charCode) */
        id: number;
        /** Left position of the character image in the texture. */
        x: number;
        /** Right position of the character image in the texture */
        y: number;
        /** Width of the chracter image in the texture */
        width: number;
        /** Height of the chracter image in the texture */
        height: number;
        /** Horizontal offset to be applied on screen */
        xoffset: number;
        /** Vertical offset to be applied on screen */
        yoffset: number;
        /** Horizontal advance after the character */
        xadvance: number;
        /** Page index where the character image is found */
        page: number;
        /** Texture channel where the chracter image is found
         * - 1 = blue
         * - 2 = green
         * - 3 = red
         * - 8 = alpha
         * - 15 = all channels
         */
        chnl: number;
    } & BMFontCharExtra;
    /**
     * additional context from msdf-bmfont-xml
     */
    export type BMFontCharExtra = {
        /** index of opentype.js glyph */
        index: number;
        /** actual character*/
        char: string;
    };
    /**
     * The kerning information is used to adjust the distance between certain characters, e.g. some characters should be placed closer to each other than others.
     */
    export type BMFontKerning = {
        /** The first character id. */
        first: number;
        /** The second character id. */
        second: number;
        /** How much the x position should be adjusted when drawing the second character immediately following the first. */
        amount: number;
    };
    /**
     * Compatible with [msdf-bmfont-xml](https://github.com/soimy/msdf-bmfont-xml)
     * @see https://www.angelcode.com/products/bmfont/doc/file_format.html
     */
    export type BMFont = {
        /** {@inheritDoc BMFontInfo} */
        info: BMFontInfo;
        /** {@inheritDoc BMFontCommon} */
        common: BMFontCommon;
        /** {@inheritDoc BMFontPages} */
        pages: BMFontPages;
        /** {@inheritDoc BMFontChar} */
        chars: BMFontChar[];
        /** {@inheritDoc BMFontKerning} */
        kernings: BMFontKerning[];
    };


    /**
     * BABYLON.Behavior for any content that can capture pointer events, i.e. bypass the Babylon pointer event handling
     * and receive pointer events directly.  It will register the capture triggers and negotiate the capture and
     * release of pointer events.  Curerntly this applies only to HtmlMesh
     */
    export class PointerEventsCaptureBehavior implements BABYLON.Behavior<BABYLON.AbstractMesh> {
        private _captureCallback;
        private _releaseCallback;
        /** gets or sets behavior's name */
        name: string;
        private _attachedMesh;
        /** @internal */
        _captureOnPointerEnter: boolean;
        /**
         * Gets or sets the mesh that the behavior is attached to
         */
        get attachedMesh(): BABYLON.AbstractMesh | null;
        set attachedMesh(value: BABYLON.AbstractMesh | null);
        /**
         * Attached node of this behavior
         */
        get attachedNode(): BABYLON.AbstractMesh | null;
        constructor(_captureCallback: () => void, _releaseCallback: () => void, { captureOnPointerEnter }?: {
            captureOnPointerEnter?: boolean | undefined;
        });
        /**
         * Set if the behavior should capture pointer events when the pointer enters the mesh
         */
        set captureOnPointerEnter(captureOnPointerEnter: boolean);
        /**
         * Function called when the behavior needs to be initialized (before attaching it to a target)
         */
        init(): void;
        /**
         * Called when the behavior is attached to a target
         * @param mesh defines the target where the behavior is attached to
         */
        attach(mesh: BABYLON.AbstractMesh): void;
        /**
         * Called when the behavior is detached from its target
         */
        detach(): void;
        /**
         * Dispose the behavior
         */
        dispose(): void;
        releasePointerEvents(): void;
        capturePointerEvents(): void;
    }


    type CaptureReleaseCallback = () => void;
    /**
     * Get the id of the object currently capturing pointer events
     * @returns The id of the object currently capturing pointer events
     * or null if no object is capturing pointer events
     */
    export const getCapturingId: () => string | null;
    /**
     * Request that the object with the given id capture pointer events.  If there is no current
     * owner, then the request is granted immediately.  If there is a current owner, then the request
     * is queued until the current owner releases pointer events.
     * @param requestId An id to identify the request.  This id will be used to match the capture
     * request with the release request.
     * @param captureCallback The callback to call when the request is granted and the object is capturing
     * @param releaseCallback The callback to call when the object is no longer capturing pointer events
     */
    export const requestCapture: (requestId: string, captureCallback: CaptureReleaseCallback, releaseCallback: CaptureReleaseCallback) => void;
    /**
     * Release pointer events from the object with the given id.  If the object is the current owner
     * then pointer events are released immediately.  If the object is not the current owner, then the
     * associated capture request is removed from the queue.  If there is no matching capture request
     * in the queue, then the release request is added to a list of unmatched release requests and will
     * negate the next capture request with the same id.  This is to guard against the possibility that
     * the release request arrived before the capture request.
     * @param requestId The id which should match the id of the capture request
     */
    export const requestRelease: (requestId: string | null) => void;
    /**
     * Release pointer events from the current owner
     */
    export const releaseCurrent: () => void;
   }

        interface Window {
            "pointer-events-capture-debug": boolean | null;
        }
    declare module ADDONS {
    



    /**
     * A function that compares two submeshes and returns a number indicating which
     * should be rendered first.
     */
    type RenderOrderFunction = (subMeshA: BABYLON.SubMesh, subMeshB: BABYLON.SubMesh) => number;
    /**
     * An instance of this is required to render HtmlMeshes in the scene.
     * if using HtmlMeshes, you must not set render order for group 0 using
     * scene.setRenderingOrder.  You must instead pass the compare functions
     * to the HtmlMeshRenderer constructor.  If you do not, then your render
     * order will be overwritten if the HtmlMeshRenderer is created after and
     * the HtmlMeshes will not render correctly (they will appear in front of
     * meshes that are actually in front of them) if the HtmlMeshRenderer is
     * created before.
     */
    export class HtmlMeshRenderer {
        /**
         * Global scale factor applied to the homogeneous `w` component (m[15]) of the
         * transformation matrix when projecting 3D objects into pixel space.
         *
         * This value is used to balance Babylon units against screen pixels, ensuring
         * that HTML-mapped or screen-space objects appear with the correct relative
         * size. Adjust with care, as changing it affects the projection scale of all
         * transformed objects.
         *
         *  The default value is `0.00001`, which works well when 1 Babylon unit
         *  corresponds to 1 meter, and the typical screen resolution is around
         * 100 pixels per meter (i.e., 1 pixel per centimeter).
         */
        static PROJECTION_SCALE_FACTOR: number;
        private _containerId?;
        private _inSceneElements?;
        private _overlayElements?;
        private _engine;
        private _cache;
        private _width;
        private _height;
        private _heightHalf;
        private _cameraWorldMatrix?;
        private _temp;
        private _lastDevicePixelRatio;
        private _cameraMatrixUpdated;
        private _previousCanvasDocumentPosition;
        private _renderObserver;
        /**
         * Contruct an instance of HtmlMeshRenderer
         * @param scene
         * @param options object containing the following optional properties:
         * @returns
         */
        constructor(scene: BABYLON.Scene, { parentContainerId, _containerId, enableOverlayRender, defaultOpaqueRenderOrder, defaultAlphaTestRenderOrder, defaultTransparentRenderOrder, }?: {
            parentContainerId?: string | null;
            _containerId?: string;
            defaultOpaqueRenderOrder?: RenderOrderFunction;
            defaultAlphaTestRenderOrder?: RenderOrderFunction;
            defaultTransparentRenderOrder?: RenderOrderFunction;
            enableOverlayRender?: boolean;
        });
        /**
         * Dispose of the HtmlMeshRenderer
         */
        dispose(): void;
        protected _init(scene: BABYLON.Scene, parentContainerId: string | null, enableOverlayRender: boolean, defaultOpaqueRenderOrder: RenderOrderFunction, defaultAlphaTestRenderOrder: RenderOrderFunction, defaultTransparentRenderOrder: RenderOrderFunction): void;
        private _createRenderLayerElements;
        protected _getSize(): {
            width: number;
            height: number;
        };
        protected _setSize(width: number, height: number): void;
        protected _getCameraCssMatrix(matrix: BABYLON.Matrix): string;
        protected _getHtmlContentCssMatrix(matrix: BABYLON.Matrix, useRightHandedSystem: boolean): string;
        protected _getTransformationMatrix(htmlMesh: HtmlMesh, useRightHandedSystem: boolean): BABYLON.Matrix;
        protected _renderHtmlMesh(htmlMesh: HtmlMesh, useRightHandedSystem: boolean): void;
        protected _render(scene: BABYLON.Scene, camera: BABYLON.Camera): void;
        protected _updateBaseScaleFactor(htmlMesh: HtmlMesh): void;
        protected _updateContainerPositionIfNeeded(): void;
        protected _onCameraMatrixChanged: (camera: BABYLON.Camera) => void;
        private _epsilon;
        private _getAncestorMarginsAndPadding;
    }


    /**
     * This class represents HTML content that we want to render as though it is part of the scene.  The HTML content is actually
     * rendered below the canvas, but a depth mask is created by this class that writes to the depth buffer but does not
     * write to the color buffer, effectively punching a hole in the canvas.  CSS transforms are used to scale, translate, and rotate
     * the HTML content so that it matches the camera and mesh orientation.  The class supports interactions in editable and non-editable mode.
     * In non-editable mode (the default), events are passed to the HTML content when the pointer is over the mask (and not occluded by other meshes
     * in the scene).
     * @see https://playground.babylonjs.com/#HVHYJC#5
     * @see https://playground.babylonjs.com/#B17TC7#112
     */
    export class HtmlMesh extends BABYLON.Mesh {
        /**
         * Helps identifying a html mesh from a regular mesh
         */
        get isHtmlMesh(): boolean;
        private _enabled;
        private _ready;
        /**
         * @internal
         */
        _isCanvasOverlay: boolean;
        private _requiresUpdate;
        private _element?;
        private _width?;
        private _height?;
        private _inverseScaleMatrix;
        private _captureOnPointerEnter;
        private _pointerEventCaptureBehavior;
        private _sourceWidth;
        private _sourceHeight;
        /**
         * Return the source width of the content in pixels
         */
        get sourceWidth(): number | null;
        /**
         * Return the source height of the content in pixels
         */
        get sourceHeight(): number | null;
        private _worldMatrixUpdateObserver;
        private _fitStrategy;
        /**
         * Contruct an instance of HtmlMesh
         * @param scene
         * @param id The id of the mesh.  Will be used as the id of the HTML element as well.
         * @param options object with optional parameters
         */
        constructor(scene: BABYLON.Scene, id: string, { captureOnPointerEnter, isCanvasOverlay, fitStrategy }?: {
            captureOnPointerEnter?: boolean | undefined;
            isCanvasOverlay?: boolean | undefined;
            fitStrategy?: FitStrategyType | undefined;
        });
        /**
         * The width of the content in pixels
         */
        get width(): number | undefined;
        /**
         * The height of the content in pixels
         */
        get height(): number | undefined;
        /**
         * The HTML element that is being rendered as a mesh
         */
        get element(): HTMLElement | undefined;
        /**
         * True if the mesh has been moved, rotated, or scaled since the last time this
         * property was read.  This property is reset to false after reading.
         */
        get requiresUpdate(): boolean;
        /**
         * Enable capture for the pointer when entering the mesh area
         */
        set captureOnPointerEnter(captureOnPointerEnter: boolean);
        /**
         * Disposes of the mesh and the HTML element
         */
        dispose(): void;
        /**
         * @internal
         */
        _markAsUpdated(): void;
        /**
         * Sets the content of the element to the specified content adjusting the mesh scale to match and making it visible.
         * If the the specified content is undefined, then it will make the mesh invisible.  In either case it will clear the
         * element content first.
         * @param element The element to render as a mesh
         * @param width The width of the mesh in Babylon units
         * @param height The height of the mesh in Babylon units
         */
        setContent(element: HTMLElement, width: number, height: number): void;
        setEnabled(enabled: boolean): void;
        /**
         * Sets the content size in pixels
         * @param width width of the source
         * @param height height of the source
         */
        setContentSizePx(width: number, height: number): void;
        protected _setAsReady(ready: boolean): void;
        protected _doSetEnabled(enabled: boolean): void;
        protected _updateScaleIfNecessary(): void;
        protected _createMask(): void;
        protected _setElementzIndex(zIndex: number): void;
        /**
         * Callback used by the PointerEventsCaptureBehavior to capture pointer events
         */
        capturePointerEvents(): void;
        /**
         * Callback used by the PointerEventsCaptureBehavior to release pointer events
         */
        releasePointerEvents(): void;
        protected _createElement(): HTMLDivElement | undefined;
    }


    export type FitStrategyType = {
        wrapElement(element: HTMLElement): HTMLElement;
        updateSize(sizingElement: HTMLElement, width: number, height: number): void;
    };
    export var FitStrategy: {
        CONTAIN: FitStrategyType;
        COVER: FitStrategyType;
        STRETCH: FitStrategyType;
        NONE: FitStrategyType;
    };


    /**
     * The transmittance LUT can be used to get the radiance from an external light source arriving a given point, accounting for atmospheric scattering.
     */
    export class TransmittanceLut {
        /**
         * Listen to this observer to know when the LUT data has been updated.
         * This is typically infrequent (once at startup), but also happens whenever the atmosphere's properties change.
         */
        readonly onUpdatedObservable: BABYLON.Observable<void>;
        private readonly _atmosphere;
        private _lutData;
        private _renderTarget;
        private _effectWrapper;
        private _effectRenderer;
        private _isDirty;
        private _isDisposed;
        private _needsReadPixels;
        /**
         * True if the LUT has been rendered.
         */
        get isDirty(): boolean;
        /**
         * The render target that contains the transmittance LUT.
         * @throws if the LUT has been disposed.
         */
        get renderTarget(): BABYLON.RenderTargetTexture;
        /**
         * True if the LUT data has been read back from the GPU.
         */
        get hasLutData(): boolean;
        /**
         * Constructs the {@link TransmittanceLut}.
         * @param atmosphere - The atmosphere that owns this LUT.
         */
        constructor(atmosphere: Atmosphere);
        /**
         * Gets the transmittance of an external light through the atmosphere to a point specified by its distance to the planet center and its geocentric normal.
         * The result is always a linear space color.
         * @param directionToLight - The direction to the light source.
         * @param pointRadius - The distance from the origin to the point.
         * @param pointGeocentricNormal - The normal of the point.
         * @param result - The color to write the result to.
         * @returns The result color.
         */
        getTransmittedColorToRef<T extends BABYLON.IColor3Like>(directionToLight: BABYLON.IVector3Like, pointRadius: number, pointGeocentricNormal: BABYLON.IVector3Like, result: T): T;
        /**
         * Derives light color from the transmittance at a point specified by its distance to the planet center and its geocentric normal.
         * @param light - The light to update.
         * @param pointRadius - The distance from the origin to the point.
         * @param pointGeocentricNormal - The normal of the point.
         */
        updateLightParameters(light: BABYLON.DirectionalLight, pointRadius: number, pointGeocentricNormal: BABYLON.IVector3Like): void;
        /**
         * Renders the LUT if needed.
         * @returns true if the LUT was rendered.
         */
        render(): boolean;
        /**
         * Reads back the LUT data from the GPU if a readback is pending.
         * @internal
         */
        readPixelsAsync(): Promise<void>;
        /**
         * Marks the LUT as needing to be rendered.
         */
        markDirty(): void;
        /**
         * Disposes the LUT and its resources.
         */
        dispose(): void;
    }


    /**
     * Samples the texture data at the given uv coordinate using bilinear interpolation.
     * Note this will not match GPU sampling behavior exactly.
     * Currently assumes clamping behavior.
     * @param u - The u coordinate to sample.
     * @param v - The v coordinate to sample.
     * @param widthPx - The width of the texture in texels.
     * @param heightPx - The height of the texture in texels.
     * @param data - The texture data to sample.
     * @param result - The color to store the sample.
     * @param normalizeFunc - The function to normalize the texel values. Default is to divide by 255.
     * @returns The result color.
     */
    export function Sample2DRgbaToRef<T extends BABYLON.IColor4Like>(u: number, v: number, widthPx: number, heightPx: number, data: Uint8Array | Uint16Array | Float32Array, result: T, normalizeFunc?: (value: number) => number): T;




    /**
     * The diffuse sky irradiance LUT is used to query the diffuse irradiance at a specified position.
     */
    export class DiffuseSkyIrradianceLut {
        private readonly _atmosphere;
        private _renderTarget;
        private _effectWrapper;
        private _effectRenderer;
        private _isDirty;
        private _isDisposed;
        private _needsReadPixels;
        private _lutData;
        /**
         * True if the LUT needs to be rendered.
         */
        get isDirty(): boolean;
        /**
         * True if the LUT has been disposed.
         */
        get isDisposed(): boolean;
        /**
         * The render target used for this LUT.
         * @throws if the LUT has been disposed.
         */
        get renderTarget(): BABYLON.RenderTargetTexture;
        /**
         * True if the LUT data has been read back from the GPU.
         */
        get hasLutData(): boolean;
        /**
         * Constructs the {@link DiffuseSkyIrradianceLut}.
         * @param atmosphere - The atmosphere to use.
         */
        constructor(atmosphere: Atmosphere);
        /**
         * Gets the diffuse sky irradiance for a surface oriented along the geocentric normal.
         * Resulting color is always in linear space.
         * @param directionToLight - The direction to the light in world space.
         * @param radius - The position's distance to the planet origin.
         * @param cameraGeocentricNormal - The geocentric normal of the camera.
         * @param lightIrradiance - The irradiance of the light.
         * @param result - The color to store the result in.
         * @returns The result color.
         */
        getDiffuseSkyIrradianceToRef<T extends BABYLON.IColor3Like>(directionToLight: BABYLON.IVector3Like, radius: number, cameraGeocentricNormal: BABYLON.IVector3Like, lightIrradiance: number, result: T): T;
        /**
         * Renders the LUT.
         * @returns True if the LUT was rendered.
         */
        render(): boolean;
        /**
         * Reads back the LUT data from the GPU if a readback is pending.
         * @internal
         */
        readPixelsAsync(): Promise<void>;
        /**
         * Marks the LUT as needing to be rendered.
         */
        markDirty(): void;
        /**
         * Disposes the LUT.
         */
        dispose(): void;
    }


    /**
     * The options for the {@link AtmospherePhysicalProperties} that describe the planet, the atmosphere, and scattering.
     */
    export interface IAtmospherePhysicalPropertiesOptions {
        /**
         * The radius of the planet in kilometers.
         */
        planetRadius?: number;
        /**
         * The minimum camera radius (distance from the planet's center) allowed when rendering the atmosphere.
         * This should be greater than 0.
         * It prevents rendering issues close to the planet's surface.
         */
        planetRadiusOffset?: number;
        /**
         * The thickness of the atmosphere measured in kilometers from the planet's surface to the outer edge of the atmosphere.
         */
        atmosphereThickness?: number;
        /**
         * The scale applied to the Rayleigh scattering.
         */
        rayleighScatteringScale?: number;
        /**
         * The Rayleigh scattering per kilometer at sea level for red, green, and blue wavelengths.
         */
        peakRayleighScattering?: BABYLON.Vector3;
        /**
         * The scale applied to the Mie scattering.
         */
        mieScatteringScale?: number;
        /**
         * The Mie scattering per kilometer at sea level for red, green, and blue wavelengths.
         */
        peakMieScattering?: BABYLON.Vector3;
        /**
         * The scale applied to the Mie absorption.
         */
        mieAbsorptionScale?: number;
        /**
         * The Mie absorption per kilometer at sea level for red, green, and blue wavelengths.
         */
        peakMieAbsorption?: BABYLON.Vector3;
        /**
         * The scale applied to the ozone absorption.
         */
        ozoneAbsorptionScale?: number;
        /**
         * The ozone absorption per kilometer at sea level for red, green, and blue wavelengths.
         */
        peakOzoneAbsorption?: BABYLON.Vector3;
    }


    /**
     * Describes the physical properties of the atmosphere. Assumes a spherical planet.
     * - "radius" values describe a distance from the planet's center.
     * - "height" values describe a distance from the planet's surface.
     * - Distances are in kilometers unless otherwise specified. Angles are in radians.
     */
    export class AtmospherePhysicalProperties {
        /**
         * Notification for when properties of the {@link AtmospherePhysicalProperties} are changed.
         */
        readonly onChangedObservable: BABYLON.Observable<AtmospherePhysicalProperties>;
        private _planetRadius;
        private _planetRadiusOffset;
        private _atmosphereThickness;
        private _rayleighScatteringScale;
        private _peakRayleighScattering;
        private _mieScatteringScale;
        private _peakMieScattering;
        private _mieAbsorptionScale;
        private _peakMieAbsorption;
        private _ozoneAbsorptionScale;
        private _peakOzoneAbsorption;
        private _planetRadiusWithOffset;
        private _planetRadiusSquared;
        private _atmosphereRadius;
        private _atmosphereRadiusSquared;
        private _horizonDistanceToAtmosphereEdge;
        private _horizonDistanceToAtmosphereEdgeSquared;
        private _rayleighScattering;
        private _mieScattering;
        private _mieAbsorption;
        private _mieExtinction;
        private _ozoneAbsorption;
        /**
         * The radius of the planet in kilometers.
         */
        get planetRadius(): number;
        set planetRadius(value: number);
        /**
         * The squared radius of the planet in kilometers.
         */
        get planetRadiusSquared(): number;
        /**
         * Offset applied to view points near the planet's surface. This should be greater than 0.
         * It prevents rendering issues close to the planet's surface.
         */
        get planetRadiusOffset(): number;
        set planetRadiusOffset(value: number);
        /**
         * This is the {@link planetRadius} with the additional {@link planetRadiusOffset}, in kilometers.
         */
        get planetRadiusWithOffset(): number;
        /**
         * The thickness of the atmosphere measured in kilometers.
         */
        get atmosphereThickness(): number;
        set atmosphereThickness(value: number);
        /**
         * The combined planet radius and atmosphere thickness in kilometers.
         */
        get atmosphereRadius(): number;
        /**
         * The atmosphere radius squared in kilometers.
         */
        get atmosphereRadiusSquared(): number;
        /**
         * Horizon distance from the planet's surface to the outer edge of the atmosphere in kilometers.
         */
        get horizonDistanceToAtmosphereEdge(): number;
        /**
         * Horizon distance from the planet's surface to the outer edge of the atmosphere, squared, in kilometers.
         */
        get horizonDistanceToAtmosphereEdgeSquared(): number;
        /**
         * The scale applied to {@link peakRayleighScattering}.
         */
        get rayleighScatteringScale(): number;
        set rayleighScatteringScale(value: number);
        /**
         * The Rayleigh scattering per kilometer at sea level for red, green, and blue wavelengths.
         */
        get peakRayleighScattering(): BABYLON.Vector3;
        set peakRayleighScattering(value: BABYLON.Vector3);
        /**
         * The Rayleigh scattering per kilometer at sea level for red, green, and blue wavelengths.
         * This value cannot be set directly. It is inferred by scaling {@link peakRayleighScattering} by {@link rayleighScatteringScale}.
         */
        get rayleighScattering(): BABYLON.Vector3;
        /**
         * The scale applied to {@link peakMieScattering}.
         */
        get mieScatteringScale(): number;
        set mieScatteringScale(value: number);
        /**
         * The Mie scattering per kilometer at sea level for red, green, and blue wavelengths.
         */
        get peakMieScattering(): BABYLON.Vector3;
        set peakMieScattering(value: BABYLON.Vector3);
        /**
         * The Mie scattering per kilometer at sea level for red, green, and blue wavelengths.
         * This value cannot be set directly. It is inferred by scaling {@link mieScatteringScale} by {@link peakMieScattering}.
         */
        get mieScattering(): BABYLON.Vector3;
        /**
         * The scale applied to {@link peakMieAbsorption}.
         */
        get mieAbsorptionScale(): number;
        set mieAbsorptionScale(value: number);
        /**
         * The Mie absorption per kilometer at sea level for red, green, and blue wavelengths.
         */
        get peakMieAbsorption(): BABYLON.Vector3;
        set peakMieAbsorption(value: BABYLON.Vector3);
        /**
         * The Mie absorption per kilometer at sea level for red, green, and blue wavelengths.
         * This value cannot be set directly. It is inferred by scaling {@link mieAbsorptionScale} by {@link peakMieAbsorption}.
         */
        get mieAbsorption(): BABYLON.Vector3;
        /**
         * The Mie extinction per kilometer at sea level for red, green, and blue wavelengths.
         * This value cannot be set directly. It is inferred by adding the {@link mieAbsorption} to the {@link mieScattering}.
         */
        get mieExtinction(): BABYLON.Vector3;
        /**
         * The scale applied to {@link peakOzoneAbsorption}.
         */
        get ozoneAbsorptionScale(): number;
        set ozoneAbsorptionScale(value: number);
        /**
         * The ozone absorption per kilometer measured at a height corresponding to it's peak concentration,
         * for red, green, and blue wavelengths.
         */
        get peakOzoneAbsorption(): BABYLON.Vector3;
        set peakOzoneAbsorption(value: BABYLON.Vector3);
        /**
         * The ozone absorption per kilometer at sea level for red, green, and blue wavelengths.
         * This value cannot be set directly. It is inferred by scaling {@link peakOzoneAbsorption} by {@link ozoneAbsorptionScale}.
         */
        get ozoneAbsorption(): BABYLON.Vector3;
        /**
         * Constructs the {@link AtmospherePhysicalProperties}.
         * @param options - The options for the {@link AtmospherePhysicalProperties}.
         */
        constructor(options?: IAtmospherePhysicalPropertiesOptions);
        private _recomputeDimensionalParameters;
        private _recomputeRayleighScattering;
        private _recomputeMieScattering;
        private _recomputeMieAbsorption;
        private _recomputeMieExtinction;
        private _recomputeOzoneAbsorption;
    }


    /**
     * Variables that are used to render the atmosphere and are computed per-camera.
     */
    export class AtmospherePerCameraVariables {
        private _inverseViewProjectionMatrixWithoutTranslation;
        private _directionToLightRelativeToCameraGeocentricNormal;
        private _cosAngleLightToZenith;
        private _cameraRadius;
        private _clampedCameraRadius;
        private _cameraHeight;
        private _clampedCameraHeight;
        private _cameraPositionGlobal;
        private _clampedCameraPositionGlobal;
        private _cosCameraHorizonAngleFromZenith;
        private _sinCameraAtmosphereHorizonAngleFromNadir;
        private _cameraGeocentricNormal;
        private _cameraForward;
        private _cameraNearPlane;
        private _cameraPosition;
        private _viewport;
        private _lastViewMatrix;
        private _lastProjectionMatrix;
        private _inverseViewMatrixWithoutTranslation;
        private _inverseProjectionMatrix;
        /**
         * The inverse view projection matrix is used to unproject rays.
         * To avoid precision issues, the translation part of the matrix has been removed.
         */
        get inverseViewProjectionMatrixWithoutTranslation(): BABYLON.IMatrixLike;
        /**
         * The direction to the light relative to the geocentric normal under the camera.
         */
        get directionToLightRelativeToCameraGeocentricNormal(): BABYLON.IVector3Like;
        /**
         * The cosine of the angle between the light direction and zenith.
         */
        get cosAngleLightToZenith(): number;
        /**
         * The distance from the camera to the planet origin in kilometers.
         */
        get cameraRadius(): number;
        /**
         * The distance from the camera to the planet origin, clamped to the planet radius offset, in kilometers.
         */
        get clampedCameraRadius(): number;
        /**
         * The height of the camera above the planet surface in kilometers.
         */
        get cameraHeight(): number;
        /**
         * The height of the camera above the planet surface, clamped to the planet radius offset, in kilometers.
         */
        get clampedCameraHeight(): number;
        /**
         * The camera position in global space kilometers.
         *
         * The behavior of this value depends on whether floating origin mode is enabled:
         * - If floating origin mode is enabled, this is simply the camera's global position scaled to kilometers. The atmosphere's origin height is used to offset the camera position along its geocentric normal.
         * - If floating origin mode is disabled, the camera's y position is offset by the planet radius plus any origin height.
         */
        get cameraPositionGlobal(): BABYLON.IVector3Like;
        /**
         * The camera position, clamped to the planet radius offset, in global space kilometers.
         * See {@link cameraPositionGlobal} for details on how the value is computed.
         */
        get clampedCameraPositionGlobal(): BABYLON.IVector3Like;
        /**
         * The cosine of the angle from the zenith to the horizon of the planet, measured from the camera position.
         */
        get cosCameraHorizonAngleFromZenith(): number;
        /**
         * The sine of the angle from the nadir to the horizon of the atmosphere, measured from the camera position.
         */
        get sinCameraAtmosphereHorizonAngleFromNadir(): number;
        /**
         * The geocentric normal of the camera in global space i.e., the normalization of {@link cameraPositionGlobal}.
         * Note the behavior of this value depends on whether floating origin mode is enabled. See {@link cameraPositionGlobal} for details.
         */
        get cameraGeocentricNormal(): BABYLON.IVector3Like;
        /**
         * The camera's forward direction in world space.
         */
        get cameraForward(): BABYLON.IVector3Like;
        /**
         * The distance to the near plane of the camera.
         */
        get cameraNearPlane(): number;
        /**
         * The camera's position in world space.
         */
        get cameraPosition(): BABYLON.IVector3Like;
        /**
         * The viewport for the camera.
         */
        get viewport(): BABYLON.IVector4Like;
        /**
         * Updates the variables.
         * @param camera - The camera to update the variables for.
         * @param planetRadius - The radius of the planet in kilometers.
         * @param planetRadiusWithOffset - The radius of the planet with the offset in kilometers.
         * @param atmosphereRadius - The radius of the atmosphere in kilometers.
         * @param directionToLight - The direction to the light in world space.
         * @param originHeight - The height of the origin (distance from planet's surface) in kilometers.
         */
        update(camera: BABYLON.Camera, planetRadius: number, planetRadiusWithOffset: number, atmosphereRadius: number, directionToLight: BABYLON.IVector3Like, originHeight: number): void;
    }


    class AtmospherePBRMaterialDefines extends BABYLON.MaterialDefines {
        USE_AERIAL_PERSPECTIVE_LUT: boolean;
        APPLY_AERIAL_PERSPECTIVE_INTENSITY: boolean;
        APPLY_AERIAL_PERSPECTIVE_RADIANCE_BIAS: boolean;
        SAMPLE_TRANSMITTANCE_LUT: boolean;
        EXCLUDE_RAY_MARCHING_FUNCTIONS: boolean;
        /**
         * Constructs the {@link AtmospherePBRMaterialDefines}.
         * @param useAerialPerspectiveLut - Whether to use the aerial perspective LUT.
         */
        constructor(useAerialPerspectiveLut: boolean);
    }
    /**
     * Adds shading logic to a PBRMaterial that provides radiance, diffuse sky irradiance, and aerial perspective from the atmosphere.
     */
    export class AtmospherePBRMaterialPlugin extends BABYLON.MaterialPluginBase {
        private readonly _atmosphere;
        private readonly _isAerialPerspectiveEnabled;
        /**
         * Constructs the {@link AtmospherePBRMaterialPlugin}.
         * @param material - The material to apply the plugin to.
         * @param _atmosphere - The atmosphere to use for shading.
         * @param _isAerialPerspectiveEnabled - Whether to apply aerial perspective.
         */
        constructor(material: BABYLON.Material, _atmosphere: Atmosphere, _isAerialPerspectiveEnabled?: boolean);
        /**
         * @override
         */
        isCompatible(): boolean;
        /**
         * @override
         */
        getUniformBuffersNames(_ubos: string[]): void;
        /**
         * @override
         */
        getUniforms(): {
            ubo: {
                name: string;
                size: number;
                type: string;
            }[];
            fragment: string;
            externalUniforms: string[];
        };
        /**
         * @override
         */
        isReadyForSubMesh(): boolean;
        /**
         * @override
         */
        getActiveTextures(_activeTextures: BABYLON.BaseTexture[]): void;
        /**
         * @override
         */
        bindForSubMesh(uniformBuffer: BABYLON.UniformBuffer): void;
        /**
         * @override
         */
        prepareDefines(defines: AtmospherePBRMaterialDefines): void;
        /**
         * @override
         */
        getSamplers(samplers: string[]): void;
        /**
         * @override
         */
        getCustomCode(shaderType: string, shaderLanguage: BABYLON.ShaderLanguage): BABYLON.Nullable<Record<string, string>>;
    }


    /**
     * Creation options for the {@link Atmosphere}.
     */
    export interface IAtmosphereOptions {
        /**
         * The properties that define the atmosphere's composition and size.
         */
        physicalProperties?: AtmospherePhysicalProperties;
        /**
         * An optional depth texture that will be used by the fullscreen passes that render the sky, aerial perspective, or globe atmosphere.
         * This enables deferred rendering scenarios, where atmospheric effects need to be composited onto geometry buffers.
         * Expects infinite far plane on the camera (camera.maxZ = 0) and a non-linear depth to be stored in the red channel.
         */
        depthTexture?: BABYLON.BaseTexture;
        /**
         * Controls the overall brightness of the atmosphere rendering.
         * A value of 1.0 is physically correct.
         */
        exposure?: number;
        /**
         * Whether the light values should be specified in linear space.
         * Set to true when using PBRMaterials, which expect linear light values.
         */
        isLinearSpaceLight?: boolean;
        /**
         * Whether the composition of the sky should be in linear space.
         * Set to true for HDR rendering or when using image post-processes.
         */
        isLinearSpaceComposition?: boolean;
        /**
         * Whether to apply approximate transmittance to dim surfaces behind the atmosphere.
         * When true, distant surfaces are dimmed using a grayscale approximation of transmittance.
         */
        applyApproximateTransmittance?: boolean;
        /**
         * Whether to use the sky view LUT for compositing the sky.
         * When false, full ray marching is required (slower).
         */
        isSkyViewLutEnabled?: boolean;
        /**
         * Whether to use the aerial perspective LUT.
         * When false, full ray marching is required for aerial perspective (slower).
         */
        isAerialPerspectiveLutEnabled?: boolean;
        /**
         * Radiance bias applied to the aerial perspective.
         * Positive values brighten the aerial perspective, negative values darken it.
         * The default is 0 (no change).
         */
        aerialPerspectiveRadianceBias?: number;
        /**
         * Scale factor for the amount of light transmitted into aerial perspective from the light source.
         * The default is 1 (no scaling).
         */
        aerialPerspectiveTransmittanceScale?: number;
        /**
         * Amount of saturation applied to the aerial perspective.
         * Lower values make the aerial perspective more gray.
         * The default is 1 (no saturation change).
         */
        aerialPerspectiveSaturation?: number;
        /**
         * Overall intensity multiplier for the aerial perspective effect.
         * Higher values increase haziness.
         * The default is 1 (no intensity change).
         */
        aerialPerspectiveIntensity?: number;
        /**
         * Whether to use the diffuse sky irradiance LUT.
         */
        isDiffuseSkyIrradianceLutEnabled?: boolean;
        /**
         * Higher values result in more desaturated diffuse irradiance.
         * The default is 0 (no desaturation).
         */
        diffuseSkyIrradianceDesaturationFactor?: number;
        /**
         * Overall intensity multiplier for the diffuse irradiance.
         * The default is 1 (no intensity change).
         */
        diffuseSkyIrradianceIntensity?: number;
        /**
         * Controls the intensity of the additional diffuse irradiance amount.
         */
        additionalDiffuseSkyIrradianceIntensity?: number;
        /**
         * Controls the color of the additional diffuse irradiance amount.
         */
        additionalDiffuseSkyIrradianceColor?: BABYLON.IColor3Like;
        /**
         * Higher values increase the contribution of multiple scattering to the overall atmosphere.
         * Default is 1 (no intensity change).
         */
        multiScatteringIntensity?: number;
        /**
         * Average color of light reflected off the ground.
         * Affects the multiply scattered light contribution in the atmosphere.
         */
        groundAlbedo?: BABYLON.IColor3Like;
        /**
         * Minimum color for multiple scattering.
         * Useful for creating a quick, but not physically accurate, night sky.
         */
        minimumMultiScatteringColor?: BABYLON.IColor3Like;
        /**
         * Controls the intensity of the {@link minimumMultiScatteringColor}.
         * Useful for creating a quick, but not physically accurate, night sky.
         */
        minimumMultiScatteringIntensity?: number;
        /**
         * Height in kilometers of the scene's origin relative to the planet surface.
         */
        originHeight?: number;
        /**
         * The rendering group ID for the sky compositor.
         * When specified, the sky will only be rendered for this group.
         * If not specified, defaults to group 0.
         */
        skyRenderingGroup?: number;
        /**
         * The rendering group ID for the aerial perspective compositor.
         * When specified, aerial perspective will only be rendered for this group.
         * If not specified, defaults to group 0.
         */
        aerialPerspectiveRenderingGroup?: number;
        /**
         * The rendering group ID for the globe atmosphere compositor.
         * When specified, the globe atmosphere will only be rendered for this group.
         * If not specified, defaults to group 0.
         */
        globeAtmosphereRenderingGroup?: number;
    }


    /**
     * Renders a physically based atmosphere.
     * Use {@link IsSupported} to check if the atmosphere is supported before creating an instance.
     * @experimental
     */
    export class Atmosphere implements BABYLON.IDisposable {
        readonly name: string;
        readonly scene: BABYLON.Scene;
        private readonly _directionToLight;
        private readonly _tempSceneAmbient;
        private readonly _engine;
        private readonly _isDiffuseSkyIrradianceLutEnabled;
        private _physicalProperties;
        private _transmittanceLut;
        private _diffuseSkyIrradianceLut;
        private _isSkyViewLutEnabled;
        private _isAerialPerspectiveLutEnabled;
        private _aerialPerspectiveTransmittanceScale;
        private _aerialPerspectiveSaturation;
        private _aerialPerspectiveIntensity;
        private _aerialPerspectiveRadianceBias;
        private _diffuseSkyIrradianceDesaturationFactor;
        private _additionalDiffuseSkyIrradianceIntensity;
        private _additionalDiffuseSkyIrradianceColor;
        private _additionalDiffuseSkyIrradiance;
        private _diffuseSkyIrradianceIntensity;
        private _multiScatteringIntensity;
        private _groundAlbedo;
        private _minimumMultiScatteringColor;
        private _minimumMultiScatteringIntensity;
        private _lights;
        private _atmosphereUbo;
        private _minimumMultiScattering;
        private _cameraAtmosphereVariables;
        private _isLinearSpaceComposition;
        private _isLinearSpaceLight;
        private _lightRadianceAtCamera;
        private _linearLightColor;
        private _originHeight;
        private _applyApproximateTransmittance;
        private _exposure;
        private _atmosphereUniformBufferAsArray;
        private _effectRenderer;
        private _skyRenderingGroup;
        private _aerialPerspectiveRenderingGroup;
        private _globeAtmosphereRenderingGroup;
        private _isEnabled;
        private _aerialPerspectiveLutHasBeenRendered;
        private _hasRenderedMultiScatteringLut;
        private _hasEverRenderedMultiScatteringLut;
        private _multiScatteringEffectWrapper;
        private _multiScatteringLutRenderTarget;
        private _aerialPerspectiveLutEffectWrapper;
        private _aerialPerspectiveLutEffectRenderer;
        private _aerialPerspectiveLutRenderTarget;
        private _skyViewLutEffectWrapper;
        private _skyViewLutEffectRenderer;
        private _skyViewLutRenderTarget;
        private _aerialPerspectiveCompositorEffectWrapper;
        private _skyCompositorEffectWrapper;
        private _globeAtmosphereCompositorEffectWrapper;
        private _onBeforeCameraRenderObserver;
        private _onBeforeRenderObserver;
        private _onBeforeDrawPhaseObserver;
        private _onAfterRenderingGroupObserver;
        /**
         * Checks if the {@link Atmosphere} is supported.
         * @param engine - The engine to check.
         * @returns True if the atmosphere is supported, false otherwise.
         */
        static IsSupported(engine: BABYLON.AbstractEngine): boolean;
        /**
         * The unique ID of this atmosphere instance.
         */
        readonly uniqueId: number;
        /**
         * Called after the atmosphere variables have been updated for the specified camera.
         */
        readonly onAfterUpdateVariablesForCameraObservable: BABYLON.Observable<BABYLON.Camera>;
        /**
         * Called immediately before the light variables are finalized.
         */
        readonly onBeforeLightVariablesUpdateObservable: BABYLON.Observable<void>;
        /**
         * Called before the LUTs are rendered for this camera. This happens after the per-camera UBO update.
         */
        readonly onBeforeRenderLutsForCameraObservable: BABYLON.Observable<BABYLON.Camera>;
        /**
         * Called after the LUTs were rendered.
         */
        readonly onAfterRenderLutsForCameraObservable: BABYLON.Observable<BABYLON.Camera>;
        /**
         * If provided, this is the depth texture used for composition passes.
         * Expects an infinite far plane on the camera (camera.maxZ = 0) and the non-linear depth accessible in red channel.
         * @internal
         */
        readonly depthTexture: BABYLON.Nullable<BABYLON.BaseTexture>;
        /**
         * Controls the overall brightness of the atmosphere rendering.
         */
        get exposure(): number;
        set exposure(value: number);
        /**
         * Affects the overall intensity of the multiple scattering.
         */
        get multiScatteringIntensity(): number;
        set multiScatteringIntensity(value: number);
        /**
         * Affects the multiply scattered light contribution in the atmosphere by describing the average light color reflected off the ground.
         */
        get groundAlbedo(): BABYLON.DeepImmutable<BABYLON.IColor3Like>;
        set groundAlbedo(value: BABYLON.DeepImmutable<BABYLON.IColor3Like>);
        /**
         * Can be used to clamp the multiple scattering to a minimum value.
         */
        get minimumMultiScatteringColor(): BABYLON.DeepImmutable<BABYLON.IColor3Like>;
        set minimumMultiScatteringColor(value: BABYLON.DeepImmutable<BABYLON.IColor3Like>);
        /**
         * This is an additional scaling factor applied to the {@link minimumMultiScatteringColor}.
         */
        get minimumMultiScatteringIntensity(): number;
        set minimumMultiScatteringIntensity(value: number);
        /**
         * Can be used to force the diffuse irradiance towards a gray color.
         */
        get diffuseSkyIrradianceDesaturationFactor(): number;
        set diffuseSkyIrradianceDesaturationFactor(value: number);
        /**
         * This is an additional amount of irradiance added to the diffuse irradiance.
         */
        get additionalDiffuseSkyIrradianceIntensity(): number;
        set additionalDiffuseSkyIrradianceIntensity(value: number);
        /**
         * This is the color for the additional amount of irradiance added to the diffuse irradiance.
         */
        get additionalDiffuseSkyIrradianceColor(): BABYLON.DeepImmutable<BABYLON.IColor3Like>;
        set additionalDiffuseSkyIrradianceColor(value: BABYLON.DeepImmutable<BABYLON.IColor3Like>);
        /**
         * The final additional diffuse irradiance, taking into account the intensity and color.
         */
        get additionalDiffuseSkyIrradiance(): BABYLON.DeepImmutable<BABYLON.IColor3Like>;
        /**
         * The intensity of the diffuse irradiance.
         */
        get diffuseSkyIrradianceIntensity(): number;
        set diffuseSkyIrradianceIntensity(value: number);
        /**
         * True if the sky view LUT should be used for compositing the sky instead of a per-pixel ray march.
         */
        get isSkyViewLutEnabled(): boolean;
        set isSkyViewLutEnabled(value: boolean);
        /**
         * Gets the sky view LUT render target or null if not enabled.
         * @returns The render target.
         */
        get skyViewLutRenderTarget(): BABYLON.Nullable<BABYLON.RenderTargetTexture>;
        /**
         * True if the aerial perspective LUT should be used.
         * If false, full ray marching would be used instead.
         */
        get isAerialPerspectiveLutEnabled(): boolean;
        set isAerialPerspectiveLutEnabled(value: boolean);
        /**
         * Gets the aerial perspective LUT render target or null if not enabled.
         * @returns The render target.
         */
        get aerialPerspectiveLutRenderTarget(): BABYLON.Nullable<BABYLON.RenderTargetTexture>;
        /**
         * The intensity of the aerial perspective.
         */
        get aerialPerspectiveIntensity(): number;
        set aerialPerspectiveIntensity(value: number);
        /**
         * The amount of light transmitted into aerial perspective.
         * A scale of 1 is physically correct.
         */
        get aerialPerspectiveTransmittanceScale(): number;
        set aerialPerspectiveTransmittanceScale(value: number);
        /**
         * The amount of saturation applied to the aerial perspective.
         * Reducing to zero desaturates the aerial perspective completely.
         * A value of 1 has no effect.
         */
        get aerialPerspectiveSaturation(): number;
        set aerialPerspectiveSaturation(value: number);
        /**
         * A radiance bias applied to aerial perspective.
         */
        get aerialPerspectiveRadianceBias(): number;
        set aerialPerspectiveRadianceBias(value: number);
        /**
         * True if the composition should be in linear space (e.g. for HDR rendering).
         * Typically linear space is expected when ImageProcessing is enabled via PostProcesses.
         * False for non-linear output.
         */
        get isLinearSpaceComposition(): boolean;
        set isLinearSpaceComposition(value: boolean);
        /**
         * True if the {@link light} value should be specified in linear space.
         * If using PBRMaterials, light value is expected to be linear.
         */
        get isLinearSpaceLight(): boolean;
        set isLinearSpaceLight(value: boolean);
        /**
         * The lookup table for transmittance.
         */
        get transmittanceLut(): BABYLON.Nullable<TransmittanceLut>;
        /**
         * Gets the multiple scattering LUT render target.
         * @returns The render target.
         */
        get multiScatteringLutRenderTarget(): BABYLON.Nullable<BABYLON.RenderTargetTexture>;
        /**
         * The lookup table for diffuse sky irradiance, or null if not enabled.
         */
        get diffuseSkyIrradianceLut(): BABYLON.Nullable<DiffuseSkyIrradianceLut>;
        /**
         * The properties used to describe the size and optical parameters of the atmosphere.
         */
        get physicalProperties(): AtmospherePhysicalProperties;
        /**
         * The height in kilometers of the scene's origin.
         */
        get originHeight(): number;
        set originHeight(value: number);
        /**
         * When atmospheric scattering is applied to surfaces, if this value is set to true,
         * a grayscale approximation of the transmittance is used to dim surfaces.
         *
         * When set to false, the atmospheric composition does not dim the surfaces behind it.
         * It is up to the client application to apply transmittance manually.
         */
        get applyApproximateTransmittance(): boolean;
        set applyApproximateTransmittance(value: boolean);
        /**
         * The directional lights in the scene which represent the suns illuminating the atmosphere.
         * Each frame, the color and intensity of the lights are updated based on the camera position and the light's direction.
         */
        get lights(): ReadonlyArray<BABYLON.DirectionalLight>;
        /**
         * The rendering group ID for the sky compositor.
         * The sky will only be rendered for this group.
         */
        get skyRenderingGroup(): number;
        set skyRenderingGroup(value: number);
        /**
         * The rendering group ID for the aerial perspective compositor.
         * Aerial perspective will only be rendered for this group.
         */
        get aerialPerspectiveRenderingGroup(): number;
        set aerialPerspectiveRenderingGroup(value: number);
        /**
         * The rendering group ID for the globe atmosphere compositor.
         * The globe atmosphere will only be rendered for this group.
         */
        get globeAtmosphereRenderingGroup(): number;
        set globeAtmosphereRenderingGroup(value: number);
        /**
         * Gets the uniform buffer used to store the atmosphere's physical properties.
         */
        get uniformBuffer(): BABYLON.UniformBuffer;
        /**
         * Gets the camera-related variables for this atmosphere. Updated each frame.
         */
        get cameraAtmosphereVariables(): AtmospherePerCameraVariables;
        /**
         * Constructs the {@link Atmosphere}.
         * @param name - The name of this instance.
         * @param scene - The scene to which the atmosphere will be added.
         * @param lights - The light sources that illuminate the atmosphere. Currently only supports one light, and that light should be the first light in the scene.
         * @param options - The options used to create the atmosphere.
         */
        constructor(name: string, scene: BABYLON.Scene, lights: BABYLON.DirectionalLight[], options?: IAtmosphereOptions);
        /**
         * @override
         */
        dispose(): void;
        /**
         * True if the atmosphere is enabled.
         * @returns - True if the atmosphere is enabled.
         */
        isEnabled(): boolean;
        /**
         * Sets the enabled state of the atmosphere.
         * @param enabled - True to enable the atmosphere, false to disable it.
         */
        setEnabled(enabled: boolean): void;
        /**
         * Returns true if the atmosphere is ready for rendering.
         * Note, this will cause a render of the global LUTs if they are not up to date.
         * @returns true if the atmosphere is ready
         */
        isReady(): boolean;
        /**
         * The class name of the {@link Atmosphere}.
         * @returns - The class name of the atmosphere.
         */
        getClassName(): string;
        /**
         * Gets the color of a light after being transmitted through the atmosphere to a point specified by its distance to the planet center and its geocentric normal.
         * NOTE, the result is always a linear space color.
         * @param directionToLight - The direction of the light.
         * @param pointRadius - The distance from the planet center to the point in kilometers.
         * @param pointGeocentricNormal - The geocentric normal at the point i.e., normalize(point - planet center).
         * @param result - The color to store the result in.
         * @returns The result color.
         */
        getTransmittedColorToRef: <T extends BABYLON.IColor3Like>(directionToLight: BABYLON.IVector3Like, pointRadius: number, pointGeocentricNormal: BABYLON.IVector3Like, result: T) => T;
        /**
         * Gets the diffuse sky irradiance. Result is always in linear space.
         * @param directionToLight - The direction of the point to the light.
         * @param pointRadius - The distance from the planet center to the point in kilometers.
         * @param pointGeocentricNormal - The geocentric normal at the point: normalize(point - planet center).
         * @param lightIrradiance - The irradiance of the light.
         * @param result - The color to store the result in.
         * @returns The result color.
         */
        getDiffuseSkyIrradianceToRef: <T extends BABYLON.IColor3Like>(directionToLight: BABYLON.IVector3Like, pointRadius: number, pointGeocentricNormal: BABYLON.IVector3Like, lightIrradiance: number, result: T) => T;
        /**
         * Draws the multiple scattering LUT using {@link EffectWrapper} and {@link EffectRenderer}.
         */
        private _drawMultiScatteringLut;
        /**
         * Draws the aerial perspective compositor using {@link EffectWrapper} and {@link EffectRenderer}.
         */
        drawAerialPerspectiveCompositor(): void;
        /**
         * Draws the sky compositor using {@link EffectWrapper} and {@link EffectRenderer}.
         */
        drawSkyCompositor(): void;
        /**
         * Draws the globe atmosphere compositor using {@link EffectWrapper} and {@link EffectRenderer}.
         */
        drawGlobeAtmosphereCompositor(): void;
        private _disposeSkyCompositor;
        private _disposeAerialPerspectiveCompositor;
        private _disposeGlobeAtmosphereCompositor;
        private get _isGlobalLutsReady();
        /**
         * Updates the camera variables that are specific to the atmosphere.
         * @param camera - The camera to update the variables for.
         */
        private _updatePerCameraVariables;
        /**
         * Renders the lookup tables, some of which can vary per-camera.
         * It is expected that updatePerCameraVariables was previously called.
         * @param camera - The camera to render the LUTs for.
         */
        private _renderLutsForCamera;
        /**
         * Renders the lookup tables that do not depend on a camera position.
         */
        renderGlobalLuts(): void;
        /**
         * Binds the atmosphere's uniform buffer to an {@link BABYLON.Effect}.
         * @param effect - The {@link BABYLON.Effect} to bind the uniform buffer to.
         */
        bindUniformBufferToEffect(effect: BABYLON.Effect): void;
        /**
         * Updates the values in the atmosphere's uniform buffer.
         */
        updateUniformBuffer(): void;
        /**
         * Draws the aerial perspective LUT using {@link EffectWrapper} and {@link EffectRenderer}.
         */
        private _drawAerialPerspectiveLut;
        private _clearAerialPerspectiveLut;
        /**
         * Draws the sky view LUT using {@link EffectWrapper} and {@link EffectRenderer}.
         */
        private _drawSkyViewLut;
    }


    /** @internal */
    export var transmittancePixelShaderWGSL: {
        name: string;
        shader: string;
    };


    /** @internal */
    export var skyViewPixelShaderWGSL: {
        name: string;
        shader: string;
    };


    /** @internal */
    export var multiScatteringPixelShaderWGSL: {
        name: string;
        shader: string;
    };


    /** @internal */
    export var fullscreenTriangleVertexShaderWGSL: {
        name: string;
        shader: string;
    };


    /** @internal */
    export var diffuseSkyIrradiancePixelShaderWGSL: {
        name: string;
        shader: string;
    };


    /** @internal */
    export var compositeSkyPixelShaderWGSL: {
        name: string;
        shader: string;
    };


    /** @internal */
    export var compositeGlobeAtmospherePixelShaderWGSL: {
        name: string;
        shader: string;
    };


    /** @internal */
    export var compositeAerialPerspectivePixelShaderWGSL: {
        name: string;
        shader: string;
    };


    /** @internal */
    export var aerialPerspectivePixelShaderWGSL: {
        name: string;
        shader: string;
    };


    /** @internal */
    export var depthFunctionsWGSL: {
        name: string;
        shader: string;
    };


    /** @internal */
    export var atmosphereUboDeclarationWGSL: {
        name: string;
        shader: string;
    };


    /** @internal */
    export var atmosphereFunctionsWGSL: {
        name: string;
        shader: string;
    };


    /** @internal */
    export var transmittancePixelShader: {
        name: string;
        shader: string;
    };


    /** @internal */
    export var skyViewPixelShader: {
        name: string;
        shader: string;
    };


    /** @internal */
    export var multiScatteringPixelShader: {
        name: string;
        shader: string;
    };


    /** @internal */
    export var fullscreenTriangleVertexShader: {
        name: string;
        shader: string;
    };


    /** @internal */
    export var diffuseSkyIrradiancePixelShader: {
        name: string;
        shader: string;
    };


    /** @internal */
    export var compositeSkyPixelShader: {
        name: string;
        shader: string;
    };


    /** @internal */
    export var compositeGlobeAtmospherePixelShader: {
        name: string;
        shader: string;
    };


    /** @internal */
    export var compositeAerialPerspectivePixelShader: {
        name: string;
        shader: string;
    };


    /** @internal */
    export var aerialPerspectivePixelShader: {
        name: string;
        shader: string;
    };


    /** @internal */
    export var depthFunctions: {
        name: string;
        shader: string;
    };


    /** @internal */
    export var atmosphereVertexDeclaration: {
        name: string;
        shader: string;
    };


    /** @internal */
    export var atmosphereUboDeclaration: {
        name: string;
        shader: string;
    };


    /** @internal */
    export var atmosphereFunctions: {
        name: string;
        shader: string;
    };


    /** @internal */
    export var atmosphereFragmentDeclaration: {
        name: string;
        shader: string;
    };



}


                