import * as THREE from 'three';
import './style.css'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';



//Scene
const scene = new THREE.Scene();

//Create a backdrop
const bgTexture = new THREE.TextureLoader().load('src/texture.JPG');
// const bgGeom = new THREE.PlaneGeometry(window.innerWidth,30);
const bgMaterial = new THREE.MeshBasicMaterial({map: bgTexture});
// const bgMesh = new THREE.Mesh(bgGeom, bgMaterial);
// bgMesh.position.set(0,0, 0);
// scene.add(bgMesh);


//second way 

// var loader = new THREE.TextureLoader();

// // Load an image file into a custom material
// var bgMaterial = new THREE.MeshLambertMaterial({
//   map: loader.load('https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=800')
// });

// // create a plane geometry for the image with a width of 10
// // and a height that preserves the image's aspect ratio
// var geometry = new THREE.PlaneGeometry(10, 10*.75);

// // combine our image geometry and material into a mesh
// var bgMesh = new THREE.Mesh(geometry, bgMaterial);

// // set the position of the image mesh in the x,y,z dimensions
// bgMesh.position.set(0,0,0)

// // add the image to the scene
// scene.add(bgMesh);








//create a toruknot
const geom = new THREE.TorusKnotGeometry(2,1,100,16,2,2);
const material = new THREE.MeshPhysicalMaterial();
material.color = new THREE.Color(1,1,1);
material.transmission = 1.0;
material.roughness = 0.0;
material.metalness = 0.0;
material.thickness = 0.8;
material.ior = 1.7;
material.specularIntensity = 1.0;
material.clearcoat = 1.0;

const mesh = new THREE.Mesh(geom, material);
// scene.add(mesh);

mesh.position.set(-15,4,4)

//create a small sphere
const spsGeom = new THREE.SphereGeometry(4,64,64);
const smallSphere = new THREE.Mesh(spsGeom,material);
// scene.add(smallSphere);


//Create a sphere
const spGeom = new THREE.SphereGeometry(30,64,64);
const spMaterial = new THREE.MeshBasicMaterial()
const sphere = new THREE.Mesh(spGeom, bgMaterial)
scene.add(sphere);
sphere.material.side = THREE.DoubleSide;
// sphere.position.set(3,3,3);

//blender import
const loader = new GLTFLoader();
var blender;

// loader.load( 'jelly.glb', function ( gltf ) {
//   blender = gltf.scene;
// 	scene.add( blender );
//   blender.children[0].material = material;
//   blender.children[0].position.x = 7
// } );


let axis = new THREE.AxesHelper(10)
scene.add(axis)

loader.load( 'altar0__1.glb', function ( gltf ) 
{
  blender = gltf.scene;

  
  
  
  
	scene.add( blender );
  blender.children[0].material = material;
  blender.children[0].position.x = 0
  // blender.children[0].material = new THREE.MeshBasicMaterial({ color: 'red'})

  // blender.position.x = 2
  // blender.position.y = 2

  // console.log(blender


} );








//sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

//light
const light = new THREE.PointLight(0xffffff,1,100);
light.position.set(0,0,10);
scene.add(light);

const lightD = new THREE.DirectionalLight(0xfff0dd, 1);
// lightD.position.set(0, 5, 10);
scene.add(lightD);



//camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 1000);
camera.position.z =30;
scene.add(camera);

//Renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({ canvas});
renderer.setSize(sizes.width, sizes.height);
// renderer.setClearColor(new THREE.Color(0x287f5))

renderer.render(scene, camera);

//animation way one 
// function animate() {
//   requestAnimationFrame( animate );
//     renderer.render( scene, camera );
//   }
//   animate();

//Controls
const controls = new OrbitControls(camera,canvas)

  //resize
  window.addEventListener('resize', ()=> {
    //update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    //update camera
    camera.updateProjectionMatrix()
    camera.aspect = sizes.width/sizes.height
    renderer.setSize(sizes.width,sizes.height)
  })

  const loop = () => {

    if(blender)blender.rotation.y += 0.01
    sphere.rotation.x += 0.0005
    sphere.rotation.y += 0.0005
    sphere.rotation.z += 0.0005
    
    mesh.rotation.x += 0.01
    mesh.rotation.y += 0.01
    mesh.rotation.z += 0.01
    renderer.render(scene,camera)
    window.requestAnimationFrame(loop)
  }
  loop()