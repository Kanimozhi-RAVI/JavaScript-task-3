

  const resultDisplay = document.getElementById("result");
  let expression = "";

  const updateDisplay = () => {
    resultDisplay.textContent = expression || "0";
  };

  const calculate = () => {
    try {
      // Replace custom functions with JavaScript equivalents
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