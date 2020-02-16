import React, { useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import * as THREE from 'three';

let { innerWidth: width, innerHeight: height } = window;
let mouseX = 0;
let mouseY = 0;
let animation = null;
let renderer = null;
let scene = null;
let camera = null;
let clouds = null;
let earth = null;

const Scene = () => {
  const container = useRef(null);

  const render3d = () => {
    clouds.rotation.y -= 0.001;
    earth.rotation.y += 0.001;
    camera.position.x += (mouseX - camera.position.x) * 0.05;
    camera.position.y += (-mouseY - camera.position.y) * 0.05;
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
  };

  const animate = useCallback(() => {
    animation = requestAnimationFrame(animate);
    render3d();
  }, []);

  const handleResize = () => {
    width = window.innerWidth;
    height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  };

  const handleMouseMove = e => {
    mouseX = e.clientX - width / 2;
    mouseY = e.clientY - height / 2;
  };

  useEffect(() => {
    renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(width, height);

    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.0007);

    const ratio = width / height;
    camera = new THREE.PerspectiveCamera(75, ratio, 1, 10000);
    camera.position.z = 1000;
    scene.add(camera);

    const starsGeometry = new THREE.Geometry();
    for (let i = 0; i < 7000; i++) {
      const star = new THREE.Vector3();
      star.x = THREE.Math.randFloatSpread(2000);
      star.y = THREE.Math.randFloatSpread(2000);
      star.z = THREE.Math.randFloatSpread(2000);
      starsGeometry.vertices.push(star);
    }
    const starsMaterial = new THREE.PointsMaterial({ color: 0x888888 });
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    const textureLoader = new THREE.TextureLoader();

    const cloudTexture = textureLoader.load('/assets/img/earth-clouds.png');
    const cloudGeometry = new THREE.SphereGeometry(500, 30, 15);
    const cloudMaterial = new THREE.MeshBasicMaterial({
      map: cloudTexture,
      transparent: true,
    });
    clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
    scene.add(clouds);

    const sphereTexture = textureLoader.load('/assets/img/earth.jpg');
    const sphereGeometry = new THREE.SphereGeometry(490, 30, 15);
    const sphereMaterial = new THREE.MeshBasicMaterial({
      map: sphereTexture,
    });
    earth = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(earth);

    container.current.appendChild(renderer.domElement);

    animate();

    return () => {
      if (animation) cancelAnimationFrame(animation);
    };
  }, [animate]);

  useEffect(() => {
    const currentContianer = container.current;
    currentContianer.addEventListener('mousemove', handleMouseMove);

    return () => {
      currentContianer.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <Container ref={container} />;
};

const Container = styled.div`
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
`;

export default Scene;
