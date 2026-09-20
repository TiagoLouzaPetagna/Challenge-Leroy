import * as THREE from 'three';

// Only registered phosphor meshes emit bloom; other geometry still occludes them.
export function createLedBloom(renderer, scene, camera) {
  const target = () => new THREE.WebGLRenderTarget(1, 1, {type: THREE.HalfFloatType});
  const base = target(), mask = target(), horizontal = target(), halo = target();
  const black = new THREE.MeshBasicMaterial({color: 0x000000});
  const emitters = new WeakMap(), saved = new Map();
  const quadScene = new THREE.Scene(), quadCamera = new THREE.Camera();
  const vertexShader = 'varying vec2 vUv; void main(){vUv=uv;gl_Position=vec4(position.xy,0.0,1.0);}';
  const blur = new THREE.ShaderMaterial({
    depthTest:false, depthWrite:false, toneMapped:false,
    uniforms:{source:{value:null}, stepUv:{value:new THREE.Vector2()}}, vertexShader,
    fragmentShader:`uniform sampler2D source; uniform vec2 stepUv; varying vec2 vUv;
      void main(){
        vec3 c=texture2D(source,vUv).rgb*.227027;
        c+=(texture2D(source,vUv+stepUv*1.384615).rgb+texture2D(source,vUv-stepUv*1.384615).rgb)*.316216;
        c+=(texture2D(source,vUv+stepUv*3.230769).rgb+texture2D(source,vUv-stepUv*3.230769).rgb)*.070270;
        gl_FragColor=vec4(c,1.0);
      }`
  });
  const combine = new THREE.ShaderMaterial({
    depthTest:false, depthWrite:false,
    uniforms:{base:{value:base.texture},halo:{value:halo.texture}}, vertexShader,
    fragmentShader:`uniform sampler2D base; uniform sampler2D halo; varying vec2 vUv;
      void main(){
        gl_FragColor=vec4(texture2D(base,vUv).rgb+texture2D(halo,vUv).rgb*.38,1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`
  });
  const quad = new THREE.Mesh(new THREE.PlaneGeometry(2,2), combine);
  quadScene.add(quad);
  let width=1,height=1;
  return {
    register(mesh) {
      const m=mesh.material;
      if(!m.emissive || m.emissive.getHex()===0)return;
      emitters.set(mesh,new THREE.MeshBasicMaterial({
        color:m.emissive.clone().multiplyScalar(m.emissiveIntensity),side:m.side
      }));
    },
    resize(w,h) {
      base.setSize(Math.max(1,Math.round(w*renderer.getPixelRatio())),Math.max(1,Math.round(h*renderer.getPixelRatio())));
      width=Math.max(1,Math.round(w/2));height=Math.max(1,Math.round(h/2));
      for(const t of [mask,horizontal,halo])t.setSize(width,height);
    },
    render() {
      const background=scene.background, shadows=renderer.shadowMap.enabled;
      renderer.setRenderTarget(base);renderer.render(scene,camera);
      scene.background=new THREE.Color(0);renderer.shadowMap.enabled=false;
      scene.traverse(o=>{if(o.isMesh){saved.set(o,o.material);o.material=emitters.get(o)||black;}});
      try{renderer.setRenderTarget(mask);renderer.render(scene,camera);}
      finally{for(const [o,m] of saved)o.material=m;saved.clear();scene.background=background;renderer.shadowMap.enabled=shadows;}
      quad.material=blur;blur.uniforms.source.value=mask.texture;
      blur.uniforms.stepUv.value.set(1.8/width,0);
      renderer.setRenderTarget(horizontal);renderer.render(quadScene,quadCamera);
      blur.uniforms.source.value=horizontal.texture;blur.uniforms.stepUv.value.set(0,1.8/height);
      renderer.setRenderTarget(halo);renderer.render(quadScene,quadCamera);
      quad.material=combine;renderer.setRenderTarget(null);renderer.render(quadScene,quadCamera);
    }
  };
}

