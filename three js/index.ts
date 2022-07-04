import * as THREE from 'three'
import { Raycaster } from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
var camera: THREE.PerspectiveCamera | THREE.Camera,
    planGeometry,
    planeMaterial,
    planeMesh: THREE.Object3D<THREE.Event> | THREE.Mesh<THREE.IcosahedronGeometry, THREE.MeshBasicMaterial>,
    scene: THREE.Object3D<THREE.Event>,
    renderer: THREE.WebGLRenderer,
    controls: OrbitControls,
    raycaster:Raycaster,
    mouse:{x:number,y:number} = {
      x:0,
      y:0
    }
    ;

// gui.add(world.plane,'width',1,500)
function setup(container: HTMLElement ){
  //defining objects---------------------------------------------------------
  camera = new THREE.PerspectiveCamera( 70, container.getBoundingClientRect().width /  container.getBoundingClientRect().height, 0.1, 1000 );
  camera.position.z = 5;
  scene = new THREE.Scene();
  planGeometry = new THREE.PlaneGeometry(5,5,10,10);
   
  planeMaterial = new THREE.MeshPhongMaterial({
    // color: 0xff0000,
    side:THREE.DoubleSide,
     //@ts-ignore
  flatShading:THREE.FlatShading,
  vertexColors:true
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
   //@ts-ignore
  const count:number = planeMesh.geometry.attributes.position.count;
  const colors = [];
  for(let i = 0;i<count;i++){
    colors.push(1,0,0)
  }
     //@ts-ignore
  planeMesh.geometry.setAttribute("color",
    new THREE.Float32BufferAttribute(colors,3),
    
  )



   controls = new  OrbitControls( camera, renderer.domElement );
   raycaster = new Raycaster();

  //adding object to the scene------------------------------------------------
  scene.add( planeMesh ,light,backLight);

}
function animation( time: number ) {
  // planeMesh.rotation.x = time/2000
  // planeMesh.rotation.y = 0;
  raycaster.setFromCamera(mouse,camera)
  const intersects = raycaster.intersectObject(planeMesh)
  //returns an array of intersections (the ray can intersect with many parts of the the same object )
  //each object on the array have some informations about the intersection distance , object touched by the ray ,...
  if(intersects.length > 0){
    //@ts-ignore
    const {color} = intersects[0].object.geometry.attributes;
    color.setX(intersects[0].face?.a,0)
    color.setX(intersects[0].face?.b,0)
    color.setX(intersects[0].face?.c,0)
  
   
    //@ts-ignore
    color.needsUpdate = true
    //@ts-ignore
  
  }
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
container.addEventListener('mousemove',e=>{
  const {x,y,width,height} = container.getBoundingClientRect();
  const normalized_x = 2*((e.clientX - container.getBoundingClientRect().x)/width)-1;
  const normalized_y = -2*((e.clientY - container.getBoundingClientRect().y)/height) +1;
  mouse = {
    x:normalized_x,
    y:normalized_y
  }

})
}