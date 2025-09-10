'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useRouter } from 'next/navigation';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Calendar } from 'lucide-react';

gsap.registerPlugin(SplitText, ScrollTrigger, useGSAP);

// ===================== SHADER =====================
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  #ifdef GL_ES
    precision lowp float;
  #endif
  uniform float iTime;
  uniform vec2 iResolution;
  varying vec2 vUv;
  
  vec4 buf[8];
  
  vec4 sigmoid(vec4 x) { return 1. / (1. + exp(-x)); }
  
  vec4 cppn_fn(vec2 coordinate, float in0, float in1, float in2) {
    // layer 1 *********************************************************************
    buf[6] = vec4(coordinate.x, coordinate.y, 0.3948333106474662 + in0, 0.36 + in1);
    buf[7] = vec4(0.14 + in2, sqrt(coordinate.x * coordinate.x + coordinate.y * coordinate.y), 0., 0.);

    // layer 2 ********************************************************************
    buf[0] = mat4(vec4(6.5404263, -3.6126034, 0.7590882, -1.13613), vec4(2.4582713, 3.1660357, 1.2219609, 0.06276096), vec4(-5.478085, -6.159632, 1.8701609, -4.7742867), vec4(6.039214, -5.542865, -0.90925294, 3.251348))
    * buf[6]
    + mat4(vec4(0.8473259, -5.722911, 3.975766, 1.6522468), vec4(-0.24321538, 0.5839259, -1.7661959, -5.350116), vec4(0.0, 0.0, 0.0, 0.0), vec4(0.0, 0.0, 0.0, 0.0))
    * buf[7]
    + vec4(0.21808943, 1.1243913, -1.7969975, 5.0294676);
    
    buf[1] = mat4(vec4(-3.3522482, -6.0612736, 0.55641043, -4.4719114), vec4(0.8631464, 1.7432913, 5.643898, 1.6106541), vec4(2.4941394, -3.5012043, 1.7184316, 6.357333), vec4(3.310376, 8.209261, 1.1355612, -1.165539))
    * buf[6]
    + mat4(vec4(5.24046, -13.034365, 0.009859298, 15.870829), vec4(2.987511, 3.129433, -0.89023495, -1.6822904), vec4(0.0, 0.0, 0.0, 0.0), vec4(0.0, 0.0, 0.0, 0.0))
    * buf[7]
    + vec4(-5.9457836, -6.573602, -0.8812491, 1.5436668);

    buf[0] = sigmoid(buf[0]);
    buf[1] = sigmoid(buf[1]);

    // layer 3 ********************************************************************
    buf[2] = mat4(vec4(-15.219568, 8.095543, -2.429353, -1.9381982), vec4(-5.951362, 4.3115187, 2.6393783, 1.274315), vec4(-7.3145227, 6.7297835, 5.2473326, 5.9411426), vec4(5.0796127, 8.979051, -1.7278991, -1.158976))
    * buf[6]
    + mat4(vec4(-11.967154, -11.608155, 6.1486754, 11.237008), vec4(2.124141, -6.263192, -1.7050359, -0.7021966), vec4(0.0, 0.0, 0.0, 0.0), vec4(0.0, 0.0, 0.0, 0.0))
    * buf[7]
    + vec4(-4.17164, -3.2281182, -4.576417, -3.6401186);
    
    buf[3] = mat4(vec4(3.1832156, -13.738922, 1.879223, 3.233465), vec4(0.64300746, 12.768129, 1.9141049, 0.50990224), vec4(-0.049295485, 4.4807224, 1.4733979, 1.801449), vec4(5.0039253, 13.000481, 3.3991797, -4.5561905))
    * buf[6]
    + mat4(vec4(-0.1285731, 7.720628, -3.1425676, 4.742367), vec4(0.6393625, 3.714393, -0.8108378, -0.39174938), vec4(0.0, 0.0, 0.0, 0.0), vec4(0.0, 0.0, 0.0, 0.0))
    * buf[7]
    + vec4(-1.1811101, -21.621881, 0.7851888, 1.2329718);
    
    buf[2] = sigmoid(buf[2]);
    buf[3] = sigmoid(buf[3]);

    // layer 5 & 6 ****************************************************************
    buf[4] = mat4(vec4(5.214916, -7.183024, 2.7228765, 2.6592617), vec4(-5.601878, -25.3591, 4.067988, 0.4602802), vec4(-10.57759, 24.286327, 21.102104, 37.546658), vec4(4.3024497, -1.9625226, 2.3458803, -1.372816))
    * buf[0]
    + mat4(vec4(-17.6526, -10.507558, 2.2587414, 12.462782), vec4(6.265566, -502.75443, -12.642513, 0.9112289), vec4(-10.983244, 20.741234, -9.701768, -0.7635988), vec4(5.383626, 1.4819539, -4.1911616, -4.8444734))
    * buf[1]
    + mat4(vec4(12.785233, -16.345072, -0.39901125, 1.7955981), vec4(-30.48365, -1.8345358, 1.4542528, -1.1118771), vec4(19.872723, -7.337935, -42.941723, -98.52709), vec4(8.337645, -2.7312303, -2.2927687, -36.142323))
    * buf[2]
    + mat4(vec4(-16.298317, 3.5471997, -0.44300047, -9.444417), vec4(57.5077, -35.609753, 16.163465, -4.1534753), vec4(-0.07470326, -3.8656476, -7.0901804, 3.1523974), vec4(-12.559385, -7.077619, 1.490437, -0.8211543))
    * buf[3]
    + vec4(-7.67914, 15.927437, 1.3207729, -1.6686112);
    
    buf[5] = mat4(vec4(-1.4109162, -0.372762, -3.770383, -21.367174), vec4(-6.2103205, -9.35908, 0.92529047, 8.82561), vec4(11.460242, -22.348068, 13.625772, -18.693201), vec4(-0.3429052, -3.9905605, -2.4626114, -0.45033523))
    * buf[0]
    + mat4(vec4(7.3481627, -4.3661838, -6.3037653, -3.868115), vec4(1.5462853, 6.5488915, 1.9701879, -0.58291394), vec4(6.5858274, -2.2180402, 3.7127688, -1.3730392), vec4(-5.7973905, 10.134961, -2.3395722, -5.965605))
    * buf[1]
    + mat4(vec4(-2.5132585, -6.6685553, -1.4029363, -0.16285264), vec4(-0.37908727, 0.53738135, 4.389061, -1.3024765), vec4(-0.70647055, 2.0111287, -5.1659346, -3.728635), vec4(-13.562562, 10.487719, -0.9173751, -2.6487076))
    * buf[2]
    + mat4(vec4(-8.645013, 6.5546675, -6.3944063, -5.5933375), vec4(-0.57783127, -1.077275, 36.91025, 5.736769), vec4(14.283112, 3.7146652, 7.1452246, -4.5958776), vec4(2.7192075, 3.6021907, -4.366337, -2.3653464))
    * buf[3]
    + vec4(-5.9000807, -4.329569, 1.2427121, 8.59503);

    buf[4] = sigmoid(buf[4]);
    buf[5] = sigmoid(buf[5]);

    // layer 7 & 8 ****************************************************************
    buf[6] = mat4(vec4(-1.61102, 0.7970257, 1.4675229, 0.20917463), vec4(-28.793737, -7.1390953, 1.5025433, 4.656581), vec4(-10.94861, 39.66238, 0.74318546, -10.095605), vec4(-0.7229728, -1.5483948, 0.7301322, 2.1687684))
    * buf[0]
    + mat4(vec4(3.2547753, 21.489103, -1.0194173, -3.3100595), vec4(-3.7316632, -3.3792162, -7.223193, -0.23685838), vec4(13.1804495, 0.7916005, 5.338587, 5.687114), vec4(-4.167605, -17.798311, -6.815736, -1.6451967))
    * buf[1]
    + mat4(vec4(0.604885, -7.800309, -7.213122, -2.741014), vec4(-3.522382, -0.12359311, -0.5258442, 0.43852118), vec4(9.6752825, -22.853785, 2.062431, 0.099892326), vec4(-4.3196306, -17.730087, 2.5184598, 5.30267))
    * buf[2]
    + mat4(vec4(-6.545563, -15.790176, -6.0438633, -5.415399), vec4(-43.591583, 28.551912, -16.00161, 18.84728), vec4(4.212382, 8.394307, 3.0958717, 8.657522), vec4(-5.0237565, -4.450633, -4.4768, -5.5010443))
    * buf[3]
    + mat4(vec4(1.6985557, -67.05806, 6.897715, 1.9004834), vec4(1.8680354, 2.3915145, 2.5231109, 4.081538), vec4(11.158006, 1.7294737, 2.0738268, 7.386411), vec4(-4.256034, -306.24686, 8.258898, -17.132736))
    * buf[4]
    + mat4(vec4(1.6889864, -4.5852966, 3.8534803, -6.3482175), vec4(1.3543309, -1.2640043, 9.932754, 2.9079645), vec4(-5.2770967, 0.07150358, -0.13962056, 3.3269649), vec4(28.34703, -4.918278, 6.1044083, 4.085355))
    * buf[5]
    + vec4(6.6818056, 12.522166, -3.7075126, -4.104386);
    
    buf[7] = mat4(vec4(-8.265602, -4.7027016, 5.098234, 0.7509808), vec4(8.6507845, -17.15949, 16.51939, -8.884479), vec4(-4.036479, -2.3946867, -2.6055532, -1.9866527), vec4(-2.2167742, -1.8135649, -5.9759874, 4.8846445))
    * buf[0]
    + mat4(vec4(6.7790847, 3.5076547, -2.8191125, -2.7028968), vec4(-5.743024, -0.27844876, 1.4958696, -5.0517144), vec4(13.122226, 15.735168, -2.9397483, -4.101023), vec4(-14.375265, -5.030483, -6.2599335, 2.9848232))
    * buf[1]
    + mat4(vec4(4.0950394, -0.94011575, -5.674733, 4.755022), vec4(4.3809423, 4.8310084, 1.7425908, -3.437416), vec4(2.117492, 0.16342592, -104.56341, 16.949184), vec4(-5.22543, -2.994248, 3.8350096, -1.9364246))
    * buf[2]
    + mat4(vec4(-5.900337, 1.7946124, -13.604192, -3.8060522), vec4(6.6583457, 31.911177, 25.164474, 91.81147), vec4(11.840538, 4.1503043, -0.7314397, 6.768467), vec4(-6.3967767, 4.034772, 6.1714606, -0.32874924))
    * buf[3]
    + mat4(vec4(3.4992442, -196.91893, -8.923708, 2.8142626), vec4(3.4806502, -3.1846354, 5.1725626, 5.1804223), vec4(-2.4009497, 15.585794, 1.2863957, 2.0252278), vec4(-71.25271, -62.441242, -8.138444, 0.50670296))
    * buf[4]
    + mat4(vec4(-12.291733, -11.176166, -7.3474145, 4.390294), vec4(10.805477, 5.6337385, -0.9385842, -4.7348723), vec4(-12.869276, -7.039391, 5.3029537, 7.5436664), vec4(1.4593618, 8.91898, 3.5101583, 5.840625))
    * buf[5]
    + vec4(2.2415268, -6.705987, -0.98861027, -2.117676);

    buf[6] = sigmoid(buf[6]);
    buf[7] = sigmoid(buf[7]);

    // layer 9 ********************************************************************
    buf[0] = mat4(vec4(-3.8754263, 11.226847, -2.7636797, -5.3547373), vec4(-5.341476, 5.8982706, -18.632685, 1.0655043), vec4(2.9695559, -3.9302597, -6.7859373, -2.7779202), vec4(-1.1906605, 11.041275, -9.2978115, -5.1058826))
    * buf[0]
    + mat4(vec4(4.9951377, -15.652348, -19.850525, -13.524628), vec4(5.8159423, -12.584785, -8.433746, -13.6675625), vec4(-8.063725, 10.838669, -4.8638573, 1.5297084), vec4(-5.7717137, 6.5669184, 14.033997, 7.8652616))
    * buf[1]
    + mat4(vec4(-5.4628067, -6.1993456, 7.8536816, 3.7830296), vec4(-5.3854857, 3.8424425, 10.654037, 9.829607), vec4(-7.2568054, -10.854516, -5.7434382, -0.4633987), vec4(-4.8169155, -8.779686, 3.4085898, -0.6015239))
    * buf[2]
    + mat4(vec4(-19.072758, -20.4086, -0.029654831, -6.3063607), vec4(-0.86103654, -8.433901, 8.628815, 5.7616606), vec4(-8.072371, 10.023739, -30.08775, -1.0851994), vec4(-3.9554763, -17.127853, -1.5398645, -5.9765005))
    * buf[3]
    + mat4(vec4(11.700768, 120.99188, 1.2700186, -1.1978078), vec4(6.439969, 6.5495753, 5.593476, 8.260329), vec4(5.0084767, 1.4092866, 3.3892424, 4.3297825), vec4(-1.6302823, 111.94994, -2.0651627, 11.063926))
    * buf[4]
    + mat4(vec4(4.9226556, -2.2842512, -0.06915115, -0.8090372), vec4(3.9067535, 4.2737126, -0.16632801, 0.40424305), vec4(-1.4395764, -3.7009208, 5.659659, -0.95593506), vec4(2.4808464, -1.9648035, 4.253838, 2.0139413))
    * buf[5]
    + mat4(vec4(2.7062273, -37.78506, -2.7695518, 1.8663154), vec4(-1.5013618, -1.6031618, -1.4843506, -1.3635066), vec4(-0.28003767, -0.22932249, -1.5067818, -1.6032585), vec4(5.4651394, -38.152313, 1.1598394, -2.9663303))
    * buf[6]
    + mat4(vec4(-6.5633774, 5.652834, 1.5336151, 1.5653535), vec4(0.6924783, 0.83906615, 0.6015718, 0.92244405), vec4(-1.4301262, -2.5398092, -10.901134, -2.7020588), vec4(-0.17983542, 5.533695, -1.1976718, -0.2655029))
    * buf[7]
    + vec4(4.7068477, -2.9669337, 0.26894927, 0.6037451);

    buf[0] = sigmoid(buf[0]);

    // output layer ****************************************************************
    vec4 out0 = mat4(vec4(4.081089, 0.42036787, -4.1688004, -4.7830305), vec4(4.2329836, 0.3764146, -4.3072662, -4.976969), vec4(4.5005713, 0.29444793, -4.7167864, -5.4770494), vec4(3.5641623, 0.43804276, -3.6188602, -4.1743093))
    * buf[0]
    + vec4(-0.11269844, -0.028633533, 0.14076644, 0.16344327);

    return out0;
  }
  
  void main() {
    vec2 xy = vUv - vec2(0.5, 0.5);
    vec2 coord = xy * 8.0;
    vec4 result = cppn_fn(coord, sin(iTime * 0.3) * 0.5, sin(iTime * 0.17) * 0.3, cos(iTime * 0.41) * 0.4);
    
    vec3 color = vec3(
      result.x * 0.5 + 0.5,
      result.y * 0.5 + 0.5,
      result.z * 0.5 + 0.5
    );
    
    // Apply blue-purple color scheme
    color = mix(color, vec3(0.0, 0.7, 1.0), 0.6);
    color = mix(color, vec3(0.5, 0.0, 1.0), sin(iTime * 0.1) * 0.3 + 0.3);
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

// Create shader material
const NeuralMaterial = shaderMaterial(
    {
        iTime: 0,
        iResolution: new THREE.Vector2()
    },
    vertexShader,
    fragmentShader
);

extend({ NeuralMaterial });

// ===================== SHADER MESH =====================
function ShaderMesh() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            // @ts-ignore
            meshRef.current.material.iTime = state.clock.elapsedTime;
            // @ts-ignore
            meshRef.current.material.iResolution.set(window.innerWidth, window.innerHeight);
        }
    });

    return (
        <mesh ref={meshRef} scale={[2, 2, 1]}>
            <planeGeometry args={[2, 2]} />
            {/* @ts-ignore */}
            <neuralMaterial />
        </mesh>
    );
}

// ===================== SHADER BACKGROUND COMPONENT =====================
export function ShaderBackground() {
    return (
        <div className="absolute inset-0 w-full h-full">
            <Canvas
                camera={{ position: [0, 0, 1] }}
                style={{ width: '100%', height: '100%' }}
            >
                <ShaderMesh />
            </Canvas>
        </div>
    );
}

// ===================== HERO COMPONENT =====================
interface HeroProps {
    title?: string;
    description?: string;
    badgeText?: string;
    badgeLabel?: string;
}

export default function Hero({
                                 title = "Measured creativity. Calculated impact.",
                                 description = "We build legacies, not just outputs. Weskale blends identity clarity, technical excellence, and scalable influence to turn ambition into sustained performance.",
                                 badgeText = "A new website experience is in progress.",
                                 badgeLabel = "Coming Soon"
                             }: HeroProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descriptionRef = useRef<HTMLParagraphElement>(null);
    const buttonsRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const handleBookMeeting = () => {
        window.open('https://calendly.com/contact-weskaleagency/30min?month=2025-09', '_blank');
    };

    const handleExploreSolutions = () => {
        router.push('/solutions');
    };

    useGSAP(() => {
        if (!containerRef.current || !titleRef.current || !descriptionRef.current || !buttonsRef.current) return;

        const tl = gsap.timeline({ delay: 0.5 });

        // Split title text for animation
        const splitTitle = new SplitText(titleRef.current, {
            type: 'lines,words',
            linesClass: 'split-line',
        });

        // Set initial states
        gsap.set(splitTitle.words, {
            y: 100,
            opacity: 0,
        });

        gsap.set(descriptionRef.current, {
            y: 50,
            opacity: 0,
        });

        gsap.set(buttonsRef.current, {
            y: 30,
            opacity: 0,
        });

        // Animate title words
        tl.to(splitTitle.words, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.02,
            ease: 'power3.out',
        });

        // Animate description
        tl.to(
            descriptionRef.current,
            {
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: 'power3.out',
            },
            '-=0.3'
        );

        // Animate buttons
        tl.to(
            buttonsRef.current,
            {
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: 'power3.out',
            },
            '-=0.2'
        );

        // Cleanup
        return () => {
            splitTitle.revert();
        };
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative min-h-screen flex items-center justify-center px-6 py-20">
            {/* Background gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60" />

            {/* Content */}
            <div className="relative z-10 max-w-4xl mx-auto text-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 animate-pulse" />
                    <span className="text-sm text-white/80">{badgeText}</span>
                </div>

                {/* Title */}
                <h1 ref={titleRef} className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                    <span className="text-white">Measured creativity.</span>
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
            Calculated impact.
          </span>
                </h1>

                {/* Description */}
                <p ref={descriptionRef} className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
                    {description}
                </p>

                {/* Action Buttons */}
                <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button
                        onClick={handleBookMeeting}
                        className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-semibold hover:bg-white/90 transition-all duration-300 hover:scale-105"
                    >
                        <Calendar className="w-5 h-5" />
                        Book a meeting
                        <ArrowRight className="w-5 h-5" />
                    </button>

                    <button
                        onClick={handleExploreSolutions}
                        className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white rounded-full font-medium hover:bg-white/10 transition-all duration-300"
                    >
                        Our solutions
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </section>
    );
}