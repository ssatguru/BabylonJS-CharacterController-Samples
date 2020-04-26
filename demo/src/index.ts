import { AbstractMesh, Engine, Scene, Color4, Color3, Vector3, HemisphericLight, DirectionalLight, Mesh, MeshBuilder, StandardMaterial, Texture, ArcRotateCamera, SceneLoader } from "babylonjs";
import { CharacterController } from "babylonjs-charactercontroller";

window.onload = function () {
    main();
}

function main() {
    let canvas = <HTMLCanvasElement>document.querySelector("#renderCanvas");
    let engine = new Engine(canvas, true);
    let scene = new Scene(engine);
    scene.clearColor = new Color4(0.75, 0.75, 0.75, 1);
    scene.ambientColor = new Color3(1, 1, 1);

    let light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);
    light.intensity = .3;

    let light2 = new DirectionalLight("light2", new Vector3(-1, -1, -1), scene);
    light2.position = new Vector3(0, 128, 0);
    light2.intensity = .7;

    let ground = createGround(scene);

    loadPlayer(scene, engine, canvas);

    window.addEventListener("resize", function () {
        engine.resize();
    });
}



function loadPlayer(scene: Scene, engine: Engine, canvas: HTMLCanvasElement) {


    SceneLoader.ImportMesh("", "assets/player/", "Vincent.babylon", scene, (meshes, particleSystems, skeletons) => {
        let player = meshes[0];
        let skeleton = skeletons[0];
        player.skeleton = skeleton;

        skeleton.enableBlending(0.1);
        //if the skeleton does not have any animation ranges then set them as below
        // setAnimationRanges(skeleton);

        let sm = <StandardMaterial>player.material;
        if (sm.diffuseTexture != null) {
            sm.backFaceCulling = true;
            sm.ambientColor = new Color3(1, 1, 1);
        }


        player.position = new Vector3(0, 12, 0);
        player.checkCollisions = true;
        player.ellipsoid = new Vector3(0.5, 1, 0.5);
        player.ellipsoidOffset = new Vector3(0, 1, 0);

        //rotate the camera behind the player
        let alpha = -player.rotation.y - 4.69;
        let beta = Math.PI / 2.5;
        let target = new Vector3(player.position.x, player.position.y + 1.5, player.position.z);

        console.log("loading meshes 1.1");
        let camera = new ArcRotateCamera("ArcRotateCamera", alpha, beta, 5, target, scene);

        //standard camera setting
        camera.wheelPrecision = 15;
        camera.checkCollisions = false;
        //make sure the keyboard keys controlling camera are different from those controlling player
        //here we will not use any keyboard keys to control camera
        camera.keysLeft = [];
        camera.keysRight = [];
        camera.keysUp = [];
        camera.keysDown = [];
        //how close can the camera come to player
        camera.lowerRadiusLimit = 2;
        //how far can the camera go from the player
        camera.upperRadiusLimit = 20;
        camera.attachControl(canvas, false);

        //let CharacterController = org.ssatguru.babylonjs.component.CharacterController;
        let cc = new CharacterController(<Mesh>player, camera, scene, null, true);
        //below makes the controller point the camera at the player head which is approx
        //1.5m above the player origin
        cc.setCameraTarget(new Vector3(0, 1.5, 0));

        //if the camera comes close to the player we want to enter first person mode.
        cc.setNoFirstPerson(false);
        //the height of steps which the player can climb
        cc.setStepOffset(0.4);
        //the minimum and maximum slope the player can go up
        //between the two the player will start sliding down if it stops
        cc.setSlopeLimit(30, 60);

        //tell controller 
        // - which animation range should be used for which player animation
        // - rate at which to play that animation range
        // - wether the animation range should be looped
        //use this if name, rate or looping is different from default
        cc.setIdleAnim("idle", 1, true);
        cc.setTurnLeftAnim("turnLeft", 0.5, true);
        cc.setTurnRightAnim("turnRight", 0.5, true);
        cc.setWalkBackAnim("walkBack", 0.5, true);
        cc.setIdleJumpAnim("idleJump", .5, false);
        cc.setRunJumpAnim("runJump", 0.6, false);
        //set the animation range name to "null" to prevent the controller from playing
        //a player animation.
        //here even though we have an animation range called "fall" we donot want to play 
        //the fall animation
        cc.setFallAnim("fall", 2, false);
        cc.setSlideBackAnim("slideBack", 1, false)

        cc.start();

        engine.runRenderLoop(function () {
            scene.render();
        });

        setControls(cc);

    });
}


//this is how you might set the animation ranges for a skeleton
function setAnimationRanges(skel) {
    delAnimRanges(skel);

    skel.createAnimationRange("fall", 0, 16);
    skel.createAnimationRange("idle", 21, 65);
    skel.createAnimationRange("jump", 70, 94);
    skel.createAnimationRange("run", 100, 121);
    skel.createAnimationRange("slideBack", 125, 129);
    skel.createAnimationRange("strafeLeft", 135, 179);
    skel.createAnimationRange("strafeRight", 185, 229);
    skel.createAnimationRange("turnLeft", 240, 262);
    skel.createAnimationRange("turnRight", 270, 292);
    skel.createAnimationRange("walk", 300, 335);
    skel.createAnimationRange("walkBack", 340, 366);
}
/*
 * delete all existing ranges
 * @param {type} skel
 * @returns {undefined}
 */
function delAnimRanges(skel) {
    let ars = skel.getAnimationRanges();
    let l = ars.length;
    for (let i = 0; i < l; i++) {
        let ar = ars[i];
        console.log(ar.name + "," + ar.from + "," + ar.to);
        skel.deleteAnimationRange(ar.name, false);
    }

}

function createGround(scene) {
    let groundMaterial = createGroundMaterial(scene);
    MeshBuilder.CreateGroundFromHeightMap("ground", "assets/ground/ground_heightMap.png", {
        width: 128,
        height: 128,
        minHeight: 0,
        maxHeight: 10,
        subdivisions: 32,
        onReady: (grnd) => {
            grnd.material = groundMaterial;
            grnd.checkCollisions = true;
            grnd.isPickable = true;
            grnd.freezeWorldMatrix();
        }

    }, scene);
}

function createGroundMaterial(scene) {
    let groundMaterial = new StandardMaterial("groundMat", scene);
    let diffuseTexture: Texture = new Texture("assets/ground/ground.jpg", scene);
    diffuseTexture.uScale = 4.0;
    diffuseTexture.vScale = 4.0
    groundMaterial.diffuseTexture = diffuseTexture;

    let bumpTexture = new Texture("assets/ground/ground-normal.png", scene);
    bumpTexture.uScale = 12.0;
    bumpTexture.vScale = 12.0;
    groundMaterial.bumpTexture = bumpTexture;


    groundMaterial.diffuseColor = new Color3(0.9, 0.6, 0.4);
    groundMaterial.specularColor = new Color3(0, 0, 0);
    return groundMaterial;
}

function toggleClass(e) {
    e.target.classList.toggle("w3-pale-red");
    e.target.classList.toggle("w3-pale-green");
}

let w,
    wb,
    r,
    j,
    tl,
    tr,
    sl,
    sr = false;

function setControls(cc: CharacterController) {

    const x: HTMLCollectionOf<HTMLButtonElement> = document.getElementsByTagName("button");
    for (let e of x as any) {
        e.className = "w3-btn w3-border w3-round w3-pale-red";
    }

    document.getElementById("w").onclick = (e) => {
        cc.walk((w = !w));
        toggleClass(e);
    };
    document.getElementById("wb").onclick = (e) => {
        cc.walkBack((wb = !wb));
        toggleClass(e);
    };
    document.getElementById("r").onclick = (e) => {
        cc.run((r = !r));
        toggleClass(e);
    };
    document.getElementById("j").onclick = (e) => {
        cc.jump();
    };
    document.getElementById("tl").onclick = (e) => {
        cc.turnLeft((tl = !tl));
        toggleClass(e);
    };
    document.getElementById("tr").onclick = (e) => {
        cc.turnRight((tr = !tr));
        toggleClass(e);
    };
    document.getElementById("sl").onclick = (e) => {
        cc.strafeLeft((sl = !sl));
        toggleClass(e);
    };
    document.getElementById("sr").onclick = (e) => {
        cc.strafeRight((sr = !sr));
        toggleClass(e);
    };

    document.getElementById("tp").onclick = (e) => cc.setMode(0);
    document.getElementById("td").onclick = (e) => cc.setMode(1);
    document.getElementById("kb").onclick = (e) => cc.enableKeyBoard((<HTMLInputElement>e.target).checked);
    document.getElementById("help").onclick = showHelp;
    document.getElementById("closehelp").onclick = showHelp;
}

var showHelp = function () {
    var el = document.getElementById("overlay");
    el.style.visibility = el.style.visibility == "visible" ? "hidden" : "visible";
};
