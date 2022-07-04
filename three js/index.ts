import * as THREE from 'three'
var camera: THREE.PerspectiveCamera | THREE.Camera,
    planGeometry,
    planeMaterial,
    planeMesh: THREE.Object3D<THREE.Event> | THREE.Mesh<THREE.IcosahedronGeometry, THREE.MeshBasicMaterial>,
    scene: THREE.Object3D<THREE.Event>,
    renderer: THREE.WebGLRenderer
    ;
function setup(container: HTMLElement ){
  //defining objects---------------------------------------------------------
  camera = new THREE.PerspectiveCamera( 70, container.getBoundingClientRect().width /  container.getBoundingClientRect().height, 0.1, 1000 );
  camera.position.z = 5;
  scene = new THREE.Scene();
  planGeometry = new THREE.PlaneGeometry(5,5,10,10);
  planeMaterial = new THREE.MeshBasicMaterial({color: 0xff0000,side:THREE.DoubleSide});
  planeMesh = new THREE.Mesh(planGeometry, planeMaterial);
  console.log(planeMesh)
  //adding object to the scene------------------------------------------------
  scene.add( planeMesh );

}
function animation( time: number ) {
  planeMesh.rotation.x = time/2000
  planeMesh.rotation.y = 0;
  renderer.render( scene, camera );
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