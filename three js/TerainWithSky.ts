import * as THREE from 'three'
import { Camera } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
export class TerainWithSky{
    private static _threejs: THREE.WebGLRenderer | undefined;
    private _scene: any;
    private _container: HTMLElement | undefined;
    private _camera: THREE.PerspectiveCamera | undefined ;
    private _controls: OrbitControls | undefined;
    constructor(container:HTMLElement){
        if(TerainWithSky._threejs){
            console.warn("an instance of the rendrer already exist")
            return;
        }
        this._container = container;
        this._initialize()
    }
    _initialize(){
        if(!this._container) return;
        const {width,height} = this._container.getBoundingClientRect();
        TerainWithSky._threejs = new THREE.WebGLRenderer({
            antialias: true,
          });
        TerainWithSky._threejs.shadowMap.type = THREE.PCFSoftShadowMap;
        TerainWithSky._threejs.setPixelRatio(window.devicePixelRatio);
        TerainWithSky._threejs.setSize(width, height);
        

        window.addEventListener('resize', () => {
            this._OnWindowResize();
          }, false);

        const fov = 60;
        const aspect = width / height;
        const near = 1.0;
        const far = 1000.0;
        this._camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        this._camera.position.set(0, 400, 700);
        this._camera.rotation.x =  -45 * Math.PI / 180;

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

        const plane = new THREE.Mesh(
                      new THREE.PlaneGeometry(2000, 2000, 20, 20),
                      new THREE.MeshStandardMaterial({
                              color:  0x9db3b5,
                         })
                );
        plane.castShadow = false;
        plane.receiveShadow = true;
        plane.rotation.x = -Math.PI / 2;
        this._scene.add(plane);
        const building_geo =  new THREE.BoxGeometry(1, 1, 1).applyMatrix4(new THREE.Matrix4().makeTranslation(0,0.5,0));
        const building_mat =   new THREE.MeshStandardMaterial({
            color: 0xFFFFFF,
        })
       

        
        for(let i = 0;i<100;i++){
            const building = new THREE.Mesh(building_geo,building_mat);
            building.castShadow = true;
            building.receiveShadow = true;

            building.position.setX(Math.floor(Math.random()*800-400));
            building.position.setZ(Math.floor(Math.random()*800-400));
            building.scale.x = Math.random() * 50 + 10; // [10,60]
            building.scale.z = building.scale.x; // [10,60]
            building.scale.y =  Math.random() * building.scale.x * 8 + 8;
            this._scene.add(building);

        }
     


        

       
      this._controls = new OrbitControls(this._camera,TerainWithSky._threejs.domElement)
      this._controls.update()
      
       TerainWithSky._threejs.setAnimationLoop(this._animation.bind(this))
       console.log('1')
      this._container.appendChild(TerainWithSky._threejs.domElement)
    }
    private _animation(){
         if(!this._controls) return
         TerainWithSky._threejs?.render(this._scene,this._camera as Camera)
         this._controls.update()
    }
    private _OnWindowResize() {
        if(!this._camera || !TerainWithSky._threejs || !this._container) return;
       const {height,width} = this._container.getBoundingClientRect();
       this._camera.aspect = width / height;
       this._camera.updateProjectionMatrix();
       TerainWithSky._threejs.setSize(width, height);
    }
}