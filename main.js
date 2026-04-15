import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// 1. Sahne, Kamera ve Renderer Kurulumu
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5; 

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#canvas3d'),
    alpha: true, 
    antialias: true 
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio); // Görüntü kalitesini artırır

// 2. Işıklandırma
const ambientLight = new THREE.AmbientLight(0xffffff, 1); 
scene.add(ambientLight);

const topLight = new THREE.DirectionalLight(0xffffff, 2); 
topLight.position.set(5, 5, 5);
scene.add(topLight);

// 3. Model Yükleme
const loader = new GLTFLoader(); // Doğru tanımlama budur
let fan; 

loader.load('pervane.glb', function(gltf) {
    fan = gltf.scene;
    
    // Modelin başlangıç ayarları
    fan.rotation.y = 0;
    fan.scale.set(3, 3,3); // Gerekirse buradan boyutu ayarla
    
    scene.add(fan);
    console.log("Pervane yüklendi!");
    
    // Model yüklendiğinde GSAP animasyonunu buraya bağlayacağız
    initScrollAnimation(); 
}, undefined, function(error) {
    console.error("Yükleme hatası:", error);
});

// 4. Animasyon Fonksiyonu (Bir sonraki adımda içini dolduracağız)
function initScrollAnimation() {
    console.log("Animasyon sistemi hazır.");
}

// 5. Sürekli Çizim Döngüsü
function animate() {
    requestAnimationFrame(animate);
    
    // Model henüz yüklenmediyse hata vermemesi için kontrol
    if (fan) {
        // İstersen burada çok hafif bir boşta dönme verebilirsin
        // fan.rotation.y += 0.01; 
    }
    
    renderer.render(scene, camera);
}
animate();

// Pencere boyutu değiştiğinde görüntüyü düzelt
window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}