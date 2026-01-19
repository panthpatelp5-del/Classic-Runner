import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, MeshBuilder } from "@babylonjs/core";
import "@babylonjs/loaders/glTF";

const canvas = document.getElementById("renderCanvas");
const engine = new Engine(canvas, true);

const createScene = () => {
    const scene = new Scene(engine);
    scene.clearColor = new BABYLON.Color4(1,1,1,1);

    const camera = new ArcRotateCamera(
        "camera",
        Math.PI / 2,
        Math.PI / 3,
        6,
        new Vector3(0, 1, 0),
        scene
    );
    camera.attachControl(canvas, true);

    new HemisphericLight("light", new Vector3(0, 1, 0), scene);

    MeshBuilder.CreateGround("ground", { width: 10, height: 10 }, scene);

    return scene;
};

const scene = createScene();

engine.runRenderLoop(() => {
    scene.render();
});

window.addEventListener("resize", () => {
    engine.resize();
});
import { SceneLoader } from "@babylonjs/core";

SceneLoader.Append("./assets/", "character.glb", scene);
