uniform float uActive;
uniform float uProgress;

varying vec3 vPosition;
varying vec3 vNormal;

float random2D(vec2 value)
{
    return fract(sin(dot(value.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    float glitchStrength;
    
    if(uActive == 1.0){
        glitchStrength = sin(uProgress - modelPosition.y);
        glitchStrength = smoothstep(0.1, 1.0, glitchStrength);
        glitchStrength *= 1.8;

        modelPosition.x += (random2D(modelPosition.xz) - 0.5) * glitchStrength;
        modelPosition.z += (random2D(modelPosition.zx) - 0.5) * glitchStrength;
    }

    gl_Position = projectionMatrix * viewMatrix * modelPosition;

    vec4 modelNormal = modelMatrix * vec4(normal, 0.0);

    vPosition = modelPosition.xyz;
    vNormal = modelNormal.xyz;
}
