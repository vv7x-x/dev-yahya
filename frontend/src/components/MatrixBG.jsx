import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export default function MatrixBG() {
  const mountRef = useRef();

  useEffect(() => {
    let renderer, scene, camera, animationId;
    let width = window.innerWidth;
    let height = window.innerHeight;
    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;
    // Matrix code effect (particles)
    const chars = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズヅブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const particles = [];
    const geometry = new THREE.BufferGeometry();
    const positions = [];
    for (let i = 0; i < 800; i++) {
      positions.push((Math.random() - 0.5) * 20);
      positions.push((Math.random() - 0.5) * 20);
      positions.push((Math.random() - 0.5) * 20);
      particles.push(chars[Math.floor(Math.random() * chars.length)]);
    }
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({ color: '#39ff14', size: 0.25, transparent: true, opacity: 0.8 });
    const points = new THREE.Points(geometry, material);
    scene.add(points);
    // Animation
    function animate() {
      points.rotation.y += 0.001;
      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    }
    animate();
    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      renderer.dispose();
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);
  return <div ref={mountRef} className="absolute inset-0 z-0" />;
}
