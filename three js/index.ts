import * as THREE from 'three'
var camera: THREE.PerspectiveCamera | THREE.Camera,
    geometry,
    material,
    mesh: THREE.Object3D<THREE.Event> | THREE.Mesh<THREE.IcosahedronGeometry, THREE.MeshBasicMaterial>,
    scene: THREE.Object3D<THREE.Event>,
    renderer: THREE.WebGLRenderer
    ;
function setup(){
  //defining objects---------------------------------------------------------
  camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
  camera.position.z = 1001;
  scene = new THREE.Scene();
  geometry = new THREE.IcosahedronGeometry(200, 1);
  material = new THREE.MeshBasicMaterial({ color: 0xfffff, wireframe:
 true, wireframeLinewidth: 2 });
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
setup();
renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animation );
const container = document.getElementById(containerId)
//@ts-ignore
container.style.backgroundColor = '#000000'
container?.appendChild( renderer.domElement );


//

}