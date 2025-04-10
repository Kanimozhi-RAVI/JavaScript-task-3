

  const resultDisplay = document.getElementById("result");
  let expression = "";

  const updateDisplay = () => {
    resultDisplay.textContent = expression || "0";
  };

  const calculate = () => {
    try {
      let exp = expression
        .replace(/π/g, Math.PI)
        .replace(/√/g, "Math.sqrt")
        .replace(/sin/g, "Math.sin")
        .replace(/cos/g, "Math.cos")
        .replace(/tan/g, "Math.tan")
        .replace(/log/g, "Math.log10")
        .replace(/ln/g, "Math.log")
        .replace(/x\^/g, "^");

      exp = exp.replace(/([0-9.]+)\^([0-9.]+)/g, "Math.pow($1,$2)");

      const result = eval(exp);
      expression = result.toString();
    } catch {
      expression = "Error";
    }
    updateDisplay();
  };

  document.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const func = btn.dataset.function;
      const value = btn.dataset.value;

      if (btn.classList.contains("number")) {
        expression += value;
      } else if (btn.classList.contains("arithmetic-operator")) {
        expression += func || value;
      } else if (btn.classList.contains("operator")) {
        if (["sin", "cos", "tan", "log", "ln", "sqrt"].includes(func)) {
          expression += func + "(";
        } else if (func === "power") {
          expression += "^";
        } else if (func === "pi") {
          expression += "π";
        } else {
          expression += func;
        }
      } else if (func === "clear") {
        expression = "";
      } else if (func === "del") {
        expression = expression.slice(0, -1);
      } else if (func === "=") {
        calculate();
        return;
      }

      updateDisplay();
    });
  });

  updateDisplay(); 


  const canvas = document.getElementById("snowCanvas");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const snowflakes = [];
  let mouseX = canvas.width / 2;

  function getRandomColor() {
    const colors = [
      "white", "#00ffff", "#ff69b4", "#add8e6",
      "#dcdcdc", "#ccf5ff", "#ffe4e1", "#b0e0e6"
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  function createSnowflakes(count) {
    for (let i = 0; i < count; i++) {
      snowflakes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 5 + 1,
        speedY: Math.random() * 1 + 0.5, 
        speedX: Math.random() * 0.5 - 0.25,
        color: getRandomColor(),
      });
    }
  }

  function drawSnowflakes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const flake of snowflakes) {
      const gradient = ctx.createRadialGradient(
        flake.x, flake.y, 0,
        flake.x, flake.y, flake.radius
      );
      gradient.addColorStop(0, "white");
      gradient.addColorStop(1, flake.color);

      ctx.beginPath();
      ctx.fillStyle = gradient;
      ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
      ctx.fill();
    }

    updateSnowflakes();
  }

  function updateSnowflakes() {
    const wind = (mouseX - canvas.width / 2) / 500; 

    for (const flake of snowflakes) {
      flake.y += flake.speedY;
      flake.x += flake.speedX + wind;

      if (flake.y > canvas.height) {
        flake.y = -flake.radius;
        flake.x = Math.random() * canvas.width;
      }

      if (flake.x > canvas.width) flake.x = 0;
      if (flake.x < 0) flake.x = canvas.width;
    }
  }

  function animate() {
    drawSnowflakes();
    requestAnimationFrame(animate);
  }

  // Update mouse position for wind effect
  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
  });

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  createSnowflakes(300);
  animate();