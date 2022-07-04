import * as THREE from 'three'
var camera: THREE.PerspectiveCamera | THREE.Camera,
    geometry,
    material,
    mesh: THREE.Object3D<THREE.Event> | THREE.Mesh<THREE.IcosahedronGeometry, THREE.MeshBasicMaterial>,
    scene: THREE.Object3D<THREE.Event>,
    renderer: THREE.WebGLRenderer
    ;
function setup(container: HTMLElement ){
  //defining objects---------------------------------------------------------
  camera = new THREE.PerspectiveCamera( 70, container.getBoundingClientRect().width /  container.getBoundingClientRect().height, 0.1, 1000 );
  camera.position.z = 5;
  scene = new THREE.Scene();
  geometry = new THREE.BoxGeometry(1,1,1);
  material = new THREE.MeshBasicMaterial({color: 0x00ff00});
  mesh = new THREE.Mesh(geometry, material);
  console.log(mesh)
  //adding object to the scene------------------------------------------------
  scene.add( mesh );

}
function animation( time: number ) {
  mesh.rotation.x = time/2000
  mesh.rotation.y = 0;
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