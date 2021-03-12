import Particles from "react-tsparticles";
import React, { Component } from "react";
import ReactDOM from "react-dom";

export default class ParticleTest extends Component {
  constructor(props) {
    super(props);

    this.particlesInit = this.particlesInit.bind(this);
    this.particlesLoaded = this.particlesLoaded.bind(this);
  }

  particlesInit(main) {
    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
  }

  particlesLoaded(container) {}

  render() {
    return (
      <Particles
        id="tsparticles"
        init={this.particlesInit}
        loaded={this.particlesLoaded}
        options={{
          background: {
            color: {
              value: "#e6ecf5",
            },
          },
          fpsLimit: 60,
          particles: {
            number: {
              value: 80,
              density: {
                enable: true,
                value_area: 800,
              },
            },
            color: {
              value: ["#2EB67D", "#ECB22E", "#E01E5B", "#36C5F0"],
            },
            shape: {
              type: ["circle"],
              stroke: {
                width: 0,
                color: "#fff",
              },
              polygon: {
                nb_sides: 5,
              },
            },
            opacity: {
              value: 1,
              random: false,
              anim: {
                enable: false,
                speed: 1,
                opacity_min: 0.1,
                sync: false,
              },
            },
            size: {
              value: 8,
              random: true,
              anim: {
                enable: false,
                speed: 10,
                size_min: 10,
                sync: false,
              },
            },
            line_linked: {
              enable: true,
              distance: 150,
              color: "#808080",
              opacity: 0.4,
              width: 1,
            },
            move: {
              enable: true,
              speed: 5,
              direction: "none",
              random: false,
              straight: false,
              out_mode: "out",
              bounce: false,
              attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200,
              },
            },
          },
          interactivity: {
            detectsOn: "canvas",
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              bubble: {
                distance: 400,
                duration: 2,
                opacity: 0.8,
                size: 40,
              },
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
            modes: {
              grab: {
                distance: 140,
                line_linked: {
                  opacity: 1,
                },
              },
              bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 8,
                speed: 3,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
              push: {
                particles_nb: 4,
              },
              remove: {
                particles_nb: 2,
              },
            },
          },
          // options={{
          //   background: {
          //     color: {
          //       value: "#0d47a1",
          //     },
          //   },
          //   fpsLimit: 60,
          //   interactivity: {
          //     detectsOn: "canvas",
          //     events: {
          //       onClick: {
          //         enable: true,
          //         mode: "push",
          //       },
          //       onHover: {
          //         enable: true,
          //         mode: "repulse",
          //       },
          //       resize: true,
          //     },
          //     modes: {
          //       bubble: {
          //         distance: 400,
          //         duration: 2,
          //         opacity: 0.8,
          //         size: 40,
          //       },
          //       push: {
          //         quantity: 4,
          //       },
          //       repulse: {
          //         distance: 200,
          //         duration: 0.4,
          //       },
          //     },
          //   },
          //   particles: {
          //     color: {
          //       value: "#ffffff",
          //     },
          //     links: {
          //       color: "#ffffff",
          //       distance: 150,
          //       enable: true,
          //       opacity: 0.5,
          //       width: 1,
          //     },
          //     collisions: {
          //       enable: true,
          //     },
          //     move: {
          //       direction: "none",
          //       enable: true,
          //       outMode: "bounce",
          //       random: false,
          //       speed: 6,
          //       straight: false,
          //     },
          //     number: {
          //       density: {
          //         enable: true,
          //         value_area: 800,
          //       },
          //       value: 80,
          //     },
          //     opacity: {
          //       value: 0.5,
          //     },
          //     shape: {
          //       type: "circle",
          //     },
          //     size: {
          //       random: true,
          //       value: 5,
          //     },
          //   },
          detectRetina: true,
        }}
      />
    );
  }
}
