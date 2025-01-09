import gsap from "gsap";

export function initializeScrollAnimation(
  canvasId: string,
  pictureId: string
): void {
  const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
  const picture = document.getElementById(pictureId) as HTMLDivElement;
  if (!canvas) {
    console.error(`Canvas with ID "${canvasId}" not found.`);
    return;
  }

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    console.error("Unable to get 2D context for the canvas.");
    return;
  }

  // Set initial canvas size
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Resize canvas dynamically on window resize
  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawAnimation(); // Redraw animation on resize
  });

  // Animation variables
  const points: Array<{ x: number; y: number; vx: number; vy: number }> = [];
  const lineColor = getComputedStyle(document.documentElement)
    .getPropertyValue("--clr-line")
    .trim();
  const pointColor = getComputedStyle(document.documentElement)
    .getPropertyValue("--clr-point")
    .trim();
  const waveAmplitude = 20;

  function calculateNumPoints(): number {
    const basePoints = 50; // Base number of points for large screens
    const minPoints = 5; // Minimum number of points for very small screens
    return Math.max(
      Math.floor((window.innerWidth / 1920) * basePoints),
      minPoints
    );
  }

  // Initialize random points
  function initializePoints() {
    points.length = 0; // Clear existing points
    const numPoints = calculateNumPoints(); // Number of points in the net
    for (let i = 0; i < numPoints; i++) {
      points.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2, // Velocity in x
        vy: (Math.random() - 0.5) * 2, // Velocity in y
      });
    }
  }

  // Draw points and lines
  function drawAnimation(ctx = canvas.getContext("2d")!) {
    // Clear the canvas with a white background
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Apply a small blur to the lines and points
    // ctx.filter = "blur(2px)";

    // Draw lines connecting points
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const dist = Math.hypot(
          points[i].x - points[j].x,
          points[i].y - points[j].y
        );
        if (dist < 200) {
          ctx.moveTo(points[i].x, points[i].y);
          ctx.lineTo(points[j].x, points[j].y);
        }
      }
    }
    ctx.stroke();

    // Draw points
    ctx.fillStyle = pointColor;
    points.forEach((point) => {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 3, 0, Math.PI * 2);
      ctx.fill();
    });

    // Reset filter
    // ctx.filter = "none";
  }

  // Update points positions
  function updatePoints(scrollY: number) {
    points.forEach((point, i) => {
      point.x +=
        point.vx + Math.sin((scrollY + i) * 0.01) * waveAmplitude * 0.01;
      point.y +=
        point.vy + Math.cos((scrollY + i) * 0.01) * waveAmplitude * 0.01;

      // Reflect points off canvas edges
      if (point.x < 0 || point.x > canvas.width) point.vx *= -1;
      if (point.y < 0 || point.y > canvas.height) point.vy *= -1;
    });
  }

  // Scroll-based control
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    // Trigger animation for the first two sections
    const section1Height = document.getElementById("hero")!.offsetHeight;
    const section2Height = document.getElementById("about")!.offsetHeight;

    // Trigger picture scaling when in the first two sections
    if (scrollY < section1Height + section2Height) {
      const scale = Math.max(1 - scrollY / 2000, 0.8); // Scale between 1 and 1.5 based on scroll
      // converting scale between 0.5 and 1
      const opacity = Math.max(1 - scrollY / 2000, 0);
      picture.style.display = "block"; // Show the picture
      gsap.to(picture, {
        scale: scale,
        opacity: opacity,
        right: 0, // Bring the picture closer to the right side of the page
        bottom: -100, // Bring the picture closer to the bottom of the page
        ease: "power2.out",
      });
    } else {
      picture.style.display = "none"; // Hide the picture after scrolling past the second section
    }

    updatePoints(scrollY);
  });

  // GSAP animation ticker for smooth updates
  gsap.ticker.add(() => {
    drawAnimation();
  });

  // Initialize points and draw
  initializePoints();
  drawAnimation();
}
