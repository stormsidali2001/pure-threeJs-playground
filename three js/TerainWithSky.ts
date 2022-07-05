import * as THREE from 'three'

export class TerainWithSky{
    private _threejs: THREE.WebGLRenderer | undefined;
    private _scene: any;
    private _container: HTMLElement | undefined;
    private _camera: THREE.PerspectiveCamera | undefined;
    constructor(container:HTMLElement){
        this._initialize(container)
    }
    _initialize(container:HTMLElement){
        this._container = container;
        const {width,height} = container.getBoundingClientRect();
        this._threejs = new THREE.WebGLRenderer({
            antialias: true,
          });
        this._threejs.shadowMap.type = THREE.PCFSoftShadowMap;
        this._threejs.setPixelRatio(window.devicePixelRatio);
        this._threejs.setSize(width, height);
        container.appendChild(this._threejs.domElement)

        window.addEventListener('resize', () => {
            this._OnWindowResize();
          }, false);

        const fov = 60;
        const aspect = 1920 / 1080;
        const near = 1.0;
        const far = 1000.0;
        this._camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        this._camera.position.set(75, 20, 0);

        this._scene = new THREE.Scene();

        
        let light:THREE.DirectionalLight | THREE.AmbientLight = new THREE.DirectionalLight(0xFFFFFF, 1.0);
        light.position.set(20, 100, 10);
        light.target.position.set(0, 0, 0);
        light.castShadow = true;
        light.shadow.bias = -0.001;
        light.shadow.mapSize.width = 2048;
        light.shadow.mapSize.height = 2048;
        light.shadow.camera.near = 0.1;
        light.shadow.camera.far = 500.0;
        light.shadow.camera.near = 0.5;
        light.shadow.camera.far = 500.0;
        light.shadow.camera.left = 100;
        light.shadow.camera.right = -100;
        light.shadow.camera.top = 100;
        light.shadow.camera.bottom = -100;
        this._scene.add(light);

        light = new THREE.AmbientLight(0x101010);
        this._scene.add(light);

    }
    private _OnWindowResize() {
        if(!this._camera || !this._threejs) return;
       this._camera.aspect = window.innerWidth / window.innerHeight;
       this._camera.updateProjectionMatrix();
       this._threejs.setSize(window.innerWidth, window.innerHeight);
    }
}