import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
var camera: THREE.PerspectiveCamera | THREE.Camera,
    planGeometry,
    planeMaterial,
    planeMesh: THREE.Object3D<THREE.Event> | THREE.Mesh<THREE.IcosahedronGeometry, THREE.MeshBasicMaterial>,
    scene: THREE.Object3D<THREE.Event>,
    renderer: THREE.WebGLRenderer,
    controls: OrbitControls
    ;

// gui.add(world.plane,'width',1,500)
function setup(container: HTMLElement ){
  //defining objects---------------------------------------------------------
  camera = new THREE.PerspectiveCamera( 70, container.getBoundingClientRect().width /  container.getBoundingClientRect().height, 0.1, 1000 );
  camera.position.z = 5;
  scene = new THREE.Scene();
  planGeometry = new THREE.PlaneGeometry(5,5,10,10);
   
  planeMaterial = new THREE.MeshPhongMaterial({color: 0xff0000,side:THREE.DoubleSide,
     //@ts-ignore
  flatShading:THREE.FlatShading,
  });
  planeMesh = new THREE.Mesh(planGeometry, planeMaterial);
  //lights------------------------
  const light = new THREE.DirectionalLight(0xffffff,1)
  light.position.set(0,0,1);
  const backLight = new THREE.DirectionalLight(0xffffff,1)
  backLight.position.set(0,0,-1);

  //@ts-ignore
  const arr:Number[] = planeMesh.geometry.attributes.position.array;
  console.log(arr)
  for(let i=0;i<arr.length;i+=3){
    const x = arr[i];
    const y = arr[i+1];
    const z = arr[i+2];
    //@ts-ignore
    arr[i+2] =z + Math.random();
  }

   controls = new  OrbitControls( camera, renderer.domElement );

  //adding object to the scene------------------------------------------------
  scene.add( planeMesh ,light,backLight);

}
function animation( time: number ) {
  // planeMesh.rotation.x = time/2000
  // planeMesh.rotation.y = 0;
  renderer.render( scene, camera );
  controls.update();
}
export function bootstrapThree(containerId:string){
const container = document.getElementById(containerId)
if(!container){
  alert('container is null')
  return;
}

//@ts-ignore
container.style.backgroundColor = '#000000'

if(!renderer){
  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setSize( container.getBoundingClientRect().width, container.getBoundingClientRect().height );
  renderer.setAnimationLoop( animation );
  container?.appendChild( renderer.domElement );
  setup(container);
}





//

}