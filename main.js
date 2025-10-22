// George Droyd: Agartha Mission Interactive Elements

// Initialize animations and interactions when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeSyringeInjector();
    initializeFentReactor();
    initializeMissionTracker();
});

// Anime.js animations for character and UI elements
function initializeAnimations() {
    // Animate George Droyd character entrance
    anime({
        targets: '.george-droyd-character',
        opacity: [0, 1],
        translateY: [50, 0],
        duration: 1500,
        easing: 'easeOutQuad',
        delay: 500
    });

    // Animate text elements
    anime({
        targets: '.mission-title',
        opacity: [0, 1],
        translateX: [-100, 0],
        duration: 1000,
        easing: 'easeOutQuad',
        delay: 800
    });

    // Animate circuit patterns
    anime({
        targets: '.circuit-pattern',
        strokeDashoffset: [anime.setDashoffset, 0],
        duration: 2000,
        easing: 'easeInOutQuad',
        delay: 1000
    });

    // Pulsing glow effects for reactor elements
    anime({
        targets: '.reactor-glow',
        opacity: [0.5, 1, 0.5],
        duration: 2000,
        easing: 'easeInOutSine',
        loop: true
    });
}

// Interactive syringe injection system
function initializeSyringeInjector() {
    const syringe = document.querySelector('.syringe-injector');
    const powerLevel = document.querySelector('.power-level');
    const injectButton = document.querySelector('.inject-button');
    
    if (injectButton) {
        injectButton.addEventListener('click', function() {
            performInjection();
        });
    }
}

function performInjection() {
    const syringe = document.querySelector('.syringe-injector');
    const powerLevel = document.querySelector('.power-level');
    const currentPower = parseInt(powerLevel.textContent);
    
    // Animate syringe injection
    anime({
        targets: syringe,
        translateY: [-10, 0],
        scale: [1, 1.1, 1],
        duration: 500,
        easing: 'easeOutQuad'
    });
    
    // Update power level
    const newPower = Math.min(currentPower + 15, 100);
    powerLevel.textContent = newPower + '%';
    
    // Power up George Droyd
    const character = document.querySelector('.george-droyd-character');
    character.classList.add('powered-up');
    
    // Glow effect
    anime({
        targets: '.george-droyd-character',
        filter: ['brightness(1)', 'brightness(1.3)', 'brightness(1)'],
        duration: 1000,
        easing: 'easeInOutQuad'
    });
    
    // Update reactor status
    updateReactorStatus(newPower);
    
    setTimeout(() => {
        character.classList.remove('powered-up');
    }, 2000);
}

// Fent reactor status monitoring
function initializeFentReactor() {
    const reactor = document.querySelector('.fent-reactor');
    
    // Continuous reactor animation
    anime({
        targets: '.reactor-core',
        rotate: 360,
        duration: 10000,
        easing: 'linear',
        loop: true
    });
    
    // Reactor energy flow
    anime({
        targets: '.energy-flow',
        strokeDashoffset: [0, -100],
        duration: 2000,
        easing: 'linear',
        loop: true
    });
}

function updateReactorStatus(powerLevel) {
    const statusDisplay = document.querySelector('.reactor-status');
    const energyCore = document.querySelector('.energy-core');
    
    if (powerLevel >= 80) {
        statusDisplay.textContent = 'OPTIMAL';
        statusDisplay.className = 'reactor-status optimal';
        energyCore.style.fill = '#00ff00';
    } else if (powerLevel >= 50) {
        statusDisplay.textContent = 'OPERATIONAL';
        statusDisplay.className = 'reactor-status operational';
        energyCore.style.fill = '#0088ff';
    } else {
        statusDisplay.textContent = 'LOW POWER';
        statusDisplay.className = 'reactor-status low-power';
        energyCore.style.fill = '#ff8800';
    }
}

// Mission progress tracking
function initializeMissionTracker() {
    const phases = document.querySelectorAll('.mission-phase');
    
    phases.forEach((phase, index) => {
        phase.addEventListener('click', function() {
            showMissionDetails(index);
        });
    });
}

function showMissionDetails(phaseIndex) {
    const details = [
        "Phase 1: Infiltration - Enter Agartha through underground tunnels",
        "Phase 2: Reconnaissance - Locate fentanyl deposits using enhanced sensors",
        "Phase 3: Extraction - Secure fentanyl samples for reactor analysis",
        "Phase 4: Return - Extract from Agartha with mission data"
    ];
    
    const detailPanel = document.querySelector('.mission-detail-panel');
    detailPanel.innerHTML = `
        <h3>Mission Phase ${phaseIndex + 1}</h3>
        <p>${details[phaseIndex]}</p>
    `;
    
    anime({
        targets: '.mission-detail-panel',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 500,
        easing: 'easeOutQuad'
    });
}

// P5.js background effects for Agartha atmosphere
function setup() {
    const canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('background-canvas');
    canvas.style('position', 'fixed');
    canvas.style('top', '0');
    canvas.style('left', '0');
    canvas.style('z-index', '-1');
}

function draw() {
    // Deep underground atmosphere
    background(10, 15, 30);
    
    // Floating particles (dust/microbes in Agartha air)
    for (let i = 0; i < 50; i++) {
        let x = (noise(i * 0.01, frameCount * 0.005) * width);
        let y = (noise(i * 0.02, frameCount * 0.003) * height);
        let size = noise(i * 0.1, frameCount * 0.01) * 3;
        
        fill(100, 150, 255, 50);
        noStroke();
        ellipse(x, y, size);
    }
    
    // Pulsing energy from fent reactor
    let reactorPulse = sin(frameCount * 0.02) * 50 + 100;
    fill(0, reactorPulse, 255, 30);
    ellipse(width/2, height/2, reactorPulse * 2);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

// ECharts data visualization for mission parameters
function initializeMissionChart() {
    const chartDom = document.getElementById('mission-chart');
    const myChart = echarts.init(chartDom);
    
    const option = {
        backgroundColor: 'transparent',
        title: {
            text: 'Mission Parameters',
            textStyle: {
                color: '#ffffff'
            }
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['Power Level', 'Reactor Efficiency', 'Mission Progress'],
            textStyle: {
                color: '#ffffff'
            }
        },
        xAxis: {
            type: 'category',
            data: ['Phase 1', 'Phase 2', 'Phase 3', 'Phase 4'],
            axisLine: {
                lineStyle: {
                    color: '#ffffff'
                }
            }
        },
        yAxis: {
            type: 'value',
            axisLine: {
                lineStyle: {
                    color: '#ffffff'
                }
            }
        },
        series: [
            {
                name: 'Power Level',
                type: 'line',
                data: [85, 90, 95, 100],
                lineStyle: {
                    color: '#00ff00'
                }
            },
            {
                name: 'Reactor Efficiency',
                type: 'line',
                data: [78, 85, 88, 92],
                lineStyle: {
                    color: '#0088ff'
                }
            },
            {
                name: 'Mission Progress',
                type: 'bar',
                data: [25, 50, 75, 100],
                itemStyle: {
                    color: '#ff0088'
                }
            }
        ]
    };
    
    myChart.setOption(option);
}

// Audio effects for interactions
function playInjectSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
}