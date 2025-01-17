uniform float uTime;
uniform vec3 uColor;

varying vec3 vPosition;
varying vec3 vNormal;

void main()
{
    vec3 normal = normalize(vNormal); 
    if(!gl_FrontFacing)
        normal *= - 1.0;

    float stripes = mod((vPosition.y - uTime * 0.25) * 8.0, 2.0); 
    stripes = pow(stripes, 2.0);

    vec3 viewDirection = normalize(vPosition - cameraPosition);
    float fresnel = dot(viewDirection, normal) + 1.0;
    fresnel = pow(fresnel, 2.0);

    float falloff = smoothstep(0.8, 0.0, fresnel);

    float holographic = fresnel * stripes;
    holographic += fresnel * 1.25;
    holographic *= falloff;

    gl_FragColor = vec4(uColor, holographic);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}
