// Global Variables
let scene, camera, renderer, particles, cube, torus;
let mouse = { x: 0, y: 0 };
let windowHalf = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initThreeJS();
    initUI();
    initAnimations();
    initParticles();
    startAnimationLoop();
});

// Three.js Initialization
function initThreeJS() {
    const canvas = document.getElementById('three-canvas');
    if (!canvas) return;

    // Scene setup
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ 
        canvas: canvas,
        antialias: true,
        alpha: true 
    });
    
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setClearColor(0x000000, 0);
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0x007acc, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    const pointLight = new THREE.PointLight(0xff8c42, 0.8, 100);
    pointLight.position.set(-5, -5, 5);
    scene.add(pointLight);

    // Create 3D Objects
    createGeometry();
    
    // Camera position
    camera.position.z = 5;
    
    // Mouse movement tracking
    document.addEventListener('mousemove', onMouseMove, false);
    window.addEventListener('resize', onWindowResize, false);
}

// Create 3D Geometry
function createGeometry() {
    // Floating Cube
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const cubeMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x007acc,
        transparent: true,
        opacity: 0.8,
        wireframe: false
    });
    cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.set(-2, 1, 0);
    scene.add(cube);
    
    // Floating Torus
    const torusGeometry = new THREE.TorusGeometry(0.8, 0.3, 16, 100);
    const torusMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xff8c42,
        transparent: true,
        opacity: 0.7
    });
    torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.position.set(2, -1, 0);
    scene.add(torus);
    
    // Particle System
    createParticleSystem();
}

// Create Particle System
function createParticleSystem() {
    const particleCount = 1000;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        particlePositions[i3] = (Math.random() - 0.5) * 20;
        particlePositions[i3 + 1] = (Math.random() - 0.5) * 20;
        particlePositions[i3 + 2] = (Math.random() - 0.5) * 20;
        
        const color = new THREE.Color();
        color.setHSL(Math.random() * 0.3 + 0.5, 0.7, 0.5);
        particleColors[i3] = color.r;
        particleColors[i3 + 1] = color.g;
        particleColors[i3 + 2] = color.b;
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
        size: 0.05,
        vertexColors: true,
        transparent: true,
        opacity: 0.8
    });
    
    particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);
}

// Mouse movement handler
function onMouseMove(event) {
    mouse.x = (event.clientX - windowHalf.x) / windowHalf.x;
    mouse.y = (event.clientY - windowHalf.y) / windowHalf.y;
}

// Window resize handler
function onWindowResize() {
    const canvas = document.getElementById('three-canvas');
    if (!canvas) return;
    
    windowHalf.x = window.innerWidth / 2;
    windowHalf.y = window.innerHeight / 2;
    
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
}

// Animation loop
function startAnimationLoop() {
    function animate() {
        requestAnimationFrame(animate);
        
        if (cube) {
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            cube.position.y = Math.sin(Date.now() * 0.001) * 0.5 + 1;
        }
        
        if (torus) {
            torus.rotation.x += 0.02;
            torus.rotation.y += 0.01;
            torus.position.y = Math.cos(Date.now() * 0.0015) * 0.3 - 1;
        }
        
        if (particles) {
            particles.rotation.y += 0.001;
            const positions = particles.geometry.attributes.position.array;
            for (let i = 0; i < positions.length; i += 3) {
                positions[i + 1] += Math.sin(Date.now() * 0.001 + positions[i]) * 0.001;
            }
            particles.geometry.attributes.position.needsUpdate = true;
        }
        
        // Camera movement based on mouse
        if (camera) {
            camera.position.x += (mouse.x * 2 - camera.position.x) * 0.05;
            camera.position.y += (-mouse.y * 2 - camera.position.y) * 0.05;
            camera.lookAt(scene.position);
        }
        
        if (renderer) {
            renderer.render(scene, camera);
        }
    }
    animate();
}

// UI Initialization
function initUI() {
    // File tab switching
    initTabSwitching();
    
    // Activity bar interactions
    initActivityBar();
    
    // Sidebar interactions
    initSidebar();
    
    // Skill progress animations
    initSkillBars();
    
    // Project card interactions
    initProjectCards();
    
    // Contact card interactions
    initContactCards();
}

// Tab switching functionality
function initTabSwitching() {
    const tabs = document.querySelectorAll('.tab');
    const fileContents = document.querySelectorAll('.file-content');
    const fileItems = document.querySelectorAll('.file-item');
    
    function switchToFile(fileName) {
        // Update tabs
        tabs.forEach(tab => {
            tab.classList.toggle('active', tab.dataset.file === fileName);
        });
        
        // Update file contents
        fileContents.forEach(content => {
            content.classList.toggle('active', content.id === fileName + '-content');
        });
        
        // Update file items in sidebar
        fileItems.forEach(item => {
            item.classList.toggle('active', item.dataset.file === fileName);
        });
        
        // Trigger enter animation for active content
        const activeContent = document.querySelector('.file-content.active');
        if (activeContent) {
            triggerContentAnimation(activeContent);
        }
    }
    
    // Tab click handlers
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const fileName = tab.dataset.file;
            switchToFile(fileName);
        });
        
        // Tab close button
        const closeBtn = tab.querySelector('.fa-times');
        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                // Animation for tab closing
                gsap.to(tab, {
                    duration: 0.3,
                    scaleX: 0,
                    opacity: 0,
                    onComplete: () => {
                        tab.style.display = 'none';
                    }
                });
            });
        }
    });
    
    // File item click handlers
    fileItems.forEach(item => {
        item.addEventListener('click', () => {
            const fileName = item.dataset.file;
            switchToFile(fileName);
        });
    });
}

// Activity bar functionality
function initActivityBar() {
    const activityIcons = document.querySelectorAll('.activity-icon');
    
    activityIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            activityIcons.forEach(i => i.classList.remove('active'));
            icon.classList.add('active');
            
            // Add ripple effect
            createRippleEffect(icon);
        });
        
        // Hover sound effect simulation
        icon.addEventListener('mouseenter', () => {
            gsap.to(icon, {
                duration: 0.3,
                scale: 1.1,
                ease: "back.out(1.7)"
            });
        });
        
        icon.addEventListener('mouseleave', () => {
            gsap.to(icon, {
                duration: 0.3,
                scale: 1,
                ease: "back.out(1.7)"
            });
        });
    });
}

// Sidebar functionality
function initSidebar() {
    const sidebarActions = document.querySelectorAll('.sidebar-actions i');
    
    sidebarActions.forEach(action => {
        action.addEventListener('click', () => {
            // Pulse animation
            gsap.to(action, {
                duration: 0.2,
                scale: 1.2,
                yoyo: true,
                repeat: 1,
                ease: "power2.inOut"
            });
        });
    });
    
    // File item hover effects
    const fileItems = document.querySelectorAll('.file-item');
    fileItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            gsap.to(item, {
                duration: 0.3,
                x: -5,
                ease: "power2.out"
            });
        });
        
        item.addEventListener('mouseleave', () => {
            gsap.to(item, {
                duration: 0.3,
                x: 0,
                ease: "power2.out"
            });
        });
    });
}

// Skill bars animation
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    // Intersection Observer for skill bars
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.dataset.width;
                
                gsap.to(bar, {
                    duration: 2,
                    width: width,
                    ease: "power2.out",
                    delay: Math.random() * 0.5
                });
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

// Project cards interactions
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                duration: 0.5,
                y: -15,
                rotationX: 8,
                transformPerspective: 1000,
                ease: "power2.out"
            });
            
            // Add glow effect
            card.style.boxShadow = '0 25px 50px rgba(0, 122, 204, 0.3)';
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                duration: 0.5,
                y: 0,
                rotationX: 0,
                ease: "power2.out"
            });
            
            card.style.boxShadow = 'none';
        });
        
        // Click animation
        card.addEventListener('click', () => {
            gsap.to(card, {
                duration: 0.1,
                scale: 0.95,
                yoyo: true,
                repeat: 1,
                ease: "power2.inOut"
            });
        });
    });
}

// Contact cards interactions
function initContactCards() {
    const contactCards = document.querySelectorAll('.contact-card');
    
    contactCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                duration: 0.3,
                y: -8,
                scale: 1.03,
                ease: "back.out(1.7)"
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                duration: 0.3,
                y: 0,
                scale: 1,
                ease: "back.out(1.7)"
            });
        });
    });
}

// Ripple effect function
function createRippleEffect(element) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = '50%';
    ripple.style.top = '50%';
    ripple.style.transform = 'translate(-50%, -50%)';
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(0, 122, 204, 0.3)';
    ripple.style.pointerEvents = 'none';
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    gsap.fromTo(ripple, 
        { scale: 0, opacity: 1 },
        { 
            scale: 2, 
            opacity: 0, 
            duration: 0.6,
            ease: "power2.out",
            onComplete: () => {
                ripple.remove();
            }
        }
    );
}

// Content animation trigger
function triggerContentAnimation(content) {
    const animatableElements = content.querySelectorAll('.typing-animation, .project-card, .skill-item, .contact-card');
    
    gsap.set(animatableElements, { opacity: 0, y: 30 });
    
    gsap.to(animatableElements, {
        duration: 0.8,
        opacity: 1,
        y: 0,
        stagger: 0.1,
        ease: "power2.out"
    });
}

// Initialize animations
function initAnimations() {
    // Initial page load animation
    gsap.timeline()
        .from('.titlebar', { duration: 0.5, y: -30, opacity: 0 })
        .from('.activity-bar', { duration: 0.5, x: -50, opacity: 0 }, '-=0.3')
        .from('.sidebar', { duration: 0.5, x: -100, opacity: 0 }, '-=0.3')
        .from('.tabs-container', { duration: 0.5, y: -20, opacity: 0 }, '-=0.3')
        .from('.status-bar', { duration: 0.5, y: 30, opacity: 0 }, '-=0.3');
    
    // Typing animation for hero text
    const typingElements = document.querySelectorAll('.typing-animation');
    typingElements.forEach((element, index) => {
        gsap.set(element, { opacity: 0, y: 20 });
        gsap.to(element, {
            duration: 0.8,
            opacity: 1,
            y: 0,
            delay: index * 0.2,
            ease: "power2.out"
        });
    });
}

// Initialize particles background
function initParticles() {
    // Create floating particles in the background
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles';
    document.body.appendChild(particleContainer);
    
    for (let i = 0; i < 50; i++) {
        createFloatingParticle(particleContainer);
    }
}

// Create floating particle
function createFloatingParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 8 + 's';
    particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
    
    container.appendChild(particle);
    
    // Remove and recreate particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.remove();
            createFloatingParticle(container);
        }
    }, 8000);
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl+Shift+P (Command Palette simulation)
    if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        e.preventDefault();
        showCommandPalette();
    }
    
    // Ctrl+` (Toggle Terminal simulation)
    if (e.ctrlKey && e.key === '`') {
        e.preventDefault();
        toggleTerminal();
    }
});

// Command palette simulation
function showCommandPalette() {
    const palette = document.createElement('div');
    palette.style.cssText = `
        position: fixed;
        top: 10%;
        left: 50%;
        transform: translateX(-50%);
        background: var(--bg-secondary);
        border: 1px solid var(--border-color);
        border-radius: 8px;
        padding: 20px;
        z-index: 10000;
        min-width: 400px;
        box-shadow: 0 20px 40px rgba(0,0,0,0.5);
    `;
    
    palette.innerHTML = `
        <input type="text" placeholder="اكتب أمر..." style="
            width: 100%;
            background: var(--bg-tertiary);
            border: 1px solid var(--border-color);
            color: var(--text-primary);
            padding: 10px;
            border-radius: 4px;
            font-family: 'JetBrains Mono', monospace;
        ">
        <div style="margin-top: 10px; color: var(--text-secondary); font-size: 12px;">
            اضغط Escape للإغلاق
        </div>
    `;
    
    document.body.appendChild(palette);
    
    gsap.fromTo(palette, 
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" }
    );
    
    palette.querySelector('input').focus();
    
    // Close on Escape
    document.addEventListener('keydown', function closeOnEscape(e) {
        if (e.key === 'Escape') {
            gsap.to(palette, {
                scale: 0.8,
                opacity: 0,
                duration: 0.3,
                onComplete: () => {
                    palette.remove();
                    document.removeEventListener('keydown', closeOnEscape);
                }
            });
        }
    });
}

// Toggle terminal simulation
function toggleTerminal() {
    let terminal = document.querySelector('.terminal');
    
    if (!terminal) {
        terminal = document.createElement('div');
        terminal.className = 'terminal';
        terminal.style.cssText = `
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            height: 200px;
            background: var(--bg-secondary);
            border-top: 1px solid var(--border-color);
            z-index: 1000;
            padding: 10px;
            font-family: 'JetBrains Mono', monospace;
            font-size: 12px;
            color: var(--text-primary);
            overflow-y: auto;
        `;
        
        terminal.innerHTML = `
            <div>يحيى رضا Terminal v1.0.0</div>
            <div style="color: var(--accent-green);">$ نرحب بك في محطة المطور</div>
            <div style="color: var(--accent-blue);">$ استخدم الأوامر: help, clear, about, skills</div>
            <div style="margin-top: 10px;">
                <span style="color: var(--accent-orange);">yahya@portfolio:~$</span>
                <input type="text" style="background: transparent; border: none; color: var(--text-primary); outline: none; margin-left: 5px;">
            </div>
        `;
        
        document.body.appendChild(terminal);
        
        gsap.fromTo(terminal, 
            { y: 200 },
            { y: 0, duration: 0.5, ease: "power2.out" }
        );
    } else {
        gsap.to(terminal, {
            y: 200,
            duration: 0.5,
            ease: "power2.in",
            onComplete: () => terminal.remove()
        });
    }
}

// Performance optimization
function optimizePerformance() {
    // Throttle mouse movement
    let mouseTimeout;
    const originalMouseMove = onMouseMove;
    
    window.onMouseMove = function(event) {
        clearTimeout(mouseTimeout);
        mouseTimeout = setTimeout(() => originalMouseMove(event), 16);
    };
    
    // Reduce particle count on mobile
    if (window.innerWidth < 768) {
        const particleGeometry = particles?.geometry;
        if (particleGeometry) {
            const positions = particleGeometry.attributes.position.array;
            const reducedPositions = new Float32Array(positions.length / 2);
            for (let i = 0; i < reducedPositions.length; i++) {
                reducedPositions[i] = positions[i * 2];
            }
            particleGeometry.setAttribute('position', new THREE.BufferAttribute(reducedPositions, 3));
        }
    }
}

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', optimizePerformance);

// Error handling
window.addEventListener('error', (e) => {
    console.log('Portfolio Error:', e.message);
    // Graceful degradation - continue without 3D if WebGL fails
    if (e.message.includes('WebGL') || e.message.includes('THREE')) {
        document.querySelector('.hero-3d')?.style.setProperty('display', 'none');
    }
});

// Export for potential external use
window.PortfolioApp = {
    initThreeJS,
    initUI,
    initAnimations,
    scene,
    camera,
    renderer
};