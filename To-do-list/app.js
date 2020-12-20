particlesJS(
  'particles-js',

  {
    particles: {
      number: {
        value: 100,
        density: {
          enable: true,
          value_area: 1000
        }
      },
      shape: {
        type: "image",
        polygon: {
          nb_sides: 5
        },
        image: {
          src: "mark.png",
          width: 100,
          height: 100
        }
      },
      size: {
        value: 15
      },
      opacity: {
        value: 0.5
      },
      line_linked: {
        enable: true,
        opacity: 0.6,
        width: 1,
        distance: 150
      },
      move: {
        enable: true,
        direction: "none",
        speed: 6
      }
    },
    interactivity: {
      detect_on: "canvas",
      modes: {
        repulse: {
          distance: 200
        }
      },
      events: {
        onhover: {
          enable: true,
          mode: "repulse"
        },
        onclick: {
          enable: false
        }
      }
    }
  }
);
